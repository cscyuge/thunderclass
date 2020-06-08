
function init_car() {
    var num_jia = document.getElementById("num-jia");
    var num_jian = document.getElementById("num-jian");
    var input_num = document.getElementById("input-num");
    var sum_price = document.getElementById('sum_price');

    num_jia.onclick = function() {
        if(input_num.value >= 5) {
            input_num.value = 5;
            sum_price.innerText = 5*150;
        }else {
            input_num.value = parseInt(input_num.value) + 1;
            sum_price.innerText = input_num.value * 150;
        }
        choose_class();
    }

    num_jian.onclick = function() {

        if(input_num.value <= 0) {
            input_num.value = 0;
            sum_price.innerText = 0;
        } else {
            input_num.value = parseInt(input_num.value) - 1;
            sum_price.innerText = input_num.value * 150;
        }
        choose_class();
    }


    let my_course_id = UrlParam.paramValues("cd");
    my_course_id = my_course_id[0];
    var keyword = "1";
    console.log(keyword);
    var account = localStorage.getItem("account");
    var courses = search_public(keyword);
    var ulObj = document.createElement("ul");
    var info = null;
    console.log(courses);
    for (var key in courses) {
        for (var i = 0, n = courses[key].length; i < n; i++) {
            course = courses[key][i];
            console.log(course);
            if (course.course_id == my_course_id) {
                info = JSON.parse(course.info);
            }
        }
    }
    if (info){
        var title = info.title;
        var course_name=document.getElementById('course_name');
        var course_name_all = document.getElementById('course_name_all');
        course_name.innerText = title;
        course_name_all.innerText = title;
    }
}

function choose_class() {
    var sum_price = document.getElementById('sum_price');
    var choose1 = document.getElementById("choose1");
    var choose2 = document.getElementById("choose2");
    var all_price = document.getElementById('all_price');
    var sum = 0;
    if (choose1.checked){
        sum += parseInt(sum_price.innerText);
    }
    if (choose2.checked){
        sum += 750;
    }
    all_price.innerText = sum;

}

function buy() {
    var all_price = document.getElementById('all_price').innerText;
    var sum = parseInt(all_price);
    console.log(all_price);
    // alert(sum);
    if (sum===0 || isNaN(sum)){
        alert("未选择商品");
    }else{
        window.location="search_public.html?wd=";
    }
}