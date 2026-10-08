import importlib
from fastapi import FastAPI


create_employee = importlib.import_module(
    "01_create_employee"
).router

get_employees = importlib.import_module(
    "02_get_employees"
).router


app = FastAPI()


app.include_router(create_employee)
app.include_router(get_employees)