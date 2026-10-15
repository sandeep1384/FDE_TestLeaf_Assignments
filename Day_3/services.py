import repository
from models import Expense

def determine_approval(expense_amount: float) -> str:
    if expense_amount > 10000:
        return "Manager Approval required"
    elif expense_amount > 5000:
        return "Supervisor Approval required"
    else:
        return "Standard Approval required"

def apply_approval_rules(expense_data: dict) -> Expense:
    vendor = expense_data.get("vendor")
    if vendor is None or not str(vendor).strip():
        expense_data["status"] = "INVALID"
        expense_data["approval"] = "INVALID"
    else:
        expense_data["approval"] = determine_approval(expense_data["amount"])
    return Expense(**expense_data)

def get_all_expenses() -> list[Expense]:
    print("Fetching all expenses from services")
    expenses_data = repository.find_all_expenses()
    return [apply_approval_rules(expense_data) for expense_data in expenses_data]

def get_expense(expense_id: int) -> Expense:
    print(f"Fetching expense with ID from services: {expense_id}")
    expense_data = repository.find_expense_by_id(expense_id)
    print(f"Expense data retrieved: {expense_data}")
    if expense_data is None:
        raise ValueError(f"Expense with ID {expense_id} not found.")
    return apply_approval_rules(expense_data)

def create_expense(expense_data: dict) -> Expense:
    if repository.find_expense_by_id(expense_data["id"]) is not None:
        raise KeyError(f"Expense with ID {expense_data['id']} already exists.")
    new_expense = apply_approval_rules(expense_data)
    repository.add_expense(new_expense.model_dump())
    return new_expense

def delete_expense(expense_id: int) -> None:
    existing_expense = repository.find_expense_by_id(expense_id)
    if existing_expense is None:
        raise ValueError(f"Expense with ID {expense_id} not found.")

    repository.delete_expense(expense_id)
