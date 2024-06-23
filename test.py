
import os
import pandas as pd

for file in os.listdir('./economy'):
    df = pd.read_csv(f'./economy/{file}')

    # Display the first few rows of the DataFrame
    print(df.head())

    # Display the data types of the columns
    print(df.dtypes)