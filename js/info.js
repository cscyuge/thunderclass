function saveInfo(){
    let form = new FormData( document.getElementById("info"));
    let username = form.get("username");
    let sex = form.get('sex');
    let condition = form.get("condition");
    let mail = form.get("mail");
    let tel = form.get("tel");
    let role = form.get("role");
    let token = localStorage.getItem("token");
    let account = localStorage.getItem("account");
    let info = { username:username, sex: sex, tel: tel, condition:condition, mail:mail, blog:"", role:role, extra:"{}"};
    let url = 'proxy/set_user_info.php';
    let data = {account:account, token:token, info:info};
    let res = http_request(url,data);
    if (res) {
        if (res.code === 200) {
            alert("修改成功");
            location.replace("info.html");
        } else if (res.code === 500) {
            restart();
        } else {
            alert(res.message);
        }
    }
}

function show_info(){
    let token = localStorage.getItem("token");
    let account = localStorage.getItem("account");
    let url = 'proxy/get_user_info.php';
    let data = {account:account, token:token};
    let res = http_request(url,data);
    if (res.code === 200){
        let obj = res.data;
        obj = $.parseJSON(obj);
        let username = obj.username;
        let sex = obj.sex;
        let tel = obj.tel;
        let condition = obj.condition;
        let mail = obj.mail;
        let role = obj.role;
        // let extra = obj.extra;
        // let blog = obj.blog;

        $('#username').attr("value",username);
        if (sex === 0){
            $('#female').attr("checked","");
        }else if (sex === 1){
            $('#male').attr("checked","");
        }else{
            $('#unknown').attr("checked","");
        }
        $('#mail').attr("value",mail);
        $('#tel').attr("value",tel);
        $('#condition').val(condition);
        $('#role').val(role);
    }else if (res.code === 500){
        restart();
    }else{
        alert(res.message);
    }
}
