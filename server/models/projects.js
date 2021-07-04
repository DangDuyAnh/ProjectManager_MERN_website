const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  term: { type: String, required: true },
  subject_code: { type: String, required: true },
  class_code: { type: String, required: true },
  topic: {type: String, required: true},
  student_name: {type: String, required: true},
  student_code: {type: String, required: true},
  teacher_email: {type: String, required: true},
  teacher_name: {type: String, required: true}
});

const project = mongoose.model('project', projectSchema);

module.exports = project;