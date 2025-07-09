import { createFilm, listFilms, editFilm, deleteFilm } from "../../controllers/api/film_controller.js";
import { Router } from "express";

const film_router = Router();


film_router.get("/", listFilms);
film_router.post("/", createFilm);
film_router.put("/", editFilm);
film_router.delete("/", deleteFilm);

export default film_router;