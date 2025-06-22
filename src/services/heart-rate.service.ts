import { IUser } from "../models/user.model";
import { heartRateSchema, IHeartRate } from "../models/heartrate.model";

export class HeartRateService {
  /**
   * Find/get all data service
   */
  async findAllByUser(userId?: string): Promise<IHeartRate[]> {
    console.log("get all data for user:", userId);

    if (userId) {
      return await heartRateSchema.find({ user: userId });
    }
    
    return await heartRateSchema.find();
  }
}
