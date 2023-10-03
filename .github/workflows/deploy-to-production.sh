#/bin/bash
set -e

vercel pull --environment=production --token "${VERCEL_TOKEN}"
cp .vercel/.env.production.local .env # Coping so "vercel build" can test config is valid
vercel build --prod --token "${VERCEL_TOKEN}"
vercel deploy --prebuilt --prod --token "${VERCEL_TOKEN}"