$("#image").on('change',function(e){
    var file = $("#image").prop('files')[0];
    if (file) {
		document.getElementById('show1').style="opacity: 0";
		document.getElementById('show3').style="opacity: 0";
		document.getElementById('show4').style="opacity: 0";
		document.getElementById('show2').style="opacity: 1";
		
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (even) {
            $('#pre2').attr("src", even.currentTarget.result);
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
			url : myhost+"/imagehandle/dosecond",
            data : formData,
            processData: false,
            contentType: false,
			success : function(result){
                //先空着
                console.log(result)
            },
            error:function(result){
                console.log(result);
            }
		});
})

//前端样式结果在 show2后面加css
// <div class='express' id='show2' style="opacity: 0;">
// 	<img style="width: 300px;display:block;position: absolute;"src="" id="pre2" >
// 	<p style="display: block; position: absolute; right: 400px;">匹配结果为:</p>
// 	<img style="width: 300px; display:block;position: absolute; right: 50px;"src='pic/光女.jpg'>
// </div>