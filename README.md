# NextJs applications, deployed on AWS with SST

- [Credit Tutorial](https://youtu.be/T23Dv69j1JU?si=ws-mG6QyViBgE_fe)

## Seting up

```
aws configure
npx create-next-app@latest
npm create sst
```

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
- `npx sst secrets set DATABASE_URL postgresql://nextdb_owner:TmRjbAi0YO6L@ep-dark-firefly-a6rprq49.us-west-2.aws.neon.tech/nextdb?sslmode=require --stage trathanl`
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

## (Optional) If using Neon Postgres DB, [install @neondatabase/serverless](https://github.com/neondatabase/serverless/blob/main/README.md)

## (Optional) [Drizze ORM for modeling Postgres Neon DB](https://orm.drizzle.team/docs/get-started-postgresql#neon)

- Drizzle ORM works with both Postgres, SQLite, MySQL. It can also help SQL migration through drizzle toolkit
- Drizzle ORM also works with Supabase, Vercel Postgres
- Initialize table and manipulate Postgres Columns, [Read here](https://orm.drizzle.team/docs/column-types/pg)
- [Init Migration with drizzle kit](https://orm.drizzle.team/kit-docs/commands), as we need to run migration everytime we change the schema.js

```
npm run generate
npm run migrate
```

- Because we are using AWS Lambda serverless, we need to [run migrations](https://orm.drizzle.team/kit-docs/overview#configuration) in advance:

```
drizzle-kit migrate
```

- We are using AWS Parameter Store SDK to actually get secret values into `drizzle.config.js`

## Drizzle ORM with Neon websocket

- To [use WebSocket on Neon](https://github.com/neondatabase/serverless/blob/main/README.md#example-nodejs-with-poolconnect), we need `neonConfig.webSocketConstructor = ws`

- To use [Connection Pool with WebSocket for migration on drizzle](https://orm.drizzle.team/docs/get-started-postgresql#neon), we need `new Pool({ connectionString: DB_URL})`

## Using [github action](https://github.com/actions/setup-node) to auto-deploy newest github merges
