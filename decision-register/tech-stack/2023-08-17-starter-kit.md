# Create our own starter kit

## Status

Accepted

## Context

When considering a starter kit for start up projects, we looked at a few off the shelf options:

- [Epic Stack](https://github.com/epicweb-dev/epic-stack)
- [Create T3 App](https://create.t3.gg)
- [Next.js Enterprise Boilerplate](https://next-enterprise.vercel.app)

However, we found those options to not entirely meet our needs (see appendix).

## Decision

We will create our own starter kit (based off Create T3 App)

## Consequences

- We can more opinionated (e.g. additional libraries, a deployment pipeline provided, and auth config etc.) so devs can really hit the ground running
- There will be overhead to keep the starter kit up to date (e.g. updating to the latest library versions, keeping up with the ever changing JavaScript landscape)
- We have to make more decisions ourselves rather than leaving those choices up to someone else

## Appendix

### [Comparison of Epic Stack vs Everest Next Starter Kit](https://www.notion.so/everestengineering/Comparison-of-Epic-Stack-vs-Everest-Next-Starter-Kit-b20dc3df24e74e1b95d352c8ff81148f)

### Create T3 App

- Main issue is with the code structure they use.
- The authors don't really believe in tests so have not given much consideration to that.
- It still leaves a lot for you to do. It is a great starting point and makes sense that it does not include more as they are serving a very large generic audience but I think for our audience we can be a bit more opinionated e.g with a deployment pipeline provided and auth config etc. So devs can really hit the ground running.

### Next.js Enterprise Boilerplate

- Very frontend focused and neglects the backend a bit. Missing tRPC/zod.
- Could be overkill for a simple startup project (e.g. Conventional commits, Semantic release, Patch-package, and Storybook)
