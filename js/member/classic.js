$(function () {
//        $(document).on("keypress", function (e) {
//            console.log(['您的按键是', e.keyCode].join(":"));
//            if (e.keyCode == 49) {
//                alert('房源列表');
//            } else if (e.keyCode == 50) {
//                alert('房源跟进列表');
//            } else if (e.keyCode == 51) {
//                alert('客源列表');
//            } else if (e.keyCode == 52) {
//                alert('客源跟进列表');
//            }
//        });
  $.nav.dropdown();
  $.loading.resize();
  $.source.toggle();
  $.search.init();

  $.search.datePicker();
  $.format.numeric();
  $.format.phonenum();
  $.format.lessnum();
  $.format.biggernum();
  $.configure.init();
});

$(window).on('resize', function (e) {
  $.loading.resize();
  $.loading.drag();
});

$.configure = {
  init: function () {
    swal.setDefaults({confirmButtonText: '确定'});
  }
};

$.format = {
  numeric  : function () {
    $(document).on("input", ".numeric", function () {
      this.value = this.value.replace(/[^\d\.]/g, '');
    });
  },
  phonenum : function () {
    $(document).on("input", ".phonenum", function () {
      this.value = this.value.replace(/[^\d\.-]/g, '');
    });
  },
  lessnum  : function () {
    $(document).on("input", ".less_num", function () {
      var flag           = $(this).data('flag');
      var the_bigger_val = $(".bigger_num[data-flag=" + flag).val();
      if (the_bigger_val) {
        if (parseInt(this.value) > parseInt(the_bigger_val)) {
          this.value = '';
        }
      }
    });
  },
  biggernum: function () {
    var timer, delay = 900;
    $(document).on("keyup", ".bigger_num", function (e) {
      var _this = $(this);
      clearTimeout(timer);
      timer = setTimeout(function () {
        var flag         = _this.data('flag');
        var the_less_val = $(".less_num[data-flag=" + flag).val();
        if (the_less_val) {
          if (parseInt(_this.val()) < parseInt(the_less_val)) {
            _this.val('');
          }
        }
      }, delay);
    });
  }
};

$.loading    = {
  show  : function () {
    this.resize();
    $("#fx_loader").css('display', 'block');
  },
  hide  : function () {
    $("#fx_loader").css('display', 'none');
    $(".loading").css("display", "none");
    $(".loading-content").css("display", "block");
  },
  resize: function () {
    var page_height = $('.page').height(), grid = $('.member-page-grid');
    if (grid.hasClass('sourceOrclient')) {
      grid.height(page_height - 85);
    } else {
      grid.height(page_height - 54);
    }
    this.drag();
  },
  drag  : function () {
    var mouseStartPoint = {"left": 0, "top": 0};
    var mouseEndPoint   = {"left": 0, "top": 0};
    var mouseDragDown   = false;
    var oldP            = {"left": 0, "top": 0};
    var moveTartet;
    $(document).ready(function () {
      $(document).on("mousedown", ".modal-title", function (e) {
        if ($(e.target).parent().hasClass("close"))return;
        mouseDragDown   = true;
        moveTartet      = $(this).parent().parent().parent();
        mouseStartPoint = {"left": e.clientX, "top": e.clientY};
        oldP            = moveTartet.offset();
      });
      $(document).on("mouseup", function (e) {
        mouseDragDown   = false;
        moveTartet      = undefined;
        mouseStartPoint = {"left": 0, "top": 0};
        oldP            = {"left": 0, "top": 0};
      });
      $(document).on("mousemove", function (e) {
        if (!mouseDragDown || moveTartet == undefined)return;
        var mousX = e.clientX;
        var mousY = e.clientY;
        if (mousX < 0) mousX = 0;
        if (mousY < 0) mousY = 25;
        mouseEndPoint      = {"left": mousX, "top": mousY};
        mouseEndPoint.left = mouseEndPoint.left - (mouseStartPoint.left - oldP.left);
        mouseEndPoint.top  = mouseEndPoint.top - (mouseStartPoint.top - oldP.top);
        moveTartet.offset(mouseEndPoint);
      });
    });
  }
};
$.nav        = {
  dropdown: function () {
    $('ul.nav li.classic-dropdown').hover(function () {
      $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn();
    }, function () {
      $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut();
    });
  }
};
$.validation = {
  isMobile: function (mobile) {
    var pattern = /^(((13[0-9])|(14[0-9])|(15([0-3]|[5-9])|(17[0-9])|(18[0-9])))\d{8})|(0[1-2]\d{9})|(0[3-9]\d{10,11})$/;
    if (mobile !== undefined) {
      if ((pattern.test(mobile) && pattern.exec(mobile)[0] === mobile)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
};
$.source     = {
  toggle: function () {
    $(".ibox-search-wrapper").hover(function (e) {
      $(".ibox-search-wrapper-second").css("display", 'block');
      $(".openOrclose i").removeClass('fa-angle-double-down').addClass('fa-angle-double-up');
    }, function (e) {
      $(".ibox-search-wrapper-second").css("display", 'none');
      $(".openOrclose i").removeClass('fa-angle-double-up').addClass('fa-angle-double-down');
    });
  }
};

$.picker = {
  startDate      : null,
  endDate        : null,
  startPicker    : null,
  endPicker      : null,
  updateStartDate: function () {
    this.startPicker.setStartRange(this.startDate);
    this.endPicker.setStartRange(this.startDate);
    this.endPicker.setMinDate(this.startDate);
  },
  updateEndDate  : function () {
    this.startPicker.setEndRange(this.endDate);
    this.startPicker.setMaxDate(this.endDate);
    this.endPicker.setEndRange(this.endDate);
  },
  start          : function (startID, endID) {
    var me         = this;
    me.startPicker = new Pikaday({
      field   : document.getElementById(startID),
      position: 'Bottom left',

      onSelect: function () {
        me.startDate = this.getDate();
        $("body").data(startID, moment(me.startDate).format('YYYY-MM-DD'));
        $.search.watch({
          action: 'add',
          id    : startID,
          text  : "选择：开始时间"
        });
//          me.updateStartDate();
      }
    });
    me.endPicker   = new Pikaday({
      field   : document.getElementById(endID),
      position: 'Bottom left',
      onSelect: function () {
        me.endDate = this.getDate();
        $("body").data(endID, moment(me.endDate).format('YYYY-MM-DD'));
        $.search.watch({
          action: 'add',
          id    : endID,
          text  : "选择：结束时间"
        });
//          me.updateEndDate();
      }
    });
  },

  single: function (ID, callback) {
    return this.startPicker = new Pikaday({
      field   : document.getElementById(ID),
      position: 'Bottom left',
      onSelect: function () {
        return callback(this);
      }
    });
  },

  run: function () {
    var _startDate = this.startPicker.getDate();
    var _endDate   = this.endPicker.getDate();
    if (_startDate) {
      this.startDate = _startDate;
//        this.updateStartDate();
    }
    if (_endDate) {
      this.endDate = _endDate;
//        this.updateEndDate();
    }
  },

  stop: function () {
    this.startDate = null;
    this.updateStartDate();
    this.startPicker.setDate(null);
    this.endDate = null;
    this.updateEndDate();
    this.endPicker.setDate(null);
  }
};

$.search = {
  body            : $('body'),
  source          : function () {
    this.toggle();
    var $body     = this.body, $filterParams, parse;
    $filterParams = {
      category       : $body.data('search-category') != undefined ? $body.data('search-category') : null,
      district_id    : $body.data('search-district') != undefined ? $body.data('search-district') : null,
      business_id    : $body.data('search-business') != undefined ? $body.data('search-business') : null,
      community_id   : $body.data('search-community') != undefined ? $body.data('search-community') : null,
      community_name : $body.data('search-community-name') != undefined ? $body.data('search-community-name') : null,
      ridgepole      : $body.data('search-input-ridgepole') != undefined ? $body.data('search-input-ridgepole') : null,
      unity          : $body.data('search-input-unity') != undefined ? $body.data('search-input-unity') : null,
      room           : $body.data('search-input-room') != undefined ? $body.data('search-input-room') : null,
      uuid           : $body.data('search-input-uuid') != undefined ? $body.data('search-input-uuid') : null,
      company_area_id: $body.data('company_area_id') != undefined ? $body.data('company_area_id') : null,
      store_id       : $body.data('store_id') != undefined ? $body.data('store_id') : null,
      store_group_id : $body.data('store_group_id') != undefined ? $body.data('store_group_id') : null,
      agent_id       : ($body.data('agent_id') != undefined || $body.data('agent_id') == null) ? $body.data('agent_id') : $body.data('m'),
      agent_type     : ($body.data('search-agent-type') != undefined) ? $body.data('search-agent-type') : '开盘',
      date_type      : $body.data("search-trace-type") != undefined ? $body.data("search-trace-type") : '日期类型',
      date_type_min  : $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      date_type_max  : $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null,
      arch_type      : $body.data('search-arch') != undefined ? $body.data('search-arch') : null,
      status         : ($body.data('search-status') != undefined) ? $body.data('search-status') : ['流通'],
      area_min       : $body.data('search-input-area-min') != undefined ? $body.data('search-input-area-min') : null,
      area_max       : $body.data('search-input-area-max') != undefined ? $body.data('search-input-area-max') : null,
      price_sale_min : $body.data('search-input-sale-min') != undefined ? $body.data('search-input-sale-min') : null,
      price_sale_max : $body.data('search-input-sale-max') != undefined ? $body.data('search-input-sale-max') : null,
      price_lease_min: $body.data('search-input-lease-min') != undefined ? $body.data('search-input-lease-min') : null,
      price_lease_max: $body.data('search-input-lease-max') != undefined ? $body.data('search-input-lease-max') : null,
      floor_min      : $body.data('search-input-floors-min') != undefined ? $body.data('search-input-floors-min') : null,
      floor_max      : $body.data('search-input-floors-max') != undefined ? $body.data('search-input-floors-max') : null,
      floor_type     : $body.data('search-floor-type') != undefined ? $body.data('search-floor-type') : null,
      direction      : $body.data('search-direction') != undefined ? $body.data('search-direction') : null,
      community_type : $body.data('search-community-type') != undefined ? $body.data('search-community-type') : null,
      is_pic         : $body.data('erp_search_is_pic') != undefined ? $body.data('erp_search_is_pic') : false,
      is_key         : $body.data('erp_search_is_key') != undefined ? $body.data('erp_search_is_key') : false,
      is_only        : $body.data('erp_search_is_only') != undefined ? $body.data('erp_search_is_only') : false,
      is_intrust     : $body.data('erp_search_is_intrust') != undefined ? $body.data('erp_search_is_intrust') : false,
      is_close       : $body.data('erp_search_is_close') != undefined ? $body.data('erp_search_is_close') : false,
      is_school      : $body.data('erp_search_is_school') != undefined ? $body.data('erp_search_is_school') : false,
      is_metro       : $body.data('erp_search_is_metro') != undefined ? $body.data('erp_search_is_metro') : false,
      is_hot_gas     : $body.data('erp_search_is_hot_gas') != undefined ? $body.data('erp_search_is_hot_gas') : false,
      is_gas         : $body.data('erp_search_is_gas') != undefined ? $body.data('erp_search_is_gas') : false,
      is_public      : $body.data('erp_search_is_public') != undefined ? $body.data('erp_search_is_public') : false,
      is_verify      : $body.data('erp_search_is_verify') != undefined ? $body.data('erp_search_is_verify') : false,
      is_private     : $body.data('erp_search_is_private') != undefined ? $body.data('erp_search_is_private') : false,
      is_marked      : $body.data('erp_search_is_marked') != undefined ? $body.data('erp_search_is_marked') : false,
      come_from_type : $body.data('search-other-type') != undefined ? $body.data('search-other-type') : null,
      come_from_val  : $body.data('search-other-val') != undefined ? $body.data('search-other-val') : [],
      org            : $body.data('search-org') != undefined ? $body.data('search-org') : null
    };
    parse         = document.createElement('a');
    parse.href    = window.location.href;
    if (parse.search) {
      $body.data('agent_id', $body.data('m'));
    }
    return $filterParams;
  },
  client          : function () {
    var $body = this.body, $filterParams, parse;
    this.toggle();
    $filterParams = {
      category       : $body.data('search-category') != undefined ? $body.data('search-category') : null,
      district_id    : $body.data('search-district') != undefined ? $body.data('search-district') : [],
      business_id    : $body.data('search-business') != undefined ? $body.data('search-business') : [],
      community_id   : $body.data('search-community') != undefined ? $body.data('search-community') : null,
      uuid           : $body.data('search-input-uuid') != undefined ? $body.data('search-input-uuid') : null,
      company_area_id: $body.data('company_area_id') != undefined ? $body.data('company_area_id') : [],
      store_id       : $body.data('store_id') != undefined ? $body.data('store_id') : [],
      store_group_id : $body.data('store_group_id') != undefined ? $body.data('store_group_id') : [],
      agent_id       : ($body.data('agent_id') != undefined || $body.data('agent_id') == null) ? $body.data('agent_id') : $body.data('m'),
      date_type      : $body.data("search-trace-type") != undefined ? $body.data("search-trace-type") : '日期类型',
      date_type_min  : $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      date_type_max  : $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null,
      arch_type      : $body.data('search-arch') != undefined ? $body.data('search-arch') : [],
      direction      : $body.data('search-direction') != undefined ? $body.data('search-direction') : [],
      area_min       : $body.data('search-input-area-min') != undefined ? $body.data('search-input-area-min') : null,
      area_max       : $body.data('search-input-area-max') != undefined ? $body.data('search-input-area-max') : null,
      price_sale_min : $body.data('search-input-sale-min') != undefined ? $body.data('search-input-sale-min') : null,
      price_sale_max : $body.data('search-input-sale-max') != undefined ? $body.data('search-input-sale-max') : null,
      price_lease_min: $body.data('search-input-lease-min') != undefined ? $body.data('search-input-lease-min') : null,
      price_lease_max: $body.data('search-input-lease-max') != undefined ? $body.data('search-input-lease-max') : null,
      floor_min      : $body.data('search-input-floors-min') != undefined ? $body.data('search-input-floors-min') : null,
      floor_max      : $body.data('search-input-floors-max') != undefined ? $body.data('search-input-floors-max') : null,
      floor_type     : $body.data('search-floor-type') != undefined ? $body.data('search-floor-type') : [],
      community_type : $body.data('search-community-type') != undefined ? $body.data('search-community-type') : [],
      level          : $body.data('search-level') != undefined ? $body.data('search-level') : [],
      status         : $body.data('search-status') != undefined ? $body.data('search-status') : ['流通'],
      is_urgent      : $body.data('erp_search_is_urgent') != undefined ? $body.data('erp_search_is_urgent') : false,
      is_all         : $body.data('erp_search_is_all') != undefined ? $body.data('erp_search_is_all') : false,
      is_school      : $body.data('erp_search_is_school') != undefined ? $body.data('erp_search_is_school') : false,
      is_metro       : $body.data('erp_search_is_metro') != undefined ? $body.data('erp_search_is_metro') : false,
      is_public      : $body.data('erp_search_is_public') != undefined ? $body.data('erp_search_is_public') : false,
      come_from_type : $body.data('search-other-type') != undefined ? $body.data('search-other-type') : null,
      come_from_val  : $body.data('search-other-val') != undefined ? $body.data('search-other-val') : [],
      org            : $body.data('search-org') != undefined ? $body.data('search-org') : null
    };
    parse         = document.createElement('a');
    parse.href    = window.location.href;
    if (parse.search) {
      $body.data('agent_id', $body.data('m'));
    }
    return $filterParams;
  },
  trace           : function () {
    var $body     = this.body, $filterParams;
    $filterParams = {
      start_at       : $body.data('search-input-date-min') != undefined ? $body.data('search-input-date-min') : null,
      end_at         : $body.data('search-input-date-max') != undefined ? $body.data('search-input-date-max') : null,
      company_area_id: $body.data('company_area_id') != undefined ? $body.data('company_area_id') : [],
      store_id       : $body.data('store_id') != undefined ? $body.data('store_id') : [],
      store_group_id : $body.data('store_group_id') != undefined ? $body.data('store_group_id') : [],
      agent_id       : ($body.data('agent_id') != undefined || $body.data('agent_id') == null) ? $body.data('agent_id') : $body.data('m'),
      status         : $body.data('search-status') != undefined ? $body.data('search-status') : null,
      category       : $body.data('search-category') != undefined ? $body.data('search-category') : null,
      type           : $body.data('search-type') != undefined ? $body.data('search-type') : null,
      uuid           : $body.data('search-uuid') != undefined ? $.trim($body.data('search-uuid')) : null
    };
    return $filterParams;
  },
  clear_trace     : function () {
    this.body.data('company_area_id', [])
      .data('store_id', [])
      .data('store_group_id', [])
      .data('agent_id', null)
      .data('search-trace-type', null)
      .data('search-date-type', null)
      .data("search-input-date-min", null)
      .data("search-input-date-max", null)
      .data('search-category', null)
      .data('search-type', null)
      .data('search-code', null)
      .data('search-uuid', null)
      .data('search-status', '');
    // 清除Droplist
    $(".erp-droplist").data('param', null);
    $(".droplist-text").text('不限');
    //清除部门
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text('区、店、组');
    // 清除经纪人
    $(".agentdroplist-text", $("#search-agent")).text('经纪人');
    $(".erp-agentdroplist-list").removeClass('on').addClass('off');
    // 清除输入框
    $(".search-input").val(null);
    $(".erp-droplist-list").removeClass('on').addClass('off');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
    //重置日期
    $.picker.stop();
  },
  key             : function () {
    return {
      date_type      : this.body.data('search-date-type') != undefined ? this.body.data('search-date-type') : null,
      start_at       : this.body.data('search-input-date-min') != undefined ? this.body.data('search-input-date-min') : null,
      end_at         : this.body.data('search-input-date-max') != undefined ? this.body.data('search-input-date-max') : null,
      company_area_id: this.body.data('company_area_id') != undefined ? this.body.data('company_area_id') : [],
      store_id       : this.body.data('store_id') != undefined ? this.body.data('store_id') : [],
      store_group_id : this.body.data('store_group_id') != undefined ? this.body.data('store_group_id') : [],
      agent_id       : (this.body.data('agent_id') != undefined || this.body.data('agent_id') == null) ? this.body.data('agent_id') : this.body.data('m'),
      status         : this.body.data('search-status') != undefined ? this.body.data('search-status') : null,
      approve_status : this.body.data('search-approve-status') != undefined ? this.body.data('search-approve-status') : null,
      type_uuid      : this.body.data('search-type-uuid') != undefined ? this.body.data('search-type-uuid') : null,
      uuid           : this.body.data('search-uuid') != undefined ? $.trim(this.body.data('search-uuid')) : null,

    };
  },
  clear_key       : function () {
    this.body.data('search-date-type', null)
      .data("search-input-date-min", null)
      .data("search-input-date-max", null)
      .data('company_area_id', [])
      .data('store_id', [])
      .data('store_group_id', [])
      .data('agent_id', null)
      .data('search-status', null)
      .data('search-approve-status', null)
      .data('search-type-uuid', null)
      .data('search-uuid', null);
    // 清除Droplist
    $(".erp-droplist").data('param', null);
    $(".droplist-text", $("#search-date-type")).text('不限');
    $(".droplist-text", $("#search-status")).text('不限');
    $(".droplist-text", $("#search-approve-status")).text('不限');

    $(".droplist-text", $("#search-type-uuid")).text('不限');
    $(".droplist-text", $("#search-uuid")).text('');
    //清除部门
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text('区、店、组');
    // 清除经纪人
    $(".agentdroplist-text", $("#search-agent")).text('经纪人');
    $(".erp-agentdroplist-list").removeClass('on').addClass('off');
    // 清除输入框
    $(".search-input").val(null);
    $(".erp-droplist-list").removeClass('on').addClass('off');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
    //重置日期
    $.picker.stop();
  },
  only            : function () {
    return {
      date_type      : this.body.data('search-date-type') != undefined ? this.body.data('search-date-type') : null,
      start_at       : this.body.data('search-input-date-min') != undefined ? this.body.data('search-input-date-min') : null,
      end_at         : this.body.data('search-input-date-max') != undefined ? this.body.data('search-input-date-max') : null,
      company_area_id: this.body.data('company_area_id') != undefined ? this.body.data('company_area_id') : [],
      store_id       : this.body.data('store_id') != undefined ? this.body.data('store_id') : [],
      store_group_id : this.body.data('store_group_id') != undefined ? this.body.data('store_group_id') : [],
      agent_id       : (this.body.data('agent_id') != undefined || this.body.data('agent_id') == null) ? this.body.data('agent_id') : this.body.data('m'),
      status         : this.body.data('search-status') != undefined ? this.body.data('search-status') : null,
      verify_status  : this.body.data('verify-status') != undefined ? this.body.data('verify-status') : null,
      uuid           : this.body.data('search-uuid') != undefined ? $.trim(this.body.data('search-uuid')) : null,
      is_only        : $('#search-is-only').is(':checked') ? true : false
    };
  },
  clear_only      : function () {
    this.body.data('search-date-type', null)
      .data("search-input-date-min", null)
      .data("search-input-date-max", null)
      .data('company_area_id', [])
      .data('store_id', [])
      .data('store_group_id', [])
      .data('agent_id', null)
      .data('search-status', null)
      .data('search-uuid', null)
      .data('verify-status', null);

    $('#search-is-only').prop('checked', false);

    // 清除Droplist
    $(".erp-droplist").data('param', null);
    $(".droplist-text", $("#search-date-type")).text('不限');
    $(".droplist-text", $("#search-status")).text('不限');
    $(".droplist-text", $("#verify-status")).text('不限');
    //清除部门
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text('区、店、组');
    // 清除经纪人
    $(".agentdroplist-text", $("#search-agent")).text('经纪人');
    $(".erp-agentdroplist-list").removeClass('on').addClass('off');
    // 清除输入框
    $(".search-input").val(null);
    $(".erp-droplist-list").removeClass('on').addClass('off');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
    //重置日期
    $.picker.stop();
  },
  delegation      : function () {
    var $body = this.body;
    return {
      created_at_from: $body.data('search-input-date-min') != undefined ? $body.data('search-input-date-min') : null,
      created_at_to  : $body.data('search-input-date-max') != undefined ? $body.data('search-input-date-max') : null,
      company_area_id: $body.data('company_area_id') != undefined ? $body.data('company_area_id') : [],
      store_id       : $body.data('store_id') != undefined ? $body.data('store_id') : [],
      store_group_id : $body.data('store_group_id') != undefined ? $body.data('store_group_id') : [],
      agent_id       : ($body.data('agent_id') != undefined || $body.data('agent_id') == null) ? $body.data('agent_id') : $body.data('m'),
      status         : $body.data('search-status') != undefined ? $body.data('search-status') : null,
      uuid           : $body.data('search-uuid') != undefined ? $body.data('search-uuid') : null
    };
  },
  clear_delegation: function () {
    // 清除Droplist
    $(".erp-droplist").data('param', null);
    $(".droplist-text", $("#search-status")).text('不限');
    $(".droplist-text", $("#search-code")).text('编号类型');
    //清除部门
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text('区、店、组');
    // 清除经纪人
    $(".agentdroplist-text", $("#search-agent")).text('经纪人');
    $(".erp-agentdroplist-list").removeClass('on').addClass('off');
    // 清除输入框
    $(".search-input").val(null);
    $(".erp-droplist-list").removeClass('on').addClass('off');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
    //重置日期
    $.picker.stop();
  },

  //  获取日程表参数
  schedule               : function () {
    var $body           = this.body;
    var schedule_params = {
      company_area_id: $body.data('company_area_id') != undefined ? $body.data('company_area_id') : [],
      store_id       : $body.data('store_id') != undefined ? $body.data('store_id') : [],
      store_group_id : $body.data('store_group_id') != undefined ? $body.data('store_group_id') : [],
      agent_id       : ($body.data('agent_id') != undefined || $body.data('agent_id') == null) ? $body.data('agent_id') : $body.data('m'),
      type           : $body.data('search-trace-type') != undefined ? $body.data('search-trace-type') : null,
      date_type      : $body.data('search-date-type') != undefined ? $body.data('search-date-type') : null,
      date_type_min  : $body.data("schedule_at_begin") != undefined ? $body.data("schedule_at_begin") : null,
      date_type_max  : $body.data("schedule_at_end") != undefined ? $body.data("schedule_at_end") : null,
      category       : $body.data('search-category') != undefined ? $body.data('search-category') : null,
      schedule_type  : $body.data('search-schedule-type') != undefined ? $body.data('search-schedule-type') : null,
      code           : $body.data('search-code') != undefined ? $body.data('search-code') : null,
      status         : $body.data('search-status') != undefined ? $body.data('search-status') : null,
      client_status  : $body.data('client-status') != undefined ? $body.data('client-status') : null,
      uuid           : $body.data('search-input-code') != undefined ? $.trim($body.data('search-input-code')) : null
    };
    if (schedule_params.type != 'SK' || schedule_params.type.length == 0) {

      if (schedule_params.schedule_type == 'client') {
        if (schedule_params.client_status != null && schedule_params.client_status.length != 0) {

          schedule_params.type   = 'DK';
          schedule_params.status = null;
        }
      }
      if (schedule_params.type == 'DK') {

        if (schedule_params.schedule_type == 'owner_status') {
          if (schedule_params.client_status != null && schedule_params.client_status.length != 0) {
            schedule_params.client_status = null;
            schedule_params.status        = null;
          }

        }
      } else {
        if (schedule_params.schedule_type == 'owner_status') {
          if (schedule_params.client_status != null && schedule_params.client_status.length != 0) {
            schedule_params.type   = 'SK';
            schedule_params.status = null;
          }

        }
      }
    } else {
      if (schedule_params.schedule_type == 'client') {
        schedule_params.client_status = null;
        schedule_params.status        = null;
      }
      if (schedule_params.schedule_type == 'schedule') {
        schedule_params.client_status = null;
      }

    }
    return schedule_params;
  },
  clear_schedule         : function () {
    this.body.data('company_area_id', [])
      .data('store_id', [])
      .data('store_group_id', [])
      .data('agent_id', null)
      .data('search-trace-type', null)
      .data('search-date-type', null)
      .data("schedule_at_begin", null)
      .data("schedule_at_end", null)
      .data('search-category', null)
      .data('search-schedule-type', null)
      .data('search-code', null)
      .data('search-input-code', null)
      .data('search-status', '不限')
      .data('search-bargain-type', '全部')
      .data('search-bargain-area', '所有');
    // 清除Droplist
    $(".erp-droplist").data('param', null);
    $(".droplist-text", $("#search-trace-type")).text('不限');
    $(".droplist-text", $("#search-date-type")).text('不限');
    $(".droplist-text", $("#search-status")).text('不限');
    $(".droplist-text", $("#search-category")).text('不限');
    $(".droplist-text", $("#search-code")).text('编号类型');
    $(".droplist-text", $("#search-schedule-type")).text('状态类型');
    $(".droplist-text", $("#client-status")).text('不限');
    $(".droplist-text", $("#search-bargain-type")).text('全部');
    $(".droplist-text", $("#search-bargain-area")).text('所有');
    //清除部门
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text('区、店、组');
    // 清除经纪人
    $(".agentdroplist-text", $("#search-agent")).text('经纪人');
    $(".erp-agentdroplist-list").removeClass('on').addClass('off');
    // 清除输入框
    $(".search-input").val(null);
    $(".erp-droplist-list").removeClass('on').addClass('off');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
    //重置日期
    // $.picker.stop();
  },
  bargain                : function () {
    var $body  = this.body, parse;
    parse      = document.createElement('a');
    parse.href = window.location.href;
    if (parse.search) {
      $body.data('agent_id', $body.data('m'));
    }
    return {
      type              : $body.data('search-category') != undefined ? $body.data('search-category') : [],
      community_id      : $body.data('search-community') != undefined ? $body.data('search-community') : null,
      status            : $body.data('search-status') != undefined ? $body.data('search-status') : '不限',
      warrant_status    : $body.data('search-warrant-status') != undefined ? $body.data('search-warrant-status') : '不限',
      date_type         : $body.data('search-trace-type') != undefined ? $body.data('search-trace-type') : '签约日期',
      code              : $body.data('search-code') != undefined ? $body.data('search-code') : null,
      uuid              : $body.data('search-input-uuid') != undefined ? $body.data('search-input-uuid') : null,
      date_type_min     : $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      date_type_max     : $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null,
      come_from         : $body.data("search-laiyuan") != undefined ? $.trim($body.data("search-laiyuan")) : null,
      bargain_type      : $body.data("search-bargain-type") != undefined ? $.trim($body.data("search-bargain-type")) : null,
      bargain_area      : $body.data("search-bargain-area") != undefined ? $.trim($body.data("search-bargain-area")) : null,
      sponsor_type      : $body.data("search-sponsor-type") != undefined ? $.trim($body.data("search-sponsor-type")) : null,
      sponsor_value     : $body.data("search-sponsor-value") != undefined ? $.trim($body.data("search-sponsor-value")) : null,
      // 提成工资，新增搜索项 ERP-Scrum/SERP-1725
      is_commission      : $("#search-is-commission").is(":checked") ? $("#search-is-commission").is(":checked") : null,
      // 提成工资，新增搜索项 ERP-Scrum/SERP-2256
      is_pass        : $body.data('search-is-pass') != undefined ? $body.data('search-is-pass') : '不限',
      is_compute     : $body.data('search-is-compute') != undefined ? $body.data('search-is-compute') : '不限'
    };
  },
  clear_bargain          : function () {
    this.body.data('search-category', [])
      .data('search-community', null)
      .data('search-sponsor-type', null)
      .data('search-sponsor-value', null)
      .data('search-laiyuan', null)
      .data('search-status', '不限')
      .data('search-warrant-status', '不限')
      .data('search-trace-type', null)
      .data('search-input-date-min', null)
      .data('search-input-date-max', null)
      .data("search-code", null)
      .data('search-input-uuid', null)
      .data('search-bargain-type', null)
      .data('search-bargain-area', null)
      .data('search-is-pass', '不限')
      .data('search-is-compute', '不限');
    // 提成工资，新增搜索项 ERP-Scrum/SERP-1725 清除 checkbox
    $("#search-is-commission").attr("checked", false);
    $("#search-confirm").attr("checked", false);

    // 清除Droplist
    $(".erp-droplist").data('param', null);
    $(".droplist-text", $("#search-sponsor-type")).text('不限');
    $(".droplist-text", $("#search-trace-type")).text('不限');
    $(".droplist-text", $("#search-status")).text('不限');
    $(".droplist-text", $("#search-warrant-status")).text('不限');
    // $(".droplist-text", $("#search-category")).text('不限');
    $("span.checkbox-text").text('不限');
    $("li.erp-checkbox-list", $("#search-category")).removeClass('on').addClass('off');
    $("#search-category").data('params', ['不限']).data('val', '不限').data('default', '不限');

    $(".droplist-text", $("#search-code")).text('编号类型');
    $(".droplist-text", $("#search-laiyuan")).text('不限');
    $(".droplist-text", $("#search-bargain-type")).text('全部');
    $(".droplist-text", $("#search-bargain-area")).text('所有');
    $(".droplist-text", $("#search-is-pass")).text('不限');
    $(".droplist-text", $("#search-is-compute")).text('不限');
    //清除部门
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text('区、店、组');
    // 清除经纪人
    $(".agentdroplist-text", $("#search-agent")).text('经纪人');
    $(".erp-agentdroplist-list").removeClass('on').addClass('off');
    // 清除输入框
    $(".search-input").val(null);
    $(".erp-comunity-dictionary-toggle").val(null);
    $(".erp-droplist-list").removeClass('on').addClass('off');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
    //重置日期
    $.picker.stop();
  },
  apply                  : function () {
    var $body  = this.body, parse;
    parse      = document.createElement('a');
    parse.href = window.location.href;
    if (parse.search) {
      $body.data('agent_id', $body.data('m'));
    }
    return {
      date_type_min: $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      date_type_max: $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null,
      status       : $body.data("search-status-type") != undefined ? $body.data("search-status-type") : null,
      transact     : $body.data("search-transact-type") != undefined ? $body.data("search-transact-type") : '全部',
      setting_id   : $("#search-apply-type").val(),
    };
  },
  clear_apply            : function () {
    this.body.data("search-status-type", '')
      .data("search-transact-type", '')
      .data("search-input-date-min", moment().startOf('month').format('YYYY-MM-DD'))
      .data("search-input-date-max", moment().format('YYYY-MM-DD'));
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
    $(".droplist-text", $("#search-status-type")).text('全部');
    $(".droplist-text", $("#search-transact-type")).text('全部');
    $(".search-input").val(moment().format('YYYY-MM-DD')).addClass('is_search_on');
    $(".search-date-min").val(moment().startOf('month').format('YYYY-MM-DD'));
    $("#search-apply-type option:first").prop("selected", 'selected');

  },
  warrant                : function () {
    var $body = this.body;
    return {
      type         : $body.data('search-warrant-type') != undefined ? $body.data('search-warrant-type') : null,
      date_type    : $body.data('search-warrant-date-type') != undefined ? $body.data('search-warrant-date-type') : null,
      date_type_min: $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      date_type_max: $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null,
      code_type    : $body.data('search-warrant-code-type') != undefined ? $body.data('search-warrant-code-type') : null,
      code         : $body.data('search-warrant-input-code') != undefined ? $body.data('search-warrant-input-code') : null,
      status       : $body.data('search-status') != undefined ? $body.data('search-status') : null,
      step_type    : $body.data('search-warrant-step-type') != undefined ? $body.data('search-warrant-step-type') : null,
      name         : $body.data('search-warrant-name') != undefined ? $body.data('search-warrant-name') : null
    };
  },
  clear_warrant          : function () {
    this.body.data('search-warrant-type', null)
      .data('search-warrant-date-type', null)
      .data('search-input-date-min', null)
      .data('search-input-date-max', null)
      .data("search-warrant-code-type", null)
      .data('search-warrant-input-code', null)
      .data('search-status', null)
      .data('search-warrant-step-type', null)
      .data('search-warrant-name', null);

    // 清除Droplist
    $(".erp-droplist").data('param', null);
    $(".droplist-text", $("#search-warrant-type")).text('不限');
    $(".droplist-text", $("#search-warrant-date-type")).text('不限');
    $(".droplist-text", $("#search-warrant-code-type")).text('编号类型');
    $(".droplist-text", $("#earch-warrant-input-code")).text('不限');
    $(".droplist-text", $("#search-status")).text('不限');
    $(".droplist-text", $("#search-warrant-step-type")).text('不限');
    $(".droplist-text", $("#search-warrant-name")).text('不限');

    // 清除输入框
    $(".search-input").val(null);
    $(".erp-comunity-dictionary-toggle").val(null);
    $(".erp-droplist-list").removeClass('on').addClass('off');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
    //重置日期
    // $.picker.stop();
  },
  deposit                : function () {
    var $body = this.body;
    return {
      type           : $body.data('search-category') != undefined ? $body.data('search-category') : null,
      // community_id   : $body.data('search-community') != undefined ? $body.data('search-community') : null,
      // company_area_id: $body.data('company_area_id') != undefined ? $body.data('company_area_id') : [],
      // store_id       : $body.data('store_id') != undefined ? $body.data('store_id') : [],
      // store_group_id : $body.data('store_group_id') != undefined ? $body.data('store_group_id') : [],
      // agent_id       : ($body.data('agent_id') != undefined || $body.data('agent_id') == null) ? $body.data('agent_id') : $body.data('m'),
      date_type      : $body.data('search-trace-type') != undefined ? $body.data('search-trace-type') : '',
      date_type_min  : $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      date_type_max  : $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null,
      status         : $body.data('search-status') != undefined ? $body.data('search-status') : '不限',
      code           : $body.data('search-code') != undefined ? $body.data('search-code') : '客源编号',
      uuid           : $body.data('search-input-uuid') != undefined ? $.trim($body.data('search-input-uuid')) : null
    };
  },
  clear_deposit          : function () {
    this.body.data('search-category', null)
      // .data('search-community', null)
      // .data('company_area_id', [])
      // .data('store_id', [])
      // .data('store_group_id', [])
      // .data('agent_id', null)
      .data('search-trace-type', null)
      .data('search-input-date-min', null)
      .data('search-input-date-max', null)
      .data('search-status', '不限')
      .data("search-code", null)
      .data('search-input-uuid', null);
    // 清除Droplist
    $(".erp-droplist").data('param', null);
    $(".droplist-text", $("#search-trace-type")).text('不限');
    $(".droplist-text", $("#search-status")).text('不限');
    $(".droplist-text", $("#search-category")).text('不限');
    $(".droplist-text", $("#search-code")).text('客源编号');
    //清除部门
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text('区、店、组');
    // 清除经纪人
    $(".agentdroplist-text", $("#search-agent")).text('经纪人');
    $(".erp-agentdroplist-list").removeClass('on').addClass('off');
    // 清除输入框
    $(".search-input").val(null);
    $(".erp-comunity-dictionary-toggle").val(null);
    $(".erp-droplist-list").removeClass('on').addClass('off');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
    //重置日期
    $.picker.stop();
  },
  task                   : function () {
    var $body = this.body;
    return {
      company_area_id: $body.data('company_area_id') != undefined ? $body.data('company_area_id') : [],
      store_id       : $body.data('store_id') != undefined ? $body.data('store_id') : [],
      store_group_id : $body.data('store_group_id') != undefined ? $body.data('store_group_id') : [],
      agent_id       : ($body.data('agent_id') != undefined || $body.data('agent_id') == null) ? $body.data('agent_id') : $body.data('m'),
      type           : $body.data('search-type') != undefined ? $body.data('search-type') : $("#search-type").data('param')
    };
  },
  clear_task             : function () {
    this.body.data('company_area_id', [])
      .data('store_id', [])
      .data('store_group_id', [])
      .data('search-type', $("#search-type").data('param'))
      .data('agent_id', null);
    //清除部门
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text($(".cascading-text").data('info'));
    $(".droplist-text", $("#search-task-filter-type")).text('不限');
    // 清除经纪人
    // $(".agentdroplist-text", $("#search-agent")).text($(".erp-agentdroplist-menu").children().first().data('key'));
    $(".agentdroplist-text", $("#search-agent")).text('经纪人');
    $(".erp-agentdroplist-list").removeClass('on').addClass('off');
    // 清除输入框
    $(".search-input").val(null);
    $(".erp-droplist-list").removeClass('on').addClass('off');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
    //清除日期
    $('#task_month').val($('#task_month').data('default-text'));
    //清楚快捷搜索
    $("#kuaijieriqisousuo").val("null");
  },
  fines                  : function () {
    var $body = this.body;
    return {
      company_area_id: $body.data('company_area_id') != undefined ? $body.data('company_area_id') : [],
      store_id       : $body.data('store_id') != undefined ? $body.data('store_id') : [],
      store_group_id : $body.data('store_group_id') != undefined ? $body.data('store_group_id') : [],
      agent_id       : ($body.data('agent_id') != undefined || $body.data('agent_id') == null) ? $body.data('agent_id') : $body.data('m'),
      district_id    : $body.data('search-district') != undefined ? $body.data('search-district') : null,
      business_id    : $body.data('search-business') != undefined ? $body.data('search-business') : null,
      community_id   : $body.data('search-community') != undefined ? $body.data('search-community') : null,
    };
  },
  clear_fines            : function () {
    this.body.data('company_area_id', [])
      .data('store_id', [])
      .data('store_group_id', [])
      .data('agent_id', null)
      .data('search-district', null)
      .data('search-business', null)
      .data('search-community', null);
    //清除部门
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text('区、店、组');
    // 清除经纪人
    $(".agentdroplist-text", $("#search-agent")).text('经纪人');
    $(".erp-agentdroplist-list").removeClass('on').addClass('off');
    // 清除输入框
    $(".search-input").val(null);
    $(".erp-droplist-list").removeClass('on').addClass('off');
    // 清除复选框
    $(".erp-checkbox").data('params', []).data('keys', []);
    $(".checkbox-text").text('不限');
    // 清除商圈
    $(".erp-business-dictionary-toggle").val(null);
    $(".erp-business-dictionary-box-list").removeClass('on').addClass('off');
    $(".erp-business-dictionary").data('district', []);
    // 清除楼盘
    $(".erp-comunity-dictionary-toggle").val(null);
    $(".erp-comunity-dictionary-box-list").removeClass('on').addClass('off');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
    //重置日期
    $.picker.stop();
  },
  sourceDoing            : function () {
    var $body = this.body;
    return {
      company_area_id: $body.data('company_area_id') != undefined ? $body.data('company_area_id') : [],
      store_id       : $body.data('store_id') != undefined ? $body.data('store_id') : [],
      store_group_id : $body.data('store_group_id') != undefined ? $body.data('store_group_id') : [],
      agent_id       : ($body.data('agent_id') != undefined || $body.data('agent_id') == null) ? $body.data('agent_id') : $body.data('m'),
      category       : $body.data('search-type') != undefined ? $body.data('search-type') : 'sale',
      way            : $body.data('search-cate') != undefined ? $body.data('search-cate') : ''/*,
      start_at       : $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      end_at         : $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null*/
    };
  },
  clear_sourceDoing      : function () {
    this.body.data('company_area_id', [])
      .data('store_id', [])
      .data('store_group_id', [])
      .data('agent_id', null)
      .data("search-type", 'sale')
      .data("search-cate", '')
      // .data("search-input-date-min", moment().startOf('month').format('YYYY-MM-DD'))
      // .data("search-input-date-max", moment().format('YYYY-MM-DD'));
    //清除部门
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text('区、店、组');
    // 清除经纪人
    $(".agentdroplist-text", $("#search-agent")).text('经纪人');
    $(".erp-agentdroplist-list").removeClass('on').addClass('off');
    // 清除输入框
    // $(".search-date-min").val(moment().startOf('month').format('YYYY-MM-DD'));
    // $(".search-date-max").val(moment().format('YYYY-MM-DD'));
    $(".erp-droplist-list").removeClass('on').addClass('off');
    $(".droplist-text", $("#search-type")).text('买卖');
    $(".droplist-text", $("#search-cate")).text($('#search-cate').data('default'));
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
  },
  clientDoing            : function () {
    var $body = this.body;
    return {
      company_area_id: $body.data('company_area_id') != undefined ? $body.data('company_area_id') : [],
      store_id       : $body.data('store_id') != undefined ? $body.data('store_id') : [],
      store_group_id : $body.data('store_group_id') != undefined ? $body.data('store_group_id') : [],
      agent_id       : ($body.data('agent_id') != undefined || $body.data('agent_id') == null) ? $body.data('agent_id') : $body.data('m'),
      category       : $body.data('search-type') != undefined ? $body.data('search-type') : 'sale',
      way            : $body.data('search-cate') != undefined ? $body.data('search-cate') : ''
      // start_at       : $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      // end_at         : $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null
    };
  },
  clear_clientDoing      : function () {
    this.body.data('company_area_id', [])
      .data('store_id', [])
      .data('store_group_id', [])
      .data('agent_id', null)
      .data("search-type", 'sale')
      .data("search-cate", '')
      // .data("search-input-date-min", moment().startOf('month').format('YYYY-MM-DD'))
      // .data("search-input-date-max", moment().format('YYYY-MM-DD'));
    //清除部门
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text('区、店、组');
    // 清除经纪人
    $(".agentdroplist-text", $("#search-agent")).text('经纪人');
    $(".erp-agentdroplist-list").removeClass('on').addClass('off');
    // 清除输入框
    // $(".search-date-min").val(moment().startOf('month').format('YYYY-MM-DD'));
    // $(".search-date-max").val(moment().format('YYYY-MM-DD'));
    $(".erp-droplist-list").removeClass('on').addClass('off');
    $(".droplist-text", $("#search-type")).text('买卖');
    $(".droplist-text", $("#search-cate")).text($('#search-cate').data('default'));
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
  },
  expandDoing            : function () {
    var $body = this.body;
    return {
      company_area_id: $body.data('company_area_id') != undefined ? $body.data('company_area_id') : [],
      store_id       : $body.data('store_id') != undefined ? $body.data('store_id') : [],
      store_group_id : $body.data('store_group_id') != undefined ? $body.data('store_group_id') : [],
      agent_id       : ($body.data('agent_id') != undefined || $body.data('agent_id') == null) ? $body.data('agent_id') : $body.data('m'),
      way            : $body.data('search-cate') != undefined ? $body.data('search-cate') : '',
      // start_at       : $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      // end_at         : $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null
    };
  },
  clear_expandDoing      : function () {
    this.body.data('company_area_id', [])
      .data('store_id', [])
      .data('store_group_id', [])
      .data('agent_id', null)
      .data("search-cate", '')
      // .data("search-input-date-min", moment().startOf('month').format('YYYY-MM-DD'))
      // .data("search-input-date-max", moment().format('YYYY-MM-DD'));
    //清除部门
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text('区、店、组');
    // 清除经纪人
    $(".agentdroplist-text", $("#search-agent")).text('经纪人');
    $(".erp-agentdroplist-list").removeClass('on').addClass('off');
    // 清除输入框
    // $(".search-date-min").val(moment().startOf('month').format('YYYY-MM-DD'));
    // $(".search-date-max").val(moment().format('YYYY-MM-DD'));
    $(".erp-droplist-list").removeClass('on').addClass('off');
    $(".droplist-text", $("#search-cate")).text($('#search-cate').data('default'));
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
  },
  generalStatistics      : function () {
    var $body = this.body;
    return {
      company_area_id: $body.data('company_area_id') != undefined ? $body.data('company_area_id') : $body.data('c'),
      store_id       : $body.data('store_id') != undefined ? $body.data('store_id') : $body.data('n'),
      store_group_id : $body.data('store_group_id') != undefined ? $body.data('store_group_id') : $body.data('g'),
      agent_id       : ($body.data('agent_id') != undefined || $body.data('agent_id') == null) ? $body.data('agent_id') : $body.data('m'),
      start_at       : $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      end_at         : $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null
    };
  },
  clear_generalStatistics: function () {
    this.body.data('company_area_id', [])
      .data('store_id', [])
      .data('store_group_id', [])
      .data('agent_id', null)
      .data("search-input-date-min", moment().format('YYYY-MM-DD'))
      .data("search-input-date-max", moment().format('YYYY-MM-DD'));
    //清除部门
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text('区、店、组');
    // 清除经纪人
    $(".agentdroplist-text", $("#search-agent")).text('经纪人');
    $(".erp-agentdroplist-list").removeClass('on').addClass('off');
    // 清除输入框
    $(".search-input").val(moment().format('YYYY-MM-DD'));
    $(".erp-droplist-list").removeClass('on').addClass('off');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
  },
  innerMessage           : function () {
    var $body = this.body;
    return {
      status       : $body.data('status') != undefined ? $body.data('status') : 'unread',
      start_at     : $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      end_at       : $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null,
      type         : $body.data('type') != undefined ? $body.data('type') : null,
      keyword      : $body.data('keyword') != undefined ? $body.data('keyword') : null,
      relation_type: $body.data('relation_type') != undefined ? $body.data('relation_type') : null,
      relation_uuid: $body.data('relation_uuid') != undefined ? $body.data('relation_uuid') : null
    };
  },
  clear_innerMessage     : function () {
    this.body.data('status', 'all')
      .data('search-input-date-min', null)
      .data('search-input-date-max', null)
      .data('type', 'all')
      .data('relation_type', 'all')
      .data('keyword', null)
      .data('relation_uuid', null);
    // 清除Droplist
    $(".erp-droplist").data('param', null);
    $(".droplist-text", $("#type")).text('不限');
    $(".droplist-text", $("#status")).text('不限');
    $(".droplist-text", $("#relation_type")).text('不限');
    // 清除输入框
    $(".search-input").val(null);
    $(".erp-droplist-list").removeClass('on').addClass('off');
    $(".erp-droplist, .search-input").removeClass('is_search_on').addClass('off');
  },
  window_source          : function () {
    if (!this.body.data('search-community')) {
      $(".erp-comunity-dictionary-toggle").val('');
    }

    return {
      community_id: this.body.data('search-community') != undefined ? this.body.data('search-community') : 0,
      ridgepole   : this.body.data('search-input-ridgepole') != undefined ? this.body.data('search-input-ridgepole') : null,
      unity       : this.body.data('search-input-unity') != undefined ? this.body.data('search-input-unity') : null,
      floor       : this.body.data('search-input-floor') != undefined ? this.body.data('search-input-floor') : null,
      door        : this.body.data('search-input-door') != undefined ? this.body.data('search-input-door') : null,
      uuid        : this.body.data('search-input-uuid') != undefined ? this.body.data('search-input-uuid') : null
    };
  },
  clear_window_source    : function () {
    this.body.data('search-community', null)
      .data('search-input-ridgepole', null)
      .data('search-input-unity', null)
      .data('search-input-floor', null)
      .data('search-input-door', null)
      .data('search-ridgepole-id', null)
      .data('search-input-unity', null)
      .data('search-unity-id', null)
      .data('search-floor-id', null)
      .data('search-input-uuid', null);
    // 清除输入框
    $(".search-input").val(null);
    $(".erp-comunity-dictionary-toggle").val(null);
    $(".erp-droplist-list").removeClass('on').addClass('off');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
  },
  caller                 : function () {
    return {
      // start_at       : this.body.data('search-input-date-min') != undefined ? this.body.data('search-input-date-min') : null,
      // end_at         : this.body.data('search-input-date-max') != undefined ? this.body.data('search-input-date-max') : null,
      company_area_id: this.body.data('company_area_id') != undefined ? this.body.data('company_area_id') : [],
      store_id       : this.body.data('store_id') != undefined ? this.body.data('store_id') : [],
      store_group_id : this.body.data('store_group_id') != undefined ? this.body.data('store_group_id') : [],
      agent_id       : (this.body.data('agent_id') != undefined || this.body.data('agent_id') == null) ? this.body.data('agent_id') : this.body.data('m'),
      category       : this.body.data('search-category') != undefined ? this.body.data('search-category') : null,
      call_time      : this.body.data('search-call-time') != undefined ? this.body.data('search-call-time') : null,
      type           : this.body.data('search-code') != undefined ? this.body.data('search-code') : null,
      uuid           : this.body.data('search-input-uuid') != undefined ? this.body.data('search-input-uuid') : null
    };
  },

  clear_caller: function () {
    this.body.data('search-category', null)
      // .data('search-input-date-min', null)
      // .data('search-input-date-max', null)
      .data('company_area_id', [])
      .data('store_id', [])
      .data('store_group_id', [])
      .data('agent_id', null)
      .data("search-code", null)
      .data('search-call-time', null)
      .data('search-input-uuid', null);
    // 清除Droplist
    $(".droplist-text", $("#search-category")).text('不限');
    $(".droplist-text", $("#search-call-time")).text('不限');
    $(".droplist-text", $("#search-code")).text('编号类型');
    //清除部门
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text('区、店、组');
    // 清除经纪人
    $(".agentdroplist-text", $("#search-agent")).text('经纪人');
    $(".erp-agentdroplist-list").removeClass('on').addClass('off');
    // 清除输入框
    // $(".search-input").val(null);
    $(".erp-droplist-list").removeClass('on').addClass('off');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
    //重置日期
    $.picker.stop();
  },

  //  通话记录搜索部分结束
  community: function () {
    return {
      district_id        : this.body.data('search-district') != undefined ? this.body.data('search-district') : null,
      business_id        : this.body.data('search-business') != undefined ? this.body.data('search-business') : null,
      community_id       : this.body.data('search-community') != undefined ? this.body.data('search-community') : null,
      company_big_area_id: this.body.data('company_big_area_id') != undefined ? this.body.data('company_big_area_id') : this.body.data('w'),
      company_area_id    : this.body.data('company_area_id') != undefined ? this.body.data('company_area_id') : this.body.data('c'),
      store_id           : this.body.data('store_id') != undefined ? this.body.data('store_id') : this.body.data('n'),
      store_group_id     : this.body.data('store_group_id') != undefined ? this.body.data('store_group_id') : this.body.data('g'),
      agent_id           : (this.body.data('agent_id') != undefined || this.body.data('agent_id') == null) ? this.body.data('agent_id') : this.body.data('m'),
      status             : (this.body.data('search-status') != undefined) ? this.body.data('search-status') : null,
      geohash            : (this.body.data('search-map') != undefined ) ? this.body.data('search-map') : null
    };
  },

  codebook         : function () {
    return {
      status    : this.body.data('search-status') != undefined ? this.body.data('search-status') : null,
      vendor    : this.body.data('search-category') != undefined ? this.body.data('search-category') : null,
      mode      : this.body.data('search-trace-type') != undefined ? this.body.data('search-trace-type') : null,
      mobile    : this.body.data('search-input-uuid') != undefined ? this.body.data('search-input-uuid') : null,
      mid_mobile: this.body.data('search-input-mid-mobile') != undefined ? this.body.data('search-input-mid-mobile') : null
    };
  },
  clear_codebook   : function () {
    this.body.data('search-status', null).data('search-category', null).data('search-input-uuid', null);
    // 清除Droplist
    $(".droplist-text", $("#search-status")).text('全部');
    // 清除输入框
    $(".search-input").val(null);
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
  },
  macaddress       : function () {
    return {
      status: this.body.data('search-status') != undefined ? this.body.data('search-status') : null,
      mac   : this.body.data('search-input-uuid') != undefined ? this.body.data('search-input-uuid') : null
    };
  },
  clear_macaddress : function () {
    this.body.data('search-status', null).data('search-input-uuid', null);
    $(".droplist-text", $("#search-status")).text('全部');
    $(".search-input").val(null);
    $(".is_search_on").removeClass('is_search_on');
  },
  performanceDoing : function () {
    var $body = this.body;
    return {
      category           : $body.data('search-cate') != undefined ? $body.data('search-cate') : '',
      company_big_area_id: $body.data('company_big_area_id') != undefined ? $body.data('company_big_area_id') : [],
      company_area_id    : $body.data('company_area_id') != undefined ? $body.data('company_area_id') : [],
      store_id           : $body.data('store_id') != undefined ? $body.data('store_id') : [],
      store_group_id     : $body.data('store_group_id') != undefined ? $body.data('store_group_id') : [],
      role_id            : $body.data('search-role') != undefined ? $body.data('search-role') : [],
      agent_id           : ($body.data('agent_id') != undefined || $body.data('agent_id') == null) ? $body.data('agent_id') : $body.data('m'),
      type               : $body.data('search-type') != undefined ? $body.data('search-type') : 'all',
      // start_at           : $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      // end_at             : $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null
    };
  },
  clear_performance: function () {
    this.body.data('search-cate', '')
      .data('company_big_area_id', [])
      .data('company_area_id', [])
      .data('store_id', [])
      .data('store_group_id', [])
      .data('search-role', [])
      .data('agent_id', null)
      .data("search-type", 'all')
      // .data("search-input-date-min", moment().startOf('month').format('YYYY-MM-DD'))
      // .data("search-input-date-max", moment().format('YYYY-MM-DD'));
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');
    //清除部门
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text('区、店、组');
    // 清除经纪人
    $(".agentdroplist-text", $("#search-agent")).text('经纪人');
    $(".erp-agentdroplist-list").removeClass('on').addClass('off');
    // 清除输入框
    // $(".search-input").val(moment().format('YYYY-MM-DD')).addClass('is_search_on');
    // $(".search-date-min").val(moment().startOf('month').format('YYYY-MM-DD'));
    $(".erp-droplist-list").removeClass('on').addClass('off');
    $(".droplist-text", $("#search-type")).text('全部');
    $(".droplist-text", $("#search-cate")).text($("#search-cate").data('default'));
    $(".checkbox-text", $("#search-role")).text('不限');
    $("#search-role").data('params', []).data('keys', []);
    $(".erp-checkbox-list", $("#search-role")).removeClass('on').addClass('off');
  },
	statisticsDoing : function () {
		var $body = this.body;
		return {
			start_at           : $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
			end_at             : $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null
		};
	},
	clear_statistics: function () {
		this.body
			.data("search-input-date-min", moment().subtract(2, 'months').startOf('month').format('YYYY-MM-DD'))
			.data("search-input-date-max", moment().format('YYYY-MM-DD'));
		//清除选中的颜色
		$(".is_search_on").removeClass('is_search_on');
		// 清除输入框
		$(".search-input").val(moment().format('YYYY-MM-DD')).addClass('is_search_on');
		$(".search-date-min").val(moment().subtract(2, 'months').startOf('month').format('YYYY-MM-DD'));
		$(".statistics-btns .btn").removeClass("erp-btn_info");
	},
  //member search
  member           : function () {
    var $body = this.body;
    return {
      keyword    : $body.data('search-keywords') != undefined ? $body.data('search-keywords') : null,
      // company_area_id: $body.data('company_area_id') != undefined ? $body.data('company_area_id') : [],
      // store_id       : $body.data('store_id') != undefined ? $body.data('store_id') : [],
      // store_group_id : $body.data('store_group_id') != undefined ? $body.data('store_group_id') : [],
      //agent_id       : ($body.data('agent_id') != undefined || $body.data('agent_id') == null) ? $body.data('agent_id') : $body.data('m'),
      //org_x              : $body.data('search-org') != undefined ? $body.data('search-org') : null,
      date_type  : $body.data('search-date-type') != undefined ? $body.data('search-date-type') : null,
      start_at   : $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      end_at     : $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null,
      position_id: $body.data("search-position") != undefined ? $body.data("search-position") : null,
      grade_id   : $body.data("search-grade") != undefined ? $body.data("search-grade") : null,
      status     : $body.data("search-status") != undefined ? $body.data("search-status") : null,
      change_type: $body.data("search-change-type") != undefined ? $body.data("search-change-type") : '不限',
      locked_at  : $('#search-locked-at').is(':checked') ? true : false,
      is_changing: $('#search-is-changing').is(':checked') ? true : false
    };
  },
  clear_member     : function () {
    this.body
    // .data('company_area_id', [])
    // .data('store_id', [])
    // .data('store_group_id', [])
    //.data('agent_id', null)
      .data("search-date-type", null)
      // .data("search-org", null)
      .data("search-position", null)
      .data("search-grade", null)
      .data("search-status", null)
      .data("search-change-type", '不限')
      .data("search-keywords", null)
      .data("search-input-date-min", moment().startOf('month').format('YYYY-MM-DD'))
      .data("search-input-date-max", moment().format('YYYY-MM-DD'));
    $('#search-locked-at').prop('checked', false);
    $('#search-is-changing').prop('checked', false);
    //清除部门
    // $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    // $('.erp-cascading-list').removeClass('on').addClass('off');
    // $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    // $(".cascading-text").text('区、店、组')
    //清除职务职级下拉
    $(".droplist-text", $("#search-org")).text('不限');
    $(".search-keywords").val(null);
    $(".droplist-text", $("#search-position")).text('不限');
    $(".droplist-text", $("#search-grade")).text('不限');
    $(".droplist-text", $("#search-status")).text('不限');
    $(".droplist-text", $("#search-change-type")).text('不限');
    $(".droplist-text", $("#search-date-type")).text('选择时间');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');

    $.picker.stop();
  },

  //basic_salary search
  basic      : function () {
    var $body = this.body;
    return {
      keyword    : $body.data('search-keywords') != undefined ? $body.data('search-keywords') : null,
      date_type  : $body.data('search-date-type') != undefined ? $body.data('search-date-type') : null,
      start_at   : $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      end_at     : $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null,
      position_id: $body.data("search-position") != undefined ? $body.data("search-position") : null,
      grade_id   : $body.data("search-grade") != undefined ? $body.data("search-grade") : null,
      status     : $body.data("search-status") != undefined ? $body.data("search-status") : null,
      is_approve : $('#search-is-approve').is(':checked') ? true : false
    };
  },
  clear_basic: function () {
    this.body
    // .data("search-date-type", null)
      .data("search-position", null)
      .data("search-grade", null)
      .data("search-status", null)
      .data("search-keywords", null)
      .data("search-input-date-min", moment().startOf('month').format('YYYY-MM-DD'))
      .data("search-input-date-max", moment().format('YYYY-MM-DD'));
    $(".droplist-text", $("#search-org")).text('不限');
    $(".search-keywords").val(null);
    $(".droplist-text", $("#search-position")).text('不限');
    $(".droplist-text", $("#search-grade")).text('不限');
    $(".droplist-text", $("#search-status")).text('不限');
    // $(".droplist-text", $("#search-date-type")).text('选择时间');
    $('#search-is-approve').prop('checked', false);
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');

    $.picker.stop();
  },
  personal      : function () {
    var $body = this.body;
    return {
      date_type  : $body.data('search-date-type') != undefined ? $body.data('search-date-type') : null,
      start_at   : $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      end_at     : $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null,
      position_id: $body.data("search-position") != undefined ? $body.data("search-position") : [],
      grade_id   : $body.data("search-grade") != undefined ? $body.data("search-grade") : [],
      status     : $body.data("search-status") != undefined ? $body.data("search-status") : null
    };
  },
  clear_personal: function () {
    this.body
      .data("search-position", [])
      .data("search-grade", [])
      .data("search-status", null)
      .data("search-input-date-min", moment().startOf('month').format('YYYY-MM-DD'))
      .data("search-input-date-max", moment().format('YYYY-MM-DD'));
    $(".droplist-text", $("#search-status")).text('不限');
    $("span.checkbox-text").text('不限');
    $("li.erp-checkbox-list", $("#search-position")).removeClass('on').addClass('off');
    $("#search-position").data('params', ['不限']).data('val', '不限').data('default', '不限');
    $("li.erp-checkbox-list", $("#search-grade")).removeClass('on').addClass('off');
    $("#search-grade").data('params', ['不限']).data('val', '不限').data('default', '不限');
    $(".droplist-text", $("#search-date-type")).text('选择时间');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');

    $.picker.stop();
  },
  proportion      : function () {
    var $body = this.body;
    return {
      start_at   : $body.data("search-input-date-min") != undefined ? $body.data("search-input-date-min") : null,
      end_at     : $body.data("search-input-date-max") != undefined ? $body.data("search-input-date-max") : null,
      position_id: $body.data("search-position") != undefined ? $body.data("search-position") : [],
    };
  },
  clear_proportion: function () {
    this.body
      .data("search-position", [])
      .data("search-input-date-min", moment().startOf('month').format('YYYY-MM-DD'))
      .data("search-input-date-max", moment().format('YYYY-MM-DD'));
    $("span.checkbox-text").text('不限');
    $("li.erp-checkbox-list", $("#search-position")).removeClass('on').addClass('off');
    $("#search-position").data('params', ['不限']).data('val', '不限').data('default', '不限');
    $("li.erp-checkbox-list", $("#search-grade")).removeClass('on').addClass('off');
    $("#search-grade").data('params', ['不限']).data('val', '不限').data('default', '不限');
    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');

    $.picker.stop();
  },
  watch      : function (obj) {
    var $search = $("#search-clear ");
    if (obj.action == 'add') {
      $("#" + obj.id).addClass('is_search_on');
      if ($(".erp-searchdroplist-menu li", $search).is('[data-id=\'' + obj.id + '\']')) {
        $(".erp-searchdroplist-menu", $search).children('[data-id=\'' + obj.id + '\']').replaceWith("<li data-id='" + obj.id + "' class='erp-searchdroplist-list on'>" + obj.text + "<span>X</span></li>")
      } else {
        $(".erp-searchdroplist-menu", $search).append("<li data-id='" + obj.id + "' class='erp-searchdroplist-list on'>" + obj.text + "<span>X</span></li>");
      }
    } else if (obj.action == 'delete') {
      $("#" + obj.id).removeClass('is_search_on');
      $(".erp-searchdroplist-menu", $search).children('[data-id=\'' + obj.id + '\']').remove();
    }
    $(".searchdroplist-text", $search).html("搜索条件(" + ($("li.on", $search).length) + ")");
  },
  clear      : function () {
    this.body.data('search-category', null)
      .data('search-district', null)
      .data('search-business', null)
      .data('search-community', null)
      .data('search-community-name', null)
      .data('search-input-ridgepole', null)
      .data('search-ridgepole-id', null)
      .data('search-input-unity', null)
      .data('search-unity-id', null)
      .data('search-input-room', null)
      .data('search-input-uuid', null)
      .data('company_area_id', null)
      .data('store_id', null)
      .data('store_group_id', null)
      .data('agent_id', null)
      .data('search-agent-type', '开盘')
      .data("search-trace-type", '选择类型')
      .data("search-input-date-min", null)
      .data("search-input-date-max", null)
      .data("search-arch", null)
      .data("search-map", "")
      .data('search-input-area-min', null)
      .data('search-input-area-max', null)
      .data('search-input-lease-min', null)
      .data('search-input-lease-max', null)
      .data('search-input-sale-min', null)
      .data('search-input-sale-max', null)
      .data('search-input-floors-min', null)
      .data('search-input-floors-max', null)
      .data('search-status', null)
      .data('search-floor-type', null)
      .data('search-direction', null)
      .data('search-community-type', null)
      .data('search-level', null)
      .data('erp_search_is_pic', false)
      .data('erp_search_is_intrust', false)
      .data('erp_search_is_urgent', false)
      .data('erp_search_is_all', false)
      .data('erp_search_is_key', false)
      .data('erp_search_is_only', false)
      .data('erp_search_is_close', false)
      .data('erp_search_is_school', false)
      .data('erp_search_is_metro', false)
      .data('erp_search_is_hot_gas', false)
      .data('erp_search_is_gas', false)
      .data('erp_search_is_public', false)
      .data('erp_search_is_verify', false)
      .data('erp_search_is_private', false)
      .data('erp_search_is_marked', false)
      .data('search-other-type', null)
      .data('search-code', null)
      .data('search-org', '不限')
      .data("search-date-type", null)
      .data('search-other-val', []);
    // 清除Droplist
    $(".erp-droplist").data('param', null);
    $(".droplist-text").text('不限');
    $(".droplist-text", $("#search-agent-type")).text('开盘');
    $(".droplist-text", $("#search-trace-type")).text('选择类型');
    $(".droplist-text", $("#search-code")).text('编号类型');
    $(".droplist-text", $("#search-date-type")).text('选择日期');

    $(".erp-droplist-list").removeClass('on').addClass('off');

    // 清除复选
    $(".erp-checkbox").data('params', []).data('keys', []);
    $(".checkbox-text").text('不限');

    var $status = $("#search-status");
    $(".checkbox-text", $status).text($status.data('default'));
    $status.data('params', [$status.data('val')]).data('keys', []);
    $("#search-district").data('params', []).data('keys', []);
    $("#search-arch").data('params', []).data('keys', []);
    $("#search-floor-type").data('params', []).data('keys', []);
    $("#search-direction").data('params', []).data('keys', []);
    $("#search-community-type").data('params', []).data('keys', []);
    $(".erp-checkbox-list").removeClass('on').addClass('off');

    // 清除商圈
    $(".erp-business-dictionary-toggle").val(null);
    $(".erp-business-dictionary-box-list").removeClass('on').addClass('off');
    $(".erp-business-dictionary").data('district', []);

    // 清除楼盘
    $(".erp-comunity-dictionary-toggle").val(null);
    $(".erp-comunity-dictionary-box-list").removeClass('on').addClass('off');

    // 清除输入框
    $(".search-input").val(null);

    // 清除区店组
    $('.erp-cascading').data('area', []).data('store', []).data('group', []);
    $('.erp-cascading-list').removeClass('on').addClass('off');
    $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
    $(".cascading-text").text('区、店、组');
    $(".agentdroplist-text").text('经纪人');

    // 清除标签
    $(".search-icon")
      .removeClass('is_pic')
      .removeClass('is_urgent')
      .removeClass('is_all')
      .removeClass('is_key')
      .removeClass('is_only')
      .removeClass('is_close')
      .removeClass('is_school')
      .removeClass('is_intrust')
      .removeClass('is_metro')
      .removeClass('is_hot_gas')
      .removeClass('is_gas')
      .removeClass('is_public')
      .removeClass('is_public-pan')
      .removeClass('is_verify')
      .removeClass('is_private')
      .removeClass('is_marked');
    // 清除其他
    var $searchOther = $("#search-other");
    $(".from", $searchOther).text("");
    $(".category", $searchOther).text("");
    $searchOther.data('type', null).data('params', []).data('val', []);
    $(".erp-other-box-list", $searchOther).removeClass('on').addClass('off');

    //清除选中的颜色
    $(".is_search_on").removeClass('is_search_on');

    var $search = $("#search-clear ");
    $(".erp-searchdroplist-menu li", $search).remove();
    $(".searchdroplist-text", $search).html("搜索条件(" + ($("li.on", $search).length) + ")");
  },
  toggle     : function () {
    $(".ibox-search-wrapper-second").css("display", 'none');
    $("i", $(".openOrclose")).removeClass('fa-angle-double-up').addClass('fa-angle-double-down')
  },
  init       : function () {
    $.picker.start('search-input-date-min', 'search-input-date-max');
  },

  datePicker: function () {

    $('#schedule_at_begin').daterangepicker({
      singleDatePicker   : true,
      timePicker         : true,
      timePicker24Hour   : true,
      alwaysShowCalendars: true,
      locale             : {
        format: 'YYYY-MM-DD HH:mm'
      }
    }, function (proposal_at) {
      /*if (proposal_at.format('YYYY-MM-DD HH:mm') > $('#schedule_at_end').val()) {
       Message.warning('开始日期必须小于结束日期');
       return false;
       }*/
      $(this).val(proposal_at.format('YYYY-MM-DD HH:mm'));
    });
    $('#schedule_at_end').daterangepicker({
      singleDatePicker   : true,
      timePicker         : true,
      timePicker24Hour   : true,
      alwaysShowCalendars: true,
      locale             : {
        format: 'YYYY-MM-DD HH:mm'
      }
    }, function (proposal_at) {
      /*if (proposal_at.format('YYYY-MM-DD HH:mm') < $('#schedule_at_begin').val()) {
       Message.warning('结束日期必须大于开始日期');
       return false;
       }*/
      $(this).val(proposal_at.format('YYYY-MM-DD HH:mm'));
    });
    $('#schedule_at_end').val('结束时间');
    $('#schedule_at_begin').val('开始时间');

  }
};

// 下拉复选
!function ($) {
  "use strict";
  var toggle         = '[data-toggle="erp-checkbox"]', CheckBox = function () {
  };
  CheckBox.prototype = {
    constructor: CheckBox,
    toggle     : function (e) {
      var $this = $(this), $parent = $this.parent(), $next = $this.next();
      if ($next.is(':visible')) {
        $parent.removeClass('isActive');
        $next.hide();
      } else {
        fuck_bug();
        $parent.addClass('isActive');
        $next.show();
      }
      autoChecked($this);
      return false;
    }
  };
  function fuck_bug() {
    $(".erp-other-box").hide();
    $(".erp-checkbox-menu").hide();
    $(".erp-droplist-menu").hide();
    $(".erp-agentdroplist-menu").hide();
    $(".erp-searchdroplist-menu").hide();
    $(".erp-cascading-box").hide();
    $(".erp-single-cascading-box").hide();
    $(".erp-comunity-dictionary-box").hide();
    $(".cfangxin").removeClass('isActive');
  }

  function clearCheckBox(e) {
    if (!$(e.target).is('li.erp-checkbox-list')) {
      $(".erp-checkbox-menu").hide();
    } else {
      if ($(e.target).hasClass('on')) {
        bindParams(e.target, 'delete')
      } else if ($(e.target).hasClass('off')) {
        bindParams(e.target, 'add');
      }
      return false;
    }
  }

  function bindParams(target, action) {

    var $params = $(target).parent().parent().data('params'), $keys = $(target).parent().parent().data('keys');

    if (action == 'add') {
      if ($(target).data('id') == 0) {
        $('body').data('search-district', []).data('search-business', []);
        $(target).parent().addClass('is_locked');
        $(target).parent().children('li').removeClass('on').addClass('off');
        $(target).removeClass('off').addClass('on');
        $params = [];
        $keys   = [];
      } else {
        if ($(target).parent().hasClass('is_locked')) {
          $(target).parent().removeClass('is_locked');
          $(target).parent().children().first().removeClass('on').addClass('off');
        }
        $(target).removeClass('off').addClass('on');

        if ($params.length) {
          if ($.inArray(0, $params) == 0) {
            $params.pop();
            $(target).parent().children().first().removeClass('on').addClass('off');
          }
        }
        $params.push($(target).data('id'));
        $keys.push($(target).data('key'));
      }
    } else if (action == 'delete') {
      if ($(target).data('id') == 0) {
        $('body').data('search-district', []).data('search-business', []);
        $(target).parent().removeClass('is_locked');
        $params = [];
        $keys   = [];
      } else {
        var index = $params.indexOf($(target).data('id'));
        if (index > -1) {
          $params.splice(index, 1);
          $keys.splice(index, 1);
        }
      }
      $(target).removeClass('on').addClass('off');
    }


    // 关联商圈
    var $rid = $(target).parent().parent().data('rid'), $ridObj = $("#" + $rid);
    if ($rid) {
      $ridObj.data('district', $params).children().find('.erp-business-dictionary-box-list').remove();
      $ridObj.find('input').val("");
    }

    var $id = $(target).parent().parent().attr('id'), $text;
    // 搜索条件
    if ($params.length) {
      if ($id == 'search-district') {
        $text = "选中：城区";
      } else if ($id == 'search-arch') {
        $text = "选中： 房型";
      } else if ($id == 'search-status') {
        $text = "选中：状态";
      } else if ($id == 'search-floor-type') {
        $text = "选中：类型";
      } else if ($id == 'search-direction') {
        $text = "选中：朝向";
      } else if ($id == 'search-community-type') {
        $text = "选中：用途";
      } else if ($id == 'search-level') {
        $text = "选中：等级";
      }
      $.search.watch({
        action: 'add',
        id    : $id,
        text  : $text
      });
    } else {
      if ($id == 'search-status') {
        $.search.watch({
          action: 'add',
          id    : $id,
          text  : '不限状态'
        });
      } else {
        $.search.watch({
          action: 'delete',
          id    : $id
        });
      }
    }
    if ($params.length) {
      if ($.inArray("", $params) == 0) {
        $params.splice(0, 1);
      }
      var me = "";
      $(target).parent().children('.on').each(function (index, el) {
        if ($(target).parent().children('.on').length - 1 == index) {
          me += $(el).data('key');
        } else {
          me += $(el).data('key') + '|';
        }
      });
      $(target).parent().prev().children('span').text(me);
    } else {
      $(target).parent().prev().children('span').text('不限');
    }

    $("#" + $id).data('params', $params).data('keys', $keys);

    $('body').data($id, $params);
  }

  function autoChecked(me) {
    if (me.parent().data('params').length) {
      me.next().children('li').each(function (index, el) {
        if ($.inArray($(el).data('id'), me.parent().data('params')) >= 0) {
          $(el).removeClass('off').addClass('on');
        }
      });
    }
  }

  $(function () {
    $('html').on('click', clearCheckBox);
    $('body').on('click.CheckBox', toggle, CheckBox.prototype.toggle);
  })
}(window.jQuery);

// 级连下拉
!function ($) {
  "use strict";
  var toggle              = '[data-toggle="erp-cascading"]', CascadingList = function () {
  };
  CascadingList.prototype = {
    constructor: CascadingList,
    toggle     : function (e) {
      var $this = $(this), $parent = $this.parent(), $next = $this.next();
      if (!$parent.hasClass('isActive')) {
        fuck_bug();
        $("." + $this.data('toggle')).removeClass('isActive').find('.erp-cascading-area').hide();
        $parent.addClass('isActive');
        $(".erp-cascading-box").hide();
      }
      $next.toggle();
      if (!$next.is(':visible')) {
        $next.nextAll().hide();
      }
      $this.parent().find('.erp-cascading-list').removeClass('on').addClass('off');
      return false;
    }
  };
  function fuck_bug() {
    $(".erp-other-box").hide();
    $(".erp-checkbox-menu").hide();
    $(".erp-droplist-menu").hide();
    $(".erp-agentdroplist-menu").hide();
    $(".erp-single-cascading-box").hide();
    $(".erp-comunity-dictionary-box").hide();
    $(".cfangxin").removeClass('isActive');
  }

  function clearCascadingList(e) {
    if (!$(e.target).is('.erp-cascading-list')) {
      $(".erp-cascading-box").hide();
    } else {
      var multiple = $(e.target).parent().parent().data('multiple');
      if ($(e.target).data('id') == 0 && $(e.target).hasClass('off')) {
        $(e.target).parent().nextAll().hide();
        $(e.target).parent().addClass('is_locked');
        $(e.target).parent().children('li').removeClass('on').addClass('off');
        $(e.target).removeClass('off').addClass('on');
        bindParams(e.target, 'add');
        $('body').data('search-org', '不限');
      } else if ($(e.target).data('id') == 0 && $(e.target).hasClass('on')) {
        $(e.target).parent().removeClass('is_locked');
        $(e.target).removeClass('on').addClass('off');
        bindParams(e.target, 'delete');
        $('body').data('search-org', '不限');
      } else {
        if ($(e.target).parent().hasClass('is_locked')) {
          $(e.target).parent().removeClass('is_locked');
          $(e.target).parent().children().first().removeClass('on').addClass('off');
          $(e.target).removeClass('off').addClass('on');
          bindParams(e.target, 'add');
          $(e.target).parent().next().show();
          updateBox($(e.target));
        } else {
          if ($(e.target).hasClass('on')) {
            $(e.target).removeClass('on').addClass('off');
            bindParams(e.target, 'delete')
          } else if ($(e.target).hasClass('off')) {
            if (!multiple) {
              if ($(e.target).parent().children().hasClass('on')) {
                var $old = $(e.target).parent().find('li.on')[0];
              }
              $(e.target).removeClass('off').addClass('on');
              if ($(e.target).parent().children('.on').length > 1) {
                $(e.target).parent().children('.on').removeClass("on").addClass('off');
                if ($old != undefined) {
                  bindParams($old, 'delete');
                }
                $(e.target).removeClass('off').addClass('on');
                bindParams(e.target, 'add');
              } else {
                bindParams(e.target, 'add');
              }
            } else {
              $(e.target).removeClass('off').addClass('on');
              bindParams(e.target, 'add');
            }
          }
          if ($(e.target).parent().children('.on').length == 1) {
            updateBox($(e.target).parent().find('.on'));
            $(e.target).parent().nextAll().hide();
            $(e.target).parent().next().show();
          } else {
            $(e.target).parent().nextAll().hide();
          }
        }
      }
      return false;
    }
  }

  function updateBox(target) {
    if (target.parent().hasClass('erp-cascading-area')) {
      target.parent().next().children().not(':eq(0)').remove();
      var $stores = target.data('store');
      if ($stores.length) {
        for (var s = 0; s < $stores.length; s++) {
          target.parent().next().append(
            "<li data-id=" + $stores[s]['id'] + " data-key=" + $stores[s]['name'] + " class='erp-cascading-list off' data-group=" + JSON.stringify($stores[s]['store_groups']) + ">" + $stores[s]['name'] + "</li>");
        }
      }
    } else if (target.parent().hasClass('erp-cascading-store')) {
      target.parent().next().children().not(':eq(0)').remove();
      var $groups = target.data('group');
      if ($groups.length) {
        for (var g = 0; g < $groups.length; g++) {
          target.parent().next().append(
            "<li data-id=" + $groups[g]['id'] + " data-key=" + $groups[g]['name'] + " class='erp-cascading-list off' >" + $groups[g]['name'] + "</li>");
        }
      }
    }
  }

  function bindParams(target, action) {
    var $areas = [], $stores = [], $groups = [], gnames = [], snames = [], anames = [];
    if (action == 'delete') {
      if ($(target).data('id') == 0) {
        $(target).parent().removeClass('is_locked');
      }
    }
    var $areasOn  = $('.erp-cascading-area li.on', $(target).parent().parent()),
        $storesOn = $('.erp-cascading-store li.on', $(target).parent().parent()),
        $groupsOn = $('.erp-cascading-group li.on', $(target).parent().parent()),
        $names    = [];
    if ($areasOn.length == 1) {
      if ($areasOn.data('id') != 0) {
        $names.push($areasOn.data('key'));
        $areas.push($areasOn.data('id'));
        if ($storesOn.length == 1) {
          if ($storesOn.data('id') != 0) {
            $names.push($storesOn.data('key'));
            $stores.push($storesOn.data('id'));
            if ($groupsOn.length == 1) {
              if ($groupsOn.data('id') != 0) {
                $names.push($groupsOn.data('key'));
                $groups.push($groupsOn.data('id'));
              }
            } else if ($groupsOn.length > 1) {
              $groupsOn.each(function () {
                $names.push($(this).data('key'));
                $groups.push($(this).data('id'));
              });
            }
          }
        } else if ($storesOn.length > 1) {
          $storesOn.each(function () {
            $names.push($(this).data('key'));
            $stores.push($(this).data('id'));
          });
        }
      }
    } else if ($areasOn.length > 1) {
      $areasOn.each(function () {
        $names.push($(this).data('key'));
        $areas.push($(this).data('id'));
      });
    } else {
      // 跨区
      if ($storesOn.length == 1) {
        if ($storesOn.data('id') != 0) {
          $names.push($storesOn.data('key'));
          $stores.push($storesOn.data('id'));
          if ($groupsOn.length == 1) {
            if ($groupsOn.data('id') != 0) {
              $names.push($groupsOn.data('key'));
              $groups.push($groupsOn.data('id'));
            }
          } else if ($groupsOn.length > 1) {
            $groupsOn.each(function () {
              $names.push($(this).data('key'));
              $groups.push($(this).data('id'));
            });
          }
        }
      } else if ($storesOn.length > 1) {
        $storesOn.each(function () {
          $names.push($(this).data('key'));
          $stores.push($(this).data('id'));
        });
      } else {
        // 跨区店
        if ($groupsOn.length == 1) {
          if ($groupsOn.data('id') != 0) {
            $names.push($groupsOn.data('key'));
            $groups.push($groupsOn.data('id'));
          }
        } else if ($groupsOn.length > 1) {
          $groupsOn.each(function () {
            $names.push($(this).data('key'));
            $groups.push($(this).data('id'));
          });
        }
      }
    }

    // 经纪人列表通信
    var $rid = $(target).parent().parent().data('rid');
    if ($rid != undefined && $rid != "") {
      $("#" + $rid).data('area', $areas).data('store', $stores).data('group', $groups).find('.agentdroplist-text').text('经纪人');

      // 条件搜索
      if ($areas.length || $stores.length || $groups.length) {
        if ($groups.length) {
          $.search.watch({action: 'add', id: 'search-asg', text: '组查找'});
        } else if ($stores.length) {
          $.search.watch({action: 'add', id: 'search-asg', text: '店查找'});
        } else if ($areas.length) {
          $.search.watch({action: 'add', id: 'search-asg', text: '区查找'});
        }
      } else {
        $.search.watch({action: 'delete', id: 'search-asg'});
      }
    }
    $('body').data('company_area_id', $areas).data('store_id', $stores).data('store_group_id', $groups).data('agent_id', null);
    if ($groups.length) {
      $groupsOn.each(function (index, el) {
        if ($.inArray($(el).data('id'), $groups) >= 0) {
          gnames.push($(el).data('key'));
        }
      });
      $storesOn.each(function (index, el) {
        if ($.inArray($(el).data('id'), $stores) >= 0) {
          snames.push($(el).data('key'));
        }
      });
      $areasOn.each(function (index, el) {
        if ($.inArray($(el).data('id'), $areas) >= 0) {
          anames.push($(el).data('key'));
        }
      });
      $(target).parent().parent().find('span').text(anames.concat(snames).concat(gnames).join('|'));
    } else if ($stores.length) {
      $storesOn.each(function (index, el) {
        if ($.inArray($(el).data('id'), $stores) >= 0) {
          snames.push($(el).data('key'));
        }
      });
      $areasOn.each(function (index, el) {
        if ($.inArray($(el).data('id'), $areas) >= 0) {
          anames.push($(el).data('key'));
        }
      });
      $(target).parent().parent().find('span').text(anames.concat(snames).join('|'));
    } else if ($areas.length) {
      anames = [];
      $areasOn.each(function (index, el) {
        if ($.inArray($(el).data('id'), $areas) >= 0) {
          anames.push($(el).data('key'));
        }
      });
      $(target).parent().parent().find('span').text(anames.join('|'));
    } else {
      $(target).parent().parent().find('span').text('区、店、组');
    }
  }

  $(function () {
    $('html').on('click', clearCascadingList);
    $('body').on('click.CascadingList', toggle, CascadingList.prototype.toggle);
  })
}(window.jQuery);

// 四级联动菜单
!function ($) {
  "use strict";
  var toggle                = '[data-toggle="erp-single-cascading"]', singleCascading = function () {
  };
  singleCascading.prototype = {
    constructor: singleCascading,
    toggle     : function (e) {
      var $this = $(this), $parent = $this.parent(), $next = $this.next();
      if (!$parent.hasClass('isActive')) {
        $("." + $this.data('toggle')).removeClass('isActive').find('.erp-cascading-area').hide();
        $parent.addClass('isActive');
        $(".erp-single-cascading-box").hide();
      }
      fuck_bug();
      $next.toggle();
      if (!$next.is(':visible')) {
        $next.nextAll().hide();
      }
      $this.parent().find('.erp-single-cascading-list').removeClass('on').addClass('off');
      return false;
    }
  };
  function fuck_bug() {
    $(".erp-other-box").hide();
    $(".erp-checkbox-menu").hide();
    $(".erp-droplist-menu").hide();
    $(".erp-agentdroplist-menu").hide();
    $(".erp-cascading-box").hide();
    $(".erp-comunity-dictionary-box").hide();
    $(".cfangxin").removeClass('isActive');
  }

  function updateBox(target) {
    if (target.parent().hasClass('erp-single-cascading-box-area')) {
      var $stores = target.data('store');
      if ($stores.length) {
        for (var s = 0; s < $stores.length; s++) {
          target.parent().parent().next().find('ul').append(
            "<li data-id=" + $stores[s]['id'] + " data-key=" + $stores[s]['name'] + " class='erp-single-cascading-list off' data-group=" + JSON.stringify($stores[s]['store_groups']) + ">" + $stores[s]['name'] + "</li>");
        }
      }
    } else if (target.parent().hasClass('erp-single-cascading-box-store')) {
      var $groups = target.data('group');
      if ($groups.length) {
        for (var g = 0; g < $groups.length; g++) {
          target.parent().parent().next().find('ul').append(
            "<li data-id=" + $groups[g]['id'] + " data-key=" + $groups[g]['name'] + " class='erp-single-cascading-list off' data-agent=" + JSON.stringify($groups[g]['agents']) + ">" + $groups[g]['name'] + "</li>");
        }
      }
    } else if (target.parent().hasClass('erp-single-cascading-box-group')) {
      var $agents = target.data('agent');
      if ($agents.length) {
        for (var a = 0; a < $agents.length; a++) {
          target.parent().parent().next().find('ul').append(
            "<li data-id=" + $agents[a]['id'] + " data-key=" + $agents[a]['name'] + " class='erp-single-cascading-list off'>" + $agents[a]['name'] + "</li>");
        }
      }
    }
  }

  function clearSingleCascading(e) {
    if (!$(e.target).is('li.erp-single-cascading-list,a.single-cascading-handler')) {
      $(".erp-single-cascading-box").hide();
    } else {
      //选中区公盘,店公盘，组公盘
      if ($(e.target).hasClass('single-cascading-handler')) {
        $(e.target).addClass('on');
        $(e.target).parent().next().children('li').removeClass('on').addClass('off');
        bindParams(e.target);
      } else {
        if ($(e.target).hasClass('on')) {
          $(e.target).removeClass('on').addClass('off');
          bindParams(e.target);
        } else if ($(e.target).hasClass('off')) {
          // 选中区，店，组　公盘
          if ($(e.target).parent().prev().children('a').hasClass('on')) {
            $(e.target).parent().prev().children('a').removeClass('on');
          }
          // 已经存在选中行
          if ($(e.target).parent().children().hasClass('on')) {
            // 移除上一次选中
            $(e.target).parent().find('li.on').removeClass('on').addClass('off');
            // 添加本次选中
            $(e.target).removeClass('off').addClass('on');
            bindParams(e.target);
          } else {
            // 首次加载
            $(e.target).removeClass('off').addClass('on');
            bindParams(e.target);
          }
        }
      }

      $(e.target).parent().parent().nextAll().hide();
      if (!$(e.target).hasClass('single-cascading-handler')) {
        if ($(e.target).parent().children('.on').length == 1) {
          $(e.target).parent().parent().nextAll().find('li').remove();
          updateBox($(e.target));
          $(e.target).parent().parent().next().find('.single-cascading-handler').addClass('on');
          $(e.target).parent().parent().next().show();
        }
      }
      return false;
    }
  }

  function bindParams(target) {
    var $parent, $key;
    var shifter = '盘';
    //选中区公盘
    if ($(target).hasClass('area-handler')) {
      $parent = $(target).parent().parent().parent();
      if ($parent.attr('id') == 'client_agent') {
        shifter = '客';
      }
      $key = $parent.children().find('ul.erp-single-cascading-box-area li.on').data('key') + '/区公' + shifter;
      $parent.data('store', null);
      $parent.data('store-key', null);
      $parent.data('group', null);
      $parent.data('group-key', null);
      $parent.data('agent', null);
      $parent.data('agent-key', null);
      $parent.children().find('.single-cascading-text').text($key);
      $('.erp-single-cascading-box').hide();
      // 选中店公盘
    } else if ($(target).hasClass('store-handler')) {
      $parent = $(target).parent().parent().parent();
      if ($parent.attr('id') == 'client_agent') {
        shifter = '客';
      }
      $key = $parent.data('area-key') + '/' + $parent.children().find('ul.erp-single-cascading-box-store li.on').data('key') + '/店公' + shifter;
      $parent.data('group', null);
      $parent.data('group-key', null);
      $parent.data('agent', null);
      $parent.data('agent-key', null);
      $parent.children().find('.single-cascading-text').text($key);
      $('.erp-single-cascading-box').hide();
      // 选中组公盘
    } else if ($(target).hasClass('group-handler')) {
      $parent = $(target).parent().parent().parent();
      if ($parent.attr('id') == 'client_agent') {
        shifter = '客';
      }
      $key = $parent.data('area-key') + '/' + $parent.data('store-key') + '/' + $parent.children().find('ul.erp-single-cascading-box-group li.on').data('key') + '/组公' + shifter;
      $parent.data('agent', null);
      $parent.data('agent-key', null);
      $parent.children().find('.single-cascading-text').text($key);
      $('.erp-single-cascading-box').hide();
    } else {
      if ($(target).parent().hasClass('erp-single-cascading-box-area')) {
        //赋值大区ID
        $parent = $(target).parent().parent().parent();
        if ($parent.attr('id') == 'client_agent') {
          shifter = '客';
        }
        $parent.data('area', $(target).parent().find('li.on').data('id'));
        $parent.data('area-key', $(target).parent().find('li.on').data('key'));
        $key = $(target).parent().find('li.on').data('key') + '/区公' + shifter;
        $parent.children().find('.single-cascading-text').text($key);
//                    console.log($(target).parent().find('li.on').data('id'));
      } else if ($(target).parent().hasClass('erp-single-cascading-box-store')) {
        $parent = $(target).parent().parent().parent();
        if ($parent.attr('id') == 'client_agent') {
          shifter = '客';
        }
        $parent.data('store', $(target).parent().find('li.on').data('id'));
        $parent.data('store-key', $(target).parent().find('li.on').data('key'));
        $key = $parent.data('area-key') + '/' + $(target).parent().find('li.on').data('key') + '/店公' + shifter;
        $parent.children().find('.single-cascading-text').text($key);
//                    console.log($(target).parent().find('li.on').data('id'));
      } else if ($(target).parent().hasClass('erp-single-cascading-box-group')) {
        $parent = $(target).parent().parent().parent();
        if ($parent.attr('id') == 'client_agent') {
          shifter = '客';
        }
        $parent.data('group', $(target).parent().find('li.on').data('id'));
        $parent.data('group-key', $(target).parent().find('li.on').data('key'));
        $key = $parent.data('area-key') + '/' + $parent.data('store-key') + '/' + $(target).parent().find('li.on').data('key') + '/组公' + shifter;
        $parent.children().find('.single-cascading-text').text($key);
//                    console.log($(target).parent().find('li.on').data('id'));
      } else if ($(target).parent().hasClass('erp-single-cascading-box-agent')) {
        $parent = $(target).parent().parent().parent();
        $parent.data('agent', $(target).parent().find('li.on').data('id'));
        $parent.data('agent-key', $(target).parent().find('li.on').data('key'));
        $key = $parent.data('area-key') + '/' + $parent.data('store-key') + '/' + $parent.data('group-key') + '/' + $(target).parent().find('li.on').data('key');
        $parent.children().find('.single-cascading-text').text($key);
        $('.erp-single-cascading-box').hide();
//                    console.log($(target).parent().find('li.on').data('id'));
      }
    }
  }

  $(function () {
    $('html').on('click', clearSingleCascading);
    $('body').on('click.singleCascading', toggle, singleCascading.prototype.toggle);
  })
}(window.jQuery);

// 楼盘字典查询
!function ($) {
  "use strict";
  var focusin                   = '[data-toggle="erp-comunity-dictionary"]',
      focusout                  = '[data-toggle="erp-comunity-dictionary"]',
      keyup                     = '[data-toggle="erp-comunity-dictionary"]',
      CommunityDictionary       = function () {
      };
  CommunityDictionary.prototype = {
    next       : null,
    me         : null,
    constructor: CommunityDictionary,
    focusin    : function (e) {
      var $this = $(this), $parent = $this.parent(), $next = $this.next();
      this.next = $next;
      this.me   = $this;
      $this.select();
      if (!$parent.hasClass('isActive')) {
        $("." + $this.data('toggle')).removeClass('isActive').find('.erp-checkbox-menu').hide();
        $parent.addClass('isActive');
        fuck_bug();
      }
      $next.css('display', 'block');
      fetch($this, $this.val());
      return false;
    },
    focusout   : function (e) {

    },
    keyup      : function (e) {
      fetch($(e.target), $(e.target).val());
    }
  };
  function fuck_bug() {
    $(".erp-other-box").hide();
    $(".erp-checkbox-menu").hide();
    $(".erp-droplist-menu").hide();
    $(".erp-agentdroplist-menu").hide();
    $(".erp-cascading-box").hide();
    $(".erp-single-cascading-box").hide();
    $(".erp-comunity-dictionary-box").hide();
    $(".cfangxin").removeClass('isActive');
  }

  function clearCommunityDictionary(e) {
    if (!$(e.target).is('.erp-comunity-dictionary-box p,.erp-comunity-dictionary-toggle,.erp-comunity-dictionary-box p span')) {
      $(".erp-comunity-dictionary-box").hide();
    } else {
      var $id;
      if ($(e.target).is('span')) {
        $(e.target).parent().parent().parent().prev().val($(e.target).parent().parent().data('key'));
        $(e.target).parent().parent().parent().parent().data('id', $(e.target).parent().parent().data('id'));
        $(e.target).parent().parent().parent().hide();
        $id = $(e.target).parent().parent().data('id');
        $.search.watch({
          action: 'add',
          id    : "search-community",
          text  : "选中小区"
        });
      } else if ($(e.target).is('p')) {
        $(e.target).parent().parent().prev().val($(e.target).parent().data('key'));
        $(e.target).parent().parent().parent().data('id', $(e.target).parent().data('id'));
        $(e.target).parent().parent().hide();
        $id = $(e.target).parent().data('id');
        $.search.watch({
          action: 'add',
          id    : "search-community",
          text  : "选中小区"
        });
      }
      $('body').data('search-community', $id).data('search-community-name', null);
    }
  }
  var timeout = '';
  function fetch(e, keyword) {
    if (keyword == undefined) {
      keyword = null;
    }
    if (keyword == null || keyword == "") {
      $.search.watch({
        action: 'delete',
        id    : "search-community"
      });
      $('body').data('search-community-name', null).data('search-community', null)
        .data('search-community-id', null)
        .data('search-ridgepole-id', null)
        .data('search-input-ridgepole', null)
        .data('search-unity-id', null)
        .data('search-input-unity', null)
        .data('search-floor-id', null)
        .data('search-input-floor', null)
        .data('search-input-room', null)
        .data('search-input-door', null);
      $("#search-input-ridgepole").val(null).removeClass('is_search_on');
      $("#search-input-unity").val(null).removeClass('is_search_on');
      $("#search-input-floor").val(null).removeClass('is_search_on');
      $("#search-input-room").val(null).removeClass('is_search_on');
      $("#search-input-door").val(null).removeClass('is_search_on');
    }
    $('body').data('search-community-name', keyword).data('search-community', null);
    e.next().html('');
    e.next().append("<li class='erp-comunity-dictionary-box-list-loading'><i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></li>");

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(function () {
      var search = {
        page: 1,
        pageSize: 15,
        keyword:keyword,
        district_id: $('body').data('search-district'),
        business_id: $('body').data('search-business')
      };

      if (!e.parent().data('is_all')) {
        search.status = '已审核';
      }

      var url = "/api/dictionary?" + $.param(search);

      $.ajax({
        url: url
      }).done(function (result) {
        if (result.current_page) {
          e.next().html('');
          var $community = result.data;
          for (var i = 0; i < $community.length; i++) {
            e.next().append("<li class='erp-comunity-dictionary-box-list off' data-id=" + $community[i]['id'] + " data-key=" + $community[i]['title'] + ">" +
              "<p><span>" + $community[i]['title'] + "</span> 约" + $community[i]['door_count'] + "条房源</p>" +
              "<p>" + $community[i]['district']['name'] + " " + $community[i]['business']['name'] + "-" + $community[i]['address'] + "</p>" +
              "</li>");
          }

        } else {
          e.next().html('');
          e.next().append("<li class='erp-comunity-dictionary-box-list-none'>找不到? 换个姿势，再来一次!</li>");
        }
      });
    }, 350);
  }

  $(function () {
    $('html').on('click', clearCommunityDictionary);
    $('body').on('focusin.CommunityDictionary', focusin, CommunityDictionary.prototype.focusin)
      .on('focusout.CommunityDictionary', focusout, CommunityDictionary.prototype.focusout)
      .on('keyup.CommunityDictionary', keyup, CommunityDictionary.prototype.keyup)
  })
}(window.jQuery);

// 商圈字典查询
!function ($) {
  "use strict";
  var toggle                   = '[data-toggle="erp-business-dictionary"]',
      BusinessDictionary       = function () {
      };
  BusinessDictionary.prototype = {
    next       : null,
    me         : null,
    constructor: BusinessDictionary,
    toggle     : function (e) {
      var $this = $(this), $parent = $this.parent(), $next = $this.next();
      if (!$parent.hasClass('isActive')) {
        $("." + $this.data('toggle')).removeClass('isActive').find('.erp-checkbox-menu').hide();
        $parent.addClass('isActive');
        fuck_bug();
      }
      $next.css('display', 'block');
      fetch($this, $this.val());
      return false;
    }
  };
  function fuck_bug() {
    $(".erp-other-box").hide();
    $(".erp-checkbox-menu").hide();
    $(".erp-droplist-menu").hide();
    $(".erp-agentdroplist-menu").hide();
    $(".erp-cascading-box").hide();
    $(".erp-single-cascading-box").hide();
    $(".erp-comunity-dictionary-box").hide();
    $(".cfangxin").removeClass('isActive');
  }

  function clearBusinessDictionary(e) {
    if (!$(e.target).is('.erp-business-dictionary-toggle,.erp-business-dictionary-box-list,.erp-business-dictionary-box-list span')) {
      $(".erp-business-dictionary-box").hide();
    } else {
      var $this = $(e.target), $parent = $this.parent(), $keys = [], $ids = [], $params = [], $names = [];
      if ($this.is('li')) {
        if ($this.hasClass('on')) {
          $this.removeClass('on').addClass('off');
        } else {
          $this.addClass('on').removeClass('off');
        }
      } else if ($this.is('span')) {
        if ($parent.hasClass('on')) {
          $parent.addClass('off').removeClass('on');
        } else {
          $parent.addClass('on').removeClass('off');
        }
      }

      if ($parent.children('.on').length) {
        $parent.children('.on').each(function (index, el) {
          $ids.push($(el).data('id'));
          $keys.push($(el).data('key'));
          $params.push($(el).find('span').data('id'));
          $names.push($(el).find('span').data('key'));
        });
        $.search.watch({
          action: 'add',
          id    : "search-business",
          text  : "选中商圈"
        });
      } else {
        $.search.watch({
          action: 'delete',
          id    : "search-business"
        });
      }
      $parent.prev().val($keys.join('|'));
      $parent.parent().data('id', $ids);
      $('body').data('search-business', $ids);
      if ($parent.parent().data('rid') != undefined) {
        $("#" + $parent.parent().data('rid')).data('params', $.unique($params)).data('keys', $.unique($names));
        if ($names.length) {
          $("#" + $parent.parent().data('rid') + " .checkbox-text").html($.unique($names).join('|'));
        }
      }

    }
  }

  function fetch(e, keyword) {
    if (keyword == undefined) {
      keyword = "";
    }
    if (keyword == "") {
      $.search.watch({
        action: 'delete',
        id    : "search-business"
      });
      e.parent().data('id', []);
    }
    e.next().html('');
    e.next().append("<li class='erp-business-dictionary-box-list-loading'><i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></li>");
    setTimeout(function () {
      var district_ids;
      if (e.parent().data('district') != undefined && e.parent().data('district') != "") {
        district_ids = e.parent().data('district')
      }
      $.ajax({
        url: "/api/business?page=1&pageSize=300&" + $.param({district_ids: district_ids})
      }).done(function (result) {
        if (result.current_page) {
          e.next().html('');
          var $business = result.data;
          for (var i = 0; i < $business.length; i++) {
            if (e.parent().data('id').length) {
              if ($.inArray($business[i]['id'], e.parent().data('id')) >= 0) {
                e.next().append("<li class='erp-business-dictionary-box-list on' data-id=" + $business[i]['id'] + " data-key=" + $business[i]['name'] + ">" + $business[i]['name'] +
                  '<span data-id="' + $business[i].district.id + '" data-key="' + $business[i].district.name + '">' + $business[i].district.name + "</span></li>");
              } else {
                e.next().append("<li class='erp-business-dictionary-box-list off' data-id=" + $business[i]['id'] + " data-key=" + $business[i]['name'] + ">" + $business[i]['name'] +
                  '<span data-id="' + $business[i].district.id + '" data-key="' + $business[i].district.name + '">' + $business[i].district.name + "</span></li>");
              }
            } else {
              e.next().append("<li class='erp-business-dictionary-box-list off' data-id=" + $business[i]['id'] + " data-key=" + $business[i]['name'] + ">" + $business[i]['name'] +
                '<span data-id="' + $business[i].district.id + '" data-key="' + $business[i].district.name + '">' + $business[i].district.name + "</span></li>");
            }

          }
        } else {
          e.next().html('');
          e.next().append("<li class='erp-business-dictionary-box-list-none'>木有？</li>");
        }
      });
    }, 300);
  }

  $(function () {
    $('html').on('click', clearBusinessDictionary);
    $('body').on('click.BusinessDictionary', toggle, BusinessDictionary.prototype.toggle)
  })
}(window.jQuery);

// 下拉列表
!function ($) {
  "use strict";
  var toggle         = '[data-toggle="erp-droplist"]', DropList = function () {
  };
  DropList.prototype = {
    constructor: DropList,
    toggle     : function (e) {
      var $this = $(this), $parent = $this.parent(), $next = $this.next();
      if (!$parent.hasClass('isActive')) {
        fuck_bug();
        $("." + $this.data('toggle')).removeClass('isActive').find('.erp-droplist-menu').hide();
        $parent.addClass('isActive');
        if ($next.children('li').length) {
          $next.show();
        }
      } else {
        $parent.removeClass('isActive');
        $next.hide();
      }
      return false;
    }
  };
  function fuck_bug() {
    $(".erp-other-box").hide();
    $(".erp-checkbox-menu").hide();
    $(".erp-droplist-menu").hide();
    $(".erp-agentdroplist-menu").hide();
    $(".erp-cascading-box").hide();
    $(".erp-single-cascading-box").hide();
    $(".erp-comunity-dictionary-box").hide();
    $(".cfangxin").removeClass('isActive');
  }

  function clearDropList(e) {
    if (!$(e.target).is('li.erp-droplist-list')) {
      $(".erp-droplist-menu").hide();
    } else {
      if ($(e.target).hasClass('on')) {
        $(e.target).removeClass('on').addClass('off');
      } else if ($(e.target).hasClass('off')) {
        if ($(e.target).parent().children('.on').length == 1) {
          $(e.target).parent().children().removeClass('on').addClass('off');
          $(e.target).addClass('on');
        } else {
          $(e.target).removeClass('off').addClass('on');
        }
      }

      bindParams($(e.target));
      fuck_bug();
      return false;
    }
  }

  function bindParams(target) {
    target.parent().parent().data('params', target.data('id'));
    target.parent().prev().children('span').html(target.data('key'));
    var $id = target.parent().parent().attr('id');
    //绑定搜索条件
    if (target.parent().parent().data('params') != '') {
      if ($id == 'search-trace-type' && target.data('id') == '选择类型') {
        $.search.watch({
          action: 'delete',
          id    : target.parent().parent().attr('id')
        });
        $(".search-date").val(null);
        $('body').data('search-input-date-min', null).data('search-input-date-max', null);
        $.search.watch({action: 'delete', id: 'search-input-date-min'});
        $.search.watch({action: 'delete', id: 'search-input-date-max'});
      } else {
        $.search.watch({
          action: 'add',
          id    : $id,
          text  : '选中：' + target.parent().parent().data('params')
        });
      }
    } else {
      if ($id == 'search-agent-type') {
        $.search.watch({
          action: 'add',
          id    : $id,
          text  : "不限开核盘人"
        });
      } else if ($id == 'search-date-type') {
        $(".search-date").val(null);
        $('body').data('search-input-date-min', null).data('search-input-date-max', null);
        $.search.watch({action: 'delete', id: $id});
        $.search.watch({action: 'delete', id: 'search-input-date-min'});
        $.search.watch({action: 'delete', id: 'search-input-date-max'});
      } else {
        $.search.watch({
          action: 'delete',
          id    : target.parent().parent().attr('id')
        });
      }
    }

    $('body').data(target.parent().parent().attr('id'), target.data('id') ? target.data('id') : null);
  }

  $(function () {
    $('html').on('click', clearDropList);
    $('body').on('click.DropList', toggle, DropList.prototype.toggle);
  })
}(window.jQuery);

// 下拉经纪人列表
!function ($) {
  "use strict";
  var toggle              = '[data-toggle="erp-agentdroplist"]', AgentDropList = function () {
  };
  AgentDropList.prototype = {
    constructor: AgentDropList,
    toggle     : function (e) {
      var $this = $(this), $parent = $this.parent(), $next = $this.next();
      if (!$parent.hasClass('isActive')) {
        fuck_bug();
        $("." + $this.data('toggle')).removeClass('isActive').find('.erp-agentdroplist-menu').hide();
        $parent.addClass('isActive');

        if ($next.children().hasClass('is-agent')) {
          $next.find('.is-agent').nextAll().remove();
        } else {
          $next.children().remove();
        }
        setTimeout(function () {
          fetch($this, $next);
          $next.show();
        }, 50);
      } else {
        $parent.removeClass('isActive');
        $next.hide();
      }
      return false;
    }
  };
  function fuck_bug() {
    $(".erp-other-box").hide();
    $(".erp-checkbox-menu").hide();
    $(".erp-droplist-menu").hide();
    $(".erp-agentdroplist-menu").hide();
    $(".erp-cascading-box").hide();
    $(".erp-single-cascading-box").hide();
    $(".erp-comunity-dictionary-box").hide();
    $(".cfangxin").removeClass('isActive');
  }

  function fetch(me, next) {
    next.append(" <li class='erp-agentdroplist-list is-loading'>数据加载中... </li>");
    $.ajax({
      url: "/api/organization/search-agents?" + $.param({
        company_area_id: me.parent().data('area'),
        store_id       : me.parent().data('store'),
        store_group_id : me.parent().data('group'),
        type           : me.parent().data('type')
      })
    }).done(function (result) {
      if (next.children().hasClass('is-loading')) {
        next.find('.is-loading').remove();
      }
      if (result.length) {
        var $agents = result;
        for (var i = 0; i < $agents.length; i++) {
          var $name = $agents[i]['name'];
          next.append("<li class='erp-agentdroplist-list off' data-id=" + $agents[i]['id'] + " data-alias=" + $agents[i]['alias'] + "  data-key=" + $name + ">" + $name + "</li>");
        }
      }
    });
  }

  function clearAgentDropList(e) {
    if (!$(e.target).is('li.erp-agentdroplist-list')) {
      $(".erp-agentdroplist-menu").hide();
    } else {
      if ($(e.target).hasClass('on')) {
        $(e.target).removeClass('on').addClass('off');
      } else if ($(e.target).hasClass('off')) {
        if ($(e.target).parent().children('.on').length == 1) {
          $(e.target).parent().children().removeClass('on').addClass('off');
          $(e.target).addClass('on');
        } else {
          $(e.target).removeClass('off').addClass('on');
        }
      }
      bindParams($(e.target));
      fuck_bug();
      return false;
    }
  }

  function bindParams(target) {
    target.parent().parent().data('agent', target.data('id'));
    target.parent().prev().children('span').html(target.data('key'));
    var rid = target.parent().parent().data('rid');
    if (target.hasClass('is-area')) {
      target.parent().parent().data('area', [target.data('id')]);
      $('body').data('company_area_id', [target.data('id')]).data('store_id', []).data('store_group_id', []).data('agent_id', null);
      if (rid != undefined && rid != "") {
        $("#" + rid).find('.cascading-text').html(target.data('alias'));
      }
      //选择本区
      orgType('本区');
    } else if (target.hasClass('is-store')) {
      target.parent().parent().data('store', [target.data('id')]).data('area', []);
      $('body').data('store_id', [target.data('id')]).data('company_area_id', []).data('store_group_id', []).data('agent_id', null);
      if (rid != undefined && rid != "") {
        $("#" + rid).find('.cascading-text').html(target.data('alias'));
      }
      //选择本店
      orgType('本店');
    } else if (target.hasClass('is-group')) {
      target.parent().parent().data('group', [target.data('id')]).data('area', []).data('store', []);
      $('body').data('store_group_id', [target.data('id')]).data('company_area_id', []).data('store_id', []).data('agent_id', null);
      if (rid != undefined && rid != "") {
        $("#" + rid).find('.cascading-text').html(target.data('alias'));
      }
      //选择本组
      orgType('本组');
    } else if (target.hasClass('is-agent')) {
      target.parent().parent().data('agent', target.data('id')).data('area', []).data('store', []).data('group', []);
      $('body').data('agent_id', target.data('id')).data('company_area_id', []).data('store_id', []).data('store_group_id', []);
      if (rid != undefined && rid != "") {
        $("#" + rid).find('.cascading-text').html(target.data('alias'));
      }
      //选择本人
      orgType('本人');
    } else {
      if (rid != undefined && rid != "") {
        $("#" + rid).find('.cascading-text').html(target.data('alias'));
      }
      //选择经纪人
      orgType('经纪人');

      $('body').data('agent_id', target.data('id')).data('company_area_id', []).data('store_id', []).data('store_group_id', []);
    }
  }


  function orgType(type) {
    //本区，本店，本组，本人，经纪人查找
    $.search.watch({
      action: 'add',
      id    : 'search-agent',
      text  : "查找：" + type
    });
  }

  $(function () {
    $('html').on('click', clearAgentDropList);
    $('body').on('click.AgentDropList', toggle, AgentDropList.prototype.toggle);
  })
}(window.jQuery);

// 条件清除列表
!function ($) {
  "use strict";
  var toggle               = '[data-toggle="erp-searchdroplist-button"]',
      clear                = '.searchdroplist-clear',
      SearchDropList       = function () {
      };
  SearchDropList.prototype = {
    constructor: SearchDropList,
    toggle     : function (e) {
      var $this = $(this), $parent = $this.parent(), $next = $this.parent().next();
      if ($next.is(':visible')) {
        $parent.removeClass('isActive');
        $next.hide();
      } else {
        $parent.addClass('isActive');
        if ($next.children('li').length) {
          $next.show();
        }
        fuck_bug();
      }
      return false;
    },
    clear      : function (e) {
      var $type = $(this).parent().parent().data('type');
      if ($type == 'schedule') {
        $.search.clear_schedule();
      } else if ($type == 'trace') {
        $.search.clear_trace();
      } else if ($type == 'bargain') {
        $.search.clear_bargain();
      } else if ($type == 'deposit') {
        $.search.clear_deposit();
      } else if ($type == 'only') {
        $.search.clear_only();
      } else if ($type == 'caller') {
        $.search.clear_caller();
      } else if ($type == 'delegation') {
        $.search.clear_delegation();
      } else if ($type == 'codebook') {
        $.search.clear_codebook();
      } else if ($type == 'macaddress') {
        $.search.clear_macaddress();
      } else if ($type == 'task') {
        $.search.clear_task();
      } else if ($type == 'fines') {
        $.search.clear_fines();
      } else if ($type == 'sourceDoing') {
        $.search.clear_sourceDoing();
      } else if ($type == 'clientDoing') {
        $.search.clear_clientDoing();
      } else if ($type == 'expandDoing') {
        $.search.clear_expandDoing();
      } else if ($type == 'innerMessage') {
        $.search.clear_innerMessage();
      } else if ($type == 'performance') {
        $.search.clear_performance();
      } else if ($type == 'statistics') {
        $.search.clear_statistics();
      } else if ($type == 'key') {
        $.search.clear_key();
      } else if ($type == 'apply') {
        $.search.clear_apply()
      } else if ($type == 'member') {
        $.search.clear_member();
      } else if ($type == 'basic') {
        $.search.clear_basic();
      } else if ($type == 'warrant') {
        $.search.clear_warrant();
      } else if ($type == 'personal') {
        $.search.clear_personal();
      } else if ($type == 'proportion') {
        $.search.clear_proportion();
      } else {
        $.search.clear();
      }
    }
  };
  function fuck_bug() {
    $(".erp-other-box").hide();
    $(".erp-checkbox-menu").hide();
    $(".erp-droplist-menu").hide();
    $(".erp-agentdroplist-menu").hide();
    $(".erp-cascading-box").hide();
    $(".erp-single-cascading-box").hide();
    $(".erp-comunity-dictionary-box").hide();
    $(".cfangxin").removeClass('isActive');
  }

  function clearSearchDropList(e) {
    if (!$(e.target).is('li.erp-searchdroplist-list,li.erp-searchdroplist-list span')) {
      $(".erp-searchdroplist-menu").hide();
      $(".cfangxin").removeClass('isActive');
    } else {
      if ($(e.target).is('span')) {
        var $parent = $(e.target).parent(), $id = $parent.data('id'), $obj = $("#" + $id), $cid = $id;
        if ($id == 'search-category') {
          $(".droplist-text", $obj).text('不限');
          $obj.data('params', "");
          $(".erp-droplist-list", $obj).removeClass('on').addClass('off');
          $('body').data($parent.data('id'), null);
        } else if ($id == 'search-code') {
          $(".droplist-text", $obj).text('不限');
          $obj.data('params', "");
          $(".erp-droplist-list", $obj).removeClass('on').addClass('off');
          $('body').data($parent.data('id'), null);
        } else if ($id == 'search-district') {
          $(".checkbox-text", $obj).text('不限');
          $obj.data('params', []).data('keys', []);
          $("#search-business").data('district', []);
          $(".erp-checkbox-list", $obj).removeClass('on').addClass('off');
          $('body').data($parent.data('id'), []);
        } else if ($id == 'search-business') {
          $("input", $obj).val('');
          $obj.data('id', null);
          $(".erp-business-dictionary-box-list", $obj).removeClass('on').addClass('off');
          $('body').data($id, null);
          ////////////Flip Business//////////////
          var rid = $obj.data('rid'), is_dictrict = false;
          if (rid) {
            var $lis = $(".erp-searchdroplist-menu li.on");
            if ($lis.length) {
              $lis.each(function (index, el) {
                if ($(el).data('id') == 'search-district') {
                  is_dictrict = true;
                }
              });
              if (!is_dictrict) {
                var robj = $("#" + rid);
                $(".checkbox-text", robj).text('不限');
                robj.data('params', []).data('keys', []);
                $(".erp-checkbox-list", robj).removeClass('on').addClass('off');
                $('body').data(rid, []);
              }
            }
          }
        } else if ($id == 'search-community') {
          $("input", $obj).val('');
          $obj.data('id', null);
          $(".erp-comunity-dictionary-box-list", $obj).removeClass('on').addClass('off');
          $('body').data($parent.data('id'), null);
        } else if ($id == 'search-input-ridgepole') {
          $obj.val(null);
          $('body').data($parent.data('id'), null);
        } else if ($id == 'search-input-unity') {
          $obj.val(null);
          $('body').data($parent.data('id'), null);
        } else if ($id == 'search-input-room') {
          $obj.val(null);
          $('body').data($parent.data('id'), null);
        } else if ($id == 'search-input-uuid') {
          $obj.val(null);
          $('body').data($parent.data('id'), null);
        } else if ($id == 'search-asg') {
          $(".cascading-text", $obj).html('区、店、组');
          $obj.data('areas', []).data('stores', []).data('groups', []).data('keys', []);
          $(".on", $obj).removeClass('on').addClass('off');
          $('body').data('company_area_id', []).data('store_id', []).data('store_group_id', []).data($id, null);
        } else if ($id == 'search-agent') {
          var $body = $('body');
          $(".agentdroplist-text").text('经纪人');
          $(".cascading-text").text('区、店、组');
          $(".on", $obj).removeClass('on').addClass('off');
          // $body.data('agent_id', $body.data('m'));
          $body.data('org', '不限');
          $body.data('search-org', '不限');
          $('.erp-cascading').data('area', []).data('store', []).data('group', []);
          $(".erp-agentdroplist").data('area', []).data('store', []).data('group', []);
        } else if ($id == 'search-arch') {
          $(".checkbox-text", $obj).text('不限');
          $obj.data('params', []).data('keys', []);
          $(".erp-checkbox-list", $obj).removeClass('on').addClass('off');
          $('body').data($parent.data('id'), []);
        } else if ($id == 'search-status') {
          $(".checkbox-text", $obj).text('不限');
          $obj.data('params', []);
          $(".erp-checkbox-list", $obj).removeClass('on').addClass('off');
          $('body').data($id, null);
        } else if ($id == 'search-input-area') {
          $("#search-input-area-min").val(null);
          $("#search-input-area-max").val(null);
          $('body').data('search-input-area-min', null).data('search-input-area-max', null);
          $cid = "search-input-area";
        } else if ($id == 'search-input-lease') {
          $("#search-input-lease-min").val(null);
          $("#search-input-lease-max").val(null);
          $('body').data('search-input-lease-min', null).data('search-input-lease-max', null);
          $cid = "search-input-lease";
        } else if ($id == 'search-input-sale') {
          $("#search-input-sale-min").val(null);
          $("#search-input-sale-max").val(null);
          $('body').data('search-input-sale-min', null).data('search-input-sale-max', null);
          $cid = "search-input-sale";
        } else if ($id == 'search-input-floors') {
          $("#search-input-floors-min").val(null);
          $("#search-input-floors-max").val(null);
          $('body').data('search-input-floors-min', null).data('search-input-floors-max', null);
          $cid = "search-input-floors";
        } else if ($id == 'search-floor-type') {
          $(".checkbox-text", $obj).text('全部');
          $obj.data('params', []).data('keys', []);
          $(".erp-checkbox-list", $obj).removeClass('on').addClass('off');
          $('body').data($parent.data('id'), null);
        } else if ($id == 'search-direction') {
          $(".checkbox-text", $obj).text('全部');
          $obj.data('params', []).data('keys', []);
          $(".erp-checkbox-list", $obj).removeClass('on').addClass('off');
          $('body').data($parent.data('id'), null);
        } else if ($id == 'search-community-type') {
          $(".checkbox-text", $obj).text('全部');
          $obj.data('params', []).data('keys', []);
          $(".erp-checkbox-list", $obj).removeClass('on').addClass('off');
          $('body').data($parent.data('id'), null);
        } else if ($id == 'search-level') {
          $(".checkbox-text", $obj).text('不限');
          $obj.data('params', []).data('keys', []);
          $(".erp-checkbox-list", $obj).removeClass('on').addClass('off');
          $('body').data($parent.data('id'), []);
        } else if ($id == 'search-other') {
          $(".from", $obj).text('');
          $(".category", $obj).text('');
          $obj.data('params', []).data('type', null);
          $(".erp-other-box-list", $obj).removeClass('on').addClass('off');
          $('body').data('search-other-type', null).data('search-other-val', []);
        } else if ($id == 'search-input-date-min') {
          $obj.val(null);
          $('body').data('search-input-date-min', null);
        } else if ($id == 'search-input-date-max') {
          $obj.val(null);
          $('body').data('search-input-date-max', null);
        } else if ($id == 'search-trace-type') {
          $(".droplist-text", $obj).text($obj.data('default'));
          $(".erp-droplist-list", $obj).removeClass('on').addClass('off');
          $(".search-date").val(null);
          $('body').data('search-input-date-min', null).data('search-input-date-max', null);
          $.search.watch({action: 'delete', id: 'search-input-date-min'});
          $.search.watch({action: 'delete', id: 'search-input-date-max'});
        } else {
          $obj.removeClass($obj.data('id'));
          $('body').data($parent.data('id'), false);
        }

        $.search.watch({action: 'delete', id: $cid});
      }
      return false;
    }
  }

  $(function () {
    $('html').on('click', clearSearchDropList);
    $('body').on('click.SearchDropList', toggle, SearchDropList.prototype.toggle).on('click.ClearSearchDropList', clear, SearchDropList.prototype.clear);
  })
}(window.jQuery);

//搜索INPUT
!function ($) {
  "use strict";
  var change            = '.search-input', SearchInput = function () {
  }, focus              = '.search-input', click = '.erp-dictionary-rud';
  SearchInput.prototype = {
    constructor: SearchInput,
    change     : function (e) {
      bindParams($(this));
      return false;
    },
    focus      : function (e) {
      $(this).select();
      clearRud(e);
      autoCompleted($(this));
    },
    click      : function (e) {
      bindRud($(this));
    }
  };

  function autoCompleted(e) {

    var $body                                                      = $('body'), community_id = $body.data('search-community'),
        ridgepole_id = $body.data('search-ridgepole-id'), unity_id = $body.data('search-unity-id'),
        floor_id                                                   = $body.data('search-floor-id');
    if (e.hasClass('search-input-ridgepole') && (community_id != undefined || community_id != null)) {
      $.ajax({
        url: "/api/dictionary/" + community_id + "/ridgepoles"
      }).done(function (result) {
        var ridgepoles = result[0].ridgepoles;
        if (ridgepoles.length) {
          e.parent().next().html("");
          $.community = {ridgepoles: []};
          for (var i = 0; i < ridgepoles.length; i++) {
            $.community.ridgepoles.push(ridgepoles[i]['name']);
            e.parent().next().append("<li class='erp-ridgepole-dictionary-box-list erp-dictionary-rud is-ridgepole' data-id=" + ridgepoles[i]['id'] + "   title=" + ridgepoles[i]['name'] + "   data-name=" + ridgepoles[i]['name'] + ">" + ridgepoles[i]['name'] + "号楼</li>");
          }
          e.parent().next().show();
        }
      });
    } else if (e.hasClass('search-input-unity') && (ridgepole_id != undefined || ridgepole_id != null)) {
      $.ajax({
        url: "/api/ridgepole/" + ridgepole_id + "/unity"
      }).done(function (result) {
        if (result.length) {
          e.parent().next().html("");
          $.community = {unities: []};
          for (var i = 0; i < result.length; i++) {
            $.community.unities.push(result[i]['name']);
            e.parent().next().append("<li class='erp-ridgepole-dictionary-box-list erp-dictionary-rud is-unity' data-id=" + result[i]['id'] + "  data-name=" + result[i]['name'] + ">" + result[i]['name'] + "单元</li>");
          }
          e.parent().next().show();
        }
      });
    } else if (e.hasClass('search-input-floor') && (unity_id != undefined || unity_id != null)) {
      $.ajax({
        url: "/api/unity/" + unity_id + "/floor"
      }).done(function (result) {
        if (result.length) {
          e.parent().next().html("");
          $.community = {floors: []};
          for (var i = 0; i < result.length; i++) {
            $.community.floors.push(result[i]['name']);
            e.parent().next().append("<li class='erp-ridgepole-dictionary-box-list erp-dictionary-rud is-floor' data-id=" + result[i]['id'] + "  data-name=" + result[i]['name'] + ">" + result[i]['name'] + "层</li>");
          }
          e.parent().next().show();
        }
      });
    } else if (e.hasClass('search-input-room') && (unity_id != undefined || unity_id != null)) {
      $.ajax({
        url: "/api/unity/" + unity_id + "/door"
      }).done(function (result) {
        if (result.length) {
          e.parent().next().html("");
          for (var i = 0; i < result.length; i++) {
            e.parent().next().append("<li class='erp-ridgepole-dictionary-box-list erp-dictionary-rud is-room' data-id=" + result[i]['id'] + "  data-name=" + result[i]['name'] + ">" + result[i]['name'] + "<span>" + result[i]['floor'].name + "层</span></li>");
          }
          e.parent().next().show();
        }
      });
    } else if (e.hasClass('search-input-door') && (floor_id != undefined || floor_id != null)) {
      $.ajax({
        url: "/api/floor/" + floor_id + "/door"
      }).done(function (result) {
        if (result.length) {
          e.parent().next().html("");
          for (var i = 0; i < result.length; i++) {
            e.parent().next().append("<li class='erp-ridgepole-dictionary-box-list erp-dictionary-rud is-room' data-id=" + result[i]['id'] + "  data-name=" + result[i]['name'] + ">" + result[i]['name'] + "</li>");
          }
          e.parent().next().show();
        }
      });
    }
  }

  function bindRud(e) {
    if (e.hasClass('is-ridgepole')) {
      autoClear('ridgepole');
      $("#search-input-ridgepole").val(e.data('name'));
      $('body').data('search-ridgepole-id', e.data('id')).data('search-input-ridgepole', e.data('name'));
      bindParams($("#search-input-ridgepole"));
    } else if (e.hasClass('is-unity')) {
      autoClear('unity');
      $("#search-input-unity").val(e.data('name'));
      $('body').data('search-unity-id', e.data('id')).data('search-input-unity', e.data('name'));
      bindParams($("#search-input-unity"));
    } else if (e.hasClass('is-floor')) {
      autoClear('floor');
      $("#search-input-floor").val(e.data('name'));
      $('body').data('search-floor-id', e.data('id')).data('search-input-floor', e.data('name'));
      bindParams($("#search-input-floor"));
    } else if (e.hasClass('is-room')) {
      $("#search-input-room").val(e.data('name'));
      $("#search-input-door").val(e.data('name'));
      $('body').data('search-input-room', e.data('name')).data('search-input-door', e.data('name'));
      bindParams($("#search-input-room"));
      // bindParams($("#search-input-door"));
    }
  }

  function autoClear(type) {
    if (type == 'community') {
      $('body').data('search-ridgepole-id', null)
        .data('search-input-ridgepole', null)
        .data('search-unity-id', null)
        .data('search-input-unity', null)
        .data('search-floor-id', null)
        .data('search-input-floor', null)
        .data('search-input-room', null)
        .data('search-input-door', null);
      $("#search-input-ridgepole").val(null).removeClass('is_search_on');
      $("#search-input-unity").val(null).removeClass('is_search_on');
      $("#search-input-floor").val(null).removeClass('is_search_on');
      $("#search-input-room").val(null).removeClass('is_search_on');
      $("#search-input-door").val(null).removeClass('is_search_on');
    } else if (type == 'ridgepole') {
      $('body').data('search-unity-id', null)
        .data('search-input-unity', null)
        .data('search-floor-id', null)
        .data('search-input-floor', null)
        .data('search-input-room', null)
        .data('search-input-door', null);
      $("#search-input-unity").val(null).removeClass('is_search_on');
      $("#search-input-floor").val(null).removeClass('is_search_on');
      $("#search-input-room").val(null).removeClass('is_search_on');
      $("#search-input-door").val(null).removeClass('is_search_on');
    } else if (type == 'unity') {
      $('body').data('search-floor-id', null)
        .data('search-input-floor', null)
        .data('search-input-room', null)
        .data('search-input-door', null);
      $("#search-input-floor").val(null).removeClass('is_search_on');
      $("#search-input-room").val(null).removeClass('is_search_on');
      $("#search-input-door").val(null).removeClass('is_search_on');
    } else if (type == 'floor') {
      $('body').data('search-input-room', null)
        .data('search-input-door', null);
      $("#search-input-room").val(null).removeClass('is_search_on');
      $("#search-input-door").val(null).removeClass('is_search_on');
    }
  }

  function setRange(minId, maxId, type) {
    var min = 0, max = '不限';
    if ($(minId).val() != "") {
      min = $(minId).val();
      $(minId).addClass('is_search_on');
    }
    if ($(maxId).val() != "") {
      max = $(maxId).val();
      $(maxId).addClass('is_search_on');
    }
    return type + " : " + min + " - " + max;
  }

  function bindParams(input) {
    var $text, $id = input.attr('id'), $cid = $id, $status = $("#search-status"), $body = $('body'), type = null;
    if ($id == 'search-input-ridgepole') {
      $text = "楼栋查找";
      type  = 'ridgepole';
      if ($.inArray(input.val(), $.community.ridgepoles) == -1) {
        $('body').data('search-ridgepole-id', null)
      }
    } else if ($id == 'search-input-unity') {
      $text = "单元查找";
      type  = 'unity';
      if ($.inArray(input.val(), $.community.unities) == -1) {
        $('body').data('search-unity-id', null)
      }
    } else if ($id == 'search-input-room') {
      $text = "房号查找";
    } else if ($id == 'search-input-uuid') {
      $text = "智能查找";
    } else if ($id == 'search-input-area-min' || $id == 'search-input-area-max') {
      $text = setRange('#search-input-area-min', '#search-input-area-max', '面积');
      $cid  = "search-input-area";
    } else if ($id == 'search-input-lease-min' || $id == 'search-input-lease-max') {
      $text = setRange('#search-input-lease-min', '#search-input-lease-max', '租价');
      $cid  = "search-input-lease";
    } else if ($id == 'search-input-sale-min' || $id == 'search-input-sale-max') {
      $text = setRange('#search-input-sale-min', '#search-input-sale-max', '售');
      $cid  = "search-input-sale";
    } else if ($id == 'search-input-floors-min' || $id == 'search-input-floors-max') {
      $text = setRange('#search-input-floors-min', '#search-input-floors-max', '楼层');
      $cid  = "search-input-floors";
    } else if ($id == 'search-input-floor') {
      type = 'floor';
      if ($.inArray(input.val(), $.community.floors) == -1) {
        $('body').data('search-floor-id', null)
      }
    }

    if (input.val() == "") {
      $.search.watch({
        action: 'delete',
        id    : $cid
      });
      if (type != null) {
        autoClear(type);
      }
    } else {
      $.search.watch({
        action: 'add',
        id    : $cid,
        text  : $text
      });
    }
    if ($id == 'search-input-room' || $id == 'search-input-uuid') {
      $status.data('params', [0]);
      $(".checkbox-text", $status).text('不限');
      $(".erp-checkbox-list", $status).removeClass('on').addClass('off');
      $body.data('search-status', []);
    }

    $body.data($id, input.val());

  }

  function clearRud(e) {
    if ($(e.target).hasClass('search-input')) {
      if ($(e.target).parent().next().is(":visible")) {
        return;
      }
    }
    $(".erp-ridgepole-dictionary-box").hide();
    $(".erp-ridgepole-source-box").hide();
  }

  $(function () {
    $('html').on('click', clearRud);
    $('body').on('change.SearchInput', change, SearchInput.prototype.change).on('focus.SearchInput', focus, SearchInput.prototype.focus).on('click.SearchInput', click, SearchInput.prototype.click);
  })
}(window.jQuery);

// 复选TAG
!function ($) {
  "use strict";
  var toggle     = '.search-icon', Tags = function () {
  };
  Tags.prototype = {
    constructor: Tags,
    toggle     : function (e) {
      bindParams($(this), $(this).data('id'));
      return false;
    }
  };

  function bindParams(e, className) {
    var $me = e, $body = $('body');
    if ($me.hasClass(className)) {
      $.search.watch({
        action: 'delete',
        id    : e.attr('id')
      });

      $me.removeClass(className);
      $body.data(e.attr('id'), false);
    } else {
      $.search.watch({
        action: 'add',
        id    : e.attr('id'),
        text  : e.data('text')
      });
      $me.addClass(className);
      $body.data(e.attr('id'), true);
    }
  }


  $(function () {
    $('body').on('click.Tags', toggle, Tags.prototype.toggle);
  })
}(window.jQuery);

// 房客源其他
!function ($) {
  "use strict";
  var toggle      = '.erp-other-toggle', Other = function () {
  };
  Other.prototype = {
    constructor: Other,
    toggle     : function (e) {
      var $this = $(this), $parent = $this.parent(), $next = $this.next();
      if (!$parent.hasClass('isActive')) {
        fuck_bug();
        $parent.addClass('isActive');
        if ($.trim($parent.data('val'))) {
          $this.nextAll().show();
        } else {
          $next.show();
          if ($next.children().hasClass('on')) {
            updateBox($next.children('.on'));
          }
        }
      } else {
        $parent.removeClass('isActive');
        $this.nextAll().hide();
      }
      return false;
    }
  };

  function fuck_bug() {
    $(".erp-other-box").hide();
    $(".erp-checkbox-menu").hide();
    $(".erp-droplist-menu").hide();
    $(".erp-agentdroplist-menu").hide();
    $(".erp-searchdroplist-menu").hide();
    $(".erp-cascading-box").hide();
    $(".erp-single-cascading-box").hide();
    $(".erp-comunity-dictionary-box").hide();
    $(".cfangxin").removeClass('isActive');
  }

  function clearOther(e) {
    if (!$(e.target).is('.erp-other-box-list')) {
      $(".erp-other-box").hide();
    } else {
      var $this = $(e.target), $parent = $this.parent();
      if ($this.hasClass('erp-from')) {
        $this.siblings().removeClass('on').addClass('off');
        $this.removeClass('off').addClass('on');
        if ($this.data('id')) {
          $parent.prev().children('.from').text($this.data('type'));
          $parent.prev().children('.category').text("");
          $parent.parent().data('type', $this.data('id'));
          updateBox($this);
          $.search.watch({
            action: 'add',
            id    : 'search-other',
            text  : '查找: ' + $this.data('type')
          });
          $('body').data('search-other-type', $this.data('id')).data('search-other-val', []);
        } else {
          $parent.next().hide();
          $parent.parent().data('type', null);
          $parent.parent().data('val', []);
          $parent.prev().children('.from').text($this.data('id'));
          $parent.prev().children('.category').text("");
          $.search.watch({
            action: 'delete',
            id    : 'search-other'
          });
          $('body').data('search-other-type', null).data('search-other-val', []);
        }

      } else {
        $this.parent().parent().addClass('isActive');
        var ids = [], keys = [];
        if ($this.data('type') && ($this.data('type') === 'take_looked_at')){
          if ($this.hasClass('on')) {
            $this.removeClass('on').addClass('off');
          } else {
            $this.removeClass('off').addClass('on');
          }
          if ($this.parent().children('li').length){
            $this.parent().children('li').each(function(index,ele){
                // 如果当前元素不相等
                if ($this.text() !== $(ele).text() && $(ele).hasClass('on')){
                  $(ele).removeClass('on').addClass('off');
                }

            });
          }

        }else {
        if ($this.hasClass('on')) {
          $this.removeClass('on').addClass('off');
        } else {
          $this.removeClass('off').addClass('on');
        }
        }
        if ($this.parent().children('li.on').length) {
          $this.parent().children('li.on').each(function (index, el) {
            ids.push($(el).data('id'));
            keys.push($(el).data('key'));
          });
          $parent.parent().data('val', ids);
          $('body').data('search-other-val', ids);
          $parent.prev().prev().children('.category').text(keys.join('|'));
        } else {
          $parent.parent().data('val', []);
          $parent.prev().prev().children('.category').text("");
          $('body').data('search-other-val', []);
        }
      }
    }
  }

  function updateBox(me) {
    if ($.trim(me.data('category'))) {
      var $category = me.data('category');
      var $type     = me.data('id');
      me.parent().next().children().remove();
      for (var i = 0; i < $category.length; i++) {
        me.parent().next().append("<li class='erp-other-box-list off erp-category' data-id=" + $category[i]['id'] + " data-key=" + $category[i]['name'] + " data-type="+ $type + ">" + $category[i]['name'] + "</li>");
      }
      me.parent().next().show();
    }
  }
  // 将元素设置为单选模式
  function  boxListSingleSelectSet(ele,class_on,class_off) {
    ele.parent().children().each(function (obj) {
        if (obj!==ele){
          obj.removeClass(class_on).addClass(class_off);
        }else {
          ele.removeClass(class_off).addClass(class_on);
        }
    });
  }


  $(function () {
    $('html').on('click', clearOther);
    $('body').on('click.Other', toggle, Other.prototype.toggle);
  })
}(window.jQuery);

// ERP Tooltip
!function ($) {
  "use strict";
  var mouseover     = '.erp-tooltip', Tooltip = function () {
  };
  Tooltip.prototype = {
    constructor: Tooltip,
    mouseover  : function (e) {
      if ($(e.target).is('a')) {
        show($(e.target));
      } else if ($(e.target).is('input')) {
        show($(e.target));
      } else if ($(e.target).is('span')) {
        show($(e.target));
      } else {
        show($(e.target).parent());
      }
    }
  };

  function clearTooltip() {
    $(".classic-tooltip", $('body')).remove();
  }

  function autoFillParams(e) {
    if (e.hasClass('erp-checkbox-toggle')) {
      return e.find('.checkbox-text').text();
    } else if (e.hasClass('erp-cascading-toggle')) {
      return e.find('.cascading-text').text();
    } else if (e.hasClass('erp-business-dictionary-toggle')) {
      if (e.val()) {
        return e.val();
      } else {
        return "选择商圈";
      }
    } else if (e.hasClass('category')) {
      if (e.text()) {
        return e.text();
      } else {
        return "暂无数据";
      }
    } else if (e.hasClass('checkbox-text')) {
      return e.text();
    } else if (e.hasClass('cascading-text')) {
      return e.text();
    } else {
      return '暂无数据';
    }
  }

  function show(e) {
    var $body = $('body'), $text = autoFillParams(e);
    if (!$body.hasClass('classic-tooltip')) {
      $body.append('<div class="classic-tooltip"> <div class="classic-tooltip-arrow"></div> <div class="classic-tooltip-inner">' + $text + '</div> </div>');
      var $me = $(".classic-tooltip");
      $me.css({
        left: e.offset().left + (e.width() + 30),
        top : (e.offset().top) - 2
      }).stop(true, true).delay(100).fadeIn();
    }
  }

  $(function () {
    $('body').on('mouseover.Tooltip', mouseover, Tooltip.prototype.mouseover).on('mouseout', clearTooltip);
  })
}(window.jQuery);

// 复选TAG
!function ($) {
  function clearOpenAgent(e) {

    if (!$(e.target).is('input.open-class,button.a-open-class,.open-td-class,.org_setting-table-box,.org_setting-title')) {
      $(".org-area-store-group-open-agent").hide();
    }
    if (!$(e.target).is('input.verify-class,button.a-verify-class,.verify-td-class,.org_setting-table-box,.org_setting-title')) {
      $(".org-area-store-group-verify-agent").hide();
    }
  }

  $(function () {
    $('html').on('click', clearOpenAgent);
  })
}(window.jQuery);


/* big.js v3.1.3 https://github.com/MikeMcl/big.js/LICENCE */
(function (global) {
  'use strict';

  /*
   big.js v3.1.3
   A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
   https://github.com/MikeMcl/big.js/
   Copyright (c) 2014 Michael Mclaughlin <M8ch88l@gmail.com>
   MIT Expat Licence
   */

  /***************************** EDITABLE DEFAULTS ******************************/

  // The default values below must be integers within the stated ranges.

  /*
   * The maximum number of decimal places of the results of operations
   * involving division: div and sqrt, and pow with negative exponents.
   */
  var DP        = 20,                           // 0 to MAX_DP

      /*
       * The rounding mode used when rounding to the above decimal places.
       *
       * 0 Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
       * 1 To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
       * 2 To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
       * 3 Away from zero.                                  (ROUND_UP)
       */
      RM        = 1,                            // 0, 1, 2 or 3

      // The maximum value of DP and Big.DP.
      MAX_DP    = 1E6,                      // 0 to 1000000

      // The maximum magnitude of the exponent argument to the pow method.
      MAX_POWER = 1E6,                   // 1 to 1000000

      /*
       * The exponent value at and beneath which toString returns exponential
       * notation.
       * JavaScript's Number type: -7
       * -1000000 is the minimum recommended exponent value of a Big.
       */
      E_NEG     = -7,                   // 0 to -1000000

      /*
       * The exponent value at and above which toString returns exponential
       * notation.
       * JavaScript's Number type: 21
       * 1000000 is the maximum recommended exponent value of a Big.
       * (This limit is not enforced or checked.)
       */
      E_POS     = 21,                   // 0 to 1000000

      /******************************************************************************/

      // The shared prototype object.
      P         = {},
      isValid   = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
      Big;


  /*
   * Create and return a Big constructor.
   *
   */
  function bigFactory() {

    /*
     * The Big constructor and exported function.
     * Create and return a new instance of a Big number object.
     *
     * n {number|string|Big} A numeric value.
     */
    function Big(n) {
      var x = this;

      // Enable constructor usage without new.
      if (!(x instanceof Big)) {
        return n === void 0 ? bigFactory() : new Big(n);
      }

      // Duplicate.
      if (n instanceof Big) {
        x.s = n.s;
        x.e = n.e;
        x.c = n.c.slice();
      } else {
        parse(x, n);
      }

      /*
       * Retain a reference to this Big constructor, and shadow
       * Big.prototype.constructor which points to Object.
       */
      x.constructor = Big;
    }

    Big.prototype = P;
    Big.DP        = DP;
    Big.RM        = RM;
    Big.E_NEG     = E_NEG;
    Big.E_POS     = E_POS;

    return Big;
  }


  // Private functions


  /*
   * Return a string representing the value of Big x in normal or exponential
   * notation to dp fixed decimal places or significant digits.
   *
   * x {Big} The Big to format.
   * dp {number} Integer, 0 to MAX_DP inclusive.
   * toE {number} 1 (toExponential), 2 (toPrecision) or undefined (toFixed).
   */
  function format(x, dp, toE) {
    var Big = x.constructor,

        // The index (normal notation) of the digit that may be rounded up.
        i   = dp - (x = new Big(x)).e,
        c   = x.c;

    // Round?
    if (c.length > ++dp) {
      rnd(x, i, Big.RM);
    }

    if (!c[0]) {
      ++i;
    } else if (toE) {
      i = dp;

      // toFixed
    } else {
      c = x.c;

      // Recalculate i as x.e may have changed if value rounded up.
      i = x.e + i + 1;
    }

    // Append zeros?
    for (; c.length < i; c.push(0)) {
    }
    i = x.e;

    /*
     * toPrecision returns exponential notation if the number of
     * significant digits specified is less than the number of digits
     * necessary to represent the integer part of the value in normal
     * notation.
     */
    return toE === 1 || toE && (dp <= i || i <= Big.E_NEG) ?

      // Exponential notation.
      (x.s < 0 && c[0] ? '-' : '') +
      (c.length > 1 ? c[0] + '.' + c.join('').slice(1) : c[0]) +
      (i < 0 ? 'e' : 'e+') + i

      // Normal notation.
      : x.toString();
  }


  /*
   * Parse the number or string value passed to a Big constructor.
   *
   * x {Big} A Big number instance.
   * n {number|string} A numeric value.
   */
  function parse(x, n) {
    var e, i, nL;

    // Minus zero?
    if (n === 0 && 1 / n < 0) {
      n = '-0';

      // Ensure n is string and check validity.
    } else if (!isValid.test(n += '')) {
      throwErr(NaN);
    }

    // Determine sign.
    x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;

    // Decimal point?
    if ((e = n.indexOf('.')) > -1) {
      n = n.replace('.', '');
    }

    // Exponential form?
    if ((i = n.search(/e/i)) > 0) {

      // Determine exponent.
      if (e < 0) {
        e = i;
      }
      e += +n.slice(i + 1);
      n = n.substring(0, i);

    } else if (e < 0) {

      // Integer.
      e = n.length;
    }

    // Determine leading zeros.
    for (i = 0; n.charAt(i) == '0'; i++) {
    }

    if (i == (nL = n.length)) {

      // Zero.
      x.c = [x.e = 0];
    } else {

      // Determine trailing zeros.
      for (; n.charAt(--nL) == '0';) {
      }

      x.e = e - i - 1;
      x.c = [];

      // Convert string to array of digits without leading/trailing zeros.
      for (e = 0; i <= nL; x.c[e++] = +n.charAt(i++)) {
      }
    }

    return x;
  }


  /*
   * Round Big x to a maximum of dp decimal places using rounding mode rm.
   * Called by div, sqrt and round.
   *
   * x {Big} The Big to round.
   * dp {number} Integer, 0 to MAX_DP inclusive.
   * rm {number} 0, 1, 2 or 3 (DOWN, HALF_UP, HALF_EVEN, UP)
   * [more] {boolean} Whether the result of division was truncated.
   */
  function rnd(x, dp, rm, more) {
    var u,
        xc = x.c,
        i  = x.e + dp + 1;

    if (rm === 1) {

      // xc[i] is the digit after the digit that may be rounded up.
      more = xc[i] >= 5;
    } else if (rm === 2) {
      more = xc[i] > 5 || xc[i] == 5 &&
        (more || i < 0 || xc[i + 1] !== u || xc[i - 1] & 1);
    } else if (rm === 3) {
      more = more || xc[i] !== u || i < 0;
    } else {
      more = false;

      if (rm !== 0) {
        throwErr('!Big.RM!');
      }
    }

    if (i < 1 || !xc[0]) {

      if (more) {

        // 1, 0.1, 0.01, 0.001, 0.0001 etc.
        x.e = -dp;
        x.c = [1];
      } else {

        // Zero.
        x.c = [x.e = 0];
      }
    } else {

      // Remove any digits after the required decimal places.
      xc.length = i--;

      // Round up?
      if (more) {

        // Rounding up may mean the previous digit has to be rounded up.
        for (; ++xc[i] > 9;) {
          xc[i] = 0;

          if (!i--) {
            ++x.e;
            xc.unshift(1);
          }
        }
      }

      // Remove trailing zeros.
      for (i = xc.length; !xc[--i]; xc.pop()) {
      }
    }

    return x;
  }


  /*
   * Throw a BigError.
   *
   * message {string} The error message.
   */
  function throwErr(message) {
    var err  = new Error(message);
    err.name = 'BigError';

    throw err;
  }


  // Prototype/instance methods


  /*
   * Return a new Big whose value is the absolute value of this Big.
   */
  P.abs = function () {
    var x = new this.constructor(this);
    x.s   = 1;

    return x;
  };


  /*
   * Return
   * 1 if the value of this Big is greater than the value of Big y,
   * -1 if the value of this Big is less than the value of Big y, or
   * 0 if they have the same value.
   */
  P.cmp = function (y) {
    var xNeg,
        x  = this,
        xc = x.c,
        yc = (y = new x.constructor(y)).c,
        i = x.s,
        j = y.s,
        k = x.e,
        l = y.e;

    // Either zero?
    if (!xc[0] || !yc[0]) {
      return !xc[0] ? !yc[0] ? 0 : -j : i;
    }

    // Signs differ?
    if (i != j) {
      return i;
    }
    xNeg = i < 0;

    // Compare exponents.
    if (k != l) {
      return k > l ^ xNeg ? 1 : -1;
    }

    i = -1;
    j = (k = xc.length) < (l = yc.length) ? k : l;

    // Compare digit by digit.
    for (; ++i < j;) {

      if (xc[i] != yc[i]) {
        return xc[i] > yc[i] ^ xNeg ? 1 : -1;
      }
    }

    // Compare lengths.
    return k == l ? 0 : k > l ^ xNeg ? 1 : -1;
  };


  /*
   * Return a new Big whose value is the value of this Big divided by the
   * value of Big y, rounded, if necessary, to a maximum of Big.DP decimal
   * places using rounding mode Big.RM.
   */
  P.div = function (y) {
    var x   = this,
        Big = x.constructor,
        // dividend
        dvd = x.c,
        //divisor
        dvs = (y = new Big(y)).c,
        s  = x.s == y.s ? 1 : -1,
        dp = Big.DP;

    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throwErr('!Big.DP!');
    }

    // Either 0?
    if (!dvd[0] || !dvs[0]) {

      // If both are 0, throw NaN
      if (dvd[0] == dvs[0]) {
        throwErr(NaN);
      }

      // If dvs is 0, throw +-Infinity.
      if (!dvs[0]) {
        throwErr(s / 0);
      }

      // dvd is 0, return +-0.
      return new Big(s * 0);
    }

    var dvsL, dvsT, next, cmp, remI, u,
        dvsZ = dvs.slice(),
        dvdI = dvsL = dvs.length,
        dvdL = dvd.length,
        // remainder
        rem  = dvd.slice(0, dvsL),
        remL = rem.length,
        // quotient
        q    = y,
        qc   = q.c = [],
        qi     = 0,
        digits = dp + (q.e = x.e - y.e) + 1;

    q.s = s;
    s   = digits < 0 ? 0 : digits;

    // Create version of divisor with leading zero.
    dvsZ.unshift(0);

    // Add zeros to make remainder as long as divisor.
    for (; remL++ < dvsL; rem.push(0)) {
    }

    do {

      // 'next' is how many times the divisor goes into current remainder.
      for (next = 0; next < 10; next++) {

        // Compare divisor and remainder.
        if (dvsL != (remL = rem.length)) {
          cmp = dvsL > remL ? 1 : -1;
        } else {

          for (remI = -1, cmp = 0; ++remI < dvsL;) {

            if (dvs[remI] != rem[remI]) {
              cmp = dvs[remI] > rem[remI] ? 1 : -1;
              break;
            }
          }
        }

        // If divisor < remainder, subtract divisor from remainder.
        if (cmp < 0) {

          // Remainder can't be more than 1 digit longer than divisor.
          // Equalise lengths using divisor with extra leading zero?
          for (dvsT = remL == dvsL ? dvs : dvsZ; remL;) {

            if (rem[--remL] < dvsT[remL]) {
              remI = remL;

              for (; remI && !rem[--remI]; rem[remI] = 9) {
              }
              --rem[remI];
              rem[remL] += 10;
            }
            rem[remL] -= dvsT[remL];
          }
          for (; !rem[0]; rem.shift()) {
          }
        } else {
          break;
        }
      }

      // Add the 'next' digit to the result array.
      qc[qi++] = cmp ? next : ++next;

      // Update the remainder.
      if (rem[0] && cmp) {
        rem[remL] = dvd[dvdI] || 0;
      } else {
        rem = [dvd[dvdI]];
      }

    } while ((dvdI++ < dvdL || rem[0] !== u) && s--);

    // Leading zero? Do not remove if result is simply zero (qi == 1).
    if (!qc[0] && qi != 1) {

      // There can't be more than one zero.
      qc.shift();
      q.e--;
    }

    // Round?
    if (qi > digits) {
      rnd(q, dp, Big.RM, rem[0] !== u);
    }

    return q;
  };


  /*
   * Return true if the value of this Big is equal to the value of Big y,
   * otherwise returns false.
   */
  P.eq = function (y) {
    return !this.cmp(y);
  };


  /*
   * Return true if the value of this Big is greater than the value of Big y,
   * otherwise returns false.
   */
  P.gt = function (y) {
    return this.cmp(y) > 0;
  };


  /*
   * Return true if the value of this Big is greater than or equal to the
   * value of Big y, otherwise returns false.
   */
  P.gte = function (y) {
    return this.cmp(y) > -1;
  };


  /*
   * Return true if the value of this Big is less than the value of Big y,
   * otherwise returns false.
   */
  P.lt = function (y) {
    return this.cmp(y) < 0;
  };


  /*
   * Return true if the value of this Big is less than or equal to the value
   * of Big y, otherwise returns false.
   */
  P.lte = function (y) {
    return this.cmp(y) < 1;
  };


  /*
   * Return a new Big whose value is the value of this Big minus the value
   * of Big y.
   */
  P.sub = P.minus = function (y) {
    var i, j, t, xLTy,
        x   = this,
        Big = x.constructor,
        a   = x.s,
        b   = (y = new Big(y)).s;

    // Signs differ?
    if (a != b) {
      y.s = -b;
      return x.plus(y);
    }

    var xc = x.c.slice(),
        xe = x.e,
        yc = y.c,
        ye = y.e;

    // Either zero?
    if (!xc[0] || !yc[0]) {

      // y is non-zero? x is non-zero? Or both are zero.
      return yc[0] ? (y.s = -b, y) : new Big(xc[0] ? x : 0);
    }

    // Determine which is the bigger number.
    // Prepend zeros to equalise exponents.
    if (a = xe - ye) {

      if (xLTy = a < 0) {
        a = -a;
        t = xc;
      } else {
        ye = xe;
        t  = yc;
      }

      t.reverse();
      for (b = a; b--; t.push(0)) {
      }
      t.reverse();
    } else {

      // Exponents equal. Check digit by digit.
      j = ((xLTy = xc.length < yc.length) ? xc : yc).length;

      for (a = b = 0; b < j; b++) {

        if (xc[b] != yc[b]) {
          xLTy = xc[b] < yc[b];
          break;
        }
      }
    }

    // x < y? Point xc to the array of the bigger number.
    if (xLTy) {
      t   = xc;
      xc  = yc;
      yc  = t;
      y.s = -y.s;
    }

    /*
     * Append zeros to xc if shorter. No need to add zeros to yc if shorter
     * as subtraction only needs to start at yc.length.
     */
    if (( b = (j = yc.length) - (i = xc.length) ) > 0) {

      for (; b--; xc[i++] = 0) {
      }
    }

    // Subtract yc from xc.
    for (b = i; j > a;) {

      if (xc[--j] < yc[j]) {

        for (i = j; i && !xc[--i]; xc[i] = 9) {
        }
        --xc[i];
        xc[j] += 10;
      }
      xc[j] -= yc[j];
    }

    // Remove trailing zeros.
    for (; xc[--b] === 0; xc.pop()) {
    }

    // Remove leading zeros and adjust exponent accordingly.
    for (; xc[0] === 0;) {
      xc.shift();
      --ye;
    }

    if (!xc[0]) {

      // n - n = +0
      y.s = 1;

      // Result must be zero.
      xc = [ye = 0];
    }

    y.c = xc;
    y.e = ye;

    return y;
  };


  /*
   * Return a new Big whose value is the value of this Big modulo the
   * value of Big y.
   */
  P.mod = function (y) {
    var yGTx,
        x   = this,
        Big = x.constructor,
        a   = x.s,
        b   = (y = new Big(y)).s;

    if (!y.c[0]) {
      throwErr(NaN);
    }

    x.s = y.s = 1;
    yGTx = y.cmp(x) == 1;
    x.s  = a;
    y.s  = b;

    if (yGTx) {
      return new Big(x);
    }

    a      = Big.DP;
    b      = Big.RM;
    Big.DP = Big.RM = 0;
    x      = x.div(y);
    Big.DP = a;
    Big.RM = b;

    return this.minus(x.times(y));
  };


  /*
   * Return a new Big whose value is the value of this Big plus the value
   * of Big y.
   */
  P.add = P.plus = function (y) {
    var t,
        x   = this,
        Big = x.constructor,
        a   = x.s,
        b   = (y = new Big(y)).s;

    // Signs differ?
    if (a != b) {
      y.s = -b;
      return x.minus(y);
    }

    var xe = x.e,
        xc = x.c,
        ye = y.e,
        yc = y.c;

    // Either zero?
    if (!xc[0] || !yc[0]) {

      // y is non-zero? x is non-zero? Or both are zero.
      return yc[0] ? y : new Big(xc[0] ? x : a * 0);
    }
    xc = xc.slice();

    // Prepend zeros to equalise exponents.
    // Note: Faster to use reverse then do unshifts.
    if (a = xe - ye) {

      if (a > 0) {
        ye = xe;
        t  = yc;
      } else {
        a = -a;
        t = xc;
      }

      t.reverse();
      for (; a--; t.push(0)) {
      }
      t.reverse();
    }

    // Point xc to the longer array.
    if (xc.length - yc.length < 0) {
      t  = yc;
      yc = xc;
      xc = t;
    }
    a = yc.length;

    /*
     * Only start adding at yc.length - 1 as the further digits of xc can be
     * left as they are.
     */
    for (b = 0; a;) {
      b = (xc[--a] = xc[a] + yc[a] + b) / 10 | 0;
      xc[a] %= 10;
    }

    // No need to check for zero, as +x + +y != 0 && -x + -y != 0

    if (b) {
      xc.unshift(b);
      ++ye;
    }

    // Remove trailing zeros.
    for (a = xc.length; xc[--a] === 0; xc.pop()) {
    }

    y.c = xc;
    y.e = ye;

    return y;
  };


  /*
   * Return a Big whose value is the value of this Big raised to the power n.
   * If n is negative, round, if necessary, to a maximum of Big.DP decimal
   * places using rounding mode Big.RM.
   *
   * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
   */
  P.pow = function (n) {
    var x     = this,
        one   = new x.constructor(1),
        y     = one,
        isNeg = n < 0;

    if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) {
      throwErr('!pow!');
    }

    n = isNeg ? -n : n;

    for (; ;) {

      if (n & 1) {
        y = y.times(x);
      }
      n >>= 1;

      if (!n) {
        break;
      }
      x = x.times(x);
    }

    return isNeg ? one.div(y) : y;
  };


  /*
   * Return a new Big whose value is the value of this Big rounded to a
   * maximum of dp decimal places using rounding mode rm.
   * If dp is not specified, round to 0 decimal places.
   * If rm is not specified, use Big.RM.
   *
   * [dp] {number} Integer, 0 to MAX_DP inclusive.
   * [rm] 0, 1, 2 or 3 (ROUND_DOWN, ROUND_HALF_UP, ROUND_HALF_EVEN, ROUND_UP)
   */
  P.round = function (dp, rm) {
    var x   = this,
        Big = x.constructor;

    if (dp == null) {
      dp = 0;
    } else if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throwErr('!round!');
    }
    rnd(x = new Big(x), dp, rm == null ? Big.RM : rm);

    return x;
  };


  /*
   * Return a new Big whose value is the square root of the value of this Big,
   * rounded, if necessary, to a maximum of Big.DP decimal places using
   * rounding mode Big.RM.
   */
  P.sqrt = function () {
    var estimate, r, approx,
        x    = this,
        Big  = x.constructor,
        xc   = x.c,
        i    = x.s,
        e    = x.e,
        half = new Big('0.5');

    // Zero?
    if (!xc[0]) {
      return new Big(x);
    }

    // If negative, throw NaN.
    if (i < 0) {
      throwErr(NaN);
    }

    // Estimate.
    i = Math.sqrt(x.toString());

    // Math.sqrt underflow/overflow?
    // Pass x to Math.sqrt as integer, then adjust the result exponent.
    if (i === 0 || i === 1 / 0) {
      estimate = xc.join('');

      if (!(estimate.length + e & 1)) {
        estimate += '0';
      }

      r   = new Big(Math.sqrt(estimate).toString());
      r.e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
    } else {
      r = new Big(i.toString());
    }

    i = r.e + (Big.DP += 4);

    // Newton-Raphson iteration.
    do {
      approx = r;
      r      = half.times(approx.plus(x.div(approx)));
    } while (approx.c.slice(0, i).join('') !==
    r.c.slice(0, i).join(''));

    rnd(r, Big.DP -= 4, Big.RM);

    return r;
  };


  /*
   * Return a new Big whose value is the value of this Big times the value of
   * Big y.
   */
  P.mul = P.times = function (y) {
    var c,
        x   = this,
        Big = x.constructor,
        xc  = x.c,
        yc  = (y = new Big(y)).c,
        a = xc.length,
        b = yc.length,
        i = x.e,
        j = y.e;

    // Determine sign of result.
    y.s = x.s == y.s ? 1 : -1;

    // Return signed 0 if either 0.
    if (!xc[0] || !yc[0]) {
      return new Big(y.s * 0);
    }

    // Initialise exponent of result as x.e + y.e.
    y.e = i + j;

    // If array xc has fewer digits than yc, swap xc and yc, and lengths.
    if (a < b) {
      c  = xc;
      xc = yc;
      yc = c;
      j  = a;
      a  = b;
      b  = j;
    }

    // Initialise coefficient array of result with zeros.
    for (c = new Array(j = a + b); j--; c[j] = 0) {
    }

    // Multiply.

    // i is initially xc.length.
    for (i = b; i--;) {
      b = 0;

      // a is yc.length.
      for (j = a + i; j > i;) {

        // Current sum of products at this digit position, plus carry.
        b      = c[j] + yc[i] * xc[j - i - 1] + b;
        c[j--] = b % 10;

        // carry
        b = b / 10 | 0;
      }
      c[j] = (c[j] + b) % 10;
    }

    // Increment result exponent if there is a final carry.
    if (b) {
      ++y.e;
    }

    // Remove any leading zero.
    if (!c[0]) {
      c.shift();
    }

    // Remove trailing zeros.
    for (i = c.length; !c[--i]; c.pop()) {
    }
    y.c = c;

    return y;
  };


  /*
   * Return a string representing the value of this Big.
   * Return exponential notation if this Big has a positive exponent equal to
   * or greater than Big.E_POS, or a negative exponent equal to or less than
   * Big.E_NEG.
   */
  P.toString = P.valueOf = P.toJSON = function () {
    var x    = this,
        Big  = x.constructor,
        e    = x.e,
        str  = x.c.join(''),
        strL = str.length;

    // Exponential notation?
    if (e <= Big.E_NEG || e >= Big.E_POS) {
      str = str.charAt(0) + (strL > 1 ? '.' + str.slice(1) : '') +
        (e < 0 ? 'e' : 'e+') + e;

      // Negative exponent?
    } else if (e < 0) {

      // Prepend zeros.
      for (; ++e; str = '0' + str) {
      }
      str = '0.' + str;

      // Positive exponent?
    } else if (e > 0) {

      if (++e > strL) {

        // Append zeros.
        for (e -= strL; e--; str += '0') {
        }
      } else if (e < strL) {
        str = str.slice(0, e) + '.' + str.slice(e);
      }

      // Exponent zero.
    } else if (strL > 1) {
      str = str.charAt(0) + '.' + str.slice(1);
    }

    // Avoid '-0'
    return x.s < 0 && x.c[0] ? '-' + str : str;
  };


  /*
   ***************************************************************************
   * If toExponential, toFixed, toPrecision and format are not required they
   * can safely be commented-out or deleted. No redundant code will be left.
   * format is used only by toExponential, toFixed and toPrecision.
   ***************************************************************************
   */


  /*
   * Return a string representing the value of this Big in exponential
   * notation to dp fixed decimal places and rounded, if necessary, using
   * Big.RM.
   *
   * [dp] {number} Integer, 0 to MAX_DP inclusive.
   */
  P.toExponential = function (dp) {

    if (dp == null) {
      dp = this.c.length - 1;
    } else if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throwErr('!toExp!');
    }

    return format(this, dp, 1);
  };


  /*
   * Return a string representing the value of this Big in normal notation
   * to dp fixed decimal places and rounded, if necessary, using Big.RM.
   *
   * [dp] {number} Integer, 0 to MAX_DP inclusive.
   */
  P.toFixed = function (dp) {
    var str,
        x   = this,
        Big = x.constructor,
        neg = Big.E_NEG,
        pos = Big.E_POS;

    // Prevent the possibility of exponential notation.
    Big.E_NEG = -(Big.E_POS = 1 / 0);

    if (dp == null) {
      str = x.toString();
    } else if (dp === ~~dp && dp >= 0 && dp <= MAX_DP) {
      str = format(x, x.e + dp);

      // (-0).toFixed() is '0', but (-0.1).toFixed() is '-0'.
      // (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
      if (x.s < 0 && x.c[0] && str.indexOf('-') < 0) {
        //E.g. -0.5 if rounded to -0 will cause toString to omit the minus sign.
        str = '-' + str;
      }
    }
    Big.E_NEG = neg;
    Big.E_POS = pos;

    if (!str) {
      throwErr('!toFix!');
    }

    return str;
  };


  /*
   * Return a string representing the value of this Big rounded to sd
   * significant digits using Big.RM. Use exponential notation if sd is less
   * than the number of digits necessary to represent the integer part of the
   * value in normal notation.
   *
   * sd {number} Integer, 1 to MAX_DP inclusive.
   */
  P.toPrecision = function (sd) {

    if (sd == null) {
      return this.toString();
    } else if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
      throwErr('!toPre!');
    }

    return format(this, sd - 1, 2);
  };


  // Export


  Big = bigFactory();

  //AMD.
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return Big;
    });

    // Node and other CommonJS-like environments that support module.exports.
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Big;

    //Browser.
  } else {
    global.Big = Big;
  }
})(this);

RunningLeeUrl = {
  target: document.createElement('a'),
  params: {},
  query : null,
  url   : null,
  parse : function (url) {
    var split        = null;
    this.url         = url || window.location.href;
    this.target.href = this.url;
    this.query       = this.target.search.replace(/^\?/, '').split('&');
    for (var i = 0; i < this.query.length; i++) {
      split                 = this.query[i].split('=');
      this.params[split[0]] = split[1];
    }
    return {
      protocol: this.target.protocol,
      host    : this.target.host,
      hostname: this.target.hostname,
      port    : this.target.port,
      pathname: this.target.pathname,
      search  : this.target.search,
      params  : this.params,
      hash    : this.target.hash
    }
  }
};
