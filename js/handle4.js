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
    var formData = new FormData();//这里需要实例化一个FormData来进行文件上传
	formData.append("image",$("#image").prop('files')[0]);
		$.ajax({
            
			type : "post",
			url : myhost+"/imagehandle/doforth",
            data : formData,
            processData: false,
            contentType: false,
			success : function(result){
                $("#result>p").text("图片文件："+result.data.name);
                $("#result>img").attr("src","data:image/jpeg;base64,"+result.data.bytecode);
            },
            error:function(result){
                console.log(result);
            }
		});
})