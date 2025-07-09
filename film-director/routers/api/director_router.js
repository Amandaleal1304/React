import { createDirector, listDirectors, editDirector, deleteDirector } from "../../controllers/api/director_controller.js";
import { Router } from "express";

const director_router = Router();


director_router.get("/", listDirectors);
director_router.post("/", createDirector);
director_router.put("/", editDirector);
director_router.delete("/", deleteDirector);

export default director_router;