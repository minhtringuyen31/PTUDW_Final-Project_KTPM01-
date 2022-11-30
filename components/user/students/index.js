const express = require('express');
const router = express.Router();

const studentController = require('./studentController');

router.get('/', studentController.list);
router.get('/:studentId', studentController.details);

module.exports = router;
