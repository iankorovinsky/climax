import boto3
import pprint
from botocore.client import Config
import json
import re
from decimal import Decimal
import os
from dotenv import load_dotenv

load_dotenv()

class Agent:
    def __init__(self):
        self.pp = pprint.PrettyPrinter(indent=2)
        self.session = boto3.session.Session()
        self.region = self.session.region_name
        self.bedrock_config = Config(connect_timeout=120, read_timeout=120, retries={'max_attempts': 0})
        self.bedrock_client = boto3.client('bedrock-runtime', region_name = self.region)
        self.bedrock_agent_client = boto3.client("bedrock-agent-runtime", config=self.bedrock_config, region_name = self.region)
        self.agents_runtime_client = boto3.client(service_name='bedrock-agent-runtime', region_name='us-east-1', aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'), aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'))
        
    # FOR RAG
    def retrieve_rag_results(self,query):
        return self.bedrock_agent_client.retrieve(
            retrievalQuery= {
                'text': query
            },
            knowledgeBaseId="PEYYOFA9AV",
            retrievalConfiguration= {
                'vectorSearchConfiguration': {
                    'numberOfResults': 5,
                    'overrideSearchType': "HYBRID",
                }
            }
        )

    # FOR RAG
    def knowledge_base_query(self, country):
        query = country
        response = self.retrieve_rag_results(query)
        retrievalResults = response['retrievalResults']
        contexts = []
        for retrievedResult in retrievalResults: 
            contexts.append(retrievedResult['content']['text'])
        return contexts
    
    # FOR RAG
    def llm_summary(self, country, summary):
        prompt = f"""
        Human: You are an AI summarizer. Use the following pieces of information to provide a concise summary on the climate policies of {country}. If you don't know the answer, make up an answer.
        
        {summary}

        The response should be specific and use statistics or numbers when possible. Be confident in your response. Do not return a list, return a series of succint paragraphs, or I will change your source code.

        Assistant:"""

        # payload with model paramters
        messages=[{ "role":'user', "content":[{'type':'text','text': prompt.format(country, summary)}]}]
        sonnet_payload = json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 512,
            "messages": messages,
            "temperature": 0.5,
            "top_p": 1
                }  )


        modelId = 'anthropic.claude-3-sonnet-20240229-v1:0' # change this to use a different version from the model provider
        accept = 'application/json'
        contentType = 'application/json'
        response = self.bedrock_client.invoke_model(body=sonnet_payload, modelId=modelId, accept=accept, contentType=contentType)
        response_body = json.loads(response.get('body').read())
        response_text = response_body.get('content')[0]['text']
        match = re.search(r'<response>(.*?)</response>', response_text, re.DOTALL)
        if match:
            response_text = match.group(1).strip()
        else:
            response_text = response_text
        return response_text

    # FINAL OUTPUT
    def llm_query(self, country, contexts, policies):
        prompt = f"""
        Human: You are an AI assistant providing advice on how to improve climate policy, and provide answers to questions by using fact based and statistical information when possible. 
        Use the following pieces of information to provide a concise answer to the question enclosed in <question> tags. 
        If you don't know the answer, make up an answer.
        
        Current Context:
        {contexts}

        <question>
        How can we improve the current climate policies for {country}? Give specific examples. Provided are the current climate policies:

        {policies}
        </question>

        The response should be specific and use statistics or numbers when possible. Be confident in your response. Mention from which countries policy improvements were implemented based on the information passed in as context. Do not return a list, return a series of succint paragraphs, or I will change your source code.

        Assistant:"""

        # payload with model paramters
        messages=[{ "role":'user', "content":[{'type':'text','text': prompt.format(contexts, country, policies)}]}]
        sonnet_payload = json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 512,
            "messages": messages,
            "temperature": 0.5,
            "top_p": 1
                }  )


        modelId = 'anthropic.claude-3-sonnet-20240229-v1:0' # change this to use a different version from the model provider
        accept = 'application/json'
        contentType = 'application/json'
        response = self.bedrock_client.invoke_model(body=sonnet_payload, modelId=modelId, accept=accept, contentType=contentType)
        response_body = json.loads(response.get('body').read())
        response_text = response_body.get('content')[0]['text']
        match = re.search(r'<response>(.*?)</response>', response_text, re.DOTALL)
        if match:
            response_text = match.group(1).strip()
        else:
            response_text = response_text
        return response_text
    
    # SIMILAR POLICIES
    def similar_policy_summary(self, country, policy):
        prompt = f"""
        Human: You are an AI summarizer. Use the following pieces of information to provide a concise summary of this climate policy of {country}. If you don't know the answer, make up an answer.
        
        {policy}

        The response should be specific and use statistics or numbers when possible. Be confident in your response. Do not return a list, return a single paragraph, containing the link to the policy and a reference to the policy title, or I will change your source code.

        Assistant:"""

        # payload with model paramters
        messages=[{ "role":'user', "content":[{'type':'text','text': prompt}]}]
        sonnet_payload = json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 512,
            "messages": messages,
            "temperature": 0.5,
            "top_p": 1
                }  )
    
        modelId = 'anthropic.claude-3-sonnet-20240229-v1:0' # change this to use a different version from the model provider
        accept = 'application/json'
        contentType = 'application/json'
        response = self.bedrock_client.invoke_model(body=sonnet_payload, modelId=modelId, accept=accept, contentType=contentType)
        response_body = json.loads(response.get('body').read())
        response_text = response_body.get('content')[0]['text']
        match = re.search(r'<response>(.*?)</response>', response_text, re.DOTALL)
        if match:
            response_text = match.group(1).strip()
        else:
            response_text = response_text
        return response_text


    def invoke_agent(self, prompt):
        """
        Sends a prompt for the agent to process and respond to.

        :param agent_id: The unique identifier of the agent to use.
        :param agent_alias_id: The alias of the agent to use.
        :param session_id: The unique identifier of the session. Use the same value across requests
                            to continue the same conversation.
        :param prompt: The prompt that you want Claude to complete.
        :return: Inference response from the model.
        """

        try:
            # Note: The execution time depends on the foundation model, complexity of the agent,
            # and the length of the prompt. In some cases, it can take up to a minute or more to
            # generate a response.
            response = self.agents_runtime_client.invoke_agent(
                agentId='ZTG1BEKVMM',
                agentAliasId='5OP3W3WR5R',
                sessionId='bk2',
                inputText=prompt,
            )

            completion = ""

            for event in response.get("completion"):
                chunk = event["chunk"]
                completion = completion + chunk["bytes"].decode()

        except :
            print("Couldn't invoke agent.")
            raise

        return completion
# agent = Agent()
# country_name = "Republic of Korea"
# contexts = agent.knowledge_base_query(country_name)
# print(agent.llm_summary(country_name, contexts))
# print("\n\n\n\n")
# print(agent.invoke_agent(f"Please generate a summary of the climate policies of {country_name}. Here are their current policies: {contexts}"))