## Description

SPDP Data Scraper

## Installation

```bash
$ npm install
```

## Setup database with prisma
```bash
# spin up database
docker-compose up -d

# apply migrations
npx prisma generate
npx prisma migrate deploy
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running Scraper using curl
```bash
# running scraper for specific district
curl --location 'http://localhost:7878/data-scraper/scrapeDataForDistrict' \
--header 'Content-Type: application/json' \
--data '{
    "districtLGDCode": "344"
}'

# runnign scraper for all districts
curl --location --request POST 'http://localhost:7878/data-scraper/scrapeData'
```