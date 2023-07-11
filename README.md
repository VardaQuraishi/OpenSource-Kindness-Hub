# OpenSource-Kindness-Hub
Open Source Random Acts of Kindness Generator for Beginners

## File Structuring

### models
-The code defines a schema for the Act of Kindness model using mongoose.Schema.<br />
-The schema specifies the structure and data types of the Act of Kindness document.
-Each field in the schema is defined with a type and optional validation rules.
-The required: true option indicates that the field is mandatory.
-The default option is used to provide a default value for the createdAt and updatedAt fields.
-The mongoose.model function creates a model named "ActOfKindness" based on the defined schema.
-The model is exported to be used in other parts of the application.

`title` field of type `String` that is `required`.
`category` field of type `String` that is `required`.
`description` field of type `String` that is `required`.
`image` field of type `String` that is `required`.
`tags` field of type `Array` containing `String` elements that is required.
`createdAt` field of type `Date` with a `default` value of the current date and time.
`updatedAt` field of type `Date` with a `default` value of the current date and time.
`testData` field of type `Boolean` with a `default` value of `false`.

### server
/index.js
-The code sets up an Express application and imports the required modules.
-A middleware function is added to log incoming requests using the logger module.
-The mongoose.connect function is used to establish a connection to the MongoDB database.
-The connection URL mongodb://localhost:27017/KindActions specifies the local MongoDB server and the database name.
-The connection options { useNewUrlParser: true, useUnifiedTopology: true } ensure compatibility with the MongoDB driver.
-The .then() block logs a successful database connection, while the .catch() block logs any connection errors.
-The body-parser middleware is used to parse JSON data from the request body.
-The actsOfKindnessRouter is mounted as middleware under the /api route.
-Finally, the server is started on port 3000, and a log message is displayed confirming the server's running status.
