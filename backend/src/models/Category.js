const mongoose = require("mongoose");

const categorySchema=new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: { 
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
categorySchema.set("toJSON", {
  transform:function(doc, ret){
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Category", categorySchema);