import { HeartRate, IHeartRate } from "@/models/heartrate.model";

export class HeartRateService {
  constructor() {}
  /**
   * Find/get all data service
   */
  async findAll(): Promise<IHeartRate[]> {
    return await HeartRate.find({});
  }
}