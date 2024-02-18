# Working with the Hasura API

1. Install the [Hasura CLI tool](https://hasura.io/docs/latest/hasura-cli/install-hasura-cli/)
2. Obtain the admin secret by logging in to Hasura
3. Set an environment variable `HASURA_GRAPHQL_ADMIN_SECRET=<secret_goes_here>`
4. Open the console using `hasura console`

To work with other environments, you can create an ENV file, and specify `--envfile <path>`, eg. 
`hasura deploy --envfile my_playground.env`. This way, you can test out changes on your own instance.
Note that the Neon DB connection details are in api/metadata/databases. So don't apply migrations without overriding,
unless you actually want to update the shared Neon DB!
