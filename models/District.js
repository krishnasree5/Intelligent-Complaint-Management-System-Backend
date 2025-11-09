import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model("District", districtSchema);
