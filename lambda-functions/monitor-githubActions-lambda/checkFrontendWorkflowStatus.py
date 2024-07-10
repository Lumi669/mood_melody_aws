import json
import boto3
import requests

codepipeline = boto3.client('codepipeline')

def lambda_handler(event, context):
    print("Event from checkFrontendWorkflowStatus ======== ", event)
    
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
    
    # Check if the response is successful
    if response.status_code != 200:
        print(f"Failed to get workflow run: {response.status_code} {response.text}")
        codepipeline.put_job_failure_result(
            jobId=event['jobId'],
            failureDetails={
                'type': 'JobFailed',
                'message': f"Failed to get workflow run: {response.status_code} {response.text}"
            }
        )
        return {
            'statusCode': response.status_code,
            'body': json.dumps('Failed to get workflow run')
        }
    
    workflow_run = response.json()
    
    if workflow_run['status'] == 'completed':
        if workflow_run['conclusion'] == 'success':
            codepipeline.put_job_success_result(jobId=event['jobId'])
            return {
                'statusCode': 200,
                'body': json.dumps('Success')
            }
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
        codepipeline.put_job_failure_result(
            jobId=event['jobId'],
            failureDetails={
                'type': 'JobFailed',
                'message': f"Workflow run is not completed yet: {workflow_run['status']}"
            }
        )
    
    return {
        'statusCode': 500,
        'body': json.dumps('Workflow run is not completed or failed')
    }
