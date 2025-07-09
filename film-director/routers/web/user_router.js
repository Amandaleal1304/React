import { Router } from "express";
import { promptUser, createUser, login, logout, promptLogin } from "../../controllers/web/user_controller.js";

const user_web_router = Router();

user_web_router.get('/register', promptUser);//mostra o formulario 

user_web_router.post('/register', createUser);//processa o registro

user_web_router.get('/login', promptLogin);//mostra o formulario

user_web_router.post('/login', login);//processa o login

user_web_router.get('/logout', logout);


export default user_web_router;




