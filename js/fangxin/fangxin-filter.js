angular.module('fangxin.filter', []).filter('JSON2String', function () {
  return function (json) {
    if (angular.isString(json) && json != "[]" && json != null && json != "" && json != 'null') {
      return JSON.parse(json).join('/');
    } else {
      return '暂无数据';
    }
  };
}).filter('propsFilter', function () {
  return function (items, props) {
    var out = [];
    if (angular.isArray(items)) {
      items.forEach(function (item) {
        var itemMatches = false;
        var keys        = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      out = items;
    }

    return out;
  };
}).filter('UiSelectFilter', function () {
  return function (items, props) {
    var out = [];
    if (angular.isArray(items)) {
      var keys = Object.keys(props);
      items.forEach(function (item) {
        var itemMatches = false;
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }
        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      out = items;
    }
    return out;
  };
}).filter('range', function () {
  return function (input, total) {
    total = parseInt(total);

    for (var i = 0; i < total; i++) {
      input.push(i);
    }

    return input;
  };
}).filter("trustUrl", function ($sce) {
  return function (recordingUrl) {
    return $sce.trustAsResourceUrl(recordingUrl);
  };
}).filter('noslash', function () {
  return function (value) {
    return (!value) ? '' : (value.replace('//', '/').replace(/(^\/*)/g, ''));
  };
}).filter('DATE_NO_SEC', function () {
  return function (value) {
    return (!value) ? '' : value.slice(0, -3);
  };
}).filter('PICTURE_NAME', function () {
  return function (value) {
    return (!value) ? '' : value.replace(/huxingtu/, '户型图')
      .replace(/zhuwo/, '主卧')
      .replace(/ciwo/, '次卧')
      .replace(/keting/, '客厅')
      .replace(/chufang/, '厨房')
      .replace(/weishengjian/, '卫生间')
      .replace(/yangtai/, '阳台')
      .replace(/shineitu/, '室内图')
      .replace(/shiyetu/, '视野图');
  };
}).filter('cut', function () {
  return function (value, wordwise, max, tail) {
    if (!value) return '';

    max = parseInt(max, 10);
    if (!max) return value;
    if (value.length <= max) return value;

    value = value.substr(0, max);
    if (wordwise) {
      var lastspace = value.lastIndexOf(' ');
      if (lastspace != -1) {
        value = value.substr(0, lastspace);
      }
    }

    return value + (tail || ' …');
  };
}).filter('recipient', function () {
  return function (value) {
    var names = [];
    angular.forEach(value, function (val, name) {
      if (val == true) {
        if (name == 'clientb') {
          names.push('客源边');
        } else if (name == 'source') {
          names.push('房源边');
        } else if (name == 'owner') {

          names.push('业主');
        } else if (name == 'client') {
          names.push('客户');
        }
      }
    });
    names = names.join(',');
    if (names == "") {
      names = '--';
    }
    return names;
  };
}).filter('thumb', function () {
  return function (value) {
    return value + '!160x120';
  }
}).filter('remove_html_tag', function () {
  return function (text) {
    if (!text) return;
    var obj = text.replace(/<(\S*?) [^>]*>.*?<\/\1>|<.*? \/>/g, '');
    return obj;
  };
}).filter('to_trusted', function () {
  return function (text) {
    if (!text) return;
    var obj = text.replace(/<\/?[^>]*>|[&nbsp;]|\s+/g, '');
    return obj;
  }
}).filter('to_ellipsis', function () {
  return function (text) {
    if (text == '--公告类型--') {
      return text
    } else {
      var reg = /(.{4}).*/;
      text    = text.replace(reg, "$1...");
      return text
    }
  };
}).filter('to_name', function () {
  return function (text) {
    if (text) {
      if (text.name) {
        return text.name
      } else {
        return text
      }
    }
  };
}).filter('trusted_num', function () {
  return function (val) {
    var number = "";
    if (isNaN(val)) {
      return number;
    } else {
      return val;
    }
  };
}).filter('wordPlace', function ($sce) {
  return function (input, word) {
    if (word == "" || word == undefined) return input;
    var result = input.replace(word, "<i style='color:#ff401a;font-style: normal;'>" + word + "</i>");
    return $sce.trustAsHtml(result);
  };
}).filter("highlight", function ($sce, $log) {
  return function (text, search) {
    if (search == "" || search == undefined) return text;
    var result = text.replace(search, "<i style='color:#ff401a;font-style: normal;'>" + search + "</i>");
    return $sce.trustAsHtml(result);
    // if (!search) {
    //   return $sce.trustAsHtml(text);
    // }
    // var result = encodeURI(text).replace(new RegExp(encodeURI(search), 'gi'), '<span class="searched-org">$&</span>');
    // result     = decodeURI(result);
    // return $sce.trustAsHtml(result);
  }
}).filter('SOrdinary', function () { //房源跟进方式
  return function (items) {
    var typeList = [],
        list     = angular.copy(items);
    angular.forEach(list, function (val, index) {
      angular.forEach(items, function (val2, index) {
        if (val.name == val2.name) {
          var type = val.type;
          if (type == 'JD' || type == 'QT' || type == 'DH' || type == 'BF') {
            return false;
          } else {
            items.splice(index, 1)
          }
        }
      });

    });
    return items;
  };
}).filter('COrdinary', function () { //房源跟进方式
  return function (items) {
    var typeList = [],
        list     = angular.copy(items);
    angular.forEach(list, function (val, index) {
      angular.forEach(items, function (val2, index) {
        if (val.name == val2.name) {
          var type = val.type;
          if (type == 'BF' || type == 'JD' || type == 'WT' || type == 'QT' || type == 'DH' || type == 'PK') {
            return false;
          } else {
            items.splice(index, 1)
          }
        }
      });

    });
    return items;
  };
});
