angular.module('fangxin.directive', [])
  .directive('ngRightClick', function ($parse) {
    return function (scope, element, attrs) {
      var fn = $parse(attrs.ngRightClick);
      element.bind('contextmenu', function (event) {
        scope.$apply(function () {
          event.preventDefault();
          fn(scope, {$event: event});
        });
      });
    };
  }).directive('none', function () {
  return {
    restrict  : 'EA',
    transclude: true,
    template  : '<div class="watermark" id="watermark">暂无数据</div>'
  };
}).directive('stringToNumber', function () {
  return {
    require: 'ngModel',
    link   : function (scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function (value) {
        return '' + value;
      });
      ngModel.$formatters.push(function (value) {
        return parseFloat(value, 10);
      });
    }
  };
})
  .directive('requiredMark', function () {
    return {
      restrict: "A",
      link    : function (scope, elem, attr) {
        var mark = "*";
        if (attr.requiredMark !== "") {
          mark = attr.requiredMark;
        }
        elem.html(elem.html() + "<span class=\"text-red\">" + mark + "</span>");
      }
    };
  })
  .directive('gridLoading', function () {
    return {
      restrict: 'C',
      require : '^uiGrid',
      link    : function ($scope, $elm, $attrs, uiGridCtrl) {
        $scope.grid = uiGridCtrl.grid;
      }
    }
  })
  .directive('numbersOnly', function () {
    return {
      require: 'ngModel',
      link   : function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.replace(/[^0-9]/g, '');

            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return null;
        }

        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  })
  .directive('numberstringonly', function () {
    return {
      require: 'ngModel',
      link   : function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.replace(/[\W]/g, '');

            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return null;
        }

        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  })
  .directive('percentum', function () {
    return {
      require: 'ngModel',
      link   : function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.replace(/[^0-9|.]/g, '');
            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return null;
        }

        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  })
  .directive('fxnumber', function () {
    return {
      require: 'ngModel',
      link   : function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.replace(/[^0-9]/g, '');
            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return null;
        }

        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  }).directive('mobile', function () {
  return {
    require: 'ngModel',
    link   : function (scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        if (text) {
          var transformedInput = text.replace(/[^0-9|-]/g, '');
          if (transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return transformedInput;
        }
        return null;
      }

      ngModelCtrl.$parsers.push(fromUser);
    }
  };
}).directive("idcard", [function () {
  return {
    restrict: "A",
    link    : function (scope, elem, attrs) {
      angular.element(elem).on("keydown", function () {
        this.value = this.value.replace(/[\W]/g, '');
        if (this.value.length > 17) {
          this.value = this.value.substr(0, 17);
          return false;
        }
      });
    }
  }
}]).directive("limitTo", [function () {
  return {
    restrict: "A",
    link    : function (scope, elem, attrs) {
      var limit = parseInt(attrs.limitTo);
      angular.element(elem).on("keydown", function () {
        if (this.value.length > limit) {
          this.value = this.value.substr(0, limit);
          return false;
        }
      });
    }
  }
}]).directive('twoDecimal', function () {
  return {
    require: 'ngModel',
    link   : function (scope, element, attr, ngModelCtrl) {
      angular.element(element).on("keyup", function () {
        if (this.value) {
          this.value = this.value.replace(/[^\d.]/g, "");
          this.value = this.value.replace(/^\./g, "");
          this.value = this.value.replace(/\.{2}/g, ".");
          this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
          this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        }
      });
    }
  };
}).directive('decimalTwo', function () {
  // 上面那个不适用某些场景，结合上上面的代码复制修改下使用
  return {
    require: 'ngModel',
    link   : function (scope, element, attr, ngModelCtrl) {
      angular.element(element).on("keyup", function () {
        if (this.value) {
          var transformedInput = this.value;
          transformedInput     = transformedInput.replace(/[^\d.]/g, "");
          transformedInput     = transformedInput.replace(/^\./g, "");
          transformedInput     = transformedInput.replace(/\.{2}/g, ".");
          transformedInput     = transformedInput.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
          transformedInput     = transformedInput.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
          if (transformedInput !== this.value) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
        }
      });
    }
  };
}).directive('organizationStructure', function () {
  return {
    restrict   : 'EA',
    scope      : {
      forbidden: '=forbidden',
      isbtn    : '=',
      og       : '=',
      default  : '=',
      id       : '=',
      width    : '=width',
      params   : '=params',
      send     : '&'
    },
    templateUrl: '/uib/template/fangxin/directive/org.html',
    controller : function ($scope, $http, $timeout) {
      $scope.org        = {
        input_name         : $scope.og,
        real_input_name    : null,
        org_name           : null,
        agent_name         : null,
        company_id         : Number(document.body.getAttribute('data-o')),
        company_big_area_id: null,
        company_area_id    : null,
        store_id           : null,
        store_group_id     : null,
        agent_id           : null
      };
      $scope.isShow     = function () {
        $scope.is_show = true;
      };
      $scope.close      = function () {
        $scope.is_show = false;
      };
      $scope.getNextOrg = function (type, org, index) {
        $http.get('/api/common/org?type=' + type + '&id=' + org.id).then(function (result) {
          if (type == 'company_big_area') {
            $scope.companyBigArea = result.data;
          } else if (type == 'company_area') {
            $scope.companyArea             = result.data;
            $scope.org.company_big_area_id = org.id;
            $scope.org.real_input_name     = org.name;
            $scope.org.org_name            = org.name;
            $scope.org.agent_name          = null;
            $scope.cba_index               = index;
            $scope.ca_index                = null;
            $scope.s_index                 = null;
            $scope.sg_index                = null;
            $scope.a_index                 = null;
            $scope.org.company_area_id     = null;
            $scope.org.store_id            = null;
            $scope.org.store_group_id      = null;
            $scope.org.agent_id            = null;

            $scope.is_ca_show = true;
            $scope.is_s_show  = false;
            $scope.is_sg_show = false;
            $scope.is_a_show  = false;

          } else if (type == 'store') {
            $scope.store               = result.data;
            $scope.org.company_area_id = org.id;
            $scope.org.org_name        = org.name;
            $scope.org.real_input_name = org.name + '／' + $scope.org.agent_name;
            $scope.ca_index            = index;
            $scope.s_index             = null;
            $scope.sg_index            = null;
            $scope.a_index             = null;
            $scope.org.store_id        = null;
            $scope.org.store_group_id  = null;
            $scope.org.agent_id        = null;

            $scope.is_s_show  = true;
            $scope.is_sg_show = false;
            $scope.is_a_show  = false;
          } else if (type == 'store_group') {
            $scope.storeGroups         = result.data.storeGroups;
            $scope.agents              = result.data.agents;
            $scope.org.store_id        = org.id;
            $scope.org.org_name        = org.name;
            $scope.org.agent_name      = '店公盘';
            $scope.org.real_input_name = org.name + '/' + $scope.org.agent_name;
            $scope.store_name          = org.name;
            $scope.s_index             = index;
            $scope.sg_index            = null;
            $scope.a_index             = null;
            $scope.org.store_group_id  = null;
            $scope.org.agent_id        = null;

            $scope.is_sg_show = true;
            $scope.is_a_show  = true;

          } else if (type == 'agent') {
            $scope.agents              = result.data;
            $scope.org.store_group_id  = org.id;
            $scope.org.agent_name      = '组公盘';
            $scope.org.real_input_name = $scope.store_name + '/' + org.name + '/' + $scope.org.agent_name;
            $scope.org.org_name        = $scope.store_name + '/' + org.name;
            $scope.store_group_name    = org.name;
            $scope.sg_index            = index;
            $scope.a_index             = null;
            $scope.org.agent_id        = null;
          } else {
            $scope.a_index             = index;
            $scope.org.agent_id        = org.id;
            $scope.org.store_group_id  = org.store_group_id;
            $scope.org.store_id        = org.store_id;
            $scope.org.agent_name      = org.name;
            $scope.org.org_name        = org.org_name;
            $scope.org.real_input_name = org.org_name + '/' + org.name;

            if ($scope.storeGroups !== undefined && $scope.storeGroups.length) {
              angular.forEach($scope.storeGroups, function (val, key) {
                if (val.id === org.store_group_id) {
                  $scope.sg_index = key;
                }
              })
            }
          }
          //单向绑定
          $scope.params = $scope.org;
        });
      };

      if ($scope.id != undefined) {
        $http.get('/api/common/agent-org/' + $scope.id).then(function (result) {
          $scope.org.input_name = result.data;
        });
      }
      $scope.done    = function () {
        //触发回调
        $scope.org.input_name = $scope.org.real_input_name;
        $scope.send();
        $scope.close();
      };
      $scope.running = function () {
        $scope.getNextOrg('company_big_area', {});
      };
      $scope.running();
    }
  };
})
  .directive('organizationSource', function () {
    return {
      restrict   : 'EA',
      scope      : {
        forbidden: '=forbidden',
        isbtn    : '=',
        ispub    : '=',
        ismore   : '=',
        gov      : '=',
        width    : '=width',
        top      : '=top',
        params   : '=params',
        send     : '&'
      },
      templateUrl: '/uib/template/fangxin/directive/org_source.html',
      replace    : true,
      link       : function (scope, element, attr) {
        scope.is_show      = false;
        scope.toggleSelect = function () {
          scope.is_show = !scope.is_show;
        };

        $(document).bind('click', function (event) {
          var isClickedElementChildOfPopup = element
              .find(event.target)
              .length > 0;

          if (isClickedElementChildOfPopup)
            return;

          // scope.is_show = false;
          scope.$apply();
        });
      },
      controller : function ($scope, $http, $timeout, bsLoadingOverlayService) {
        $scope.org = {
          input_name         : $scope.params.input_name,
          real_input_name    : null,
          org_name           : null,
          agent_name         : null,
          company_id         : Number(document.body.getAttribute('data-o')),
          company_big_area_id: null,
          company_area_id    : null,
          store_id           : null,
          store_group_id     : null,
          agent_id           : null,
          old_input_name     : null
        };

        $scope.isFirstLoading = false;
        $scope.isShow         = function () {
          if ($scope.forbidden) {
            return;
          }

          if (!$scope.isFirstLoading) {
            $scope.isFirstLoading = true;
            $scope.running();
          }
          $scope.is_show = true;
        };
        $scope.close          = function () {
          $scope.is_show = false;
        };

        $scope.closeThis = function () {
          $scope.close();
        }

        $scope.setCommon = function (type) {
          if (type == 'big_area') {
            $scope.ca_index = null;
            $scope.s_index  = null;
            $scope.sg_index = null;
            $scope.a_index  = null;

            $scope.store       = [];
            $scope.storeGroups = [];
            $scope.agents      = [];
          } else if (type == 'area') {
            $scope.s_index  = null;
            $scope.sg_index = null;
            $scope.a_index  = null;

            $scope.storeGroups = [];
            $scope.agents      = [];
          } else if (type == 'store') {
            $scope.sg_index = null;
            $scope.a_index  = null;
          } else if ('group') {
            $scope.a_index = null;
          }
        };

        $scope.isGetOld   = false;
        $scope.getNextOrg = function (type, org, index) {
          $scope.orgParams = {
            type: type,
            id  : org.id
          };

          if ($scope.ismore && type == 'store') {
            $scope.orgParams.ismore = true;
          }

          $http.get('/api/common/org?' + $.param($scope.orgParams)).then(function (result) {
            if (type == 'company_big_area') {
              $scope.companyBigArea = result.data;
            } else if (type == 'company_area') {
              $scope.companyArea             = result.data;
              $scope.org.company_big_area_id = org.id;
              $scope.org.real_input_name     = org.name;
              $scope.org.org_name            = org.name;
              $scope.org.agent_name          = '大区公盘';
              $scope.org.real_input_name     = org.name + '／' + $scope.org.agent_name;
              $scope.cba_index               = index;
              $scope.ca_index                = null;
              $scope.s_index                 = null;
              $scope.sg_index                = null;
              $scope.a_index                 = null;
              $scope.org.company_area_id     = null;
              $scope.org.store_id            = null;
              $scope.org.store_group_id      = null;
              $scope.org.agent_id            = null;

              $scope.is_ca_show = true;
              $scope.is_s_show  = false;
              $scope.is_sg_show = false;
              $scope.is_a_show  = false;

            } else if (type == 'store') {
              if ($scope.ismore) {
                $scope.store     = result.data.store;
                $scope.agents    = result.data.agent;
                $scope.is_a_show = true;
              } else {
                $scope.store     = result.data;
                $scope.is_a_show = false;
              }

              $scope.org.company_area_id = org.id;
              $scope.org.org_name        = org.name;
              $scope.org.agent_name      = '区公盘';
              $scope.org.real_input_name = org.name + '／' + $scope.org.agent_name;
              $scope.ca_index            = index;
              $scope.s_index             = null;
              $scope.sg_index            = null;
              $scope.a_index             = null;
              $scope.org.store_id        = null;
              $scope.org.store_group_id  = null;
              $scope.org.agent_id        = null;

              $scope.is_s_show  = true;
              $scope.is_sg_show = false;
            } else if (type == 'store_group') {
              $scope.storeGroups         = result.data.storeGroups;
              $scope.agents              = result.data.agents;
              $scope.org.store_id        = org.id;
              $scope.org.org_name        = org.name;
              $scope.org.agent_name      = '店公盘';
              $scope.org.real_input_name = org.name + '/' + $scope.org.agent_name;
              $scope.store_name          = org.name;
              $scope.s_index             = index;
              $scope.sg_index            = null;
              $scope.a_index             = null;
              $scope.org.store_group_id  = null;
              $scope.org.agent_id        = null;

              $scope.is_sg_show = true;
              $scope.is_a_show  = true;
            } else if (type == 'agent') {
              $scope.agents = result.data;

              $scope.org.store_group_id  = org.id;
              $scope.org.agent_name      = '组公盘';
              $scope.org.real_input_name = $scope.store_name + '/' + org.name + '/' + $scope.org.agent_name;
              $scope.org.org_name        = $scope.store_name + '/' + org.name;
              $scope.store_group_name    = org.name;
              $scope.sg_index            = index;
              $scope.a_index             = null;
              $scope.org.agent_id        = null;
            } else {
              $scope.a_index             = index;
              $scope.org.agent_id        = org.id;
              $scope.org.store_group_id  = org.store_group_id;
              $scope.org.store_id        = org.store_id;
              $scope.org.agent_name      = org.name;
              $scope.org.org_name        = org.org_name != undefined ? org.org_name : null;
              $scope.org.real_input_name = (org.org_name == null ? '' : (org.org_name + '/')) + org.name;

              if (angular.isArray($scope.storeGroups) && $scope.storeGroups.length) {
                angular.forEach($scope.storeGroups, function (val, key) {
                  if (val.id == org.store_group_id) {
                    $scope.sg_index = key;
                  }
                })
              }

              $scope.done();
            }
            //单向绑定
            $scope.params = $scope.org;

          });
        };

        if (!$scope.isGetOld) {
          $scope.isGetOld           = true;
          $scope.org.old_input_name = $scope.org.input_name;
        }

        $scope.done    = function () {
          if (!$scope.org.agent_id) {
            Message.warning('请选择经纪人');
            return false;
          }

          $scope.org.input_name = $scope.org.real_input_name;
          $scope.send();
          $scope.close();
        };
        $scope.running = function () {
          var type = '';
          var org  = {};
          if ($scope.gov.roler.store_group || $scope.gov.roler.agent) {
            type = 'agent';
            org  = {
              id  : $scope.gov.store_group_id,
              name: $scope.gov.group_name
            };

            $scope.is_a_show = true;
          } else if ($scope.gov.roler.store) {
            type = 'store_group';
            org  = {
              id  : $scope.gov.store_id,
              name: $scope.gov.store_name
            };

            $scope.is_sg_show = true;
            $scope.is_a_show  = true;
          } else if ($scope.gov.roler.company_area) {
            type = 'store';
            org  = {
              id  : $scope.gov.company_area_id,
              name: $scope.gov.company_area_name
            };

            $scope.is_s_show = true;
          } else if ($scope.gov.roler.company_big_area || $scope.gov.roler.company) {
            type = 'company_area';
            org  = {
              id  : 0,
              name: $scope.gov.company_big_area_name
            };

            $scope.is_ca_show = true;
          }

          $scope.getNextOrg(type, org);
        };
        // 及时赋值
        $scope.params  = $scope.org;
      }
    };
  }).directive('organizationApprove', function () {
  return {
    restrict   : 'EA',
    scope      : {
      forbidden: '=forbidden',
      isbtn    : '=',
      ispub    : '=',
      ismore   : '=',
      gov      : '=',
      width    : '=width',
      top      : '=top',
      params   : '=params',
      send     : '&'
    },
    templateUrl: '/uib/template/fangxin/directive/org_approve.html',
    replace    : true,
    link       : function (scope, element, attr) {
      scope.is_show      = false;
      scope.toggleSelect = function () {
        scope.is_show = !scope.is_show;
      };

      $(document).bind('click', function (event) {
        var isClickedElementChildOfPopup = element
            .find(event.target)
            .length > 0;

        if (isClickedElementChildOfPopup)
          return;

        // scope.is_show = false;
        scope.$apply();
      });
    },
    controller : function ($scope, $http, $timeout, bsLoadingOverlayService) {
      $scope.org = {
        input_name         : $scope.params.input_name,
        real_input_name    : null,
        org_name           : null,
        agent_name         : null,
        company_id         : Number(document.body.getAttribute('data-o')),
        company_big_area_id: null,
        company_area_id    : null,
        store_id           : null,
        store_group_id     : null,
        agent_id           : null,
        old_input_name     : null
      };

      $scope.isFirstLoading = false;
      $scope.isShow         = function () {
        if ($scope.forbidden) {
          return;
        }

        if (!$scope.isFirstLoading) {
          $scope.isFirstLoading = true;
          $scope.running();
        }
        $scope.is_show   = true;
        $scope.cba_index = null;
        $scope.ca_index  = null;
        $scope.s_index   = null;
        $scope.sg_index  = null;
        $scope.a_index   = null;
      };
      $scope.close          = function () {
        $scope.is_show = false;
      };

      $scope.closeThis = function () {
        $scope.done();
      };

      $scope.isGetOld   = false;
      $scope.getNextOrg = function (type, org, index) {
        $scope.orgParams = {
          type: type,
          id  : org.id
        };

        if ($scope.ismore) {
          $scope.orgParams.ismore = true;
        }

        $http.get('/api/common/org?' + $.param($scope.orgParams)).then(function (result) {
          if (type == 'company_big_area') {
            $scope.companyBigArea = result.data;
          } else if (type == 'company_area') {
            if ($scope.ismore) {
              $scope.companyArea = result.data.CompanyArea;
              $scope.agents      = result.data.agent;
              $scope.is_a_show   = true;
            } else {
              $scope.companyArea = result.data.CompanyArea;
              $scope.is_a_show   = false;
            }
            $scope.org.company_big_area_id = org.id;
            $scope.org.org_name            = org.name;
            $scope.org.real_input_name     = org.name;
            $scope.org.input_name          = $scope.org.real_input_name;
            $scope.company_big_area_name   = org.name;
            $scope.cba_index               = index;
            $scope.ca_index                = null;
            $scope.s_index                 = null;
            $scope.sg_index                = null;
            $scope.a_index                 = null;
            $scope.org.company_area_id     = null;
            $scope.org.store_id            = null;
            $scope.org.store_group_id      = null;
            $scope.org.agent_id            = null;

            $scope.is_ca_show = true;
            $scope.is_s_show  = false;
            $scope.is_sg_show = false;

          } else if (type == 'store') {
            if ($scope.ismore) {
              $scope.store     = result.data.store;
              $scope.agents    = result.data.agent;
              $scope.is_a_show = true;
            } else {
              $scope.store     = result.data;
              $scope.is_a_show = false;
            }

            $scope.org.company_area_id = org.id;
            $scope.org.org_name        = org.name;
            if ($scope.company_big_area_name) {
              $scope.org.real_input_name = $scope.company_big_area_name + '/' + org.name;
            } else {
              $scope.org.real_input_name = org.name;
            }
            $scope.org.input_name     = $scope.org.real_input_name;
            $scope.company_area_name  = org.name;
            $scope.ca_index           = index;
            $scope.s_index            = null;
            $scope.sg_index           = null;
            $scope.a_index            = null;
            $scope.org.store_id       = null;
            $scope.org.store_group_id = null;
            $scope.org.agent_id       = null;

            $scope.is_s_show  = true;
            $scope.is_sg_show = false;
          } else if (type == 'store_group') {
            $scope.storeGroups  = result.data.storeGroups;
            $scope.agents       = result.data.agents;
            $scope.org.store_id = org.id;
            $scope.org.org_name = org.name;
            if ($scope.company_area_name) {
              $scope.org.real_input_name = $scope.company_area_name + '/' + org.name;
            } else {
              $scope.org.real_input_name = org.name;
            }
            $scope.org.input_name     = $scope.org.real_input_name;
            $scope.store_name         = org.name;
            $scope.s_index            = index;
            $scope.sg_index           = null;
            $scope.a_index            = null;
            $scope.org.store_group_id = null;
            $scope.org.agent_id       = null;

            $scope.is_sg_show = true;
            $scope.is_a_show  = true;
          } else if (type == 'agent') {
            $scope.agents             = result.data;
            $scope.org.store_group_id = org.id;
            if ($scope.store_name) {
              $scope.org.real_input_name = $scope.store_name + '/' + org.name;
            } else {
              $scope.org.real_input_name = org.name;
            }
            $scope.org.input_name   = $scope.org.real_input_name;
            $scope.org.org_name     = $scope.store_name + '/' + org.name;
            $scope.store_group_name = org.name;
            $scope.sg_index         = index;
            $scope.a_index          = null;
            $scope.org.agent_id     = null;
          } else {
            $scope.a_index             = index;
            $scope.org.agent_id        = org.id;
            $scope.org.store_group_id  = org.store_group_id;
            $scope.org.store_id        = org.store_id;
            $scope.org.agent_name      = org.name;
            $scope.org.org_name        = org.org_name != undefined ? org.org_name : null;
            $scope.org.real_input_name = (org.org_name == null ? '' : (org.org_name + '/')) + org.name;

            if (angular.isArray($scope.storeGroups) && $scope.storeGroups.length) {
              angular.forEach($scope.storeGroups, function (val, key) {
                if (val.id == org.store_group_id) {
                  $scope.sg_index = key;
                }
              })
            }

            $scope.done();
          }
          //单向绑定
          $scope.params = $scope.org;

        });
      };

      if (!$scope.isGetOld) {
        $scope.isGetOld           = true;
        $scope.org.old_input_name = $scope.org.input_name;
      }

      $scope.done    = function () {
        $scope.org.input_name = $scope.org.real_input_name;
        $scope.send();
        $scope.close();
      };
      $scope.running = function () {
        var type = '';
        var org  = {};
        if ($scope.gov.roler.store_group) {
          type = 'agent';
          org  = {
            id  : $scope.gov.store_group_id,
            name: $scope.gov.group_name
          };

          $scope.is_a_show = true;
        } else if ($scope.gov.roler.store) {
          type = 'store_group';
          org  = {
            id  : $scope.gov.store_id,
            name: $scope.gov.store_name
          };

          $scope.is_sg_show = true;
          $scope.is_a_show  = true;
        } else if ($scope.gov.roler.company_area) {
          type = 'store';
          org  = {
            id  : $scope.gov.company_area_id,
            name: $scope.gov.company_area_name
          };

          $scope.is_s_show = true;
        } else if ($scope.gov.roler.company_big_area) {
          type = 'company_area';
          org  = {
            id  : $scope.gov.company_big_area_id,
            name: $scope.gov.company_big_area_name
          };

          $scope.is_ca_show = true;
        } else {
          type = 'company_big_area';
          org  = {
            id  : $scope.gov.company_id,
            name: $scope.gov.company_name
          };

          $scope.is_cba_show = true;
        }

        $scope.getNextOrg(type, org);
      };
      // 及时赋值
      $scope.params  = $scope.org;
    }
  };
}).directive('organizationStructure2', function () {
  return {
    restrict   : 'EA',
    scope      : {
      forbidden: '=forbidden',
      og       : '=',
      id       : '=',
      isbtn    : '=',
      width    : '=width',
      params   : '=params',
      send     : '&'
    },
    templateUrl: '/uib/template/fangxin/directive/org2.html',
    controller : function ($scope, $http, $timeout) {
      $scope.org        = {
        input_name2        : $scope.og,
        real_input_name    : null,
        org_name           : null,
        agent_name         : null,
        company_id         : Number(document.body.getAttribute('data-o')),
        company_big_area_id: null,
        company_area_id    : null,
        store_id           : null,
        store_group_id     : null,
        agent_id           : null
      };
      $scope.isShow     = function () {
        $scope.is_show = true;
      };
      $scope.close      = function () {
        $scope.is_show = false;
      };
      $scope.getNextOrg = function (type, org, index) {
        $http.get('/api/common/org?type=' + type + '&id=' + org.id).then(function (result) {
          if (type == 'company_big_area') {
            $scope.companyBigArea = result.data;
          } else if (type == 'company_area') {
            $scope.companyArea             = result.data;
            $scope.org.company_big_area_id = org.id;
            $scope.org.real_input_name     = org.name;
            $scope.org.org_name            = org.name;
            $scope.city                    = org.name;
            $scope.org.agent_name          = null;
            $scope.cba_index               = index;
            $scope.ca_index                = null;
            $scope.s_index                 = null;
            $scope.sg_index                = null;
            $scope.a_index                 = null;
            $scope.org.company_area_id     = null;
            $scope.org.store_id            = null;
            $scope.org.store_group_id      = null;
            $scope.org.agent_id            = null;

            $scope.is_ca_show = true;
            $scope.is_s_show  = false;
            $scope.is_sg_show = false;
            $scope.is_a_show  = false;

          } else if (type == 'store') {
            $scope.store               = result.data;
            $scope.org.company_area_id = org.id;
            $scope.org.org_name        = org.name;
            $scope.org.org_name2       = org.name;
            $scope.org.agent_name      = org.name;
            $scope.org.real_input_name = $scope.city + '／' + $scope.org.agent_name;
            $scope.ca_index            = index;
            $scope.s_index             = null;
            $scope.sg_index            = null;
            $scope.a_index             = null;
            $scope.org.store_id        = null;
            $scope.org.store_group_id  = null;
            $scope.org.agent_id        = null;

            $scope.is_s_show  = true;
            $scope.is_sg_show = false;
            $scope.is_a_show  = false;
          } else if (type == 'store_group') {
            $scope.storeGroups         = result.data.storeGroups;
            $scope.agents              = result.data.agents;
            $scope.org.store_id        = org.id;
            $scope.org.org_name        = org.name;
            $scope.org.agent_name      = org.name;
            $scope.org.real_input_name = $scope.org.org_name2 + '/' + $scope.org.agent_name;
            $scope.store_name          = org.name;
            $scope.s_index             = index;
            $scope.sg_index            = null;
            $scope.a_index             = null;
            $scope.org.store_group_id  = null;
            $scope.org.agent_id        = null;

            $scope.is_sg_show = true;
            $scope.is_a_show  = true;

          } else if (type == 'agent') {
            $scope.agents              = result.data;
            $scope.org.store_group_id  = org.id;
            $scope.org.agent_name      = org.name;
            $scope.org.real_input_name = $scope.store_name + '/' + org.name + '/' + $scope.org.agent_name;
            $scope.org.org_name        = $scope.store_name + '/' + org.name;
            $scope.store_group_name    = org.name;
            $scope.sg_index            = index;
            $scope.a_index             = null;
            $scope.org.agent_id        = null;
          } else {
            $scope.a_index             = index;
            $scope.org.agent_id        = org.id;
            $scope.org.store_group_id  = org.store_group_id;
            $scope.org.store_id        = org.store_id;
            $scope.org.agent_name      = org.name;
            $scope.org.org_name        = org.org_name;
            $scope.org.real_input_name = org.org_name + '/' + org.name;

            if ($scope.storeGroups.length) {
              angular.forEach($scope.storeGroups, function (val, key) {
                if (val.id == org.store_group_id) {
                  $scope.sg_index = key;
                }
              })
            }

          }
          //单向绑定
          $scope.params = $scope.org;
        });
      };

      if ($scope.id != undefined) {
        $http.get('/api/common/agent-org/' + $scope.id).then(function (result) {
          $scope.org.input_name = result.data;
        });
      }
      $scope.done    = function () {
        //触发回调
        $scope.org.input_name2 = $scope.org.real_input_name;
        $scope.send();
        $scope.close();
      };
      $scope.running = function () {
        $scope.getNextOrg('company_big_area', {});
      };
      $scope.running();
    }
  };
}).directive('organizationStructure3', function () {
  return {
    restrict   : 'EA',
    scope      : {
      forbidden: '=forbidden',
      og       : '=',
      id       : '=',
      isbtn    : '=',
      width    : '=width',
      params   : '=params',
      send     : '&'
    },
    templateUrl: '/uib/template/fangxin/directive/org-group.html',
    controller : function ($scope, $http, $timeout) {
      $scope.org        = {
        input_name         : $scope.og,
        real_input_name    : null,
        org_name           : null,
        agent_name         : null,
        company_id         : Number(document.body.getAttribute('data-o')),
        company_big_area_id: null,
        company_area_id    : null,
        store_id           : null,
        store_group_id     : null,
        agent_id           : null
      };
      $scope.isShow     = function () {
        $scope.is_show = true;
      };
      $scope.close      = function () {
        $scope.is_show = false;
      };
      $scope.getNextOrg = function (type, org, index) {
        $http.get('/api/common/org?type=' + type + '&id=' + org.id).then(function (result) {
          if (type == 'company_big_area') {
            $scope.companyBigArea = result.data;
          } else if (type == 'company_area') {
            $scope.companyArea             = result.data;
            $scope.org.company_big_area_id = org.id;
            $scope.org.real_input_name     = org.name;
            $scope.org.org_name            = org.name;
            $scope.city                    = org.name;
            $scope.org.agent_name          = null;
            $scope.cba_index               = index;
            $scope.ca_index                = null;
            $scope.s_index                 = null;
            $scope.sg_index                = null;
            $scope.a_index                 = null;
            $scope.org.company_area_id     = null;
            $scope.org.store_id            = null;
            $scope.org.store_group_id      = null;
            $scope.org.agent_id            = null;

            $scope.is_ca_show = true;
            $scope.is_s_show  = false;
            $scope.is_sg_show = false;
            $scope.is_a_show  = false;

          } else if (type == 'store') {
            $scope.store               = result.data;
            $scope.org.company_area_id = org.id;
            $scope.org.org_name        = org.name;
            $scope.org.agent_name      = org.name;
            $scope.org.real_input_name = $scope.city + '／' + $scope.org.agent_name;
            $scope.ca_index            = index;
            $scope.s_index             = null;
            $scope.sg_index            = null;
            $scope.a_index             = null;
            $scope.org.store_id        = null;
            $scope.org.store_group_id  = null;
            $scope.org.agent_id        = null;

            $scope.is_s_show  = true;
            $scope.is_sg_show = false;
            $scope.is_a_show  = false;
          } else if (type == 'store_group') {
            $scope.storeGroups         = result.data.storeGroups;
            $scope.agents              = result.data.agents;
            $scope.org.store_id        = org.id;
            $scope.org.org_name        = org.name;
            $scope.org.agent_name      = org.name;
            $scope.org.real_input_name = $scope.org.real_input_name + '/' + $scope.org.org_name;
            $scope.store_name          = org.name;
            $scope.s_index             = index;
            $scope.sg_index            = null;
            $scope.a_index             = null;
            $scope.org.store_group_id  = null;
            $scope.org.agent_id        = null;

            $scope.is_sg_show = true;
            $scope.is_a_show  = true;

          } else if (type == 'agent') {
            $scope.agents              = result.data;
            $scope.org.store_group_id  = org.id;
            $scope.org.agent_name      = org.name;
            $scope.org.real_input_name = $scope.org.real_input_name + '/' + org.name;
            $scope.org.org_name        = $scope.store_name + '/' + org.name;
            $scope.store_group_name    = org.name;
            $scope.sg_index            = index;
            $scope.a_index             = null;
            $scope.org.agent_id        = null;
          } else {
            $scope.a_index             = index;
            $scope.org.agent_id        = org.id;
            $scope.org.store_group_id  = org.store_group_id;
            $scope.org.store_id        = org.store_id;
            $scope.org.agent_name      = org.name;
            $scope.org.org_name        = org.org_name;
            $scope.org.real_input_name = org.org_name + '/' + org.name;

            if ($scope.storeGroups.length) {
              angular.forEach($scope.storeGroups, function (val, key) {
                if (val.id == org.store_group_id) {
                  $scope.sg_index = key;
                }
              })
            }

          }
          //单向绑定
          $scope.params = $scope.org;
        });
      };

      if ($scope.id != undefined) {
        $http.get('/api/common/agent-org/' + $scope.id).then(function (result) {
          $scope.org.input_name = result.data;
        });
      }
      $scope.done    = function () {
        //触发回调
        $scope.org.input_name = $scope.org.real_input_name;
        $scope.send();
        $scope.close();
      };
      $scope.running = function () {
        $scope.getNextOrg('company_big_area', {});
      };
      $scope.running();
    }
  };
}).directive('orgStructureGov', function () {
  return {
    restrict   : 'EA',
    scope      : {
      forbidden: '=forbidden',
      og       : '=',
      gov      : '=',
      set      : '=',
      id       : '=',
      width    : '=width',
      params   : '=params',
      send     : '&'
    },
    templateUrl: '/uib/template/fangxin/directive/org-gov.html',
    controller : function ($scope, $http, $timeout) {
      $scope.org     = {
        input_name         : $scope.og,
        real_input_name    : null,
        org_name           : null,
        agent_name         : null,
        company_id         : Number(document.body.getAttribute('data-o')),
        company_big_area_id: null,
        company_area_id    : null,
        store_id           : null,
        store_group_id     : null,
        agent_id           : null
      };
      $scope.orgtype = 'company_big_area';
      $scope.orgdata = {};
      var setting    = [];
      if (!$.isEmptyObject($scope.set)) {
        if ($scope.set.setting) setting = $scope.set.setting;
      }
      if (!$.isEmptyObject($scope.gov)) {
        $scope.org.company_big_area_id = $scope.gov.company_big_area_id;
        $scope.org.company_area_id     = $scope.gov.company_area_id;
        $scope.org.store_id            = $scope.gov.store_id;
        $scope.org.store_group_id      = $scope.gov.store_group_id;

        if ($scope.gov.setting) setting = $scope.gov.setting;
        console.log($scope.gov);
        if ($scope.gov.roler.company) {
          $scope.orgtype      = 'company_big_area';
          $scope.orgid        = '';
          $scope.orgdata.name = setting[0] ? setting[0] : '公司公客';
          $scope.gov.roler_id = 5;
        }
        if ($scope.gov.roler.company_big_area) {
          $scope.orgtype      = 'company_area';
          $scope.orgid        = $scope.gov.company_big_area_id;
          $scope.orgdata.name = $scope.gov.company_big_area_name;
          $scope.gov.roler_id = 4;
        }
        if ($scope.gov.roler.company_area) {
          $scope.orgtype      = 'store';
          $scope.orgid        = $scope.gov.company_area_id;
          $scope.orgdata.name = $scope.gov.company_area_name;
          $scope.gov.roler_id = 3;
        }
        if ($scope.gov.roler.store) {
          $scope.orgtype      = 'store_group';
          $scope.orgid        = $scope.gov.store_id;
          $scope.orgdata.name = $scope.gov.store_name;
          $scope.gov.roler_id = 2;
        }
        if ($scope.gov.roler.store_group) {
          $scope.orgtype      = 'agent';
          $scope.orgid        = $scope.gov.store_group_id;
          $scope.orgdata.name = $scope.gov.group_name;
          $scope.gov.roler_id = 1;
        }
      } else {
        $scope.gov          = {};
        $scope.gov.roler_id = 6;
      }
      $scope.orgdata.id = $scope.orgid;
      $scope.orgwith    = $scope.gov.roler_id * 105 + 5;
      $scope.isShow     = function () {
        $scope.is_show     = true;
        $scope.companyArea = [];
        $scope.store       = [];
        $scope.storeGroups = [];
        $scope.agents      = [];
        $scope.is_ca_show  = false;
        $scope.is_s_show   = false;
        $scope.is_sg_show  = false;
        $scope.is_a_show   = false;
        $scope.getNextOrg($scope.orgtype, $scope.orgdata);
      };
      $scope.close      = function () {
        $scope.is_show = false;
      };
      $scope.getNextOrg = function (type, org, index) {
        $http.get('/api/common/org?type=' + type + '&id=' + (org.id ? org.id : '')).then(function (result) {
          if (type == 'company_big_area') {
            $scope.companyBigArea          = result.data;
            $scope.org.real_input_name     = org.name;
            $scope.org.org_name            = org.name;
            $scope.org.company_big_area_id = null;
            $scope.org.company_area_id     = null;
            $scope.org.store_id            = null;
            $scope.org.store_group_id      = null;
            $scope.org.agent_id            = null;
            $scope.cba_index               = null;
            $scope.ca_index                = null;
            $scope.s_index                 = null;
            $scope.sg_index                = null;
            $scope.a_index                 = null;

          } else if (type == 'company_area') {
            $scope.companyArea             = result.data;
            $scope.org.company_big_area_id = org.id;
            $scope.org.agent_name          = setting[1] ? setting[1] : '大区公客';
            $scope.org.real_input_name     = org.name + $scope.org.agent_name;
            $scope.org.org_name            = org.name;
            $scope.org.agent_name          = null;
            $scope.cba_index               = index;
            $scope.ca_index                = null;
            $scope.s_index                 = null;
            $scope.sg_index                = null;
            $scope.a_index                 = null;
            $scope.org.company_area_id     = null;
            $scope.org.store_id            = null;
            $scope.org.store_group_id      = null;
            $scope.org.agent_id            = null;

            $scope.is_ca_show = true;
            $scope.is_s_show  = false;
            $scope.is_sg_show = false;
            $scope.is_a_show  = false;

          } else if (type == 'store') {
            $scope.store               = result.data;
            $scope.org.company_area_id = org.id;
            $scope.org.org_name        = org.name;
            $scope.org.agent_name      = setting[2] ? setting[2] : '区公客';
            $scope.org.real_input_name = org.name + '' + $scope.org.agent_name;
            $scope.ca_index            = index;
            $scope.s_index             = null;
            $scope.sg_index            = null;
            $scope.a_index             = null;
            $scope.org.store_id        = null;
            $scope.org.store_group_id  = null;
            $scope.org.agent_id        = null;

            $scope.is_s_show  = true;
            $scope.is_sg_show = false;
            $scope.is_a_show  = false;
          } else if (type == 'store_group') {
            $scope.storeGroups         = result.data.storeGroups;
            $scope.agents              = result.data.agents;
            $scope.org.store_id        = org.id;
            $scope.org.org_name        = org.name;
            $scope.org.agent_name      = setting[3] ? setting[3] : '店公客';
            $scope.org.real_input_name = org.name + '' + $scope.org.agent_name;
            $scope.store_name          = org.name;
            $scope.s_index             = index;
            $scope.sg_index            = null;
            $scope.a_index             = null;
            $scope.org.store_group_id  = null;
            $scope.org.agent_id        = null;

            $scope.is_sg_show = true;
            $scope.is_a_show  = true;

          } else if (type == 'agent') {
            $scope.agents         = result.data;
            $scope.org.agent_name = setting[4] ? setting[4] : '组公客';
            if ($scope.store_name == undefined) {
              $scope.store_name = $scope.gov.store_name;
            }
            $scope.org.store_group_id  = org.id;
            $scope.org.real_input_name = $scope.store_name + '/' + org.name + '' + $scope.org.agent_name;
            $scope.org.org_name        = $scope.store_name + '/' + org.name;
            $scope.store_group_name    = org.name;
            $scope.sg_index            = index;
            $scope.a_index             = null;
            $scope.org.agent_id        = null;

            $scope.is_a_show = true;
          } else {
            $scope.a_index             = index;
            $scope.org.agent_id        = org.id;
            $scope.org.store_group_id  = org.store_group_id;
            $scope.org.store_id        = org.store_id;
            $scope.org.agent_name      = org.name;
            $scope.org.org_name        = org.org_name;
            $scope.org.real_input_name = org.org_name + '/' + org.name;
            //$scope.sg_index            = index;
            if ($scope.storeGroups && $scope.storeGroups.length) {
              angular.forEach($scope.storeGroups, function (val, key) {
                if (val.id == org.store_group_id) {
                  $scope.sg_index = key;
                }
              })
            }
          }
          //单向绑定
          $scope.params = $scope.org;
        });
      };

      if ($scope.id != undefined) {
        $http.get('/api/common/agent-org/' + $scope.id).then(function (result) {
          $scope.org.input_name = result.data;
        });
      }
      $scope.done    = function () {
        //触发回调
        $scope.org.input_name = $scope.org.real_input_name;
        $scope.send();
        $scope.close();
      };
      $scope.running = function () {
        // $scope.getNextOrg($scope.orgtype, $scope.orgdata);
      };
      $scope.running();
    }
  };
})
  .directive('setTagList', function () {           //系统设置添加自定义标签
    return {
      restrict   : 'EA',
      templateUrl: '/uib/template/fangxin/directive/set-tag.html',
      scope      : {
        tag : '=ngModel',
        max : '=?',
        key : '=',
        type: '='
      },
      replace    : true,
      controller : function ($scope, $http) {
        $scope.newTag    = '';
        $scope.selectNum = -1;

        $scope.addTags = function (e) {
          if (e.type == "click" || e.keyCode == 13) {
            if ($scope.newTag == '0') {
              //输入0的时候前端可以保存，但是进入接口的时候会解析为false，在这里限制不让输入0
              $scope.newTag = '';
            }
            if ($scope.newTag != '' && $scope.newTag != null) {
              if ($scope.newTag.length < 1 || $scope.newTag.length > 6) {
                Message.warning('配置项限制在1-6个字符');
                return false;
              }

              $scope.isExists = false;
              angular.forEach($scope.tag, function (tag_val) {
                if (tag_val.toUpperCase() == $scope.newTag.toUpperCase()) {
                  $scope.isExists = true
                }
              });

              if (!$scope.isExists) {
                $scope.tag.push($scope.newTag);
                $scope.newTag = '';
              } else {
                Message.warning('该项已经存在！');
              }
            }
          }
        };

        $scope.selectVal = '';
        $scope.editTag   = function (index) {
          $scope.selectNum = index;
          $scope.selectVal = angular.copy($scope.tag[index]);
        };

        $scope.saveTag = function (e, index, selectVal) {
          if ((e.type == "click" || e.keyCode == 13)) {
            if (selectVal.length < 1 || selectVal.length > 6) {
              Message.warning('配置项限制在1-6个字符');
              return false;
            }

            $scope.isExists = false;
            angular.forEach($scope.tag, function (tag_val, i) {
              if (tag_val.toUpperCase() == selectVal.toUpperCase() && index != i) {
                $scope.isExists = true
              }
            });

            if ($scope.isExists) {
              Message.warning('该项已经存在！');
              return false;
            }

            $scope.params = {
              key    : $scope.key,
              val    : $scope.tag[index],
              new_val: selectVal,
              index  : index,
              type   : $scope.type
            };

            $scope.updateData($scope.params);
          }
        };

        $scope.delTag = function (index) {
          swal({
              title             : '确定要删除该项吗？',
              text              : '如果删除，将不能恢复!',
              type              : "warning",
              showCancelButton  : true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText : "确定",
              cancelButtonText  : "取消"
            },
            function (isConfirm) {
              if (isConfirm) {
                swal.close();

                $scope.params = {
                  key    : $scope.key,
                  val    : $scope.tag[index],
                  new_val: '',
                  index  : index,
                  type   : $scope.type
                };

                $scope.updateData($scope.params);
              }
            });
        };

        $scope.updateData = function (params) {
          $.loading.show();
          $http.get('/api/setting/set-val?' + $.param(params)).then(function (result) {
            $scope.status    = result.data.status;
            $scope.tipsTitle = params.new_val == '' ? '删除' : '更新';

            if ($scope.status == 'exists') {
              Message.warning('该项已经使用，禁止删除');
            } else if ($scope.status == 'success') {
              Message.success($scope.tipsTitle + '成功！');

              if (params.new_val != '') {
                $scope.tag[params.index] = params.new_val;
                $scope.newTag            = '';
                $scope.selectNum         = -1;
              } else {
                $scope.tag.splice(params.index, 1);
              }
            } else {
              Message.warning($scope.tipsTitle + '失败！');
            }
          }, function (error) {
            Message.error(error);
          }).finally(function () {
            $.loading.hide();
          });
        }
      }
    };
  })
  .directive('newType', function () {           //系统设置添加自定义标签
    return {
      restrict   : 'EA',
      templateUrl: '/uib/template/fangxin/directive/warrant-setting.html',
      scope      : {
        tag        : '=ngModel',
        category   : '@?',
        onCallBack : '&?',
        editable   : '@?',
        state      : '@?',
        onDelFilter: '&?'
      },
      replace    : true,
      link       : function (scope, element, attributes) {
        scope.selectNum = '-1';
        scope.addBox    = true;
        scope.newTage   = '';
        scope.addTags   = function (e) {
          var keycode  = window.event ? e.keyCode : e.which;
          scope.cancel = false;
          if (e.type == "click" || keycode == 13) {
            if (scope.tag.length > 0) {
              angular.forEach(scope.tag, function (val, index) {
                if (val.name == undefined) {
                  if (val == scope.newTage) {
                    Message.warning('不能设置相同的类型');
                    scope.cancel = true;
                  } else {
                    scope.tagName = scope.newTage;
                  }
                } else if (val.name == scope.newTage) {
                  Message.warning('不能设置相同的类型');
                  scope.cancel = true;
                } else {
                  scope.tagName = scope.newTage;
                }
              });
            } else {
              scope.tagName = scope.newTage;
            }

            if (scope.cancel || !scope.newTage) {
              return;
            }
            scope.tag.push(scope.tagName);
            scope.newTage = '';
            if (scope.category) {
              scope.onCallBack({
                data: scope.tag,
                type: scope.category
              });
            } else {
              scope.onCallBack({
                data: scope.tag
              });
            }

          }
        };
        scope.delTags   = function (index) {
          //如果定义了过滤器，则直接执行过滤器
          if (angular.isDefined(scope.onDelFilter)) {
            scope.onDelFilter({
              type : scope.state,
              index: index
            });
          } else {
            scope.tag.splice(index, 1);
          }
        };

        scope.edit = function (data, index2) {
          if (angular.isUndefined(scope.editable) || (scope.editable == 'true')) {
            scope.selectNum = index2;
            scope.addBox    = false;
            angular.forEach(data, function (val, index) {
              if (val.name == undefined) {
                scope.selectTag = data[index2];
              } else {
                scope.selectTag = data[index2].name;
              }
            });
          }
        };
        scope.ok   = function (e, data, index2, name2) {
          scope.cancel = false;
          var keycode  = window.event ? e.keyCode : e.which;
          if (e.type == "click" || keycode == 13) {
            if (scope.selectTag) {
              angular.forEach(data, function (val, index) {
                if (val.name == undefined) {
                  data[index2]    = name2;
                  scope.selectNum = '-1';
                  scope.addBox    = true;
                } else {
                  data[index2].name = name2;
                  scope.selectNum   = '-1';
                  scope.addBox      = true;
                }
              });

            } else {
              Message.warning('编辑项不能为空');
            }
          }
        }
      }
    };
  })
  .directive('tagList', function () {           //系统设置添加自定义标签
    return {
      restrict   : 'EA',
      templateUrl: '/uib/template/fangxin/directive/tag.html',
      scope      : {
        tag           : '=ngModel',
        max           : '=?',
        category      : '@?',
        onRatingSelect: '&?',
        editable      : '@?',
        state         : '@?',
        onDelFilter   : '&?',
        onEditBack    : '&?'
      },
      replace    : true,
      link       : function (scope, element, attributes) {
        scope.selectNum = '-1';
        scope.addBox    = true;
        scope.newTage   = '';
        scope.addTags   = function (e) {
          var keycode  = window.event ? e.keyCode : e.which;
          scope.cancel = false;
          if (e.type == "click" || keycode == 13) {
            if (scope.tag.length != 0) {
              angular.forEach(scope.tag, function (val, index) {
                if (val.name == undefined) {
                  if (val == scope.newTage) {
                    Message.warning('不能设置相同的类型');
                    scope.cancel = true;
                  } else {
                    scope.tagName = scope.newTage;
                  }
                } else if (val.name == scope.newTage) {
                  Message.warning('不能设置相同的类型');
                  scope.cancel = true;
                } else {
                  scope.tagName = {
                    name: scope.newTage,
                    rate: 0
                  };
                }
              });
            } else {
              scope.tagName = scope.newTage;
            }

            if (scope.cancel || !scope.newTage) {
              return;
            }
            scope.tag.push(scope.tagName);
            scope.newTage = '';
            if (scope.category) {
              scope.onRatingSelect({
                data: scope.tag,
                type: scope.category
              });
            } else {
              scope.onRatingSelect({
                data: scope.tag
              });
            }

          }
        };
        scope.delTags   = function (index) {
          //如果定义了过滤器，则直接执行过滤器
          if (angular.isDefined(scope.onDelFilter)) {
            scope.onDelFilter({
              type : scope.state,
              index: index
            });
          } else {
            scope.tag.splice(index, 1);
            scope.onRatingSelect({
              data: scope.tag
            });
          }
        };

        scope.edit = function (data, index2) {
          if (angular.isUndefined(scope.editable) || (scope.editable == 'true')) {
            scope.selectNum = index2;
            scope.addBox    = false;
            angular.forEach(data, function (val, index) {
              if (val.name == undefined) {
                scope.selectTag = angular.copy(data[index2]);
                scope.oldVal    = angular.copy(data[index2]);
              } else {
                scope.selectTag = angular.copy(data[index2].name);
              }
            });
          }
        };
        scope.ok   = function (e, data, index2, name2) {
          scope.cancel = false;
          var keycode  = window.event ? e.keyCode : e.which;
          if (e.type == "click" || keycode == 13) {
            if (name2 == "") {
              Message.warning('编辑内容不能为空!');
              return false;
            }
            if (scope.selectTag) {
              angular.forEach(data, function (val, index) {
                if (index == index2) return false;
                if (index == index2) return false;
                if (val.name == undefined) {
                  if (name2 == val) {
                    scope.back      = false;
                    scope.selectNum = index2;
                    scope.addBox    = false;
                    Message.warning('不能设置相同的类型');
                    return false;
                  } else {
                    scope.back      = true;
                    data[index2]    = name2;
                    scope.newVal    = name2;
                    scope.selectNum = '-1';
                    scope.addBox    = true;
                  }
                } else {
                  data[index2].name = name2;
                  scope.selectNum   = '-1';
                  scope.addBox      = true;
                }
              });
              if (scope.onEditBack && scope.back) {
                scope.onEditBack({
                  newVal: scope.newVal,
                  oldVal: scope.oldVal
                });
              }

            } else {
              Message.warning('编辑项不能为空');
            }
          }
        }
      }
    };
  }).directive('ckEditor', function () {
  return {
    require: '?ngModel',
    link   : function (scope, elm, attr, ngModel) {
      // if (attr.editor == 'false') {
      //   var ck = CKEDITOR.replace('ckeditor', {
      //     removePlugins: 'toolbar'
      //   })
      // } else {
      //   var ck = CKEDITOR.replace('ckeditor');
      // }
      var ck = CKEDITOR.replace('ckeditor');
      if (!ngModel) return;

      function updateModel() {
        scope.$apply(function () {
          ngModel.$setViewValue(ck.getData());
        });
      }

      ck.on('instanceReady', function () {
        ck.setData(ngModel.$viewValue);
        // if (attr.editor == 'false') {
        //   ck.setReadOnly(true); //只读
        // }
      });
      ck.on('change', updateModel);

      ngModel.$render = function (value) {
        ck.setData(ngModel.$viewValue);
      };
    }
  };
}).directive('resize', function ($window) {
  return function (scope, element) {
    var w = angular.element($window);
    console.log(w);
    scope.getWindowDimensions = function () {
      return {'h': w.height(), 'w': w.width()};
    };
    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
      scope.windowHeight = newValue.h;
      scope.windowWidth  = newValue.w;

      scope.style = function (val) {
        if (val) {
          return {
            'height'    : (newValue.h - val) + 'px',
            'overflow-y': 'auto'
            // 'height': (newValue.h - 120) + 'px',
            // 'width' : (newValue.w - 100) + 'px'
          };
        } else {
          return {
            'height'    : (newValue.h - 188) + 'px',
            'overflow-y': 'auto'
            // 'height': (newValue.h - 120) + 'px',
            // 'width' : (newValue.w - 100) + 'px'
          };
        }
      };

    }, true);

    w.bind('resize', function () {
      scope.$apply();
    });
  }
}).directive('salaryResize', function ($window) {
  return function (scope, element) {
    var w = angular.element($window);
    console.log(w);
    scope.getWindowDimensions = function () {
      return {'h': w.height(), 'w': w.width()};
    };
    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
      scope.windowHeight = newValue.h;
      scope.windowWidth  = newValue.w;

      scope.style = function (val) {
        if (val) {
          return {
            'height'    : (newValue.h - val) + 'px',
            'overflow-y': 'scroll'
            // 'height': (newValue.h - 120) + 'px',
            // 'width' : (newValue.w - 100) + 'px'
          };
        } else {
          return {
            'height'    : (newValue.h - 188) + 'px',
            'overflow-y': 'scroll'
            // 'height': (newValue.h - 120) + 'px',
            // 'width' : (newValue.w - 100) + 'px'
          };
        }
      };

    }, true);

    w.bind('resize', function () {
      scope.$apply();
    });
  }
})
  .directive('warrant', function ($window) {
    return function (scope, element) {
      var w                     = angular.element($window);
      scope.getWindowDimensions = function () {
        return {'h': w.height(), 'w': w.width()};
      };
      scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
        scope.windowHeight = newValue.h;
        scope.windowWidth  = newValue.w;
        scope.style        = function (data) {
          if (data) {
            return {
              'height'    : (newValue.h - 138 - data) + 'px',
              'overflow-y': 'auto'
              // 'height': (newValue.h - 120) + 'px',
              // 'width' : (newValue.w - 100) + 'px'
            };
          } else {
            return {
              'height'    : (newValue.h - 138) + 'px',
              'overflow-y': 'auto'
              // 'height': (newValue.h - 120) + 'px',
              // 'width' : (newValue.w - 100) + 'px'
            };
          }
        };

      }, true);

      w.bind('warrant', function () {
        scope.$apply();
      });
    }
  }).directive('superOrg', function () {
  return {
    restrict   : 'AE',
    scope      : {
      org     : '=org',
      node    : '=?',
      agent   : '=?',
      full    : '=?',
      width   : '=?',
      read    : '=?',
      callback: '&?',
      clear   : '&?',
      fired   : '=?'
    },
    transclude : true,
    templateUrl: '/uib/template/fangxin/directive/super-org.html',
    controller : function ($scope, $timeout, $http) {
      $scope.show_dropdown_tree = false;
      $scope.departments        = [];
      $scope.selectAgent        = {};
      $scope.me                 = {};
      $scope.disabled           = true;
      if ($scope.read == true) {
        $scope.disabled = true;
      }
      $scope.getDepartment   = function () {
        if ($scope.disabled) {
          return false;
        }
        $scope.show_dropdown_tree = !$scope.show_dropdown_tree;
        $scope.autoBind();
      };
      $scope.closeDepartment = function () {
        $scope.show_dropdown_tree = false;
      };

      $scope.getSelected = function (node) {
        $scope.selectedNode = node;
        $scope.path         = node.path;
        $scope.node         = node;
        $scope.org_name     = node.name;

        if ($scope.org.is_agent) {
          $scope.getAgents(true);
        }
        $scope.callback({data: $scope.node});

        angular.element(document.getElementById('org_name')).val($scope.org_name);
        $scope.expandedNodes      = [];
        $scope.show_dropdown_tree = false;
      };

      $scope.treeOptions = {
        nodeChildren: "children"
      };
      $scope.autoBind    = function () {
        $scope.expandedNodes = [];
        if ($scope.path !== undefined && angular.isString($scope.path)) {
          $scope.path = $scope.path.substring(0, $scope.path.length - 1).split('-');
          if ($scope.path.length) {
            angular.forEach($scope.path, function (v, k) {
              if (k === 0) {
                $scope.expandedNodes.push($scope.departments[k]);
              } else {
                var lastNode = $scope.expandedNodes[$scope.expandedNodes.length - 1];
                if (lastNode) {
                  if (lastNode.children.length) {
                    $scope.expandedNodes.push(lastNode.children[_.findIndex(lastNode.children, {id: parseInt(v)})]);
                  }
                }
              }
            });
            $scope.selectedNode = $scope.expandedNodes[$scope.expandedNodes.length - 1];
          }
        }
      };
      var allNodes       = [];
      $scope.searchName  = function () {
        addToAllNodes($scope.departments);
        $timeout(function () {
          $scope.expandedNodes = allNodes;
        }, 3000);
      };

      function addToAllNodes(children) {
        if (!children || typeof(children) == "array" && children.length == 0) {
          return;
        }
        for (var i = 0; i < children.length; i++) {
          allNodes.push(children[i]);
          addToAllNodes(children[i].children);
        }
      }

      $scope.getAgents = function (is_clear) {
        $scope.search = {
          org_x: $scope.path
        };
        if ($scope.fired) {
          $scope.search.fired = 1;
        }
        $http.get('/api/widget/agent?' + $.param($scope.search)).then(function (result) {
          $scope.agents = result.data;
        }).finally(function () {
          if (is_clear) {
            $scope.me.selected = null;
            $scope.setAgent();
          } else {
            $scope.me.selected = $scope.selectAgent;
            $scope.setAgent();
          }
        });
        $scope.disabled = false;
      };

      $scope.setAgent = function () {
        $scope.agent = $scope.me.selected;
      };

      $scope.running = function () {
        $scope.bodyPath = $("body").data("xx");
        if ($scope.org.roler_id == '7') {
          $scope.path = $('body').data('xx');
          $http.get('/api/widget/get-org-x?' + $.param({org_x: $scope.path})).then(function (org) {
            $scope.org_name = org.data.name;
          }).finally(function () {
            $scope.promise = $http.get('/api/organization/org-tree');
            $scope.promise.then(function (result) {
              $scope.departments = result.data;
            }).finally(function () {
              $scope.is_agent = $scope.org.is_agent ? $scope.org.is_agent : false;
              if ($scope.is_agent) {
                $scope.getAgents(true);
              } else {
                if ($scope.read == true) {
                  $scope.disabled = true;
                }else {
                  $scope.disabled = false;
                }
              }
            });
          });
        } else {
          if ($scope.org.agent_id) {
            $http.get('/api/organization/find-agent/' + $scope.org.agent_id).then(function (agent) {
              $scope.org_name    = agent.data.org_name;
              $scope.path        = agent.data.org_x;
              $scope.selectAgent = agent.data;
            }).finally(function () {
              $http.get('/api/organization/org-tree').then(function (result) {
                $scope.departments = result.data;
              }).finally(function () {
                $scope.is_agent = $scope.org.is_agent || false;
              });
              $scope.getAgents();
            });
          } else {
            if ($scope.full) {
              if ($scope.org.org_x) {
                //可能是公盘 ，需要赋org_x的值
                $scope.path = $scope.org.org_x;
              } else {
                $scope.path = $('body').data('xx');
              }

              $http.get('/api/widget/get-org-x?' + $.param({org_x: $scope.path})).then(function (org) {
                $scope.org_name = org.data.name;
              }).finally(function () {
                $scope.promise = $http.get('/api/organization/org-tree');
                $scope.promise.then(function (result) {
                  $scope.departments = result.data;
                }).finally(function () {
                  $scope.is_agent = $scope.org.is_agent ? $scope.org.is_agent : false;
                  if ($scope.is_agent) {
                    $scope.getAgents(true);
                  } else {
                    if ($scope.read == true) {
                      $scope.disabled = true;
                    }else {
                      $scope.disabled = false;
                    }
                  }
                });
              });
            } else {
              $scope.path = $scope.org.org_x ? $scope.org.org_x : $("body").data('ph');
              $http.get('/api/widget/get-org-x?' + $.param({org_x: $scope.path})).then(function (org) {
                $scope.org_name = org.data.name;
              }).finally(function () {
                $scope.promise = $http.get('/api/organization/org-tree?org_x=' + $scope.path);
                $scope.promise.then(function (result) {
                  $scope.departments = result.data;
                }).finally(function () {
                  $scope.is_agent = $scope.org.is_agent ? $scope.org.is_agent : false;
                  if ($scope.is_agent) {
                    $scope.getAgents(true);
                  } else {
                    if ($scope.read == true) {
                      $scope.disabled = true;
                    }else {
                      $scope.disabled = false;
                    }
                  }
                });
              });
            }
          }
        }

      };
      $scope.clear   = function () {
        $scope.org.agent_id = null;
        $scope.node         = null;
        $scope.me.selected  = null;
        $scope.setAgent();
        $scope.running();
      };
      $scope.running();
    },
    link       : function (scope) {
      angular.element($('.searchdroplist-clear')).bind("click", function () {
        scope.$apply(scope.clear);
      });
      scope.$watch('org', function (newVal, oldVal) {
        if (newVal != oldVal) {
          scope.running();
        }
      }, true);
    }
  }
}).directive('authOrg', function () {
  return {
    restrict   : 'AE',
    scope      : {
      org     : '=',
      node    : '=?',
      agent   : '=?',
      full    : '=?',
      width   : '=?',
      read    : '=?',
      callback: '&?',
      clear   : '&?'
    },
    transclude : true,
    templateUrl: '/uib/template/fangxin/directive/auth-org.html',
    controller : function ($scope, $timeout, $http) {
      $scope.show_dropdown_tree = false;
      $scope.departments        = [];
      $scope.selectAgent        = {};
      $scope.me                 = {};
      $scope.disabled           = false;
      if ($scope.read.open) {
        if (!$scope.org.agent_id) {
          $scope.me.selected = $scope.read.lander;
          $scope.agent       = $scope.read.lander;
        }
        $scope.disabled = true;
      }
      $scope.getDepartment   = function () {
        if ($scope.disabled) {
          return false;
        }
        $scope.show_dropdown_tree = !$scope.show_dropdown_tree;
        $scope.autoBind();
      };
      $scope.closeDepartment = function () {
        $scope.show_dropdown_tree = false;
      };

      $scope.getSelected = function (node) {
        $scope.selectedNode = node;
        $scope.path         = node.path;
        $scope.node         = node;
        $scope.org_name     = node.name;
        if ($scope.org.is_agent) {
          $scope.getAgents(node, true);
        }
        $scope.callback({data: $scope.node});

        angular.element(document.getElementById('org_name')).val($scope.org_name);
        $scope.expandedNodes      = [];
        $scope.show_dropdown_tree = false;
      };

      $scope.treeOptions = {
        nodeChildren: "children"
      };
      $scope.autoBind    = function () {
        $scope.expandedNodes = [];
        if ($scope.path !== undefined && angular.isString($scope.path)) {
          $scope.path = $scope.path.substring(0, $scope.path.length - 1).split('-');
          if ($scope.path.length) {
            angular.forEach($scope.path, function (v, k) {
              if (k === 0) {
                $scope.expandedNodes.push($scope.departments[k]);
              } else {
                var lastNode = $scope.expandedNodes[$scope.expandedNodes.length - 1];
                if (lastNode) {
                  if (lastNode.children.length) {
                    $scope.expandedNodes.push(lastNode.children[_.findIndex(lastNode.children, {id: parseInt(v)})]);
                  }
                }
              }
            });
            $scope.selectedNode = $scope.expandedNodes[$scope.expandedNodes.length - 1];
          }
        }
      };
      $scope.getAgents   = function (node, is_clear) {
        $scope.search = {
          org_x: $scope.path
        };
        $http.get('/api/widget/agent?' + $.param($scope.search)).then(function (result) {
          $scope.agents = result.data;
        }).finally(function () {
          if (node) {
            $scope.me.selected = null;
            $scope.setAgent();
          }
          if (!node && is_clear && $scope.org.agent_id) {
            $scope.me.selected = $scope.selectAgent;
            $scope.setAgent();
          } else if (!node && is_clear && !$scope.org.agent_id) {
            $scope.me.selected = $scope.read.lander;
            $scope.setAgent();
          }
        });
      };

      $scope.setAgent = function () {
        $scope.agent = $scope.me.selected;
      };

      $scope.running = function () {
        $scope.bodyPath = $("body").data("xx");
        if ($scope.org.agent_id) {
          $http.get('/api/organization/find-agent/' + $scope.org.agent_id).then(function (agent) {
            $scope.org_name    = agent.data.org_name;
            $scope.path        = agent.data.org_x;
            $scope.selectAgent = agent.data;
          }).finally(function () {
            $http.get('/api/organization/org-tree?org_x=' + $scope.path).then(function (result) {
              $scope.departments = result.data;
              $scope.node        = $scope.departments[0];
              $scope.callback({data: $scope.node});
            }).finally(function () {
              $scope.is_agent = $scope.org.is_agent || false;
            });
            $scope.getAgents(false, true);
          });
        } else {
          if ($scope.full) {
            $scope.path = $('body').data('xx');
            $http.get('/api/widget/get-org-x?' + $.param({org_x: $scope.path})).then(function (org) {
              $scope.org_name = org.data.name;
            }).finally(function () {
              $scope.promise = $http.get('/api/organization/org-tree');
              $scope.promise.then(function (result) {
                $scope.departments = result.data;
              }).finally(function () {
                $scope.is_agent = $scope.org.is_agent ? $scope.org.is_agent : false;
                if ($scope.is_agent) {
                  $scope.getAgents(false, true);
                }
              });
            });
          } else {
            $scope.path = $scope.org.org_x ? $scope.org.org_x : $("body").data('ph');
            $http.get('/api/widget/get-org-x?' + $.param({org_x: $scope.path})).then(function (org) {
              $scope.org_name = org.data.name;
            }).finally(function () {
              $scope.promise = $http.get('/api/organization/org-tree?org_x=' + $scope.path);
              $scope.promise.then(function (result) {
                $scope.departments = result.data;
              }).finally(function () {
                $scope.is_agent = $scope.org.is_agent ? $scope.org.is_agent : false;
                if ($scope.is_agent) {
                  $scope.getAgents(false, true);
                }
              });
            });
          }


        }
      };
      $scope.clear   = function () {
        $scope.org.agent_id = null;
        $scope.me.selected  = null;
        $scope.setAgent();
        $scope.running();
      };
      $scope.running();
    },
    link       : function (scope) {
      angular.element($('.searchdroplist-clear')).bind("click", function () {
        scope.$apply(scope.clear);
      });
    }
  }
}).directive('superOrgPermission', function () {
  return {
    restrict   : 'AE',
    scope      : {
      org       : '=',
      node      : '=?',
      agent     : '=?',
      width     : '=?',
      callback  : '&?',
      permission: '@?',
      clear     : '&?',
      fired     : '=?'
    },
    transclude : true,
    templateUrl: '/uib/template/fangxin/directive/super-org-permission.html',
    controller : function ($scope, $timeout, $http) {
      $scope.show_dropdown_tree = false;
      $scope.departments        = [];
      $scope.selectAgent        = {};
      $scope.me                 = {};
      $scope.is_hidden          = false;
      $scope.disabled           = true;
      $scope.getDepartment      = function () {
        if ($scope.disabled) {
          return false;
        }
        $scope.show_dropdown_tree = !$scope.show_dropdown_tree;
        $scope.autoBind();
      };
      $scope.closeDepartment    = function () {
        $scope.show_dropdown_tree = false;
      };

      $scope.getSelected = function (node) {
        $scope.selectedNode = node;
        $scope.path         = node.path;
        $scope.node         = node;
        $scope.org_name     = node.name;
        if ($scope.org.is_agent) {
          $scope.getAgents(true);
        }
        $scope.callback({data: $scope.node});
        angular.element(document.getElementById('org_name')).val($scope.org_name);
        $scope.expandedNodes      = [];
        $scope.show_dropdown_tree = false;
      };

      var allNodes      = [];
      $scope.searchName = function () {
        addToAllNodes($scope.departments);
        $timeout(function () {
          $scope.expandedNodes = allNodes;
        }, 3000);
      };

      function addToAllNodes(children) {
        if (!children || typeof(children) == "array" && children.length == 0) {
          return;
        }
        for (var i = 0; i < children.length; i++) {
          allNodes.push(children[i]);
          addToAllNodes(children[i].children);
        }
      }

      $scope.treeOptions = {
        nodeChildren: "children"
      };
      $scope.autoBind    = function () {
        $scope.expandedNodes = [];
        if ($scope.path !== undefined && angular.isString($scope.path)) {
          $scope.path = $scope.path.substring(0, $scope.path.length - 1).split('-');
          if ($scope.path.length) {
            angular.forEach($scope.path, function (v, k) {
              if (k === 0) {
                $scope.expandedNodes.push($scope.departments[k]);
              } else {
                var lastNode = $scope.expandedNodes[$scope.expandedNodes.length - 1];
                if (lastNode) {
                  if (lastNode.children.length) {
                    $scope.expandedNodes.push(lastNode.children[_.findIndex(lastNode.children, {id: parseInt(v)})]);
                  }
                }
              }
            });
            $scope.selectedNode = $scope.expandedNodes[$scope.expandedNodes.length - 1];
          }
        }
      };
      $scope.getAgents   = function (is_clear) {
        $scope.search = {
          org_x: $scope.path
        };
        if ($scope.fired) {
          $scope.search.fired = 1;
        }
        $http.get('/api/widget/agent?' + $.param($scope.search)).then(function (result) {
          $scope.agents = result.data;
        }).finally(function () {
          if (is_clear) {
            $scope.me.selected = null;
            $scope.setAgent();
          } else {
            $scope.me.selected = $scope.selectAgent;
            $scope.setAgent();
          }
          $scope.disabled = false;
        });
      };

      $scope.setAgent = function () {
        $scope.agent = $scope.me.selected;
      };

      $scope.running = function () {
        $http.get('/api/organization/find-agent-permission/' + $("body").data('m') + '?permission=' + $scope.permission).then(function (agent) {
          $scope.org_name = agent.data.org_name;
          if ($scope.org_name) {
            $scope.is_hidden = true;
            $scope.path      = agent.data.org_x;
            // $scope.selectAgent = agent.data;
          }
        }).finally(function () {
          if ($scope.is_hidden) {
            $http.get('/api/organization/org-tree?org_x=' + $scope.path).then(function (result) {
              $scope.departments = result.data;
            }).finally(function () {
              $scope.is_agent = $scope.org.is_agent || false;
              if ($scope.is_agent) {
                $scope.getAgents(true);
              }
            });
          }
        });
      };
      $scope.clear   = function () {
        $scope.org.agent_id = null;
        $scope.me.selected  = null;
        $scope.setAgent();
        $scope.running();
      };
      $scope.running();
    },
    link       : function (scope) {
      angular.element($('.searchdroplist-clear')).bind("click", function () {
        scope.$apply(scope.clear);
      });
    }
  }
}).directive('superOrg2', function () {
  return {
    restrict   : 'AE',
    scope      : {
      org     : '=?',
      node    : '=?',
      width   : '=?',
      callback: '&?',
      clear   : '&?',
      multi   : '@?'
    },
    transclude : true,
    templateUrl: '/uib/template/fangxin/directive/super-org2.html',
    controller : function ($scope, $timeout, $http) {
      $scope.treeOptions          = {
        nodeChildren  : "children",
        multiSelection: $scope.multi ? $scope.multi : false
      };
      $scope.selectedNodes        = [];
      $scope.show_input           = true;
      $scope.show_dropdown_tree   = false;
      $scope.show_dropdown_search = false;
      $scope.departments          = [];
      if ($scope.treeOptions.multiSelection) {
        $scope.org_name2 = [];
        $scope.node      = [];
      }
      $scope.getDepartment   = function () {
        $scope.show_input           = false;
        $scope.show_dropdown_tree   = true;
        $scope.show_dropdown_search = true;
        $timeout(function () {
          angular.element('#searchName').focus();
        }, 2);
      };
      $scope.leaveTree       = function () {
        $scope.closeDepartment();
      };
      $scope.closeDepartment = function () {
        $scope.node = [];
        angular.forEach($scope.selectedNodes, function (data, index) {
          $scope.node.push(data.org_x);
        });
        $scope.show_input           = true;
        $scope.show_dropdown_tree   = false;
        $scope.show_dropdown_search = false;
      };
      $scope.leaveInput      = function () {
        $scope.show_input           = true;
        $scope.show_dropdown_tree   = true;
        $scope.show_dropdown_search = false;
      };

      $scope.search = function (name) {
        $scope.searchName = name;
        $scope.allNodes   = [];
        addToAllNodes($scope.departments);
      };

      function addToAllNodes(childrens) {
        if (!childrens || typeof(childrens) == "array" && childrens.length == 0) {
          return;
        }
        for (var i = 0; i < childrens.length; i++) {
          $scope.allNodes.push(childrens[i]);
          addToAllNodes(childrens[i].children);
        }
        $scope.expandedNodes = $scope.allNodes;
      }

      $scope.getSelected = function (node, selected) {
        $scope.show_input           = true;
        $scope.show_dropdown_tree   = true;
        $scope.show_dropdown_search = false;
        if ($scope.treeOptions.multiSelection) {
          if (selected == true) {
            $scope.org_name2.push(node.name);
          } else {
            _.forEach($scope.org_name2, function (value, index) {
              if (value == node.name) {
                $scope.org_name2.splice(index, 1);
              }
            });
          }
          $scope.org_name = $scope.org_name2.join(',');
        }
      };


      $scope.running = function (searchName) {
        $scope.org = $scope.org ? $scope.org : '';
        $http.get('/api/organization/org-tree?org_x=' + $scope.org).then(function (result) {
          $scope.departments = result.data;
        }).finally(function () {
          $scope.expandedNodes = [$scope.departments[0]];
        });
      }
      ;
      $scope.clear   = function () {
        $scope.org_name2     = [];
        $scope.node          = [];
        $scope.searchName    = '';
        $scope.org_name      = [];
        $scope.selectedNodes = [];
        $scope.running();
      };
      $scope.running();
    },
    link       : function (scope, element, attrs) {
      angular.element($('.searchdroplist-clear')).bind("click", function () {
        scope.$apply(scope.clear);
      });
    }
  }
}).directive('ngCopyable', function ($document) {
  return {
    restrict: 'A',
    scope   : {
      copyText: '='
    },
    link    : function (scope, element, attrs) {
      //点击事件
      element.bind('click', function () {
        //创建将被复制的内容
        $document.find('body').eq(0).append('<div id="ngCopyableId">' + scope.copyText + '</div>');
        var newElem = angular.element(document.getElementById('ngCopyableId'))[0];

        var range = document.createRange();
        range.selectNode(newElem);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        var successful = document.execCommand('copy');

        //执行完毕删除
        var oldElem = document.getElementById('ngCopyableId');
        oldElem.parentNode.removeChild(oldElem);
        window.getSelection().removeAllRanges();

        //提示
        if (successful) {
          alert('已成功复制：' + scope.copyText);
        } else {
          alert('浏览器不支持复制');
        }

      });
    }

  };
}).directive('fxCompanies', function () {
  return {
    restrict   : 'AE',
    transclude : true,
    replace    : true,
    scope      : {
      api     : '@',
      callback: "&",
      central : '=ngModel',
      admin   : '=?'
    },
    templateUrl: '/uib/template/fangxin/directive/fx-companies.html',
    controller : function ($scope, $http, $timeout) {
      $scope.companiesAll = [];
      $scope.branchOffice = [];
      //总公司
      $scope.getCompanies = function () {
        $scope.loadding = true;
        $http.get('/api/charging/succinct-headoffices').then(function (res) {
          $scope.companiesAll = res.data;
          // 判断ID
          angular.forEach($scope.companiesAll, function (o, index) {
            if (o.id == $scope.central.parent_company.id) {
              $scope.central.parent_company = o;
              $scope.i                      = index;
            }
          })
        }).finally(function () {
          $scope.loadding = false;
          if ($scope.companiesAll.length == 0) {
            $scope.noData = true;
          } else {
            $scope.noData = false;
          }
        });
      };
      $scope.$watch('central', function (newVal, oldVal) {
        $scope.getCompanies();
      });
      $scope.getOffice = function (item, index) {
        $scope.i                      = index;
        $scope.central.parent_company = item;
        $scope.is_dropDown            = false;
        $scope.central.child_company  = '';
      };
      //分公司
      if ($scope.admin) {
        $scope.getBranch = function () {
          angular.forEach($scope.companiesAll, function (o) {
            if ($scope.central.parent_company.id == o.id) {
              $scope.branchOffice = o.companies;
            }
          });
        };
      } else {
        $scope.getBranch = function () {
          $scope.loadding = true;
          $http.get('/api/charging/succinct-company').then(function (res) {
            angular.forEach(res.data, function (o) {
              $scope.branchOffice = o.companies;
            });
          }).finally(function () {
            $scope.loadding = false;
            if ($scope.branchOffice.length == 0) {
              $scope.noData = true;
            } else {
              $scope.noData = false;
            }
          });
        };
      }
      $scope.getBranchOffice = function (item, index) {
        $scope.n                     = index;
        $scope.central.child_company = item;
        $scope.dropDown              = false;
      };

      $scope.getCompanies();
    }
  }
}).directive('amazingOrg', function () {
    return {
      restrict   : 'AE',
      scope      : {
        callback: '&?',
        org     : '=?',
        node    : '=?',
        clear   : '&?'
      },
      transclude : true,
      templateUrl: '/uib/template/fangxin/directive/amazing-source-org.html',
      controller : function ($scope, $timeout, $http, $q, $document) {
        $scope.API      = {
          DEPARTMENT: '/api/organization/org-tree',
          AGENT     : ''
        };
        // 点击选中
        $scope.getFocus = function ($event) {
          $($event.target).select();
          $(".super-tree-org-dropdown li").eq(0).focus();
        };

        // 选择部门
        $scope.selectDepartment = function (node, index) {
          $scope.org_name           = node.name;
          $scope.path               = node.path;
          $scope.agent_name         = "";
          $scope.selectedDepartment = node;
          $scope.selectedAgent      = {};
          $scope.node               = node;
          $scope.org.agent_id       = "";
          $scope.getAgent();
        };

        $scope.agent_name = $scope.org.agent_name;
        $scope.org_name   = $scope.org.org_name;

        // 选择员工
        $scope.selectAgent     = function (agent) {
          $http.get('/api/organization/find-agent/' + agent.id).then(function (agent) {
            $scope.agent_name      = agent.data.name;
            $scope.is_hidden_agent = false;
            $scope.selectedAgent   = agent.data;

            $scope.path               = agent.data.org_x;
            $scope.node               = agent.data;
            $scope.selectedDepartment = agent.data;
          });
          // $http.get('/api/organization/find-agent/' + agent.id).then(function (agent) {
          //   $scope.agent_name = agent.data.name;
          //   $scope.path       = agent.data.org_x;
          //   $scope.node       = agent.data;
          //   console.log(agent);
          // }).finally(function () {
          //   $http.get('/api/widget/get-org-x?' + $.param({org_x: $scope.path})).then(function (org) {
          //     $scope.org_name           = org.data.name;
          //     $scope.selectedDepartment = org.data;
          //     console.log(org);
          //   });
          // });
        };
        $scope.clearDepartment = function () {
          if ($scope.node.is_loading) {
            return false;
          }

          $scope.agents     = [];
          $scope.agent_name = '';
          $scope.org_name   = '';
          $scope.node       = {
            company_big_area_id: $("body").data('w'),
            company_area_id    : $("body").data('c'),
            store_id           : $("body").data('n'),
            store_group_id     : $("body").data('g')
          };

          $scope.selectedDepartment = {};

          angular.forEach($scope.departs, function (depart) {
            if (depart.path.indexOf($("body").data('ph')) == -1) {
              depart.hide = true;
            } else {
              depart.hide = false;
            }
          });
        };

        $scope.clearAgent = function () {
          if ($scope.node.is_loading) {
            return false;
          }

          if ($("body").data('mm') == 1) {
            $scope.theAgentId = $("body").data('m');
          }

          $scope.agent_name    = "";
          $scope.org.agent_id  = null;
          $scope.selectedAgent = {};
          $scope.displayName   = $scope.node.displayName;

          // $scope.getAgent();

          if ($scope.displayName) {
            $scope.displayName = $scope.displayName.split('/');
            $scope.displayName.pop();
            $scope.displayName = $scope.displayName.join('/');
          }
          $scope.node = $scope.selectedDepartment;
          //$scope.node.displayName = $scope.displayName + "/公盘";
        };

        // 初始化部门
        $scope.getDepartment = function () {
          $scope.departs = [];
          if ($scope.org.org_x !== undefined || $scope.org.org_x !== "") {
            $scope.path = $scope.org.org_x;
            //显示组织结构名称
            $http.get('/api/widget/get-org-x?' + $.param({org_x: $scope.path})).then(function (org) {
              $scope.org_name           = org.data.name;
              $scope.selectedDepartment = org.data;
            });
          }
          $http.get($scope.API.DEPARTMENT).then(function (result) {
            $scope.departments = result.data;
          }).finally(function () {
            if (angular.isObject($scope.departments)) {
              if ($scope.selectedDepartment === undefined) {
                $scope.selectedDepartment = $scope.departments[0];
                //$scope.org_name           = $scope.departments[0].name;
              }
              $scope.departs.push($scope.departments[0]);
              $scope.autoComplete($scope.departments[0]);
            }
            $scope.node = $scope.selectedDepartment;
          });
        };

        // 初始员工
        $scope.getAgent = function () {
          $scope.node.is_loading = true;
          $scope.agent_links     = [];
          $scope.agents          = [];
          if ($scope.path !== undefined || $scope.path !== "") {
            $scope.promise = $http.get('/api/organization/org-agent?path=' + $scope.path + "&counter=yes");
            $scope.page    = '/api/organization/org-agent?path=' + $scope.path + "&page="
          } else {
            $scope.promise = $http.get('/api/organization/org-agent?counter=yes');
            $scope.page    = '/api/organization/org-agent?page=';
          }
          $scope.promise.then(function (result) {
            if (result.data.pageSize) {
              for (var i = 1; i <= result.data.pageSize; i++) {
                $scope.agent_links.push($http.get($scope.page + i + "&pageSize=50"));
              }
            }
          }, function (error) {
            Message.error(error);
          }).finally(function () {
            if ($scope.agent_links.length) {
              $q.all($scope.agent_links).then(function (result) {
                if (result.length) {
                  angular.forEach(result, function (v) {
                    if (v.data.data.length) {
                      angular.forEach(v.data.data, function (val) {
                        $scope.agents.push(val);
                      })
                    }
                  });
                }
              }).finally(function () {
                if ($scope.org.agent_id) {
                  $http.get('/api/organization/find-agent/' + $scope.org.agent_id).then(function (agent) {
                    $scope.agent_name      = agent.data.name;
                    $scope.node            = agent.data;
                    $scope.node.is_loading = false;
                  }).finally(function () {

                  });
                } else {
                  $scope.node.is_loading  = false;
                  $scope.node.displayName = $scope.org_name + '/公盘';
                }
              });
            } else {
              $scope.node.is_loading = false;
            }
          });
        };

        // 遍历部门
        $scope.autoComplete = function (departs) {
          if (departs.children.length) {
            angular.forEach(departs.children, function (val, key) {
              val.goto = ((val.path.split('-')).length - 1) * 10;
              $scope.departs.push(val);
              $scope.autoComplete(val);
            })
          }
        };

        // 初始化脚本
        $scope.running = function () {
          if ($scope.org.access) {
            $scope.getDepartment();
            $scope.getAgent();
          }
        };

        $scope.$watch('org', function (newVal, oldVal) {
          if (angular.isDefined($scope.org.reset) && $scope.org.reset === true && newVal != oldVal) {
            $scope.agent_name = $scope.org.agent_name;
            $scope.org_name   = $scope.org.org_name;
            $scope.running();
          }
        });

        // 启动入口
        $scope.running();
      },
      link       : function (scope, element, attrs) {
        //绑定回调事件
        angular.element($('.searchdroplist-clear')).bind("click", function () {
          scope.$apply(scope.clear);
        });

        scope.selectNum = -1;
        scope.ulLength  = $('ul.super-tree-org-dropdown li').length;

        scope.$watchGroup(['is_hidden_org', 'is_hidden_agent'], function (newVal, oldVal) {
          scope.selectNum = -1;
          if (newVal[0]) {
            scope.orgRun = true;
          } else {
            scope.orgRun = false;
          }
          if (newVal[1]) {
            scope.agentRun = true;
          } else {
            scope.agentRun = false;
          }
        });
      }
    }
  }
);
