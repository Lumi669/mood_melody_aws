"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const axios_1 = __importDefault(require("axios"));
const ssm = new aws_sdk_1.SSM();
const cloudformation = new aws_sdk_1.CloudFormation();
const handler = (event) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
      // Step 1: Retrieve CloudFormation outputs
      const stackName = "mood-melody-backend"; // Replace with your CloudFormation stack name
      const describeStacksResponse = yield cloudformation
        .describeStacks({ StackName: stackName })
        .promise();
      if (
        !describeStacksResponse.Stacks ||
        describeStacksResponse.Stacks.length === 0
      ) {
        throw new Error("No stacks found in CloudFormation response");
      }
      const outputs = describeStacksResponse.Stacks[0].Outputs;
      let backendApiUrl;
      if (outputs) {
        for (const output of outputs) {
          if (output.OutputKey === "BackendApiUrl") {
            backendApiUrl = output.OutputValue;
            break;
          }
        }
      }
      if (!backendApiUrl) {
        throw new Error(
          "BackendApiUrl not found in CloudFormation stack outputs",
        );
      }
      // Step 2: Retrieve the GitHub token from Parameter Store
      const parameterName = "ggithub-token-mood-melody"; // Replace with the name of your parameter
      const ssmResponse = yield ssm
        .getParameter({ Name: parameterName, WithDecryption: true })
        .promise();
      const githubToken =
        (_a = ssmResponse.Parameter) === null || _a === void 0
          ? void 0
          : _a.Value;
      if (!githubToken) {
        throw new Error("GitHub token not found in Parameter Store");
      }
      // Step 3: Trigger GitHub Actions workflow via repository dispatch
      const githubRepo = "Lumi669/mood-melody-aws"; // Replace with your GitHub username and frontend repo
      const url = `https://api.github.com/repos/${githubRepo}/dispatches`;
      const headers = {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      };
      const data = {
        event_type: "build-frontend", // The event type to trigger
        client_payload: {
          BACKEND_API_URL: backendApiUrl,
        },
      };
      yield axios_1.default.post(url, data, { headers });
      return {
        statusCode: 200,
        body: JSON.stringify("Triggered GitHub Actions successfully"),
      };
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return {
        statusCode: 500,
        body: JSON.stringify(errorMessage),
      };
    }
  });
exports.handler = handler;
