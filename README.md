# OpenSource-Kindness-Hub
Open Source Random Acts of Kindness Generator for Beginners

## File Structuring

### models
-The code defines a schema for the Act of Kindness model using mongoose.Schema.<br />
-The schema specifies the structure and data types of the Act of Kindness document.<br />
-Each field in the schema is defined with a type and optional validation rules.<br />
-The required: true option indicates that the field is mandatory.<br />
-The default option is used to provide a default value for the createdAt and updatedAt fields.<br />
-The mongoose.model function creates a model named "ActOfKindness" based on the defined schema.<br />
-The model is exported to be used in other parts of the application.<br />

`title` field of type `String` that is `required`.
`category` field of type `String` that is `required`.
`description` field of type `String` that is `required`.
`image` field of type `String` that is `required`.
`tags` field of type `Array` containing `String` elements that is required.
`createdAt` field of type `Date` with a `default` value of the current date and time.
`updatedAt` field of type `Date` with a `default` value of the current date and time.
`testData` field of type `Boolean` with a `default` value of `false`.

### server
#### /index.js
-The code sets up an Express application and imports the required modules.<br />
-A middleware function is added to log incoming requests using the logger module.<br />
-The mongoose.connect function is used to establish a connection to the MongoDB database.<br />
-The connection URL `mongodb://localhost:27017/KindActions` specifies the local MongoDB server and the database name.<br />
-The connection options { useNewUrlParser: true, useUnifiedTopology: true } ensure compatibility with the MongoDB driver.<br />
-The .then() block logs a successful database connection, while the .catch() block logs any connection errors.<br />
-The body-parser middleware is used to parse JSON data from the request body.<br />
-The actsOfKindnessRouter is mounted as middleware under the /api route.<br />
-Finally, the server is started on port 3000, and a log message is displayed confirming the server's running status.<br />

#### routes
/actsOfKindnessRoutes.js<br />

Define route handlers for different API endpoints:<br />
<br />
`POST` /acts-of-kindness - Handles the creation of a new act of kindness. It extracts the necessary data from the request body and creates a new instance of the ActOfKindness model. The testData flag is set to true if provided, otherwise it defaults to false. The new act of kindness is saved to the database, and the appropriate response is sent back.<br /><br />
`GET` /acts-of-kindness - Retrieves all acts of kindness from the database and sends them back as a response.
`GET` /acts-of-kindness/:id - Retrieves a specific act of kindness based on the provided ID. If the act of kindness is found, it is sent back as a response. If not found, an appropriate error response is sent.<br /><br />
`PUT` /acts-of-kindness/:id - Updates an existing act of kindness based on the provided ID. It extracts the updated data from the request body and uses the findByIdAndUpdate method to update the act of kindness. If the act of kindness is updated successfully, a success message is sent back. If not found, an appropriate error response is sent.<br /><br />
`DELETE` /acts-of-kindness/:id - Deletes an existing act of kindness based on the provided ID. It uses the findByIdAndRemove method to remove the act of kindness from the database. If the act of kindness is deleted successfully, a success message is sent back. If not found, an appropriate error response is sent.<br /><br /><br />

/actsOfKindeness.test.js<br />
In this file, we have written test cases using the supertest library to test the API endpoints. Here's a breakdown of the test cases:<br />
<br /><br />
After all tests are done, we close the MongoDB connection and the Express server.<br />
Before each test, we clean up the test data by removing act of kindness documents with testData flag set to true.<br />
We have separate describe blocks for each API endpoint to group related test cases together.<br />
In each test block, we make HTTP requests to the corresponding API endpoint using supertest and assert the expected responses.<br />
For the `GET` endpoint, we test retrieving all acts of kindness and retrieving a specific act of kindness by ID.<br />
For the `POST` endpoint, we test creating a new act of kindness.<br />
For the `PUT` endpoint, we test updating an existing act of kindness by ID.<br />
For the `DELETE` endpoint, we test deleting an act of kindness by ID.<br />
These test cases ensure that the API endpoints function correctly and return the expected responses.<br />