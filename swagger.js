//swagger set-up and configuration
const swaggerAutogen = require("swagger-autogen")()
require("dotenv").config()

const doc = {
  openapi: "3.0.0", //use openapi 3.0 specification
  info: {
    title: "MongoDB Project",
    description: "API documentation generated with swagger-autogen",
    version: "1.0.0",
  },
  servers: [
    {
      url: "https://mongodb-project-3qz4.onrender.com",
      description: "Production server",
    },
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  components: {
    securitySchemes: {
      oauth2: {
        type: "oauth2",
        flows: {
          authorizationCode: {
            authorizationUrl: `https://${process.env.AUTH0_DOMAIN}/authorize`,
            tokenUrl: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
            scopes: {
              openid: "Access basic user information",
              profile: "Access user profile information",
              email: "Access user email address",
            },
          },
        },
      },
    },
  },

  security: [
    {
      oauth2: ["openid", "profile", "email"],
    },
  ],
}

const outputFiles = "./swagger-output.json"
const routes = ["./router/index.js"]

swaggerAutogen(outputFiles, routes, doc)
