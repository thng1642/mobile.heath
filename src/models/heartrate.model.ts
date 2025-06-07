import mongoose, { Schema } from "mongoose";

export const HeartRate = mongoose.model(
  "HeartRate",
  new mongoose.Schema({
    starttime: {
      type: String,
      required: true,
    },
    endtime: {
      type: String,
      required: true,
    },
    sample: {
      type: Schema.Types.ObjectId,
      ref: "Sample",
      required: true,
    },
  })
);