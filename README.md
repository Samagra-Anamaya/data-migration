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
# run scraper for specific district
curl --location 'http://localhost:3000/data-scraper/scrapeDataForDistrict' \
--header 'Content-Type: application/json' \
--data '{
    "districtLGDCode": "344"
}'

# run scraper for all districts
curl --location --request POST 'http://localhost:3000/data-scraper/scrapeData'
```

## Reverse-seeding APIs
Documentation for reverse-seeding APIs

### Authentication

```
https://base_url/ste/authentication
Request body
{
    username: "dept_username",
    password: "dept_password",
}

Response body
# Success
{
    status: "success",
    message: "Authenticated",
    token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpkUVpfQVIxdTNHVVBDTnNfdzdUU256anAyOCJ9.eyJhdWQiOiJkNTJiZWFkYi1lOGQxLTQ0ZDAtOGVmNS1hYmE3OTA0NTE0ZjEiLCJleHAiOjE2OTg3MDMyODcsImlhdCI6MTY5ODY5OTY4NywiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiIyNjQ5ZDg3Yi1kNDIyLTRlNDAtODUwNS0wMGNlOTE2MWZjMzkiLCJqdGkiOiJiYzZlOTMzOC0xZjk5LTRhZWYtYTcwMy1hNTM0OTk5OTQ2MmUiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJQQVNTV09SRCIsInByZWZlcnJlZF91c2VybmFtZSI6Ik16RTFOelE1T1RrNU9UazVNREVBIiwiYXBwbGljYXRpb25JZCI6ImQ1MmJlYWRiLWU4ZDEtNDRkMC04ZWY1LWFiYTc5MDQ1MTRmMSIsInJvbGVzIjpbImZhbWlseSJdLCJzaWQiOiI3ZGQ1MjRlNi1lNDUwLTQ4NDEtODU4OS03MDA3NmNiMzc1OGMiLCJhdXRoX3RpbWUiOjE2OTg2OTk2ODcsInRpZCI6IjU4MGI1MDE3LWI1NzUtNTg3OC0xY2EyLTMyYjI2MjZkNDJjMSJ9.ED7MKunU31SRakxGCN17_-9uk-g09QQXD8QF-GhFwFIi-LL9LVUa1uyMkYVWInA3wHeg_jaQe7_A9JzO6R5Giu5hXORf3Tcp1Zt304smKJ-eUeLrL4vLzBRsGDQ5YDQcuYMbJQERF1tch7NCanY9WBdBPM1NXNQTsOU99ZOF5U_OybCtNZPzdv4N8BnuPPYfU4TRckhY5MDcqKHbo3sCr8yn63KVctEsQ7O_MXZSAw6L6RMk8gNTcWK_d7hrataD4KFI9Cdo3R0xdGz9jPGfH8DombGlCGvgnoYWKxYN2ReBukfZ6irpovHWQlLnaC91_JaWUpk0V7gxpTIF0FQE_Q",
}

# Failure
{
    status: "failure",
    message: "Wrong Credentials"
}
```

### Save Scheme Transaction

```
https://base_url/ste/saveSchemeTransaction
Request Header
{
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpkUVpfQVIxdTNHVVBDTnNfdzdUU256anAyOCJ9.eyJhdWQiOiJkNTJiZWFkYi1lOGQxLTQ0ZDAtOGVmNS1hYmE3OTA0NTE0ZjEiLCJleHAiOjE2OTg3MDMyODcsImlhdCI6MTY5ODY5OTY4NywiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiIyNjQ5ZDg3Yi1kNDIyLTRlNDAtODUwNS0wMGNlOTE2MWZjMzkiLCJqdGkiOiJiYzZlOTMzOC0xZjk5LTRhZWYtYTcwMy1hNTM0OTk5OTQ2MmUiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJQQVNTV09SRCIsInByZWZlcnJlZF91c2VybmFtZSI6Ik16RTFOelE1T1RrNU9UazVNREVBIiwiYXBwbGljYXRpb25JZCI6ImQ1MmJlYWRiLWU4ZDEtNDRkMC04ZWY1LWFiYTc5MDQ1MTRmMSIsInJvbGVzIjpbImZhbWlseSJdLCJzaWQiOiI3ZGQ1MjRlNi1lNDUwLTQ4NDEtODU4OS03MDA3NmNiMzc1OGMiLCJhdXRoX3RpbWUiOjE2OTg2OTk2ODcsInRpZCI6IjU4MGI1MDE3LWI1NzUtNTg3OC0xY2EyLTMyYjI2MjZkNDJjMSJ9.ED7MKunU31SRakxGCN17_-9uk-g09QQXD8QF-GhFwFIi-LL9LVUa1uyMkYVWInA3wHeg_jaQe7_A9JzO6R5Giu5hXORf3Tcp1Zt304smKJ-eUeLrL4vLzBRsGDQ5YDQcuYMbJQERF1tch7NCanY9WBdBPM1NXNQTsOU99ZOF5U_OybCtNZPzdv4N8BnuPPYfU4TRckhY5MDcqKHbo3sCr8yn63KVctEsQ7O_MXZSAw6L6RMk8gNTcWK_d7hrataD4KFI9Cdo3R0xdGz9jPGfH8DombGlCGvgnoYWKxYN2ReBukfZ6irpovHWQlLnaC91_JaWUpk0V7gxpTIF0FQE_Q'
}
Request Body
[
    {
        schemeCode: "CQOIH",
        aadhaarNumber: "123412341234",
        aadhaarReferenceNumber: "1234123412345",
        uniqueBeneficiaryId: "ofiaudjcnoas",
        financialYear: "2022-23",
        transactionType: "In-Kind",
        transactionAmount: "5000",
        inKindBenefitDetail: "Training",
        transactionDate: "10-10-2022",
        remarks: "Some remarks",
        departmentData:
            {
                field: "Date of Birth",
                value: "10-05-2000",
            },
            {
                field: "Social Category",
                value: "ST",
            }
        ]
    },
    {
        schemeCode: "CQOIH",
        aadhaarNumber: "123412341234",
        aadhaarReferenceNumber: "1234123412345",
        uniqueBeneficiaryId: "ofiaudjcnoas",
        financialYear: "2022-23",
        transactionType: "In-Kind",
        transactionAmount: "5000",
        inKindBenefitDetail: "Training",
        transactionDate: "10-10-2022",
        remarks: "Some remarks",
        departmentData: [
            {
                field: "Date of Birth",
                value: "10-05-2000",
            },
            {
                field: "Social Category",
                value: "ST",
            }
        ]
    },
    {
        schemeCode: "CQOIH",
        aadhaarNumber: "123412341234",
        aadhaarReferenceNumber: "1234123412345",
        uniqueBeneficiaryId: "ofiaudjcnoas",
        financialYear: "2022-23",
        transactionType: "In-Kind",
        transactionAmount: "5000",
        inKindBenefitDetail: "Training",
        transactionDate: "10-10-2022",
        remarks: "Some remarks",
        departmentData: [
            {
                field: "Date of Birth",
                value: "10-05-2000",
            },
            {
                field: "Social Category",
                value: "ST",
            }
        ]
    },
    {
        schemeCode: "CQOIH",
        aadhaarNumber: "123412341234",
        aadhaarReferenceNumber: "1234123412345",
        uniqueBeneficiaryId: "ofiaudjcnoas",
        financialYear: "2022-23",
        transactionType: "In-Kind",
        transactionAmount: "5000",
        inKindBenefitDetail: "Training",
        transactionDate: "10-10-2022",
        remarks: "Some remarks",
        departmentData: [
            {
                field: "Date of Birth",
                value: "10-05-2000",
            },
            {
                field: "Social Category",
                value: "ST",
            }
        ]
    },
    {
        schemeCode: "CQOIH",
        aadhaarNumber: "123412341234",
        aadhaarReferenceNumber: "1234123412345",
        uniqueBeneficiaryId: "ofiaudjcnoas",
        financialYear: "2022-23",
        transactionType: "In-Kind",
        transactionAmount: "5000",
        inKindBenefitDetail: "Training",
        transactionDate: "10-10-2022",
        remarks: "Some remarks",
        departmentData: [
            {
                field: "Date of Birth",
                value: "10-05-2000",
            },
            {
                field: "Social Category",
                value: "ST",
            }
        ]
    }
]
{
    "1": "ERROR_MESSAGE"
}

# Create demo APIs for departments to test

# Transaction History API
Record that we have saved
Errors (if any) - define them 
Share errors (if any)
// validate request body - https://zod.dev/
// https://docs.nestjs.com/techniques/validation


# Transaction API
Total Records inserted
Errors 
Save errors to history table (as json) along with record
History record ID -> transaction ID (to be returned), user ID (transactionStartTime, transactionEndTime)

# Add swagger for APIs
Add examples

# Create possible errors list in doc
https://docs.gupshup.io/docs/error-codes
```
