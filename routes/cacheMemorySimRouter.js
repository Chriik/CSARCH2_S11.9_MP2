const express = require('express');
const router = express();
const ctrl = require('../controllers/cacheMemorySimCtrl');

router.get('/', ctrl.viewHomePage);
router.post('/TwoLoops', ctrl.postTwoLoops);

module.exports = router;