$("#image1").on('change',function(e){
    var file = $("#image1").prop('files')[0];
    if (file) {
		document.getElementById('show2').style="opacity: 0";
		document.getElementById('show1').style="opacity: 0";
		document.getElementById('show4').style="opacity: 0";
		document.getElementById('show3').style="opacity: 1";
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (even) {
            $('#pre3').attr("src", even.currentTarget.result);
        }
    }
})
$("#search1").on('click',function(e){
    console.log($("#image1").prop('files')[0])
    if($("#image1").prop('files')[0]==undefined){
        alert("请选择图片");
        return;
    }
    $("#show3").empty();
    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
    formData.append("image1",$("#image1").prop('files')[0]);
		$.ajax({
			type : "post",
			url : myhost+"/imagehandle/dothird",
            data : formData,
            processData: false,
            contentType: false,
			success : function(result){
                console.log(result.data);
               if(result.data.length==0){
                   $("#show3").append("<p style='color:red'>未匹配到图片</p>");
                   return ;
               }
			   
			   var str="";
			   str="<img style='width: 40px;display:block;position: absolute;'src='' id='pre3' >"
			   str="<p style='display: block; position: absolute; left: 100px;'>匹配结果为:</p>"
			   str="<div id='match3'>"
                result.data.forEach(function(e){
                    console.log(e.name);
                    // var str="<div style='width: 500px;'>";
                    // str+="<p style='color: red;'>图片文件："+e.name+"</p>";
                    // str+="<img style='width: 500px;'src='data:image/jpeg;base64,"+e.bytecode+"' ></div>";                    
                    str="<img class='moveup' style='width: 300px; height: 300px; display:block; float: left; margin-right: 60px;margin-bottom: 50px' src=''>"
					$("#show3").append(str);
                })
				str+="</div>";
				$("#show3").append(str);
            },
            error:function(result){
                console.log(result);
            }
		});
})

//前端样式结果在 show3后面加css
// <div class='express' id='show3' style="opacity: 0;">
// 	<img style="width: 40px;display:block;position: absolute;"src="" id="pre3" >
// 	<p style="display: block; position: absolute;; left: 100px;">匹配结果为:</p>
// 	<div id="match3">
// 		<img class="moveup" style="width: 300px; height: 300px; display:block; float: left; margin-right: 60px;margin-bottom: 50px"src='pic/大圣.jpg'>
// 		<img class="moveup" style="width: 300px; height: 300px; display:block; float: left; margin-right: 60px;margin-bottom: 50px"src='pic/大圣.jpg'>
// 		<img class="moveup" style="width: 300px; height: 300px; display:block; float: left; margin-right: 60px;margin-bottom: 50px"src='pic/大圣.jpg'>
// 		<img class="moveup" style="width: 300px; height: 300px; display:block; float: left; margin-right: 60px;margin-bottom: 50px"src='pic/大圣.jpg'>
// 		<img class="moveup" style="width: 300px; height: 300px; display:block; float: left; margin-right: 60px;margin-bottom: 50px"src='pic/大圣.jpg'>
// 		<img class="moveup" style="width: 300px; height: 300px; display:block; float: left; margin-right: 60px;margin-bottom: 50px"src='pic/大圣.jpg'>
// 		<img class="moveup" style="width: 300px; height: 300px; display:block; float: left; margin-right: 60px;margin-bottom: 50px"src='pic/大圣.jpg'>
// 		<img class="moveup" style="width: 300px; height: 300px; display:block; float: left; margin-right: 60px;margin-bottom: 50px"src='pic/大圣.jpg'>
// 		<img class="moveup" style="width: 300px; height: 300px; display:block; float: left; margin-right: 60px;margin-bottom: 50px"src='pic/大圣.jpg'>
// 		<img class="moveup" style="width: 300px; height: 300px; display:block; float: left; margin-right: 60px;margin-bottom: 50px"src='pic/大圣.jpg'>
// 	</div>
	
// </div>