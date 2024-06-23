from flask import Flask, jsonify, request
from flask_cors import CORS

from agent import Agent
from dynamo import DynamoAccessor
import model

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
agent = Agent()
global_summary = ""
global_similar_countries = ""
global_similar_policies = ""
db = DynamoAccessor()

@app.route('/')
def home():
    return jsonify(message="Welcome to the Flask App with CORS enabled!")

# endpoint 1
# display current policy summary
@app.route('/api/current_policy', methods=['GET'])
def current_policy():
    global agent
    country_name = request.args.get('country')
    contexts = agent.knowledge_base_query(country_name)
    global global_summary
    global_summary = agent.llm_summary(country_name, contexts)
    return jsonify({"current_policy":global_summary})

# endpoint 2
# display similar policies 
@app.route('/api/similar_policy', methods=['GET'])
def similar_policy():
    global agent
    country_name = request.args.get('country')
    similar_countries = model.find_similar_countries_for_similar_policies(country_name)
    global global_similar_countries
    global_similar_countries = similar_countries
    global global_similar_policies
    if similar_countries == []:
        return jsonify({"current_policy":"No similar policies were found. Check back later!"})
    else:
        policies = []
        for item in similar_countries:
            policy = db.query(item)
            print(policy)
            policies.append(agent.similar_policy_summary(item, policy))
        return jsonify({"similar_policy":"\n".join(policies)})

# endpoint 3
# display prediction of what needs to change

# endpoint 4
# display new policy based off krish's prediction


if __name__ == '__main__':
    app.run(debug=True)
