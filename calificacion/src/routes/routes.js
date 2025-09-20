import { Router } from 'express';
import { ultimaCalificacion } from '../controllers/controller.js';
import { verHistorial } from '../controllers/controller.js';

const router = Router();

router.post('/verhistorial', verHistorial);
router.post('/ultimacalificacion', ultimaCalificacion);


export default router;