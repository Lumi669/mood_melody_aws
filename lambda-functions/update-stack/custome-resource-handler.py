import json
import boto3

def lambda_handler(event, context):
    print("Custom resource event: ", event)
    response = {
        'Status': 'SUCCESS',
        'PhysicalResourceId': context.log_stream_name,
        'StackId': event['StackId'],
        'RequestId': event['RequestId'],
        'LogicalResourceId': event['LogicalResourceId'],
        'Data': {'Message': 'Triggered'}
    }
    return response
