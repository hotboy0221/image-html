$("#image").on('change',function(e){
    var file = $("#image").prop('files')[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (even) {
            $('#pre').attr("src", even.currentTarget.result);
        }
    }
})
$("#search").on('click',function(e){
    console.log($("#image").prop('files')[0])
    if($("#image").prop('files')[0]==undefined){
        alert("请选择图片");
        return;
    }
    $("#result").empty();
    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
    formData.append("image",$("#image").prop('files')[0]);
		$.ajax({
			type : "post",
			url : myhost+"/imagehandle/dothird",
            data : formData,
            processData: false,
            contentType: false,
			success : function(result){
                console.log(result.data);
               if(result.data.length==0){
                   $("#result").append("<p style='color:red'>未匹配到图片</p>");
                   return ;
               }
                result.data.forEach(function(e){
                    console.log(e.name);
                    var str="<div style='width: 500px;'>";
                    str+="<p style='color: red;'>图片文件："+e.name+"</p>";
                    str+="<img style='width: 500px;'src='data:image/jpeg;base64,"+e.bytecode+"' ></div>";
                    $("#result").append(str);
                })
            },
            error:function(result){
                console.log(result);
            }
		});
})