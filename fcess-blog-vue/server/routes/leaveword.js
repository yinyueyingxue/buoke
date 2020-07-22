const router = require('koa-router')();
const words = require('../controllers/leaveword')

router.post('/createword', words.createWords)
      .get('/getAllWords', words.getAllWords)
      .post('/deleteWord', words.deleteWord)

module.exports = router;
