# import json
# import boto3

# def lambda_handler(event, context):
#     print("event ======= ", event)
#     codepipeline = boto3.client('codepipeline')
#     pipeline_name = event['pipeline_name']
#     stage_name = event['stage_name']
    
#     # Get the pipeline state
#     response = codepipeline.get_pipeline_state(name=pipeline_name)
    
#     # Find the stage and retry execution
#     for stage in response['stageStates']:
#         if stage['stageName'] == stage_name:
#             execution_id = stage['latestExecution']['pipelineExecutionId']
#             response = codepipeline.retry_stage_execution(
#                 pipelineName=pipeline_name,
#                 stageName=stage_name,
#                 pipelineExecutionId=execution_id,
#                 retryMode='FAILED_ACTIONS'
#             )
#             return {
#                 'statusCode': 200,
#                 'body': f"Triggered stage {stage_name} of pipeline {pipeline_name}"
#             }
    
#     return {
#         'statusCode': 400,
#         'body': f"Stage {stage_name} not found in pipeline {pipeline_name}"
#     }


import json
import logging

# Assuming logger is defined somewhere earlier in the code
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    jobId = None
    
    # Check if the event is from CodePipeline
    if 'CodePipeline.job' in event:
        logger.info("Invocation from CodePipeline detected, ignoring the event.")
        jobId = event['CodePipeline.job']['id']
        return {
            'statusCode': 200,
            'body': json.dumps('Invocation ignored: Source is CodePipeline')
        }
    
    # Check if the event is from GitHub Actions
    if 'pipeline_name' in event and 'stage_name' in event:
        logger.info("Invocation from GitHub Actions detected")
        handle_github_actions_event(event)
        return {
            'statusCode': 200,
            'body': json.dumps('Invocation processed: Source is GitHub Actions')
        }
    
    # Unknown event source
    logger.warning("Unknown event source")
    return {
        'statusCode': 400,
        'body': json.dumps('Unknown event source')
    }

def handle_github_actions_event(event):
    pipeline_name = event['pipeline_name']
    stage_name = event['stage_name']
    logger.info(f"Processing GitHub Actions event for pipeline: {pipeline_name}, stage: {stage_name}")
    
    # Add your specific processing logic here
    logger.info("GitHub Actions event processed successfully.")
    
    # Notify CodePipeline upon successful completion
    try:
        complete_codepipeline_job(event)
        logger.info(f"Triggered CodePipeline {pipeline_name} to proceed to the next stage.")
    except Exception as e:
        logger.error(f"Error completing CodePipeline job: {str(e)}")
        raise

def complete_codepipeline_job(event):
    
    if not job_id:
        raise ValueError("Missing CodePipeline job ID in the event payload")
    
    try:
        codepipeline.put_job_success_result(jobId=job_id)
        logger.info(f"CodePipeline job {job_id} completed successfully.")
    except Exception as e:
        logger.error(f"Error completing CodePipeline job: {str(e)}")
        raise