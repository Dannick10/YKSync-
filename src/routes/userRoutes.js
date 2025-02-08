const express = require('express')
const { SignUser, loginUser, getCurrentUser, updateUser,  } = require('../controllers/userController')
const router = express.Router()
const handleValidator = require('../middlewares/handleValidator')
const { userSignInValidator, userLoginValidator, userUpdateValidator } = require('../middlewares/userValidate')
const AuthGuard = require('../middlewares/AuthGuard')
const { getCurrentUserProject } = require('../controllers/projectController')

router.get('/', AuthGuard, getCurrentUser )
router.post('/signIn',userSignInValidator(), handleValidator, SignUser)
router.post('/login', userLoginValidator(), handleValidator, loginUser)
router.put('/update', AuthGuard, userUpdateValidator(), handleValidator, updateUser)

module.exports = router