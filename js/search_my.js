function search_my(){
    var param = new FormData(document.getElementById("sea"));
    var keyword = param.get('keyword');
    var account = localStorage.getItem('account');
    console.log(keyword);
    $.ajax(
        {
            url:'proxy/search_my_courses.php',
            async: false,
            type: 'POST',
            dataType: 'json',
            data:{account:account,field:keyword},
            success : function(obj,textstatus){
                console.log(obj.data);
                localStorage.setItem("my_courses_keyword",keyword);
                var data = obj.data;
                var data_string = "";
                for (var i=0, n = data.length; i< n ;i++){
                    if (i !== 0 ){
                        data_string+="LIST_SPLIT_FLAG";
                    }
                    data_string += data[i].toString();
                }
                localStorage.setItem("my_courses_list",data_string);
                document.location.reload(true);
            },
            error : function(xhr){
                console.log(xhr.responseText);
            }
        }
    )
}

