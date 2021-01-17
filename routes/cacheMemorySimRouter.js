const express = require('express');
const router = express();
const ctrl = require('../controllers/cacheMemorySimCtrl');

router.get('/', ctrl.viewSimulationPage);
router.post('/TwoLoops', ctrl.postTwoLoops);

module.exports = router;