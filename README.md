## Developer's Note

This is a solo project that I’ve built from scratch over the course of a year. It includes over 1300 commits and more than 1700 CI/CD workflow runs. Every part of the architecture — from infrastructure-as-code and AWS Lambda backend to frontend UI and deployment — has been designed, developed, tested, and maintained by me.

It demonstrates not only my technical skills but also my long-term dedication, problem-solving ability, and ownership of full-stack development workflows. Code that adapts open-source patterns or external contributions is credited in the README where applicable.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Local Development](#local-development)
- [Docker (Frontend)](#docker-frontend)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [CI/CD & Deployment](#cicd--deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

Mood Melody is an intelligent music player that pairs every song with a mood‑matched image. Tap a mood button or type in your vibe the AI then analyzes your input, curates the perfect soundtrack, and displays an evocative visual for a fully immersive experience.

[![Last Commit](https://img.shields.io/github/last-commit/Lumi669/mood_melody_aws)](https://github.com/Lumi669/mood_melody_aws/commits)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Lumi669/mood_melody_aws/build-frontend.yml?label=build)](https://github.com/Lumi669/mood_melody_aws/actions)
[![Last Deploy](https://mood-melody-badges-images-prod.s3.eu-north-1.amazonaws.com/mood-melody-prod.svg)](https://github.com/Lumi669/mood_melody_aws/actions/workflows/deploy.yml)
[![License: PolyForm Noncommercial](https://img.shields.io/badge/License-PolyForm%20Noncommercial-blue.svg)](LICENSE)

---

## Features

- 🎵 Play/pause tracks based on your mood
- 📊 Mood analytics based on your text input
- AI‑Powered Curation: Emotion detection via NLP for spot‑on song and image pairing
- 🔥 Serverless, scales on AWS Lambda
- CI/CD setup
- Docker

---

## Prerequisites

- Node.js ≥ 16
- Docker
- AWS CLI & credentials configured (for deployment)

---

## Getting Started

1. **Clone** the repo

   ```bash
   git clone https://github.com/Lumi669/mood_melody_aws.git
   cd mood_melody_aws

   ```

2. Install dependencies

### mood_melody_aws

pnpm install

### backend

cd backend && pnpm install

### frontend

cd ../frontend && pnpm install

3. Run locally

### in two separate shells:

cd backend && pnpm run build && pnpm run dev
cd frontend && pnpm run build && pnpm run dev

App will be available at: http://localhost:3000

## Local Frontend Docker Image Build

bash
Copy
Edit
cd frontend
docker build -t mood-melody-frontend:latest .

Architecture
See ARCHITECTURE for an overview of:

Lambda functions

API Gateway

S3 bucket for static site

CloudFront distribution

CI/CD & Deployment
I use two pipelines:

GitHub Actions for CI (build & tests)

AWS CodePipeline for CD (deploy & rollback)

To see the health at a glance, check the badges above or visit:

CI runs: https://github.com/Lumi669/mood_melody_aws/actions

Live site: https://mood-melody.ensintek.com/

Contributing

Fork the repo

Create your feature branch (git checkout -b feature/awesome)

Commit your changes (git commit -m 'Add awesome feature')

Push (git push origin feature/awesome)

Open a Pull Request

Please read our Code of Conduct before contributing.

## License

This project is licensed under the PolyForm Noncommercial 1.0.0 license.
See the LICENSE file for details. Commercial use is prohibited without a separate paid license.

## Contact

Lumi669 – wangjinghuan@yahoo.com
Project Link: https://github.com/Lumi669/mood_melody_aws

Local Development
⚠️ Note: This project depends on AWS services (S3, Lambda, DynamoDB, Comprehend, etc). Even for local testing, you’ll need an AWS account with proper credentials.

📦 Deployment Details
This project is fully deployed to AWS using CloudFormation, S3, Lambda, API Gateway, and CodePipeline.

🖼️ Architecture diagrams and CI/CD flow are explained in detail in the app’s About > Tech section:
👉 http://localhost:3000/about/tech/cicd
or
https://mood-melody.ensintek.com/about/tech/cicd

## Run local app with docker

### at root i.e mood_melody_aws

1. backend

### build backend image

docker build -t my-backend -f backend/Dockerfile backend

### Run it, mounting the local DB

docker run -d --name my-backend \
 -p 9000:8080 \
 -v "$(pwd)/backend/moodmelodydatabase.db:/var/task/moodmelodydatabase.db" \
 my-backend

### test backend working or not

curl -i -XPOST http://localhost:9000/2015-03-31/functions/function/invocations \
 -H "Content-Type: application/json" \
 -d '{"route":"GET /songs"}'

HTTP/1.1 200 OK
Date: Fri, 25 Apr 2025 20:53:59 GMT
Content-Length: 423
Content-Type: text/plain; charset=utf-8

{"statusCode":200,"headers":{"x-powered-by":"Express","access-control-allow-origin":"\*","x-ratelimit-limit":"5","x-ratelimit-remaining":"4","date":"Fri, 25 Apr 2025 20:53:59 GMT","x-ratelimit-reset":"1745614470","content-type":"application/json; charset=utf-8","content-length":"57","etag":"W/\"39-FqPhC/ocgcZW6apeUQPxYsdw7lc\""},"isBase64Encoded":false,"body":"\"Welcome to the backend of the mood-melody app .......//\""}%

2. frontend

- build frontend image

  docker build -t my-frontend \
  -f frontend/Dockerfile \
  frontend \
  --build-arg NEXT_PUBLIC_API_URL_0=http://my-backend:9000/2015-03-31/functions/function/invocations

- run frontend

docker rm -f my-frontend  
docker run -d \
 --name my-frontend \
 --network moodmelody_net \
 -p 7001:7000 \
 -e NEXT_PUBLIC_API_URL_0=http://my-backend:9000/2015-03-31/functions/function/invocations \
 my-frontend

app is available at http://localhost:7001/
note: data is not populated
