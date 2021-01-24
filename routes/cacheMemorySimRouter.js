const express = require('express');
const router = express();
const ctrl = require('../controllers/cacheMemorySimCtrl');

router.get('/', ctrl.viewHomePage);
router.get('/sequential', ctrl.viewSequentialPage);
router.get('/simpleton', ctrl.viewSimpletonPage);
router.get('/outputTextFile', ctrl.getOutputTextFile);

router.post('/TwoLoops', ctrl.postTwoLoops);

module.exports = router;