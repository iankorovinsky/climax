import pandas as pd

# Load the CO emissions by sector data
emissions_df = pd.read_csv('./data/co-emissions-by-sector.csv')

# Load the population data
population_df = pd.read_csv('./data/population-and-demography.csv')

# Ensure that the column names are correct
print(emissions_df.columns)
print(population_df.columns)

# Merge the emissions data with the population data on 'Entity' and 'Year'
merged_df = pd.merge(emissions_df, population_df[['Country name', 'Year', 'Population']], left_on=['Entity', 'Year'], right_on=['Country name', 'Year'])

# Normalize CO emissions by dividing by the total population
# Assuming 'Population' is the column name for the total population in the population_df
for column in merged_df.columns:
    if 'emissions' in column:
        merged_df[column] = merged_df[column] / merged_df['Population']

# Drop the total_population column as it's no longer needed
merged_df = merged_df.drop(columns=['Population', 'Country name'])

# Save the normalized data to a new CSV file
normalized_output_file = 'normalized_co-emissions-by-sector.csv'
merged_df.to_csv(normalized_output_file, index=False)

print(f"Normalized data saved to {normalized_output_file}")
