# Getting started with this Starter Kit

1. Clone the repo to your machine, and navigate to that folder
2. Delete the `.git` folder
3. Initialise a new git project: `git init`
4. Add the files, and make your first commit: `git add --all && git commit -m "cloned from Everest starter-kit-next"`
5. Go to your github account and create a new repo, following the instructions for "Push an existing repository".

```sh
git remote add origin git@github.com:<your-username/your-repo> # replace this with your own
git push -u origin main # "main" might be "master" or something else on your github account
```

If you just want to get started with the kit, and don't need to consume updates from it, or contribute back to it, then you're done – start using the kit to build something awesome!

**Note:** If you will want to regularly consume updates to the `everest-engineering/starter-kit` in your project, or if you're working as a contributor to the kit, use the instructions in the [Contributing and consuming updates](/docs/contribution-and-updates.md). If you use this method, you won't retain the commit history, which will make it impossible to pull or push updates.
