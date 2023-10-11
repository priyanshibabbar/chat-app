// const express = require('express');
// const { registerUser, authUser } = require('../controllers/userControllers');
// const router = express.Router();

// router.route('/').post(registerUser);
// router.post('/login').post(authUser);


// module.exports = router; 

const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers');
const router = express.Router();

router.route('/signup').post(registerUser);
router.post('/login', authUser);



module.exports = router;
