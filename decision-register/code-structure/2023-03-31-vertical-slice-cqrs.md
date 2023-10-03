# Vertical Slice Architecture and CQRS

## Status

Accepted

## Context

- We want to Limit complexity and abstractions, improve development velocity while still allowing for flexibility and change
- We want to prevent over-engineering, pre-optimisation, pre-abstraction

## Decision

We will use a vertical slice architecture approach, as created by Jimmy Bogard.

Some decent resources on this approach

- https://jimmybogard.com/vertical-slice-architecture/
- https://www.youtube.com/watch?v=5kOzZz2vj2o - Jimmy Bogard, runtime: 1hr
- https://www.youtube.com/watch?v=lsddiYwWaOQ - Code Opinion, runtime 12min

### How it works

The high-level structure

```
src/
  pages/ # see frontend-code-structure for details
  components/ # see frontend-code-structure for details
  server/
      external/
      domain/
        subDomainA/
          bussinesLogic.ts
        subDomainB/
      features/
        featureA.ts
        featureB.ts
      api.ts
      routes.ts
```

#### Server directory

This is where any server-related code should live.

Contains server setup code such as routes configuration and tRPC config

#### Features directory

Aka the business features. This is where you pull together API requests with
external systems and internal business logic (the domain) to achieve some
useful outcome for the business.

It contains the technical layers

- Controller - handles HTTP protocol
- Service - handles transactions between feature input/output, external services, domain logic
- Request/Response - input/output types and validation for the feature.

A feature should do things in this order.

1. Gather required data from db/external services
2. Validate and transform data as required by the domain logic
3. Execute business logic
4. Transform and return data as required by caller

If two features share a request/response object that require some logic to
generate, you can unify them under a directory
and share the response across them.

```
src/
    features/
      getTalent/
        getTalentById.ts
        getTalentByQuery.ts
        mapTalentResponse.ts // This is shared by both features
```

IMPORTANT:
Avoid direct coupling between two features, the main benefit to this approach is
that each feature is isolated and as such can be updated in isolation.
If you start sharing code (that is not from the domain) across features you
break this isolation and make maintaining the code much more difficult.
If it is a small amount of logic it is better to duplicate it in each feature.
If there is a large amount of logic that is shared across features,
it should be pushed down into the domain.

##### Types of features

###### Simple Transactional Feature

Simple CRUD (create, read, update, delete) like operations with little to no logic.
These features do not have enough logic to justify building a domain model and as
such can remain very simple. All the code required for the feature can live in the
Service layer, writing and reading to a data store directly without a repository
layer is also fine.

###### Complex Rule-driven Feature

Significant and or complex logic is required to generate the correct outcome.
These features should be structured the same as simple features with the exception
that the domain logic is pushed down into the domain layer. You can use a repository pattern to
hydrate your model if needed.

A sudo example of a complex feature

```
  service(request) {
    cart = repo.getCart(request.cartId)
    repo.updateStock(request.cartId)

    consignment = new Consignment(cart.items, cart.address, cart.shippingType)
    shippingPlan = shipping.plan(consignment)

    invoice = new Invoice(chart.iteams, shippingPlan.distance, shippingPlan.priority)
    paymentSystem.charge(invoice)

    shipment = new Shipment(shippingPlan.priority, shippingPlan.route, chart.iteams, chart.address)
    trackingNumber = warehouse.dispatch(shipment)

    repo.clearCart(chartId)
    return new Response(invoice.referenceNumber, trackingNumber)
  }
```

#### Domain directory

The business rules. This is the business's secret sauce, the rules and
logic that features are built from.

Following a domain driven design approach this contains the technical layers

- Interfaces
- Aggregates
- Entities
- Value objects

The domain should not have any dependencies. Ideally, all communication with
external systems (database, external API etc) and side effects
are handled in the service/feature layer. However, if communicating with some
external system is absolutely necessary an interface should be used and not the real
implementation. The interface can then be fulfilled in the external layer.

The domain should be as functional as possible.

- None or limited state
- Immutable variables
- Pure functions - if you give input x you should always get output y
- No side effects
  Note: consider performance, if you need high performance you should consider the "data driven design"
  approach and opt not to follow the functional "immutable" rule. It's perfectly fine to use a data driven approach
  within a subdomain that requires high performance and domain driven in others that do not.

#### External

The configuration and setup required to talk with external systems.
This is where we set up connections with things like databases, external apis, I/O etc.
There should be no business logic in this code.

## Consequences

- Limits complexity and abstractions, improving development velocity while still allowing for flexibility and change
- Helps prevent over-engineering, pre-optimisation, pre-abstraction.
