#<h1 align="center" style="font-weight: bold;">CRUD of Login and Posts 💻</h1>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
 <a href="#routes">API Endpoints</a> •
 <a href="#structure">Collaborators</a> •
</p>



<h2 id="tech">💻 Technologies</h2>
- Express
- Bcrypt
- Tailwind
- MongoDB
- NodeJS

<h2 id="started">🚀 Getting started</h2>
<h3>Prerequisites</h3>

Here you list all prerequisites necessary for running your project:

- [NodeJS](https://github.com/)
- [Express](https://www.npmjs.com/package/express)
- [Mongoose](https://www.npmjs.com/package/mongoose)

How to start your project


To Run Locally:
1. Install dependencies using `npm`.
2. Rode o servidor após instalar as dependências:

   - Para executar localmente:
     ```bash
     cd .\src\
     nodemon app.js
     ```

##Environment Variables
Refer to the .example.env file for environment variables.

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env` with your AWS Credentials

```yaml
MONGO_URI=
SESSION_SECRET=
```

<h2 id="routes">📍 API Endpoints</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>GET //api/posts/:user</kbd>     | retrieves user info see [response details](#get-auth-detail)
| <kbd>POST /signup</kbd>     | authenticate user into the api see [request details](#post-auth-detail)

<h3 id="get-auth-detail">GET /api/posts/:user</h3>

**RESPONSE**
```json
{
  username: "user.username",
  url: "user.url",
  description: "user.description",
  createdAt: "user.date",
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

<h2 id='structure'>Project Structure </h2>
- **`public`**: Holds static files like HTML and JavaScript files.
  - **`js`**: Contains JavaScript files for page configurations and scripts.
- **`src`**: Contains the main application code.
  - **`models`**: Database models for `post` and `user`.
  - **`routes`**: API route definitions, such as `auth.js`.
- **`.env`**: Environment variables file.
- **`app.js`**: Main application entry point.
- **`tailwind.config.js`**: Tailwind CSS configuration file.

