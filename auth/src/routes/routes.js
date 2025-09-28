import { Router } from 'express';
import { registerUser, loginUser,crearPerfil, obtenerPerfil } from '../controllers/controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/crearperfil', crearPerfil);
router.get('/perfil', obtenerPerfil);

export default router;