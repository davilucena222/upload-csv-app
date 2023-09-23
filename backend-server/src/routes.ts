import { Router } from "express";
import { router as filesRouter } from "./api/files";
import { router as usersRouter } from "./api/users";

const router = Router();

router.use("/api/files", filesRouter);
router.use("/api/users", usersRouter);

export { router };