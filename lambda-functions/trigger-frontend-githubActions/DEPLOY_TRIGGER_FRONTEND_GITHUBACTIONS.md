# Re-deployment: trigger-frontend-githubActions Lambda & Its Layer

> **Tip:** If pnpm ever warns “Ignored build scripts: aws-sdk…”, run
>
> ```bash
> pnpm approve-builds
> ```
>
> then press **Space** on `aws-sdk` (or `--all`) before re-installing.

---

## 1. Build & Zip the trigger-frontend-githubActions Function

```bash
cd trigger-frontend-githubActions

# 1) Install ALL deps so that tsc + @types/node are available
pnpm install --frozen-lockfile

# 2) Compile TypeScript → JavaScript
pnpm run build

# 3) Prune devDependencies (keep only prod deps)
pnpm prune --prod

# 4) Create the deployment ZIP
rm -f trigger-frontend-build.zip
zip -r trigger-frontend-build.zip \
  dist \
  node_modules \
  package.json
```

## 2. Build & Zip the Layer

cd lambda-layer/nodejs

# Install only production deps

pnpm install --prod --frozen-lockfile

cd ..

# Package the layer

rm -f layer.zip
zip -r layer.zip nodejs

In the AWS Console:

Go to Layers → click the layer name → Create version.

Upload layer.zip, select compatible runtimes → Create.

Back in the lambda function’s Configuration → Layers, click Edit, choose the new version, then Save.

**Notes**

- Make sure upload the ZIP directly to `mood-melody-fetchBackendImageApi-triggerFrontentBuild` Lambda function; no need to delete or recreate it.
- Layer uploads always create a **new version**—remember to point the above function at that version in the Console.
- If decide not to bundle `aws-sdk`, can remove it entirely (Lambda’s Node 20.x runtime already includes v2 of the SDK).
