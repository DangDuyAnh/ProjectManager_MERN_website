const router = require('express').Router();
let Message = require('../models/messages');

router.route('/find_room').post((req, res) => {
    Message.find({room: req.body.room})
    .then(message => res.json(message))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const room = req.body.room;
    const message = req.body.message;
    
    const newMessage = new Message({
        email,
        name,
        room,
        message
    });

    req.io.sockets.emit('messages', req.body.message);
    
    newMessage.save()
    .then(() => res.json('Message add!'))
    .catch(err => res.status(400).json('Error: ' + err));
    });

module.exports = router;