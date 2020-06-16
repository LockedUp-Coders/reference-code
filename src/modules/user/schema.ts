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

  posts: {
    type: Number,
    default: 0,
    required: false,
  },

  otpVerified: {
    type: Boolean,
    default: false,
    required: false,
  },
});

export default Mongoose.model("user", UserSchema);
