# Contributing and consuming updates

If you want to be able to grab the latest updates from `everest/starter-kit-next`, you'll need to add a new upstream to your Git config. You'll use this to pull the latest changes, and rebase from there.

Please note: In most cases, this won't be necessary. Unless you are contributing back to the `everest-engineering/starter-kit` or you anticipate that you'll need updates from it regularly, please follow the instructions in the [Getting Started guide](/docs/getting-started.md).

## How to add a new upstream to get updates, or contribute back

1. Clone the repo to your machine, and navigate to that folder
2. Go to your github account and create a new repo.
3. Grab the origin url from the instructions page, and use that to update your remote url

```sh
git remote set-url origin git@github.com:<my-account/my-repo.git>            # replace this with your own
```

4. Now that you've updated your origin, you can push the starter kit to your own repo:

```sh
git push -u origin main # "main" might be "master" or something else on your github account
```

5. To be able to pull updates from the original repo, create a second upstream url:

```sh
git remote add starter-kit-upstream git@github.com:everest-engineering/starter-kit-next.git
```

### Pulling updates from `everest-engineering/starter-kit-next`

If there are changes in the main `everest/starter-kit-next` repo that you want to incorporate into your project, follow these steps:

1. Fetch the latest updates from your remote sources `git remote update`
2. Ensure you are on the `main` branch of your project
3. Rebase your changes with the latest updates from `starter-kit-upstream` (git remote alias) onto your main branch `git rebase starter-kit-upstream/main`
4. (Optional): Rebase those changes onto your feature branch
   1. Check out your feature branch
   2. Rebase your feature branch onto the updated `main` branch: `git rebase main`.

### Contributing a PR to `everest-engineering/starter-kit-next`

1. First, ensure your changes are on a branch
2. When your branch is ready for PR, you can push your changes to the `starter-kit-upstream` remote url: `git push -u starter-kit-upstream <my-branch-name>`. This will create a branch in the `everest-engineering/starter-kit-next` repo.
3. You can then follow the normal steps to create a PR through the Github UI
