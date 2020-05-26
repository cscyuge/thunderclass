function get_time(){
    let date=new Date();
    let h=date.getHours();//获取当前时间
    if(h>=0&& h<12){
        $('#time').text("大佬，早上好！");
    }else if(h>=12 && h<18){
        $('#time').text("大佬，下午好！");
    }else if(h>=18 && h<=24){
        $('#time').text("大佬 晚上好！");
    }
}

function create_course_div(course){
    let course_id = course.course_id;
    let html = "";
    let temp = "<div class='course_div'>";
    html+=temp;
    // var info = JSON.parse(info);
    html += "<p>《"+course.title+"》</p>"+"<br>";
    let button = "<button onclick=\"goToClass(\'course_id\')\">"+"开始上课"+"</button>";
    button=button.replace(/course_id/,course_id);
    html += button;
    html += "<br><br>";
    html += "</div>";
    return html;
}

function create_course_div2(course){
    let html = "";
    let temp = "<div class='course_div'>";
    html+=temp;
    // var info = JSON.parse(info);
    html += "<p>《"+course.title+"》</p>"+"<br>";
    //var button="";
    let button = "<button onclick=\"goToClass(\'course_id\')\">"+"开始上课"+"</button>";
    button=button.replace(/course_id/,course.course_id);
    html += button;
    let div_two="<div class='course_div_two'>";
    html+=div_two;
    let button1 = "<button onclick=\"goToEvaluate(\'course_id\')\">"+"评价课程"+"</button>";//怎么加‘/’
    button1=button1.replace(/course_id/,course.course_id);
    html += button1;
    let button2 = "<button onclick=\"\">"+"联系老师"+"</button>";
    html += button2;
    let button3 = "<button onclick=\"\">"+"查看课程信息"+"</button>";
    html += button3;
    html += "</div>";
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

    let ulObj = document.createElement("ul");
    let ulObj2 = document.createElement("ul");
    for (let i=0, n=courses.length;i<n;i++){
        let course = courses[i], liObj = document.createElement("li"), liObj2 = document.createElement("li"),
            tempHTML2 = create_course_div2(course);
        liObj.innerHTML = create_course_div(course);
        liObj2.innerHTML = tempHTML2;
        ulObj.appendChild(liObj);
        ulObj2.appendChild(liObj2);
    }
    $("#course_list1").append(ulObj2);
    $("#course_list").append(ulObj);
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


function goToEvaluate(course_id){
    var myurl="evaluate.html"+"?"+"cid="+course_id;
    window.location.assign(myurl);
}


function reload(){
    let param = new FormData(document.getElementById("sea"));
    let keyword = param.get('keyword');
    console.log(keyword);
    window.location.href = "my_course.html?wd="+keyword;
}