angular.module('fangxin.service',[]).service('BaiduMap', function ($window, $document, $q) {
  var promise;
  this.load = function () {
    if (promise) {
      return promise;
    }
    promise = $q(function (resolve) {
      $window.running = function () {
        resolve();
      };
      var script      = document.createElement("script");
      script.type     = "text/javascript";
      script.src      = "http://api.map.baidu.com/api?v=2.0&ak=WA0yIUnIuuYRU55feiMcyq7ubC9AXudT&callback=running";
      $document[0].body.appendChild(script);
    });
    return promise;
  };
}).factory('ConfigService', function ($http) {
  return {
    community      : {
      community_types  : ['居住', '商用', '写字楼', '综合物业', '别墅', '四合院', '其他'],
      ancillary_types  : ['管道煤气', '有线电视', '宽带网络', '电话', '停车场', '固定车位', '卫星电视', '中控系统', '中水系统'],
      internal_types   : ['邮局', '医疗', '超市', '会馆', '其他'],
      regional_types   : ['门卫安防', '停车场', '便利店', '幼儿园', '游泳池', '高尚会所', '中央花园', '网球场', '篮球场', '羽毛球场', '健身房', '台球室', '乒乓球室', '阅览室', '棋牌室', '咖啡厅', '餐吧', '洗衣店', '美容美发', 'KTV', '儿童游乐场', '高尔夫练习场', '高尔夫球场'],
      arch_structres   : ['砖木结构', '砖混结构', '钢筋混凝土', '钢结构'],
      arch_types       : ['低层', '多层', '高层', '小高层', '洋房', '复式', '公寓'],
      ownership_types  : ['商品房', '公产房', '私产房', '房改房', '经适房', '企业产权', '军产房', '安置房', '小产权'],
      special_types    : ['地铁沿线', '学区房'],
      unity_types      : ['商用', '民用', '商民两用'],
      decoration_levels: ['毛坯', '简装', '普装', '精装', '豪装'],
      directions       : ['东', '西', '南', '北', '东南', '东北', '西南', '西北', '南北通透', '东西通透'],
      sale_types       : ['待售', '期房', '现房', '售完'],
      power_types      : ['市政供电,一户一表', '市政供电,多户一表'],
      water_types      : ['市政供水,一户一表', '市政供水,多户一表'],
      gas_types        : ['管道天然气', '管道煤气', '液化气罐', '无'],
      heater_types     : ['集中热力', '中央空调', '地暖', '壁挂炉', '无'],
      supportings      : ['床', '衣柜', '书桌', '空调', '冰箱', '电视', '洗衣机', '宽带', 'WIFI', '油烟机', '灶具', '热水器']
    },
    ridgepole      : {
      arch_type: ['砖木结构', '砖混结构', '钢筋混凝土', '钢结构']
    },
    getConfig      : function () {
      return $http.get('/api/common-config.js');
    },
    getOrganization: function () {
      return $http.get('/api/organization/nodes');
    }
  }
}).factory('ApproveService', function ($http, $uibModal) {
  return {
    getTypes         : function () {
      return $http.get('/api/approve/approve-types')
    },
    getPosition      : function () {
      return $http.get('/api/approve/position');
    },
    getApproveStatus : function () {
      return $http.get('/api/approve/status-list');
    },
    getApproveSetting: function ($type, $name) {
      if (angular.isUndefined($type)) {
        Message.warning('请传入审批类别：eg：补卡审批');
        return false;
      }
      
      $name = angular.isUndefined($name) ? '' : $name;

      return $http.get('/api/approve/setting-list/' + $type + '/' + $name);
    },
    getApproveWindow : function (approve) {
      $uibModal.open({
        backdrop   : false,
        templateUrl: 'approve-detail-show.html',
        controller : 'ApproveEditDetailCtrl',
        appendTo   : angular.element(document.getElementById('main-window')),
        size       : 'dialog-800 gray-header',
        resolve    : {
          share: function () {
            return {
              approve: angular.isObject(approve) ? approve : {id: approve}
            };
          }
        }
      }).result.then(function (params) {
        if (angular.isDefined(params)) {
          approve.status = params.status;
        }
      });
    }
  }
});