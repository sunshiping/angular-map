angular.module('weui', [])
    .factory('toast', function ($rootScope, $http, $templateCache, $compile) {

        var templateElement;

        function toast(args){
            var scope = $rootScope.$new();

            $http.get('weui_loading_toast.html', { cache: $templateCache }).success(function(template){

                templateElement = $compile(template)(scope);

                angular.element(document.body).append(templateElement);
            });
        }

        toast.close = function(){
            if(templateElement){
                templateElement.remove();
            }
        };

        return toast;
    });

angular.module('weui').run(['$templateCache', function ($templateCache) {

    $templateCache.put('weui_toast.html',
        '<div class="weui_mask_transparent"></div>' +
        '<div class="weui_toast">' +
            '<i class="weui_icon_toast"></i>' +
            '<p class="weui_toast_content">已完成</p>' +
        '</div>'
    );

    $templateCache.put('weui_loading_toast.html',
        '<div class="weui_loading_toast">'+
            '<div class="weui_mask_transparent"></div>' +
            '<div class="weui_toast">' +
                '<div class="weui_loading"> ' +
                    '<div class="weui_loading_leaf weui_loading_leaf_0"></div>' +
                    '<div class="weui_loading_leaf weui_loading_leaf_1"></div> ' +
                    '<div class="weui_loading_leaf weui_loading_leaf_2"></div> ' +
                    '<div class="weui_loading_leaf weui_loading_leaf_3"></div> ' +
                    '<div class="weui_loading_leaf weui_loading_leaf_4"></div> ' +
                    '<div class="weui_loading_leaf weui_loading_leaf_5"></div> ' +
                    '<div class="weui_loading_leaf weui_loading_leaf_6"></div> ' +
                    '<div class="weui_loading_leaf weui_loading_leaf_7"></div> ' +
                    '<div class="weui_loading_leaf weui_loading_leaf_8"></div> ' +
                    '<div class="weui_loading_leaf weui_loading_leaf_9"></div> ' +
                    '<div class="weui_loading_leaf weui_loading_leaf_10"></div> ' +
                    '<div class="weui_loading_leaf weui_loading_leaf_11"></div> ' +
                '</div> ' +
                '<p class="weui_toast_content">数据加载中</p>' +
            '</div>' +
        '</div>'
    );
}]);