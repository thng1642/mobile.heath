import { HeartRateService } from "../services/heart-rate.service";
import { Request, Response } from "express";

export class HeartRateController {
  private heartRateService: HeartRateService;

  constructor() {
    this.heartRateService = new HeartRateService();
    
    // Bind methods to maintain 'this' context when called by Express
    this.queryAllHeartRate = this.queryAllHeartRate.bind(this);
    this.getHeartRateByUserId = this.getHeartRateByUserId.bind(this);
  }

  /**
   * Api for query all heart rate data
   */
  async queryAllHeartRate(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.heartRateService.findAllByUser();
      console.log("result", result);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Api for query heart rate by user ID
   */
  async getHeartRateByUserId(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }

      const result = await this.heartRateService.findAllByUser(userId);
      console.log("Heart rate data for user:", userId, result);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}