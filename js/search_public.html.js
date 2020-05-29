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

function check(course_id){
    // alert(course_id);
    let token = localStorage.getItem("token");
    let account = localStorage.getItem("account");
    let url = "proxy/check_course.php";
    let data = {account:account,token:token,course_id:course_id};
    let res = http_request(url,data);
    if (res) {
        if (res.code === 200) {
            alert("选课成功");
            document.location.reload(true);
        } else if (res.code === 500) {
            restart();
        } else {
            alert(res.message);
        }
    }

}
function more(course_id) {
    window.location.href = "all_course.html?cd="+course_id;
}
function reload(){
    let param = new FormData(document.getElementById("sea"));
    let keyword = param.get('keyword');
    console.log(keyword);
    window.location.href = "search_public.html?wd="+keyword;
}

function search_public(keyword){
    let courses=null;
    let url = 'proxy/search_public_courses.php';
    let data = {field:keyword};
    let res = http_request(url,data);
    if (res) {
        if (res.code === 200) {
            courses = res.data;
        } else if (res.code === 500) {
            restart();
        } else {
            alert(res.message);
        }
    }
    return courses;
}

function create_course_div(course){
    let html = "";
    let temp = "<div id = course_id>";
    temp = temp.replace(/course_id/,course.course_id);
    html+=temp;
    if (course.s_account === "undefined"){
        html+="老师发布<br>";
        html+="教师:"+course.t_account+"<br>";
    }else{
        html+="学生发布<br>";
        html+="学生:"+course.s_account+"<br>";
    }
    let info = JSON.parse(course.info);
    html += "课程类别："+course.category+"<br>";
    html += "课程名："+info.title+"<br>";
    html += "状态："+course.status+"<br>";

    let begin = new Date(course.start_time*1000);
    let end = new Date(course.finish_time*1000);
    html += "开始时间："+ (begin.toLocaleDateString().replace(/\//g, "-") + " " + begin.toTimeString().substr(0, 8)) + "<br>";
    html += "结束时间："+ (end.toLocaleDateString().replace(/\//g, "-") + " " + end.toTimeString().substr(0, 8)) + "<br>";
    let button = "<button onclick=\"check(\'course_id\')\">"+"check"+"</button>";
    let button1 = "<button onclick=\"详细信息(\'course_id\')\">"+"more"+"</button>";
    button=button.replace(/course_id/,course.course_id);
    button1=button1.replace(/course_id/,course.course_id);
    html += button;
    html += button1;
    html += "<br><br>";
    html += "</div>";
    return html;
}

function show_courses(){
    // console.log(Date.parse(new Date()));
    // console.log(localStorage.getItem("public_courses_dict"));

    let keyword = UrlParam.paramValues('wd');
    if (keyword == null){
        keyword = ""
    }else {
        keyword = keyword[0]
    }
    console.log(keyword);
    let courses = search_public(keyword);
    let ulObj = document.createElement("ul");
    console.log(courses);
    for (let key in courses){
        for (let i=0, n=courses[key].length;i<n;i++){
            course = courses[key][i];
            console.log(course);
            let liObj = document.createElement("li");
            liObj.innerHTML = create_course_div(course);
            ulObj.appendChild(liObj);
        }
    }
    $("#course_list").append(ulObj);
}

function get_token(){
    let token = localStorage.getItem("token");
    let account = localStorage.getItem("account");
    if (token){
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
    console.log(token);
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