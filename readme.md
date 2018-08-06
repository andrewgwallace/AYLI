# AYLI

AYLI is a platform that allows vistors to find local street performers and artists to provide performance dates for visitors to find easily find and follow them.

## Installation
1. Create a local postgreSQL database called `alyi` (or you can call it whatever you wish and change the name of the db in `knexfile.js`)
2. run `npm install`

## Local Development

Locally, you may run the following command:

```bash
npm run dev
```

This will run both the client and server on different ports. You will be prompted to go to `3000`.

## Production Development

To test as a production build, you may run the following command:

```bash
npm start
```

This will build a new version of the client into a `build/` folder. It will then run the server which will deliver the client. In this case, you will want to go to port `3004` by default.

## Node Packages

AYLI uses the following node packages for production/development

```bash
knex
pg
express
nodemon
cors
```

The `postinstall` script will make sure all relevant packages are installed.
