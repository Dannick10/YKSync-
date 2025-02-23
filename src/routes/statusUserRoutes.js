const express = require('express')
const authGuard = require('../middlewares/AuthGuard')
const { getStatusUser } = require('../controllers/statusController')
const router = express.Router()


router.get('/', authGuard, getStatusUser)

module.exports = router
