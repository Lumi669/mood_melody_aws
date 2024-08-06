import json
import boto3

def handler(event, context):
    print("Custom resource event: ", event)
    
    response = {
        'Status': 'SUCCESS',
        'PhysicalResourceId': context.log_stream_name,
        'StackId': event['StackId'],
        'RequestId': event['RequestId'],
        'LogicalResourceId': event['LogicalResourceId'],
        'Data': {'Message': 'Triggered'}
    }
    
    print("Response to CloudFormation: ", json.dumps(response))
    
    return response
