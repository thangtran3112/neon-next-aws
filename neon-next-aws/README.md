# NextJs applications, deployed on AWS with SST

- [Credit Tutorial](https://youtu.be/T23Dv69j1JU?si=ws-mG6QyViBgE_fe)

## Seting up:

- Scalfolding project: `npx create-next-app@latest`
- Add `sst` to existing project, run `npm create sst` in the root folder terminal
- Reinstall all dependencies or upgrade: `npm i` and optionally `npm upgrade`
- [SST IAM User](https://docs.sst.dev/advanced/iam-credentials)
- Add [SST IAM Permissions](https://docs.sst.dev/advanced/iam-credentials#iam-permissions) (remember to change to correct AWS account number in the sample policy statements)

## Deployment (us-east-1)

- With [default] AWS profile, under ~/aws/credentials, we can use `npm run deploy`
- If we have a profile, such as [production] in ~/aws/credentials, we can use:
  `AWS_PROFILE=production sst deploy --stage production`

## Removal of AWS resources

- `npx sst remove --stage production`
- `npx sst remove --stage staging`

## Parameter Store and AWS Secret Managers by [SST Config](https://docs.sst.dev/config)

- `npx sst secrets set SECRET_VAL something_hidden --stage trathanl` //username
- `npx sst secrets set SECRET_VAL something_hidden_prod --stage production`. [More CLI options](https://docs.sst.dev/packages/sst#sst-secrets)
- `npx sst secrets set DATABASE_URL <Neon Postgres connection string> --stage trathanl`
- `npx sst secrets set DATABASE_URL <Neon Postgres connection string> --stage production`

## Setting up [Next API Routes with App Router](https://nextjs.org/docs/app/api-reference/file-conventions/route)

- Setting [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config) with this configs for no caching at all:

```
{
  dynamic: 'force-dynamic',
  revalidate: 0,
  fetchCache: 'force-no-store',
  runtime: 'nodejs'
}
```
