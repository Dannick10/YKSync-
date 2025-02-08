const express = require('express')
const { admPermissionUser, getusers  } = require('../controllers/adminController')
const router = express.Router()
const handleValidator = require('../middlewares/handleValidator')
const AuthGuard = require('../middlewares/AuthGuard')
const adminGuard = require('../middlewares/adminGuard')

router.post('/add', AuthGuard, adminGuard, admPermissionUser)
router.get('/getusers', AuthGuard, adminGuard, getusers) 

module.exports = router