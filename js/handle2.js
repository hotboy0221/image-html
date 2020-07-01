$("#image").on('change',function(e){
    var file = $("#image").prop('files')[0];
    if (file) {
		$(".express").css("display","none");
         $("#show2").css("display","block");
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (even) {
            $('#pre2').attr("src", even.currentTarget.result);
        }    
        $("#result2").empty();
    }
})
$("#search").on('click',function(e){
    console.log($("#image").prop('files')[0])
    if($("#image").prop('files')[0]==undefined){
        alert("请选择图片");
        return;
    }

    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
	formData.append("image",$("#image").prop('files')[0]);
		$.ajax({
			type : "post",
			url : myhost+"/imagehandle/dosecond",
            data : formData,
            processData: false,
            contentType: false,
			success : function(result){
                if(result.data==null){
                    $("#result2").append("<p style='color:red'>未匹配到图片</p>");
                    return ;
                }
                var str="<p style='color: red;'>图片文件："+result.data.name+"</p>";
                str+="<img class='moveup' style='position: absolute;top: 0;width: 300px;  margin-left: 300px;border: 2px solid red;' src='data:image/jpeg;base64,"+result.data.bytecode+"'>"
               $("#result2").append(str);

            },
            error:function(result){
                console.log(result);
            }
		});
})

