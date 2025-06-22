import { Router } from 'express';
import { HeartRateController } from '../controllers/heart-rate.controller';

const routerHeartRate = Router();

const heartRateController = new HeartRateController();
// Routes public
routerHeartRate.get('/heart-rate-all', heartRateController.queryAllHeartRate);

export default routerHeartRate;