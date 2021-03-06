function goToInfo(){
    window.location.href = "info.html";
}

function reload(){
    let param = new FormData(document.getElementById("sea"));
    let keyword = param.get('keyword');
    console.log(keyword);
    window.location.href = "user.html?wd="+keyword;
}

function goToClass(course_id){
    let account = localStorage.getItem('account');
    let token = localStorage.getItem('token');
    let url = 'proxy/get_room_url.php';
    let data = {account:account,token:token,course_id:course_id};
    let res = http_request(url,data);
    if (res){
        if (res.code === 200){
            let _url = res.data;
            window.open(_url);
        }else if (res.code===500){
            restart();
        }else{
            alert(res.message);
        }
    }
}

function search_my(keyword){
    let account = localStorage.getItem('account');
    let courses = null;
    let url = 'proxy/search_my_courses.php';
    let data = {account:account,field:keyword};
    let res = http_request(url,data);
    if (res){
        if (res.code === 200){
            let data = res.data;
            let temp_list =[];
            for (let i=0, n = data.length; i< n ;i++){
                let course_id = data[i].course_id;
                let info = JSON.parse(data[i].info);
                info["course_id"]=course_id;
                temp_list.push(info);
            }
            courses = temp_list;
        }else if (res.code===500){
            restart();
        }else{
            alert(res.message);
        }
    }
    return courses;
}

function create_course_div(course){
    let course_id = course.course_id;
    let html = "";
    let temp = "<div>";
    html+=temp;
    html += "课程名："+course.title+"<br>";
    let button = "<button onclick=\"goToClass(\'course_id\')\">"+"开始上课"+"</button>";
    button=button.replace(/course_id/,course_id);
    html += button;
    for (let i = 0;i < 10; i++) {
        html += "&nbsp;";
    }
    let _button = "<button onclick=\"showMore(\'course_id\',\'title\')\">"+"更多"+"</button>";
    _button=_button.replace(/course_id/,course_id);
    _button=_button.replace(/title/,course.title);
    html += _button;

    html += "<br><br>";
    html += "</div>";
    return html;
}

function show_courses(){
    let keyword = UrlParam.paramValues('wd');
    if (keyword == null){
        keyword = ""
    }else {
        keyword = keyword[0]
    }

    let courses = search_my(keyword);
    if (keyword){
        $("#text").attr("placeholder",keyword);
    }

    let ulObj = document.createElement("ul");
    for (let i=0, n=courses.length;i<n;i++){
        let course = courses[i];
        let liObj = document.createElement("li");
        liObj.innerHTML = create_course_div(course);
        ulObj.appendChild(liObj);
    }

    $("#course_list").append(ulObj);
}

function showMore(course_id,title) {
    let url = "course.html?cid="+course_id+"&title="+title;
    window.open(url);
}