import json
import sagemaker
import boto3
from sagemaker.huggingface import HuggingFaceModel, get_huggingface_llm_image_uri

try:
	role = "arn:aws:iam::205377017620:role/service-role/AmazonSageMaker-ExecutionRole-20240623T061596"
except ValueError:
	iam = boto3.client('iam')
	role = iam.get_role(RoleName='sagemaker_execution_role')['Role']['Arn']

# Hub Model configuration. https://huggingface.co/models
hub = {
	'HF_MODEL_ID':'meta-llama/Meta-Llama-3-8B',
	'SM_NUM_GPUS': json.dumps(1),
	'HUGGING_FACE_HUB_TOKEN': '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'
}

# assert hub['HUGGING_FACE_HUB_TOKEN'] != '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', "You have to provide a token."

# create Hugging Face Model Class
huggingface_model = HuggingFaceModel(
	image_uri=get_huggingface_llm_image_uri("huggingface",version="2.0.2"),
	env=hub,
	role=role, 
)

# deploy model to SageMaker Inference
predictor = huggingface_model.deploy(
	initial_instance_count=1,
	instance_type="ml.g5.2xlarge",
	container_startup_health_check_timeout=300,
  )
  
# send request
predictor.predict({
	"inputs": "My name is Julien and I like to",
})