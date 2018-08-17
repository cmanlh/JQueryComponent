$JqcLoader.importComponents('com.lifeonwalden.jqc', ['selectbox']).execute(function () {
    var basicModel = [{
        value: 'aal',
        label: '美国航空'
    }, {
        value: 'aamc',
        label: 'Altisour'
    }, {
        value: 'aame',
        label: '美国大西'
    }, {
        value: 'aan',
        label: 'Aaron'
    }, {
        value: 'aaoi',
        label: 'Applied'
    }, {
        value: 'aaon',
        label: '艾伦建材'
    }];
    var datasource = [{
        code: 'aal',
        name: '美国航空'
    }, {
        code: 'aamc',
        name: 'Altisour'
    }, {
        code: 'aame',
        name: '美国大西'
    }, {
        code: 'aan',
        name: 'Aaron'
    }, {
        code: 'aaoi',
        name: 'Applied'
    }, {
        code: 'aaon',
        name: '艾伦建材'
    }, {
        code: 'aap',
        name: 'Advance'
    }, {
        code: 'aapc',
        name: 'Atlantic'
    }, {
        code: 'aapl',
        name: '苹果'
    }, {
        code: 'aat',
        name: 'American'
    }, {
        code: 'aau',
        name: 'Almaden'
    }, {
        code: 'aav',
        name: '阿特拉斯'
    }, {
        code: 'aaxn',
        name: 'Axon Ent'
    }, {
        code: 'bbu',
        name: 'Brookfie'
    }, {
        code: 'bbva',
        name: 'Banco Bi'
    }, {
        code: 'bbw',
        name: 'Build-A-'
    }, {
        code: 'bbx',
        name: '亚特兰大'
    }, {
        code: 'bbxt',
        name: 'BBXT'
    }, {
        code: 'bby',
        name: '百思买'
    }, {
        code: 'bc',
        name: '布朗斯威'
    }, {
        code: 'bcat',
        name: 'CORPBANC'
    }, {
        code: 'bcacu',
        name: '贝森资本'
    }, {
        code: 'bcbp',
        name: 'BCB银行'
    }, {
        code: 'bcc',
        name: 'Boise Ca'
    }, {
        code: 'bcd',
        name: 'ETFS Blo'
    }, {
        code: 'bce',
        name: '加拿大贝'
    }, {
        code: 'bcei',
        name: 'Bonanza'
    }];

    new $.jqcSelectBox({
        optionData: basicModel,
        defaultVal: 'aal',
        element: $('#basic'),
        dataName: 'basic',
        width: 160
    });
    new $.jqcSelectBox({
        optionData: {
            data: datasource,
            adapter: {
                value: 'code',
                label: 'name'
            }
        },
        defaultVal: 'bby',
        element: $('#basicAdapter'),
        dataName: 'basicAdapter',
        width: 160
    });
    new $.jqcSelectBox({
        optionData: {
            data: datasource,
            adapter: {
                value: 'code',
                label: 'name'
            }
        },
        defaultVal: 'bby',
        element: $('#addNewItem'),
        dataName: 'basicAdapter',
        width: 160,
        addNewItem: function (callback) {
            var newItemValue = 'v'.concat(Date.now());
            var newItem = {
                code: newItemValue,
                name: newItemValue
            };
            callback(newItem);
        }
    });
    var pinyinParser = new $.jqcPinyin();
    new $.jqcSelectBox({
        optionData: {
            data: datasource,
            adapter: {
                value: 'code',
                label: 'name',
                filter: 'code',
                pinyinFilter: 'name'
            }
        },
        defaultVal: 'bby',
        element: $('#AdavanceAdapter'),
        dataName: 'AdavanceAdapter',
        width: 160,
        supportPinYin: true,
        pinyinParser: pinyinParser
    });

    var adaterMultiPinyinData = [{
        id: '000723',
        name: '建信稳定添利债券C',
        alias: '工商银行'
    }, {
        id: '004870',
        name: '融通创业板指数C',
        alias: '建设银行'
    }, {
        id: '000727',
        name: '融通健康产业灵活配置混合',
        alias: '招商银行'
    }];
    new $.jqcSelectBox({
        optionData: {
            data: adaterMultiPinyinData,
            adapter: {
                value: 'id',
                label: function (data) {
                    return data.name.concat(' ').concat(data.alias);
                },
                filter: 'id',
                pinyinFilter: ['name', 'alias']
            }
        },
        defaultVal: '000727',
        element: $('#multiPinyinData'),
        dataName: 'adaterMultiPinyinData',
        width: 160,
        supportPinYin: true,
        pinyinParser: pinyinParser
    });

    new $.jqcSelectBox({
        optionData: {
            data: datasource,
            adapter: {
                value: 'code',
                label: 'name',
                filter: 'code',
                pinyinFilter: 'name'
            }
        },
        extOption: [{
            code: '000000',
            name: '全部'
        }],
        defaultVal: '000000',
        element: $('#extOption'),
        dataName: 'extOption',
        width: 160,
        supportPinYin: true,
        pinyinParser: pinyinParser
    });
    new $.jqcSelectBox({
        optionData: {
            data: datasource,
            adapter: {
                value: 'code',
                label: 'name',
                filter: 'code',
                pinyinFilter: 'name'
            }
        },
        defaultVal: 'aapc,bby',
        element: $('#multi'),
        dataName: 'multi',
        width: 160,
        supportPinYin: true,
        pinyinParser: pinyinParser,
        supportMultiSelect: true
    });
    var updateDataSource = [{
        code: 'sh603933',
        name: '睿能科技'
    }, {
        code: 'aapc',
        name: 'Atlantic'
    }, {
        code: 'bby',
        name: '百思买'
    }, {
        code: 'sh603757',
        name: '大元泵业'
    }, {
        code: 'sh603305',
        name: '旭升股份'
    }, {
        code: 'sz300671',
        name: '富满电子'
    }, {
        code: 'sz300649',
        name: '杭州园林'
    }, {
        code: 'sz002884',
        name: '凌霄泵业'
    }, {
        code: 'sz002802',
        name: '洪汇新材'
    }, {
        code: 'sh603595',
        name: '东尼电子'
    }, {
        code: 'sh600525',
        name: '长园集团'
    }, {
        code: 'sh600476',
        name: '湘邮科技'
    }, {
        code: 'sz300673',
        name: '佩蒂股份'
    }, {
        code: 'sh600525',
        name: '长园集团'
    }]
    new $.jqcSelectBox({
        optionData: {
            data: datasource,
            adapter: {
                value: 'code',
                label: 'name',
                filter: 'code',
                pinyinFilter: 'name'
            }
        },
        defaultVal: 'aapc,bby',
        element: $('#runtimeUpdate'),
        dataName: 'runtimeUpdate',
        width: 160,
        supportPinYin: true,
        pinyinParser: pinyinParser,
        supportMultiSelect: true,
        updateDataSource: function () {
            return updateDataSource;
        }
    });
    new $.jqcSelectBox({
        optionData: {
            data: datasource,
            adapter: {
                value: 'code',
                label: 'name',
                filter: 'code',
                pinyinFilter: 'name'
            }
        },
        defaultVal: 'aapc,bby',
        element: $('#brother'),
        dataName: 'runtimeUpdate',
        width: 160,
        supportPinYin: true,
        pinyinParser: pinyinParser,
        supportMultiSelect: true
    });

    new $.jqcSelectBox({
        optionData: {
            data: datasource,
            adapter: {
                value: 'code',
                label: 'name',
                filter: 'code',
                pinyinFilter: 'name'
            }
        },
        defaultVal: 'bby',
        element: $('#fuzzy'),
        dataName: 'AdavanceAdapter',
        width: 160,
        supportPinYin: true,
        pinyinParser: pinyinParser,
        supportFuzzyMatch: true
    });

    new $.jqcSelectBox({
        optionData: {
            data: datasource,
            adapter: {
                value: 'code',
                label: 'name',
                filter: 'code',
                pinyinFilter: 'name'
            }
        },
        defaultVal: 'bby',
        element: $('#singleCallback'),
        dataName: 'AdavanceAdapter',
        width: 160,
        supportPinYin: true,
        pinyinParser: pinyinParser,
        supportFuzzyMatch: true,
        onSelect: function (item) {
            $('#singleCallbackOnSelect').text('用户选择了股票：'.concat(item.name));
        }
    });


    new $.jqcSelectBox({
        optionData: {
            data: datasource,
            adapter: {
                value: 'code',
                label: 'name',
                filter: 'code',
                pinyinFilter: 'name'
            }
        },
        defaultVal: 'aapc,bby',
        element: $('#multiCallback'),
        dataName: 'multi',
        width: 160,
        supportPinYin: true,
        pinyinParser: pinyinParser,
        supportMultiSelect: true,
        onSelect: function (result, item, appended) {
            if (appended) {
                $('#multiCallbackOnSelect').text('用户添加了股票：'.concat(item.name));
            } else {
                $('#multiCallbackOnSelect').text('用户移除了股票：'.concat(item.name));
            }
        },
        afterSelect: function (result) {
            $('#multiCallbackAfterSelect').text('用户选择了股票：'.concat(JSON.stringify(result)));
        },
        postClear: function () {
            console.log("post clear");
        }
    });

    new $.jqcSelectBox({
        optionData: basicModel,
        element: $('#autoDisplay'),
        dataName: 'basic',
        autoDisplay: true,
        width: 160
    });
});