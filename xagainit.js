(function(){if(!window.XA){XA={_url:"http://xa.xingcloud.com/v4/",_actions:[],_updates:[],_sending:false,init:function(option){if(!option.app){throw new Error("App is required.")}XA._app=option.app;XA._uid=option.uid||"random"},setUid:function(uid){XA._uid=uid},action:function(){for(var i=0,l=arguments.length;i<l;i++){XA._actions.push(arguments[i])}XA._asyncSend()},update:function(){for(var i=0,l=arguments.length;i<l;i++){XA._updates.push(arguments[i])}XA._asyncSend()},_asyncSend:function(){setTimeout(function(){var rest=XA._url+XA._app+"/"+XA._uid+"?",item=null,strItem="",index=0,length=XA._updates.length+XA._actions.length;if(length==0||XA._sending){return}XA._sending=true;while(item=XA._updates.shift()){strItem="update"+index+++"="+encodeURIComponent(item)+"&";if(rest.length+strItem.length>=1980){XA._updates.unshift(item);break}else{rest=rest+strItem}}index=0;while(item=XA._actions.shift()){strItem="action"+index+++"="+encodeURIComponent(item)+"&";if(rest.length+strItem.length>=1980){XA._actions.unshift(item);break}else{rest=rest+strItem}}(new Image()).src=rest+"_ts="+new Date().getTime();if(XA._updates.length+XA._actions.length>0){XA._asyncSend()}XA._sending=false},0)}}}})();
/*var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-46199151-1"]);
_gaq.push(["_trackPageview"]);
(function() {
	var ga = document.createElement("script");
	ga.type = "text/javascript";
	ga.async = true;
	ga.src = "js/ga.js";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(ga, s)
})();*/
(function() {
	if(!localStorage.uid){
		if (localStorage.UID) {
			localStorage.uid=localStorage.UID;
		} else {
			localStorage.uid=Date.parse(new Date()) + "." + parseInt(Math.random() * 1000);
		}		
		localStorage.TABts=Date.parse(new Date()) + "." + parseInt(Math.random() * 1000);		
		return;
	}	
	if (!XA) {
		return
	}
	var appid = "yac-adless";
	$(document).ready(function() {
		XA.init({
			app: appid,
			uid: localStorage.uid
		});		
		XA.action("visit.main");		
		XA.update("version," + chrome.app.getDetails().version);
		if (chrome.management.get) {
			chrome.management.get(chrome.app.getDetails().id, function(data) {
				XA.update("ref0," + data.installType)
			})
		}
		if (localStorage["PTID"]) {
			XA.update("ref1," + localStorage["PTID"]);
		}
		if (localStorage.browser) {
			XA.update("platform," + localStorage.browser);
		}				
		XA.update();
	})
})();

function postPoint(obj){
	var gatag = obj.gatag;
	var xatag = obj.xatag;
	value = obj.value || 0;
	if (gatag && typeof gatag == "object") {
		_gaq.push(["_trackEvent", gatag[0], gatag[1], gatag[2], value])
	}
	if (xatag && typeof xatag == "object") {
		var tagsTring = xatag.join(".");
		window.XA && XA.action("pay." + tagsTring + "," + value)
	}
};
