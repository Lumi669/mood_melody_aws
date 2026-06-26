# Repository Coding Rules for Mood Melody

## Project Context

This is a production full-stack web application, not an AI agent project.

Tech stack:

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Cloud: AWS Lambda, API Gateway, S3, CloudFormation/SAM
- CI/CD: GitHub Actions / AWS deployment pipeline

## Change Scope Rules

Always make the smallest possible change that solves the requested issue.

Do not change existing app functionality unless explicitly required.

Do not modify the following unless I explicitly ask:

- CI/CD workflows
- GitHub Actions
- Dockerfiles
- AWS deployment files
- CloudFormation/SAM templates
- environment variables
- package versions
- database schema
- API contracts
- authentication logic
- file/folder structure

Do not refactor unrelated code.

If you notice unrelated problems, mention them but do not fix them automatically.

## Before Editing

Before changing files, explain:

- which files you plan to edit
- why each file needs to be changed
- whether the change affects frontend, backend, database, or deployment

## After Editing

After changing files, summarize:

- every modified file
- what changed
- whether functionality, API behavior, CI/CD, or deployment was affected

## Safety Rule

If a requested change seems to require modifying CI/CD, deployment, package versions, or app behavior, ask for confirmation first.
