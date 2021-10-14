const router = require('express').Router();
const User = require('../../models');

router.post('/signup', async (req, res) => {
  try{
    const exists = await User.findOne({ where: { username: req.body.email }})

    if(exists){
      res.status(400).json({ msg: 'This user already exists'})
      return
    }
    const newUser = await User.create({
      username: req.body.email,
      password: req.body.password,
      
    });
    console.log(newUser)
  } catch(err){
    res.status(500).json(err, '/signup posting error')
  }
})

module.exports = router