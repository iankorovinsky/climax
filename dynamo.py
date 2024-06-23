import boto3
import math
from boto3.dynamodb.conditions import Attr
from tqdm import tqdm
import pandas as pd


class DynamoAccessor:

    def __init__(self):
        self.dynamodb = boto3.resource('dynamodb')
        self.table = self.dynamodb.Table('Policies')

    def create_table(self):
        self.table = self.dynamodb.create_table(
            TableName='Policies',
            KeySchema=[
                {
                    'AttributeName': 'policy_id',
                    'KeyType': 'HASH'
                },
                {
                    'AttributeName': 'country',
                    'KeyType': 'RANGE'
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'policy_id',
                    'AttributeType': 'N'
                },
                {
                    'AttributeName': 'country',
                    'AttributeType': 'S'
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 3,
                'WriteCapacityUnits': 5
            }
        )
        print("Table status:", self.table.table_status)


    def add(self, dictionary):
        self.table.put_item(
        Item=dictionary
        )

    def query(self, country):
        
        # Define your query parameters
        response = self.table.scan(
            FilterExpression=Attr('country').eq(country),
        )

        #print(response)


        count = 0
        max_results = 2
        results = []
        # Print up to max_results items
        for item in response['Items']:
            results.append(item)
            count += 1
            if count >= max_results:
                break
        return results
    

db = DynamoAccessor()
db.query("Ukraine")