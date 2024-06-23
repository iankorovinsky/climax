import pandas as pd
import json
import math
import numpy as np
import sys


emission_decay = lambda year: math.e ** (-0.02 * year)


def country_to_code(country):
    dataset = pd.read_csv('economy.csv').drop('GDP Per Capita', axis=1).drop('Year', axis=1).drop_duplicates()
    return str(dataset[dataset['Entity'] == country]['Code'].to_string(index=False))


def find_optimal_split(fs, gs, country_code, period):
    min_split = 0
    max_corr = 0
    for split in range(1, period):
        if abs(fs[country_code][str(split)][1]) + abs(gs[country_code][str(period - split)][1]) > max_corr:
            max_corr = abs(fs[country_code][str(split)][1]) + abs(gs[country_code][str(period - split)][1])
            min_split = split
    return min_split


def get_emissions_graph(country, period, similar_country):
    # input is a string of the country name, an integer of the period, and an array of strings for similar country names

    if len(similar_country) == 0:
        similar_country = 'Canada'
    else:
        similar_country = similar_country[0]

    fs = {}
    gs = {}
    with open('fs.json', 'r') as f:
        fs = json.load(f)
    with open('gs.json', 'r') as f:
        gs = json.load(f)
    similar_country_code = country_to_code(similar_country)
    country_code = country_to_code(country)

    economy_dict = pd.read_csv('economy.csv').drop('Entity', axis=1).groupby('Code').apply(lambda x: x.set_index('Year')['GDP Per Capita'].to_dict()).to_dict()
    emission_dict = pd.read_csv('emission.csv').drop('Entity', axis=1).groupby('Code').apply(lambda x: x.set_index('Year')['CO2 Emissions Per Capita'].to_dict()).to_dict()

    current_emission = emission_dict[country_code][2019]
    current_economy = economy_dict[country_code][2019]

    minimum_total_emission = sys.maxsize  # set to max int
    for emission_to_test in range(int(current_emission * 0.5), int(current_emission * 1.5), max(int(current_emission * 0.1), 1)):
        total_emission = 0
        for delta in range(2, period, 2):
            split = find_optimal_split(fs, gs, similar_country_code, delta)
            total_emission += abs(current_emission * np.poly1d(gs[similar_country_code][str(delta - split)][0])(current_economy * np.poly1d(fs[similar_country_code][str(split)][0])(emission_to_test)) * emission_decay(delta))
        if total_emission < minimum_total_emission:
            minimum_total_emission = total_emission
            optimal_emission = emission_to_test
    
    future_emissions = []
    for delta in range(2, period, 2):
        split = find_optimal_split(fs, gs, similar_country_code, delta)
        future_emissions.append(abs(np.poly1d(fs['WRLD'])(delta) * (optimal_emission)))
    return future_emissions