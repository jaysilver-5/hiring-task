import { authRouter } from "./authRouter";
import { Router } from "express";
import { titleRouter } from "./titleRouter";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/title", titleRouter);
