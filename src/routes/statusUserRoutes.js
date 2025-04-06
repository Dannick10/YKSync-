const express = require('express')
const authGuard = require('../middlewares/AuthGuard')
const { getStatusUser, getStacksUser } = require('../controllers/statusController')
const router = express.Router()


router.get('/', authGuard, getStatusUser)
router.get('/stack', authGuard, getStacksUser)

module.exports = router
