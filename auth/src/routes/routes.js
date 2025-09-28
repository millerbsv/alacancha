import { Router } from 'express';
import { registerUser, loginUser,crearPerfil } from '../controllers/controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/crearperfil', crearPerfil);

export default router;