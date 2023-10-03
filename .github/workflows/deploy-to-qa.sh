#/bin/bash
set -e
DEV_BRANCH='main'
vercel pull --environment=development --token "${VERCEL_TOKEN}"
cp .vercel/.env.development.local .env # Coping so "vercel build" can test config is valid
vercel build --token "${VERCEL_TOKEN}"
vercel deploy --prebuilt --token "${VERCEL_TOKEN}" #> domain.txt
#vercel alias `cat domain.txt` '<replace with qa domain>' --yes --scope "${ORG_NAME}" --token "${VERCEL_TOKEN}"

echo "\nRemoving previous deployment"
PREVIOUS_DEPLOYMENT=1
vercel list --meta githubCommitRef=${DEV_BRANCH} --token "${VERCEL_TOKEN}" &> deployment-list.txt
rawUrls=$(cat ./deployment-list.txt | grep -Eo 'https://\S+' | sed -e 's/^//' -e 's/$//' | tr '\n' ',' | sed 's/,$//')
IFS=',' read -r -a urls <<< "${rawUrls}"

vercel remove "${urls[PREVIOUS_DEPLOYMENT]}" --yes --scope "${ORG_NAME}" --token "${VERCEL_TOKEN}"
