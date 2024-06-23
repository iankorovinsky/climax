from flask import Flask, jsonify, request
from flask_cors import CORS

from agent import Agent

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
agent = Agent()

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
    summary = agent.llm_summary(country_name, contexts)
    return jsonify({"current_policy":summary})

# endpoint 2
# display similar policies 

# endpoint 3
# display prediction of what needs to change

# endpoint 4
# display new policy based off krish's prediction

if __name__ == '__main__':
    app.run(debug=True)
