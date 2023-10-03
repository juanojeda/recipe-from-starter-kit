#!/bin/bash
set -e

read -p "Are you sure you want to deploy? (y/n): " answer
if [ "$answer" != "y" ]; then
  echo "Deployment canceled."
  exit 1
fi

local_commit=$(git rev-parse HEAD)
remote_commit=$(git rev-parse origin/main)
base_commit=$(git merge-base HEAD origin/main)

if [ "$local_commit" != "$remote_commit" ] && [ "$local_commit" != "$base_commit" ]; then
  echo "Your local branch has diverged from the remote branch. Please pull remote changes before deploying. Or remove the local changes you have"
  exit 1
fi

if ! git diff-index --quiet HEAD --; then
  read -p "You have uncommitted changes. Would you like to stash them? (y/n): " answer

  if [ "$answer" != "y" ]; then
    echo "Deployment canceled, please stash your changes before deploying"
    exit 1
  fi
  git stash save --include-untracked
fi

git checkout main && git pull
branch_name="release/$(date '+%Y-%m-%d')"
if git rev-parse --verify "$branch_name" >/dev/null 2>&1; then
  git checkout "$branch_name" && git rebase main
else
  git checkout -b "$branch_name"
fi

git push --set-upstream origin $(git rev-parse --abbrev-ref HEAD)
git checkout main