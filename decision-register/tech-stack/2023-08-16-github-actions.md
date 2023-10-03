# Github Actions for Automated CI/CD workflows

## Status

Accepted

## Context

- Rapid delivery of value requires that code can be deployed to production easily and quickly.
- There are many options of CI/CD tools in the market, ranging in cost and ease of setup
- Github Actions is a solution that integrates easily with Github
- The majority of our projects at least start off in Github, and usually continue to live there for a long time

## Decision

We will use Github Actions to create a CI/CD workflow and pipeline

## Consequences

- Easy to implement in projects that already live in Github
- If the project is not hosted in Github, the team will need to find another solution
- At some point in the project's future, it might become more cost effective to migrate to dedicated CI/CD platform.
