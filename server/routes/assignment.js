const router = require('express').Router();
let Assignment = require('../models/assignments');

router.route('/find_room').post((req, res) => {
    Assignment.find({room: req.body.room})
    .then(assignment => res.json(assignment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const topic = req.body.topic;
    const submission_date = req.body.submission_date;
    const due_date = req.body.due_date;
    const attachment = req.body.attachment;
    const score = req.body.score; 
    const student_comment = req.body.student_comment;
    const teacher_comment = req.body.teacher_comment;
    const room = req.body.room;
    
    const newAssignment = new Assignment({
        name,
        topic,
        submission_date,   
        due_date,
        attachment,
        score,
        student_comment,
        teacher_comment,
        room
    });

    req.io.sockets.emit('changeAssignment'); 
    newAssignment.save()
    .then(() => res.json('Assignment add!'))
    .catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/:id').get((req, res) => {
        Assignment.findById(req.params.id)
          .then(assignment => res.json(assignment))
          .catch(err => res.status(400).json('Error: ' + err));
      });
      
      router.route('/:id').delete((req, res) => {
        Assignment.findByIdAndDelete(req.params.id)
          .then(() => res.json('Assignment deleted.'))
          .catch(err => res.status(400).json('Error: ' + err));
          req.io.sockets.emit('changeAssignment');
      });
      
      router.route('/update/:id').post((req, res) => {
        Assignment.findById(req.params.id)
          .then(assignment => {
            assignment.name = req.body.name;
            assignment.topic = req.body.topic;
            assignment.submission_date = req.body.submission_date;
            assignment.due_date = req.body.due_date;
            assignment.attachment = req.body.attachment;
            assignment.score = req.body.score;
            assignment.student_comment = req.body.student_comment;
            assignment.teacher_comment = req.body.teacher_comment;
            assignment.room = req.body.room;
      
            req.io.sockets.emit('changeAssignment');
            assignment.save()
              .then(() => res.json('Project updated!'))
              .catch(err => res.status(400).json('Error: ' + err));
          })
          .catch(err => res.status(400).json('Error: ' + err));
      });

module.exports = router;