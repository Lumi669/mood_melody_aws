# Re-deployment: trigger-frontend-githubActions Lambda & Its Layer

> **Tip:** If pnpm ever warns “Ignored build scripts: aws-sdk…”, run:
>
> ```bash
> pnpm approve-builds
> ```
>
> then press **Space** on `aws-sdk` (or `--all`) before re-installing.

---

## 1. Build & Zip the Lambda Function

```bash
cd trigger-frontend-githubActions
./build-and-deploy.sh
```

## 2. Build & Zip the Layer

```bash
cd lambda-layer/nodejs
pnpm install --prod --frozen-lockfile
cd ..
rm -f layer.zip
zip -r layer.zip nodejs
```

## 3. Update in the AWS Console

Go to Lambda → Layers, select my layer, and click Create version.

Upload layer.zip, choose compatible runtimes, and click Create.

Go to Functions → mood-melody-fetchBackendImageApi-triggerFrontentBuild → Configuration → Layers, click Edit, select the new version, and Save.

## Notes

Upload new .zip for lambda function simply overwrite the existing function code, i.e no need to delete or recreate it.

Layer uploads always create a new version—remember to point my function at the new version.

If prefer to use the built-in SDK in Node 20.x, may omit aws-sdk from my bundle like what I am doing.
