import { Router } from "express";
import { criarUsuario, deletarUsuario, lerUsuarios, lerUsuarioPorId, atualizarUsuario } from "../controllers/logic.js";

const routes = Router();

routes.post("/create", criarUsuario); 

routes.get("/read", lerUsuarios); 

routes.get("/read/:id", lerUsuarioPorId);

routes.put("/update/:id", atualizarUsuario);

routes.delete("/delete/:id", deletarUsuario);

export default routes; 