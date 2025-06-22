import { HeartRateService } from "../services/heart-rate.service";
import { Request, Response } from "express";
export class HeartRateController {
  private heartRateService: HeartRateService;
  constructor() {
    this.heartRateService = new HeartRateService();
  }
  /**
   * Api for query heart rate by user/user_id
   */
  async queryAllHeartRate(req: Request, res: Response): Promise<void> {
    try {
      //
      const data = await this.heartRateService.findAll();
      console.log(data);
    } catch (error) {
      //
    }
  }
}