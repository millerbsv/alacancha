import { Router } from 'express';
import {findSpot} from '../controllers/controller.js';

const router = Router();

router.post('/findspot', findSpot);

export default router;