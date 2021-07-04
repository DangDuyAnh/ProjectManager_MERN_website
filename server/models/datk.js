const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const datkSchema = new Schema({
  tendoan: { type: String, required: true },
  linkdoan: { type: String, required: true },
  tensinhvien: { type: String, required: true },
  emailsinhvien: { type: String, required: true },
  tengiangvien: {type: String, required: true},
  emailgiangvien: {type: String, required: true},
  khoa: {type: String, required: true},
  he: {type: String, required: true},
  nganh: {type: String, required: true}
});

const datk = mongoose.model('sample', datkSchema);

module.exports = datk;