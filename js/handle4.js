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
        $("#result4").empty();
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
                    $("#result4").append("<p style='color:red'>未匹配到图片</p>");
                    return ;
                }
        
                     var str="<p style='color: red;'>图片文件："+result.data.name+"</p>";
                      str+="<img class='moveup' style='position: absolute;top: 0;width: 250px;border: 2px solid red; margin-left: 300px' src='data:image/jpeg;base64,"+result.data.bytecode+"'>"
                     str+="<p style='color: red;'>共"+result.data.alterPoints.length+"个篡改点：</p>";
                     result.data.alterPoints.forEach(function(e){
                         str+="("+e.col+","+e.row+")";
                     })
                      $("#result4").append(str);
                
            },
            error:function(result){
                console.log(result);
            }
		});
})

