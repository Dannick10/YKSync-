const express = require('express')
const router = express()

const userRouter = require('./userRoutes')
const adminRouter = require('./adminRoutes')
const projectRouter = require('./projectRoutes')

router.use('/api/user', userRouter)
router.use('/api/admin', adminRouter)
router.use('/api/project', projectRouter)

router.get("/", (req,res) => {
    res.send("API WORKING")
})


module.exports = router