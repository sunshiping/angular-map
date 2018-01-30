angular.module('ErpApp', [
  'ngTouch',
  'angucomplete',
  'ngSanitize',
  'angular-ladda',
  'angular-click-outside',
  'bw.paging',
  'ui.select',
  'daterangepicker',
  'datePicker',
  'summernote',
  'ngclipboard',
  'ngJsTree',
  'ngFileUpload',
  'ui.bootstrap',
  'ngTablescroll',
  'ui.grid',
  'ui.grid.pagination',
  'ui.grid.selection',
  'ui.grid.pinning',
  'ui.grid.exporter',
	'ui.bootstrap.datetimepicker',
	'daterangepicker',
  'fangxin.factory',
  'fangxin.filter',
  'fangxin.directive',
  'fangxin.service'
]).run(function ($rootScope, i18nService) {
  i18nService.setCurrentLang('zh-cn');
  $rootScope.gov = {
    city       : document.body.getAttribute('data-city'),
    province_id: Number(document.body.getAttribute('data-province_id')),
    city_id    : Number(document.body.getAttribute('data-city_id'))
  }
});

function associate_errors(errors, $submitForm) {
  $submitForm.find('.form-group').removeClass('has-errors').find('.help-text').text('');
  $.each(errors, function (index, value) {
    var $group = $submitForm.find('#' + index + '-group');
    $group.addClass('has-error').find('.help-block').text(value);
  });
}

$(function () {
	$.loading.resize();
});

$(window).on('resize', function (e) {
	$.loading.resize();
	$.loading.drag();
});

$.loading = {
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
			grid.height(page_height - 200);
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

Message = {
  success: function (msg) {
    return toastr.success(msg, '操作成功', {
      progressBar  : true,
      positionClass: 'toast-top-center',
      closeButton  : true
    });
  },
  warning: function (msg) {
    return toastr.warning(msg, '提示', {
      progressBar  : true,
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
        // 显示 has-errors
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
      progressBar  : true,
      positionClass: 'toast-top-center',
      closeButton  : true
    });
  }
};

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
        swal('删除成功', '', "success");
      }, function (error) {
        if ($.isFunction(FailCallback)) {
          FailCallback(error)
        }
        swal('删除失败', error.data.message, "error");
      });
    });
  },
  approve: function (options, successCallback, FailCallback) {
    swal({
      title              : options.title || '确定要审核吗?',
      text               : options.text || '审核后,该条纪录状态不可恢复,请谨慎操作',
      type               : "info",
      confirmButtonColor : "#DD6B55",
      confirmButtonText  : "审核!",
      cancelButtonText   : "取消",
      showCancelButton   : true,
      closeOnConfirm     : false,
      showLoaderOnConfirm: true
    }, function () {
      options.http.put(options.url, options.data || {}).then(function (result) {
        if ($.isFunction(successCallback)) {
          successCallback(result)
        }
        swal('审核成功', '', "success");
      }, function (error) {
        if ($.isFunction(FailCallback)) {
          FailCallback(error)
        }
        swal('审核失败', error.data.message, "error");
      });
    });
  },
  top    : function (options, successCallback, FailCallback) {
    swal({
      title              : options.title || '确定要置顶吗?',
      text               : options.text || '置顶后,该条纪录状态不可恢复,请谨慎操作',
      type               : "warning",
      confirmButtonColor : "#DD6B55",
      confirmButtonText  : "置顶!",
      cancelButtonText   : "取消",
      showCancelButton   : true,
      closeOnConfirm     : false,
      showLoaderOnConfirm: true
    }, function () {
      options.http.put(options.url, options.data || {}).then(function (result) {
        if ($.isFunction(successCallback)) {
          successCallback(result)
        }
        swal('置顶成功', '', "success");
      }, function (error) {
        if ($.isFunction(FailCallback)) {
          FailCallback(error)
        }
        swal('置顶失败', error.data.message, "error");
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