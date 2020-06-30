$("#image2").on('change',function(e){
    var file = $("#image2").prop('files')[0];
    if (file) {
        $(".express").css("display","none");
         $("#show4").css("display","block");
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (even) {
            $('#pre4').attr("src", even.currentTarget.result);
        }
    }
})
$("#search2").on('click',function(e){
    console.log($("#image2").prop('files')[0])
    if($("#image2").prop('files')[0]==undefined){
        alert("请选择图片");
        return;
    }
    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
	formData.append("image",$("#image2").prop('files')[0]);
		$.ajax({
            
			type : "post",
			url : myhost+"/imagehandle/doforth",
            data : formData,
            processData: false,
            contentType: false,
			success : function(result){
                console.log(result.data);
                if(result.data==null){
                    $("#show3").append("<p style='color:red'>未匹配到图片</p>");
                    return ;
                }
        
                     var str="<p style='color: red;'>图片文件："+result.data.name+"</p>";
                      str+="<img class='moveup' style='position: absolute;top: 0;width: 300px;  display:block; margin-left: 300px;margin-bottom: 50px' src='data:image/jpeg;base64,"+eresult.data.bytecode+"'>"
                     
                      $("#show3").append(str);
                
            },
            error:function(result){
                console.log(result);
            }
		});
})

//前端样式结果在 show4后面加css
// <div class='express' id='show4' style="opacity: 0;">
// 	<img style="width: 300px;display:block;position: absolute;"src="" id="pre4" >
// 	<p style="display: block; position: absolute;; left: 500px;">匹配结果为:</p>
// 	<img style="width: 300px; height: 300px; display:block;position: absolute; left: 600px;"src='pic/大圣.jpg'>
// 	<p style="display: block; width: 300px; height: 300px; position: absolute; right: 250px;">篡改像素点坐标：</p>
// 	<p style="display: block; width: 300px; height: 300px; position: absolute; right: 100px;">（125,125）</p>
// </div>