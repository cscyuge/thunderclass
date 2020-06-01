function create_homework_div(homework){
    homework = JSON.parse(homework);
    let html = "";
    html += "<div>内容：<br>";
    let task = homework['task'];
    console.log(task);
    for (let i = 0, n = task.length;i<n;i++){
        for (let j = 0;j<4;j++) {
            html += "&nbsp;";
        }
        html+=task[i];
        html+="<br>";
    }
    html += "<div><br>";

    html += "<div>分数：";
    let score = homework['score'];
    html += score.toString();
    html += "<div><br>";


    html += "<div>开始时间：";
    let t = homework['start_time'];
    t = new Date(t*1000);
    t = dateFormat("YYYY-mm-dd HH:MM",t);
    html += t;
    html += "<div><br>";

    html += "<div>结束时间：";
    t = homework['finish_time'];
    t = new Date(t*1000);
    t = dateFormat("YYYY-mm-dd HH:MM",t);
    html += t;
    html += "<div><br>";
    return html;
}

function show_homework(){
    let course_id = UrlParam.paramValues('cid');
    course_id = course_id[0];
    let homeworks = get_homework(course_id);
    console.log(homeworks);
    let liObj;
    liObj = document.createElement("li");
    liObj.innerHTML = create_homework_div(homeworks);
    let ulObj = document.createElement("ul");
    ulObj.appendChild(liObj);

    $("#homework").append(ulObj);
}

function get_homework(course_id){
    let account = localStorage.getItem('account');
    let token = localStorage.getItem('token');
    let homework = null;
    let data = {account:account,token:token,course_id:course_id};
    let url = 'proxy/get_homework.php';
    let res = http_request(url,data);
    if (res) {
        if (res.code === 200) {
            homework = res.data;
        } else if (res.code === 500) {
            restart();
        } else {
            alert(res.message);
        }
    }
    return homework;
}