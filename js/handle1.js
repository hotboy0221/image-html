


var currentPage=1;

//dom载入后执行
// $(document).ready(function(){
//    getData();
//    document.getElementById('show2').style="opacity: 0";
//    document.getElementById('show3').style="opacity: 0";
//    document.getElementById('show4').style="opacity: 0";
//    document.getElementById('show1').style="opacity: 1";
// })

//button点击执行
$("#getAll").on('click',function(e){
    $(".express").css("display","none");
    $("#show1").css("display","block");
    getData();
})

function getData(){
    $.ajax({
        type:"GET",
        dataType:"json",
        data:{
            page:currentPage
        },
        url:myhost+"/imagehandle/dofirst",
        success:function(result){
            //开始填充html页面
            if(result.data.lenght==0)return;
            
            result.data.forEach(function(e){
				//修改好了的
				var str="";
				str+="<div id='"+e.name+"' style='float: left; width: 70%; height: 400px;'></div>",
				str+="<div style='float: left; width: 20%; height: 400px;'>"
				str+="<p style='display: block; text-align: center; margin-top: 40px;'>图片文件："+e.name+"</p>"
				str+="<img style='display: block; margin: 0 auto; width: 200px; height: 200px; margin: 0 auto;' src='data:image/jpeg;base64,"+e.bytecode+"'></div>"
			
                $("#show1").append(str);
                paint(e.name,e.statistic);
            })
            
            console.log(result)
        },
        error:function(result){
            console.log(result)
        },

    })
}
//滚动加载
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();
    if ($("#show1").css("display")!="none"&&scrollTop + windowHeight === scrollHeight) { //判断滑动到底部了
        currentPage+=1;
        getData();
    }
    
})
//画直方图
function paint(id,statistic){
     // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(id));
    // 指定图表的配置项和数据
    var option = {
        color:[
            '#3fbff1'
        ],
        xAxis: {
            type: 'category',
            data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255]
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: statistic,
            type: 'bar',
            barCategoryGap: "0%",
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
            }
        }],
        tooltip:{
            trigger:'axis',
            formatter:function(params){
                return params[0].data+"个<span style='color:yellow'>"+params[0].name+"</span>像素值"
            }
        }
    };
     // 使用刚指定的配置项和数据显示图表。
     myChart.setOption(option);
}