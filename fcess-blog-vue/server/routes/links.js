const router = require('koa-router')();
const link = require('../controllers/link')

router.post('/createlink', link.createLinks)
      .get('/getAlllink', link.getAllLinks)
      .get('/:id', link.getLinkById)
      .post('/edit', link.editLink)
      .post('/delete', link.deleteLink)

module.exports = router;
