const express = require('express');
const { getLogs } = require('../controllers/activityLogController');
const router = express.Router();

router.get('/', getLogs);

// Other activity log routes...

module.exports = router;

