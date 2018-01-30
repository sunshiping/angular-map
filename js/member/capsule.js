angular.module('App').directive('cocoDropDown',function () {
    return{
        restrict:'A',
        scope:{
            ngModel:"=",
            ngModelF:"=",
            ngModelT:"=",
            sourceData:"=",
            btnSize:'=',
            btnMsg:'@',
            btnMsgUnit:'@',
            btnFlag:'=',
            btnFlagMark:'@',
            triggerEvent:'@',

            btnObjDeep:"=",
            nonLack:"@"
        },
        templateUrl:'/coco-drop-down',
        // controller: function($scope){
        //     $scope.btnFlag = false;
        //     $scope.toggleDropDownPanelNarrowD = function () {
        //         $scope.btnFlag = !$scope.btnFlag;
        //     };
        //     $scope.hideDropDownPanelNarrowD = function () {
        //         $scope.btnFlag = false;
        //     };
        //
        // },
        link:function (scope,elem,attrs) {
            scope.nonLackFlag = false;
            if(scope.nonLack == 'true'){
                scope.nonLackFlag = true;
            }
            //scope.btnFlag = false;
            scope.toggleDropDownPanelNarrowD = function () {
                scope.btnFlag = !scope.btnFlag;
                scope.$emit(scope.triggerEvent,{
                    btnFlag:scope.btnFlag,
                    btnFlagMark:scope.btnFlagMark
                });
            };
            scope.hideDropDownPanelNarrowD = function () {
                scope.btnFlag = false;
            };
            /**********/
            scope.selectRangeFrom = function($index){

                scope.ngModel.f = scope.sourceData['from'][$index];
                scope.sourceData['to'] = scope.makeRange([],scope.ngModel.f, scope.sourceData['from'].length,scope.sourceData['from']);

            }
            scope.selectRangeTo = function($index){
                scope.ngModel.t =  scope.sourceData['to'][$index];
                /****/
                scope.btnFlag = false;
            }
            scope.makeRange = function (input, minVal, max, fromArr) {
                if (fromArr) {
                    var min = fromArr.indexOf(minVal);
                    min = parseInt(min) + 1;
                    max = parseInt(max);
                    for (var i = min; i < max; i++) {
                        input.push(fromArr[i]);
                    }
                    return input;
                }
            }
        }
    }
}).directive('cocoDropDownMulti',function () {
    return{
        restrict:'A',
        scope:{
            ngModel:"=",
            coloringItem:"=",
            sourceData:"=",
            btnSize:'=',
            panSize:'=',
            btnMsg:'@',
            btnFlag:'=',
            btnFlagMark:'@',
            triggerEvent:'@',
            nonLack:"@"
        },
        templateUrl:'/coco-drop-down-multi',
        link:function (scope,elem,attrs) {
            scope.nonLackFlag = false;
            if(scope.nonLack == 'true'){
                scope.nonLackFlag = true;
            }
            scope.btnFlag = false;

            scope.toggleDropDownPanelNarrowD = function () {
                scope.btnFlag = !scope.btnFlag;
                scope.$emit(scope.triggerEvent,{
                    btnFlag:scope.btnFlag,
                    btnFlagMark:scope.btnFlagMark
                });
            };
            scope.hideDropDownPanelNarrowD = function () {
                scope.btnFlag = false;
            };
            /**********/
            //scope.coloringItem = [];

            scope.selectMultiItems = function($index){

                var indexInColor = scope.coloringItem.indexOf($index);

                var item = scope.sourceData[$index];
                var indexInMultiArr = scope.ngModel.indexOf(item);
                if(indexInMultiArr !== -1){
                    scope.ngModel.splice(indexInMultiArr, 1);
                    scope.coloringItem.splice(indexInColor, 1);
                }else{
                    scope.ngModel.push(item);
                    scope.coloringItem.push($index);
                }

            }


            scope.selectAll = function () {
                scope.ngModel = angular.copy(scope.sourceData);
                /*****/
                var theTotalIndex =  scope.sourceData.length;
                console.log(theTotalIndex);
                for(var i = 0;i < theTotalIndex; i++){
                    scope.coloringItem.push(i);
                }
            }
            scope.selectNone = function () {
                scope.ngModel = [];
                scope.coloringItem = [];
            }
        }
    }
}).directive('cocoDropDownMultiNest',['$http',function ($http) {
    return{
        restrict:'A',
        scope:{
            ngModel:"=",
            ngModelSub:"=",
            ngModelEnd:"=",
            sourceData:"=",
            btnSize:'=',
            panSize:'=',
            btnMsg:'=',
            coloringItems:'=',
            btnFlag:'=',
            btnFlagMark:'@',
            triggerEvent:'@',
            nonLack:"@"
        },
        templateUrl:'/coco-drop-down-multi-nest',
        link:function (scope,elem,attrs) {
            //console.log(scope.nonLack);
            scope.nonLackFlag = false;
            if(scope.nonLack == 'true'){
                scope.nonLackFlag = true;
            }

            //console.log(scope.sourceData);
            scope.btnFlag = false;

            scope.toggleDropDownPanelNarrowD = function () {
                scope.btnFlag = !scope.btnFlag;
                scope.$emit(scope.triggerEvent,{
                    btnFlag:scope.btnFlag,
                    btnFlagMark:scope.btnFlagMark
                });
            };
            scope.hideDropDownPanelNarrowD = function () {
                scope.btnFlag = false;
            };
            /************/
            scope.ngModelObj = [];
            scope.ngModelObjSub = [];
            scope.ngModelObjEnd = [];
            /**********/
            scope.coloringItem = [];
            scope.coloringItemSub = [];
            scope.coloringItemEnd = [];

            scope.selectMultiItems = function($index){

                var indexInColor = scope.coloringItem.indexOf($index);

                var item = scope.sourceData[$index];

                var indexInMultiArr = scope.ngModel.indexOf(item.id);
                var indexInMultiOBJArr = scope.ngModelObj.indexOf(item);
                if(indexInMultiArr !== -1){
                    scope.ngModel.splice(indexInMultiArr, 1);
                    scope.ngModelObj.splice(indexInMultiOBJArr, 1);
                    scope.coloringItem.splice(indexInColor, 1);
                }else{
                    scope.ngModel.push(item.id);
                    scope.ngModelObj.push(item);
                    scope.coloringItem.push($index);
                }

                var district_ids_arr = scope.ngModel;
                console.log(district_ids_arr);
                if (district_ids_arr.length > 0) {
                    scope.sourceDataSub = [];
                    angular.forEach(district_ids_arr, function (value, key) {
                        $http.get('/api/common/business/' + value).then(function (result) {
                            if (scope.sourceDataSub.length < 1) {
                                console.log('<1');
                                scope.sourceDataSub = result.data;
                            } else {
                                console.log('>1');
                                for (var i = 0; i < result.data.length; i++) {
                                    scope.sourceDataSub.push(result.data[i]);
                                }
                            }
                            console.log(scope.sourceDataSub);
                        });

                    });
                } else {
                    scope.sourceDataSub = [];
                }

            }
            scope.selectMultiItemsSub = function($index){
                var indexInColor = scope.coloringItemSub.indexOf($index);

                var item = scope.sourceDataSub[$index];
                var indexInMultiArr = scope.ngModelSub.indexOf(item.id);
                var indexInMultiOBJArr = scope.ngModelObjSub.indexOf(item);
                if(indexInMultiArr !== -1){
                    scope.ngModelSub.splice(indexInMultiArr, 1);
                    scope.ngModelObjSub.splice(indexInMultiOBJArr, 1);
                    scope.coloringItemSub.splice(indexInColor, 1);
                }else{
                    scope.ngModelSub.push(item.id);
                    scope.ngModelObjSub.push(item);
                    scope.coloringItemSub.push($index);
                }

                var business_ids_arr = scope.ngModelSub;
                console.log(business_ids_arr);
                if (business_ids_arr.length > 0) {
                    scope.sourceDataEnd = [];
                    angular.forEach(business_ids_arr, function (value, key) {
                        $http.get('/api/common/community-business/' + value).then(function (result) {
                            if (scope.sourceDataEnd.length < 1) {
                                console.log('<1');
                                scope.sourceDataEnd = result.data;
                            } else {
                                console.log('>1');
                                for (var i = 0; i < result.data.length; i++) {
                                    scope.sourceDataEnd.push(result.data[i]);
                                }
                            }
                            console.log(scope.sourceDataEnd);
                        });

                    });
                } else {
                    scope.sourceDataEnd = [];
                }


            }
            scope.selectMultiItemsEnd = function($index){
                var indexInColor = scope.coloringItemEnd.indexOf($index);

                var item_end = scope.sourceDataEnd[$index];
                var indexInMultiArr = scope.ngModelEnd.indexOf(item_end.id);
                var indexInMultiOBJArr = scope.ngModelObjEnd.indexOf(item_end);
                if(indexInMultiArr !== -1){
                    scope.ngModelEnd.splice(indexInMultiArr, 1);
                    scope.ngModelObjEnd.splice(indexInMultiOBJArr, 1);
                    scope.coloringItemEnd.splice(indexInColor, 1);
                }else{
                    scope.ngModelEnd.push(item_end.id);
                    scope.ngModelObjEnd.push(item_end);
                    scope.coloringItemEnd.push($index);
                }


            }
        }
    }
}]).directive('cocoDropDownMultiNestKey',['$http',function ($http) {
    return{
        restrict:'A',
        scope:{
            ngModel:"=",
            ngModelSub:"=",
            ngModelEnd:"=",
            ngModelObj:"=",
            ngModelObjSub:"=",
            ngModelObjEnd:"=",
            sourceData:"=",
            sourceDataSub:"=",
            sourceDataEnd:"=",
            btnSize:'=',
            panSize:'=',
            btnMsg:'@',
            btnFlag:'=',
            btnFlagMark:'@',
            triggerEvent:'@'
        },
        templateUrl:'/coco-drop-down-multi-nest-key',
        link:function (scope,elem,attrs) {
            //console.log(scope.sourceData);
            scope.btnFlag = false;

            scope.toggleDropDownPanelNarrowD = function () {
                scope.btnFlag = !scope.btnFlag;
                scope.$emit(scope.triggerEvent,{
                    btnFlag:scope.btnFlag,
                    btnFlagMark:scope.btnFlagMark
                });
            };
            scope.hideDropDownPanelNarrowD = function () {
                scope.btnFlag = false;
            };
            /************/

            scope.selectMultiItems = function(key,val){
                var indexInMultiArr = scope.ngModel.indexOf(key);
                var indexInMultiOBJArr = scope.ngModelObj.indexOf(val);
                if(indexInMultiArr !== -1){
                    scope.ngModel.splice(indexInMultiArr, 1);
                    scope.ngModelObj.splice(indexInMultiOBJArr, 1);
                }else{
                    scope.ngModel.push(key);
                    scope.ngModelObj.push(val);
                }

                var district_ids_arr = scope.ngModel;
                console.log(district_ids_arr);
                if (district_ids_arr.length > 0) {
                    // scope.sourceDataSub = [];
                    angular.forEach(district_ids_arr, function (value, key) {
                        $http.get('/api/common/simple-business/' + value).then(function (result) {
                            if (scope.sourceDataSub.length < 1) {
                                console.log('<1');
                                scope.sourceDataSub = result.data;
                            } else {
                                console.log('>1');
                                angular.forEach(result.data, function (value,key) {
                                    scope.sourceDataSub[key] = value;
                                });

                            }
                            console.log(scope.sourceDataSub);
                        });

                    });
                } else {
                    scope.sourceDataSub = [];
                }

            }
            scope.selectMultiItemsSub = function(key,val){

                var indexInMultiArr = scope.ngModelSub.indexOf(key);
                var indexInMultiOBJArr = scope.ngModelObjSub.indexOf(val);
                if(indexInMultiArr !== -1){
                    scope.ngModelSub.splice(indexInMultiArr, 1);
                    scope.ngModelObjSub.splice(indexInMultiOBJArr, 1);
                }else{
                    scope.ngModelSub.push(key);
                    scope.ngModelObjSub.push(val);
                }
                var business_ids_arr = scope.ngModelSub;

                if (business_ids_arr.length > 0) {
                    // scope.sourceDataEnd = [];
                    angular.forEach(business_ids_arr, function (value, key) {
                        $http.get('/api/common/community-business-simple/' + value).then(function (result) {
                            if (scope.sourceDataEnd.length < 1) {
                                console.log('<1');
                                scope.sourceDataEnd = result.data;
                            } else {
                                console.log('>1');
                                angular.forEach(result.data, function (value,key) {
                                    scope.sourceDataEnd[key] = value;
                                });
                            }
                            console.log(scope.sourceDataEnd);
                        });

                    });
                } else {
                    scope.sourceDataEnd = [];
                }


            }
            scope.selectMultiItemsEnd = function(key,val){
                var indexInMultiArr = scope.ngModelEnd.indexOf(key);
                var indexInMultiOBJArr = scope.ngModelObjEnd.indexOf(val);
                if(indexInMultiArr !== -1){
                    scope.ngModelEnd.splice(indexInMultiArr, 1);
                    scope.ngModelObjEnd.splice(indexInMultiOBJArr, 1);
                }else{
                    scope.ngModelEnd.push(key);
                    scope.ngModelObjEnd.push(val);
                }


            }
        }
    }
}]).directive('cocoDropDownNest',['$http',function ($http) {
    return{
        restrict:'A',
        scope:{
            ngModel:"=",
            ngModelSub:"=",
            ngModelEnd:"=",
            ngModelTail:"=",
            ngModelObj:"=",
            ngModelObjSub:"=",
            ngModelObjEnd:"=",
            ngModelObjTail:"=",
            sourceData:"=",
            btnSize:'=',
            panSize:'=',
            btnMsg:'@',
            btnFlag:'=',
            btnFlagMark:'@',
            triggerEvent:'@'
        },
        templateUrl:'/coco-drop-down-nest',
        link:function (scope,elem,attrs) {
            scope.btnFlag = false;
            scope.toggleDropDownPanelNarrowD = function () {
                scope.btnFlag = !scope.btnFlag;
                scope.$emit(scope.triggerEvent,{
                    btnFlag:scope.btnFlag,
                    btnFlagMark:scope.btnFlagMark
                });
            };
            scope.hideDropDownPanelNarrowD = function () {
                scope.btnFlag = false;
            };
            /************/
            // scope.ngModelObj = {};
            // scope.ngModelObjSub = {};
            // scope.ngModelObjEnd = {};
            // scope.ngModelObjTail = {};
            /**********/
        

            scope.selectItem = function($index){
                var item = scope.sourceData[$index];
                if(scope.ngModel == item.id){
                    scope.ngModel = null;
                    scope.ngModelObj = {};
                    scope.ngModelObjSub = {};
                    scope.ngModelObjEnd = {};
                    scope.ngModelObjTail = {};
                }else{
                    scope.ngModel = item.id;
                    scope.ngModelObj = item;

                    scope.sourceDataSub = [];
                    $http.get('/api/organization/store?company_area_id=' + item.id).then(function (result) {
                        scope.sourceDataSub = result.data;
                        console.log(scope.sourceDataSub);
                    });

                }

            }
            scope.selectItemSub = function($index){
                var item = scope.sourceDataSub[$index];
                if(scope.ngModelSub == item.id){
                    scope.ngModelSub = null;
                    scope.ngModelObjSub = {};
                    scope.ngModelObjEnd = {};
                    scope.ngModelObjTail = {};
                }else{
                    scope.ngModelSub = item.id;
                    scope.ngModelObjSub = item;
                    console.log(scope.ngModelObjSub );
                    scope.sourceDataEnd = [];
                    $http.get('/api/organization/store-group?store_id=' + item.id).then(function (result) {
                        scope.sourceDataEnd = result.data;
                        console.log(scope.sourceDataEnd);
                    });
                }

            }
            scope.selectItemEnd = function($index){
                var item = scope.sourceDataEnd[$index];
                if(scope.ngModelEnd == item.id){
                    scope.ngModelEnd = null;
                    scope.ngModelObjEnd = {};
                    scope.ngModelObjTail = {};
                }else{
                    scope.ngModelEnd = item.id;
                    scope.ngModelObjEnd = item;
                    console.log(scope.ngModelObjEnd );
                    scope.sourceDataTail = [];
                    $http.get('/api/organization/agent?store_group_id=' + item.id).then(function (result) {
                        scope.sourceDataTail = result.data;
                        console.log(scope.sourceDataTail);
                    });
                }


            }
            scope.selectItemTail = function($index){
                var item = scope.sourceDataTail[$index];
                if(scope.ngModelTail == item.id){
                    scope.ngModelTail = null;
                    scope.ngModelObjTail = {};
                }else{
                    scope.ngModelTail = item.id;
                    scope.ngModelObjTail = item;
                    console.log(scope.ngModelObjTail );

                }

            }
        }
    }
}]).directive('cocoDropDownNestAll',['$http',function ($http) {
    return{
        restrict:'A',
        scope:{
            ngModel:"=",
            ngModelSub:"=",
            ngModelEnd:"=",
            ngModelTail:"=",
            ngModelFoot:"=",
            ngModelObj:"=",
            ngModelObjSub:"=",
            ngModelObjEnd:"=",
            ngModelObjTail:"=",
            ngModelObjFoot:"=",
            sourceData:"=",
            sourceDataSub:"=",
            sourceDataEnd:"=",
            sourceDataTail:"=",
            sourceDataFoot:"=",
            btnSize:'=',
            panSize:'=',
            btnMsg:'@',
            btnFlag:'=',
            btnFlagMark:'@',
            triggerEvent:'@'
        },
        templateUrl:'/coco-drop-down-nest-all',
        link:function (scope,elem,attrs) {
            scope.btnFlag = false;
            scope.toggleDropDownPanelNarrowD = function () {
                scope.btnFlag = !scope.btnFlag;
                scope.$emit(scope.triggerEvent,{
                    btnFlag:scope.btnFlag,
                    btnFlagMark:scope.btnFlagMark
                });
            };
            scope.hideDropDownPanelNarrowD = function () {
                scope.btnFlag = false;
            };
            /************/
            // scope.ngModelObj = {};
            // scope.ngModelObjSub = {};
            // scope.ngModelObjEnd = {};
            // scope.ngModelObjTail = {};
            // scope.ngModelObjFoot = {};
            /**********/


            scope.selectItem = function($index){
                var item = scope.sourceData[$index];
                if(scope.ngModel == item.id){
                    scope.ngModel = null;
                    scope.ngModelObj = {};
                    scope.ngModelObjSub = {};
                    scope.ngModelObjEnd = {};
                    scope.ngModelObjTail = {};
                    scope.ngModelObjFoot = {};
                }else{
                    scope.ngModel = item.id;
                    scope.ngModelObj = item;

                     scope.ngModelSub = [];
                    $http.get('/api/organization/company-area?company_big_area_id='+ item.id).then(function (result) {
                        scope.sourceDataSub = result.data;
                        console.log(scope.sourceDataSub);
                        scope.sourceDataEnd = [];
                        scope.sourceDataTail = [];
                        scope.sourceDataFoot = [];
                        scope.ngModelEnd = [];
                        scope.ngModelTail = [];
                        scope.ngModelFoot = [];
                    });
                    // $http.get('/api/organization/store?company_area_id=' + item.id).then(function (result) {
                    //     scope.sourceDataSub = result.data;
                    //     console.log(scope.sourceDataSub);
                    // });

                }

            }
            scope.selectItemSub = function($index){
                var item = scope.sourceDataSub[$index];
                if(scope.ngModelSub == item.id){
                    scope.ngModelSub = null;
                    scope.ngModelObjSub = {};
                    scope.ngModelObjEnd = {};
                    scope.ngModelObjTail = {};
                    scope.ngModelObjFoot = {};
                }else{
                    scope.ngModelSub = item.id;
                    scope.ngModelObjSub = item;
                    console.log(scope.ngModelObjSub );
                     scope.ngModelEnd = [];
                    $http.get('/api/organization/store?company_area_id=' + item.id).then(function (result) {
                        scope.sourceDataEnd = result.data;
                        console.log(scope.sourceDataEnd);
                        scope.sourceDataTail = [];
                        scope.sourceDataFoot = [];
                        scope.ngModelTail = [];
                        scope.ngModelFoot = [];
                    });

                }

            }
            scope.selectItemEnd = function($index){
                var item = scope.sourceDataEnd[$index];
                if(scope.ngModelEnd == item.id){
                    scope.ngModelEnd = null;
                    scope.ngModelObjEnd = {};
                    scope.ngModelObjTail = {};
                    scope.ngModelObjFoot = {};
                }else{
                    scope.ngModelEnd = item.id;
                    scope.ngModelObjEnd = item;
                    console.log(scope.ngModelObjEnd );
                     scope.ngModelTail = [];
                    $http.get('/api/organization/store-group?store_id=' + item.id).then(function (result) {
                        scope.sourceDataTail = result.data;
                        console.log(scope.sourceDataTail);
                        scope.sourceDataFoot = [];
                        scope.ngModelFoot = [];
                    });
                    // $http.get('/api/organization/agent?store_group_id=' + item.id).then(function (result) {
                    //     scope.sourceDataTail = result.data;
                    //     console.log(scope.sourceDataTail);
                    // });
                }


            }
            scope.selectItemTail = function($index){
                var item = scope.sourceDataTail[$index];
                if(scope.ngModelTail == item.id){
                    scope.ngModelTail = null;
                    scope.ngModelObjTail = {};
                    scope.ngModelObjFoot = {};
                }else{
                    scope.ngModelTail = item.id;
                    scope.ngModelObjTail = item;
                    console.log(scope.ngModelObjTail );
                     scope.ngModelFoot = [];
                    $http.get('/api/organization/agent?store_group_id=' + item.id).then(function (result) {
                        scope.sourceDataFoot = result.data;
                        console.log(scope.sourceDataFoot);
                    });
                }


            }

            scope.selectItemFoot = function($index){
                var item = scope.sourceDataFoot[$index];
                if(scope.ngModelFoot == item.id){
                    scope.ngModelFoot = null;
                    scope.ngModelObjFoot = {};
                }else{
                    scope.ngModelFoot = item.id;
                    scope.ngModelObjFoot = item;
                    console.log(scope.ngModelObjFoot );

                }

            }
        }
    }
}]).directive('cocoDropDownNestTri',['$http',function ($http) {
    return{
        restrict:'A',
        scope:{
            ngModel:"=",
            ngModelSub:"=",
            ngModelEnd:"=",
            sourceData:"=",
            btnSize:'=',
            panSize:'=',
            btnMsg:'@',
            btnFlag:'=',
            btnFlagMark:'@',
            triggerEvent:'@'
        },
        templateUrl:'/coco-drop-down-nest-tri',
        link:function (scope,elem,attrs) {
            scope.btnFlag = false;
            scope.toggleDropDownPanelNarrowD = function () {
                scope.btnFlag = !scope.btnFlag;
                scope.$emit(scope.triggerEvent,{
                    btnFlag:scope.btnFlag,
                    btnFlagMark:scope.btnFlagMark
                });
            };
            scope.hideDropDownPanelNarrowD = function () {
                scope.btnFlag = false;
            };
            /************/
            scope.ngModelObj = {};
            scope.ngModelObjSub = {};
            scope.ngModelObjEnd = {};
            /**********/


            scope.selectItem = function($index){
                var item = scope.sourceData[$index];
                if(scope.ngModel == item.id){
                    scope.ngModel = null;
                    scope.ngModelObj = {};
                    scope.ngModelObjSub = {};
                    scope.ngModelObjEnd = {};
                }else{
                    scope.ngModel = item.id;
                    scope.ngModelObj = item;

                    scope.sourceDataSub = [];
                    $http.get('/api/common/business/' + item.id).then(function (result) {
                    //$http.get('/api/organization/store?company_area_id=' + item.id).then(function (result) {
                        scope.sourceDataSub = result.data;
                        console.log(scope.sourceDataSub);
                    });

                }

            }
            scope.selectItemSub = function($index){
                var item = scope.sourceDataSub[$index];
                if(scope.ngModelSub == item.id){
                    scope.ngModelSub = null;
                    scope.ngModelObjSub = {};
                    scope.ngModelObjEnd = {};
                }else{
                    scope.ngModelSub = item.id;
                    scope.ngModelObjSub = item;
                    console.log(scope.ngModelObjSub );
                    scope.sourceDataEnd = [];
                    $http.get('/api/common/community-business/' + item.id).then(function (result) {
                        scope.sourceDataEnd = result.data;
                        console.log(scope.sourceDataEnd);
                    });
                }

            }
          
            scope.selectItemEnd = function($index){
                var item = scope.sourceDataEnd[$index];
                if(scope.ngModelEnd == item.id){
                    scope.ngModelEnd = null;
                    scope.ngModelObjEnd = {};
                }else{
                    scope.ngModelEnd = item.id;
                    scope.ngModelObjEnd = item;
                    console.log(scope.ngModelObjEnd );

                }

            }
        }
    }
}]).directive('cocoPagination',['$http',function ($http) {
    return{
        restrict:'A',
        scope:{
            ngModel:"=",
            pagerData:"=",
            btnSize:'=',
            triggerEvent:'@'
        },
        templateUrl:'/coco-pagination',
        link:function (scope,elem,attrs) {

            scope.selectTargetPage = function(item){
                scope.ngModel = item;
                scope.$emit(scope.triggerEvent,{
                        page:item
                });
            }
            scope.selectNextPage = function(current_page){
                scope.ngModel = current_page + 1;
                scope.$emit(scope.triggerEvent,{
                    page: current_page + 1
                });

            }
            scope.selectPrePage = function(current_page){
                scope.ngModel = current_page - 1;
                scope.$emit(scope.triggerEvent,{
                    page: current_page - 1
                });

            }


        }
    }
}]).directive('cocoPaginationCh',['$http',function ($http) {
    return{
        restrict:'A',
        scope:{
            ngModel:"=",
            pagerData:"=",
            btnSize:'=',
            triggerEvent:'@'
        },
        templateUrl:'/coco-pagination-ch',
        link:function (scope,elem,attrs) {
            
            scope.goToPage = function(target){
                scope.ngModel = target;
                scope.$emit(scope.triggerEvent,{
                    page:target
                });
            }

            scope.selectTargetPage = function(){
                scope.ngModel = scope.pagerData.current_page;
                scope.$emit(scope.triggerEvent,{
                    page:scope.pagerData.current_page
                });
            }
            scope.selectNextPage = function(current_page){
                scope.ngModel = current_page + 1;
                scope.$emit(scope.triggerEvent,{
                    page: current_page + 1
                });

            }
            scope.selectPrePage = function(current_page){
                scope.ngModel = current_page - 1;
                scope.$emit(scope.triggerEvent,{
                    page: current_page - 1
                });

            }


        }
    }
}]).directive('outsideClick', function ($document) {
    return {
        restrict: 'A',
        link: function (scope, elem, attr, ctrl) {
            elem.bind('click', function (ele) {
                // this part keeps it from firing the click on the document.
                ele.stopPropagation();
                //ele.stopImmediatePropagation();
            });
            $document.bind('click', function () {
                // magic here.
                scope.$apply(attr.outsideClick);
            })
        }
    }
})
