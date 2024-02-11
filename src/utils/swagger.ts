import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import log from "./logger";



const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Port Management System",
      version,
    },
    components: {
      securitySchemes: {
        // bearerAuth: {
        //   type: "http",
        //   scheme: "basic",
        //    bearerFormat: "JWT",
        // },
        basicAuth:{
        type: 'http',
        scheme: 'basic',
        description: "Basic Authentication. Provide your username and password as 'username:password' encoded in Base64",
        example: 'Authorization: Basic YWRtaW46YWRtaW4='
        }
        
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/router/docs/*.ts", "./src/schema/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: string) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  log.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;