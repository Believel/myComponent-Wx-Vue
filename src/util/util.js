import Vue from 'vue'
import appConfigs from '@/config.js'


let getevent = () => {
    var Event = new Vue()
    return Event
}
const vueEvent = getevent()

const utils = {
    vuethis: {}, //vue的this
    vueEvent: vueEvent,
    //打电话
    realcall(e) {
        window.location.href = 'tel:' + e.name
    },
    //处理空
    handlenull(item) {
        $.each(item, function(key, val) {
            if (val == null) {
                item[key] = ''
            }
        })
    },
    getGeolocation(callback) {
        let lnglat = this.handleCookieGet('lnglat')
        if (lnglat) {
            callback(lnglat, true)
        } else {
            var _this = this
            var currentposition = {}
            //获取当前位置
            var geolocation = new BMap.Geolocation()
            geolocation.getCurrentPosition(
                function(r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        currentposition.lng = r.point.lng
                        currentposition.lat = r.point.lat
                        callback(currentposition, r.accuracy)
                    } else {
                        callback(false)
                    }
                },
                {
                    enableHighAccuracy: true
                }
            )
        }
    },
    getUrlParam(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg) //匹配目标参数
        if (r != null) return r[2]
        return null //返回参数值
    },
    //获取七天日期
    getSevenDate(date, lasttime) {
        var lastarr = lasttime.split(':')
        var lasth = parseInt(lastarr[0])
        var lastm = parseInt(lastarr[1])
        var thirtyagoh = ''
        var thirtyagom = ''
        var _arr = []
        //提前半小时就从明天开始
        if (lastm >= 30) {
            thirtyagoh = lasth
            thirtyagom = lastm - 30
        } else {
            thirtyagoh = lasth - 1
            thirtyagom = lastm + 30
        }
        if (parseInt(date.Format('hh')) > thirtyagoh) {
            date.setDate(date.getDate() + 1)
        }
        if (parseInt(date.Format('hh')) == thirtyagoh) {
            if (parseInt(date.Format('mm')) > thirtyagom) {
                date.setDate(date.getDate() + 1)
            }
        }

        for (var i = 0; i < 7; i++) {
            var date2 = new Date(date)
            date2.setDate(date.getDate() + i)
            var time2 = date2.getMonth() + 1 + '月' + date2.getDate() + '日'
            _arr.push(time2)
        }
        return _arr
    },
    //缓存到cookie
    handleCookieGet(c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + '=')
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                var c_end = document.cookie.indexOf(';', c_start)
                if (c_end == -1) c_end = document.cookie.length
                var result = unescape(document.cookie.substring(c_start, c_end))
                if (result) {
                    return JSON.parse(result)
                } else {
                    return {}
                }
            }
        }
        return ''
    },
    handleCookieSet(c_name, value, expiredays) {
        var value = JSON.stringify(value)
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie =
            c_name +
            '=' +
            escape(value) +
            (expiredays == null ? '' : ';expires=' + exdate.toGMTString()) +
            '; path=/'
    },
    //缓存到本地
    setlocal(name, obj) {
        localStorage.setItem(name, JSON.stringify(obj))
    },
    //获取本地
    getlocal(name) {
        let data = localStorage.getItem(name)
        if (data != null && data != '') {
            try {
                let obj = eval('(' + data + ')')
                return obj
            } catch (e) {
                return ''
            }
        } else {
            return ''
        }
    },
    //禁止默认滚动条滚动，用于弹出窗
    forbidscroll() {
        document.body.style.overflow = 'hidden'
        document.getElementById('physical').style.overflow = 'hidden'
    },
    allscroll() {
        document.body.style.overflow = ''
        document.getElementById('physical').style.overflow = ''
    },
    //提示中间toast
    toastinfo(msg) {
        Vue.$toast({
            message: msg,
            position: 'middle',
            duration: appConfigs.toastime
        })
    },
    //zepto扩展
    scrollTo() {
        $.fn.scrollTo = function(options) {
            var defaults = {
                toT: 0, //滚动目标位置
                durTime: 500, //过渡动画时间
                delay: 30, //定时器时间
                callback: null //回调函数
            }
            var opts = $.extend(defaults, options),
                timer = null,
                _this = this,
                curTop = _this.scrollTop(), //滚动条当前的位置
                subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值
                index = 0,
                dur = Math.round(opts.durTime / opts.delay),
                smoothScroll = function(t) {
                    index++
                    var per = Math.round(subTop / dur)
                    if (index >= dur) {
                        _this.scrollTop(t)
                        window.clearInterval(timer)
                        if (
                            opts.callback &&
                            typeof opts.callback == 'function'
                        ) {
                            opts.callback()
                        }
                        return
                    } else {
                        _this.scrollTop(curTop + index * per)
                    }
                }
            timer = window.setInterval(function() {
                smoothScroll(opts.toT)
            }, opts.delay)
            return _this
        }
    },
    //弹出提示框
    alertip(val) {
        vueEvent.$alert(val, '提示', {
            confirmButtonText: '确定',
            callback: action => {}
        })
    },
    //带取消的两个按钮
    confirmtip(title, info, btntext1, btntext2, suc, cancel) {
        vueEvent
            .$confirm(info, title || '提示', {
                confirmButtonText: btntext1 || '确定',
                cancelButtonText: btntext2 || '取消',
                type: 'warning'
            })
            .then(() => {
                suc && suc()
            })
            .catch(() => {
                cancel && cancel()
            })
    },
    //html片段
    alerthtmltip(
        title,
        htmlstr,
        btntext1,
        btntext2,
        suc,
        cancel,
        style,
        params
    ) {
        if (style == 'red') {
            setTimeout(() => {
                $('.el-message-box__wrapper').addClass('wrapper_redstyle')
            }, 10)
        } else {
            $('.el-message-box__wrapper').removeClass('wrapper_redstyle')
        }
        vueEvent
            .$confirm(htmlstr, title || '提示', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: btntext1 || '确定',
                cancelButtonText: btntext2 || '取消'
            })
            .then(() => {
                suc && suc(params)
            })
            .catch(() => {
                cancel && cancel(params)
            })
    },
    //登录错误提示
    errortip(info) {
        vueEvent.$message.error(info)
    },
    //成功提示
    successtip(info) {
        vueEvent.$message({message: info,type: 'success'});
    },
    //警告提示
    warningtip(info) {
        vueEvent.$message({
            message: info,
            type: 'warning'
        })
    },
    //身份证截取出生日期
    getBirthdayFromIdCard(idCard) {
        idCard = idCard.toString()
        var birthday = ''
        if (idCard != null && idCard != '') {
            if (idCard.length == 15) {
                birthday = '19' + idCard.substr(6, 6)
            } else if (idCard.length == 18) {
                birthday = idCard.substr(6, 8)
            }

            birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
        }
        return birthday
    }
}
export default utils
