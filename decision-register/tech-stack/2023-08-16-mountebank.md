# Mountebank as a developer environment tool for mocking third party services

## Status

Accepted

## Context

modern apps often depend on third party services for enhanced functionality. This creates problems when testing your application as you need it to connect to the third party service to run the full app and many third parties do not provide a solution for you.

## Decision

- We will use Mountebank in the developer environment in order to mock third party services

## Consequences

- Mountebank is a quick light weight way to mock these services so you can still run and test the application independently.
- Mountebank is open source, free and battle tested
- We will need to maintain a config that mocks our services
- We will need to use configured urls (env consts, for instance) that divert traffic to the Mountebank server in local development
