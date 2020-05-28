function logout(){
    localStorage.clear();
    location.replace("index.html");
}
function login(){
    window.location.href = "login.html";
}
function user(){
    window.location.href = "user.html";
}
function modifypw(){
    window.location.href = "modifypw.html";
}

function search_public(){
    let param = new FormData(document.getElementById("sea"));
    let keyword = param.get('keyword');
    console.log(keyword);
    window.location.href = "search_public.html?wd="+keyword;
}


function show_user(){
    let token = localStorage.getItem("token");
    let account = localStorage.getItem("account");
    if (token) {
        $("#user").attr("style","display:block;").text(account);
        $("#login").attr("style","display:none;");
        $("#logout").attr("style","display:block;");
        $("#modifypw").attr("style","display:block;");
        $("#my_study").attr("style","display:block;");
        $("#messages").attr("style","display:block;");
        $("#cart").attr("style","display:block;");
        $("#my_info").attr("style","display:block;");
        $("#set").attr("style","display:block;");
    }else{
        $("#user").attr("style","display:none;").text("");
        $("#login").attr("style","display:block;");
        $("#logout").attr("style","display:none;");
        $("#modifypw").attr("style","display:none;");
        $("#my_study").attr("style","display:none;");
        $("#messages").attr("style","display:none;");
        $("#cart").attr("style","display:none;");
        $("#my_info").attr("style","display:none;");
        $("#set").attr("style","display:none;");
    }
}