const express = require('express');
const router = express();
const ctrl = require('../controllers/cacheMemorySimCtrl');

router.get('/', ctrl.viewHomePage);

module.exports = router;