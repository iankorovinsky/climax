from flask import Flask, jsonify, request
from flask_cors import CORS

from agent import Agent
from dynamo import DynamoAccessor
import model
import optimal_emissions

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
agent = Agent()
global_summary = ""
global_similar_countries = []
global_similar_policies = ""
db = DynamoAccessor()
prediction = []

@app.route('/')
def home():
    return jsonify(message="Welcome to the Flask App with CORS enabled!")

# endpoint 1
# display current policy summary
@app.route('/api/current_policy', methods=['GET'])
def current_policy():
    print('hit')
    global agent
    country_name = request.args.get('country')
    contexts = agent.knowledge_base_query(country_name)
    global global_summary
    global_summary = agent.invoke_agent(f"Please generate a summary of the climate policies of {country_name}. Here are their current policies: {contexts}")
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
        return jsonify({"similar_policy":"No similar policies were found. Check back later!"})
    else:
        policies = []
        for item in similar_countries:
            policy = db.query(item)
            print(policy)
            policies.append(agent.similar_policy_summary(item, policy))
        return jsonify({"similar_policy":"\n".join(policies)})

# endpoint 3
# display prediction of what needs to change
@app.route('/api/calculate_prediction', methods=['GET'])
def calculate_prediction():
    country_name = request.args.get('country')
    global global_similar_countries
    global prediction
    prediction = optimal_emissions.get_emissions_graph(country_name, 20, global_similar_countries)
    start_year = 2024

    # Creating the dictionary
    prediction_dict = {start_year + 2 * i: prediction[i] for i in range(len(prediction))}
    return jsonify({"prediction":prediction_dict})

# endpoint 4
# display new policy based off krish's prediction
@app.route('/api/generate_recommendation', methods=['GET'])
def generate_recommendation():
    country_name = request.args.get('country')
    global global_summary, prediction, global_similar_policies 
    contexts = f"Improved Policies: {global_similar_policies}\nHow we want to improve our climate scores, the first score is our current score:{prediction}"
    results = agent.llm_query(country_name, contexts, global_summary)
    return jsonify({"results":results})



if __name__ == '__main__':
    app.run(debug=True)
