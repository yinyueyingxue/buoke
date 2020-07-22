const router = require('koa-router')();
const collect = require('../controllers/collect')

router.post('/createCollect', collect.createCollect)
      .post('/getcollect', collect.getcollectArticle)
      .post('/Iscollect', collect.IsCollectArticle)
      .post('/CollectCancle', collect.CollectCancle)

module.exports = router;
