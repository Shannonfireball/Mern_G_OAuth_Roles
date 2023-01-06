const express = require('express');
const router = express.Router();
const googleAuthController = require('../controllers/googleAuth');

router.post('/', googleAuthController.handleGoogleAuth);

    

module.exports = router;