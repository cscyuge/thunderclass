function create_course_div(course){
    console.log(course);
    course_id = course.course_id;
    let html = "";
    let temp = "<div>";
    html+=temp;
    html += "课程名："+course.title+"<br>";
    let button = "<button onclick=\"goToClass(\'course_id\')\">"+"开始上课"+"</button>";
    button=button.replace(/course_id/,course_id);
    html += button;
    html += "<br><br><br>";

    button = "<button onclick=\"publish_homework(\'course_id\')\">"+"发布作业"+"</button>";
    button=button.replace(/course_id/,course_id);
    html += button;
    html += "<br><br><br>";

    button = "<button onclick=\"goToHomework(\'course_id\')\">"+"查看作业"+"</button>";
    button=button.replace(/course_id/,course_id);
    html += button;
    html += "<br><br><br>";


    html += "<br><br>";
    html += "</div>";
    return html;
}

function show_course(){
    let course_id = UrlParam.paramValues('cid');
    course_id = course_id[0];
    let title = UrlParam.paramValues('title');
    title = title[0];
    let course = {};
    course.title = title;
    course.course_id = course_id;
    console.log(course);
    let liObj = document.createElement("li");
    liObj.innerHTML = create_course_div(course);
    let ulObj = document.createElement("ul");
    ulObj.appendChild(liObj);

    $("#course").append(ulObj);
}

function goToClass(course_id){
    let account = localStorage.getItem('account');
    let token = localStorage.getItem('token');
    let data = {account: account, token: token, course_id: course_id};
    let url = 'proxy/get_room_url.php';
    let res = http_request(url, data);
    if (!res) {
        return;
    }
    let code = res.code;
    if (code === 200) {
        url = res.data;
        window.open(url, "_blank", "scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes");
    } else if (code === 500) {
        restart();
    } else {
        alert(res.message);
    }
}

function publish_homework(course_id) {
    window.location.href = "publish_homework.html?cid="+course_id;

}

function goToHomework(course_id) {
    window.location.href = "homework.html?cid="+course_id;
}