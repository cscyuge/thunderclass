function publish_course() {
    let form = new FormData( document.getElementById("task"));
    let title = form.get("title");
    let start_time = form.get("start_time");
    let end_time = form.get("end_time");
    start_time = new Date(start_time);
    start_time = start_time.valueOf(start_time);
    end_time = new Date(end_time);
    end_time = end_time.valueOf(end_time);
    start_time /= 1000;
    end_time /= 1000;
    let course_num = form.get("course_num");
    let category = form.get("category");
    let introduction=form.get("introduction");
    let info = {title:title,course_num:course_num,introduction:introduction};
    let token = localStorage.getItem("token");
    let account = localStorage.getItem("account");
    let course_info = {info:info,start_time:start_time,finish_time: end_time,category:category};
    let url = 'proxy/publish_course.php';
    let data = {account:account, token:token, course_info:course_info};
    let res = http_request(url,data);
    if (res){
        if (res) {
            if (res.code === 200) {
                alert("发布成功");
                location.replace("publish_course.html");
            } else if (res.code === 500) {
                restart();
            } else {
                alert(res.message);
            }
        }
    }
}
