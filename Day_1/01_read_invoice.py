import csv

file_path = "../Invoice_Data/homework_invoices.csv"

total_invoices = 0
high_value_invoices = 0
invalid_amounts = 0

with open(file_path, mode="r", newline="", encoding="utf-8") as file:

    reader = csv.DictReader(file)

    for invoice in reader:

        total_invoices += 1

        vendor = invoice["vendor"]
        amount_value = invoice["amount"]
        status = invoice["status"]

        print(
            f"Vendor: {vendor}, "
            f"Amount: {amount_value}, "
            f"Status: {status}"
        )

        try:
            # Check for missing amount
            if not amount_value or not amount_value.strip():
                raise ValueError("Missing amount")

            # Convert amount from string to float
            amount = float(amount_value)

            # Check if amount is greater than 100,000
            if amount > 100000:
                high_value_invoices += 1
                print(f"  -> Invoice amount is greater than 100,000: {amount}")

        except (ValueError, TypeError):
            invalid_amounts += 1
            print("  -> Missing or invalid amount")

print("\n========== Invoice Summary ==========")
print(f"Total invoices read             : {total_invoices}")
print(f"Invoices greater than 100,000   : {high_value_invoices}")
print(f"Missing/invalid amount invoices : {invalid_amounts}")