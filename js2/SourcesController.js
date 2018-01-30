angular.module('App').controller('SourcesCtrl', function ($scope, $rootScope, $timeout, $http, $location, ConfigService, $uibModal, $filter, $interval, uiGridConstants) {
  // $scope.dropDownPanel = false;
  $scope.basic_search  = {page: 1, page_size: 30};
  $scope.search        = angular.extend($scope.basic_search, $.search.source());
  $scope.me            = $.search.source();
  if (RunningLeeUrl.parse().search === '?mine') {
    $timeout(function () {
      $("span.searchdroplist-clear", $("#search-clear")).trigger("click");
      $("span.checkbox-text").text('不限');
      $("li.erp-checkbox-list", $("#search-status")).removeClass('on').addClass('off');
      $("li.erp-checkbox-list:eq(0)", $("#search-status")).removeClass('off').addClass('on');
      $("#search-status").data('params', ['不限']).data('val', '不限').data('default', '不限');
      $('body').data('search-status', null);
    }, 1);
    $scope.search.agent_id = $scope.gov.agent_id;
    $scope.search.status   = null;
  }

  $scope.markNum = 0;

  $http.get('/api/get-source-marks').then(function (result) {
    if (result.data) {
      $scope.markNum = result.data.length;
    }
  });
  $scope.selectSource = {};

  $http.get('/api/get-source-setting').then(function (result) {
    $scope.settingSource     = result.data.required;
    $scope.selectSource      = result.data.select;
    $scope.configSource      = result.data.source;
    $scope.is_show_HouseMess = false;
    if (!$scope.configSource.hidden_source_info.value) {
      $scope.is_show_HouseMess = true;
    } else {
      $scope.is_show_HouseMess = false;
    }
    // 封盘信息
    $scope.getLockedTitle = function (sourceLock) {
      var lockTitle = '';
      if (sourceLock && $scope.configSource.fengpan_days.value) {
        // lockTitle = '封盘中，到期日期' + moment(sourceLock.locked_at).add($scope.configSource.fengpan_days.value, 'days').format('YYYY-MM-DD')
        lockTitle = '封盘时间：' + moment(sourceLock.locked_at).format('YYYY-MM-DD') + '，到期时间：' + moment(sourceLock.locked_at).add($scope.configSource.fengpan_days.value, 'days').format('YYYY-MM-DD') + '，封盘方式：' + sourceLock.locked_way;
      }

      return lockTitle;
    };
  });

  $rootScope.$on('reset-flag', function (ele, data) {
    $scope.dropDownToggleTrigger              = {
      room            : false,
      hall            : false,
      toilet          : false,
      decoration_level: false,
      direction       : false,
      sale_status     : false,
      ownership_type  : false,
      arch_structure  : false,
      arch_type       : false,
      price_range     : false,
      archsqure_range : false,
      delivery_at     : false
    };
    var btnFlagMark                           = data.btnFlagMark;
    $scope.dropDownToggleTrigger[btnFlagMark] = data.btnFlag;
  });

  // $http.get('/api/organization/company_big_area').then(function (result) {
  //   $scope.company_big_areas = result.data;
  // });

  // $scope.hideDropDownPanel = function () {
  //   $scope.dropDownPanel = false;
  // };
  //
  // $scope.keepDropDownPanelData = function () {
  //   $scope.hideDropDownPanel();
  // };
  //
  // $scope.resetDropDownPanel = function () {
  //   $scope.getSources('reset');
  // };

  $scope.ownership_types   = ConfigService.community.ownership_types;
  $scope.arch_structures   = ConfigService.community.arch_structres;
  $scope.arch_types        = ConfigService.community.arch_types;
  $scope.directions        = ConfigService.community.directions;
  $scope.decoration_levels = ConfigService.community.decoration_levels;

  /**
   * 分享楼书二维码
   *
   */
  $scope.qrShow = function (item) {
    swal({
      title              : "分享房源",
      text               : item.community.title + ' ' + item.uuid,
      imageUrl           : 'qr?link=' + item.loushu_url + '?time=' + new Date().getTime(),
      imageSize          : "180x180",
      imageHeight        : 180,
      imageWidth         : 180,
      showCancelButton   : false,
      closeOnConfirm     : false,
      showLoaderOnConfirm: true,
      confirmButtonText  : '确定'
    });
  };

  $scope.comparedSources = function () {
    var length = $rootScope.selectedSources.length;
    if (length) {
      if (length > 4) {
        Message.warning('比较的房源不能超过4个');
      } else {
        $("#comparedDiv").modal('show');
      }
    } else {
      Message.warning('没有选择房源');
    }
  };

  $rootScope.types    = {};
  $rootScope.schedule = {
    type         : '',
    due_at       : '',
    finished_at  : '',
    schedule_type: 'sources',
    description  : '',
    client_name  : '',
    source_id    : 0,
    agent_id     : '',
    call_id      : ''
  };

  $scope.sourceLoading = false;
  // 房源列表双击事件
  $scope.showmoreInfo  = function (source) {
    if ($scope.sourceLoading) {
      return;
    }
    $scope.sourceLoading = true;
    $scope.markSourceRecord(source.id);
    $.loading.show();

    $http.get('/api/source/' + source.id).then(function (result) {
      $.loading.hide();
      var time          = Date.parse(new Date());
      var modalInstance = $uibModal.open({
        backdrop   : false,
        templateUrl: '/source/next-sources.html?source_id=' + source.id + '&time=' + time,
        controller : 'nextsourceSCtrl',
        appendTo   : angular.element(document.getElementById('sources')),
        size       : 'dialog-800',
        resolve    : {
          share: function () {
            result.data.data.markNum = $scope.markNum;
            return {
              source   : result.data.data,
              access   : result.data.access,
              agent    : result.data.agent,
              is_public: $scope.search.is_public
            };
          }
        }
      });
      modalInstance.result.then(function (params) {
        $scope.sourceLoading = false;
        $scope.markNum       = params.markNum;
        source.if_pic        = params.if_pic;
      }, function () {
        $scope.sourceLoading = false;
      });
    });

  };

  // 添加房源
  $scope.addSell = function () {
    $uibModal.open({
      backdrop   : false,
      templateUrl: 'sourceS.html',
      controller : 'AddSourceAlertCtrl',
      appendTo   : angular.element(document.getElementById('main-window')),
      size       : 'dialog-516',
      resolve    : {
        share: function () {
          return {
            source   : [],
            relations: $scope.selectSource.owner_relation.value
          };
        }
      }
    });
  };
  // 置顶
  $scope.doUp    = function (source) {
    $http.put('/api/source/' + source.id + '/top').then(function (result) {
      Message.success('置顶成功');
      $rootScope.schedule.call_id = result.id;
    }, function (error) {
      Message.error(error);
      $scope.loading_add = false;
    });
  };
  // 置顶
  $scope.mark    = function (source) {
    $http.put('/api/source-mark/' + source.id).then(function (result) {

      if (result.data.data == 1) {
        if ($scope.markIsFull) {
          Message.warning('收藏房源超过限制！');
          return false;
        }
        Message.success('收藏成功');
        $scope.actSourceMark(source);
        $scope.markNum = result.data.total;
      } else if (result.data.data == 0) {
        Message.success('取消收藏');
        $scope.actSourceMark(source);
        $scope.markNum    = result.data.total;
        $scope.markIsFull = false;
      } else {
        $scope.markIsFull = true;
        Message.warning('收藏房源超过限制！');
      }
    }, function (error) {
      Message.error(error);
      $scope.loading_add = false;
    });
  };

  $scope.actSourceMark = function (source) {
    _.find($scope.gridOptions.data, function (item, index) {
      if (item.id == source.id) {
        $scope.gridOptions.data[index].book_mark = !source.book_mark;
      }
    });
  };

  $scope.show_community     = function () {
    $('#CommunityModal').modal({backdrop: false, keyboard: false});
    $("#CommunityModal").modal('show');
    $rootScope.businessLists  = [];
    $rootScope.CommunityLists = [];
  };
  $scope.partialCommunities = {};
  $scope.communitySelected  = '';

  $scope.refreshCommunity = function (keyword) {
    if (keyword != "") {
      $scope.search.keyword = keyword;
      $scope.search.status  = '已审核';
      $http.get('/api/dictionary?' + $.param($scope.search)).then(function (result) {
        $scope.morecommunities = result.data.data;
      });
    }
  };

  $scope.isSelected = function (selectCommunity) {
    $rootScope.search.community_id = selectCommunity.id;
  };

  $scope.getLocation         = function () {
    $scope.getSources();
  };
  $scope.moreconditions      = "1";
  $rootScope.selectedSources = [];
  $scope.gridOptions         = {
    columnDefs              : [
      {
        name            : '码',
        enableSorting   : false,
        enableHiding    : false,
        enableColumnMenu: false,
        width           : 40,
        pinnedLeft      : true,
        cellTemplate    : 'action.html'
      },
      {
        name            : '标签',
        enableHiding    : false,
        enableColumnMenu: false,
        enableSorting   : false,
        width           : 100,
        pinnedLeft      : true,
        cellTemplate    : 'other.html'
      },
      {
        name            : '收藏',
        enableHiding    : false,
        enableColumnMenu: false,
        enableSorting   : false,
        width           : 40,
        pinnedLeft      : true,
        headerCellClass : 'text-center',
        cellTemplate    : 'sourceB.html'
      },
      {
        field           : 'category',
        displayName     : '交易',
        enableHiding    : false,
        enableColumnMenu: false,
        width           : 40,
        pinnedLeft      : true,
        headerCellClass : 'text-center',
        cellTemplate    : 'sort.html'
      },
      {
        field           : 'sale_status',
        displayName     : '状态',
        width           : 50,
        enableColumnMenu: false,
        enableHiding    : false,
        pinned          : true,
        pinnedLeft      : true,
        cellTemplate    : 'sale_status.html'
      },
      // {field: 'district.name', displayName: '区域', width: 110, enableColumnMenu: false},
      // {field: 'business.name', displayName: '商圈', width: 120, enableColumnMenu: false},
      {
        field           : 'community.title',
        displayName     : '楼盘',
        visible         : true,
        enableColumnMenu: false,
        enableHiding    : false,
        width           : 150,
        pinnedLeft      : true,
        cellTemplate    : 'loupan.html'
      },
      {
        field           : 'agency_house.ridgepole_name',
        displayName     : '栋',
        enableSorting   : false,
        visible         : false,
        enableColumnMenu: false,
        width           : 60,
        cellTemplate    : 'ridgepole.html'
      },
      {
        field           : 'agency_house.unity_name',
        displayName     : '单元',
        visible         : false,
        enableColumnMenu: false,
        width           : 50,
        cellTemplate    : 'unity.html'
      },
      {
        field           : 'agency_house.door_name',
        displayName     : '门牌',
        enableSorting   : false,
        visible         : false,
        enableColumnMenu: false,
        width           : 50,
        cellTemplate    : 'door.html'
      },

      {
        field           : 'agency_house.arch_square',
        displayName     : '面积',
        width           : 80,
        enableColumnMenu: false,
        enableHiding    : false,
        type            : 'number'
      },
      {
        field           : 'agency_house.room',
        displayName     : '户型',
        enableHiding    : false,
        enableColumnMenu: false,
        width           : 80,
        headerCellClass : 'text-center',
        cellTemplate    : 'structure.html'
      },
      {
        field           : 'agency_house.floor_name',
        displayName     : '楼层',
        enableColumnMenu: false,
        width           : 60,
        headerCellClass : 'text-center',
        cellTemplate    : 'floor.html'
      },
      {
        field           : 'high_price',
        displayName     : '售价',
        width           : 80,
        visible         : true,
        enableColumnMenu: false,
        enableSorting   : true,
        type            : 'number',
        cellTemplate    : '<div style="background:#f0f9f7;height: 100%;padding-top: 6px;">{{row.entity.high_price}}</div>'
      },
      {
        field           : 'sale_unit_price',
        displayName     : '单价',
        width           : 80,
        enableColumnMenu: false,
        enableSorting   : true,
        type            : 'number',
        cellTemplate    : '<div style="background:#f0f9f7;height: 100%;padding-top: 6px;">{{row.entity.sale_unit_price}}</div>'
      },
      {
        field           : 'lease_price',
        displayName     : '租金',
        width           : 60,
        visible         : true,
        enableColumnMenu: false,
        enableSorting   : true,
        type            : 'number'
      },
      {field: 'click_num', displayName: '点击', width: 50, visible: true, enableColumnMenu: false, type: 'number'},
      {
        field             : 'seen_num',
        displayName       : '带看',
        width             : 50,
        visible           : true,
        enableColumnMenu  : false,
        type              : 'number',
        sortDirectionCycle: [null, uiGridConstants.DESC, uiGridConstants.ASC]
      },
      {
        field           : 'share_num',
        displayName     : '分享',
        width           : 50,
        visible         : true,
        enableColumnMenu: false,
        type            : 'number',
        cellTemplate    : '<div style="height: 100%;padding-top: 6px;">{{row.entity.share_num}}</div>'
      },
      {field: 'discussed_num', displayName: '磋商', width: 70, visible: true, enableColumnMenu: false, type: 'number'},
      {field: 'come_from', displayName: '来源', width: 70, visible: true, enableColumnMenu: false},
      {field: 'seen_at', displayName: '最后带看时间', width: 130, visible: false, enableColumnMenu: false, type: 'date'},
      {field: 'discussed_at', displayName: '最后磋商时间', width: 130, visible: false, enableColumnMenu: false, type: 'date'},
      {field: 'created_at', displayName: '创建时间', width: 140, visible: false, enableColumnMenu: false, type: 'date'},
      {
        field           : 'followed_at',
        displayName     : '最后跟进',
        enableSorting   : true,
        enableHiding    : true,
        visible         : true,
        width           : 110,
        enableColumnMenu: false,
        cellTemplate    : 'followed_at.html'
      },
      {
        field           : 'open_at',
        displayName     : '开盘时间',
        enableSorting   : true,
        enableHiding    : true,
        visible         : true,
        width           : 110,
        enableColumnMenu: false,
        type            : 'date',
        cellTemplate    : 'open_at.html'
      },
      {
        field           : 'agency_house.community_type',
        displayName     : '物业',
        width           : 80,
        enableColumnMenu: false,
      },
      {field: 'agency_house.direction', displayName: '朝向', width: 80, enableColumnMenu: false},
      {
        field           : 'verify_agent_id',
        displayName     : '核盘人',
        width           : 60,
        visible         : true,
        enableColumnMenu: false,
        cellTemplate    : 'verify.html',
        type            : 'number'
      },
      {
        field           : 'open_agent_id',
        displayName     : '开盘人',
        enableSorting   : true,
        width           : 60,
        enableColumnMenu: false,
        headerCellClass : 'text-center',
        cellTemplate    : 'opener.html',
        type            : 'number'
      },
      {
        field           : 'uuid',
        displayName     : '编号',
        width           : 170,
        enableColumnMenu: true,
        visible         : false,
        cellTemplate    : 'uuid.html'
      },
      {field: 'level', displayName: '级别', width: 50, visible: false, enableColumnMenu: false},
      {field: 'ddd', displayName: ' ', enableColumnMenu: false, enableHiding: false, enableSorting: false}

    ],
    enableGridMenu          : true,
    exporterMenuPdf         : false,
    exporterMenuCsv         : false,
    rowTemplate             : 'rowTemplate.html',
    showFooter              : true,
    totalItems              : 0,
    enablePaging            : true,
    useExternalPagination   : true,
    paginationCurrentPage   : 1,
    paginationPageSizes     : [30, 60, 120],
    enableRowSelection      : true,
    enableRowHeaderSelection: true,
    enableSorting           : true,
    enableSelectAll         : true,
    multiSelect             : true,

    onRegisterApi: function (gridApi) {
      $scope.gridApi = gridApi;
      $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, page_size) {
        $scope.basic_search.page                 = newPage;
        $scope.basic_search.page_size            = page_size;
        $scope.gridOptions.paginationCurrentPage = newPage;
        $scope.gridOptions.paginationPageSize    = page_size;
        $scope.getSources();
      });
      // 排序
      $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
        if (sortColumns.length === 0) {
          $scope.getSources();
        } else {
          if (sortColumns[0].name == 'category') {
            $scope.basic_search.intelligence_order = 'category';
          } else if (sortColumns[0].name == 'district.name') {
            $scope.basic_search.intelligence_order = 'district_id';
          } else if (sortColumns[0].name == 'business.name') {
            $scope.basic_search.intelligence_order = 'business_id';
          } else if (sortColumns[0].name == 'agency_house.ridgepole_name') {
            $scope.basic_search.intelligence_order = 'agency_house_id';
          } else if (sortColumns[0].name == 'community.title') {
            $scope.basic_search.intelligence_order = 'community_id';
          } else if (sortColumns[0].name == 'agency_house.arch_square') {
            $scope.basic_search.intelligence_order = 'agency_house_id';
          } else if (sortColumns[0].name == 'agency_house.unity_name') {
            $scope.basic_search.intelligence_order = 'agency_house_id';
          } else if (sortColumns[0].name == 'agency_house.door_name') {
            $scope.basic_search.intelligence_order = 'agency_house_id';
          } else if (sortColumns[0].name == 'agency_house.room') {
            $scope.basic_search.intelligence_order = 'agency_house_id';
          } else if (sortColumns[0].name == 'agency_house.floor_name') {
            $scope.basic_search.intelligence_order = 'agency_house_id';
          } else if (sortColumns[0].name == 'agency_house.community_type') {
            $scope.basic_search.intelligence_order = 'agency_house_id';
          } else if (sortColumns[0].name == 'agency_house.direction') {
            $scope.basic_search.intelligence_order = 'agency_house_id';
          } else if (sortColumns[0].name == 'high_price') {
            $scope.basic_search.intelligence_order = 'high_price';
          } else if (sortColumns[0].name == 'sale_unit_price') {
            $scope.basic_search.intelligence_order = 'sale_unit_price';
          } else if (sortColumns[0].name == 'lease_price') {
            $scope.basic_search.intelligence_order = 'lease_price';
          } else if (sortColumns[0].name == 'sale_status') {
            $scope.basic_search.intelligence_order = 'sale_status';
          } else if (sortColumns[0].name == 'verify.name') {
            $scope.basic_search.intelligence_order = 'verify_agent_id';
          } else if (sortColumns[0].name == 'open_agent_id') {
            $scope.basic_search.intelligence_order = 'open_agent_id';
          } else if (sortColumns[0].name == 'click_num') {
            $scope.basic_search.intelligence_order = 'click_num';
          } else if (sortColumns[0].name == 'seen_num') {
            $scope.basic_search.intelligence_order = 'seen_num';
          } else if (sortColumns[0].name == 'share_num') {
            $scope.basic_search.intelligence_order = 'share_num';
          } else if (sortColumns[0].name == 'discussed_num') {
            $scope.basic_search.intelligence_order = 'discussed_num';
          } else if (sortColumns[0].name == 'come_from') {
            $scope.basic_search.intelligence_order = 'come_from';
          } else if (sortColumns[0].name == 'seen_at') {
            $scope.basic_search.intelligence_order = 'seen_at';
          } else if (sortColumns[0].name == 'discussed_at') {
            $scope.basic_search.intelligence_order = 'discussed_at';
          } else if (sortColumns[0].name == 'agency_house.community_type') {
            $scope.basic_search.intelligence_order = 'agency_house.community_type';
          } else if (sortColumns[0].name == 'created_at') {
            $scope.basic_search.intelligence_order = 'created_at';
          } else if (sortColumns[0].name == 'followed_at') {
            $scope.basic_search.intelligence_order = 'followed_at';
          } else if (sortColumns[0].name == 'open_at') {
            $scope.basic_search.intelligence_order = 'open_at';
          } else if (sortColumns[0].name == 'level') {
            $scope.basic_search.intelligence_order = 'level';
          } else {
            $scope.basic_search.intelligence_order = sortColumns[0].field;
          }
          $scope.basic_search.asc = sortColumns[0].sort.direction;
          $scope.getSources();
        }
      });
    }
  };

  $scope.unSelectAll = function () {
    $scope.gridApi.selection.clearSelectedRows();
  };

  $scope.markSourceRecord = function (sourceId) {
    $scope.unSelectAll();
    angular.forEach($scope.gridOptions.data, function (value, key) {
      if (value.id == sourceId) {
        $scope.gridApi.selection.selectRow($scope.gridOptions.data[key]);
        return false;
      }
    });
  };

  $scope.changeSourcesAgent = function () {
    $uibModal.open({
      backdrop   : false,
      templateUrl: 'change-open.html',
      controller : 'OpenersCtrl',
      appendTo   : angular.element(document.getElementById('sources')),
      size       : 'md'
    });
  };

  $rootScope.$on('sync-source-lists', function (e, param) {
    $scope.getSources('from');
  });

  $rootScope.$on('get-page-source', function (e, parms) {
    var sourceId = 0;
    if (parms.direction === 'next') {
      sourceId = -1;
      if ($scope.ids.length) {

        $scope.nextSourceId = $scope.ids[_.indexOf($scope.ids, parms.sourceId) + 1];

        if ($scope.nextSourceId !== undefined) {
          sourceId = $scope.nextSourceId;
        }
      }


      // angular.forEach($scope.gridOptions.data, function (item, index) {
      //   if (item.id == parms.sourceId && index != totalNum) {
      //     sourceId = $scope.gridOptions.data[index + 1].id;
      //   }
      // })
    } else {
      if ($scope.ids.length) {

        $scope.prevSourceId = $scope.ids[_.indexOf($scope.ids, parms.sourceId) - 1];

        if ($scope.prevSourceId !== undefined) {
          sourceId = $scope.prevSourceId;
        }
        // $scope.nextSources = _($scope.ids.reverse().slice(_.indexOf($scope.ids, parms.sourceId) + 1));
        // if ($scope.nextSources.next().value !== undefined) {
        //   sourceId = $scope.nextSources.next().value;
        // }
      }

      // var sourceId = 0;
      // angular.forEach($scope.gridOptions.data, function (item, index) {
      //   if (item.id == parms.sourceId && index != 0) {
      //     sourceId = $scope.gridOptions.data[index - 1].id;
      //   }
      // })
    }
    $scope.markSourceRecord(sourceId > 0 ? sourceId : parms.sourceId);
    $rootScope.$broadcast('pass-page-sourceId', {sourceId: sourceId});
  });
  $rootScope.$on('update-source-one-in-list', function (e, parms) {
    $scope.unSelectAll();
    if (parms !== undefined && parms.id) {
      angular.forEach($scope.gridOptions.data, function (item, index) {
        if (item.id === parms.id) {
          $scope.gridOptions.data[index] = parms;
          $scope.gridApi.selection.selectRow($scope.gridOptions.data[index]);
          return false;
        }
      })
    }
  });

  $rootScope.$on('update-item-source-list', function (e, params) {
    if (params.sale_status == '暂缓') {
      $scope.getSources();
    } else {
      _.find($scope.gridOptions.data, function (item, index) {
        if (item.id == params.id) {
          $scope.gridOptions.data[index] = angular.merge($scope.gridOptions.data[index], params);
        }
      });
    }
  });
  $rootScope.$on('update-source-list', function (e, params) {
    _.find($scope.gridOptions.data, function (item, index) {
      if (item.id == params.id) {
        if (params.action == 'del') {
          if (params.type == 'keys') {
            $scope.gridOptions.data[index].key_agent_id = null;
          }
        } else if (params.action == 'add') {
          if (params.type == 'keys') {
            $scope.gridOptions.data[index].key_agent_id = params.agent_id;
          }
        }

        $scope.gridApi.selection.selectRow($scope.gridOptions.data[index]);
      }
    });
  });

  $rootScope.$on('update-source-one-pic-in-list', function (e, parms) {
    angular.forEach($scope.gridOptions.data, function (item, index) {
      if (item.id == parms[0]) {
        $scope.gridOptions.data[index].if_pic = parms[1];
      }
    })
  });
  // 获取房源列表

  $scope.getSources = function () {
    $scope.ids         = [];
    //修复3120：房源搜索从插件内拖动出单个小区的名称，不能搜索出对应的小区房源
    var search_source  = $.search.source();
    var community_name = $('input[data-toggle="erp-comunity-dictionary"]').val();
    if (community_name) {
      search_source.community_name = community_name;
    }

    $.loading.show();
    if (RunningLeeUrl.parse().search !== '?mine') {
      $scope.search = angular.extend($scope.basic_search, search_source);
      $scope.me     = search_source;
    }
    $scope.search.company_area_id = $scope.me.company_area_id;
    $scope.search.store_id        = $scope.me.store_id;
    $scope.search.store_group_id  = $scope.me.store_group_id;
    $scope.search.district_id     = $scope.me.district_id;
    $scope.search.business_id     = $scope.me.business_id;
    $scope.search.counter         = 'no';
    $http.get('/api/source?' + $.param($scope.search)).then(function (result) {
      $scope.gridOptions.data = result.data.data;
      angular.forEach($scope.gridOptions.data, function (data) {
        $scope.ids.push(data.id);
        (data.only_end_date > $filter('date')(new Date(new Date().setDate(new Date().getDate() - 1)), 'yyyy-MM-dd')) ? data.only_state = true : data.only_state = false;
      });
    }, function (error) {
      Message.error(error);
    }).finally(function () {
      $.loading.hide();
      $scope.unSelectAll();
      $timeout(function () {
        $scope.search.counter = 'yes';
        $http.get('/api/source?' + $.param($scope.search)).then(function (counter) {
          $scope.gridOptions.totalItems = counter.data.total;
        });
        $('#sources .ui-grid-render-container-body .ui-grid-viewport').css('overflow-x', 'scroll');
      }, 1000);
    });
  };

  $scope.getCommunities = function () {
    $scope.search = {
      keyword : "",
      page    : 1,
      status  : '已审核',
      pageSize: 30
    };
    $http.get('/api/dictionary?' + $.param($scope.search)).then(function (result) {
      $scope.morecommunities = result.data.data;
    });
  };

  // 实时更新列表数据
  $rootScope.$on('sync-detail-only', function (e, params) {
    $scope.getSources();
  });

  // 高亮操作
  $scope.init = function () {
    $scope.getLocation();
  };
  $scope.init();

  // 批量转移(旧)
  $scope.multiTransfer = function (type) {
    var multiTransferModal = $uibModal.open({
      animation  : true,
      backdrop   : false,
      templateUrl: 'multi-transfer.html',
      controller : 'MultiTransferCtrl',
      appendTo   : angular.element(document.getElementById('main-window')),
      size       : 'dialog-720 gray-header',
      resolve    : {
        share: function () {
          return {
            from: 'sources',
            type: type
          };
        }
      }
    });
  };

  $scope.selectionId = function (type) {
    $scope.selectIds = [];
    $scope.not_org   = false;
    angular.forEach($scope.gridApi.selection.getSelectedRows(), function (data, index, array) {
      $scope.selectIds.push(data.id);
      if ($scope.gov.roler.store_group) {
        if ($scope.gov.store_group_id != data.store_group_id && type == 'open')
          $scope.not_org = true;
        if ($scope.gov.store_group_id != data.verify_group_id && type == 'verify')
          $scope.not_org = true;
      }
      if ($scope.gov.roler.store) {
        if ($scope.gov.store_id != data.open_store_id && type == 'open')
          $scope.not_org = true;
        if ($scope.gov.store_id != data.verify_store_id && type == 'verify')
          $scope.not_org = true;
      }
      if ($scope.gov.roler.company_area) {
        if ($scope.gov.company_area_id != data.company_area_id && type == 'open')
          $scope.not_org = true;
        if ($scope.gov.company_area_id != data.verify_company_area_id && type == 'verify')
          $scope.not_org = true;
      }
      if ($scope.gov.roler.company_big_area) {
        if ($scope.gov.company_big_area_id != data.company_big_area_id && type == 'open')
          $scope.not_org = true;
        if ($scope.gov.company_big_area_id != data.verify_company_big_area_id && type == 'verify')
          $scope.not_org = true;
      }
    });
  }


  //批量转移（新）
  $scope.openTransfer = function (type) {
    $scope.selectionId(type);
    if (!$scope.selectIds.length && type != 'all') {
      Message.warning('请选择房源！');
      return false;
    }
    if ($scope.not_org && type != 'all') {
      Message.warning('您转移的房源含有非本部的房源，请剔除掉！');
      return false;
    }
    var modalInstance = $uibModal.open({
      animation  : true,
      backdrop   : false,
      templateUrl: (type == 'all') ? 'openTransfer-all.html' : 'openTransfer.html',
      controller : 'openTransferCtrl',
      appendTo   : angular.element(document.getElementById('main-window')),
      size       : 'dialog-510',
      resolve    : {
        share: function () {
          return {
            type     : type,
            selectIds: $scope.selectIds,
            selected : $scope.gridApi.selection.getSelectedRows()
          };
        }
      }
    });
    modalInstance.result.then(function (ref) {
      if (ref) {
        $scope.transfer_disabled = true;
        $scope.transfer_title    = '正在进行数据迁移, 请稍后自行刷新页面查查看进度。';
      }
      $scope.refreshWindow();
    }, function () {
    });
  };

  //批量转移按钮
  $scope.transfer_disabled = false;
  //批量转移按钮title
  $scope.transfer_title    = '批量转移';

  //监听批量转移是否停止
  $scope.refreshWindow = function () {
    $scope.myrefresh();
    $scope.refresh = $interval(function () {
      $scope.myrefresh();
    }, 5000, -1);
  };
  //监听批量转移是否停止接口
  $scope.myrefresh     = function () {
    $http.get('/api/source-transfer-cache').then(function (result) {
      if (result.data == 0) {
        $interval.cancel($scope.refresh);
        $scope.transfer_disabled = false;
        $scope.transfer_title    = '批量转移';
      } else {
        $scope.transfer_disabled = true;
        $scope.transfer_title    = '正在进行数据迁移, 请稍后自行刷新页面查查看进度。';
      }
    });
  };

  $scope.refreshWindow();
  // 窗口改变行错位现象
  $(window).resize(function () {
    $timeout(function () {
      var leftHeight = $(".ui-grid-render-container-body .ui-grid-viewport")[0].clientHeight
      $("#sources .ui-grid-render-container-left .ui-grid-viewport").css('height', leftHeight);
    }, 200)
  })
}).controller('AddSourceAlertCtrl', function ($scope, $rootScope, $http, share, $uibModalInstance, $uibModal) {
  $scope.communitySelect = '';
  $scope.ownerRelation   = share.relations;

  $scope.item = {
    sex       : '先生',
    relation  : '本人',
    phone_type: '手机'
  };

  $scope.if_locked = 0;
  $http.get('/api/getsourceconfig').then(function (result) {
    $scope.if_locked = result.data.locked;
    $scope.if_unit   = result.data.if_unit;
  });

  //手机号正则
  var mobile_num_reg   = /^1(3|4|5|7|8)\d{9}$/;
  //区号正则
  var phone_num_rge    = /^(0[1-9][0-9]{1,2})[0-9]{7,8}$/;
  //手机固话正则
  var mobile_phone_reg = /^(((13[0-9])|(15([0-3]|[5-9])|(17[0-9])|(18[0-9])))\d{8})|(0[1-2]\d{9})|(0[3-9]\d{10,11})$/;
  $scope.search        = {
    page    : 1,
    pageSize: 30,
    keywords: ''
  };

  $scope.close = function () {
    $uibModalInstance.close();
  };

  $scope.showInfo = function (source) {
    $.loading.show();
    $http.get('/api/source/' + source.id).then(function (result) {
      var time = Date.parse(new Date());
      $uibModal.open({
        backdrop   : false,
        templateUrl: '/source/next-sources.html?source_id=' + source.id + '&time=' + time,
        controller : 'nextsourceSCtrl',
        appendTo   : angular.element(document.getElementById('sources')),
        size       : 'dialog-800',
        resolve    : {
          share: function () {
            return {
              source : result.data.data,
              access : result.data.access,
              agent  : result.data.agent,
              setting: result.data.setting
            };
          }
        }
      });
      $.loading.hide();
    });
  };

  $scope.clearNoNum = function (obj, attr) {
    if (obj[attr] != undefined) {
      obj[attr] = obj[attr].replace(/[^\d.]/g, "");
      obj[attr] = obj[attr].replace(/^\./g, "");
      obj[attr] = obj[attr].replace(/\.{2,}/g, "");
      obj[attr] = obj[attr].replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    }
  };


  $scope.refresh        = function (keyword) {
    if (keyword != "") {
      $scope.search.keyword = keyword;
      $scope.search.status  = 1;
      $scope.getCommunities();
    }
  };
  $scope.clear          = function () {
    $scope.item.ridgepole_name = '';
    $scope.item.ridgepole_id   = '';
    $scope.item.unity_name     = '';
    $scope.item.unity_id       = '';
    $scope.item.floor_name     = '';
    $scope.item.total_floor    = '';
    $scope.item.floor_id       = '';
    $scope.item.door_name      = '';
    $scope.item.door_id        = '';
  };
  $scope.getCommunities = function () {
    $scope.search.status = '已审核';
    $http.get('/api/dictionary' + '?' + $.param($scope.search)).then(function (result) {
      $scope.communities = result.data.data;
    });
  };

  $scope.showRidgepole = function (community) {
    $scope.clear();
    $scope.item.community_id   = community.id;
    $scope.item.community_name = community.title;
    if (community.ridgepole_count) {
      $("#total_floor").attr('readonly', true);
      $("#door_name").attr('readonly', true);
      $("#floor_name").attr('readonly', true);
      $("#unity_name").attr('readonly', true);
      $("#ridgepole_name").attr('readonly', true);
      $("#showReselect").show();
      $uibModal.open({
        backdrop   : false,
        templateUrl: 'community-house.html',
        controller : 'ridgepoleSCtrl',
        appendTo   : angular.element(document.getElementById('sources')),
        size       : 'community-720',
        resolve    : {
          share: function () {
            return {
              community: community
            };
          }
        }
      });
    } else {
      if ($scope.if_locked) {
        $("#total_floor").attr('readonly', false);
        $("#door_name").attr('readonly', false);
        $("#floor_name").attr('readonly', false);
        if ($scope.if_unit) {
          $("#unity_name").attr('readonly', false);
        }
        $("#ridgepole_name").attr('readonly', false);
        $("#showReselect").hide();
      }
    }
  };

  $scope.showRidgepoleAgain = function (community_id) {
    $scope.clear();
    $scope.existenceSource   = false;
    $scope.item.community_id = community_id;
    $http.get('/api/community/' + $scope.item.community_id).then(function (result) {
      if (result.data.length != 0) {
        $uibModal.open({
          backdrop   : false,
          templateUrl: 'community-house.html',
          controller : 'ridgepoleSCtrl',
          appendTo   : angular.element(document.getElementById('sources')),
          size       : 'community-720',
          resolve    : {
            share: function () {
              return {
                community: result.data
              };
            }
          }
        });
      } else {
        $scope.existenceSource = false;
        $scope.is_verified     = true;
      }
    })
  };
  $rootScope.$on('selected-door', function (e, params) {
    $scope.item.ridgepole_name = params.info.floor.unity.ridgepole.name;
    $scope.item.ridgepole_id   = params.info.floor.unity.ridgepole.id;
    $scope.item.unity_name     = params.info.floor.unity.name;
    $scope.item.unity_id       = params.info.floor.unity.id;
    $scope.item.floor_name     = params.info.floor.name;
    $scope.item.floor_id       = params.info.floor.id;
    $scope.item.door_name      = params.info.name;
    $scope.item.total_floor    = params.info.floor.unity.max_layer;
    $scope.item.door_id        = params.info.id;
  });

  $scope.name = function () {
    if (parseInt($scope.item.total_floor) < parseInt($scope.item.floor_name)) {
      $scope.item.floor_name = '';
    }
  };

  $scope.total = function () {
    if (parseInt($scope.item.floor_name) > parseInt($scope.item.total_floor)) {
      $scope.item.total_floor = '';
    }
  };

  // 转入主界面   继续提交 房源开盘均在此文件

  $scope.nextOperation = function () {
    $scope.loading_add = false;
    // 验证手机号码及固话
    if (mobile_phone_reg.test($scope.item.mobile) && mobile_phone_reg.exec($scope.item.mobile)[0] === $scope.item.mobile) {
      $scope.loading_add    = true;
      $scope.item.main_num3 = '1';
    } else {
      Message.warning('电话格式不正确');
      return false;
    }
    $http.post('/api/check-source-by-mobile', $scope.item).then(function (result) {
      $scope.close();
      $uibModal.open({
        backdrop   : false,
        templateUrl: '/source/next-sources.html?source_id=0&time=' + Date.parse(new Date()),
        controller : 'nextsourceSCtrl',
        appendTo   : angular.element(document.getElementById('sources')),
        size       : 'dialog-800',
        resolve    : {
          share: function () {
            return {
              source : result.data.data,
              access : result.data.access,
              agent  : result.data.agent,
              setting: result.data.setting
            };
          }
        }
      });
    }, function (error) {
      Message.error(error);
      $scope.showexistenceSource = 1;
      $http.get('/api/checksource?' + $.param($scope.item)).then(function (response) {
        $scope.existenceSource = response.data;
      });
    }).finally(function () {
      $scope.loading_add = false;
    });
  };


  $scope.verifySource = function () {
    if (mobile_num_reg.test($scope.item.mobile) || phone_num_rge.test($scope.item.mobile)) {
      $scope.loading_add    = true;
      $scope.item.main_num3 = '1';
    } else {
      Message.warning('电话格式不正确');
      return false;
    }

    $http.post('/api/createtempsource', $scope.item).then(function (result) {
      Message.success('核盘成功!');
      $scope.close();

    }, function (result) {
      if (result.data.message == '门牌号已经存在。') {
        Message.warning(result.data.message);
      } else {
        Message.error(result);
      }
    }).finally(function () {
      $scope.showexistenceSource = 1;
      $http.get('/api/checksource?' + $.param($scope.item)).then(function (response) {
        $scope.existenceSource = response.data;
      });
      $scope.loading_add = false;
    });
  };

  $scope.running = function () {
    $scope.getCommunities();
  };
  $scope.running();
}).controller('openTransferCtrl', function ($scope, $uibModal, $uibModalInstance, share, $http, $interval, $rootScope) {
  $scope.close     = function () {
    $uibModalInstance.close($scope.loadding);
  };
  $scope.selectIds = share.selectIds;
  $scope.type      = share.type;
  $scope.set       = {
    setting: ['公司公盘', '大区公盘', '区公盘', '店公盘', '组公盘']
  };
  $scope.to_org    = {};
  $scope.from_org  = {};
  $scope.getOrg    = function (type) {
    if (type == 'to') {
      $scope.to_org.company_id          = $scope.org2.company_id;
      $scope.to_org.company_big_area_id = $scope.org2.company_big_area_id;
      $scope.to_org.company_area_id     = $scope.org2.company_area_id;
      $scope.to_org.store_id            = $scope.org2.store_id;
      $scope.to_org.store_group_id      = $scope.org2.store_group_id;
      $scope.to_org.agent_id            = $scope.org2.agent_id;
      if ($scope.org2.company_id === 0) {
        $scope.isClicked = false;
      } else {
        $scope.isClicked = true;
        if ($scope.type == 'all' && !$scope.from_org.company_id) {
          $scope.isClicked = false;
        }
      }
    } else {
      $scope.from_org.company_id          = $scope.org.company_id;
      $scope.from_org.company_big_area_id = $scope.org.company_big_area_id;
      $scope.from_org.company_area_id     = $scope.org.company_area_id;
      $scope.from_org.store_id            = $scope.org.store_id;
      $scope.from_org.store_group_id      = $scope.org.store_group_id;
      $scope.from_org.agent_id            = $scope.org.agent_id;
      if ($scope.org.company_id === 0) {
        $scope.isClicked = false;
      } else {
        $scope.isClicked = true;
        if ($scope.type == 'all' && !$scope.to_org.company_id) {
          $scope.isClicked = false;
        }
      }
    }
  };

  //转移
  $scope.transferSure = function (type) {

    if ($.isEmptyObject($scope.to_org)) {
      Message.warning('没选择转移目标');
      return false;
    }

    if (type == 'all' && $.isEmptyObject($scope.from_org)) {
      Message.warning('没选择原所属人');
      return false;
    }

    if (type == 'all' && angular.equals($scope.from_org, $scope.to_org)) {
      Message.warning('所属人相同');
      return false;
    }
    if (type != 'all') {
      $scope.sameOrg();
      if ($scope.same_org) {
        Message.warning('您转移的房源含有本目标的房源，请剔除掉！');
        return false;
      }
      if ($scope.open_not) {
        Message.warning('您转移的房源含有' + $scope.gov.respite_display + '的房源，请剔除掉！');
        return false;
      }
    }

    $scope.data = {};
    if (type == 'all') {
      $scope.data = {
        type    : type,
        from_org: $scope.from_org,
        to_org  : $scope.to_org
      };
    } else {
      $scope.data = {
        type  : type,
        ids   : $scope.selectIds,
        to_org: $scope.to_org
      };
    }
    swal({
      title              : '是否要转移此批房源?',
      text               : '转移后不可恢复',
      type               : "warning",
      confirmButtonColor : "#DD6B55",
      confirmButtonText  : "确定",
      cancelButtonText   : "取消",
      showCancelButton   : true,
      closeOnConfirm     : false,
      showLoaderOnConfirm: true
    }, function () {
      swal.close();
      $scope.loading_save = true;
      $scope.loadding     = true;
      $http.post('/api/source-transfer', $scope.data).then(function (result) {
        if (result.data.success) {
          if (result.data.work == 1) {
            $scope.refresh = $interval(function () {
              $scope.myrefresh(result.data.msg);
            }, 5000, -1);
          } else {
            toastr.success(result.data.msg, '操作成功', {
              progressBar  : true,
              positionClass: 'toast-top-center',
              closeButton  : true
            });
            $scope.close();
            $rootScope.$emit('sync-source-lists', {});
          }

        } else {
          Message.warning(result.data.msg);
          $scope.loading_save = false;
          $scope.loadding     = false;
        }
      }, function (error) {
        $scope.loading_save = false;
        $scope.loadding     = false;
        Message.error(error);
      });
    });
  };
  $scope.myrefresh    = function (data) {
    $http.get('/api/source-transfer-cache').then(function (result) {
      if (result.data == 0) {
        $scope.loadding = false;
        $interval.cancel($scope.refresh);
        toastr.success(data, '操作成功', {
          progressBar  : true,
          positionClass: 'toast-top-center',
          closeButton  : true
        });
        $scope.close();
        $rootScope.$emit('sync-source-lists', {});
      }
    });
  };

  //房源转移查找相同
  $scope.sameOrg = function () {
    $scope.same_org = false;
    $scope.open_not = false;
    angular.forEach(share.selected, function (data) {
      var data_org = {};
      if ($scope.type == 'open') {
        data_org = {
          agent_id           : data.open_agent_id,
          store_group_id     : data.store_group_id,
          store_id           : data.open_store_id,
          company_area_id    : data.company_area_id,
          company_big_area_id: data.company_big_area_id,
          company_id         : data.company_id
        };
      }
      if ($scope.type == 'verify') {
        data_org = {
          agent_id           : data.verify_agent_id,
          store_group_id     : data.verify_group_id,
          store_id           : data.verify_store_id,
          company_area_id    : data.verify_company_area_id,
          company_big_area_id: data.verify_company_big_area_id,
          company_id         : data.company_id
        };
      }
      if (angular.equals(data_org, $scope.to_org)) {
        $scope.same_org = true;
      }

      if (data.sale_status == '暂缓' && $scope.type == 'open') {
        $scope.open_not = true;
      }
    });
  };
});