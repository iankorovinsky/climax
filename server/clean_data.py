# Script to clean and create a data set with key features
import pandas as pd

# Define file paths and the expected columns for each file
files = {
    'co-emissions-per-capita.csv': ['Country', 'Code', 'Year', 'Annual CO₂ emissions (per capita)'],
    'gdp-per-capita-penn-world-table.csv': ['Country', 'Code', 'Year', 'GDP per capita'],
    'population-and-demography.csv': ['Country', 'Year', 'Population'],
    'poverty-explorer.csv': ['Country', 'Year', 'Mean income or consumption per day', 'poverty_gap_index_4000']
}

# Read and standardize each file
dataframes = {}
for file, columns in files.items():
    df = pd.read_csv(f'../data/{file}')
    df = df[columns]
    dataframes[file] = df

# Extract only necessary columns for merging
dataframes['population-and-demography.csv'] = dataframes['population-and-demography.csv'][['Country', 'Year', 'Population']]

# Start with the first dataframe and merge each one sequentially
merged_data = dataframes['co-emissions-per-capita.csv']
for file in files:
    # ignore the first csv to not merge with itself
    if file != 'co-emissions-per-capita.csv':
        merged_data = merged_data.merge(dataframes[file], how='outer', on=['Country', 'Year'])

# Drop 'Code' (country abbrev) columns if they exist
merged_data = merged_data.drop(columns=[col for col in merged_data.columns if 'Code' in col], errors='ignore')

# Drop rows with any NaN values in key columns
key_columns = ['Country', 'Population', 'Year', 'Mean income or consumption per day', 'poverty_gap_index_4000', 'Annual CO₂ emissions (per capita)', 'GDP per capita']
cleaned_data = merged_data.dropna(subset=key_columns)
cleaned_data.to_csv('cleaned_data.csv', index=False)



