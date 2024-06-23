from flask import Flask, jsonify, request
from flask_cors import CORS

from agent import Agent

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
agent = Agent()

@app.route('/')
def home():
    return jsonify(message="Welcome to the Flask App with CORS enabled!")

@app.route('/api/run_pipeline', methods=['GET'])
def run_pipeline():
    
    country_name = request.args.get('country')
    return jsonify(policy=)

if __name__ == '__main__':
    app.run(debug=True)
