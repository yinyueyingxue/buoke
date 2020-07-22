import cookies from 'js-cookie'
import api from '../api'
// import * as types from './mutation-types'

const SUCCESS_CODE = 1000000

export const getArticleDetail = (ctx, opts) => {
  return api.getArticleDetail(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const getArticleList = (ctx, opts) => {
  return api.getArticleList(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const getArchiveArticles = (ctx) => {
  return api.getArchiveArticles().then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const getTagsList = (ctx) => {
  return api.getTagsList().then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const getTagsContent = (ctx, tags) => {
  return api.getTagsContent(tags).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const getManageArticles = (ctx, opts) => {
  return api.getManageArticles(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const getNewArticles = (ctx) => {
  return api.getNewArticleList({
    start: 0,
    limit: 5
  }).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const createArticle = (ctx, opts) => {
  return api.createArticle(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body.data)
    } else {
      return Promise.reject(res.body.message)
    }
  })
}

export const editArticle = (ctx, opts) => {
  return api.editArticle(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const removeArticleById = (ctx, opts) => {
  return api.removeArticleById(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const userLogin = (ctx, opts) => {
  return api.userLogin(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      let data = res.body.data
      cookies.set('token', data.token, { expires: 7 })
      cookies.set('role', data.user.username, { expires: 7 })
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}

export const userRegister = (ctx, opts) => {
  return api.userRegister(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const getAllUsers = (ctx, opts) => {
  return api.getAllUsers().then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const removeUsersById = (ctx, opts) => {
  return api.removeUsersById(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const createWord = (ctx, opts) => {
  return api.createWord(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const getAllWords = (ctx, opts) => {
  return api.getAllWords().then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const removeWordById = (ctx, opts) => {
  return api.removeWordById(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const createRemark = (ctx, opts) => {
  return api.createRemark(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const getRemarkDetail = (ctx, opts) => {
  return api.getRemarkDetail(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const createcollect = (ctx, opts) => {
  return api.createcollect(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const getAllcollect = (ctx, opts) => {
  return api.getAllcollect(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const Iscollect = (ctx, opts) => {
  return api.Iscollect(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const CollectCancle = (ctx, opts) => {
  return api.CollectCancle(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const createLink = (ctx, opts) => {
  return api.createlink(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const getAlllink = (ctx, opts) => {
  return api.getAlllink(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const getlinkDetail = (ctx, opts) => {
  return api.getLinkDetail(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const editLinkDetail = (ctx, opts) => {
  return api.editLinkDetail(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
export const delLink = (ctx, opts) => {
  return api.delLink(opts).then(function (res) {
    if (res.body.statuscode === SUCCESS_CODE) {
      return Promise.resolve(res.body)
    } else {
      return Promise.reject(res.body)
    }
  })
}
