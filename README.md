# Starter Kit for Startups

This is the Everest Starter kit for startups targetting solutions in web technologies.

Before using this kit, please ensure that the tech stack will meet your client's needs. You can review the tech stack and reasons for such decisions in the [ADR folder](/decision-register/tech-stack).

If this starter kit meets your needs, then proceed...

## Instructions for using this kit

1. Clone this repo
2. Delete the `.git` folder, and initiate it under your own project's git repository.
3. Follow the [Getting Started](#getting-started) instructions.
4. Fill in the blanks below this line, then delete the line and everything above it.

---

# [Fill in Your Project Name]

_[high level description]_

_[sub domain description]_

## Check out the latest docs

`<project-root>/decision-register`

## Tech Stack

Refer to the respective docs for more information

- [Next.js](https://nextjs.org) - application framework
- [NextAuth.js](https://next-auth.js.org) - handles cookies and token lifecycle
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [tRPC](https://trpc.io) - type safe api endpoints
- [ESLint](https://eslint.org/) - linter
- [Prettier](https://prettier.io/) - An opinionated code formatter
- [Typescript](https://www.typescriptlang.org/) - programming language
- [Jest](https://jestjs.io/) - testing framework
- [Vercel](https://vercel.com/docs) - deployment platform
- [github actions](https://docs.github.com/en/actions) - CI pipeline
- [Mountebank](http://www.mbtest.org/) - used to fake 3rd party services to enable integrations and air gaped local dev
- [husky](https://typicode.github.io/husky/) - git hooks

## Getting Started

### Pre-Prerequisites

It is presumed for OSX development you have installed [Homebrew](https://brew.sh/). If not, go there and get yourself setup.

For Linux development, use the Homebrew package names listed below as references. They'll likely be similarly named.

### Prerequisites

- Install the latest LTS version of node

```bash
brew install nvm
nvm install --lts
```

- Local Development relies on a working Docker-compose setup

```bash
# As we don't have licenses for Docker Desktop (which is not the same as docker/docker-compose below), we recommend colima
brew install colima docker docker-compose
```

- Start Colima and the needed supporting docker containers (Postgres and seed-db installation)

```bash
# startup colima runtime - you can "stop" it when you want to free resources
colima start

# this ensures the local seed DB container is built and updated
docker-compose up --build
```

### Accounts

You will need to get access to the following accounts

- Github repo - <git repot>
- Vercel - <vercel url>

### Deployments

- QA - <add url>
- DEMO - <add url>
- Prod - <add url>

### Local dev setup

1. Copy & configure environment variables and install dependencies
   - _NOTE_: there are some required variables you will need to fill in. Please check the copied Environment file for more information

```bash
cp .env.example .env && npm install
```

2. [OPTIONAL] Create OAuth2 ClientId & Secret - This starter kit uses [NextAuth](https://next-auth.js.org/) and begins with built-in Google Authenthication. :

   - Go to [Google Cloud Console](https://console.cloud.google.com), _authenticating with your Everest Google account_
   - Create a Project, if you don't have one already
   - Navigate to `APIs & Services => Credentials`
   - Consent Screen: You need to configure the Consent screen but you don't need to do anything other than accept the defaults. Important for your customer, but not to get started
   - Click the `+ CREATE CREDENTIALS` button in the subnav
   - Choose `OAuth2 Client ID`
   - Application type: `Web application`
   - Name: ..... #whatever you like
   - Authorized JavaScript Origins: http://localhost:3000
   - Authorized Redirect URIs: http://localhost:3000/api/auth/callback/google
   - User Type: Internal (only for initial testing purposes only)
   - Copy the ClientID & Secret you receive, and place the values in `.env` file `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` properties

3. Start the application
   `npm run dev`

### Running tests

- unit tests: `npm run unit:test`
- integration tests: `npm run integration:test`
  - 3rd party integrations are faked by mountebank

### Manual testing

Accounts used for testing

- <role/auth type> login - username:password

## Git and CI/CD

##### Git Conventions

- Branch names - should be the ticket number e.g <NAME>-<number>
- Commit structure - ticket number, short descriptions and lower case. e.g `<COMPANY/TEAM>-100 add forgot password endpoint`
- Always rebase with main before merging your PR
- Keep commits focused and atomic
- Always rebase with main before merging your PR - keep git history linear

##### Git Workflow

The project follows the trunk with release branches workflow.

This workflow looks like the following

1. Cut story branch from main
2. Make changes, commit and push branch
3. .husky/pre-push will run linting and tests on git push
4. CI runs linting and tests on your branch
5. Raise PR and merge to main
6. CI runs linting and tests on main, then builds and deploys main to QA

For more details on the process of trunk with release branches read this documentation
https://trunkbaseddevelopment.com/

### CI credentials

The following credentials are stored in github actions.
To create/update tokens check out:

- https://vercel.com/guides/how-do-i-use-a-vercel-api-access-token

      VERCEL_TOKEN
      VERCEL_ORG_ID
      VERCEL_PROJECT_ID

## Releases and hot fixes

### Release

1. Checkout to the main branch and run the ./release script. This will
   create a branch with `release/$(date '+%Y-%m-%d')`
   ```bash
   ./release.sh
   ```
2. Verify deployment has succeeded on github <repo-url>/actions

Deployments will run on any branch that starts with `release/`

Actual release versions should be the git sha.

### Hot fix

Follow the normal development process for your fix and then cherry-pick
the change to release

1. Cut story branch from main
2. Fix bug and verify in your local before pushing your branch
3. Raise PR and merge bug fix to main
4. CI runs linting and tests, then builds and deploys main to QA
5. Verify bug has been fixed in QA
6. Cherry-pick changes to the relevant release branch
   ```bash
   git checkout release/<date> && git cherry-pick <sha>
   ```
7. Push changes to kick of deployment
8. Verify bug has been fixed in demo instance
