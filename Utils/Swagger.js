import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cinema Booking API",
      version: "1.0.0",
      description: "API documentation for the Cinema Booking application",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token in the format **Bearer &lt;token>**",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./Routes/*.js", "./Models/*.js"],
};

const swaggerDocs = swaggerJSDoc(options);
export default swaggerDocs;
