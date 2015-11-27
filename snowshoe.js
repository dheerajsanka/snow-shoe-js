var Base64 = {
      //
      // Base64 adapted from & courtesy of http://scotch.io
      //
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;
          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }
          output = output +
          this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
          this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
      },

      _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);
          if (c < 128) {
            utftext += String.fromCharCode(c);
          }
          else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
          }
          else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
          }
        }
        return utftext;
      }
    };

	var snowShoeListener = {
	      	init: function(stampScreenElmId, onStamp){
				
	        	var stampScreenElm = document.getElementById(stampScreenElmId);
	        	stampScreenElm.addEventListener('touchstart', function(event) {
					console.log("here");
	          	if (event.touches.length >= 5) {
	           		var data = [];
	            	var touches = event.touches;
	            	for (var i = 0; i <= Object.keys(event).length; i++) {
	              	  if (touches[i]) {
	                	  data.push([touches[i].pageX, touches[i].pageY]);
	              		}
	            	}
					// call the listener for the stamp with the base 64 encoded stamp data
	            	onStamp(Base64.encode(JSON.stringify(data)));
	          	}
	        });
		}
	};