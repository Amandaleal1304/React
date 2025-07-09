
import { createFilm, deleteFilm, editFilm, listFilms, saveFilm } from "../../controllers/web/film_controller.js";

import { Router } from "express";



const film_web_router = Router();

film_web_router.get('/', listFilms);

film_web_router.post('/create', createFilm);

film_web_router.post('/edit', editFilm);

film_web_router.post('/save', saveFilm);

film_web_router.post('/delete', deleteFilm);



export default film_web_router;

