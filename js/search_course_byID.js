function search_public(keyword){
    var courses=null;
    console.log("3");
    $.ajax(
        {
            url:'proxy/search_public_courses.php',
            async: false,
            type: 'POST',
            dataType: 'json',
            data:{field:keyword},
            success : function(obj,textstatus){
                console.log(obj.data);
                courses = obj.data;
                //alert("success")
            },
            error : function(xhr){
                console.log(xhr.responseText);
            }

        }
    )
    console.log("4");
    return courses;
}
function teacher_information(t_account){

}
function create_course_div(course){
    html = "";
    temp = "<div id = course_id>";
    temp = temp.replace(/course_id/,course.course_id);
    html+=temp;
    if (course.s_account == "undefined"){
        html+="<img src='images/teacher_image.png'>";
        html+="授课教师:"+course.t_account+"<br>";
        html+=teacher_information(t_account);
    }else{
        html+="学生发布<br>";
        html+="学生:"+course.s_account+"<br>";
    }
    var info = JSON.parse(course.info);
    html += "课程介绍："+info.introduction+"<br><br>";
    html += "课程类别："+course.category+"<br>";
    html += "课程名："+info.title+"<br>";

    var begin = new Date(course.start_time*1000);
    var end = new Date(course.finish_time*1000);
    html += "开始时间："+ (begin.toLocaleDateString().replace(/\//g, "-") + " " + begin.toTimeString().substr(0, 8)) ;
    html += "  结束时间："+ (end.toLocaleDateString().replace(/\//g, "-") + " " + end.toTimeString().substr(0, 8)) + "<br>";
    html += "<br><br>";
    html += "</div>";
    return html;
}

function show_the_course(){
    // console.log(Date.parse(new Date()));
    // console.log(localStorage.getItem("public_courses_dict"));
    if(a==0)
    { let my_course_id = UrlParam.paramValues("cd");
    my_course_id = my_course_id[0];
    var keyword = "1";
    console.log(keyword);
    var account = localStorage.getItem("account");
    var courses = search_public(keyword);
    var ulObj = document.createElement("ul");
    console.log(courses);
    for (var key in courses){
        for (var i=0, n=courses[key].length;i<n;i++){
            course = courses[key][i];
            console.log(course);
            if(course.course_id==my_course_id)
            {var liObj = document.createElement("li");
                tempHTML = create_course_div(course);
                liObj.innerHTML = tempHTML;
                ulObj.appendChild(liObj);}
        }
    }
    $("#the_course").append(ulObj);}
}
