# express-mongo-case-study
This is a simple RESTful API developed with Express.js and MongoDB.  
The url for the API is: https://express-mongo-case-study.herokuapp.com/

## API Endpoint
There is only one endpoint for the API which accepts POST method  
The url for the endpoint is: https://express-mongo-case-study.herokuapp.com/GetRecords

### Example Request Payload for the Endpoint
```
{
  "startDate": "2016-01-26",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 3000
}
```

### Example Respond Payload for the Endpoint
```
{
  "code":0,
  "msg":"Success",
  "records":[
    {
      "key":"TAKwGc6Jr4i8Z487",
      "createdAt":"2017-01-28T01:22:14.398Z",
      "totalCount":2800
    },
    {
      "key":"NAeQ8eX7e5TEg7oH",
      "createdAt":"2017-01-27T08:19:14.135Z",
      "totalCount":2900
    }
  ]
}
```

## Installing API Locally
You can check the API locally by installing and running through docker or npm. After running the API, the API will be serving at localhost:3000.

### With Docker
1. Install Docker to your OS,
2. Clone or download the repository,
3. Replace the $CONNECTION_STRING with the db connection string in the docker-compose.yml file,
4. Go to the repository directory with terminal.
5. Type ```docker-compose up``` in terminal.

### With NPM
1. Install Node.js to your OS.
2. Clone or download the repository.
3. Go to the repository directory with terminal.
4. Type ```npm install``` in terminal.
5. Type ```npm start``` in terminal.
