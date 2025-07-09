
import { createDirector, deleteDirector, editDirector, listDirectors, saveDirector } from "../../controllers/web/director_controller.js";

import { Router } from "express";



const director_web_router = Router();

director_web_router.get('/', listDirectors);

director_web_router.post('/create', createDirector);

director_web_router.post('/edit', editDirector);

director_web_router.post('/save', saveDirector);

director_web_router.post('/delete', deleteDirector);



export default director_web_router;

