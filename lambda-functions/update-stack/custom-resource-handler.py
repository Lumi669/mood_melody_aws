import json
import random
import string
from cfnresponse import send, SUCCESS, FAILED

def handler(event, context):
    print("Custom resource event: ", event)
    
    try:
        # Validate required fields in the event
        required_fields = ['ResponseURL', 'StackId', 'RequestId', 'LogicalResourceId']
        for field in required_fields:
            if field not in event:
                raise KeyError(f"'{field}' not found in the event.")

        # Handle the request type
        request_type = event.get('RequestType')
        if request_type in ['Create', 'Update']:
            # Generate a random string
            random_string = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
            response_data = {'RandomString': random_string}
            print(f"Generated RandomString: {random_string}")
            send(event, context, SUCCESS, response_data)

        elif request_type == 'Delete':
            response_data = {}
            send(event, context, SUCCESS, response_data)

        else:
            raise ValueError(f"Invalid request type: {request_type}")

    except Exception as e:
        print("Exception: ", e)
        send(event, context, FAILED, {'Message': str(e)})
