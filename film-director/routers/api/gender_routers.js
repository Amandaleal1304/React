import { createGender, listGenders, editGender, deleteGender } from "../../controllers/api/gender_controller.js";
import { Router } from "express";

const gender_router = Router();


gender_router.get("/", listGenders);
gender_router.post("/", createGender);
gender_router.put("/", editGender);
gender_router.delete("/", deleteGender);

export default gender_router;