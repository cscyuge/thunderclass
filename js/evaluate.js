function evaluate_course(){
    let course_id = UrlParam.paramValues("cid");
    course_id = course_id[0];
    let form = new FormData( document.getElementById("info"));
    let evaluation = form.get("evaluation");
    let grade= form.get("grade");
    let token = localStorage.getItem("token");
    let account = localStorage.getItem("account");
    let data = {account:account, token:token, course_id:course_id, evaluation:evaluation,grade: grade};
    const url = 'proxy/course_evaluate.php';
    let res;
    res = http_request(url, data);
    if (res){
        if (res.code === 200){
            alert("评价成功");
        }else if (res.code === 500){
            restart();
        }else{
            alert(res.message);
        }
    }
}