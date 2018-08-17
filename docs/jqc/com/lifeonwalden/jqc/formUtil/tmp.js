(function($) {
	var chineseFirstPY = 'ydyqsxmwzssxjbymgcczqpssqbycdscdqldylybssjgyzzjjfkcclzdhwdwzjljpfyynwjjtmyhzwzhflzppqhgscyyynjqyxxgjhhsdsjnkktmomlcrxypsnqseccqzggllyjlmyzzsecykyyhqwjssggyxyzyjwwkdjhychmyxjtlxjyqbyxzldwrdjrwysrldzjpcbzjjbrcftleczstzfxxzhtrqhybdlyczssymmrfmyqzpwwjjyfcrwfdfzqpyddwyxkyjawjffxypsftzyhhyzyswcjyxsclcxxwzzxnbgnnxbxlzszsbsgpysyzdhmdzbqbzcwdzzyytzhbtsyybzgntnxqywqskbphhlxgybfmjebjhhgqtjcysxstkzhlyckglysmzxyalmeldccxgzyrjxsdltyzcqkcnnjwhjtzzcqljststbnxbtyxceqxgkwjyflzqlyhyxspsfxlmpbysxxxydjczylllsjxfhjxpjbtffyabyxbhzzbjyzlwlczggbtssmdtjzxpthyqtgljscqfzkjzjqnlzwlslhdzbwjncjzyzsqqycqyrzcjjwybrtwpyftwexcskdzctbzhyzzyyjxzcffzzmjyxxsdzzottbzlqwfckszsxfyrlnyjmbdthjxsqqccsbxyytsyfbxdztgbcnslcyzzpsazyzzscjcshzqydxlbpjllmqxtydzxsqjtzpxlcglqtzwjbhctsyjsfxyejjtlbgxsxjmyjqqpfzasyjntydjxkjcdjszcbartdclyjqmwnqnclllkbybzzsyhqqltwlccxtxllzntylnewyzyxczxxgrkrmtcndnjtsyyssdqdghsdbjghrwrqlybglxhlgtgxbqjdzpyjsjyjctmrnymgrzjczgjmzmgxmpryxkjnymsgmzjymkmfxmldtgfbhcjhkylpfmdxlqjjsmtqgzsjlqdldgjycalcmzcsdjllnxdjffffjczfmzffpfkhkgdpsxktacjdhhzddcrrcfqyjkqccwjdxhwjlyllzgcfcqdsmlzpbjjplsbcjggdckkdezsqcckjgcgkdjtjdlzycxklqscgjcltfpcqczgwpjdqyzjjbyjhsjdzwgfsjgzkqcczllpspkjgqjhzzljplgjgjjthjjyjzczmlzlyqbgjwmljkxzdznjqsyzmljlljkywxmkjlhskjgbmclyymkxjqlbmllkmdxxkwyxyslmlpsjqqjqxyxfjtjdxmxxllcxqbsyjbgwymbggbcyxpjygpepfgdjgbhbnsqjyzjkjkhxqfgqzkfhygkhdkllsdjqxpqykybnqsxqnszswhbsxwhxwbzzxdmnsjbsbkbbzklylxgwxdrwyqzmywsjqlcjxxjxkjeqxscyetlzhlyyysdzpaqyzcmtlshtzcfyzyxyljsdcjqagyslcqlyyyshmrqqkldxzscsssydycjysfsjbfrsszqsbxxpxjysdrckgjlgdkzjzbdktcsyqpyhstcldjdhmxmcgxyzhjddtmhltxzxylymohyjcltyfbqqxpfbdfhhtksqhzyywcnxxcrwhowgyjlegwdqcwgfjycsntmytolbygwqwesjpwnmlrydzsztxyqpzgcwxhngpyxshmyqjxztdppbfyhzhtjyfdzwkgkzbldntsxhqeegzzylzmmzyjzgxzxkhkstxnxxwylyapsthxdwhzympxagkydxbhnhxkdpjnmyhylpmgocslnzhkxxlpzzlbmlsfbhhgygyyggbhscyaqtywlxtzqcezydqdqmmhtkllszhlsjzwfyhqswscwlqazynytlsxthaznkzzszzlaxxzwwctgqqtddyztcchyqzflxpslzygpzsznglndqtbdlxgtctajdkywnsyzljhhzzcwnyyzywmhychhyxhjkzwsxhzyxlyskqyspslyzwmyppkbyglkzhtyxaxqsyshxasmchkdscrswjpwxsgzjlwwschsjhsqnhcsegndaqtbaalzzmsstdqjcjktscjaxplggxhhgxxzcxpdmmhldgtybysjmxhmrcpxxjzckzxshmlqxxtthxwzfkhcczdytcjyxqhlxdhypjqxylsyydzozjnyxqezysqyayxwypdgxddxsppyzndltwrhxydxzzjhtcxmczlhpyyyymhzllhnxmylllmdcppxhmxdkycyrdltxjchhzzxzlcclylnzshzjzzlnnrlwhyqsnjhxyntttkyjpychhyegkcttwlgqrlggtgtygyhpyhylqyqgcwyqkpyyyttttlhyhlltyttsplkyzxgzwgpydsszzdqxskcqnmjjzzbxyqmjrtffbtkhzkbxljjkdxjtlbwfzpptkqtztgpdgntpjyfalqmkgxbdclzfhzclllladpmxdjhlcclgyhdzfgyddgcyyfgydxkssebdhykdkdkhnaxxybpbyyhxzqgaffqyjxdmljcsqzllpchbsxgjyndybyqspzwjlzksddtactbxzdyzypjzqsjnkktknjdjgyypgtlfyqkasdntcyhblwdzhbbydwjrygkzyheyyfjmsdtyfzjjhgcxplxhldwxxjkytcyksssmtwcttqzlpbszdzwzxgzagyktywxlhlspbclloqmmzsslcmbjcszzkydczjgqqdsmcytzqqlwzqzxssfpttfqmddzdshdtdwfhtdyzjyqjqkypbdjyyxtljhdrqxxxhaydhrjlklytwhllrllrcxylbwsrszzsymkzzhhkyhxksmdsydycjpbzbsqlfcxxxnxkxwywsdzyqoggqmmyhcdzttfjyybgstttybykjdhkyxbelhtypjqnfxfdykzhqkzbyjtzbxhfdxkdaswtawajldyjsfhbldnntnqjtjnchxfjsrfwhzfmdryjyjwzpdjkzyjympcyznynxfbytfyfwygdbnzzzdnytxzemmqbsqehxfzmbmflzzsrxymjgsxwzjsprydjsjgxhjjgljjynzzjxhgxkymlpyyycxytwqzswhwlyrjlpxslsxmfswwklctnxnynpsjszhdzeptxmyywxyysywlxjqzqxzdcleeelmcpjpclwbxsqhfwwtffjtnqjhjqdxhwlbyznfjlalkyyjldxhhycstyywnrjyxywtrmdrqhwqcmfjdyzmhmyyxjwmyzqzxtlmrspwwchaqbxygzypxyyrrclmpymgksjszysrmyjsnxtplnbappypylxyyzkynldzyjzcznnlmzhharqmpgwqtzmxxmllhgdzxyhxkyxycjmffyyhjfsbssqlxxndycannmtcjcyprrnytyqnyymbmsxndlylysljrlxysxqmllyzlzjjjkyzzcsfbzxxmstbjgnxyzhlxnmcwscyzyfzlxbrnnnylbnrtgzqysatswryhyjzmzdhzgzdwybsscskxsyhytxxgcqgxzzshyxjscrhmkkbxczjyjymkqhzjfnbhmqhysnjnzybknqmclgqhwlznzswxkhljhyybqlbfcdsxdldspfzpskjyzwzxzddxjsmmegjscssmgclxxkyyylnypwwwgydkzjgggzggsycknjwnjpcxbjjtqtjwdsspjxzxnzxumelpxfsxtllxcljxjjljzxctpswxlydhlyqrwhsycsqyybyaywjjjqfwqcqqcjqgxaldbzzyjgkgxpltzyfxjltpadkyqhpmatlcpdckbmtxybhklenxdleegqdymsawhzmljtwygxlyqzljeeyybqqffnlyxrdsctgjgxyynkllyqkcctlhjlqmkkzgcyygllljdzgydhzwxpysjbzkdzgyzzhywyfqytyzszyezzlymhjjhtsmqwyzlkyywzcsrkqytltdxwctyjklwsqzwbdcqyncjsrszjlkcdcdtlzzzacqqzzddxyplxzbqjylzlllqddzqjyjyjzyxnyyynyjxkxdazwyrdljyyyrjlxlldyxjcywywnqcclddnyyynyckczhxxcclgzqjgkwppcqqjysbzzxyjsqpxjpzbsbdsfnsfpzxhdwztdwpptflzzbzdmyypqjrsdzsqzsqxbdgcpzswdwcsqzgmdhzxmwwfybpdgphtmjthzsmmbgzmbzjcfzwfzbbzmqcfmbdmcjxlgpnjbbxgyhyyjgptzgzmqbqtcgyxjxlwzkydpdymgcftpfxyztzxdzxtgkmtybbclbjaskytssqyymszxfjewlxllszbqjjjaklylxlycctsxmcwfkkkbsxlllljyxtyltjyytdpjhnhnnkbyqnfqyyzbyyessessgdyhfhwtcjbsdzztfdmxhcnjzymqwsryjdzjqpdqbbstjggfbkjbxtgqhngwjxjgdllthzhhyyyyyysxwtyyyccbdbpypzycczyjpzywcbdlfwzcwjdxxhyhlhwzzxjtczlcdpxujczzzlyxjjtxphfxwpywxzptdzzbdzcyhjhmlxbqxsbylrdtgjrrcttthytczwmxfytwwzcwjwxjywcskybzscctzqnhxnwxxkhkfhtswoccjybcmpzzykbnnzpbzhhzdlsyddytyfjpxyngfxbyqxcbhxcpsxtyzdmkysnxsxlhkmzxlyhdhkwhxxsskqyhhcjyxglhzxcsnhekdtgzxqypkdhextykcnymyyypkqyyykxzlthjqtbyqhxbmyhsqckwwyllhcyylnneqxqwmcfbdccmljggxdqktlxkgnqcdgzjwyjjlyhhqtttnwchmxcxwhwszjydjccdbqcdgdnyxzthcqrxcbhztqcbxwgqwyybxhmbymyqtyexmqkyaqyrgyzslfykkqhyssqyshjgjcnxkzycxsbxyxhyylstycxqthysmgscpmmgcccccmtztasmgqzjhklosqylsw

	$.pinyin = function(word) {
		var result = '';
		for (var i = 0, len = word.length; i < len; i++) {
			var _char = word.charAt(i);
			var _charCode = word.charCodeAt(i);
			if (_charCode > 40869 || _charCode < 19968) {
				result = result.concat(_char);
			} else {
				result = result.concat(chineseFirstPY.charAt(_charCode - 19968));
			}
		}

		return result;
	};

	$.datepicker.setDefaults({
		changeMonth : true,
		changeYear : true,
		dateFormat : "yy-mm-dd",
		monthNamesShort : [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ],
		monthNames : [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ],
		dayNamesShort : [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ],
		dayNamesMin : [ "日", "一", "二", "三", "四", "五", "六" ],
		dayNames : [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ]
	});

	function _fieldFormat(field, dataType) {
		switch (dataType) {
		case 'number':
			var dataScale = $.trim(field.attr('dataScale'));
			if (dataScale.length <= 0) {
				dataScale = 2;
			}
			new $.jqcInputNumber({
				element:field,
				decimals:dataScale
			});
			break;
		case 'int':
			new $.jqcInputNumber({
				element:field
			});
			break;
		case 'textnumber':
			field.on({
				'keyup':function(){
					$(this).val(($(this).val()||'').replace(/\D/g,''));
				},
				'paste':function(e){
					// Get the text content stream.
					var val='',original=e.originalEvent;
					if (window.clipboardData && window.clipboardData.getData) { // IE
						val = window.clipboardData.getData('Text');
					} else if (original.clipboardData && original.clipboardData.getData) {
						val = original.clipboardData.getData('text/plain');
					}
					$(this).val((val||'').replace(/\D/g,''));
					e.preventDefault();
				}
			})
			break;
		case 'date':
			field.datepicker();
			field.attr('placeholder', 'yyyy-MM-dd');
		default:
			// do nothing
		}
	}
	//form setup
	$.fn.setupForm = function(param) {
		console.log("setupForm do init");
		if(param){
			return $.initForm($(this), param);
		}else {
			return $(this).formatForm();
		}
	};
	
	$.fn.formatForm = function() {
		this.find('[databind]').each(function(idx, obj) {
			var field = $(obj);
			var prop = $.trim(field.attr('databind'));
			if (0 == prop.length) {
				throw new Error(field.attr('id') + ' databind属性为空.');
			}

			var dataType = $.trim(field.attr('datatype'));
			if (dataType.length <= 0) {
				dataType = 'string';
			}
			_fieldFormat(field, dataType.toLowerCase());
		});

		return this;
	};

	$.fn.initForm = function(data, format) {
		this.find('[databind]').each(function(idx, obj) {
			var field = $(obj);
			var prop = $.trim(field.attr('databind'));
			if (0 == prop.length) {
				throw new Error(field.attr('id') + ' databind属性为空.');
			}

			var dataType = $.trim(field.attr('datatype'));
			if (dataType.length <= 0) {
				dataType = 'string';
			}
			_fieldFormat(field, dataType.toLowerCase());

			var propChain = prop.split(".");
			var _tmpVal = data, tmpVal = null;
			for ( var i in propChain) {
				var _prop = $.trim(propChain[i]);
				if (_prop.length > 0) {
					_tmpVal = _tmpVal[_prop];
					tmpVal = _tmpVal;
				}
			}

			if (null == tmpVal || 'object' == typeof (tmpVal)) {
				return;
			}
			switch (dataType.toLowerCase()) {
			case 'date':
				tmpVal = $.format.date(new Date(window.parseInt(tmpVal)), 'yyyy-MM-dd');
				break;
			default:
				var dataformat = $.trim(field.attr('dataformat'));
				if (format && dataformat.length > 0) {
					tmpVal = format.dataFormat(tmpVal);
				}
			}

			field.val(tmpVal);
		});

		return this;
	};

	$.fn.fillForm = function(data, format) {
		this.find('[databind]').each(function(idx, obj) {
			var field = $(obj);
			var prop = $.trim(field.attr('databind'));
			if (0 == prop.length) {
				throw new Error(field.attr('id') + ' databind属性为空.');
			}

			var dataType = $.trim(field.attr('datatype'));
			if (dataType.length <= 0) {
				dataType = 'string';
			}

			var propChain = prop.split(".");
			var _tmpVal = data, tmpVal = null;
			for ( var i in propChain) {
				var _prop = $.trim(propChain[i]);
				if (_prop.length > 0) {
					_tmpVal = _tmpVal[_prop];
					tmpVal = _tmpVal;
				}
			}

			if (null == tmpVal || 'object' == typeof (tmpVal)) {
				return;
			}
			switch (dataType.toLowerCase()) {
			case 'date':
				tmpVal = $.format.date(new Date(window.parseInt(tmpVal)), 'yyyy-MM-dd');
				break;
			default:
				var dataformat = $.trim(field.attr('dataformat'));
				if (format && dataformat.length > 0) {
					tmpVal = format.dataFormat(tmpVal);
				}
			}

			field.val(tmpVal);
		});

		return this;
	};

	$.fn.fetchForm = function() {
		var data = {};
		this.find('[databind]').each(function(idx, obj) {
			var field = $(obj);
			var prop = $.trim(field.attr('databind'));
			if (0 == prop.length) {
				throw new Error(field.attr('id') + ' databind属性为空.');
			}

			var _data;

			var dataType = $.trim(field.attr('datatype'));
			if (dataType.length <= 0) {
				dataType = 'string';
			}
			var _val = $.trim(field.val());
			if (_val.length <= 0) {
				if (field.attr('required')) {
					field.tip('必填字段，请输入相应的数据。');
					throw new Error('必填字段无输入值。');
				} else if (dataType.toLowerCase() == 'string') {
					_val = '';
				} else if (dataType.toLowerCase() == 'string') {
					_val = '';
				} else {
					return;
				}
			}
			switch (dataType.toLowerCase()) {
			case 'int':
				_data = window.parseInt(_val);
				var min = $.trim(field.attr('min'));
				if ($.isNumeric(min) && window.parseInt(min) > _data) {
					field.tip('允许输入的最小值为：'.concat(min));
					throw new Error('非法值');
				}
				var max = $.trim(field.attr('max'));
				if ($.isNumeric(max) && window.parseInt(max) < _data) {
					field.tip('允许输入的最大值为：'.concat(max));
					throw new Error('非法值');
				}
				break;
			case 'number':
				_data = _val;
				__data = window.parseFloat(_data);
				var min = $.trim(field.attr('min'));
				if ($.isNumeric(min) && window.parseInt(min) > __data) {
					field.tip('允许输入的最小值为：'.concat(min));
					throw new Error('非法值');
				}
				var max = $.trim(field.attr('max'));
				if ($.isNumeric(max) && window.parseInt(max) < __data) {
					field.tip('允许输入的最大值为：'.concat(max));
					throw new Error('非法值');
				}
				break;
			case 'date':
				_data = new Date(field.val()).getTime();
				if (!($.isNumeric(_data) && _val == $.format.date(new Date(window.parseInt(_data)), 'yyyy-MM-dd'))) {
					field.tip('非法日期参数，请更正');
					throw new RangeError('非法日期');
				}
				break;
			default: {
				_data = _val;
				var maxlength = $.trim(field.attr('maxlength'));
				if ($.isNumeric(maxlength) && _data.length > maxlength) {
					field.tip('输入超出了允许的字符数限制，最多允许输入'.concat(maxlength).concat('个字符。'));
					throw new Error('非法值');
				}
			}
			}

			var tmpVal = {};
			var propChain = prop.split(".");
			var size = propChain.length;
			for (var i = size - 1; i >= 0; i--) {
				var _prop = $.trim(propChain[i]);
				if (_prop.length > 0) {
					tmpVal[_prop] = _data;
					_data = tmpVal;
					tmpVal = {};
				}
			}
			Object.assign(data, _data);
		});

		return data;
	};

	$.availableHeight = function(target) {
		var _this = target;
		if ('string' == typeof (target)) {
			_this = $(target);
		}
		var usedHeight = _this.offset().top + _this.outerHeight();
		if ($.isNumeric(usedHeight)) {
			return $(document).outerHeight() - 15 - usedHeight;
		}
	}

	$.formatDate = function(dateParam,pattern) {
		if(!pattern){
			pattern = 'yyyy-MM-dd';
		}
		return $.format.date(new Date(window.parseInt(dateParam)), pattern);
	};
	
	const
	EMPTY = {
		__empty__ : true
	};

	var stockInfoCache = {};
	$.fetchStock = function(secId, marketCode) {
		var key = secId.concat('#').concat(marketCode);
		var _stock = stockInfoCache[key];
		if (_stock) {
			if (_stock.__empty__) {
				return null;
			}
			return _stock;
		}
		$.ajax({
			url : 'open/market/stockInfo/fetch',
			method : 'GET',
			data : {
				secId : secId,
				market : marketCode
			},
			async : false,
			success : function(data) {
				if (0 == data.code) {
					stockInfoCache[key] = data.result;
				} else {
					stockInfoCache[key] = EMPTY;
					setTimeout(function() {
						delete stockInfoCache[key];
					}, 10000);
				}
			}
		});

		_stock = stockInfoCache[key];
		if (_stock.__empty__) {
			return null;
		} else {
			return _stock;
		}
	};
	$.getCurrentUser = function() {
		var user = null;
		$.ajax({
			url : 'open/user/info',
			method : 'GET',
			data : null,
			async : false,
			success : function(resp) {
				user = resp.result;
			}
		});
		return user;
	};
	
	var fundInfoCache = {};
	$.fetchFund = function(secId, marketCode) {
		var key = secId.concat('#').concat(marketCode);
		var _fund = fundInfoCache[key];
		if (_fund) {
			if (_fund.__empty__) {
				return null;
			}
			return _fund;
		}
		$.ajax({
			url : 'open/market/fundInfo/fetch',
			method : 'GET',
			data : {
				secId : secId,
				market : marketCode
			},
			async : false,
			success : function(data) {
				if (0 == data.code) {
					fundInfoCache[key] = data.result;
				} else {
					fundInfoCache[key] = EMPTY;
					setTimeout(function() {
						delete fundInfoCache[key];
					}, 10000);
				}
			}
		});

		_fund = fundInfoCache[key];
		if (_fund.__empty__) {
			return null;
		} else {
			return _fund;
		}
	};
	$.blockpage = function() {
		$.blockUI({
			message : '<h2>请稍等...</h2>'
		});
	};
	// get request with loading mask
	$.maskget = function(url, data, callback, type) {
		_wrap_request("get", url, data, callback, type);
	};
	// post request with loading mask
	$.maskpost = function(url, data, callback, type) {
		_wrap_request("post", url, data, callback, type);
	};
	// a request wrap
	var _wrap_request = function(method, url, data, callback, type) {
		$.blockpage();
		if (jQuery.isFunction(data)) {
			type = type || callback;
			callback = data;
			data = undefined;
		}
		$.ajax({
			url : url,
			type : method,
			dataType : type,
			data : data,
			success : function(ret, status, xhr) {
				try {
					callback(ret, status, xhr);
				} catch (err) {
					throw err;
				} finally {
					$.unblockUI();
				}
			}
		});
	};
}(jQuery));