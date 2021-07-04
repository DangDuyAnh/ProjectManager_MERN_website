const router = require('express').Router();
let DATK = require('../models/datk');

router.route('/').get((req, res) => {
  DATK.find()
    .then(datk => res.json(datk))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get_teaproject').post((req, res) => {
  DATK.find({emailgiangvien: req.body.email})
  .then(pj => res.json(pj))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const tendoan = req.body.tendoan;
    const linkdoan = req.body.linkdoan;
    const tensinhvien = req.body.tensinhvien;
    const emailsinhvien = req.body.emailsinhvien ;
    const tengiangvien = req.body.tengiangvien;
    const emailgiangvien = req.body.emailgiangvien; 
    const khoa = req.body.khoa ;
    const he = req.body.he;
    const nganh = req.body.nganh;
    
    const newDATK = new DATK({
      tendoan,
      linkdoan,
      tensinhvien, 
      emailsinhvien,
      tengiangvien,
      emailgiangvien,
      khoa,
      he,
      nganh,
    });

    newDATK.save()
    .then(() => res.json('DATK add!'))
    .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/:id').get((req, res) => {
        DATK.findById(req.params.id)
          .then(datk => res.json(datk))
          .catch(err => res.status(400).json('Error: ' + err));
      });
      
      router.route('/:id').delete((req, res) => {
        DATK.findByIdAndDelete(req.params.id)
          .then(() => res.json('Datk deleted.'))
          .catch(err => res.status(400).json('Error: ' + err));
      });
      
      router.route('/update/:id').post((req, res) => {
        DATK.findById(req.params.id)
          .then(datk => {
            datk.tendoan = req.body.tendoan;
            datk.linkdoan = req.body.linkdoan;
            datk.tensinhvien = req.body.tensinhvien;
            datk.emailsinhvien = req.body.emailsinhvien;
            datk.tengiangvien = req.body.tengiangvien;
            datk.emailgiangvien = req.body.emailgiangvien;
            datk.khoa = req.body.khoa;
            datk.he = req.body.he;
            datk.nganh = req.body.nganh;

            datk.save()
              .then(() => res.json('Project updated!'))
              .catch(err => res.status(400).json('Error: ' + err));
          })
          .catch(err => res.status(400).json('Error: ' + err));
      });

module.exports = router;