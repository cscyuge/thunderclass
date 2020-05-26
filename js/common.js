function str2int(str){
    let heist = str2hex(str);
    return bigInt(heist, 16);
}
function str2hex(str) {
    if(str === "")
        return "";
    let hexCharCode = [];
    for(let i = 0; i < str.length; i++) {
    　　hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
}

function dateFormat(fmt, date) {
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        let ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
}

UrlParam = function() { // url参数
    let data, index;
    (function init() {
        data = []; //值，如[["1","2"],["zhangsan"],["lisi"]]
        index = {}; //键:索引，如{a:0,b:1,c:2}
        let u;
        u = window.location.search.substr(1);
        if (u === '') {
            return;
        }
        let params = decodeURIComponent(u).split('&');
        for (let i = 0, len = params.length; i < len; i++) {
            if (params[i] !== '') {
                let p = params[i].split("=");
                if (p.length === 1 || (p.length === 2 && p[1] === '')) {// p | p= | =
                    data.push(['']);
                    index[p[0]] = data.length - 1;
                } else if (typeof (p[0]) == 'undefined' || p[0] === '') { // =c 舍弃
                    //pass
                } else if (typeof (index[p[0]]) == 'undefined') { // c=aaa
                    data.push([p[1]]);
                    index[p[0]] = data.length - 1;
                } else {// c=aaa
                    data[index[p[0]]].push(p[1]);
                }
            }
        }
    })();
    return {
        // 获得参数,类似request.getParameter()
        param : function(o) { // o: 参数名或者参数次序
            try {
                return (typeof(o) == 'number' ? data[o][0] : data[index[o]][0]);
            } catch (e) {
            }
        },
        //获得参数组, 类似request.getParameterValues()
        paramValues : function(o) { // o: 参数名或者参数次序
            try {
                return (typeof(o) == 'number' ? data[o] : data[index[o]]);
            } catch (e) {}
        },
        //是否含有paramName参数
        hasParam : function(paramName) {
            return typeof(paramName) == 'string' ? typeof(index[paramName]) != 'undefined' : false;
        },
        // 获得参数Map ,类似request.getParameterMap()
        paramMap : function() {
            let map = {};
            try {
                for (let p in index) { map[p] = data[index[p]]; }
            } catch (e) {}
            return map;
        }
    }
}();

function http_request(url, data, async=false){
    let res = null;
    $.ajax(
        {
            url:url,
            async: async,
            type: 'POST',
            dataType: 'json',
            data:data,
            success : function(obj){
                res = obj;
            },
            error : function(xhr){
                console.log(xhr.responseText);
            }
        }
    )
    return res;
}

function restart(){
    alert("身份认证过期，请重新登录");
    localStorage.clear();
    window.location.href="index.html";
}
