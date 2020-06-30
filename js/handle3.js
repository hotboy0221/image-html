$("#image1").on('change',function(e){
    var file = $("#image1").prop('files')[0];
    if (file) {
        $(".express").css("display","none");
         $("#show3").css("display","block");
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (even) {
            $('#pre3').attr("src", even.currentTarget.result);
        }
    }
    $("#match3").empty();
})

$("#search1").on('click',function(e){
    if($("#image1").prop('files')[0]==undefined){
        alert("请选择图片");
        return;
    }
    
    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
    formData.append("image",$("#image1").prop('files')[0]);
		$.ajax({
			type : "post",
			url : myhost+"/imagehandle/dothird",
            data : formData,
            processData: false,
            contentType: false,
			success : function(result){
               if(result.data.length==0){
                   $("#show3").append("<p style='color:red'>未匹配到图片</p>");
                   return ;
               }
                result.data.forEach(function(e){
                    var str="<p style='color: red;'>图片文件："+e.name+"</p>";
                     str+="<img class='moveup' style='position: absolute;top: 0;width: 300px;  display:block; margin-left: 300px;margin-bottom: 50px' src='data:image/jpeg;base64,"+e.bytecode+"'>"
					$("#show3").append(str);
                })
            },
            error:function(result){
                console.log(result);
            }
		});
})
