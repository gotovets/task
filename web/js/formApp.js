var formApp={
	 flags:{ stepReady:false, currentStep:"person" },
	 construct:function() {
		  		var buttons=document.getElementsByTagName("BUTTON");

				 for(var i=0;i<buttons.length;i++) { buttons[i].addEventListener("click", formApp.validator); }
		 				  },//-construct-
	 validator:function() {
		 		var isBack=this.className=="back"?true:false;
				 if(isBack) { formApp.stepSwitcher({ butt:this }); return; }
		 		
		 		var step=formApp.parentElement({ element:this, className:"step" });
				var fields=formApp.childElement({ element:step, tagName:step.id=='comment'?'TEXTAREA':'INPUT' });
				var emptyList=[], noValidList=[];
				 formApp.flags.stepReady=false;
				
				var test=function(elm) {
						  var tilte=formApp.nearestElement({ startElement:elm, className:"fieldTitle" });
						  var valid=formApp.fieldValidation({ mode:elm.getAttribute("name"), value:elm.value });
						  
						   if(elm.value.trim()=='') { elm.setAttribute("data-err", "true"); emptyList.push(tilte.innerHTML); }
						   if(!(valid)) { elm.setAttribute("data-err", "true"); noValidList.push(tilte.innerHTML); }
						   
									   };
		 
				 for(var i in fields) { 
				  test(fields[i]); 
				   fields[i].onkeyup=function() { this.removeAttribute("data-err"); };
				  					  }
				 
				  if(emptyList.length>0) { alert("Пожалуйста заполните поле(я): "+emptyList.join(', ')); return; }
				  if(noValidList.length>0) { alert("Пожалуйста исправьте поле(я): "+noValidList.join(', ')); return; }

				   formApp.flags.stepReady=true;
				   
				   formApp.stepSwitcher({ butt:this });
				   
		 				  },//-validator-
	 stepSwitcher:function(param) {
					var hideSteps=function() {
								   var steps=document.getElementsByClassName("step");
								    for(var i=0;i<steps.length;i++) { steps[i].removeAttribute("data-show"); }
											 };
					var getPrevNext=function() { 
									 var current=document.getElementById(formApp.flags.currentStep);
									 var steps=document.getElementsByClassName("step");
									 var num=0;
									  for(var i=0;i<steps.length;i++) { if(steps[i]==current) { num=i; } }
   
									   return { prev:steps[num-1]?steps[num-1]:false, next:steps[num+1]?steps[num+1]:false, curr:steps[num], currNum:num };									
											   };
					var showStep=function(step) {
								  step.setAttribute("data-show", "true");
												};	
												
					var isBack=param.butt.className=="back"?true:false;
					var isConfirm=param.butt.id=="confirm"?true:false;

					var prevNext=getPrevNext();
					
					var noPhone=function() {
								 if(!(formApp.flags.stepReady) && !(isBack)) { showStep(prevNext.curr); formApp.flags.currentStep=prevNext.curr.id; return; }
								 
								 if(!(isConfirm)) { hideSteps(); }
								 
								 if(isBack) { showStep(prevNext.prev); formApp.flags.currentStep=prevNext.prev.id; return; }
								 
								 if(prevNext.next) { 
								  formApp.flags.currentStep=prevNext.next.id; 
								   showStep(prevNext.next); 
								    formApp.prepare({ step:prevNext.currNum+1 }); 
												   }
													 
								 if(isConfirm) { formApp.prepare({ step:prevNext.currNum+1 }); }
										   };
					var havePhone=function() { alert("Номер телефона уже зарегистрирован."); };

					 formApp.getPhone({ noPhone:noPhone, havePhone:havePhone });
		 					 	 },//-stepSwitcher-	
	
	 prepare:function(param) {		 	  
			  var pkey=formApp.getCookie("pkey");			  
		 	  var values={ fname:document.getElementsByName("fname")[0].value,
			  	  		   lname:document.getElementsByName("lname")[0].value,
				  		   phone:document.getElementsByName("phone")[0].value,
						   str:document.getElementsByName("str")[0].value,
						   build:document.getElementsByName("build")[0].value,
						   city:document.getElementsByName("city")[0].value,
						   comment:document.getElementsByName("comment")[0].value };
						   
			  var onSuccess=function(answer) {			  
				  			 formApp.setCookie("pkey", answer.pkey, { expires:param.step<3?3600*24*31:-1 });							 
			  				  if(param.step==3) { window.location.href='/regresult?key='+answer.pkey; }
			  								 };
			  
			   formApp.query({ url:"/form/putdata", data:{ step:param.step, pkey:pkey?pkey:null, values:values }, onSuccess:onSuccess });
			   
		 					 },//-prepare-
	 getPhone:function(param) {
		 	   var phone=document.getElementsByName("phone")[0].value;
			   var onSuccess=function(answer) { answer.phone=='exist'?param.havePhone():param.noPhone(); };

			    formApp.query({ url:"/form/getphone", data:{ phone:phone }, onSuccess:onSuccess });
			   
		 				 	  },//-getPhone-
	 query:function(param) {
		 	var getXMLObject=function() {
							  if (window.XMLHttpRequest) { var http_request=new XMLHttpRequest(); } 
							  else {
							   if(window.ActiveXObject) { 
								try { var http_request=new ActiveXObject("Msxml2.XMLHTTP"); } 
								catch(e) { 
								 try { var http_request=new ActiveXObject("Microsoft.XMLHTTP"); } 
								 catch(e) { return false; }
										 } 
													 } 
							   else { return false; } 
								   }
						  return http_request;
										};
			var http=getXMLObject();				
			var objectToUrlComponents=function(param) {
		   							   var str=[];
  							 			for(var p in param.obj) {
    						  			 if(param.obj.hasOwnProperty(p)) {
      						   			  var k=param.prefix?param.prefix+"["+p+"]":p;
							   			  var v=param.obj[p];
      									   str.push(typeof v=="object"?objectToUrlComponents({ obj:v, prefix:k }):encodeURIComponent(k)+"="+encodeURIComponent(v));
    														  			 }
  										  	   		 			}
  										return str.join("&"); 
		 								    		   };		 
			var readystatechange=function() {
								  if(http.readyState==4 && http.status>=200 && http.status<400) {
							 	   try { 
								    var obj=JSON.parse(http.responseText); 
									 if(typeof(param.onSuccess)=="function") { param.onSuccess(obj); }
									   }
							  	   catch(err) { console.log(http.responseText); return; }									
									  															}
							  				};	
											  
			var data=typeof(param.data=="object")?objectToUrlComponents({ obj:param.data }):param.data;
				 
		 	 http.open("POST", param.url, true);
	 		 http.onerror=function(err) { console.log(err); }
  	 		 http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			 http.onreadystatechange=readystatechange;
			 
  			 http.send(data);
		 					   },//-query-							   
	 childElement:function(param) {
		 		   var list=new Array();
		 		    function recurs(elements) {
					 for(var i=0;i<elements.length;i++) {
					  if(elements[i].childNodes && param.recurs!=false) { recurs(elements[i].childNodes); }
					 
					   if(elements[i].tagName=="IFRAME") { 
					    var src=elements[i].src;
					        src=src.replace(/^https:\/\//,"");
						    src=src.replace(/^http:\/\//,"");
					    var domain=src.replace(/\/.*/,"").split(".");					   
					     if(domain.length==0 || domain[0]) {
						  domain=domain[domain.length-2]+"."+domain[domain.length-1];						 
						   if(domain==main.mainDomain()) { recurs(main.iframeDoc({ element:elements[i] }).getElementsByTagName("html")[0].childNodes); }
								   	  					   }
					   									  }
														
					   if(param.id && param.id==elements[i].id) { list=elements[i]; return; }								
 					   if(param.tagName && param.tagName=="*" && elements[i].tagName) { list.push(elements[i]); continue; }	 
					   if(param.tagName && param.tagName==elements[i].tagName) { list.push(elements[i]); }
					   if(param.className && param.className==elements[i].className) { list.push(elements[i]); }					   
													    }					   
					   					 	  };
						recurs(param.element.childNodes);					 
				   return list;
		 						   },//-childElement-
	 parentElement:function(param) {
		 			var parent=false;
		 			 function recurs(element) {
					  if(param.className && param.className==element.className) { parent=element; return; }
					  if(param.id && param.id==element.id) { parent=element; return; }
					  if(param.tagName && param.tagName==element.tagName) { parent=element; return; }
					  if(element.parentNode) { recurs(element.parentNode); }
									  		  }
					 recurs(param.element.parentNode);
					 
					return parent;
		 						   },//-parentElement-
	 nearestElement:function(param) {
		 		     var element=param.startElement;//.parentNode;
				     var searchItem=false;
				   
				     var recurs=function(element) {
					   		     if(!(element.children)) { return; }
					   		      for(var i=0;i<element.children.length;i++) { 
								  
							       if(param.className && element.children[i].className==param.className) { 
								    if(searchItem===false) { searchItem=element.children[i]; } 
																										 }//-найдено!-
								   if(param.tagName && element.children[i].tagName==param.tagName) { 
								    if(searchItem===false) { searchItem=element.children[i]; } 
																								   }//-найдено!-
							   
							       var recurs2=function(element) {								
											    for(var j=0;j<element.children.length;j++) {
											     if(element.children[j]) { recurs2(element.children[j]); }
												 
											      if(param.className && element.children[j].className==param.className) {											  
											       if(searchItem===false) { searchItem=element.children[j]; }											   
											   													     					}//-найдено!-
											      if(param.tagName && element.children[j].tagName==param.tagName) {											  
											       if(searchItem===false) { searchItem=element.children[j]; }											   
											   													     			  }//-найдено!-								 
												 										   }								
													   		      };//-recurs2-
								     recurs2(element.children[i]);						
																		  	}							   
							   	if(element.parentNode) { recurs(element.parentNode); }
					   							 }
												
				    recurs(element);
					
					 return searchItem;
		 					 	   },//-nearestElement-	
	 fieldValidation:function(param) {
		 			 var re=false;
		 			 switch(param.mode) {
					  case "fname":
					  case "lname":
					  var re=new RegExp('[A-Za-zА-Яа-яЁёІіЇїЄє]+');
					  break;
					   					  
					  case "phone": 
					   var re=new RegExp('[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}', 'im'); 
					  break;
					  
					  case "str":
					  case "city":
					   var re=new RegExp('[A-Za-zА-Яа-яЁёІіЇїЄє0-9]+'); 
					  break;
					  
					  case "build": 
					   var re=new RegExp('[0-9\\\/]+[a-zа-я]{0,1}', 'i'); 
					  break;
					  
					  case "comment": 
					   var re=new RegExp('.*'); 
					  break;
						 	  			}
										
					 if(re===false || typeof(param.value)=="undefined") { return false; }
					 if(re.test(param.value)) { return true; }
					  return false;			
		 					   		  },//-fieldValidation-
	 setCookie:function(name, value, options) {
  				   options=options || {};
  					var expires=options.expires;
  					 if (typeof expires=="number" && expires) {    
					  var d=new Date();
    				   d.setTime(d.getTime() + expires*1000);
    					expires=options.expires=d;
 															  }
 					  if(expires && expires.toUTCString) { 
  					   options.expires=expires.toUTCString();
  														 }
  						value=encodeURIComponent(value);
  						 var updatedCookie=name+"="+value;
  						  for(var propName in options) {
    					   updatedCookie+="; "+propName;
    						var propValue = options[propName];    
    						 if (propValue !== true) { 
      						  updatedCookie+="="+propValue;
     												 }
 													   }
  							   document.cookie = updatedCookie;
											  },//-setCookie-
	 getCookie:function(name) {
  				   var matches=document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  					return matches ? decodeURIComponent(matches[1]) : undefined;
							  },//-getCookie-
			}; 