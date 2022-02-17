const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const timeSlotsSchema = new Schema({
    // todo: id
    // UTC datetime; todo: Date type
    dayTime: {type: Date, required: true },
    startTime: {type: String, required: true},
    endTime: {type: String, required: true},
    coefficient: {type: Double, default: 0},
  }, {
    timestamps: true,
  });
  
  const timeSlots = mongoose.model('time_slots', timeSlotsSchema);
  
  module.exports = timeSlots;
