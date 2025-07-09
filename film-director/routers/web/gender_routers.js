import { createGender, listGenders, editGender, deleteGender, saveGender } from "../../controllers/web/gender_controller.js";
import { Router } from "express";

const gender_web_router = Router();

gender_web_router.get('/', listGenders);

gender_web_router.post('/create', createGender);

gender_web_router.post('/edit', editGender);

gender_web_router.post('/save', saveGender);

gender_web_router.post('/delete', deleteGender);

export default gender_web_router;