!function () {
  let url_listMsg = `http://iapp.zzuli.edu.cn/portal/app/weiMessage/listMessageIniDtoForCurrentUser`
  let url_clearMsg = `http://iapp.zzuli.edu.cn/portal/app/weiMessage/getMessageIniDtoForCurrentUserByDetailId`
  let listParam = new FormData()
  let xmlhttp_listMsg = new XMLHttpRequest()
  let tasks = 0, templist = 10

  function getMessageIniDtoForCurrentUserByDetailId (messageId, callback) {
    let xmlhttp_clearMsg = new XMLHttpRequest()
    let detailId = new FormData()
    detailId.set('messageDetailId', messageId)
    xmlhttp_clearMsg.open('POST', url_clearMsg, true)
    xmlhttp_clearMsg.onreadystatechange = () => {
      if (xmlhttp_clearMsg.readyState == 4 && xmlhttp_clearMsg.status == 200) {
        tasks++
        console.log(tasks)
        if (tasks == templist) callback()
      }
    }
    xmlhttp_clearMsg.send(detailId)
  }

  new Promise((resolve, reject) => {
    listParam.set('pageSize', 10)
    listParam.set('pageNum', 1)
    xmlhttp_listMsg.open('POST', url_listMsg, true)
    xmlhttp_listMsg.onreadystatechange = () => {
      if (xmlhttp_listMsg.readyState == 4 && xmlhttp_listMsg.status == 200) {
        resolve(JSON.parse(xmlhttp_listMsg.responseText))
      } else if (xmlhttp_listMsg.status >= 400) reject(xmlhttp_listMsg.status)
    }
    xmlhttp_listMsg.send(listParam)
  }).then((res) => {
    if (res.success) {
      if (res.obj.length < 10) {
        templist = res.obj.length
        if (res.obj.length == 0) alert('最后一步，刷新看看是不是消息已经清空？')
      }
      new Promise((resolve, reject) => {
        res.obj.forEach(element => {
          getMessageIniDtoForCurrentUserByDetailId(element.messageId, resolve)
        })
      }).then(() => {
        window.location.reload()
        console.log('refresh')
      })
    }
  }, (code) => {
    console.log('[Request Failed] Status Code: ' + code)
  })
}();