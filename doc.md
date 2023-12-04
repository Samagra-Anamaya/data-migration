## API Documentation

### Authentication 
Endpoint
```
POST http://base_url/ste/authenticate
```

Payload (Username & Password will be provided to each department)
```json
{
    "username": "XXXXXX",
    "password": "XXXXXX"
}
```

Success Response
```json
{
    "status": "success",
    "message": "Authenticated",
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdDSWFpb1N4cHo4c25WMHZnS0o2UmdydGR2byJ9.eyJhdWQiOiI5YTRhZWNjZS02ODZmLTQ0ZTUtYjY0Zi03OGVhNzMxMWExYzgiLCJleHAiOjE3MDI5NjEwMDQsImlhdCI6MTcwMTY2NTAwNCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI3NDlhYTdlZS0wN2I4LTQ3ZWMtYjkyMC05NTJkMTBiMGI3ZmYiLCJqdGkiOiJiYjFiNTIxNC0xMmNmLTRhNzMtYmJlNS1jZjU5NmVhZDhkNWEiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJQQVNTV09SRCIsInByZWZlcnJlZF91c2VybmFtZSI6ImRlcGFydG1lbnRfMSIsImFwcGxpY2F0aW9uSWQiOiI5YTRhZWNjZS02ODZmLTQ0ZTUtYjY0Zi03OGVhNzMxMWExYzgiLCJyb2xlcyI6WyJkZXBhcnRtZW50Il0sInNpZCI6IjUwZDMyODE1LWNlMmItNDVlNy1hNWYxLWE0MzY3Y2NiZjEyNSIsImF1dGhfdGltZSI6MTcwMTY2NTAwNCwidGlkIjoiMWZlYTI4NDYtNzBjZS02NWQ4LWY2M2UtYzVjMDY4YTE4YWEwIn0.U_b66A-RwXnAwkozy3vfBC0nw0bMSXLBVVzSe0ra3rLTNGHDte-RcA-LdhCFKXimc8NrJgJs_t6DppMdJx8wwVI0nAVTQAqNcnHvvq9e1M9ibIRY31JfnTd03a279xsWRxypTmOXg1-HGgQIEh0YxCHn5mOfgd99fAAPbWoRqxA9PYqPJLk3yp9UDQbHXs5P5bkrWrRb-MuAemWMSZz3MgeteuBnIMNRcHQugkfav72Qby-1DzXGprx3vVBKcvO3Jil5ex0NRkhmFCNxnL86dUFd9HuqLOayj8NJiWqFm2643kfdrKy0WDJ37nyVh0tbftQl2jiDKWrFvtOybc_YPg"
}
```

Failure Response (In case of invalid Username or Password)
```json
{
    "status": "failure",
    "message": "INVALID_USERNAME_PASSWORD"
}
```

## Save Scheme Transaction
Endpoint
```
POST http://base_url/ste/saveSchemeTransaction
```

Request Header (Token received from Authentication API)
```json
{
    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpkUVpfQVIxdTNHVVBDTnNfdzdUU256anAyOCJ9.eyJhdWQiOiJkNTJiZWFkYi1lOGQxLTQ0ZDAtOGVmNS1hYmE3OTA0NTE0ZjEiLCJleHAiOjE2OTg3MDMyODcsImlhdCI6MTY5ODY5OTY4NywiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiIyNjQ5ZDg3Yi1kNDIyLTRlNDAtODUwNS0wMGNlOTE2MWZjMzkiLCJqdGkiOiJiYzZlOTMzOC0xZjk5LTRhZWYtYTcwMy1hNTM0OTk5OTQ2MmUiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJQQVNTV09SRCIsInByZWZlcnJlZF91c2VybmFtZSI6Ik16RTFOelE1T1RrNU9UazVNREVBIiwiYXBwbGljYXRpb25JZCI6ImQ1MmJlYWRiLWU4ZDEtNDRkMC04ZWY1LWFiYTc5MDQ1MTRmMSIsInJvbGVzIjpbImZhbWlseSJdLCJzaWQiOiI3ZGQ1MjRlNi1lNDUwLTQ4NDEtODU4OS03MDA3NmNiMzc1OGMiLCJhdXRoX3RpbWUiOjE2OTg2OTk2ODcsInRpZCI6IjU4MGI1MDE3LWI1NzUtNTg3OC0xY2EyLTMyYjI2MjZkNDJjMSJ9.ED7MKunU31SRakxGCN17_-9uk-g09QQXD8QF-GhFwFIi-LL9LVUa1uyMkYVWInA3wHeg_jaQe7_A9JzO6R5Giu5hXORf3Tcp1Zt304smKJ-eUeLrL4vLzBRsGDQ5YDQcuYMbJQERF1tch7NCanY9WBdBPM1NXNQTsOU99ZOF5U_OybCtNZPzdv4N8BnuPPYfU4TRckhY5MDcqKHbo3sCr8yn63KVctEsQ7O_MXZSAw6L6RMk8gNTcWK_d7hrataD4KFI9Cdo3R0xdGz9jPGfH8DombGlCGvgnoYWKxYN2ReBukfZ6irpovHWQlLnaC91_JaWUpk0V7gxpTIF0FQE_Q"
}
```
Scheme Transaction keys:
 - `schemeCode`: NOT-NULL, NOT-EMPTY, STRING
 - `aadhaarNumber`: NOT-NULL, NOT-EMPTY, NUMBER-STRING, LENGTH = 12
 - `aadhaarReferenceNumber`: NOT-NULL, NOT-EMPTY, NUMBER-STRING, LENGTH = 13
 - `uniqueBeneficiaryId`: NOT-NULL, NOT-EMPTY, STRING
 - `financialYear`: NOT-NULL, NOT-EMPTY, STRING, FORMAT = YYYY-YY
 - `transactionType`: NOT-NULL, NOT-EMPTY, STRING
 - `transactionAmount`: NOT-NULL, INTEGER
 - `inKindBenefitDetail`: NOT-NULL, NOT-EMPTY, STRING
 - `transactionDate`: NOT-NULL, NOT-EMPTY, STRING, FORMAT = DD-MM-YYYY
 - `remarks`: STRING
 - `departmentData`: List of JSON Objects specific to departments (See example below). <br>
Payload. `data` key is a JSON Array containing Scheme Transactions to be saved (Limit array size to 500 per API call). Scheme Transaction format will be shared.
```json
{
    "data": [
        {
            "schemeCode": "",
            "aadhaarNumber": "a23412341234",
            "aadhaarReferenceNumber": "12341234123456",
            "uniqueBeneficiaryId": "",
            "financialYear": "2021-2022",
            "transactionType": "",
            "transactionAmount": 5000,
            "inKindBenefitDetail": "",
            "transactionDate": "12-13-2022",
            "remarks": "",
            "departmentData": [
                {
                    "marker": "Date of Birth",
                    "value": "21-01-1999"
                },
                {
                    "marker": "Social Category",
                    "value": "ST"
                }
            ]
        },
        {
            "schemeCode": "VULC8",
            "aadhaarNumber": "1234123412345",
            "aadhaarReferenceNumber": "1234123412345",
            "uniqueBeneficiaryId": "5812844",
            "financialYear": "2021-22",
            "transactionType": "Cash",
            "transactionAmount": 5000,
            "inKindBenefitDetail": "Training",
            "transactionDate": "12-08-2022",
            "remarks": "",
            "departmentData": [
                {
                    "marker": "Date of Birth",
                    "value": "21-01-1999"
                }
            ]
        },
        {
            "schemeCode": "VULC8",
            "aadhaarNumber": "123412341234",
            "aadhaarReferenceNumber": "1234123412345",
            "uniqueBeneficiaryId": "5812844",
            "financialYear": "2021-22",
            "transactionType": "Cash",
            "transactionAmount": "5000",
            "inKindBenefitDetail": "Training",
            "transactionDate": "12-08-2022",
            "remarks": "",
            "departmentData": [
                {
                    "marker": "Date of Birth",
                    "value": "21-01-1999"
                },
                {
                    "marker": "Social Category",
                    "value": "ST"
                }
            ]
        },
        {
            "schemeCode": "VULC8",
            "aadhaarNumber": "123412341234",
            "aadhaarReferenceNumber": "1234123412345",
            "uniqueBeneficiaryId": "5812844",
            "financialYear": "2021-22",
            "transactionType": "Cash",
            "transactionAmount": 5000,
            "inKindBenefitDetail": "Training",
            "transactionDate": "12-08-2022",
            "remarks": "",
            "departmentData": [
                {
                    "marker": "Date of Birth",
                    "value": "21-01-1999"
                }
            ]
        }
    ]
}
```
Response
```json
{
    "transactionId": "55595af7-2e9d-4715-ad53-f531a22b04e0",
    "savedTransactionsCount": 1,
    "errorTransactionsCount": 3
}
```
Response keys: <br>
 - `transactionId`: Can be used in Transaction History API to check status for Save Scheme Transaction API call
 - `savedTransactionsCount`: Number of scheme transactions saved successfull to the database.
 - `errorTransactionsCount`: Number of scheme transactions with errors (explained below).

### Transaction History
Endpoint
```
GET http://base_url/ste/transactionHistory/${transactionId}
```

Request Header (Token received from Authentication API)
```json
{
    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpkUVpfQVIxdTNHVVBDTnNfdzdUU256anAyOCJ9.eyJhdWQiOiJkNTJiZWFkYi1lOGQxLTQ0ZDAtOGVmNS1hYmE3OTA0NTE0ZjEiLCJleHAiOjE2OTg3MDMyODcsImlhdCI6MTY5ODY5OTY4NywiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiIyNjQ5ZDg3Yi1kNDIyLTRlNDAtODUwNS0wMGNlOTE2MWZjMzkiLCJqdGkiOiJiYzZlOTMzOC0xZjk5LTRhZWYtYTcwMy1hNTM0OTk5OTQ2MmUiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJQQVNTV09SRCIsInByZWZlcnJlZF91c2VybmFtZSI6Ik16RTFOelE1T1RrNU9UazVNREVBIiwiYXBwbGljYXRpb25JZCI6ImQ1MmJlYWRiLWU4ZDEtNDRkMC04ZWY1LWFiYTc5MDQ1MTRmMSIsInJvbGVzIjpbImZhbWlseSJdLCJzaWQiOiI3ZGQ1MjRlNi1lNDUwLTQ4NDEtODU4OS03MDA3NmNiMzc1OGMiLCJhdXRoX3RpbWUiOjE2OTg2OTk2ODcsInRpZCI6IjU4MGI1MDE3LWI1NzUtNTg3OC0xY2EyLTMyYjI2MjZkNDJjMSJ9.ED7MKunU31SRakxGCN17_-9uk-g09QQXD8QF-GhFwFIi-LL9LVUa1uyMkYVWInA3wHeg_jaQe7_A9JzO6R5Giu5hXORf3Tcp1Zt304smKJ-eUeLrL4vLzBRsGDQ5YDQcuYMbJQERF1tch7NCanY9WBdBPM1NXNQTsOU99ZOF5U_OybCtNZPzdv4N8BnuPPYfU4TRckhY5MDcqKHbo3sCr8yn63KVctEsQ7O_MXZSAw6L6RMk8gNTcWK_d7hrataD4KFI9Cdo3R0xdGz9jPGfH8DombGlCGvgnoYWKxYN2ReBukfZ6irpovHWQlLnaC91_JaWUpk0V7gxpTIF0FQE_Q"
}
```

Response
```json
{
    "id": "55595af7-2e9d-4715-ad53-f531a22b04e0",
    "requestBody": [
        {
            "remarks": "",
            "schemeCode": "",
            "aadhaarNumber": "a23412341234",
            "financialYear": "2021-2022",
            "departmentData": [
                {
                    "value": "21-01-1999",
                    "marker": "Date of Birth"
                },
                {
                    "value": "ST",
                    "marker": "Social Category"
                }
            ],
            "transactionDate": "12-13-2022",
            "transactionType": "",
            "transactionAmount": 5000,
            "inKindBenefitDetail": "",
            "uniqueBeneficiaryId": "",
            "aadhaarReferenceNumber": "12341234123456"
        },
        {
            "remarks": "",
            "schemeCode": "VULC8",
            "aadhaarNumber": "1234123412345",
            "financialYear": "2021-22",
            "departmentData": [
                {
                    "value": "21-01-1999",
                    "marker": "Date of Birth"
                },
                {
                    "value": "ST",
                    "marker": "Social Category"
                }
            ],
            "transactionDate": "12-08-2022",
            "transactionType": "Cash",
            "transactionAmount": 5000,
            "inKindBenefitDetail": "Training",
            "uniqueBeneficiaryId": "5812844",
            "aadhaarReferenceNumber": "1234123412345"
        },
        {
            "remarks": "",
            "schemeCode": "VULC8",
            "aadhaarNumber": "123412341234",
            "financialYear": "2021-22",
            "departmentData": [
                {
                    "value": "21-01-1999",
                    "marker": "Date of Birth"
                },
                {
                    "value": "ST",
                    "marker": "Social Category"
                }
            ],
            "transactionDate": "12-08-2022",
            "transactionType": "Cash",
            "transactionAmount": "5000",
            "inKindBenefitDetail": "Training",
            "uniqueBeneficiaryId": "5812844",
            "aadhaarReferenceNumber": "1234123412345"
        },
        {
            "remarks": "",
            "schemeCode": "VULC8",
            "aadhaarNumber": "123412341234",
            "financialYear": "2021-22",
            "departmentData": [
                {
                    "value": "21-01-1999",
                    "marker": "Date of Birth"
                },
                {
                    "value": "ST",
                    "marker": "Social Category"
                }
            ],
            "transactionDate": "12-08-2022",
            "transactionType": "Cash",
            "transactionAmount": 5000,
            "inKindBenefitDetail": "Training",
            "uniqueBeneficiaryId": "5812844",
            "aadhaarReferenceNumber": "1234123412345"
        }
    ],
    "containErrors": true,
    "validRecordsSaved": true,
    "errors": {
        "0": {
            "schemeCode": [
                "EMPTY SCHEME CODE"
            ],
            "aadhaarNumber": [
                "AADHAAR NUMBER IS NOT A NUMBER"
            ],
            "financialYear": [
                "FINANCIAL NOT IN FORMAT OF YYYY-YY"
            ],
            "transactionDate": [
                "TRANSACTION DATE NOT IN FORMAT OF DD-MM-YYYY"
            ],
            "transactionType": [
                "EMPTY TRANSACTION TYPE"
            ],
            "inKindBenefitDetail": [
                "EMPTY IN KIND BENEFIT DETAIL"
            ],
            "uniqueBeneficiaryId": [
                "EMPTY UNIQUE BENEFICIARY ID"
            ],
            "aadhaarReferenceNumber": [
                "AADHAAR REFERENCE NUMBER SHOULD BE OF LENGTH 13"
            ]
        },
        "1": {
            "aadhaarNumber": [
                "AADHAAR NUMBER SHOULD BE OF LENGTH 12"
            ]
        },
        "2": {
            "transactionAmount": [
                "TRANSACTION AMOUNT SHOULD BE AN INTEGER"
            ]
        }
    },
    "userId": "749aa7ee-07b8-47ec-b920-952d10b0b7ff",
    "transactionStartTime": "2023-12-04T05:53:30.361Z",
    "transactionEndTime": "2023-12-04T05:53:30.417Z",
    "createdAt": "2023-12-04T05:53:30.419Z",
    "updatedAt": "2023-12-04T05:53:30.419Z"
}
```
Response keys: <br>
 - `requestBody`: Contains request body for transaction
 - `errors`: JSON object with keys that corresponds to the index of scheme transaction inside of `requestBody`. Value is String array, containing errors in that scheme transaction.

### Progress
Endpoint
```
GET http://base_url/ste/progress
```
Request Header (Token received from Authentication API)
```json
{
    "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpkUVpfQVIxdTNHVVBDTnNfdzdUU256anAyOCJ9.eyJhdWQiOiJkNTJiZWFkYi1lOGQxLTQ0ZDAtOGVmNS1hYmE3OTA0NTE0ZjEiLCJleHAiOjE2OTg3MDMyODcsImlhdCI6MTY5ODY5OTY4NywiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiIyNjQ5ZDg3Yi1kNDIyLTRlNDAtODUwNS0wMGNlOTE2MWZjMzkiLCJqdGkiOiJiYzZlOTMzOC0xZjk5LTRhZWYtYTcwMy1hNTM0OTk5OTQ2MmUiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJQQVNTV09SRCIsInByZWZlcnJlZF91c2VybmFtZSI6Ik16RTFOelE1T1RrNU9UazVNREVBIiwiYXBwbGljYXRpb25JZCI6ImQ1MmJlYWRiLWU4ZDEtNDRkMC04ZWY1LWFiYTc5MDQ1MTRmMSIsInJvbGVzIjpbImZhbWlseSJdLCJzaWQiOiI3ZGQ1MjRlNi1lNDUwLTQ4NDEtODU4OS03MDA3NmNiMzc1OGMiLCJhdXRoX3RpbWUiOjE2OTg2OTk2ODcsInRpZCI6IjU4MGI1MDE3LWI1NzUtNTg3OC0xY2EyLTMyYjI2MjZkNDJjMSJ9.ED7MKunU31SRakxGCN17_-9uk-g09QQXD8QF-GhFwFIi-LL9LVUa1uyMkYVWInA3wHeg_jaQe7_A9JzO6R5Giu5hXORf3Tcp1Zt304smKJ-eUeLrL4vLzBRsGDQ5YDQcuYMbJQERF1tch7NCanY9WBdBPM1NXNQTsOU99ZOF5U_OybCtNZPzdv4N8BnuPPYfU4TRckhY5MDcqKHbo3sCr8yn63KVctEsQ7O_MXZSAw6L6RMk8gNTcWK_d7hrataD4KFI9Cdo3R0xdGz9jPGfH8DombGlCGvgnoYWKxYN2ReBukfZ6irpovHWQlLnaC91_JaWUpk0V7gxpTIF0FQE_Q"
}
```

Response
```json
{
    "records_saved": 2
}
```
Response keys: <br>
 - `records_saved`: Total number of scheme transactions saved