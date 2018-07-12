$JqcLoader.importScript('../../../../../qunit/jquery-3.1.1.js')
    .importScript('../../../../../qunit/version.js')
    .importScript('../../../../../qunit/keycode.js')
    .importScript('../../../../../qunit/qunit-2.1.1.js')
    .importCss('../../../../../qunit/qunit-2.1.1.css').execute(function () {
        $JqcLoader.registerModule($JqcLoader.newModule('com.lifeonwalden.jqc', '../../../../../')
            .registerComponent('baseElement')
            .registerComponent('resizeable')
            .registerComponent('uniqueKey')
            .registerComponent('lang')
            .registerComponent('dialog')
            .registerComponent('blocker')
            .registerComponent('zindex')
            .registerComponent('menuTree')
            .registerComponent('draggable'));

        $JqcLoader.importComponents('com.lifeonwalden.jqc', ['menuTree']).execute(function () {

            var res = '{"code":"0","msg":"success","result":{"pinned":[{"id":"7a6ede682a21444a8eba5c9f1fd79900","name":"自营数据","orderNum":100,"sysId":"PT","createTime":"2018-06-07","createUser":"xuke","updateTime":"2018-06-07","updateUser":"xuke","logicalDel":0,"subMenuList":[{"id":"36fe4f3517fe4039a8c89ca7b2485208","name":"自营数据管理","parentId":"7a6ede682a21444a8eba5c9f1fd79900","orderNum":1,"form":"pt/admin/dataManage/logging/logging.js","sysId":"PT","createTime":"2018-06-07","createUser":"xuke","updateTime":"2018-06-07","updateUser":"xuke","logicalDel":0},{"id":"c4ee1aca7d2b4f5bae6533e2f3d4a53d","name":"自营数据复核","parentId":"7a6ede682a21444a8eba5c9f1fd79900","orderNum":2,"form":"pt/admin/dataManage/check/check.js","sysId":"PT","createTime":"2018-06-25","createUser":"xuke","updateTime":"2018-06-25","updateUser":"xuke","logicalDel":0},{"id":"b39aa21498424b0b938ab9ab59ef8edb","name":"自营数据查询","parentId":"7a6ede682a21444a8eba5c9f1fd79900","orderNum":3,"form":"pt/admin/dataManage/query/query.js","sysId":"PT","createTime":"2018-06-07","createUser":"xuke","updateTime":"2018-06-25","updateUser":"xuke","logicalDel":0}]},{"id":"85a62b18307e440a8a31f06076818f33","name":"优先劣后级管理","parentId":"366605df1e74486ea85666e602466587","orderNum":10,"form":"pt/admin/repayPriorityManage/repayPriority/repayPriority.js","sysId":"PT","createTime":"2018-06-12","createUser":"xuke","updateTime":"2018-06-12","updateUser":"xuke","logicalDel":0},{"id":"4c12154018c347f18b6b3b76ae61353c","name":"产品类型管理","orderNum":60,"sysId":"PT","createTime":"2018-06-13","createUser":"xuke","updateTime":"2018-06-13","updateUser":"xuke","logicalDel":0,"subMenuList":[{"id":"57473c453b034eec993a1a81c1cd0d2c","name":"产品类型管理","parentId":"4c12154018c347f18b6b3b76ae61353c","orderNum":10,"form":"pt/admin/productTypeManage/productType/productType.js","sysId":"PT","createTime":"2018-06-13","createUser":"xuke","updateTime":"2018-06-13","updateUser":"xuke","logicalDel":0},{"id":"75958a28c7bc474d8db7a38cf1c3048d","name":"产品类型与公司映射","parentId":"4c12154018c347f18b6b3b76ae61353c","orderNum":20,"form":"pt/admin/productTypeManage/productTypeDeptMapping/productTypeDeptMapping.js","sysId":"PT","createTime":"2018-06-13","createUser":"xuke","updateTime":"2018-06-13","updateUser":"xuke","logicalDel":0}]},{"id":"4ece7b79ffff4ce3aeb95f4a9fbc8fff","name":"资产类型管理","orderNum":20,"sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0,"subMenuList":[{"id":"2cd0724090e6494181db8539c05f646d","name":"资产类型管理","parentId":"4ece7b79ffff4ce3aeb95f4a9fbc8fff","orderNum":10,"form":"pt/admin/assetTypeManage/assetType/assetType.js","sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0},{"id":"34855ebed46b44338282f332256c1a1f","name":"资产类型与部门映射关系","parentId":"4ece7b79ffff4ce3aeb95f4a9fbc8fff","orderNum":20,"form":"pt/admin/assetTypeManage/assetTypeDeptMapping/assetTypeDeptMapping.js","sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0}]},{"id":"e76d24c9df8c415fbbe06e5a88c94955","name":"投资组合管理","orderNum":30,"sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0,"subMenuList":[{"id":"0bd8b56b0b0d40c5bd01f40afbf2604a","name":"投资组合管理","parentId":"e76d24c9df8c415fbbe06e5a88c94955","orderNum":10,"form":"pt/admin/investPortfolioManage/invesPortfolio/invesPortfolio.js","sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0},{"id":"c93359133dde4e24b697e2d901c24eba","name":"投资组合与部门映射关系","parentId":"e76d24c9df8c415fbbe06e5a88c94955","orderNum":20,"form":"pt/admin/investPortfolioManage/invesPortfolioDeptMapping/invesPortfolioDeptMapping.js","sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0}]},{"id":"55f815ceee3d48bf907ee9296ce88a8d","name":"评级管理","orderNum":40,"sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0,"subMenuList":[{"id":"13c7c623a2f3431ca169fd4a45062811","name":"评级级别管理","parentId":"55f815ceee3d48bf907ee9296ce88a8d","orderNum":10,"form":"pt/admin/creditratingManage/level/creditratingLevel.js","sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0},{"id":"75aa0a57778e465f8f9a70d4b7bad9c5","name":"评级机构管理","parentId":"55f815ceee3d48bf907ee9296ce88a8d","orderNum":20,"form":"pt/admin/creditratingManage/agency/creditratingAgency.js","sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0}]}],"authorized":[{"id":"7a6ede682a21444a8eba5c9f1fd79900","name":"自营数据","orderNum":100,"sysId":"PT","createTime":"2018-06-07","createUser":"xuke","updateTime":"2018-06-07","updateUser":"xuke","logicalDel":0,"subMenuList":[{"id":"36fe4f3517fe4039a8c89ca7b2485208","name":"自营数据管理","parentId":"7a6ede682a21444a8eba5c9f1fd79900","orderNum":1,"form":"pt/admin/dataManage/logging/logging.js","sysId":"PT","createTime":"2018-06-07","createUser":"xuke","updateTime":"2018-06-07","updateUser":"xuke","logicalDel":0},{"id":"c4ee1aca7d2b4f5bae6533e2f3d4a53d","name":"自营数据复核","parentId":"7a6ede682a21444a8eba5c9f1fd79900","orderNum":2,"form":"pt/admin/dataManage/check/check.js","sysId":"PT","createTime":"2018-06-25","createUser":"xuke","updateTime":"2018-06-25","updateUser":"xuke","logicalDel":0},{"id":"b39aa21498424b0b938ab9ab59ef8edb","name":"自营数据查询","parentId":"7a6ede682a21444a8eba5c9f1fd79900","orderNum":3,"form":"pt/admin/dataManage/query/query.js","sysId":"PT","createTime":"2018-06-07","createUser":"xuke","updateTime":"2018-06-25","updateUser":"xuke","logicalDel":0}]},{"id":"366605df1e74486ea85666e602466587","name":"优先劣后级管理","orderNum":50,"sysId":"PT","createTime":"2018-06-12","createUser":"xuke","updateTime":"2018-06-12","updateUser":"xuke","logicalDel":0,"subMenuList":[{"id":"85a62b18307e440a8a31f06076818f33","name":"优先劣后级管理","parentId":"366605df1e74486ea85666e602466587","orderNum":10,"form":"pt/admin/repayPriorityManage/repayPriority/repayPriority.js","sysId":"PT","createTime":"2018-06-12","createUser":"xuke","updateTime":"2018-06-12","updateUser":"xuke","logicalDel":0}]},{"id":"4c12154018c347f18b6b3b76ae61353c","name":"产品类型管理","orderNum":60,"sysId":"PT","createTime":"2018-06-13","createUser":"xuke","updateTime":"2018-06-13","updateUser":"xuke","logicalDel":0,"subMenuList":[{"id":"57473c453b034eec993a1a81c1cd0d2c","name":"产品类型管理","parentId":"4c12154018c347f18b6b3b76ae61353c","orderNum":10,"form":"pt/admin/productTypeManage/productType/productType.js","sysId":"PT","createTime":"2018-06-13","createUser":"xuke","updateTime":"2018-06-13","updateUser":"xuke","logicalDel":0},{"id":"75958a28c7bc474d8db7a38cf1c3048d","name":"产品类型与公司映射","parentId":"4c12154018c347f18b6b3b76ae61353c","orderNum":20,"form":"pt/admin/productTypeManage/productTypeDeptMapping/productTypeDeptMapping.js","sysId":"PT","createTime":"2018-06-13","createUser":"xuke","updateTime":"2018-06-13","updateUser":"xuke","logicalDel":0}]},{"id":"4ece7b79ffff4ce3aeb95f4a9fbc8fff","name":"资产类型管理","orderNum":20,"sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0,"subMenuList":[{"id":"2cd0724090e6494181db8539c05f646d","name":"资产类型管理","parentId":"4ece7b79ffff4ce3aeb95f4a9fbc8fff","orderNum":10,"form":"pt/admin/assetTypeManage/assetType/assetType.js","sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0},{"id":"34855ebed46b44338282f332256c1a1f","name":"资产类型与部门映射关系","parentId":"4ece7b79ffff4ce3aeb95f4a9fbc8fff","orderNum":20,"form":"pt/admin/assetTypeManage/assetTypeDeptMapping/assetTypeDeptMapping.js","sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0}]},{"id":"e76d24c9df8c415fbbe06e5a88c94955","name":"投资组合管理","orderNum":30,"sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0,"subMenuList":[{"id":"0bd8b56b0b0d40c5bd01f40afbf2604a","name":"投资组合管理","parentId":"e76d24c9df8c415fbbe06e5a88c94955","orderNum":10,"form":"pt/admin/investPortfolioManage/invesPortfolio/invesPortfolio.js","sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0},{"id":"c93359133dde4e24b697e2d901c24eba","name":"投资组合与部门映射关系","parentId":"e76d24c9df8c415fbbe06e5a88c94955","orderNum":20,"form":"pt/admin/investPortfolioManage/invesPortfolioDeptMapping/invesPortfolioDeptMapping.js","sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0}]},{"id":"55f815ceee3d48bf907ee9296ce88a8d","name":"评级管理","orderNum":40,"sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0,"subMenuList":[{"id":"13c7c623a2f3431ca169fd4a45062811","name":"评级级别管理","parentId":"55f815ceee3d48bf907ee9296ce88a8d","orderNum":10,"form":"pt/admin/creditratingManage/level/creditratingLevel.js","sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0},{"id":"75aa0a57778e465f8f9a70d4b7bad9c5","name":"评级机构管理","parentId":"55f815ceee3d48bf907ee9296ce88a8d","orderNum":20,"form":"pt/admin/creditratingManage/agency/creditratingAgency.js","sysId":"PT","createTime":"2018-06-11","createUser":"xuke","updateTime":"2018-06-11","updateUser":"xuke","logicalDel":0}]}]}}';
            var data = JSON.parse(res);
            
            var menu = new $.jqcMenuTree({
                data: data.result.pinned || [],
                // data: configurableMenuData,
                top: 60,
                left: 0,
                autoSkip: false,
                allowedConfig: true,
                // displayed: false,
                // triggerFirst: true,
                width: 200,
                // autoHide: false,
                configBoxWidth: 1100,
                trigger: $('.btn'),
                configurableMenuData: data.result.authorized || [],
                // configurableMenuData: configurableMenuData,
                adapter: {
                    id: 'id',
                    label: 'name',
                    child: 'subMenuList'
                },
                onSelect: function(menu) {
                    var _menu = {
                        id: menu.id,
                        text: menu.name,
                        url: menu.form
                    };
                    console.log(menu);
                    // $.addForm(_menu, tab);
                },
                onResettingMenu: function(menu) {
                    console.log(menu);
                }
            });
            // var menu = new $.jqcMenuTree({
            //     data: data,
            //     top: 60,
            //     left: 0,
            //     width: 200,
            //     autoHide: false,
            //     // autoSkip: false,
            //     allowedConfig: true,
            //     configBoxWidth: 600,
            //     configurableMenuData: configurableMenuData,
            //     onSelect: function (menu) {
            //         console.log(menu);
            //     },
            //     onResettingMenu: function (menu) {
            //         console.log(menu);
            //     }
            // });
            // window.a = menu;
            // window.b = data;
            // console.log(data);
        });
    });