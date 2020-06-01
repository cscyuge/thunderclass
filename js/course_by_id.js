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

function search_intro(course_id){
    let intro1 = null;
    let url = 'proxy/get_introduction.php';
    let data = {course_id:course_id};
    let res = http_request(url,data);
    console.log("0d");
    console.log(res);
    console.log("1a");
    if (res){
        console.log("2b");
        console.log(res.code);
        if (res.code === 200){
            console.log("2.0b");
            let data = res.data;
            console.log(data);
            intro1=data;
        }else if (res.code===500){
            console.log("3c");
            console.log(res);
            restart();
        }else{
            console.log("4d");
            console.log(res);
            alert(res.message);
        }
    }
    return intro1;
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
    var keyword=null;
    let my_course_id = UrlParam.paramValues("cd");
    my_course_id = my_course_id[0];
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
        var num=0;
        if(course.course_id==my_course_id) {
            num=1;
            let liObj = document.createElement("li");
            liObj.innerHTML = create_course_div(course);
            ulObj.appendChild(liObj);
        }

    }
    if(num==0){
        alert("您未选该课程")
    }
    $("#course_list").append(ulObj);
}

function showMore(course_id,title) {
    let url = "course.html?cid="+course_id+"&title="+title;
    window.open(url);
}

function show_info(){
    let my_course_id = UrlParam.paramValues("cd");
    my_course_id = my_course_id[0];
    console.log(my_course_id);
    let introduction = search_intro(my_course_id);
    let ulObj = document.createElement("ul");
            let liObj = document.createElement("li");
            liObj.innerHTML = create_introduction_div(introduction);
            ulObj.appendChild(liObj);
            $("#course_list").append(ulObj);
}
function create_introduction_div(course_introduction){
    let introduction= course_introduction;
    let html = "";
    let temp = "<div>";
    html+=temp;
    html += "课程介绍："+introduction+"<br>";
    html += "<br><br>";
    html += "</div>";
    return html;
}
