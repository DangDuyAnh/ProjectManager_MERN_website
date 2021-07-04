const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  name: { type: String, required: true },
  topic: { type: String },
  submission_date: { type: String},
  due_date: {type: Date},
  attachment: {type: String},
  score: {type: String},
  student_comment: {type: String},
  teacher_comment: {type: String},
  room: {type:String, required: true }
});

const assignment = mongoose.model('assignment', assignmentSchema);

module.exports = assignment;