function getUpImgUrl(){
	return "http://api.easyapp.zhiheworld.com/file/upload"   // 上传图片路径
}
function getUpMp3Url(){
  return "http://upload-z1.qiniup.com"   // 上传图片路径
}
function getOutMp3Url(){
  return "http://p77mtxljd.bkt.clouddn.com"   // 七牛外链域名
}
function getToken(){
	return sessionStorage.getItem('access-token')    // 获取token
}
function getAppID(){
	return "7085b04d8a79c6a9"    // appID
}
function getDomainType(){
	return 1                     // domain_type
}
function getUpImgType(){
	return "gravatar"            // 上传图片类型
}
function getModeleId(){
	return 1                     // modele_id
}
function getApiUrl(){
  return "http://api.easyapp.zhiheworld.com"      // 接口地址
}
function isAll(){
  return 1
}
export default {
  upImgUrl: function(){
  	return getUpImgUrl()
  },
  upMp3Url: function(){
    return getUpMp3Url()
  },
  OutMp3Url: function(){
    return getOutMp3Url()
  },
  token: function(){
  	return getToken()
  },
  appID: function(){
  	return getAppID()
  },
  domainType: function(){
  	return getDomainType()
  },
  upImgType: function(){
  	return getUpImgType()
  },
  moduleId: function(){
  	return getModeleId()
  },
  apiUrl: function(){
    return getApiUrl()
  },
  isAll: function(){
    return isAll()
  }
}