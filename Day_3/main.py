from fastapi import FastAPI, HTTPException
from models import Expense
from services import get_all_expenses, get_expense, create_expense, delete_expense

app = FastAPI()

@app.get("/expenses", response_model=list[Expense])
def read_expenses():
    print("Fetching all expenses from main")
    return get_all_expenses()

@app.get("/expenses/{expense_id}", response_model=Expense)
def read_expense(expense_id: int):
    try:
        print(f"Fetching expense with ID from main: {expense_id}")
        return get_expense(expense_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.post("/expenses", response_model=Expense)
def create_new_expense(expense: Expense):
    try:
        return create_expense(expense.model_dump())
    except KeyError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/expenses/{expense_id}")
def delete_existing_expense(expense_id: int):
    try:
        delete_expense(expense_id)
        return {"detail": "Expense deleted successfully"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
