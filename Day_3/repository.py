import json
import os

DATA_FILE = os.path.join(os.path.dirname(__file__), "data", "expenses.json")

def load_expenses():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_expenses(expenses):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(expenses, f, indent=4)

def find_all_expenses():
    print("Fetching all expenses from repository")
    return load_expenses()

def find_expense_by_id(expense_id):
    print(f"Fetching expense with ID from repository: {expense_id}")
    expenses = load_expenses()
    for expense in expenses:
        if expense["id"] == expense_id:
            return expense
    return None

def add_expense(expense):
    expenses = load_expenses()
    expenses.append(expense)
    save_expenses(expenses)

def delete_expense(expense_id):
    expenses = load_expenses()
    for index, expense in enumerate(expenses):
        if expense["id"] == expense_id:
            del expenses[index]
            save_expenses(expenses)
            return True
    return False
