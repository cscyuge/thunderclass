function ajaxLogin() {
    let account = localStorage.getItem('account'),
        password = localStorage.getItem('password'), timestamp = (new Date()).valueOf();
    timestamp /= 1000;
    let access_key = null;
    let token = null;
    if (account !== "") {
        if ("" === password) {
            alert("请输入密码!");
            return;
        }
    } else {
        alert("请输入用户名!");
        return;
    }

    let url = 'proxy/get_access_key.php';
    let data = {account:account, _t:timestamp};
    let res = http_request(url,data);
    if (res) {
        if (res.code === 200){
            access_key = res.data.access_key;
            let nonce = Math.ceil(Math.random()*100000000);
            let enc = hex_md5(account + password + access_key + nonce + timestamp);
            url = 'proxy/get_token.php';
            data = {account:account, _t:timestamp, access_key: access_key, nonce: nonce, enc:enc};
            res = http_request(url,data);
            if (res){
                if (res.code === 200){
                    token = res.data;
                    localStorage.setItem("token",token);
                }else{
                    alert("用户名或密码错误!");
                }
            }
        }else{
            alert("用户名错误或登录过于频繁，请稍后再试");
        }
    }

}