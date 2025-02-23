const express = require('express')
const router = express()

const userRouter = require('./userRoutes')
const adminRouter = require('./adminRoutes')
const projectRouter = require('./projectRoutes')
const statusUserRouter = require('./statusUserRoutes')

router.use('/api/user', userRouter)
router.use('/api/admin', adminRouter)
router.use('/api/project', projectRouter)
router.use('/api/status', statusUserRouter)

router.get("/", (req,res) => {
    res.send("API WORKING")
})


module.exports = router