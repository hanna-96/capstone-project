const router = require('express').Router()

router.get('/me', (req, res) => {
  res.json(req.user)
})


router.use('/google', require('./google'))
module.exports = router