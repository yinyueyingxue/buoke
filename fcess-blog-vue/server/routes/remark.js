const router = require('koa-router')();
const remark = require('../controllers/remark')

router.post('/createremark', remark.createRemarks)
      .post('/remarks', remark.getRemarkById)

module.exports = router;
