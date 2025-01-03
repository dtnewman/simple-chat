# Chai Chat Demo Server

This is a simple API backend for a chat app using CHAI's API. To see swagger docs, go [here](https://chai-chat-api-dev.foobar.dev/docs).

## Libraries used

I make use of the following libraries here:

- [Serverless](https://www.serverless.com/) - for handling deployment of the project to AWS Lambda/API Gateway
  - [serverless-prune-plugin](https://www.serverless.com/plugins/serverless-prune-plugin) - to purge previous deployed versions of functions from AWS lambda
- [cross-env](https://www.npmjs.com/package/cross-env) - for running node scripts across platforms
- [Poetry](https://python-poetry.org/) - For python packaging and dependency management (an alternative to virtualenv + pip)
- [PostgreSQL](https://www.postgresql.org/) - relational database
- [SQLAlchemy](https://www.sqlalchemy.org/) - ORM for managing database
- [Alembic](https://alembic.sqlalchemy.org/en/latest/) - For database migrations
- [Pytest](https://pytest.org) - For running unit tests
- [Black](https://pypi.org/project/black/) - An opinionated python linter


## Requirements

I deploy this using the [Serverless](https://www.serverless.com/) framework, so first install serverless globally using command:

```
npm install -g serverless
```


You will also need Python 3.10+, poetry and PostgreSQL installed locally to run this project.


## Getting started

1. Make sure you have Python3.10+ installed locally. Install poetry on your machine (instructions [here](https://python-poetry.org/docs/)). Then run command to initialize a new environment (you will also run this command when subsequently opening the project to navigate to this already-created environment).:

   ```
   poetry shell
   ```

   Next, run the following command to install dependencies:

   ```
   poetry install
   ```

2. Make sure you have PostgreSQL (server and command line tool) installed locally. Add an empty local database + test database (code below assumes you already have the postgres command line tools and a local server setup):

   ```
   createdb chai_chat_demo
   createdb chai_chat_demo_test
   ```

3. Initialize DB

```
 python manage.py db init
 # This is for local. For DEV or PRD, run:
 # env=Development python manage.py db init
 # env=Production python manage.py db init
```

3. Run migrations:

```
python manage.py db upgrade
```

4. Start the server

```
python manage.py runserver
# env=Development python manage.py runserver
# env=Production python manage.py runserver
```

Once the server is running, go to http://127.0.0.1:5000 to see the swagger docs and play around.

## Deploy commands

Deploy to dev with command:

```
npm run deploy
```

and to production with:

```
npm run deploy:prod
```

When the job finishes deploying, it should give you a URL:

```
✔ Service deployed to stack my-fastapi-app-dev (76s)

endpoint: ANY - https://abcdefghij.execute-api.us-east-1.amazonaws.com/dev/{proxy+}
```

Navigate to the deployed docs by opening the link in a browswer, but replacing `{proxy+}` with `docs`.

Undeploy with commands `npm run undeploy` and `npm run undeploy:prod` respectively (warning: this will remove the entire serverless stack, including any resources you created via the serverless.yml file).

# Linting

This codebase uses [Black](https://pypi.org/project/black/) for linting. To run the linter, run command:

```
npm run lint
```
