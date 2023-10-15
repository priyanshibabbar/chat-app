// const express = require('express');
// const { registerUser, authUser } = require('../controllers/userControllers');
// const router = express.Router();

// router.route('/').post(registerUser);
// router.post('/login').post(authUser);


// module.exports = router; 

const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/signup').post(registerUser);
router.post('/login', authUser);
router.route('/signup').get(protect, allUsers);


module.exports = router;
