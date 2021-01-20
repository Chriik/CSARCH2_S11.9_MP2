const express = require('express');
const router = express();
const ctrl = require('../controllers/cacheMemorySimCtrl');

router.get('/', ctrl.viewHomePage);
router.post('/TwoLoops', ctrl.postTwoLoops);

// For easy viewing of sequential page (delete if u want)
router.get('/sequential', (req, res) => res.render('SequentialPage'));

module.exports = router;