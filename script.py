# Initial pre processing of data, clean out the continents
import os

# List of continents to be removed
continents = [
    'Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'
]

def contains_continent(line, continents):
    return any(continent in line for continent in continents)

def remove_continent_rows(input_file):
    with open(input_file, 'r', encoding='utf-8') as infile:
        lines = infile.readlines()
    
    cleaned_lines = [line for line in lines if not contains_continent(line, continents)]
    
    with open(input_file, 'w', encoding='utf-8') as outfile:
        outfile.writelines(cleaned_lines)

# Directory containing the CSV files
directory = 'data'

# Process each CSV file in the directory
for filename in os.listdir(directory):
    if filename.endswith('.csv'):
        filepath = os.path.join(directory, filename)
        remove_continent_rows(filepath)
