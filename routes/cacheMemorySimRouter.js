const express = require('express');
const router = express();
const ctrl = require('../controllers/cacheMemorySimCtrl');

router.get('/', ctrl.viewHomePage);
router.get('/sequential', ctrl.viewSequentialPage);
router.get('/simpleton', ctrl.viewSimpletonPage);
router.get('/outputTextFile', ctrl.getOutputTextFile);

router.post('/Sequential', ctrl.postTwoLoops);
router.post('/Simpleton', ctrl.postSimpleton);

module.exports = router;