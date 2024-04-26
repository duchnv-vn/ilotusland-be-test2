#!bin/bash

source .env

npm run lint

npm run build

cp package*.json ./dist

mkdir -p dist/.vercel

touch dist/.vercel/project.json

echo "{\"orgId\":\"$VERCEL_ORG_ID\",\"projectId\":\"$VERCEL_PROJECT_ID\"}" >dist/.vercel/project.json

vercel ./dist \
    --local-config=vercel.json \
    -e MONGODB_URI=$MONGODB_URI \
    --token=$VERCEL_TOKEN