function getId() {
    let navs = document.getElementsByTagName("nav");
    let links = navs[0].getElementsByTagName("a");
    for (let i = 0; i <links.length; i++) {
        //获取导航栏的href值
        let secId = links[i].getAttribute("href").split("#")[1];
        if (!document.getElementById(secId)) continue;
        //设置最初的演示
        document.getElementById(secId).style.display = "none";
        document.getElementById("album").style.display = "block";
        /*这里存在作用域问题，secId是个局部变量，它在getId函数执行期间存在，
        到时间处理函数执行的时候就不存在了，故在这里为每个链接创建了一个自定义的属性destination*/
        links[i].destination = secId;
        links[i].onclick = function() {
            showSection(this.destination);
            changeColor(this.destination);
            return false;
        }
    }
}

/*把相应section的id和用户点击的导航栏href值比较，改变各个section的display属性*/
function showSection(id) {
    let sections = document.getElementsByTagName("section");
    for(let i=0;i<sections.length;i++) {
        if(sections[i].getAttribute("id") !== id) {
            sections[i].style.display = "none";
        }else {
            sections[i].style.display = "block";
        }
    }
}

/*把导航栏href和用户点击href比较，改变相应元素的父元素的className*/
function changeColor(id) {
    let navs = document.getElementsByTagName("nav");
    let links = navs[0].getElementsByTagName("a");
    for (let i = 0; i <links.length; i++) {
        let sectionId = links[i].getAttribute("href").split("#")[1];
        if(sectionId === id){
            links[i].parentNode.className = "special";
        }else {
            links[i].parentNode.className = "";
        }
    }
}

function get_sys_msg(){
    let token = localStorage.getItem("token");
    let account = localStorage.getItem("account");
    let url =  'proxy/get_msg.php';
    let data = {account: account,communicator:"system", token: token};
    let res = http_request(url,data);
    let msg_list = null;
    if (res){
        if (res.code === 200){
            let data = res.data;
            msg_list = data;
            console.log(data);
            localStorage.setItem("msg_list",JSON.stringify(data));
        }else if (res.code === 500){
            restart();
        }else{
            alert(res.message);
        }
    }
    return msg_list;
}

function show_msgs(){
    let msg_list = get_sys_msg();
    let ulObj = document.createElement("ul");
    let ulObj2 = document.createElement("ul");
    for (let i = 0, n = msg_list.length; i < n; i++) {
        let msg = msg_list[i];
        let liObj = document.createElement("li");
        let liObj2 = document.createElement("li");
        let tempHTML,tempHTML2;
        if (msg.sender === "system") {
            tempHTML = create_msg_div(msg);
        }else{
            tempHTML2 = create_msg_div3(msg);
            localStorage.setItem("person_name", msg.sender);
        }
        liObj.innerHTML = tempHTML;
        liObj2.innerHTML = tempHTML2;
        ulObj.appendChild(liObj);
        ulObj2.appendChild(liObj2);
    }
    $("#course_list").append(ulObj);
    $("#course_list2").append(ulObj2);
}

function create_msg_div(msg) {
    let html = "";
    let temp = "<div id = course_id>";
    temp = temp.replace(/course_id/, msg._t);
    html += temp;
    html += "系统发布<br>";
    html += "消息:" + msg.msg + "<br>";
    let t = new Date(msg._t*1000);
    html += "发送时间：" + (t.toLocaleDateString().replace(/\//g, "-") + " " + t.toTimeString().substr(0, 8)) + "<br>";
    // var button = "<button onclick=\"check(\'course_id\')\">"+"check"+"</button>";
    //button=button.replace(/course_id/,course.course_id);
    // html += button;*/
    html += "<br><br>";
    html += "</div>";
    return html;
}


function create_msg_div2(msg) {
    let html = "";
    let temp = "<div id = course_id >";
    temp = temp.replace(/course_id/, msg._t);
    html += temp;
    html += msg.msg + "<br>";
    let t = new Date(msg._t*1000);
    html += (t.toLocaleDateString().replace(/\//g, "-") + " " + t.toTimeString().substr(0, 8)) + "<br>";
    // var button = "<button onclick=\"check(\'course_id\')\">"+"check"+"</button>";
    //button=button.replace(/course_id/,course.course_id);
    // html += button;*/
    html += "<br><br>";
    html += "</div>";
    return html;
}

function create_msg_div3(msg) {
    let html = "";
    let temp = "<div id = course_id >";
    temp = temp.replace(/course_id/, msg._t);
    html += temp;
    html += msg.msg + "<br>";
    let t = new Date(msg._t*1000);
    html += (t.toLocaleDateString().replace(/\//g, "-") + " " + t.toTimeString().substr(0, 8)) + "<br>";
    // var button = "<button onclick=\"check(\'course_id\')\">"+"check"+"</button>";
    //button=button.replace(/course_id/,course.course_id);
    // html += button;*/
    html += "<br><br>";
    html += "</div>";
    return html;
}

function send() {
    let form = new FormData(document.getElementById("dialog"));
    let condition = form.get("condition");
    let token = localStorage.getItem("token");
    let account = localStorage.getItem("account");
    let person = localStorage.getItem("person_name");
    console.log(person);
    console.log(condition);
    let info = {account: account, receiver: person, msg: condition, token: token};
    let data = {info:info};
    let url = 'proxy/pub_msg.php';
    let res = http_request(url,data);
    if (res){
        if (res.code === 200){
            console.log(res);
            alert('发送成功');
        }else if (res.code === 500){
            // restart();
            console.log(res);
            alert('发送失败');
        }else{
            alert(res.message);
        }
    }

}