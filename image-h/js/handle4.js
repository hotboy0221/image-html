$("#image2").on('change',function(e){
    var file = $("#image2").prop('files')[0];
    if (file) {
		document.getElementById('show1').style="opacity: 0";
		document.getElementById('show2').style="opacity: 0";
		document.getElementById('show3').style="opacity: 0";
		document.getElementById('show4').style="opacity: 1";
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
	formData.append("image2",$("#image2").prop('files')[0]);
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

//前端样式结果在 show4后面加css
// <div class='express' id='show4' style="opacity: 0;">
// 	<img style="width: 300px;display:block;position: absolute;"src="" id="pre4" >
// 	<p style="display: block; position: absolute;; left: 500px;">匹配结果为:</p>
// 	<img style="width: 300px; height: 300px; display:block;position: absolute; left: 600px;"src='pic/大圣.jpg'>
// 	<p style="display: block; width: 300px; height: 300px; position: absolute; right: 250px;">篡改像素点坐标：</p>
// 	<p style="display: block; width: 300px; height: 300px; position: absolute; right: 100px;">（125,125）</p>
// </div>