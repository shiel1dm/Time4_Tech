const router = require('express').Router();
const User = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try{
    const userData = await User.findAll({
      attributes: { exclude: ['password']},
      order: [['name', 'ASC']], //ordering these by name, ascending
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err, 'auth error')
  }
})

router.get('/login', async (req, res) => {
  try{
    res.render('login', {layout : 'index'})
  }catch (err) {
    res.status(500).json(err, '/login route error')
  }
})

module.exports = router;