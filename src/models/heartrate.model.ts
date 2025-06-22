import mongoose, { Schema } from "mongoose";

export interface IHeartRate {
  average_heart_rate: number;
  blood_pressure: string;
  end_time: String;
  maximum_heart_rate: number;
  minimum_heart_rate: number;
  start_time: String;
  user: Schema.Types.ObjectId;
}

export const HeartRate = mongoose.model(
  "heart",
  new mongoose.Schema({
    average_heart_rate: {
      type: Number,
      required: true,
    },
    blood_pressure: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    },
    maximum_heart_rate: {
      type: Number,
      required: true,
    },
    minimum_heart_rate: {
      type: Number,
      required: true,
    },
    start_time: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  })
);
