$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('pinyin')
            .registerComponent('uniqueKey')
            .registerComponent('valHooks')
            .registerComponent('selectbox'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['selectbox']).execute(function () {
            var basicDataSrc = [{
                value: 'vala01',
                label: 'a01'
            }, {
                value: 'vala02',
                label: 'a02'
            }, {
                value: 'valaa01',
                label: 'aa01'
            }, {
                value: 'valaa02',
                label: 'aa02'
            }, {
                value: 'valab01',
                label: 'ab01'
            }, {
                value: 'valab02',
                label: 'ab02'
            }, {
                value: 'valac01',
                label: 'ac01'
            }, {
                value: 'valac02',
                label: 'ac02'
            }, {
                value: 'valb01',
                label: 'b01'
            }, {
                value: 'valb02',
                label: 'b02'
            }, {
                value: 'valba01',
                label: 'ba01'
            }, {
                value: 'valba02',
                label: 'ba02'
            }, {
                value: 'valbb01',
                label: 'bb01'
            }, {
                value: 'valbb02',
                label: 'bb02'
            }, {
                value: 'valbc01',
                label: 'bc01'
            }, {
                value: 'valbc02',
                label: 'bc02'
            }, {
                value: 'val啊01',
                label: '啊01'
            }, {
                value: 'val啊02',
                label: '啊02'
            }, {
                value: 'val啊啊01',
                label: '啊啊01'
            }, {
                value: 'val啊啊02',
                label: '啊啊02'
            }, {
                value: 'val啊不01',
                label: '啊不01'
            }, {
                value: 'val啊不02',
                label: '啊不02'
            }, {
                value: 'val啊才01',
                label: '啊才01'
            }, {
                value: 'val啊才02',
                label: '啊才02'
            }];

            var basicFilterDataSrc = [{
                value: 'vala01',
                label: 'a01',
                filter: 'b01'
            }, {
                value: 'vala02',
                label: 'a02',
                filter: 'b02'
            }, {
                value: 'valaa01',
                label: 'aa01',
                filter: 'bb01'
            }, {
                value: 'valaa02',
                label: 'aa02',
                filter: 'bb02'
            }, {
                value: 'valab01',
                label: 'ab01',
                filter: 'bc01'
            }, {
                value: 'valab02',
                label: 'ab02',
                filter: 'bc02'
            }, {
                value: 'valac01',
                label: 'ac01',
                filter: 'bd01'
            }, {
                value: 'valac02',
                label: 'ac02',
                filter: 'bd02'
            }, {
                value: 'valb01',
                label: 'b01',
                filter: 'c01'
            }, {
                value: 'valb02',
                label: 'b02',
                filter: 'c02'
            }, {
                value: 'valba01',
                label: 'ba01',
                filter: 'cb01'
            }, {
                value: 'valba02',
                label: 'ba02',
                filter: 'cb02'
            }, {
                value: 'valbb01',
                label: 'bb01',
                filter: 'cc01'
            }, {
                value: 'valbb02',
                label: 'bb02',
                filter: 'cc02'
            }, {
                value: 'valbc01',
                label: 'bc01',
                filter: 'cd01'
            }, {
                value: 'valbc02',
                label: 'bc02',
                filter: 'cd01'
            }, {
                value: 'val啊01',
                label: '啊01',
                filter: 'a01'
            }, {
                value: 'val啊02',
                label: '啊02',
                filter: 'a02'
            }, {
                value: 'val啊啊01',
                label: '啊啊01',
                filter: 'aa01'
            }, {
                value: 'val啊啊02',
                label: '啊啊02',
                filter: 'aa02'
            }, {
                value: 'val啊不01',
                label: '啊不01',
                filter: 'ab01'
            }, {
                value: 'val啊不02',
                label: '啊不02',
                filter: 'ab02'
            }, {
                value: 'val啊才01',
                label: '啊才01',
                filter: 'ac01'
            }, {
                value: 'val啊才02',
                label: '啊才02',
                filter: 'ac02'
            }];
            var pinyinFilterDataSrc = [{
                    value: 'vala01',
                    label: 'a01',
                    filter: 'b01',
                    pinyinFilter: '阿01'
                },
                {
                    value: 'vala02',
                    label: 'a02',
                    filter: 'b02',
                    pinyinFilter: '阿02'
                },
                {
                    value: 'valaa01',
                    label: 'aa01',
                    filter: 'bb01',
                    pinyinFilter: '阿阿01'
                },
                {
                    value: 'valaa02',
                    label: 'aa02',
                    filter: 'bb02',
                    pinyinFilter: '阿阿02'
                },
                {
                    value: 'valab01',
                    label: 'ab01',
                    filter: 'bc01',
                    pinyinFilter: '阿布01'
                },
                {
                    value: 'valab02',
                    label: 'ab02',
                    filter: 'bc02',
                    pinyinFilter: '阿布02'
                },
                {
                    value: 'valac01',
                    label: 'ac01',
                    filter: 'bd01',
                    pinyinFilter: '阿财01'
                },
                {
                    value: 'valac02',
                    label: 'ac02',
                    filter: 'bd02',
                    pinyinFilter: '阿财02'
                },
                {
                    value: 'valb01',
                    label: 'b01',
                    filter: 'c01',
                    pinyinFilter: '布01'
                },
                {
                    value: 'valb02',
                    label: 'b02',
                    filter: 'c02',
                    pinyinFilter: '布02'
                },
                {
                    value: 'valba01',
                    label: 'ba01',
                    filter: 'cb01',
                    pinyinFilter: '布阿01'
                },
                {
                    value: 'valba02',
                    label: 'ba02',
                    filter: 'cb02',
                    pinyinFilter: '布阿02'
                },
                {
                    value: 'valbb01',
                    label: 'bb01',
                    filter: 'cc01',
                    pinyinFilter: '布布01'
                },
                {
                    value: 'valbb02',
                    label: 'bb02',
                    filter: 'cc02',
                    pinyinFilter: '布布02'
                },
                {
                    value: 'valbc01',
                    label: 'bc01',
                    filter: 'cd01',
                    pinyinFilter: '布财01'
                },
                {
                    value: 'valbc02',
                    label: 'bc02',
                    filter: 'cd01',
                    pinyinFilter: '布财02'
                },
                {
                    value: 'val啊01',
                    label: '啊01',
                    filter: 'a01',
                    pinyinFilter: '啊01'
                },
                {
                    value: 'val啊02',
                    label: '啊02',
                    filter: 'a02',
                    pinyinFilter: '啊02'
                },
                {
                    value: 'val啊啊01',
                    label: '啊啊01',
                    filter: 'aa01',
                    pinyinFilter: '啊啊01'
                },
                {
                    value: 'val啊啊02',
                    label: '啊啊02',
                    filter: 'aa02',
                    pinyinFilter: '啊啊02'
                },
                {
                    value: 'val啊不01',
                    label: '啊不01',
                    filter: 'ab01',
                    pinyinFilter: '啊不01'
                },
                {
                    value: 'val啊不02',
                    label: '啊不02',
                    filter: 'ab02',
                    pinyinFilter: '啊不02'
                },
                {
                    value: 'val啊才01',
                    label: '啊才01',
                    filter: 'ac01',
                    pinyinFilter: '啊才01'
                },
                {
                    value: 'val啊才02',
                    label: '啊才02',
                    filter: 'ac02',
                    pinyinFilter: '啊才02'
                }
            ];

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

            var adaterData = [{
                id: '000723',
                name: '建信稳定添利债券C'
            }, {
                id: '004870',
                name: '融通创业板指数C'
            }, {
                id: '000727',
                name: '融通健康产业灵活配置混合'
            }, {
                id: '000728',
                name: '工银目标收益一年定开债券'
            }, {
                id: '000729',
                name: '建信中小盘先锋股票'
            }, {
                id: '002100',
                name: '国富新活力混合C'
            }, {
                id: '000720',
                name: '南方稳利1年定期开放债券C'
            }, {
                id: '002607',
                name: '融通增裕债券'
            }, {
                id: '512300',
                name: '南方中证500医药卫生ETF'
            }, {
                id: '513030',
                name: '华安德国30(DAX)ETF(QDII)'
            }, {
                id: '512310',
                name: '南方中证500工业ETF'
            }, {
                id: '002609',
                name: '博时泰和债券C'
            }, {
                id: '002608',
                name: '博时泰和债券A'
            }, {
                id: '002603',
                name: '工银瑞丰纯债半年定开债券'
            }, {
                id: '002602',
                name: '易方达丰惠混合'
            }];

            var updateDataSrc = [{
                id: '600050',
                name: '中国联通'
            }, {
                id: '600054',
                name: '黄山旅游'
            }, {
                id: '600834',
                name: '申通地铁'
            }, {
                id: '600016',
                name: '民生银行'
            }, {
                id: '000001',
                name: '上证指数'
            }, {
                id: '600036',
                name: '招商银行'
            }, {
                id: '600837',
                name: '海通证券'
            }, {
                id: '002602',
                name: '易方达丰惠混合'
            }];

            /**
             * basic funciton
             */
            new $.jqcSelectBox({
                optionData: basicDataSrc, // data source
                element: $('#selectboxBasic'),
                dataName: 'basic'
            });

            new $.jqcSelectBox({
                optionData: basicDataSrc, // data source
                element: $('#autoDisplay'),
                dataName: 'basic',
                defaultVal: 'vala01',
                autoDisplay: true,
                onSelect: function (data) {
                    console.log(data);
                }
            });

            /**
             * without resetter
             */
            new $.jqcSelectBox({
                optionData: basicDataSrc, // data source
                element: $('#withoutResetter'),
                dataName: 'basic',
                withResetter: false
            });

            /**
             * with update datasources
             */
            new $.jqcSelectBox({
                optionData: {
                    data: adaterData,
                    adapter: {
                        value: 'id',
                        label: 'name',
                        filter: 'id',
                        pinyinFilter: 'name'
                    }
                },
                defaultVal: '002602',
                element: $('#withUpdateDataResources'),
                dataName: 'adaterData',
                updateDataSource: function (callback) {
                    callback(updateDataSrc);
                },

            });


            /**
             * basic funciton
             */
            new $.jqcSelectBox({
                optionData: basicDataSrc, // data source
                element: $('#addNewItem'),
                dataName: 'basic',
                addNewItem: function (callback) {
                    var newItem = {
                        value: 'v'.concat(Date.now()),
                        label: 'v'.concat(Date.now())
                    };
                    callback(newItem);
                }
            });

            /**
             * with update datasources & out resetter
             */
            new $.jqcSelectBox({
                optionData: {
                    data: adaterData,
                    adapter: {
                        value: 'id',
                        label: 'name',
                        filter: 'id',
                        pinyinFilter: 'name'
                    }
                },
                defaultVal: '002602',
                element: $('#withUpdateOutResetter'),
                dataName: 'adaterData',
                updateDataSource: function (callback) {
                    callback(updateDataSrc);
                },
                withResetter: false
            });

            /**
             * right float & select callback
             */
            new $.jqcSelectBox({
                optionData: basicDataSrc, // data source
                element: $('#selectboxRightSingle'),
                dataName: 'basic',
                onSelect: function (item) {
                    console.log(item);
                }
            });

            /**
             * default value & width
             */
            new $.jqcSelectBox({
                optionData: basicDataSrc, // data source
                defaultVal: 'val啊才01',
                element: $('#selectboxDefaultAndWidth'),
                dataName: 'basic',
                width: 160
            });

            /**
             * Basic & filter
             */
            new $.jqcSelectBox({
                optionData: basicFilterDataSrc, // data source
                defaultVal: 'val啊才01',
                element: $('#selectboxBasicFilter'),
                dataName: 'basicFilter',
                width: 160
            });

            /**
             * pinyin support
             */
            var pinyinParser = new $.jqcPinyin();
            new $.jqcSelectBox({
                optionData: basicDataSrc, // data source
                defaultVal: 'val啊才01',
                element: $('#selectboxPinyin'),
                dataName: 'basicPinyin',
                supportPinYin: true,
                pinyinParser: pinyinParser
            });

            /**
             * multipinyin
             */
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
                defaultVal: '002602',
                element: $('#supportMultiPinyin'),
                dataName: 'adaterMultiPinyinData',
                supportPinYin: true,
                pinyinParser: pinyinParser
            });

            /**
             * multipinyin with fuzzy
             */
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
                defaultVal: '002602',
                element: $('#supportMultiPinyinFuzzy'),
                dataName: 'supportMultiPinyinFuzzy',
                supportPinYin: true,
                pinyinParser: pinyinParser,
                supportFuzzyMatch: true
            });

            /**
             * pinyin support & pinyinFilter
             */
            new $.jqcSelectBox({
                optionData: pinyinFilterDataSrc, // data source
                defaultVal: 'val啊才01',
                element: $('#selectboxPinyinFilter'),
                dataName: 'basicPinyinFilter',
                supportPinYin: true,
                pinyinParser: pinyinParser
            });

            /**
             * extesion options
             */
            new $.jqcSelectBox({
                optionData: pinyinFilterDataSrc, // data source
                extOption: [{
                    value: 'hello',
                    label: 'hello world',
                    filter: 'hello world',
                    pinyinFilter: 'hello world'
                }, {
                    value: 0,
                    label: '全选',
                    filter: 0,
                    pinyinFilter: 0
                }],
                defaultVal: 0,
                element: $('#selectboxExtOption'),
                dataName: 'extOption',
                supportPinYin: true,
                pinyinParser: pinyinParser,
                width: 160
            });

            /**
             * multiple select
             */
            new $.jqcSelectBox({
                defaultVal: 'val啊不01,vala01',
                element: $('#selectboxMulti'),
                dataName: 'basicPinyinFilter',
                supportPinYin: true,
                pinyinParser: pinyinParser,
                width: 160,
                supportMultiSelect: true
            });

            /**
             * adater
             */
            new $.jqcSelectBox({
                optionData: {
                    data: adaterData,
                    adapter: {
                        value: 'id',
                        label: 'name',
                        filter: 'id',
                        pinyinFilter: 'name'
                    }
                },
                defaultVal: '002602',
                element: $('#selectboxAdapter'),
                dataName: 'adaterData',
                supportPinYin: true,
                pinyinParser: pinyinParser,
                width: 160,
                supportMultiSelect: true
            });

            /**
             * fuzzy
             */
            new $.jqcSelectBox({
                optionData: {
                    data: adaterData,
                    adapter: {
                        value: 'id',
                        label: 'name',
                        filter: 'id',
                        pinyinFilter: 'name'
                    }
                },
                defaultVal: '002602',
                element: $('#selectboxFuzzy'),
                dataName: 'fuzzyMatch',
                supportPinYin: true,
                pinyinParser: pinyinParser,
                width: 160,
                supportMultiSelect: true,
                supportFuzzyMatch: true
            });

            /**
             * update data source
             */
            new $.jqcSelectBox({
                optionData: {
                    data: adaterData,
                    adapter: {
                        value: 'id',
                        label: 'name',
                        filter: 'id',
                        pinyinFilter: 'name'
                    }
                },
                defaultVal: '002602',
                element: $('#selectboxUpdateDataSource'),
                dataName: 'fuzzyMatch',
                supportPinYin: true,
                pinyinParser: pinyinParser,
                width: 160,
                supportMultiSelect: true,
                supportFuzzyMatch: true,
                updateDataSource: function (callback) {
                    callback(updateDataSrc);
                }
            });

            /**
             * update data source
             */
            new $.jqcSelectBox({
                optionData: {
                    data: adaterData,
                    adapter: {
                        value: 'id',
                        label: 'name',
                        filter: 'id',
                        pinyinFilter: 'name'
                    }
                },
                extOption: [{
                        id: '111111',
                        name: '扩展银行'
                    },
                    {
                        id: '222222',
                        name: '测试银行'
                    }
                ],
                defaultVal: '002602',
                element: $('#selectboxUpdateSrcExt'),
                dataName: 'updateSrcWithExt',
                supportPinYin: true,
                pinyinParser: pinyinParser,
                width: 160,
                supportMultiSelect: true,
                supportFuzzyMatch: true,
                updateDataSource: function (callback) {
                    callback(updateDataSrc);
                },
                maxOptionCount: 3
            });

            /**
             * right float & multi & select callback
             */
            new $.jqcSelectBox({
                defaultVal: '002602',
                element: $('#selectboxRightMulti'),
                dataName: 'updateSrcWithExt',
                supportPinYin: true,
                pinyinParser: pinyinParser,
                width: 160,
                supportMultiSelect: true,
                supportFuzzyMatch: true,
                autoDisplay: true,
                updateDataSource: function (callback) {
                    callback(updateDataSrc);
                },
                onSelect: function (result, item, appended) {
                    console.log(result);
                    console.log(item);
                    console.log(appended);
                },
                afterSelect: function (result) {
                    console.log(result);
                }
            });
            new $.jqcSelectBox({
                defaultVal: '002602',
                element: $('#select'),
                dataName: 'updateSrcWithExt',
                supportPinYin: true,
                pinyinParser: pinyinParser,
                width: 160,
                supportFuzzyMatch: true,
                withSearch: false,
                autoDisplay: true,
                onSelect: function (result, item, appended) {
                    console.log(result);
                    console.log(item);
                    console.log(appended);
                },
                afterSelect: function (result) {
                    console.log(result);
                }
            });
        });
    });