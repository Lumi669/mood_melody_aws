import json
import boto3

def lambda_handler(event, context):
    print("event ======= ", event)
    codepipeline = boto3.client('codepipeline')
    pipeline_name = event['pipeline_name']
    stage_name = event['stage_name']
    
    # Get the pipeline state
    response = codepipeline.get_pipeline_state(name=pipeline_name)
    
    # Find the stage and retry execution
    for stage in response['stageStates']:
        if stage['stageName'] == stage_name:
            execution_id = stage['latestExecution']['pipelineExecutionId']
            response = codepipeline.retry_stage_execution(
                pipelineName=pipeline_name,
                stageName=stage_name,
                pipelineExecutionId=execution_id,
                retryMode='FAILED_ACTIONS'
            )
            return {
                'statusCode': 200,
                'body': f"Triggered stage {stage_name} of pipeline {pipeline_name}"
            }
    
    return {
        'statusCode': 400,
        'body': f"Stage {stage_name} not found in pipeline {pipeline_name}"
    }
