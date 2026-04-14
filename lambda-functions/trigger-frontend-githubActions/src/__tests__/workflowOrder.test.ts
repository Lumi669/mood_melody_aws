import fs from "fs";
import path from "path";

const repoRoot = path.resolve(__dirname, "../../../../");
const backendWorkflowPath = path.join(
  repoRoot,
  ".github/workflows/build-backend.yml",
);
const frontendWorkflowPath = path.join(
  repoRoot,
  ".github/workflows/build-frontend.yml",
);

describe("CI/CD workflow order", () => {
  it("keeps the backend workflow as the repo entrypoint", () => {
    const backendWorkflow = fs.readFileSync(backendWorkflowPath, "utf8");

    expect(backendWorkflow).toContain("on:");
    expect(backendWorkflow).toContain("push:");
    expect(backendWorkflow).toContain("pull_request:");
    expect(backendWorkflow).toContain("backend-test-and-build:");
    expect(backendWorkflow).toContain("backend-build-and-push-to-ECR:");
  });

  it("keeps the frontend workflow dispatch-driven after backend finishes", () => {
    const frontendWorkflow = fs.readFileSync(frontendWorkflowPath, "utf8");

    expect(frontendWorkflow).toContain("repository_dispatch:");
    expect(frontendWorkflow).toContain("types: [build-frontend]");
    expect(frontendWorkflow).not.toContain("push:");
    expect(frontendWorkflow).not.toContain("pull_request:");
    expect(frontendWorkflow).toContain("frontend-test:");
    expect(frontendWorkflow).toContain("needs: frontend-test");
    expect(frontendWorkflow).toContain(
      "if: github.event_name == 'repository_dispatch'",
    );
  });
});
