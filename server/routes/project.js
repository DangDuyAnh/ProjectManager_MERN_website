const router = require('express').Router();
let Project = require('../models/projects');

router.route('/').get((req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get_teaproject').post((req, res) => {
  Project.find({teacher_email: req.body.email})
  .then(pj => res.json(pj))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get_stuproject').post((req, res) => {
  Project.find({student_code: req.body.student_code})
  .then(pj => res.json(pj))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const term = req.body.term;
  const subject_code = req.body.subject_code;
  const class_code = req.body.class_code;
  const topic = req.body.topic;
  const student_name = req.body.student_name;
  const student_code = req.body.student_code;
  const teacher_email = req.body.teacher_email;
  const teacher_name = req.body.teacher_name;

  const newProject = new Project({
    name,
    term,
    subject_code,
    class_code,
    topic,
    student_name,
    student_code,
    teacher_email,
    teacher_name
  });

  newProject.save()
  .then(() => res.json('Project added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Project.findById(req.params.id)
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json('Project deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      project.name = req.body.name;
      project.term = req.body.term;
      project.student_code = req.body.student_code;
      project.class_code = req.body.class_code;
      project.topic = req.body.topic;
      project.student_name = req.body.student_name;
      project.student_code = req.body.student_code;
      project.teacher_email = req.body.teacher_email;
      project.teacher_name = req.body.teacher_name;

      project.save()
        .then(() => res.json('Project updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;