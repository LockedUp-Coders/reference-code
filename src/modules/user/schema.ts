import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  mobileNumber: {
    type: String,
    unique: true,
    required: true,
  },

  businessName: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    required: true,
  },

  lastOpened: {
    type: Date,
    required: true,
  },

  otpVerified: {
    type: Boolean,
    default: false,
  },

  lastOtp: {
    type: String,
    default: "-1",
  },
});

export default Mongoose.model("user", UserSchema);
