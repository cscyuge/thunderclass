var friend = new Map();
let sys_msg_list;
var friend1 = new Map();

function test_map(){   //测试map遍历是否成功
    var j=1;
    console.log("?");
    friend1.set(j,"wangjiaqi");
    j++;
    friend1.set(j,"yangyiduo");
    j++;
    friend1.set(j,"tannanle");
    console.log("??");
    var values = friend1.values();
    for (var i = 0; i < friend1.size; i++) {
        console.log("4.22");
        value = values.next().value;
        console.log(value);
    }

}

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


function show_sys_msgs() {
    let b=1;
    let j=1;
     sys_msg_list = get_sys_msg();
    let ulObj = document.createElement("ul");
    console.log("所有消息数量");
    console.log(sys_msg_list.length);
    for (let i = 0, n = sys_msg_list.length; i < n; i++) {
        let msg = sys_msg_list[i];
        let str=msg.sender;
        console.log(str);
        if(!friend.has(j)&&str!=="system")
        { friend.set(j,str);
        console.log(friend.get(j));
            j++;
        }
       if (msg.sender === "system") {
           b++;
           console.log(i);
            let liObj = document.createElement("li");
            liObj.innerHTML = create_msg_div(msg);
            ulObj.appendChild(liObj);
       }
    }
    $("#course_list").append(ulObj);
}
function get_user_msg(){
    let token = localStorage.getItem("token");
    let account = localStorage.getItem("account");
    let url =  'proxy/get_msg.php';
    let data = {account: account,communicator:"system", token: token};
    console.log("111line");
    let res = http_request(url,data);
    let msg_list = null;
    if (res){
        if (res.code === 200){
            let data = res.data;
            msg_list = data;
            console.log("1");
            console.log(data);
            localStorage.setItem("msg_list1",JSON.stringify(data));
        }else if (res.code === 500){
            restart();
        }else{
            alert(res.message);
        }
    }
    return msg_list;
}

function show_user_msgs(){
    let msg_list1 = get_user_msg();
    console.log("4");
    let ulObj1 = document.createElement("ul");
    console.log("4.1");
    var values = friend.values();
    for (var i = 0; i < friend.size; i++) {   //for(key in)遍历不成功
        console.log("4.2");
        value = values.next().value;
        console.log(value);
       // if(!friend.hasOwnProperty(key)) continue;
        let liObj3 = document.createElement("li");//好友列表
        let tempHTML3;
        tempHTML3 = friend_list(value);
        console.log("消息数组的长度");
        console.log(msg_list1.length);
      /*  for(var q=0;q<msg_list1.length;q++) {
            let msg = msg_list1[q];
            let liObj1 = document.createElement("li");
            let tempHTML1;
            if (msg.sender === value) {
                tempHTML1 = create_msg_div(msg);
                localStorage.setItem("person_name", msg.sender);
            }

            console.log("6");
            liObj1.innerHTML = tempHTML1;
            liObj3.innerHTML = tempHTML3;
            ulObj1.appendChild(liObj1);
        }*/
        $("#ulins").append(liObj3);
    }
    //$("#course_list2").append(ulObj1);

}
function create_msg_div(msg) {
    let html = "";
    let temp = "<div id = t>";
    temp = temp.replace(/t/, msg._t);
    html += temp;
    html += msg.sender+"发布<br>";
    html += "消息:" + msg.msg + "<br>";
    let t = new Date(msg._t*1000);
    html += "发送时间：" + (t.toLocaleDateString().replace(/\//g, "-") + " " + t.toTimeString().substr(0, 8)) + "<br>";
    // var button = "<button onclick=\"check(\'course_id\')\">"+"check"+"</button>";
    //button=button.replace(/course_id/,course.course_id);
    // html += button;
    html += "<br><br>";
    html += "</div>";
    return html;
}


function create_msg_div2(msg) {
    console.log("进来了");
    let html = "";
    let temp = "<div id = t >";
    temp = temp.replace(/t/, msg._t);
    html += temp;
    html += msg.msg + "<br>";
    let t = new Date(msg._t*1000);
    html += (t.toLocaleDateString().replace(/\//g, "-") + " " + t.toTimeString().substr(0, 8)) + "<br>";
    // var button = "<button onclick=\"check(\'course_id\')\">"+"check"+"</button>";
    //button=button.replace(/course_id/,course.course_id);
    // html += button;*/
    html += "<br><br>";
    html += "</div>";
    console.log("出来了");
    return html;

}

function show_friend_msg(value){
    let ulObj = document.createElement("ul");
    console.log("系统数组的长度为");
    console.log(sys_msg_list.length);
    for (let i = 0, n = sys_msg_list.length; i < n; i++) {
        let msg = sys_msg_list[i];
        let str=msg.sender;
        if (str === value) {
            let liObj = document.createElement("li");
            liObj.innerHTML = create_msg_div2(msg);
            ulObj.appendChild(liObj);
        }
    }
    $("#course_list2").append(ulObj);
}
function friend_list(value) {
    console.log("77");
    let html = "";
    let temp = "<a>";
    html += temp;
    console.log("77.5");
//<img src="images/portrait.png" class="portrait" onclick="" alt="info">
    let temp1 = "<img src = p class= c onclick = f >"
    temp1 = temp1.replace(/p/,  "images/portrait.png");
    temp1 = temp1.replace(/c/,  "portrait");
    temp1 = temp1.replace(/f/, "show_friend_msg(value)");
    console.log("88");
    html += temp1;
    // var button = "<button onclick=\"check(\'course_id\')\">"+"check"+"</button>";
    //button=button.replace(/course_id/,course.course_id);
    // html += button;*/
    console.log("1010");
    html += "<br><br>";
    html += "</a>";
    return html;
}

function send() {
    let form = new FormData(document.getElementById("dialog1"));
    let condition = form.get("condition1");
    let token = localStorage.getItem("token");
    let account = localStorage.getItem("account");
    let person = localStorage.getItem("person_name1");
    console.log(person);
    console.log(condition);
    let data = {account: account, token: token, receiver: person,msg:condition};

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
    window.location.reload()
}

function send_one() {
    let form = new FormData(document.getElementById("dialog2"));
    let condition = form.get("condition2");
    let token = localStorage.getItem("token");
    let account = localStorage.getItem("account");
    let person_one = localStorage.getItem("person_name");
    console.log(person_one);
    console.log(condition);
    let data = {account: account,token: token,receiver:person_one, msg: condition};
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
    window.location.reload()
}
