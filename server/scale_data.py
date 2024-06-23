import pandas as pd
from sklearn.preprocessing import StandardScaler

# Load the cleaned data
data = pd.read_csv('../data/cleaned_data.csv')

# Select relevant features
features = ['Population', 'Mean income or consumption per day', 'poverty_gap_index_4000', 'Annual CO₂ emissions (per capita)', 'GDP per capita']

# Handle missing values (if any)
data = data.dropna(subset=features)

# Initialize the scaler
scaler = StandardScaler()

# Scale the features
# compute the mean and standard deviation for each feature and then transform the data by subtracting the mean and dividing by the standard deviation
data[features] = scaler.fit_transform(data[features])

# Save the scaled data to a new CSV file
scaled_data_file = 'scaled_cleaned_data.csv'
data.to_csv(scaled_data_file, index=False)