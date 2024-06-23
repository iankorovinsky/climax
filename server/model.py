# using kNN to find the closest match to a given country
# brief overview:
# compute euclidean distance, for multidimensional space, between the data point provided and all points in the training dataset (training phase of KNN is just the algo storing the training dataset)
# find nearest neighbhours in dataset closest to the point
# this is a regression KNN, we're using KNN to find the most similar country to a given country based on continuous value features and not assigning a discrete class label
# since its a regression, KNN takes average value of k nearest neighbhours (given by us) to predict value for closest country
import pandas as pd
from sklearn.neighbors import NearestNeighbors

# Load the cleaned data
data = pd.read_csv('../data/scaled_cleaned_data.csv')

# selected key features for comparison
features = ['Population', 'Mean income or consumption per day', 'poverty_gap_index_4000', 'Annual CO₂ emissions (per capita)', 'GDP per capita']

# handle missing values (if any)
data = data.dropna(subset=features)

# Implement k-NN
knn = NearestNeighbors(n_neighbors=2, algorithm='auto')
knn.fit(data[features])

# Function to find the most similar countries to find similar policies excluding the query country
def find_similar_countries_for_similar_policies(query_country, query_year):
    query_data = data[(data['Country'] == query_country) & (data['Year'] == query_year)]
    if query_data.empty:
        return []

    query_metrics = query_data[features].values
    distances, indices = knn.kneighbors(query_metrics, n_neighbors=51)
    
    # exclude the first neighbor which is the query country itself most of the times
    similar_country_index = indices[0][1:]
    similar_country = data.iloc[similar_country_index]

    # Returning the top 3 most similar countries
    distinct_countries = set()

    for country in similar_country['Country']:
        if country != query_country:
            distinct_countries.add(country)
            if len(distinct_countries) == 3:
                break

    return list(distinct_countries)

# Function to find the most similar countries for future emission prediction excluding the query country
def find_similar_countries_for_future_emissions(query_country, query_year):
    query_data = data[(data['Country'] == query_country) & (data['Year'] == query_year)]
    if query_data.empty:
        return []

    query_metrics = query_data[features].values
    distances, indices = knn.kneighbors(query_metrics, n_neighbors=51)
    
    # exclude the first neighbor which is the query country itself most of the times
    similar_country_index = indices[0][1:]
    similar_country = data.iloc[similar_country_index]

    # Returning the top 3 most similar countries
    distinct_countries = set()

    for _, row in similar_country.iterrows():
        if row['Country'] != query_country:
            country_year = f"{row['Country']},{row['Year']}"
            distinct_countries.add(country_year)
            if len(distinct_countries) == 5:
                break
    
    return list(distinct_countries)


#testing
# query_country = 'Canada' 
# query_year = 2019 # default query year
# similar_country = find_similar_countries_for_similar_policies(query_country, query_year)
# similar_country_for_predictions = find_similar_countries_for_future_emissions(query_country, query_year)
    
# print(similar_country)
# print(similar_country_for_predictions)



