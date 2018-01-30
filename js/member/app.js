angular.module('App', [
  'ngTouch',
  'angucomplete',
  'ngSanitize',
  'duScroll',
  'angular-ladda',
  'bw.paging',
  'ui.select',
  'datePicker',
  'summernote',
  'ngclipboard',
  'ngJsTree',
  'ngFileUpload',
  'ui.bootstrap',
  'ngTablescroll',
  'ui.grid',
  'ui.grid.pagination',
  'ui.grid.treeView',
  'ui.grid.selection',
  'ui.grid.pinning',
  'ui.grid.exporter',
  'ui.grid.expandable',
  'ui.grid.edit',
  'ui.grid.rowEdit',
  'ui.grid.cellNav',
  'ui.grid.moveColumns',
  'ui.grid.infiniteScroll',
  'bsLoadingOverlay',
  'angular-click-outside',
  'treeControl',
  'ui.bootstrap.datetimepicker',
  'daterangepicker',
  'fangxin.factory',
  'fangxin.filter',
  'fangxin.directive',
  'fangxin.service'
]).run(function ($rootScope, i18nService, ConfigService, bsLoadingOverlayService) {
  i18nService.setCurrentLang('zh-cn');
  // It is time to say googbye!

  // ConfigService.getConfig().then(function (result) {
  //   $rootScope.configService = result.data;
  // });
  bsLoadingOverlayService.setGlobalConfig({
    templateUrl: '/uib/template/fangxin/directive/loading-overlay-template.html'
  });
  $rootScope.gov    = {
    company_id           : Number(document.body.getAttribute('data-o')),
    company_big_area_id  : Number(document.body.getAttribute('data-w')),
    company_area_id      : Number(document.body.getAttribute('data-c')),
    store_id             : Number(document.body.getAttribute('data-n')),
    store_group_id       : Number(document.body.getAttribute('data-g')),
    agent_id             : Number(document.body.getAttribute('data-m')),
    city_id              : Number(document.body.getAttribute('data-cc')),
    city                 : document.body.getAttribute('data-cy'),
    org_x                : document.body.getAttribute('data-ph'),
    name                 : document.body.getAttribute('data-na'),
    company_name         : document.body.getAttribute('data-com'),
    company_big_area_name: document.body.getAttribute('data-big'),
    company_area_name    : document.body.getAttribute('data-area'),
    store_name           : document.body.getAttribute('data-store'),
    group_name           : document.body.getAttribute('data-group'),
    bargain_lr           : document.body.getAttribute('data-lr'),
    bargain_br           : document.body.getAttribute('data-br'),
    respite_display      : document.body.getAttribute('data-respite-display'),
    roler                : {
      id              : document.body.getAttribute('data-rd'),
      company         : document.body.getAttribute('data-yy'),
      company_big_area: document.body.getAttribute('data-ww'),
      company_area    : document.body.getAttribute('data-aa'),
      store           : document.body.getAttribute('data-nn'),
      store_group     : document.body.getAttribute('data-gg'),
      agent           : document.body.getAttribute('data-mm')
    }
  };
  $rootScope.secret = {
    company_id         : document.body.getAttribute('data-o'),
    company_big_area_id: document.body.getAttribute('data-w'),
    company_area_id    : document.body.getAttribute('data-c'),
    store_id           : null,
    store_group_id     : null,
    agent_id           : null,
    city_id            : Number(document.body.getAttribute('data-cc'))
  };

  if ($rootScope.gov.roler.store) {
    $rootScope.secret.store_id = $rootScope.gov.store_id;
  } else if ($rootScope.gov.roler.store_group) {
    $rootScope.secret.store_id       = $rootScope.gov.store_id;
    $rootScope.secret.store_group_id = $rootScope.gov.store_group_id;
  } else if ($rootScope.gov.roler.agent) {
    $rootScope.secret.store_id       = $rootScope.gov.store_id;
    $rootScope.secret.store_group_id = $rootScope.gov.store_group_id;
    $rootScope.secret.agent_id       = $rootScope.gov.agent_id;
  }

  ConfigService.getOrganization().then(function (result) {
    $rootScope.organizationService = result.data;
    $rootScope.company_big_areas   = $rootScope.organizationService.company_big_areas;
    $rootScope.company_areas       = $rootScope.company_big_areas.length ? $rootScope.company_big_areas[0].company_areas : [];

    angular.forEach($rootScope.company_areas, function (attr) {
      if (attr.id == $rootScope.gov.company_area_id) {
        $rootScope.company_area_stores = attr.stores;
        angular.forEach($rootScope.company_area_stores, function (attr) {
          if (attr.id === $rootScope.gov.store_id) {
            $rootScope.company_area_stores_groups        = attr.store_groups;
            $rootScope.company_area_stores_groups_agents = $rootScope.organizationService.role_layer.agents;
          }
        });
      }
    });
  });

  // 监控大区
  $rootScope.$watch('secret.company_big_area_id', function () {
    $rootScope.company_areas              = [];
    $rootScope.company_area_stores        = [];
    $rootScope.company_area_stores_groups = [];
    angular.forEach($rootScope.company_big_areas, function (attr) {
      if (attr.id === $rootScope.secret.company_big_area_id) {
        $rootScope.company_areas = attr.company_areas;
        var tem_agents           = [];
        angular.forEach($rootScope.organizationService.role_layer.agents, function (agent) {
          if (agent.id == $rootScope.gov.agent_id || agent.company_big_area_id == attr.id) {
            tem_agents.push(agent);
          }
        });
        $rootScope.company_area_stores_groups_agents = tem_agents;
      }
    });
  });

  // 监控片区
  $rootScope.$watch('secret.company_area_id', function () {
    $rootScope.company_area_stores        = [];
    $rootScope.company_area_stores_groups = [];
    angular.forEach($rootScope.company_areas, function (attr) {
      if (attr.id === $rootScope.secret.company_area_id) {
        $rootScope.company_area_stores = attr.stores;
        var tem_agents                 = [];
        angular.forEach($rootScope.organizationService.role_layer.agents, function (agent) {
          if (agent.id == $rootScope.gov.agent_id || agent.company_area_id == attr.id) {
            tem_agents.push(agent);
          }
        });
        $rootScope.company_area_stores_groups_agents = tem_agents;
      }
    });
  });

  // 监控门店
  $rootScope.$watch('secret.store_id', function () {
    $rootScope.company_area_stores_groups_agents = {};
    angular.forEach($rootScope.company_area_stores, function (attr) {
      if (attr.id === $rootScope.secret.store_id) {
        $rootScope.company_area_stores_groups = attr.store_groups;
        var tem_agents                        = [];
        angular.forEach($rootScope.organizationService.role_layer.agents, function (agent) {
          if (agent.id == $rootScope.gov.agent_id || agent.store_id == attr.id) {
            tem_agents.push(agent);
          }
        });
        $rootScope.company_area_stores_groups_agents = tem_agents;
      }
    });
  });

  // 监控小组
  $rootScope.$watch('secret.store_group_id', function () {
    //选择小组调入包括组长在内本组经纪人
    if ($rootScope.secret.store_group_id) {
      angular.forEach($rootScope.company_area_stores_groups, function (store_group) {
        if (store_group.id === $rootScope.secret.store_group_id) {
          var tem_agents = [];
          angular.forEach($rootScope.organizationService.role_layer.agents, function (agent) {
            if (agent.id == $rootScope.gov.agent_id || agent.store_group_id == store_group.id) {
              tem_agents.push(agent);
            }
          });
          $rootScope.company_area_stores_groups_agents = tem_agents;
        }
      });
      //不选择组默认调入包括店长在内的经纪人
    } else {
      angular.forEach($rootScope.company_area_stores_groups, function (store_group) {
        var tem_agents = [];
        angular.forEach($rootScope.organizationService.role_layer.agents, function (agent) {
          if (agent.id == $rootScope.gov.agent_id || agent.store_id == store_group.store_id) {
            tem_agents.push(agent);
          }
        });
        $rootScope.company_area_stores_groups_agents = tem_agents;
      });
    }
  });

  $rootScope.summernoteConfigs = {
    height : 300,
    airMode: false,
    toolbar: [
      ['edit', ['undo', 'redo']],
      ['headline', ['style']],
      ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'clear']],
      ['fontface', ['fontname']],
      ['textsize', ['fontsize']],
      ['fontclr', ['color']],
      ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
      ['height', ['height']],
      ['table', ['table']],
      ['insert', ['picture']]
    ]
  };
});


function associate_errors(errors, $submitForm) {
  $submitForm.find('.form-group').removeClass('has-errors').find('.help-text').text('');
  $.each(errors, function (index, value) {
    var $group = $submitForm.find('#' + index + '-group');
    $group.addClass('has-error').find('.help-block').text(value);
  });
}

Message = {
  success: function (msg) {
    return toastr.success(msg, '操作成功', {
      progressBar  : false,
      positionClass: 'toast-top-center',
      closeButton  : true
    });
  },
  warning: function (msg) {
    return toastr.warning(msg, '提示', {
      progressBar  : false,
      positionClass: 'toast-top-center',
      closeButton  : true
    });
  },
  error  : function (error, $submitForm) {
    var msg = "● ";
    if (error.status == 422) {
      var errObj = Object.keys(error.data);
      if (errObj.length) {
        $.each(error.data, function (key, val) {
          msg += val.toString() + '\n';
        });
        if ($submitForm) {
          associate_errors(error.data, $submitForm);
        }
      }
    } else if (error.status == 500) {
      if (error.data.message != undefined) {
        msg = error.data.message;
      } else {
        msg = error.data.msg;
      }
    } else {
      if (error.data.message != undefined && error.data.message != null) {
        msg = error.data.message;
      } else {
        msg = "请先检查网络,或者联系系统维护人员";
      }
    }
    return toastr.error(msg, '操作失败', {
      progressBar  : false,
      positionClass: 'toast-top-center',
      closeButton  : true
    });
  }
};

Grid = {};

Notify = {
  remove : function (options, successCallback, FailCallback) {
    swal({
      title              : options.title || '确定要删除吗?',
      text               : options.text || '删除后,关联数据将一并删除,请谨慎操作',
      type               : "warning",
      confirmButtonColor : "#DD6B55",
      confirmButtonText  : "删除!",
      cancelButtonText   : "取消",
      showCancelButton   : true,
      closeOnConfirm     : false,
      showLoaderOnConfirm: true
    }, function () {
      options.http.delete(options.url).then(function (result) {
        if ($.isFunction(successCallback)) {
          successCallback(result)
        }
        swal(
          {
            type             : "success",
            title            : "删除成功",
            timer            : 2000,
            showConfirmButton: false
          });
      }, function (error) {
        if ($.isFunction(FailCallback)) {
          FailCallback(error)
        }
        swal(
          {
            type             : "error",
            title            : "删除失败",
            text             : error.data.message,
            timer            : 2000,
            showConfirmButton: false
          });
      });
    });
  },
  approve: function (options, successCallback, FailCallback) {
    swal({
      title              : options.title || '确定要审核吗?',
      text               : options.text || '审核后,该条纪录状态不可恢复,请谨慎操作',
      type               : "info",
      confirmButtonColor : "#DD6B55",
      confirmButtonText  : options.confirmButtonText || "审核!",
      cancelButtonText   : "取消",
      showCancelButton   : true,
      closeOnConfirm     : false,
      showLoaderOnConfirm: true
    }, function () {
      options.http.put(options.url, options.data || {}).then(function (result) {
        if ($.isFunction(successCallback)) {
          successCallback(result)
        }
        swal({
          title            : '操作成功',
          type             : "success",
          confirmButtonText: "确定"
        });
      }, function (error) {
        if ($.isFunction(FailCallback)) {
          FailCallback(error)
        }
        swal('操作失败', error.data.message, "error");
      });
    });
  },
  top    : function (options, successCallback, FailCallback) {
    swal({
      title              : options.title || '确定要置顶吗?',
      type               : "warning",
      confirmButtonColor : "#DD6B55",
      confirmButtonText  : options.title + "!",
      cancelButtonText   : "取消",
      showCancelButton   : true,
      closeOnConfirm     : false,
      showLoaderOnConfirm: true
    }, function () {
      options.http.put(options.url, options.data || {}).then(function (result) {
        if ($.isFunction(successCallback)) {
          successCallback(result)
        }
        swal(
          {
            type             : "success",
            title            : options.title + '成功',
            timer            : 2000,
            showConfirmButton: false
          });
      }, function (error) {
        if ($.isFunction(FailCallback)) {
          FailCallback(error)
        }
        swal(
          {
            type             : "error",
            title            : options.title + '失败',
            text             : error.data.message,
            timer            : 2000,
            showConfirmButton: false
          });
      });
    });
  }
};

function removeItem(params, cbForSuccess, cbForError) {
  params.title = !params.title ? '确定要删除吗?' : params.title;
  params.text  = !params.text ? '确定要删除吗?' : params.text;
  swal({
    title              : params.title,
    text               : params.text,
    type               : "warning",
    confirmButtonColor : "#DD6B55",
    confirmButtonText  : "删除!",
    cancelButtonText   : "取消",
    showCancelButton   : true,
    closeOnConfirm     : false,
    showLoaderOnConfirm: true
  }, function () {
    params.http.delete(params.url + params.id).then(function (result) {
      if ($.isFunction(cbForSuccess)) {
        cbForSuccess()
      }
      swal('删除成功', '', "success");
    }, function (error) {
      if ($.isFunction(cbForError)) {
        cbForError()
      }
      swal('删除失败', error.data.message, "error");
    });
  });
}