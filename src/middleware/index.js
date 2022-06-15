import express from "express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import createRequestTime from "./createRequestTime";

export default (app) => {
  //Third Party Middlewares
  app.use(morgan("dev"));
  app.use(compression());
  app.use(helmet());
  app.use(express.json());
  app.use(cors());

  //Custom Middlewares
  app.use(createRequestTime);
};
