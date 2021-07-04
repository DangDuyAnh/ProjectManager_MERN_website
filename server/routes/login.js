const router = require('express').Router();
let Student = require('../models/students');
let Teacher = require('../models/teachers')

router.route('/add_student').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const hoten = req.body.hoten;
    const mssv = req.body.mssv;
    const vien = req.body.vien;
    const lop = req.body.lop;
    const sdt = req.body.sdt;
  
    const newStudent = new Student({
        email,
        password,
        hoten,
        mssv,
        vien,
        lop,
        sdt
    });

    newStudent.save()
      .then(() => res.json('Student added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add_teacher').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const hoten = req.body.hoten;
    const vien = req.body.vien;
    const sdt = req.body.sdt;
  
    const newTeacher = new Teacher({
        email,
        password,
        hoten,
        vien,
        sdt
    });

    newTeacher.save()
      .then(() => res.json('Teacher added!'))
      .catch(err => res.status(400).json('Error: ' + err));

  });
  
  router.route('/count_student').post((req, res) => {
    Student.find({email : req.body.email}).count(function (err, count) {})
    // Student.find({email : req.body.email})
    .then(count => res.json(count))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/count_teacher').post((req, res) => {
    Teacher.find({email : req.body.email}).count(function (err, count) {})
    // Student.find({email : req.body.email})
    .then(count => res.json(count))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find_student').post((req, res) => {
    Student.find({email: req.body.email, password: req.body.password})
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
});
  
router.route('/find_teacher').post((req, res) => {
    Teacher.find({email: req.body.email, password: req.body.password})
    .then(teacher => res.json(teacher))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get_teacher').post((req, res) => {
    Teacher.find({email: req.body.email})
    .then(teacher => res.json(teacher))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/search_student').post((req, res) => {
    Student.find({hoten: req.body.student_name, mssv: req.body.student_code})
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports = router;