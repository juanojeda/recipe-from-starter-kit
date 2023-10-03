# Using Visual Studio Code

We have built this Starter Kit with the assumption that you will be coding in Visual Studio Code. As such, we have included a few sensible defaults in the `.vscode/settings.json`.

These are settings that we feel make the developer experience more friendly, however feel free to modify these in your project, or outright remove them.

## What are the settings, and what do they do?

```json5
  "editor.formatOnPaste": true, // text that you paste will be formatted according to your formatting settings
  "editor.formatOnSave": true, // when you save your file, the file will be formatted
  "editor.formatOnType": true, // Your code will be formatted as you type
  "javascript.preferences.renameMatchingJsxTags": true, // If you rename a JSX tag, the matching opening or closing tag will also be renamed
  "typescript.preferences.renameMatchingJsxTags": true, // as above
  "files.associations": {
    "*.css": "tailwindcss" // This is used in conjunction with the Tailwind extension, and ensures that VSCode understands the Tailwind directives
  }
```
