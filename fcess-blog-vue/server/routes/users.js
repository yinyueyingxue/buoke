const router = require('koa-router')();
const user = require('../controllers/user')

router.get('/getAllusers', user.queryUsers)
  .post('/delete', user.deleteUsers)
  .post('/login', user.login)
  .post('/register', user.register);

module.exports = router;
