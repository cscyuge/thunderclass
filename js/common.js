document.write("<script src=\"js/BigInteger.min.js\"></script>")

function str2int(str){
    hexstr = str2hex(str);
    res = bigInt(hexstr,16)
    return res;
}

function str2bin(str){
    if(str === "")
        return "";
    var hexCharCode = [];
    for(var i = 0; i < str.length; i++) {
    　　hexCharCode.push((str.charCodeAt(i)).toString(2));
    }
    return hexCharCode.join("");
}

function str2hex(str) {
    if(str === "")
        return "";
    var hexCharCode = [];
    for(var i = 0; i < str.length; i++) {
    　　hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
}

function dateFormat(fmt, date) {
    let ret;
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
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}