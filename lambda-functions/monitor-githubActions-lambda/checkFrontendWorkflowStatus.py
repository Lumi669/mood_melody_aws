import json
import boto3
import requests

codepipeline = boto3.client('codepipeline')

def lambda_handler(event, context):
    owner = event['owner']
    repo = event['repo']
    workflow_id = event['workflow_id']
    run_id = event['run_id']
    token = event['token']
    
    headers = {
        'Authorization': f'token {token}',
        'Accept': 'application/vnd.github.v3+json',
    }
    
    url = f'https://api.github.com/repos/{owner}/{repo}/actions/runs/{run_id}'
    response = requests.get(url, headers=headers)
    workflow_run = response.json()
    
    if workflow_run['status'] == 'completed':
        if workflow_run['conclusion'] == 'success':
            codepipeline.put_job_success_result(jobId=event['jobId'])
        else:
            codepipeline.put_job_failure_result(
                jobId=event['jobId'],
                failureDetails={
                    'type': 'JobFailed',
                    'message': f"GitHub Actions workflow failed with conclusion: {workflow_run['conclusion']}"
                }
            )
    else:
        # Log the current status if the workflow run is not completed
        print(f"Workflow run status: {workflow_run['status']}")
        raise Exception('Workflow run is not completed yet')

    return {
        'statusCode': 200,
        'body': json.dumps('Success')
    }
