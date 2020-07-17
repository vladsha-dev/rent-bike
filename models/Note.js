const mongoose = require("mongoose");
const NoteSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  bikeType: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
  },
  isRented: {
    type: Boolean,
  },
  dateStartRent: {
    type: Date,
  },
});
module.exports = mongoose.models.Note || mongoose.model("Note", NoteSchema);
