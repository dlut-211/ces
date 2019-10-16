export default {
    install(Vue, options) {
        Vue.prototype.dateFormat = function (date) {
            var result = String(date);
            if (result == "null") {
                return ""
            } else {
                return result.replace("T", " ").substring(0, 19);
            }
        };
        Vue.prototype.dateFormatFirst = function (date) {
            var result = String(date);
            if (result == "null") {
                return ""
            } else {
                return result.replace("T", " ").substring(0, 10);
            }
        };
        Vue.prototype.dateFormatYM = function (date) {
            var result = String(date);
            if (result == "null") {
                return ""
            } else {
                return result.replace("T", " ").substring(0, 7);
            }
        };
        // 将后台传过来的不标准的时间格式转化成各浏览器通用的时间格式
        Vue.prototype.dateFormatEs6 = function(date){
            let newDate =  date.replace(/T/g,' ').replace(/\-/g,'/');
            // let newDate =  date.replace(/T/g,' ').replace(/\-/g,'/').replace(/.[0-9]{0,}$/,"");
            // console.log(date.replace(/T/g,' '),"第一个")
            // console.log(date.replace(/T/g,' ').replace(/\-/g,'/'),"第二个");
            // console.log(date.replace(/T/g,' ').replace(/\-/g,'/').replace(/.[0-9]{0,}$/,""),"第三个")
            return newDate;
        }
        Vue.prototype.dateFormatYMDHMS = function (date) {
            var result = String(date);
            if (result == "null") {
                return ""
            } else {
                return result.replace("T", " ").substring(0, 19);
            }
        };
        Vue.prototype.strSubString = function (data) {
            var result = String(data)
            if (result == "null") {
                result = "";
            } else {
                if (result.length > 10) {
                    result = data.substring(0, 10) + "……";
                }
                else {
                    result = data;
                }
            }
            return result;
        };
        Vue.prototype.numberFormat = function (value, precision) {
            let numberNum = value;
            let numberStr = String(value);
            // 如果没有小数点
            if (numberStr.indexOf(".") == -1) {
                return value;
            } else {
                if (numberStr.split(".")[1].length >= precision) {
                    let arr = numberStr.split('.');
                    let float = arr[1].substring(0,precision);
                    return parseFloat(arr[0]+'.'+float);
                } else {
                    return value;
                }
            }
        },
        Vue.prototype.paddingValue = function (value) {
            var result = 'px';
            var v = 0;
            for(let i = 1;i < value;i++){
                v = v + 20;
            }
            var result = v + result;
            return result;
        },
        // 终极版本的时间格式化   
        Vue.prototype.dateFormatFinal = function (date) {
            let dates = new Date(date);
            // 月
            let month = ((dates.getMonth() -(-1)).toString()).length>1?dates.getMonth()-(-1):'0'+(dates.getMonth()-(-1).toString());
            // 日
            let day = dates.getDate().toString().length>1?dates.getDate():'0'+dates.getDate();
            // 年
            let year = dates.getFullYear();
            // 时
            let hour = dates.getHours().toString().length>1?dates.getHours():'0'+dates.getHours();
            // 分
            let minute = dates.getMinutes().toString().length>1?dates.getMinutes():'0'+dates.getMinutes();
            // 秒
            let second = dates.getSeconds().toString().length>1?dates.getSeconds():'0'+dates.getSeconds();
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
        };
        Vue.prototype.stringToByte = function (base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');

            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);

            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        };
        Vue.prototype.SectionToChinese = function (section,num) {
            var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
		    var chnUnitSection = ["","万","亿","万亿","亿亿"];
		    var chnUnitChar = ["","十","百","千"]; 
			var strIns = '', chnStr = '';
			var unitPos = 0;
			var zero = true;
			while(section > 0){
				var v = section % 10;
				if(v === 0){
					if(!zero){
						zero = true;
						chnStr = chnNumChar[v] + chnStr;
					}
				}else{
					zero = false;
                    if(unitPos === 1 && num<100 && v === 1){
                        strIns = "";
                    } else{
                        strIns = chnNumChar[v];
                    }
					strIns += chnUnitChar[unitPos];
					chnStr = strIns + chnStr;
				}
				unitPos++;
				section = Math.floor(section / 10);
			}
			return chnStr;
		};
		Vue.prototype.NumberToChinese =  function(num) { 
            var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
		    var chnUnitSection = ["","万","亿","万亿","亿亿"];
		    var chnUnitChar = ["","十","百","千"]; 

			var unitPos = 0;  
			var strIns = '', chnStr = '';  
			var needZero = false;  
			   
			  if(num === 0){  
			    return chnNumChar[0];  
			  }  
			   
			  while(num > 0){  
			    var section = num % 10000;  
			    if(needZero){  
			      chnStr = chnNumChar[0] + chnStr;  
			    }  
			    strIns = this.SectionToChinese(section,num);  
			    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];  
			    chnStr = strIns + chnStr;  
			    needZero = (section < 1000) && (section > 0);  
			    num = Math.floor(num / 10000);  
			    unitPos++;  
			  }  
			  return chnStr;  
		};
    }
}



    // // 数字parser
    // NumberParser: function(value,precision) {
    //   console.log(value,"parser");
    //   let numberStr = value;
    //   if (numberStr.indexOf(".") == -1) {
    //     console.log(value,"parser处理完毕")
    //     return value;
    //   }else{
    //     let arr = numberStr.split(".");
    //     if(arr[1].length>=precision){
    //       console.log(parseFloat(arr[0]+"."+arr[1].substr(0,precision)),"parser处理完毕")
    //       return parseFloat(arr[0]+"."+arr[1].substr(0,precision));
    //     }
    //     else{
    //       console.log(value,"parser处理完毕")
    //       return value;
    //     }
    //   }
    // },