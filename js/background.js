chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        const q = request.par.replace('\n', '')
        const from = 'en'
        const to = 'zh'
        const translateurl = 'https://fanyi-api.baidu.com/api/trans/vip/translate'
        const appid = 'xxxx'
        const appkey = 'xxxx'
        const salt = (new Date).getTime()
        const sign = md5(appid + q + salt + appkey)
        const url = `${translateurl}?q=${q}&from=${from}&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`

        fetch(url, {headers: {'content-type': 'application/json'}})
            .then(res => res.json())
            .then(data => sendResponse(data.trans_result[0].dst))
            .catch(e => {
                console.log(e.error_msg || e)
                sendResponse('')
            })
        return true
    }
)


