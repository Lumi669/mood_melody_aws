import json
import requests
import random
import string

def send_response(event, context, response_status, response_data, physical_resource_id=None, no_echo=False):
    try:
        response_url = event['ResponseURL']
    except KeyError:
        print("ResponseURL not found in the event.")
        return

    response_body = {
        'Status': response_status,
        'Reason': f'See the details in CloudWatch Log Stream: {context.log_stream_name}',
        'PhysicalResourceId': physical_resource_id or context.log_stream_name,
        'StackId': event['StackId'],
        'RequestId': event['RequestId'],
        'LogicalResourceId': event['LogicalResourceId'],
        'NoEcho': no_echo,
        'Data': response_data
    }

    json_response_body = json.dumps(response_body)

    print("Response body:\n", json_response_body)

    headers = {
        'content-type': '',
        'content-length': str(len(json_response_body))
    }

    try:
        response = requests.put(response_url, data=json_response_body, headers=headers)
        print("Status code:", response.status_code)
        print("Status message:", response.reason)
    except Exception as e:
        print("Failed to send response to CloudFormation:", e)

def handler(event, context):
    print("Custom resource event: ", event)
    
    try:
        # Validate required fields in the event
        required_fields = ['ResponseURL', 'StackId', 'RequestId', 'LogicalResourceId']
        for field in required_fields:
            if field not in event:
                raise KeyError(f"'{field}' not found in the event.")
        
        # Generate a random string to force an update
        random_string = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        print(f"Generated random string: {random_string}")

        # Log the response data being sent
        response_data = {'RandomString': random_string}
        print("Response data being sent:", response_data)

        # If everything is successful
        send_response(event, context, "SUCCESS", response_data)
    except Exception as e:
        print("Exception: ", e)
        send_response(event, context, "FAILED", {'Message': str(e)})
