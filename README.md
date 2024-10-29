# CRUD of Login and Posts 💻

- [Technologies](#tech)
- [Getting Started](#started)
- [API Endpoints](#routes)
- [Project Structure](#structure)

## 💻 Technologies <a id="tech"></a>

- Express
- Bcrypt
- Tailwind
- MongoDB
- NodeJS

## 🚀 Getting Started <a id="started"></a>

### Prerequisites

List of prerequisites necessary for running your project:

- [NodeJS](https://nodejs.org/)
- [Express](https://www.npmjs.com/package/express)
- [Mongoose](https://www.npmjs.com/package/mongoose)

### Run Locally:

To start the project locally, follow these steps:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the server after installing the dependencies:

- To run locally:
     ```bash
     cd .\src\
     nodemon app.js
     ```


##Config .env variables

Use the `.env.example` as reference to create your configuration file `.env` with your Credentials

```yaml
MONGO_URI= # MongoDB connection string
SESSION_SECRET= # Session secret key for encryption
```

<h2 id="routes">📍 API Endpoints</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>GET //api/posts/:user</kbd>     | Retrieves user posts see [response details](#get-auth-detail)
| <kbd>POST /signup</kbd>     | Registers a new user see [request details](#post-auth-detail)

<h3 id="get-auth-detail">GET /api/posts/:user</h3>

**RESPONSE**
```json
{

  "username": "user.username",
  "url": "user.url",
  "description": "user.description",
  "createdAt": "user.date",
}
```

<h3 id="post-auth-detail">POST /signup</h3>

**REQUEST**
```json
{
  "username": "usertest",
  "password": "4444444"
}
```

**RESPONSE**
```json
{
  "token": "$2b$10$4.V/XxfWft0.iQ3sXQrqOO7rym475FG9ObJQTlGIO.SOlEC8D02Vi"
}
```

## Project Structure <a id="structure"></a>

- **public**: Holds static files like HTML and JavaScript files.
- **js**: Contains JavaScript files for page configurations and scripts.
- **src**: Contains the main application code.
  - **models**: Database models for posts and users.
  - **routes**: API route definitions, such as `auth.js`.
- **.env**: Environment variables file.
- **app.js**: Main application entry point.
- **tailwind.config.js**: Tailwind CSS configuration file.
