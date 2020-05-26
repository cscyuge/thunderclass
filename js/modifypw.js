function back(){
    window.location.href = 'index.html';
}

function modify() {
    let param = new FormData(document.getElementById("form"));
    let oldpw = param.get('oldpw');
    let account = localStorage.getItem('account');
    let timestamp = (new Date()).valueOf();
    timestamp /= 1000;
    let access_key = null;
    let url = 'proxy/get_access_key.php';
    let data = {account:account, _t:timestamp};
    let res = http_request(url,data);
    if (res){
        if (res.code === 200){
            access_key = res.data.access_key;
            let nonce = Math.ceil(Math.random()*100000000);
            let enc = hex_md5(account + oldpw + access_key + nonce + timestamp);
            url = 'proxy/get_token.php';
            data = {account:account, _t:timestamp, access_key: access_key, nonce: nonce, enc:enc};
            res = http_request(url,data);
            if (res){
                if (res.code === 200){
                    let token = res.data;
                    let newpw = param.get('newpw');
                    let enc_oldpw = str2int(oldpw);
                    let enc_newpw = str2int(newpw);
                    let enc_token = str2int(token);

                    let enc_pw = enc_oldpw.xor(enc_token).xor(enc_newpw).toString();
                    url = 'proxy/modify_password.php';
                    data = {account:account, token:token, enc_password: enc_pw};
                    res = http_request(url,data);
                    if (res) {
                        if (res.code === 200) {
                            alert('修改成功');
                            restart();
                        } else {
                            alert(res.message);
                        }
                    }
                }else{
                    alert("原密码错误!");
                }
            }
        }else{
            alert("认证过于频繁，请稍后再试");
        }
    }

}