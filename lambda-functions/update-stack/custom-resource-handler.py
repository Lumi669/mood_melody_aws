import json
import cfnresponse
import random
import string

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
        cfnresponse.send(event, context, cfnresponse.SUCCESS, response_data)
    except Exception as e:
        print("Exception: ", e)
        cfnresponse.send(event, context, cfnresponse.FAILED, {'Message': str(e)})
