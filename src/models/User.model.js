const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, 
    },

    role: {
      type: String,
      enum: ["admin", "employee"],
      required: true,
      default: "employee",
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null, 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
