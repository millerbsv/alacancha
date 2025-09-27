import { Router } from 'express';
import {findSpot} from '../controllers/controller.js';
import { getHistorialParticipacion } from '../controllers/controller.js';
import { crearCupo } from '../controllers/controller.js';

const router = Router();

router.post('/findspot', findSpot);
router.post('/historial', getHistorialParticipacion);
router.post('/cupos', crearCupo);

export default router;