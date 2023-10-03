# Using Shadcn/ui for component development

See the [ADR on adding Shadcn/UI](/decision-register/tech-stack/2023-08-23-shadcn-ui.md) for more information on the context behind this decision.

## How to add new components from shadcn/ui

You can add components from the Shadcn/ui collection easily, via the cli tool, eg.

```sh
# this will download the latest version of the button component, and save it to your components folder
npx shadcn-ui@latest add button
```

See the [shadcn/ui documentation](https://ui.shadcn.com/docs) for a list of available components.

As per the docs, some components will also require that you modify the `tailwind.config.ts` file with abstracted styles.

## Components included in the starter kit

In order to get you started, we've included one component.

### `Button`

See [the official docs](https://ui.shadcn.com/docs/components/button).
