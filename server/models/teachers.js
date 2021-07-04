const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  hoten: { type: String, required: true },
  vien: {type: String, required: true},
  sdt: {type: String, required: true}
});

const teacher = mongoose.model('teacher', teacherSchema);

module.exports = teacher;