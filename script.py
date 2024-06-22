# pre process data to remove continents from economy and emissions csv (specify in directory)
import pandas as pd
import os

def remove_rows_with_double_commas(input_file):
    # Read the file line by line and filter out lines containing `,,`
    with open(input_file, 'r') as file:
        lines = file.readlines()
    
    cleaned_lines = [line for line in lines if ',,' not in line]
    
    # Write the cleaned lines back to the file
    with open(input_file, 'w') as file:
        file.writelines(cleaned_lines)
    
    print(f"Processed {input_file}")

# Directory containing the CSV files
directory = 'economy'

for filename in os.listdir(directory):
    if filename.endswith('.csv'):
        filepath = os.path.join(directory, filename)
        remove_rows_with_double_commas(filepath)