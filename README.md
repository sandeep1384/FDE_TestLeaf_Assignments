# Invoice CSV Reader and Validator

A simple Python program that reads invoice records from a CSV file, validates invoice amounts, identifies invoices above a specified threshold, and handles invalid or missing amount values without stopping the program.

## 📌 Program Details

**Python File:**

```text
01_read_invoice.py
```

The program reads invoice records from a CSV file and checks the following fields:

* Vendor
* Amount
* Status

It also validates the invoice amount and generates a summary after processing all records.

---

## 🎯 Objectives

The program demonstrates the following Python concepts:

* Reading CSV files using Python
* Processing records row by row
* Accessing CSV columns
* Type conversion using `float()`
* Conditional statements
* Exception handling using `try / except`
* Handling missing or invalid data
* Maintaining counters
* Printing a summary report

---

## 📂 Project Structure

## 📂 Project Structure

```text
FDE_TestLeaf_Assignments/
│
├── .venv/
│
├── Day_1/
│   └── 01_read_invoice.py
│
├── Invoice_Data/
│   └── homework_invoices.csv
│
└── README.md

## 📄 Sample CSV File

Example `invoices.csv`:

```csv
Vendor,Amount,Status
ABC Technologies,125000,Paid
XYZ Solutions,75000,Pending
PQR Services,150000,Paid
Test Vendor,Invalid,Pending
Missing Amount,,Pending
MNO Enterprises,95000,Paid
```

---

## 🔄 Expected Flow

```text
Read CSV
   ↓
Read Each Invoice
   ↓
Read Vendor, Amount, Status
   ↓
Check Amount
   ↓
Is Amount Valid?
   ├── No → Handle Invalid Data → Continue
   │
   └── Yes
         ↓
   Amount > 100,000?
         ├── Yes → Count High-Value Invoice
         └── No
         ↓
   Process Next Invoice
         ↓
Print Summary
```

---

## ✅ Validation Rules

For each invoice:

### 1. Read Invoice Details

The program reads:

```text
Vendor
Amount
Status
```

### 2. Check Invoice Amount

Invoices with an amount greater than `100,000` are identified.

```python
if amount > 100000:
    high_value_invoices += 1
```

### 3. Handle Invalid Amount

The program uses `try / except` to handle values that cannot be converted to a number.

Examples:

```text
Invalid
ABC
N/A
```

Missing values are also treated as invalid.

The program should **not stop processing** when an invalid invoice is encountered.

---

## 🛠️ Example Implementation

```python
import csv

total_invoices = 0
high_value_invoices = 0
invalid_amounts = 0

with open("invoices.csv", mode="r", newline="", encoding="utf-8") as file:

    reader = csv.DictReader(file)

    for invoice in reader:

        total_invoices += 1

        vendor = invoice["Vendor"]
        amount_value = invoice["Amount"]
        status = invoice["Status"]

        print(f"Vendor: {vendor}, Amount: {amount_value}, Status: {status}")

        try:
            if not amount_value or not amount_value.strip():
                raise ValueError("Missing amount")

            amount = float(amount_value)

            if amount > 100000:
                high_value_invoices += 1
                print(f"  → High-value invoice: {amount}")

        except (ValueError, TypeError):
            invalid_amounts += 1
            print("  → Invalid or missing amount")

print("\n========== Invoice Summary ==========")
print(f"Total invoices read              : {total_invoices}")
print(f"Invoices greater than 100,000    : {high_value_invoices}")
print(f"Missing/invalid amount invoices  : {invalid_amounts}")
```

---

## 📊 Example Output

```text
Vendor: ABC Technologies, Amount: 125000, Status: Paid
  → High-value invoice: 125000.0

Vendor: XYZ Solutions, Amount: 75000, Status: Pending

Vendor: PQR Services, Amount: 150000, Status: Paid
  → High-value invoice: 150000.0

Vendor: Test Vendor, Amount: Invalid, Status: Pending
  → Invalid or missing amount

Vendor: Missing Amount, Amount: , Status: Pending
  → Invalid or missing amount

Vendor: MNO Enterprises, Amount: 95000, Status: Paid


========== Invoice Summary ==========
Total invoices read              : 6
Invoices greater than 100,000    : 2
Missing/invalid amount invoices  : 2
```

---

## 🧠 Key Python Concepts

### CSV Module

Python's built-in `csv` module is used to read the invoice file.

```python
import csv
```

### `csv.DictReader`

`DictReader` allows each CSV row to be accessed using column names.

```python
reader = csv.DictReader(file)
```

For example:

```python
vendor = invoice["Vendor"]
amount = invoice["Amount"]
status = invoice["Status"]
```

### Exception Handling

Invalid amount values are handled using `try / except`.

```python
try:
    amount = float(amount_value)
except (ValueError, TypeError):
    invalid_amounts += 1
```

This prevents one bad invoice record from terminating the entire program.

---

## ▶️ How to Run

Make sure Python is installed:

```bash
python --version
```

Run the program:

```bash
python 01_read_invoice.py
```

On Windows, you can also use:

```bash
py 01_read_invoice.py
```

---

## 📋 Requirements

No external Python packages are required.

The program uses Python's built-in:

```text
csv
```

module.

---

## 🚀 Possible Enhancements

This exercise can be extended with:

* Validate Vendor name
* Validate Status values
* Calculate total invoice amount
* Calculate average invoice amount
* Identify duplicate invoices
* Export invalid invoices to another CSV
* Generate an invoice summary report
* Add logging using Python's `logging` module
* Add unit tests using `pytest`
* Accept CSV filename through command-line arguments
* Convert the program into a reusable Python function/class

---

## 📚 Learning Outcome

After completing this exercise, you should understand how to:

1. Read structured data from a CSV file.
2. Process records one by one.
3. Convert string values into numeric values.
4. Identify high-value invoices.
5. Handle missing and invalid data.
6. Use `try / except` without stopping the complete program.
7. Generate a simple processing summary.

---

## 👨‍💻 Author

**Sandeep Patil**

