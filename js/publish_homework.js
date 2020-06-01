function publish_homework() {
    let course_id = UrlParam.paramValues('cid');
    course_id = course_id[0];
    let form = new FormData( document.getElementById("task"));
    let start_time = form.get("start_time");
    let end_time = form.get("end_time");
    start_time = new Date(start_time);
    start_time = start_time.valueOf(start_time);
    end_time = new Date(end_time);
    end_time = end_time.valueOf(end_time);
    start_time /= 1000;
    end_time /= 1000;
    let task = form.get("task");
    let taskArr = [];
    taskArr.push(task);
    console.log(task);
    console.log(taskArr);
    let token = localStorage.getItem("token");
    let account = localStorage.getItem("account");
    let url = 'proxy/publish_homework.php';
    let data = {account:account, token:token, course_id:course_id,task:taskArr, start_time:start_time,finish_time:end_time};
    let res = http_request(url,data);
    if (res) {
        if (res.code === 200) {
            alert("发布成功");
            location.replace("publish_homework.html?cid="+course_id.toString());
        } else if (res.code === 500) {
            restart();
        } else {
            alert(res.message);
        }
    }

}