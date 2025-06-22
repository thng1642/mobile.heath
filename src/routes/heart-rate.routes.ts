import { Router } from 'express';
import { HeartRateController } from '../controllers/heart-rate.controller';

const routerHeartRate = Router();

const heartRateController = new HeartRateController();
// Routes public
routerHeartRate.get('/all', heartRateController.queryAllHeartRate);
routerHeartRate.get('/user/:userId', heartRateController.getHeartRateByUserId);

export default routerHeartRate;