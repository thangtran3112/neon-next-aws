# NextJs applications, deployed on AWS with SST

- [Credit Tutorial](https://youtu.be/T23Dv69j1JU?si=ws-mG6QyViBgE_fe)

## Seting up:

- Scalfolding project: `npx create-next-app@latest`
- Add `sst` to existing project, run `npm create sst` in the root folder terminal
- [SST IAM User](https://docs.sst.dev/advanced/iam-credentials)
- Add [SST IAM Permissions](https://docs.sst.dev/advanced/iam-credentials#iam-permissions) (remember to change to correct AWS account number in the sample policy statements)

## Deployment

- With [default] AWS profile, under ~/aws/credentials, we can use `npm run deploy`
- If we have a profile, such as [production] in ~/aws/credentials, we can use:
  `AWS_PROFILE=production sst deploy --stage production`
