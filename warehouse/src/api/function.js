// import qn from 'qiniu'

// function getQiniuUploadToken(){
//   var accessKey = 'your access key';
//   var secretKey = 'your secret key';
//   var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
//   console.log(mac)
// }
// 时间戳转换成时间格式
function formatDates(ns) {  
	var date = new Date(ns*1000);  
    var y = date.getFullYear();    
    var m = date.getMonth() + 1;    
    m = m < 10 ? ('0' + m) : m;    
    var d = date.getDate();    
    d = d < 10 ? ('0' + d) : d;    
    var h = date.getHours();  
    h = h < 10 ? ('0' + h) : h;  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    minute = minute < 10 ? ('0' + minute) : minute;    
    second = second < 10 ? ('0' + second) : second;   
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
}
// 格式化数据类型
function selectFormat(obj){
	var res = [];
	for(var item in obj){
		res[item] = {"label":obj[item].name,"value":obj[item].uid}
 	}
	return res;
}
// 转换成key=id，value=内容格式
function idToNameFormat(obj){
	var res = {};
	for(var item in obj){
		res[obj[item].uid] = obj[item].name
 	}
	return res;
}

export default {
  formatDate: function(times){
    return formatDates(times)
  },
  selFormat: function(obj){
  	return selectFormat(obj)
  },
  idToNameFormat: function(obj){
  	return idToNameFormat(obj)
  }
}