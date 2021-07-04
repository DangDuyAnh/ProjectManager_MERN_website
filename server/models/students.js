const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  hoten: { type: String, required: true },
  mssv: { type: String, required: true },
  vien: {type: String, required: true},
  lop: {type: String, required: true},
  sdt: {type: String, required: true}
});

const student = mongoose.model('student', studentSchema);

module.exports = student;