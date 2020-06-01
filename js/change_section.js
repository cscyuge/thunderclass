/*把相应section的id和用户点击的导航栏href值比较，改变各个section的display属性*/
function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for(var i=0;i<sections.length;i++) {
        if(sections[i].getAttribute("id") != id) {
            sections[i].style.display = "none";
        }else {
            sections[i].style.display = "block";
        }
    }
}
/*把导航栏href和用户点击href比较，改变相应元素的父元素的className*/
function changeColor(id) {
    var navs = document.getElementsByTagName("nav");
    var links = navs[0].getElementsByTagName("a");
    for (var i = 0; i <links.length; i++) {
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if(sectionId == id){
            links[i].parentNode.className = "special";
        }else {
            links[i].parentNode.className = "";
        }
    }
}
function getId() {
    var navs = document.getElementsByTagName("nav");
    var links = navs[0].getElementsByTagName("a");
    for (var i = 0; i <links.length; i++) {
        //获取导航栏的href值
        var secId = links[i].getAttribute("href").split("#")[1];
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
    };
}
function getId2() {
    var navs = document.getElementsByTagName("nav");
    var links = navs[0].getElementsByTagName("a");
    for (var i = 0; i <links.length; i++) {
        //获取导航栏的href值
        var secId = links[i].getAttribute("href").split("#")[1];
        if (!document.getElementById(secId)) continue;
        //设置最初的演示
        document.getElementById(secId).style.display = "none";
        document.getElementById("user1").style.display = "block";
        /*这里存在作用域问题，secId是个局部变量，它在getId函数执行期间存在，
        到时间处理函数执行的时候就不存在了，故在这里为每个链接创建了一个自定义的属性destination*/
        links[i].destination = secId;
        links[i].onclick = function() {
            showSection(this.destination);
            changeColor(this.destination);
            return false;
        }
    };
}