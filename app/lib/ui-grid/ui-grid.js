/*!
 * ui-grid - v4.0.6 - 2017-06-14
 * Copyright (c) 2017 ; License: MIT
 */

(function () {
    'use strict';
    angular.module('ui.grid.i18n', []);
    angular.module('ui.grid', ['ui.grid.i18n']);
})();
(function () {
    'use strict';

    /**
     * @ngdoc object
     * @name ui.grid.service:uiGridConstants
     * @description Constants for use across many grid features
     *
     */


    angular.module('ui.grid').constant('uiGridConstants', {
        LOG_DEBUG_MESSAGES: true,
        LOG_WARN_MESSAGES: true,
        LOG_ERROR_MESSAGES: true,
        CUSTOM_FILTERS: /CUSTOM_FILTERS/g,
        COL_FIELD: /COL_FIELD/g,
        MODEL_COL_FIELD: /MODEL_COL_FIELD/g,
        TOOLTIP: /title=\"TOOLTIP\"/g,
        DISPLAY_CELL_TEMPLATE: /DISPLAY_CELL_TEMPLATE/g,
        TEMPLATE_REGEXP: /<.+>/,
        FUNC_REGEXP: /(\([^)]*\))?$/,
        DOT_REGEXP: /\./g,
        APOS_REGEXP: /'/g,
        BRACKET_REGEXP: /^(.*)((?:\s*\[\s*\d+\s*\]\s*)|(?:\s*\[\s*"(?:[^"\\]|\\.)*"\s*\]\s*)|(?:\s*\[\s*'(?:[^'\\]|\\.)*'\s*\]\s*))(.*)$/,
        COL_CLASS_PREFIX: 'ui-grid-col',
        ENTITY_BINDING: '$$this',
        events: {
            GRID_SCROLL: 'uiGridScroll',
            COLUMN_MENU_SHOWN: 'uiGridColMenuShown',
            ITEM_DRAGGING: 'uiGridItemDragStart', // For any item being dragged
            COLUMN_HEADER_CLICK: 'uiGridColumnHeaderClick'
        },
        // copied from http://www.lsauer.com/2011/08/javascript-keymap-keycodes-in-json.html
        keymap: {
            TAB: 9,
            STRG: 17,
            CAPSLOCK: 20,
            CTRL: 17,
            CTRLRIGHT: 18,
            CTRLR: 18,
            SHIFT: 16,
            RETURN: 13,
            ENTER: 13,
            BACKSPACE: 8,
            BCKSP: 8,
            ALT: 18,
            ALTR: 17,
            ALTRIGHT: 17,
            SPACE: 32,
            WIN: 91,
            MAC: 91,
            FN: null,
            PG_UP: 33,
            PG_DOWN: 34,
            UP: 38,
            DOWN: 40,
            LEFT: 37,
            RIGHT: 39,
            ESC: 27,
            DEL: 46,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123
        },
        /**
         * @ngdoc object
         * @name ASC
         * @propertyOf ui.grid.service:uiGridConstants
         * @description Used in {@link ui.grid.class:GridOptions.columnDef#properties_sort columnDef.sort} and
         * {@link ui.grid.class:GridOptions.columnDef#properties_sortDirectionCycle columnDef.sortDirectionCycle}
         * to configure the sorting direction of the column
         */
        ASC: 'asc',
        /**
         * @ngdoc object
         * @name DESC
         * @propertyOf ui.grid.service:uiGridConstants
         * @description Used in {@link ui.grid.class:GridOptions.columnDef#properties_sort columnDef.sort} and
         * {@link ui.grid.class:GridOptions.columnDef#properties_sortDirectionCycle columnDef.sortDirectionCycle}
         * to configure the sorting direction of the column
         */
        DESC: 'desc',


        /**
         * @ngdoc object
         * @name filter
         * @propertyOf ui.grid.service:uiGridConstants
         * @description Used in {@link ui.grid.class:GridOptions.columnDef#properties_filter columnDef.filter}
         * to configure filtering on the column
         *
         * `SELECT` and `INPUT` are used with the `type` property of the filter, the rest are used to specify
         * one of the built-in conditions.
         *
         * Available `condition` options are:
         * - `uiGridConstants.filter.STARTS_WITH`
         * - `uiGridConstants.filter.ENDS_WITH`
         * - `uiGridConstants.filter.CONTAINS`
         * - `uiGridConstants.filter.GREATER_THAN`
         * - `uiGridConstants.filter.GREATER_THAN_OR_EQUAL`
         * - `uiGridConstants.filter.LESS_THAN`
         * - `uiGridConstants.filter.LESS_THAN_OR_EQUAL`
         * - `uiGridConstants.filter.NOT_EQUAL`
         *
         *
         * Available `type` options are:
         * - `uiGridConstants.filter.SELECT` - use a dropdown box for the cell header filter field
         * - `uiGridConstants.filter.INPUT` - use a text box for the cell header filter field
         */
        filter: {
            STARTS_WITH: 2,
            ENDS_WITH: 4,
            EXACT: 8,
            CONTAINS: 16,
            GREATER_THAN: 32,
            GREATER_THAN_OR_EQUAL: 64,
            LESS_THAN: 128,
            LESS_THAN_OR_EQUAL: 256,
            NOT_EQUAL: 512,
            SELECT: 'select',
            INPUT: 'input'
        },

        /**
         * @ngdoc object
         * @name aggregationTypes
         * @propertyOf ui.grid.service:uiGridConstants
         * @description Used in {@link ui.grid.class:GridOptions.columnDef#properties_aggregationType columnDef.aggregationType}
         * to specify the type of built-in aggregation the column should use.
         *
         * Available options are:
         * - `uiGridConstants.aggregationTypes.sum` - add the values in this column to produce the aggregated value
         * - `uiGridConstants.aggregationTypes.count` - count the number of rows to produce the aggregated value
         * - `uiGridConstants.aggregationTypes.avg` - average the values in this column to produce the aggregated value
         * - `uiGridConstants.aggregationTypes.min` - use the minimum value in this column as the aggregated value
         * - `uiGridConstants.aggregationTypes.max` - use the maximum value in this column as the aggregated value
         */
        aggregationTypes: {
            sum: 2,
            count: 4,
            avg: 8,
            min: 16,
            max: 32
        },

        /**
         * @ngdoc array
         * @name CURRENCY_SYMBOLS
         * @propertyOf ui.grid.service:uiGridConstants
         * @description A list of all presently circulating currency symbols that was copied from
         * https://en.wikipedia.org/wiki/Currency_symbol#List_of_presently-circulating_currency_symbols
         *
         * Can be used on {@link ui.grid.class:rowSorter} to create a number string regex that ignores currency symbols.
         */
        CURRENCY_SYMBOLS: ['¤', '؋', 'Ar', 'Ƀ', '฿', 'B/.', 'Br', 'Bs.', 'Bs.F.', 'GH₵', '¢', 'c', 'Ch.', '₡', 'C$', 'D', 'ден',
            'دج', '.د.ب', 'د.ع', 'JD', 'د.ك', 'ل.د', 'дин', 'د.ت', 'د.م.', 'د.إ', 'Db', '$', '₫', 'Esc', '€', 'ƒ', 'Ft', 'FBu',
            'FCFA', 'CFA', 'Fr', 'FRw', 'G', 'gr', '₲', 'h', '₴', '₭', 'Kč', 'kr', 'kn', 'MK', 'ZK', 'Kz', 'K', 'L', 'Le', 'лв',
            'E', 'lp', 'M', 'KM', 'MT', '₥', 'Nfk', '₦', 'Nu.', 'UM', 'T$', 'MOP$', '₱', 'Pt.', '£', 'ج.م.', 'LL', 'LS', 'P', 'Q',
            'q', 'R', 'R$', 'ر.ع.', 'ر.ق', 'ر.س', '៛', 'RM', 'p', 'Rf.', '₹', '₨', 'SRe', 'Rp', '₪', 'Ksh', 'Sh.So.', 'USh', 'S/',
            'SDR', 'сом', '৳	', 'WS$', '₮', 'VT', '₩', '¥', 'zł'],

        /**
         * @ngdoc object
         * @name scrollDirection
         * @propertyOf ui.grid.service:uiGridConstants
         * @description Set on {@link ui.grid.class:Grid#properties_scrollDirection Grid.scrollDirection},
         * to indicate the direction the grid is currently scrolling in
         *
         * Available options are:
         * - `uiGridConstants.scrollDirection.UP` - set when the grid is scrolling up
         * - `uiGridConstants.scrollDirection.DOWN` - set when the grid is scrolling down
         * - `uiGridConstants.scrollDirection.LEFT` - set when the grid is scrolling left
         * - `uiGridConstants.scrollDirection.RIGHT` - set when the grid is scrolling right
         * - `uiGridConstants.scrollDirection.NONE` - set when the grid is not scrolling, this is the default
         */
        scrollDirection: {
            UP: 'up',
            DOWN: 'down',
            LEFT: 'left',
            RIGHT: 'right',
            NONE: 'none'

        },

        /**
         * @ngdoc object
         * @name dataChange
         * @propertyOf ui.grid.service:uiGridConstants
         * @description Used with {@link ui.grid.core.api:PublicApi#methods_notifyDataChange PublicApi.notifyDataChange},
         * {@link ui.grid.class:Grid#methods_callDataChangeCallbacks Grid.callDataChangeCallbacks},
         * and {@link ui.grid.class:Grid#methods_registerDataChangeCallback Grid.registerDataChangeCallback}
         * to specify the type of the event(s).
         *
         * Available options are:
         * - `uiGridConstants.dataChange.ALL` - listeners fired on any of these events, fires listeners on all events.
         * - `uiGridConstants.dataChange.EDIT` - fired when the data in a cell is edited
         * - `uiGridConstants.dataChange.ROW` - fired when a row is added or removed
         * - `uiGridConstants.dataChange.COLUMN` - fired when the column definitions are modified
         * - `uiGridConstants.dataChange.OPTIONS` - fired when the grid options are modified
         */
        dataChange: {
            ALL: 'all',
            EDIT: 'edit',
            ROW: 'row',
            COLUMN: 'column',
            OPTIONS: 'options'
        },

        /**
         * @ngdoc object
         * @name scrollbars
         * @propertyOf ui.grid.service:uiGridConstants
         * @description Used with {@link ui.grid.class:GridOptions#properties_enableHorizontalScrollbar GridOptions.enableHorizontalScrollbar}
         * and {@link ui.grid.class:GridOptions#properties_enableVerticalScrollbar GridOptions.enableVerticalScrollbar}
         * to specify the scrollbar policy for that direction.
         *
         * Available options are:
         * - `uiGridConstants.scrollbars.NEVER` - never show scrollbars in this direction
         * - `uiGridConstants.scrollbars.ALWAYS` - always show scrollbars in this direction
         */

        scrollbars: {
            NEVER: 0,
            ALWAYS: 1
            //WHEN_NEEDED: 2
        }
    });

})();

angular.module('ui.grid').directive('uiGridCell', ['$compile', '$parse', 'gridUtil', 'uiGridConstants', function ($compile, $parse, gridUtil, uiGridConstants) {
    var uiGridCell = {
        priority: 0,
        scope: false,
        require: '?^uiGrid',
        compile: function() {
            return {
                pre: function($scope, $elm, $attrs, uiGridCtrl) {
                    function compileTemplate() {
                        var compiledElementFn = $scope.col.compiledElementFn;

                        compiledElementFn($scope, function(clonedElement, scope) {
                            $elm.append(clonedElement);
                        });
                    }

                    // If the grid controller is present, use it to get the compiled cell template function
                    if (uiGridCtrl && $scope.col.compiledElementFn) {
                        compileTemplate();
                    }
                    // No controller, compile the element manually (for unit tests)
                    else {
                        if ( uiGridCtrl && !$scope.col.compiledElementFn ){
                            // gridUtil.logError('Render has been called before precompile.  Please log a ui-grid issue');

                            $scope.col.getCompiledElementFn()
                                .then(function (compiledElementFn) {
                                    compiledElementFn($scope, function(clonedElement, scope) {
                                        $elm.append(clonedElement);
                                    });
                                }).catch(angular.noop);
                        }
                        else {
                            var html = $scope.col.cellTemplate
                                .replace(uiGridConstants.MODEL_COL_FIELD, 'row.entity.' + gridUtil.preEval($scope.col.field))
                                .replace(uiGridConstants.COL_FIELD, 'grid.getCellValue(row, col)');

                            var cellElement = $compile(html)($scope);
                            $elm.append(cellElement);
                        }
                    }
                },
                post: function($scope, $elm, $attrs, uiGridCtrl) {
                    var initColClass = $scope.col.getColClass(false);
                    $elm.addClass(initColClass);

                    var classAdded;
                    var updateClass = function( grid ){
                        var contents = $elm;
                        if ( classAdded ){
                            contents.removeClass( classAdded );
                            classAdded = null;
                        }

                        if (angular.isFunction($scope.col.cellClass)) {
                            classAdded = $scope.col.cellClass($scope.grid, $scope.row, $scope.col, $scope.rowRenderIndex, $scope.colRenderIndex);
                        }
                        else {
                            classAdded = $scope.col.cellClass;
                        }
                        contents.addClass(classAdded);
                    };

                    if ($scope.col.cellClass) {
                        updateClass();
                    }

                    // Register a data change watch that would get triggered whenever someone edits a cell or modifies column defs
                    var dataChangeDereg = $scope.grid.registerDataChangeCallback( updateClass, [uiGridConstants.dataChange.COLUMN, uiGridConstants.dataChange.EDIT]);

                    // watch the col and row to see if they change - which would indicate that we've scrolled or sorted or otherwise
                    // changed the row/col that this cell relates to, and we need to re-evaluate cell classes and maybe other things
                    var cellChangeFunction = function( n, o ){
                        if ( n !== o ) {
                            if ( classAdded || $scope.col.cellClass ){
                                updateClass();
                            }

                            // See if the column's internal class has changed
                            var newColClass = $scope.col.getColClass(false);
                            if (newColClass !== initColClass) {
                                $elm.removeClass(initColClass);
                                $elm.addClass(newColClass);
                                initColClass = newColClass;
                            }
                        }
                    };

                    // TODO(c0bra): Turn this into a deep array watch
                    /*        shouldn't be needed any more given track by col.name
                     var colWatchDereg = $scope.$watch( 'col', cellChangeFunction );
                     */
                    var rowWatchDereg = $scope.$watch( 'row', cellChangeFunction );


                    var deregisterFunction = function() {
                        dataChangeDereg();
//            colWatchDereg();
                        rowWatchDereg();
                    };

                    $scope.$on( '$destroy', deregisterFunction );
                    $elm.on( '$destroy', deregisterFunction );
                }
            };
        }
    };

    return uiGridCell;
}]);


(function(){

    angular.module('ui.grid')
        .service('uiGridColumnMenuService', [ 'i18nService', 'uiGridConstants', 'gridUtil',
            function ( i18nService, uiGridConstants, gridUtil ) {
                /**
                 *  @ngdoc service
                 *  @name ui.grid.service:uiGridColumnMenuService
                 *
                 *  @description Services for working with column menus, factored out
                 *  to make the code easier to understand
                 */

                var service = {
                    /**
                     * @ngdoc method
                     * @methodOf ui.grid.service:uiGridColumnMenuService
                     * @name initialize
                     * @description  Sets defaults, puts a reference to the $scope on
                     * the uiGridController
                     * @param {$scope} $scope the $scope from the uiGridColumnMenu
                     * @param {controller} uiGridCtrl the uiGridController for the grid
                     * we're on
                     *
                     */
                    initialize: function( $scope, uiGridCtrl ){
                        $scope.grid = uiGridCtrl.grid;

                        // Store a reference to this link/controller in the main uiGrid controller
                        // to allow showMenu later
                        uiGridCtrl.columnMenuScope = $scope;

                        // Save whether we're shown or not so the columns can check
                        $scope.menuShown = false;
                    },


                    /**
                     * @ngdoc method
                     * @methodOf ui.grid.service:uiGridColumnMenuService
                     * @name setColMenuItemWatch
                     * @description  Setup a watch on $scope.col.menuItems, and update
                     * menuItems based on this.  $scope.col needs to be set by the column
                     * before calling the menu.
                     * @param {$scope} $scope the $scope from the uiGridColumnMenu
                     * @param {controller} uiGridCtrl the uiGridController for the grid
                     * we're on
                     *
                     */
                    setColMenuItemWatch: function ( $scope ){
                        var deregFunction = $scope.$watch('col.menuItems', function (n) {
                            if (typeof(n) !== 'undefined' && n && angular.isArray(n)) {
                                n.forEach(function (item) {
                                    if (typeof(item.context) === 'undefined' || !item.context) {
                                        item.context = {};
                                    }
                                    item.context.col = $scope.col;
                                });

                                $scope.menuItems = $scope.defaultMenuItems.concat(n);
                            }
                            else {
                                $scope.menuItems = $scope.defaultMenuItems;
                            }
                        });

                        $scope.$on( '$destroy', deregFunction );
                    },


                    /**
                     * @ngdoc boolean
                     * @name enableSorting
                     * @propertyOf ui.grid.class:GridOptions.columnDef
                     * @description (optional) True by default. When enabled, this setting adds sort
                     * widgets to the column header, allowing sorting of the data in the individual column.
                     */
                    /**
                     * @ngdoc method
                     * @methodOf ui.grid.service:uiGridColumnMenuService
                     * @name sortable
                     * @description  determines whether this column is sortable
                     * @param {$scope} $scope the $scope from the uiGridColumnMenu
                     *
                     */
                    sortable: function( $scope ) {
                        if ( $scope.grid.options.enableSorting && typeof($scope.col) !== 'undefined' && $scope.col && $scope.col.enableSorting) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    },

                    /**
                     * @ngdoc method
                     * @methodOf ui.grid.service:uiGridColumnMenuService
                     * @name isActiveSort
                     * @description  determines whether the requested sort direction is current active, to
                     * allow highlighting in the menu
                     * @param {$scope} $scope the $scope from the uiGridColumnMenu
                     * @param {string} direction the direction that we'd have selected for us to be active
                     *
                     */
                    isActiveSort: function( $scope, direction ){
                        return (typeof($scope.col) !== 'undefined' && typeof($scope.col.sort) !== 'undefined' &&
                        typeof($scope.col.sort.direction) !== 'undefined' && $scope.col.sort.direction === direction);

                    },

                    /**
                     * @ngdoc method
                     * @methodOf ui.grid.service:uiGridColumnMenuService
                     * @name suppressRemoveSort
                     * @description  determines whether we should suppress the removeSort option
                     * @param {$scope} $scope the $scope from the uiGridColumnMenu
                     *
                     */
                    suppressRemoveSort: function( $scope ) {
                        if ($scope.col && $scope.col.suppressRemoveSort) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    },


                    /**
                     * @ngdoc boolean
                     * @name enableHiding
                     * @propertyOf ui.grid.class:GridOptions.columnDef
                     * @description (optional) True by default. When set to false, this setting prevents a user from hiding the column
                     * using the column menu or the grid menu.
                     */
                    /**
                     * @ngdoc method
                     * @methodOf ui.grid.service:uiGridColumnMenuService
                     * @name hideable
                     * @description  determines whether a column can be hidden, by checking the enableHiding columnDef option
                     * @param {$scope} $scope the $scope from the uiGridColumnMenu
                     *
                     */
                    hideable: function( $scope ) {
                        if (typeof($scope.col) !== 'undefined' && $scope.col && $scope.col.colDef && $scope.col.colDef.enableHiding === false ) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    },


                    /**
                     * @ngdoc method
                     * @methodOf ui.grid.service:uiGridColumnMenuService
                     * @name getDefaultMenuItems
                     * @description  returns the default menu items for a column menu
                     * @param {$scope} $scope the $scope from the uiGridColumnMenu
                     *
                     */
                    getDefaultMenuItems: function( $scope ){
                        return [
                            {
                                title: i18nService.getSafeText('sort.ascending'),
                                icon: 'ui-grid-icon-sort-alt-up',
                                action: function($event) {
                                    $event.stopPropagation();
                                    $scope.sortColumn($event, uiGridConstants.ASC);
                                },
                                shown: function () {
                                    return service.sortable( $scope );
                                },
                                active: function() {
                                    return service.isActiveSort( $scope, uiGridConstants.ASC);
                                }
                            },
                            {
                                title: i18nService.getSafeText('sort.descending'),
                                icon: 'ui-grid-icon-sort-alt-down',
                                action: function($event) {
                                    $event.stopPropagation();
                                    $scope.sortColumn($event, uiGridConstants.DESC);
                                },
                                shown: function() {
                                    return service.sortable( $scope );
                                },
                                active: function() {
                                    return service.isActiveSort( $scope, uiGridConstants.DESC);
                                }
                            },
                            {
                                title: i18nService.getSafeText('sort.remove'),
                                icon: 'ui-grid-icon-cancel',
                                action: function ($event) {
                                    $event.stopPropagation();
                                    $scope.unsortColumn();
                                },
                                shown: function() {
                                    return service.sortable( $scope ) &&
                                        typeof($scope.col) !== 'undefined' && (typeof($scope.col.sort) !== 'undefined' &&
                                        typeof($scope.col.sort.direction) !== 'undefined') && $scope.col.sort.direction !== null &&
                                        !service.suppressRemoveSort( $scope );
                                }
                            },
                            {
                                title: i18nService.getSafeText('column.hide'),
                                icon: 'ui-grid-icon-cancel',
                                shown: function() {
                                    return service.hideable( $scope );
                                },
                                action: function ($event) {
                                    $event.stopPropagation();
                                    $scope.hideColumn();
                                }
                            }
                        ];
                    },


                    /**
                     * @ngdoc method
                     * @methodOf ui.grid.service:uiGridColumnMenuService
                     * @name getColumnElementPosition
                     * @description  gets the position information needed to place the column
                     * menu below the column header
                     * @param {$scope} $scope the $scope from the uiGridColumnMenu
                     * @param {GridCol} column the column we want to position below
                     * @param {element} $columnElement the column element we want to position below
                     * @returns {hash} containing left, top, offset, height, width
                     *
                     */
                    getColumnElementPosition: function( $scope, column, $columnElement ){
                        var positionData = {};
                        positionData.left = $columnElement[0].offsetLeft;
                        positionData.top = $columnElement[0].offsetTop;
                        positionData.parentLeft = $columnElement[0].offsetParent.offsetLeft;

                        // Get the grid scrollLeft
                        positionData.offset = 0;
                        if (column.grid.options.offsetLeft) {
                            positionData.offset = column.grid.options.offsetLeft;
                        }

                        positionData.height = gridUtil.elementHeight($columnElement, true);
                        positionData.width = gridUtil.elementWidth($columnElement, true);

                        return positionData;
                    },


                    /**
                     * @ngdoc method
                     * @methodOf ui.grid.service:uiGridColumnMenuService
                     * @name repositionMenu
                     * @description  Reposition the menu below the new column.  If the menu has no child nodes
                     * (i.e. it's not currently visible) then we guess it's width at 100, we'll be called again
                     * later to fix it
                     * @param {$scope} $scope the $scope from the uiGridColumnMenu
                     * @param {GridCol} column the column we want to position below
                     * @param {hash} positionData a hash containing left, top, offset, height, width
                     * @param {element} $elm the column menu element that we want to reposition
                     * @param {element} $columnElement the column element that we want to reposition underneath
                     *
                     */
                    repositionMenu: function( $scope, column, positionData, $elm, $columnElement ) {
                        var menu = $elm[0].querySelectorAll('.ui-grid-menu');

                        // It's possible that the render container of the column we're attaching to is
                        // offset from the grid (i.e. pinned containers), we need to get the difference in the offsetLeft
                        // between the render container and the grid
                        var renderContainerElm = gridUtil.closestElm($columnElement, '.ui-grid-render-container');
                        var renderContainerOffset = renderContainerElm.getBoundingClientRect().left - $scope.grid.element[0].getBoundingClientRect().left;

                        var containerScrollLeft = renderContainerElm.querySelectorAll('.ui-grid-viewport')[0].scrollLeft;

                        // default value the last width for _this_ column, otherwise last width for _any_ column, otherwise default to 170
                        var myWidth = column.lastMenuWidth ? column.lastMenuWidth : ( $scope.lastMenuWidth ? $scope.lastMenuWidth : 170);
                        var paddingRight = column.lastMenuPaddingRight ? column.lastMenuPaddingRight : ( $scope.lastMenuPaddingRight ? $scope.lastMenuPaddingRight : 10);

                        if ( menu.length !== 0 ){
                            var mid = menu[0].querySelectorAll('.ui-grid-menu-mid');
                            if ( mid.length !== 0 && !angular.element(mid).hasClass('ng-hide') ) {
                                myWidth = gridUtil.elementWidth(menu, true);
                                $scope.lastMenuWidth = myWidth;
                                column.lastMenuWidth = myWidth;

                                // TODO(c0bra): use padding-left/padding-right based on document direction (ltr/rtl), place menu on proper side
                                // Get the column menu right padding
                                paddingRight = parseInt(gridUtil.getStyles(angular.element(menu)[0])['paddingRight'], 10);
                                $scope.lastMenuPaddingRight = paddingRight;
                                column.lastMenuPaddingRight = paddingRight;
                            }
                        }

                        var left = positionData.left + renderContainerOffset - containerScrollLeft + positionData.parentLeft + positionData.width - myWidth + paddingRight;
                        if (left < positionData.offset){
                            left = positionData.offset;
                        }

                        $elm.css('left', left + 'px');
                        $elm.css('top', (positionData.top + positionData.height) + 'px');
                    }

                };

                return service;
            }])


        .directive('uiGridColumnMenu', ['$timeout', 'gridUtil', 'uiGridConstants', 'uiGridColumnMenuService', '$document',
            function ($timeout, gridUtil, uiGridConstants, uiGridColumnMenuService, $document) {
                /**
                 * @ngdoc directive
                 * @name ui.grid.directive:uiGridColumnMenu
                 * @description  Provides the column menu framework, leverages uiGridMenu underneath
                 *
                 */

                var uiGridColumnMenu = {
                    priority: 0,
                    scope: true,
                    require: '^uiGrid',
                    templateUrl: 'ui-grid/uiGridColumnMenu',
                    replace: true,
                    link: function ($scope, $elm, $attrs, uiGridCtrl) {
                        uiGridColumnMenuService.initialize( $scope, uiGridCtrl );

                        $scope.defaultMenuItems = uiGridColumnMenuService.getDefaultMenuItems( $scope );

                        // Set the menu items for use with the column menu. The user can later add additional items via the watch
                        $scope.menuItems = $scope.defaultMenuItems;
                        uiGridColumnMenuService.setColMenuItemWatch( $scope );


                        /**
                         * @ngdoc method
                         * @methodOf ui.grid.directive:uiGridColumnMenu
                         * @name showMenu
                         * @description Shows the column menu.  If the menu is already displayed it
                         * calls the menu to ask it to hide (it will animate), then it repositions the menu
                         * to the right place whilst hidden (it will make an assumption on menu width),
                         * then it asks the menu to show (it will animate), then it repositions the menu again
                         * once we can calculate it's size.
                         * @param {GridCol} column the column we want to position below
                         * @param {element} $columnElement the column element we want to position below
                         */
                        $scope.showMenu = function(column, $columnElement, event) {
                            // Swap to this column
                            $scope.col = column;

                            // Get the position information for the column element
                            var colElementPosition = uiGridColumnMenuService.getColumnElementPosition( $scope, column, $columnElement );

                            if ($scope.menuShown) {
                                // we want to hide, then reposition, then show, but we want to wait for animations
                                // we set a variable, and then rely on the menu-hidden event to call the reposition and show
                                $scope.colElement = $columnElement;
                                $scope.colElementPosition = colElementPosition;
                                $scope.hideThenShow = true;

                                $scope.$broadcast('hide-menu', { originalEvent: event });
                            } else {
                                $scope.menuShown = true;
                                uiGridColumnMenuService.repositionMenu( $scope, column, colElementPosition, $elm, $columnElement );

                                $scope.colElement = $columnElement;
                                $scope.colElementPosition = colElementPosition;
                                $scope.$broadcast('show-menu', { originalEvent: event });

                            }
                        };


                        /**
                         * @ngdoc method
                         * @methodOf ui.grid.directive:uiGridColumnMenu
                         * @name hideMenu
                         * @description Hides the column menu.
                         * @param {boolean} broadcastTrigger true if we were triggered by a broadcast
                         * from the menu itself - in which case don't broadcast again as we'll get
                         * an infinite loop
                         */
                        $scope.hideMenu = function( broadcastTrigger ) {
                            $scope.menuShown = false;
                            if ( !broadcastTrigger ){
                                $scope.$broadcast('hide-menu');
                            }
                        };


                        $scope.$on('menu-hidden', function() {
                            if ( $scope.hideThenShow ){
                                delete $scope.hideThenShow;

                                uiGridColumnMenuService.repositionMenu( $scope, $scope.col, $scope.colElementPosition, $elm, $scope.colElement );
                                $scope.$broadcast('show-menu');

                                $scope.menuShown = true;
                            } else {
                                $scope.hideMenu( true );

                                if ($scope.col) {
                                    //Focus on the menu button
                                    gridUtil.focus.bySelector($document, '.ui-grid-header-cell.' + $scope.col.getColClass()+ ' .ui-grid-column-menu-button', $scope.col.grid, false);
                                }
                            }
                        });

                        $scope.$on('menu-shown', function() {
                            $timeout( function() {
                                uiGridColumnMenuService.repositionMenu( $scope, $scope.col, $scope.colElementPosition, $elm, $scope.colElement );
                                //Focus on the first item
                                gridUtil.focus.bySelector($document, '.ui-grid-menu-items .ui-grid-menu-item', true);
                                delete $scope.colElementPosition;
                                delete $scope.columnElement;
                            }, 200);
                        });


                        /* Column methods */
                        $scope.sortColumn = function (event, dir) {
                            event.stopPropagation();

                            $scope.grid.sortColumn($scope.col, dir, true)
                                .then(function () {
                                    $scope.grid.refresh();
                                    $scope.hideMenu();
                                }).catch(angular.noop);
                        };

                        $scope.unsortColumn = function () {
                            $scope.col.unsort();

                            $scope.grid.refresh();
                            $scope.hideMenu();
                        };

                        //Since we are hiding this column the default hide action will fail so we need to focus somewhere else.
                        var setFocusOnHideColumn = function(){
                            $timeout(function(){
                                // Get the UID of the first
                                var focusToGridMenu = function(){
                                    return gridUtil.focus.byId('grid-menu', $scope.grid);
                                };

                                var thisIndex;
                                $scope.grid.columns.some(function(element, index){
                                    if (angular.equals(element, $scope.col)) {
                                        thisIndex = index;
                                        return true;
                                    }
                                });

                                var previousVisibleCol;
                                // Try and find the next lower or nearest column to focus on
                                $scope.grid.columns.some(function(element, index){
                                    if (!element.visible){
                                        return false;
                                    } // This columns index is below the current column index
                                    else if ( index < thisIndex){
                                        previousVisibleCol = element;
                                    } // This elements index is above this column index and we haven't found one that is lower
                                    else if ( index > thisIndex && !previousVisibleCol) {
                                        // This is the next best thing
                                        previousVisibleCol = element;
                                        // We've found one so use it.
                                        return true;
                                    } // We've reached an element with an index above this column and the previousVisibleCol variable has been set
                                    else if (index > thisIndex && previousVisibleCol) {
                                        // We are done.
                                        return true;
                                    }
                                });
                                // If found then focus on it
                                if (previousVisibleCol){
                                    var colClass = previousVisibleCol.getColClass();
                                    gridUtil.focus.bySelector($document, '.ui-grid-header-cell.' + colClass+ ' .ui-grid-header-cell-primary-focus', true).then(angular.noop, function(reason){
                                        if (reason !== 'canceled'){ // If this is canceled then don't perform the action
                                            //The fallback action is to focus on the grid menu
                                            return focusToGridMenu();
                                        }
                                    }).catch(angular.noop);
                                } else {
                                    // Fallback action to focus on the grid menu
                                    focusToGridMenu();
                                }
                            });
                        };

                        $scope.hideColumn = function () {
                            $scope.col.colDef.visible = false;
                            $scope.col.visible = false;

                            $scope.grid.queueGridRefresh();
                            $scope.hideMenu();
                            $scope.grid.api.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
                            $scope.grid.api.core.raise.columnVisibilityChanged( $scope.col );

                            // We are hiding so the default action of focusing on the button that opened this menu will fail.
                            setFocusOnHideColumn();
                        };
                    },



                    controller: ['$scope', function ($scope) {
                        var self = this;

                        $scope.$watch('menuItems', function (n) {
                            self.menuItems = n;
                        });
                    }]
                };

                return uiGridColumnMenu;

            }]);

})();

(function(){
    'use strict';

    angular.module('ui.grid').directive('uiGridFilter', ['$compile', '$templateCache', 'i18nService', 'gridUtil', function ($compile, $templateCache, i18nService, gridUtil) {

        return {
            compile: function() {
                return {
                    pre: function ($scope, $elm, $attrs, controllers) {
                        $scope.col.updateFilters = function( filterable ){
                            $elm.children().remove();
                            if ( filterable ){
                                var template = $scope.col.filterHeaderTemplate;

                                $elm.append($compile(template)($scope));
                            }
                        };

                        $scope.$on( '$destroy', function() {
                            delete $scope.col.updateFilters;
                        });
                    },
                    post: function ($scope, $elm, $attrs, controllers){
                        $scope.aria = i18nService.getSafeText('headerCell.aria');
                        $scope.removeFilter = function(colFilter, index){
                            colFilter.term = null;
                            //Set the focus to the filter input after the action disables the button
                            gridUtil.focus.bySelector($elm, '.ui-grid-filter-input-' + index);
                        };
                    }
                };
            }
        };
    }]);
})();

(function () {
    'use strict';

    angular.module('ui.grid').directive('uiGridFooterCell', ['$timeout', 'gridUtil', 'uiGridConstants', '$compile',
        function ($timeout, gridUtil, uiGridConstants, $compile) {
            var uiGridFooterCell = {
                priority: 0,
                scope: {
                    col: '=',
                    row: '=',
                    renderIndex: '='
                },
                replace: true,
                require: '^uiGrid',
                compile: function compile(tElement, tAttrs, transclude) {
                    return {
                        pre: function ($scope, $elm, $attrs, uiGridCtrl) {
                            var cellFooter = $compile($scope.col.footerCellTemplate)($scope);
                            $elm.append(cellFooter);
                        },
                        post: function ($scope, $elm, $attrs, uiGridCtrl) {
                            //$elm.addClass($scope.col.getColClass(false));
                            $scope.grid = uiGridCtrl.grid;

                            var initColClass = $scope.col.getColClass(false);
                            $elm.addClass(initColClass);

                            // apply any footerCellClass
                            var classAdded;
                            var updateClass = function( grid ){
                                var contents = $elm;
                                if ( classAdded ){
                                    contents.removeClass( classAdded );
                                    classAdded = null;
                                }

                                if (angular.isFunction($scope.col.footerCellClass)) {
                                    classAdded = $scope.col.footerCellClass($scope.grid, $scope.row, $scope.col, $scope.rowRenderIndex, $scope.colRenderIndex);
                                }
                                else {
                                    classAdded = $scope.col.footerCellClass;
                                }
                                contents.addClass(classAdded);
                            };

                            if ($scope.col.footerCellClass) {
                                updateClass();
                            }

                            $scope.col.updateAggregationValue();

                            // Watch for column changes so we can alter the col cell class properly
                            /* shouldn't be needed any more, given track by col.name
                             $scope.$watch('col', function (n, o) {
                             if (n !== o) {
                             // See if the column's internal class has changed
                             var newColClass = $scope.col.getColClass(false);
                             if (newColClass !== initColClass) {
                             $elm.removeClass(initColClass);
                             $elm.addClass(newColClass);
                             initColClass = newColClass;
                             }
                             }
                             });
                             */


                            // Register a data change watch that would get triggered whenever someone edits a cell or modifies column defs
                            var dataChangeDereg = $scope.grid.registerDataChangeCallback( updateClass, [uiGridConstants.dataChange.COLUMN]);
                            // listen for visible rows change and update aggregation values
                            $scope.grid.api.core.on.rowsRendered( $scope, $scope.col.updateAggregationValue );
                            $scope.grid.api.core.on.rowsRendered( $scope, updateClass );
                            $scope.$on( '$destroy', dataChangeDereg );
                        }
                    };
                }
            };

            return uiGridFooterCell;
        }]);

})();

(function () {
    'use strict';

    angular.module('ui.grid').directive('uiGridFooter', ['$templateCache', '$compile', 'uiGridConstants', 'gridUtil', '$timeout', function ($templateCache, $compile, uiGridConstants, gridUtil, $timeout) {

        return {
            restrict: 'EA',
            replace: true,
            // priority: 1000,
            require: ['^uiGrid', '^uiGridRenderContainer'],
            scope: true,
            compile: function ($elm, $attrs) {
                return {
                    pre: function ($scope, $elm, $attrs, controllers) {
                        var uiGridCtrl = controllers[0];
                        var containerCtrl = controllers[1];

                        $scope.grid = uiGridCtrl.grid;
                        $scope.colContainer = containerCtrl.colContainer;

                        containerCtrl.footer = $elm;

                        var footerTemplate = $scope.grid.options.footerTemplate;
                        gridUtil.getTemplate(footerTemplate)
                            .then(function (contents) {
                                var template = angular.element(contents);

                                var newElm = $compile(template)($scope);
                                $elm.append(newElm);

                                if (containerCtrl) {
                                    // Inject a reference to the footer viewport (if it exists) into the grid controller for use in the horizontal scroll handler below
                                    var footerViewport = $elm[0].getElementsByClassName('ui-grid-footer-viewport')[0];

                                    if (footerViewport) {
                                        containerCtrl.footerViewport = footerViewport;
                                    }
                                }
                            }).catch(angular.noop);
                    },

                    post: function ($scope, $elm, $attrs, controllers) {
                        var uiGridCtrl = controllers[0];
                        var containerCtrl = controllers[1];

                        // gridUtil.logDebug('ui-grid-footer link');

                        var grid = uiGridCtrl.grid;

                        // Don't animate footer cells
                        gridUtil.disableAnimations($elm);

                        containerCtrl.footer = $elm;

                        var footerViewport = $elm[0].getElementsByClassName('ui-grid-footer-viewport')[0];
                        if (footerViewport) {
                            containerCtrl.footerViewport = footerViewport;
                        }
                    }
                };
            }
        };
    }]);

})();

(function () {
    'use strict';

    angular.module('ui.grid').directive('uiGridGridFooter', ['$templateCache', '$compile', 'uiGridConstants', 'gridUtil', '$timeout', function ($templateCache, $compile, uiGridConstants, gridUtil, $timeout) {

        return {
            restrict: 'EA',
            replace: true,
            // priority: 1000,
            require: '^uiGrid',
            scope: true,
            compile: function ($elm, $attrs) {
                return {
                    pre: function ($scope, $elm, $attrs, uiGridCtrl) {

                        $scope.grid = uiGridCtrl.grid;



                        var footerTemplate = $scope.grid.options.gridFooterTemplate;
                        gridUtil.getTemplate(footerTemplate)
                            .then(function (contents) {
                                var template = angular.element(contents);

                                var newElm = $compile(template)($scope);
                                $elm.append(newElm);
                            }).catch(angular.noop);
                    },

                    post: function ($scope, $elm, $attrs, controllers) {

                    }
                };
            }
        };
    }]);

})();

(function(){
    'use strict';

    angular.module('ui.grid').directive('uiGridGroupPanel', ["$compile", "uiGridConstants", "gridUtil", function($compile, uiGridConstants, gridUtil) {
        var defaultTemplate = 'ui-grid/ui-grid-group-panel';

        return {
            restrict: 'EA',
            replace: true,
            require: '?^uiGrid',
            scope: false,
            compile: function($elm, $attrs) {
                return {
                    pre: function ($scope, $elm, $attrs, uiGridCtrl) {
                        var groupPanelTemplate = $scope.grid.options.groupPanelTemplate  || defaultTemplate;

                        gridUtil.getTemplate(groupPanelTemplate)
                            .then(function (contents) {
                                var template = angular.element(contents);

                                var newElm = $compile(template)($scope);
                                $elm.append(newElm);
                            }).catch(angular.noop);
                    },

                    post: function ($scope, $elm, $attrs, uiGridCtrl) {
                        $elm.bind('$destroy', function() {
                            // scrollUnbinder();
                        });
                    }
                };
            }
        };
    }]);

})();

(function(){
    'use strict';

    angular.module('ui.grid').directive('uiGridHeaderCell', ['$compile', '$timeout', '$window', '$document', 'gridUtil', 'uiGridConstants', 'ScrollEvent', 'i18nService',
        function ($compile, $timeout, $window, $document, gridUtil, uiGridConstants, ScrollEvent, i18nService) {
            // Do stuff after mouse has been down this many ms on the header cell
            var mousedownTimeout = 500;
            var changeModeTimeout = 500;    // length of time between a touch event and a mouse event being recognised again, and vice versa

            var uiGridHeaderCell = {
                priority: 0,
                scope: {
                    col: '=',
                    row: '=',
                    renderIndex: '='
                },
                require: ['^uiGrid', '^uiGridRenderContainer'],
                replace: true,
                compile: function() {
                    return {
                        pre: function ($scope, $elm, $attrs) {
                            var cellHeader = $compile($scope.col.headerCellTemplate)($scope);
                            $elm.append(cellHeader);
                        },

                        post: function ($scope, $elm, $attrs, controllers) {
                            var uiGridCtrl = controllers[0];
                            var renderContainerCtrl = controllers[1];

                            $scope.i18n = {
                                headerCell: i18nService.getSafeText('headerCell'),
                                sort: i18nService.getSafeText('sort')
                            };
                            $scope.isSortPriorityVisible = function() {
                                //show sort priority if column is sorted and there is at least one other sorted column
                                return angular.isNumber($scope.col.sort.priority) && $scope.grid.columns.some(function(element, index){
                                        return angular.isNumber(element.sort.priority) && element !== $scope.col;
                                    });
                            };
                            $scope.getSortDirectionAriaLabel = function(){
                                var col = $scope.col;
                                //Trying to recreate this sort of thing but it was getting messy having it in the template.
                                //Sort direction {{col.sort.direction == asc ? 'ascending' : ( col.sort.direction == desc ? 'descending':'none')}}. {{col.sort.priority ? {{columnPriorityText}} {{col.sort.priority}} : ''}
                                var sortDirectionText = col.sort.direction === uiGridConstants.ASC ? $scope.i18n.sort.ascending : ( col.sort.direction === uiGridConstants.DESC ? $scope.i18n.sort.descending : $scope.i18n.sort.none);
                                var label = sortDirectionText;

                                if ($scope.isSortPriorityVisible()) {
                                    label = label + '. ' + $scope.i18n.headerCell.priority + ' ' + (col.sort.priority + 1);
                                }
                                return label;
                            };

                            $scope.grid = uiGridCtrl.grid;

                            $scope.renderContainer = uiGridCtrl.grid.renderContainers[renderContainerCtrl.containerId];

                            var initColClass = $scope.col.getColClass(false);
                            $elm.addClass(initColClass);

                            // Hide the menu by default
                            $scope.menuShown = false;

                            // Put asc and desc sort directions in scope
                            $scope.asc = uiGridConstants.ASC;
                            $scope.desc = uiGridConstants.DESC;

                            // Store a reference to menu element
                            var $colMenu = angular.element( $elm[0].querySelectorAll('.ui-grid-header-cell-menu') );

                            var $contentsElm = angular.element( $elm[0].querySelectorAll('.ui-grid-cell-contents') );


                            // apply any headerCellClass
                            var classAdded;
                            var previousMouseX;

                            // filter watchers
                            var filterDeregisters = [];


                            /*
                             * Our basic approach here for event handlers is that we listen for a down event (mousedown or touchstart).
                             * Once we have a down event, we need to work out whether we have a click, a drag, or a
                             * hold.  A click would sort the grid (if sortable).  A drag would be used by moveable, so
                             * we ignore it.  A hold would open the menu.
                             *
                             * So, on down event, we put in place handlers for move and up events, and a timer.  If the
                             * timer expires before we see a move or up, then we have a long press and hence a column menu open.
                             * If the up happens before the timer, then we have a click, and we sort if the column is sortable.
                             * If a move happens before the timer, then we are doing column move, so we do nothing, the moveable feature
                             * will handle it.
                             *
                             * To deal with touch enabled devices that also have mice, we only create our handlers when
                             * we get the down event, and we create the corresponding handlers - if we're touchstart then
                             * we get touchmove and touchend, if we're mousedown then we get mousemove and mouseup.
                             *
                             * We also suppress the click action whilst this is happening - otherwise after the mouseup there
                             * will be a click event and that can cause the column menu to close
                             *
                             */

                            $scope.downFn = function( event ){
                                event.stopPropagation();

                                if (typeof(event.originalEvent) !== 'undefined' && event.originalEvent !== undefined) {
                                    event = event.originalEvent;
                                }

                                // Don't show the menu if it's not the left button
                                if (event.button && event.button !== 0) {
                                    return;
                                }
                                previousMouseX = event.pageX;

                                $scope.mousedownStartTime = (new Date()).getTime();
                                $scope.mousedownTimeout = $timeout(function() { }, mousedownTimeout);

                                $scope.mousedownTimeout.then(function () {
                                    if ( $scope.colMenu ) {
                                        uiGridCtrl.columnMenuScope.showMenu($scope.col, $elm, event);
                                    }
                                }).catch(angular.noop);

                                uiGridCtrl.fireEvent(uiGridConstants.events.COLUMN_HEADER_CLICK, {event: event, columnName: $scope.col.colDef.name});

                                $scope.offAllEvents();
                                if ( event.type === 'touchstart'){
                                    $document.on('touchend', $scope.upFn);
                                    $document.on('touchmove', $scope.moveFn);
                                } else if ( event.type === 'mousedown' ){
                                    $document.on('mouseup', $scope.upFn);
                                    $document.on('mousemove', $scope.moveFn);
                                }
                            };

                            $scope.upFn = function( event ){
                                event.stopPropagation();
                                $timeout.cancel($scope.mousedownTimeout);
                                $scope.offAllEvents();
                                $scope.onDownEvents(event.type);

                                var mousedownEndTime = (new Date()).getTime();
                                var mousedownTime = mousedownEndTime - $scope.mousedownStartTime;

                                if (mousedownTime > mousedownTimeout) {
                                    // long click, handled above with mousedown
                                }
                                else {
                                    // short click
                                    if ( $scope.sortable ){
                                        $scope.handleClick(event);
                                    }
                                }
                            };

                            $scope.moveFn = function( event ){
                                // Chrome is known to fire some bogus move events.
                                var changeValue = event.pageX - previousMouseX;
                                if ( changeValue === 0 ){ return; }

                                // we're a move, so do nothing and leave for column move (if enabled) to take over
                                $timeout.cancel($scope.mousedownTimeout);
                                $scope.offAllEvents();
                                $scope.onDownEvents(event.type);
                            };

                            $scope.clickFn = function ( event ){
                                event.stopPropagation();
                                $contentsElm.off('click', $scope.clickFn);
                            };


                            $scope.offAllEvents = function(){
                                $contentsElm.off('touchstart', $scope.downFn);
                                $contentsElm.off('mousedown', $scope.downFn);

                                $document.off('touchend', $scope.upFn);
                                $document.off('mouseup', $scope.upFn);

                                $document.off('touchmove', $scope.moveFn);
                                $document.off('mousemove', $scope.moveFn);

                                $contentsElm.off('click', $scope.clickFn);
                            };

                            $scope.onDownEvents = function( type ){
                                // If there is a previous event, then wait a while before
                                // activating the other mode - i.e. if the last event was a touch event then
                                // don't enable mouse events for a wee while (500ms or so)
                                // Avoids problems with devices that emulate mouse events when you have touch events

                                switch (type){
                                    case 'touchmove':
                                    case 'touchend':
                                        $contentsElm.on('click', $scope.clickFn);
                                        $contentsElm.on('touchstart', $scope.downFn);
                                        $timeout(function(){
                                            $contentsElm.on('mousedown', $scope.downFn);
                                        }, changeModeTimeout);
                                        break;
                                    case 'mousemove':
                                    case 'mouseup':
                                        $contentsElm.on('click', $scope.clickFn);
                                        $contentsElm.on('mousedown', $scope.downFn);
                                        $timeout(function(){
                                            $contentsElm.on('touchstart', $scope.downFn);
                                        }, changeModeTimeout);
                                        break;
                                    default:
                                        $contentsElm.on('click', $scope.clickFn);
                                        $contentsElm.on('touchstart', $scope.downFn);
                                        $contentsElm.on('mousedown', $scope.downFn);
                                }
                            };


                            var updateHeaderOptions = function( grid ){
                                var contents = $elm;
                                if ( classAdded ){
                                    contents.removeClass( classAdded );
                                    classAdded = null;
                                }

                                if (angular.isFunction($scope.col.headerCellClass)) {
                                    classAdded = $scope.col.headerCellClass($scope.grid, $scope.row, $scope.col, $scope.rowRenderIndex, $scope.colRenderIndex);
                                }
                                else {
                                    classAdded = $scope.col.headerCellClass;
                                }
                                contents.addClass(classAdded);

                                $timeout(function (){
                                    var rightMostContainer = $scope.grid.renderContainers['right'] ? $scope.grid.renderContainers['right'] : $scope.grid.renderContainers['body'];
                                    $scope.isLastCol = ( $scope.col === rightMostContainer.visibleColumnCache[ rightMostContainer.visibleColumnCache.length - 1 ] );
                                });

                                // Figure out whether this column is sortable or not
                                if ($scope.col.enableSorting) {
                                    $scope.sortable = true;
                                }
                                else {
                                    $scope.sortable = false;
                                }

                                // Figure out whether this column is filterable or not
                                var oldFilterable = $scope.filterable;
                                if (uiGridCtrl.grid.options.enableFiltering && $scope.col.enableFiltering) {
                                    $scope.filterable = true;
                                }
                                else {
                                    $scope.filterable = false;
                                }

                                if ( oldFilterable !== $scope.filterable){
                                    if ( typeof($scope.col.updateFilters) !== 'undefined' ){
                                        $scope.col.updateFilters($scope.filterable);
                                    }

                                    // if column is filterable add a filter watcher
                                    if ($scope.filterable) {
                                        $scope.col.filters.forEach( function(filter, i) {
                                            filterDeregisters.push($scope.$watch('col.filters[' + i + '].term', function(n, o) {
                                                if (n !== o) {
                                                    uiGridCtrl.grid.api.core.raise.filterChanged();
                                                    uiGridCtrl.grid.api.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
                                                    uiGridCtrl.grid.queueGridRefresh();
                                                }
                                            }));
                                        });
                                        $scope.$on('$destroy', function() {
                                            filterDeregisters.forEach( function(filterDeregister) {
                                                filterDeregister();
                                            });
                                        });
                                    } else {
                                        filterDeregisters.forEach( function(filterDeregister) {
                                            filterDeregister();
                                        });
                                    }

                                }

                                // figure out whether we support column menus
                                if ($scope.col.grid.options && $scope.col.grid.options.enableColumnMenus !== false &&
                                    $scope.col.colDef && $scope.col.colDef.enableColumnMenu !== false){
                                    $scope.colMenu = true;
                                } else {
                                    $scope.colMenu = false;
                                }

                                /**
                                 * @ngdoc property
                                 * @name enableColumnMenu
                                 * @propertyOf ui.grid.class:GridOptions.columnDef
                                 * @description if column menus are enabled, controls the column menus for this specific
                                 * column (i.e. if gridOptions.enableColumnMenus, then you can control column menus
                                 * using this option. If gridOptions.enableColumnMenus === false then you get no column
                                 * menus irrespective of the value of this option ).  Defaults to true.
                                 *
                                 */
                                /**
                                 * @ngdoc property
                                 * @name enableColumnMenus
                                 * @propertyOf ui.grid.class:GridOptions.columnDef
                                 * @description Override for column menus everywhere - if set to false then you get no
                                 * column menus.  Defaults to true.
                                 *
                                 */

                                $scope.offAllEvents();

                                if ($scope.sortable || $scope.colMenu) {
                                    $scope.onDownEvents();

                                    $scope.$on('$destroy', function () {
                                        $scope.offAllEvents();
                                    });
                                }
                            };

                            /*
                             $scope.$watch('col', function (n, o) {
                             if (n !== o) {
                             // See if the column's internal class has changed
                             var newColClass = $scope.col.getColClass(false);
                             if (newColClass !== initColClass) {
                             $elm.removeClass(initColClass);
                             $elm.addClass(newColClass);
                             initColClass = newColClass;
                             }
                             }
                             });
                             */
                            updateHeaderOptions();

                            // Register a data change watch that would get triggered whenever someone edits a cell or modifies column defs
                            var dataChangeDereg = $scope.grid.registerDataChangeCallback( updateHeaderOptions, [uiGridConstants.dataChange.COLUMN]);

                            $scope.$on( '$destroy', dataChangeDereg );

                            $scope.handleClick = function(event) {
                                // If the shift key is being held down, add this column to the sort
                                var add = false;
                                if (event.shiftKey) {
                                    add = true;
                                }

                                // Sort this column then rebuild the grid's rows
                                uiGridCtrl.grid.sortColumn($scope.col, add)
                                    .then(function () {
                                        if (uiGridCtrl.columnMenuScope) { uiGridCtrl.columnMenuScope.hideMenu(); }
                                        uiGridCtrl.grid.refresh();
                                    }).catch(angular.noop);
                            };


                            $scope.toggleMenu = function(event) {
                                event.stopPropagation();

                                // If the menu is already showing...
                                if (uiGridCtrl.columnMenuScope.menuShown) {
                                    // ... and we're the column the menu is on...
                                    if (uiGridCtrl.columnMenuScope.col === $scope.col) {
                                        // ... hide it
                                        uiGridCtrl.columnMenuScope.hideMenu();
                                    }
                                    // ... and we're NOT the column the menu is on
                                    else {
                                        // ... move the menu to our column
                                        uiGridCtrl.columnMenuScope.showMenu($scope.col, $elm);
                                    }
                                }
                                // If the menu is NOT showing
                                else {
                                    // ... show it on our column
                                    uiGridCtrl.columnMenuScope.showMenu($scope.col, $elm);
                                }
                            };
                        }
                    };
                }
            };

            return uiGridHeaderCell;
        }]);

})();

(function(){
    'use strict';

    angular.module('ui.grid').directive('uiGridHeader', ['$templateCache', '$compile', 'uiGridConstants', 'gridUtil', '$timeout', 'ScrollEvent',
        function($templateCache, $compile, uiGridConstants, gridUtil, $timeout, ScrollEvent) {
            var defaultTemplate = 'ui-grid/ui-grid-header';
            var emptyTemplate = 'ui-grid/ui-grid-no-header';

            return {
                restrict: 'EA',
                // templateUrl: 'ui-grid/ui-grid-header',
                replace: true,
                // priority: 1000,
                require: ['^uiGrid', '^uiGridRenderContainer'],
                scope: true,
                compile: function($elm, $attrs) {
                    return {
                        pre: function ($scope, $elm, $attrs, controllers) {
                            var uiGridCtrl = controllers[0];
                            var containerCtrl = controllers[1];

                            $scope.grid = uiGridCtrl.grid;
                            $scope.colContainer = containerCtrl.colContainer;

                            updateHeaderReferences();

                            var headerTemplate;
                            if (!$scope.grid.options.showHeader) {
                                headerTemplate = emptyTemplate;
                            }
                            else {
                                headerTemplate = ($scope.grid.options.headerTemplate) ? $scope.grid.options.headerTemplate : defaultTemplate;
                            }

                            gridUtil.getTemplate(headerTemplate)
                                .then(function (contents) {
                                    var template = angular.element(contents);

                                    var newElm = $compile(template)($scope);
                                    $elm.replaceWith(newElm);

                                    // And update $elm to be the new element
                                    $elm = newElm;

                                    updateHeaderReferences();

                                    if (containerCtrl) {
                                        // Inject a reference to the header viewport (if it exists) into the grid controller for use in the horizontal scroll handler below
                                        var headerViewport = $elm[0].getElementsByClassName('ui-grid-header-viewport')[0];


                                        if (headerViewport) {
                                            containerCtrl.headerViewport = headerViewport;
                                            angular.element(headerViewport).on('scroll', scrollHandler);
                                            $scope.$on('$destroy', function () {
                                                angular.element(headerViewport).off('scroll', scrollHandler);
                                            });
                                        }
                                    }

                                    $scope.grid.queueRefresh();
                                }).catch(angular.noop);

                            function updateHeaderReferences() {
                                containerCtrl.header = containerCtrl.colContainer.header = $elm;

                                var headerCanvases = $elm[0].getElementsByClassName('ui-grid-header-canvas');

                                if (headerCanvases.length > 0) {
                                    containerCtrl.headerCanvas = containerCtrl.colContainer.headerCanvas = headerCanvases[0];
                                }
                                else {
                                    containerCtrl.headerCanvas = null;
                                }
                            }

                            function scrollHandler(evt) {
                                if (uiGridCtrl.grid.isScrollingHorizontally) {
                                    return;
                                }
                                var newScrollLeft = gridUtil.normalizeScrollLeft(containerCtrl.headerViewport, uiGridCtrl.grid);
                                var horizScrollPercentage = containerCtrl.colContainer.scrollHorizontal(newScrollLeft);

                                var scrollEvent = new ScrollEvent(uiGridCtrl.grid, null, containerCtrl.colContainer, ScrollEvent.Sources.ViewPortScroll);
                                scrollEvent.newScrollLeft = newScrollLeft;
                                if ( horizScrollPercentage > -1 ){
                                    scrollEvent.x = { percentage: horizScrollPercentage };
                                }

                                uiGridCtrl.grid.scrollContainers(null, scrollEvent);
                            }
                        },

                        post: function ($scope, $elm, $attrs, controllers) {
                            var uiGridCtrl = controllers[0];
                            var containerCtrl = controllers[1];

                            // gridUtil.logDebug('ui-grid-header link');

                            var grid = uiGridCtrl.grid;

                            // Don't animate header cells
                            gridUtil.disableAnimations($elm);

                            function updateColumnWidths() {
                                // this styleBuilder always runs after the renderContainer, so we can rely on the column widths
                                // already being populated correctly

                                var columnCache = containerCtrl.colContainer.visibleColumnCache;

                                // Build the CSS
                                // uiGridCtrl.grid.columns.forEach(function (column) {
                                var ret = '';
                                var canvasWidth = 0;
                                columnCache.forEach(function (column) {
                                    ret = ret + column.getColClassDefinition();
                                    canvasWidth += column.drawnWidth;
                                });

                                containerCtrl.colContainer.canvasWidth = canvasWidth;

                                // Return the styles back to buildStyles which pops them into the `customStyles` scope variable
                                return ret;
                            }

                            containerCtrl.header = $elm;

                            var headerViewport = $elm[0].getElementsByClassName('ui-grid-header-viewport')[0];
                            if (headerViewport) {
                                containerCtrl.headerViewport = headerViewport;
                            }

                            //todo: remove this if by injecting gridCtrl into unit tests
                            if (uiGridCtrl) {
                                uiGridCtrl.grid.registerStyleComputation({
                                    priority: 15,
                                    func: updateColumnWidths
                                });
                            }
                        }
                    };
                }
            };
        }]);

})();

(function(){

    angular.module('ui.grid')
        .service('uiGridGridMenuService', [ 'gridUtil', 'i18nService', 'uiGridConstants', function( gridUtil, i18nService, uiGridConstants ) {
            /**
             *  @ngdoc service
             *  @name ui.grid.gridMenuService
             *
             *  @description Methods for working with the grid menu
             */

            var service = {
                /**
                 * @ngdoc method
                 * @methodOf ui.grid.gridMenuService
                 * @name initialize
                 * @description Sets up the gridMenu. Most importantly, sets our
                 * scope onto the grid object as grid.gridMenuScope, allowing us
                 * to operate when passed only the grid.  Second most importantly,
                 * we register the 'addToGridMenu' and 'removeFromGridMenu' methods
                 * on the core api.
                 * @param {$scope} $scope the scope of this gridMenu
                 * @param {Grid} grid the grid to which this gridMenu is associated
                 */
                initialize: function( $scope, grid ){
                    grid.gridMenuScope = $scope;
                    $scope.grid = grid;
                    $scope.registeredMenuItems = [];

                    // not certain this is needed, but would be bad to create a memory leak
                    $scope.$on('$destroy', function() {
                        if ( $scope.grid && $scope.grid.gridMenuScope ){
                            $scope.grid.gridMenuScope = null;
                        }
                        if ( $scope.grid ){
                            $scope.grid = null;
                        }
                        if ( $scope.registeredMenuItems ){
                            $scope.registeredMenuItems = null;
                        }
                    });

                    $scope.registeredMenuItems = [];

                    /**
                     * @ngdoc function
                     * @name addToGridMenu
                     * @methodOf ui.grid.core.api:PublicApi
                     * @description add items to the grid menu.  Used by features
                     * to add their menu items if they are enabled, can also be used by
                     * end users to add menu items.  This method has the advantage of allowing
                     * remove again, which can simplify management of which items are included
                     * in the menu when.  (Noting that in most cases the shown and active functions
                     * provide a better way to handle visibility of menu items)
                     * @param {Grid} grid the grid on which we are acting
                     * @param {array} items menu items in the format as described in the tutorial, with
                     * the added note that if you want to use remove you must also specify an `id` field,
                     * which is provided when you want to remove an item.  The id should be unique.
                     *
                     */
                    grid.api.registerMethod( 'core', 'addToGridMenu', service.addToGridMenu );

                    /**
                     * @ngdoc function
                     * @name removeFromGridMenu
                     * @methodOf ui.grid.core.api:PublicApi
                     * @description Remove an item from the grid menu based on a provided id. Assumes
                     * that the id is unique, removes only the last instance of that id. Does nothing if
                     * the specified id is not found
                     * @param {Grid} grid the grid on which we are acting
                     * @param {string} id the id we'd like to remove from the menu
                     *
                     */
                    grid.api.registerMethod( 'core', 'removeFromGridMenu', service.removeFromGridMenu );
                },


                /**
                 * @ngdoc function
                 * @name addToGridMenu
                 * @propertyOf ui.grid.gridMenuService
                 * @description add items to the grid menu.  Used by features
                 * to add their menu items if they are enabled, can also be used by
                 * end users to add menu items.  This method has the advantage of allowing
                 * remove again, which can simplify management of which items are included
                 * in the menu when.  (Noting that in most cases the shown and active functions
                 * provide a better way to handle visibility of menu items)
                 * @param {Grid} grid the grid on which we are acting
                 * @param {array} items menu items in the format as described in the tutorial, with
                 * the added note that if you want to use remove you must also specify an `id` field,
                 * which is provided when you want to remove an item.  The id should be unique.
                 *
                 */
                addToGridMenu: function( grid, menuItems ) {
                    if ( !angular.isArray( menuItems ) ) {
                        gridUtil.logError( 'addToGridMenu: menuItems must be an array, and is not, not adding any items');
                    } else {
                        if ( grid.gridMenuScope ){
                            grid.gridMenuScope.registeredMenuItems = grid.gridMenuScope.registeredMenuItems ? grid.gridMenuScope.registeredMenuItems : [];
                            grid.gridMenuScope.registeredMenuItems = grid.gridMenuScope.registeredMenuItems.concat( menuItems );
                        } else {
                            gridUtil.logError( 'Asked to addToGridMenu, but gridMenuScope not present.  Timing issue?  Please log issue with ui-grid');
                        }
                    }
                },


                /**
                 * @ngdoc function
                 * @name removeFromGridMenu
                 * @methodOf ui.grid.gridMenuService
                 * @description Remove an item from the grid menu based on a provided id.  Assumes
                 * that the id is unique, removes only the last instance of that id.  Does nothing if
                 * the specified id is not found.  If there is no gridMenuScope or registeredMenuItems
                 * then do nothing silently - the desired result is those menu items not be present and they
                 * aren't.
                 * @param {Grid} grid the grid on which we are acting
                 * @param {string} id the id we'd like to remove from the menu
                 *
                 */
                removeFromGridMenu: function( grid, id ){
                    var foundIndex = -1;

                    if ( grid && grid.gridMenuScope ){
                        grid.gridMenuScope.registeredMenuItems.forEach( function( value, index ) {
                            if ( value.id === id ){
                                if (foundIndex > -1) {
                                    gridUtil.logError( 'removeFromGridMenu: found multiple items with the same id, removing only the last' );
                                } else {

                                    foundIndex = index;
                                }
                            }
                        });
                    }

                    if ( foundIndex > -1 ){
                        grid.gridMenuScope.registeredMenuItems.splice( foundIndex, 1 );
                    }
                },


                /**
                 * @ngdoc array
                 * @name gridMenuCustomItems
                 * @propertyOf ui.grid.class:GridOptions
                 * @description (optional) An array of menu items that should be added to
                 * the gridMenu.  Follow the format documented in the tutorial for column
                 * menu customisation.  The context provided to the action function will
                 * include context.grid.  An alternative if working with dynamic menus is to use the
                 * provided api - core.addToGridMenu and core.removeFromGridMenu, which handles
                 * some of the management of items for you.
                 *
                 */
                /**
                 * @ngdoc boolean
                 * @name gridMenuShowHideColumns
                 * @propertyOf ui.grid.class:GridOptions
                 * @description true by default, whether the grid menu should allow hide/show
                 * of columns
                 *
                 */
                /**
                 * @ngdoc method
                 * @methodOf ui.grid.gridMenuService
                 * @name getMenuItems
                 * @description Decides the menu items to show in the menu.  This is a
                 * combination of:
                 *
                 * - the default menu items that are always included,
                 * - any menu items that have been provided through the addMenuItem api. These
                 *   are typically added by features within the grid
                 * - any menu items included in grid.options.gridMenuCustomItems.  These can be
                 *   changed dynamically, as they're always recalculated whenever we show the
                 *   menu
                 * @param {$scope} $scope the scope of this gridMenu, from which we can find all
                 * the information that we need
                 * @returns {array} an array of menu items that can be shown
                 */
                getMenuItems: function( $scope ) {
                    var menuItems = [
                        // this is where we add any menu items we want to always include
                    ];

                    if ( $scope.grid.options.gridMenuCustomItems ){
                        if ( !angular.isArray( $scope.grid.options.gridMenuCustomItems ) ){
                            gridUtil.logError( 'gridOptions.gridMenuCustomItems must be an array, and is not');
                        } else {
                            menuItems = menuItems.concat( $scope.grid.options.gridMenuCustomItems );
                        }
                    }

                    var clearFilters = [{
                        title: i18nService.getSafeText('gridMenu.clearAllFilters'),
                        action: function ($event) {
                            $scope.grid.clearAllFilters();
                        },
                        shown: function() {
                            return $scope.grid.options.enableFiltering;
                        },
                        order: 100
                    }];
                    menuItems = menuItems.concat( clearFilters );

                    menuItems = menuItems.concat( $scope.registeredMenuItems );

                    if ( $scope.grid.options.gridMenuShowHideColumns !== false ){
                        menuItems = menuItems.concat( service.showHideColumns( $scope ) );
                    }

                    menuItems.sort(function(a, b){
                        return a.order - b.order;
                    });

                    return menuItems;
                },


                /**
                 * @ngdoc array
                 * @name gridMenuTitleFilter
                 * @propertyOf ui.grid.class:GridOptions
                 * @description (optional) A function that takes a title string
                 * (usually the col.displayName), and converts it into a display value.  The function
                 * must return either a string or a promise.
                 *
                 * Used for internationalization of the grid menu column names - for angular-translate
                 * you can pass $translate as the function, for i18nService you can pass getSafeText as the
                 * function
                 * @example
                 * <pre>
                 *   gridOptions = {
     *     gridMenuTitleFilter: $translate
     *   }
                 * </pre>
                 */
                /**
                 * @ngdoc method
                 * @methodOf ui.grid.gridMenuService
                 * @name showHideColumns
                 * @description Adds two menu items for each of the columns in columnDefs.  One
                 * menu item for hide, one menu item for show.  Each is visible when appropriate
                 * (show when column is not visible, hide when column is visible).  Each toggles
                 * the visible property on the columnDef using toggleColumnVisibility
                 * @param {$scope} $scope of a gridMenu, which contains a reference to the grid
                 */
                showHideColumns: function( $scope ){
                    var showHideColumns = [];
                    if ( !$scope.grid.options.columnDefs || $scope.grid.options.columnDefs.length === 0 || $scope.grid.columns.length === 0 ) {
                        return showHideColumns;
                    }

                    // add header for columns
                    showHideColumns.push({
                        title: i18nService.getSafeText('gridMenu.columns'),
                        order: 300
                    });

                    $scope.grid.options.gridMenuTitleFilter = $scope.grid.options.gridMenuTitleFilter ? $scope.grid.options.gridMenuTitleFilter : function( title ) { return title; };

                    $scope.grid.options.columnDefs.forEach( function( colDef, index ){
                        if ( colDef.enableHiding !== false ){
                            // add hide menu item - shows an OK icon as we only show when column is already visible
                            var menuItem = {
                                icon: 'ui-grid-icon-ok',
                                action: function($event) {
                                    $event.stopPropagation();
                                    service.toggleColumnVisibility( this.context.gridCol );
                                },
                                shown: function() {
                                    return this.context.gridCol.colDef.visible === true || this.context.gridCol.colDef.visible === undefined;
                                },
                                context: { gridCol: $scope.grid.getColumn(colDef.name || colDef.field) },
                                leaveOpen: true,
                                order: 301 + index * 2
                            };
                            service.setMenuItemTitle( menuItem, colDef, $scope.grid );
                            showHideColumns.push( menuItem );

                            // add show menu item - shows no icon as we only show when column is invisible
                            menuItem = {
                                icon: 'ui-grid-icon-cancel',
                                action: function($event) {
                                    $event.stopPropagation();
                                    service.toggleColumnVisibility( this.context.gridCol );
                                },
                                shown: function() {
                                    return !(this.context.gridCol.colDef.visible === true || this.context.gridCol.colDef.visible === undefined);
                                },
                                context: { gridCol: $scope.grid.getColumn(colDef.name || colDef.field) },
                                leaveOpen: true,
                                order: 301 + index * 2 + 1
                            };
                            service.setMenuItemTitle( menuItem, colDef, $scope.grid );
                            showHideColumns.push( menuItem );
                        }
                    });
                    return showHideColumns;
                },


                /**
                 * @ngdoc method
                 * @methodOf ui.grid.gridMenuService
                 * @name setMenuItemTitle
                 * @description Handles the response from gridMenuTitleFilter, adding it directly to the menu
                 * item if it returns a string, otherwise waiting for the promise to resolve or reject then
                 * putting the result into the title
                 * @param {object} menuItem the menuItem we want to put the title on
                 * @param {object} colDef the colDef from which we can get displayName, name or field
                 * @param {Grid} grid the grid, from which we can get the options.gridMenuTitleFilter
                 *
                 */
                setMenuItemTitle: function( menuItem, colDef, grid ){
                    var title = grid.options.gridMenuTitleFilter( colDef.displayName || gridUtil.readableColumnName(colDef.name) || colDef.field );

                    if ( typeof(title) === 'string' ){
                        menuItem.title = title;
                    } else if ( title.then ){
                        // must be a promise
                        menuItem.title = "";
                        title.then( function( successValue ) {
                            menuItem.title = successValue;
                        }, function( errorValue ) {
                            menuItem.title = errorValue;
                        }).catch(angular.noop);
                    } else {
                        gridUtil.logError('Expected gridMenuTitleFilter to return a string or a promise, it has returned neither, bad config');
                        menuItem.title = 'badconfig';
                    }
                },

                /**
                 * @ngdoc method
                 * @methodOf ui.grid.gridMenuService
                 * @name toggleColumnVisibility
                 * @description Toggles the visibility of an individual column.  Expects to be
                 * provided a context that has on it a gridColumn, which is the column that
                 * we'll operate upon.  We change the visibility, and refresh the grid as appropriate
                 * @param {GridCol} gridCol the column that we want to toggle
                 *
                 */
                toggleColumnVisibility: function( gridCol ) {
                    gridCol.colDef.visible = !( gridCol.colDef.visible === true || gridCol.colDef.visible === undefined );

                    gridCol.grid.refresh();
                    gridCol.grid.api.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
                    gridCol.grid.api.core.raise.columnVisibilityChanged( gridCol );
                }
            };

            return service;
        }])



        .directive('uiGridMenuButton', ['gridUtil', 'uiGridConstants', 'uiGridGridMenuService', 'i18nService',
            function (gridUtil, uiGridConstants, uiGridGridMenuService, i18nService) {

                return {
                    priority: 0,
                    scope: true,
                    require: ['^uiGrid'],
                    templateUrl: 'ui-grid/ui-grid-menu-button',
                    replace: true,

                    link: function ($scope, $elm, $attrs, controllers) {
                        var uiGridCtrl = controllers[0];

                        // For the aria label
                        $scope.i18n = {
                            aria: i18nService.getSafeText('gridMenu.aria')
                        };

                        uiGridGridMenuService.initialize($scope, uiGridCtrl.grid);

                        $scope.shown = false;

                        $scope.toggleMenu = function () {
                            if ( $scope.shown ){
                                $scope.$broadcast('hide-menu');
                                $scope.shown = false;
                            } else {
                                $scope.menuItems = uiGridGridMenuService.getMenuItems( $scope );
                                $scope.$broadcast('show-menu');
                                $scope.shown = true;
                            }
                        };

                        $scope.$on('menu-hidden', function() {
                            $scope.shown = false;
                            gridUtil.focus.bySelector($elm, '.ui-grid-icon-container');
                        });
                    }
                };

            }]);

})();

(function(){

    /**
     * @ngdoc directive
     * @name ui.grid.directive:uiGridMenu
     * @element style
     * @restrict A
     *
     * @description
     * Allows us to interpolate expressions in `<style>` elements. Angular doesn't do this by default as it can/will/might? break in IE8.
     *
     * @example
     <doc:example module="app">
     <doc:source>
     <script>
     var app = angular.module('app', ['ui.grid']);

     app.controller('MainCtrl', ['$scope', function ($scope) {

 }]);
     </script>

     <div ng-controller="MainCtrl">
     <div ui-grid-menu shown="true"  ></div>
     </div>
     </doc:source>
     <doc:scenario>
     </doc:scenario>
     </doc:example>
     */
    angular.module('ui.grid')

        .directive('uiGridMenu', ['$compile', '$timeout', '$window', '$document', 'gridUtil', 'uiGridConstants', 'i18nService',
            function ($compile, $timeout, $window, $document, gridUtil, uiGridConstants, i18nService) {
                var uiGridMenu = {
                    priority: 0,
                    scope: {
                        // shown: '&',
                        menuItems: '=',
                        autoHide: '=?'
                    },
                    require: '?^uiGrid',
                    templateUrl: 'ui-grid/uiGridMenu',
                    replace: false,
                    link: function ($scope, $elm, $attrs, uiGridCtrl) {
                        $scope.dynamicStyles = '';
                        if (uiGridCtrl && uiGridCtrl.grid && uiGridCtrl.grid.options && uiGridCtrl.grid.options.gridMenuTemplate) {
                            var gridMenuTemplate = uiGridCtrl.grid.options.gridMenuTemplate;
                            gridUtil.getTemplate(gridMenuTemplate).then(function (contents) {
                                var template = angular.element(contents);
                                var newElm = $compile(template)($scope);
                                $elm.replaceWith(newElm);
                            }).catch(angular.noop);
                        }

                        var setupHeightStyle = function(gridHeight) {
                            //menu appears under header row, so substract that height from it's total
                            // additional 20px for general padding
                            var gridMenuMaxHeight = gridHeight - uiGridCtrl.grid.headerHeight - 20;
                            $scope.dynamicStyles = [
                                '.grid' + uiGridCtrl.grid.id + ' .ui-grid-menu-mid {',
                                'max-height: ' + gridMenuMaxHeight + 'px;',
                                '}'
                            ].join(' ');
                        };

                        if (uiGridCtrl) {
                            setupHeightStyle(uiGridCtrl.grid.gridHeight);
                            uiGridCtrl.grid.api.core.on.gridDimensionChanged($scope, function(oldGridHeight, oldGridWidth, newGridHeight, newGridWidth) {
                                setupHeightStyle(newGridHeight);
                            });
                        }

                        $scope.i18n = {
                            close: i18nService.getSafeText('columnMenu.close')
                        };

                        // *** Show/Hide functions ******
                        $scope.showMenu = function(event, args) {
                            if ( !$scope.shown ){

                                /*
                                 * In order to animate cleanly we remove the ng-if, wait a digest cycle, then
                                 * animate the removal of the ng-hide.  We can't successfully (so far as I can tell)
                                 * animate removal of the ng-if, as the menu items aren't there yet.  And we don't want
                                 * to rely on ng-show only, as that leaves elements in the DOM that are needlessly evaluated
                                 * on scroll events.
                                 *
                                 * Note when testing animation that animations don't run on the tutorials.  When debugging it looks
                                 * like they do, but angular has a default $animate provider that is just a stub, and that's what's
                                 * being called.  ALso don't be fooled by the fact that your browser has actually loaded the
                                 * angular-translate.js, it's not using it.  You need to test animations in an external application.
                                 */
                                $scope.shown = true;

                                $timeout( function() {
                                    $scope.shownMid = true;
                                    $scope.$emit('menu-shown');
                                });
                            } else if ( !$scope.shownMid ) {
                                // we're probably doing a hide then show, so we don't need to wait for ng-if
                                $scope.shownMid = true;
                                $scope.$emit('menu-shown');
                            }

                            var docEventType = 'click';
                            if (args && args.originalEvent && args.originalEvent.type && args.originalEvent.type === 'touchstart') {
                                docEventType = args.originalEvent.type;
                            }

                            // Turn off an existing document click handler
                            angular.element(document).off('click touchstart', applyHideMenu);
                            $elm.off('keyup', checkKeyUp);
                            $elm.off('keydown', checkKeyDown);

                            // Turn on the document click handler, but in a timeout so it doesn't apply to THIS click if there is one
                            $timeout(function() {
                                angular.element(document).on(docEventType, applyHideMenu);
                                $elm.on('keyup', checkKeyUp);
                                $elm.on('keydown', checkKeyDown);

                            });
                            //automatically set the focus to the first button element in the now open menu.
                            gridUtil.focus.bySelector($elm, 'button[type=button]', true);
                        };


                        $scope.hideMenu = function(event) {
                            if ( $scope.shown ){
                                /*
                                 * In order to animate cleanly we animate the addition of ng-hide, then use a $timeout to
                                 * set the ng-if (shown = false) after the animation runs.  In theory we can cascade off the
                                 * callback on the addClass method, but it is very unreliable with unit tests for no discernable reason.
                                 *
                                 * The user may have clicked on the menu again whilst
                                 * we're waiting, so we check that the mid isn't shown before applying the ng-if.
                                 */
                                $scope.shownMid = false;
                                $timeout( function() {
                                    if ( !$scope.shownMid ){
                                        $scope.shown = false;
                                        $scope.$emit('menu-hidden');
                                    }
                                }, 200);
                            }

                            angular.element(document).off('click touchstart', applyHideMenu);
                            $elm.off('keyup', checkKeyUp);
                            $elm.off('keydown', checkKeyDown);
                        };

                        $scope.$on('hide-menu', function (event, args) {
                            $scope.hideMenu(event, args);
                        });

                        $scope.$on('show-menu', function (event, args) {
                            $scope.showMenu(event, args);
                        });


                        // *** Auto hide when click elsewhere ******
                        var applyHideMenu = function(){
                            if ($scope.shown) {
                                $scope.$apply(function () {
                                    $scope.hideMenu();
                                });
                            }
                        };

                        // close menu on ESC and keep tab cyclical
                        var checkKeyUp = function(event) {
                            if (event.keyCode === 27) {
                                $scope.hideMenu();
                            }
                        };

                        var checkKeyDown = function(event) {
                            var setFocus = function(elm) {
                                elm.focus();
                                event.preventDefault();
                                return false;
                            };
                            if (event.keyCode === 9) {
                                var firstMenuItem, lastMenuItem;
                                var menuItemButtons = $elm[0].querySelectorAll('button:not(.ng-hide)');
                                if (menuItemButtons.length > 0) {
                                    firstMenuItem = menuItemButtons[0];
                                    lastMenuItem = menuItemButtons[menuItemButtons.length - 1];
                                    if (event.target === lastMenuItem && !event.shiftKey) {
                                        setFocus(firstMenuItem);
                                    } else if (event.target === firstMenuItem && event.shiftKey) {
                                        setFocus(lastMenuItem);
                                    }
                                }
                            }
                        };

                        if (typeof($scope.autoHide) === 'undefined' || $scope.autoHide === undefined) {
                            $scope.autoHide = true;
                        }

                        if ($scope.autoHide) {
                            angular.element($window).on('resize', applyHideMenu);
                        }

                        $scope.$on('$destroy', function unbindEvents() {
                            angular.element($window).off('resize', applyHideMenu);
                            angular.element(document).off('click touchstart', applyHideMenu);
                            $elm.off('keyup', checkKeyUp);
                            $elm.off('keydown', checkKeyDown);
                        });

                        if (uiGridCtrl) {
                            $scope.$on('$destroy', uiGridCtrl.grid.api.core.on.scrollBegin($scope, applyHideMenu ));
                        }

                        $scope.$on('$destroy', $scope.$on(uiGridConstants.events.ITEM_DRAGGING, applyHideMenu ));
                    }
                };

                return uiGridMenu;
            }])

        .directive('uiGridMenuItem', ['gridUtil', '$compile', 'i18nService', function (gridUtil, $compile, i18nService) {
            var uiGridMenuItem = {
                priority: 0,
                scope: {
                    name: '=',
                    active: '=',
                    action: '=',
                    icon: '=',
                    shown: '=',
                    context: '=',
                    templateUrl: '=',
                    leaveOpen: '=',
                    screenReaderOnly: '='
                },
                require: ['?^uiGrid'],
                templateUrl: 'ui-grid/uiGridMenuItem',
                replace: false,
                compile: function() {
                    return {
                        pre: function ($scope, $elm) {
                            if ($scope.templateUrl) {
                                gridUtil.getTemplate($scope.templateUrl)
                                    .then(function (contents) {
                                        var template = angular.element(contents);

                                        var newElm = $compile(template)($scope);
                                        $elm.replaceWith(newElm);
                                    }).catch(angular.noop);
                            }
                        },
                        post: function ($scope, $elm, $attrs, controllers) {
                            var uiGridCtrl = controllers[0];

                            // TODO(c0bra): validate that shown and active are functions if they're defined. An exception is already thrown above this though
                            // if (typeof($scope.shown) !== 'undefined' && $scope.shown && typeof($scope.shown) !== 'function') {
                            //   throw new TypeError("$scope.shown is defined but not a function");
                            // }
                            if (typeof($scope.shown) === 'undefined' || $scope.shown === null) {
                                $scope.shown = function() { return true; };
                            }

                            $scope.itemShown = function () {
                                var context = {};
                                if ($scope.context) {
                                    context.context = $scope.context;
                                }

                                if (typeof(uiGridCtrl) !== 'undefined' && uiGridCtrl) {
                                    context.grid = uiGridCtrl.grid;
                                }

                                return $scope.shown.call(context);
                            };

                            $scope.itemAction = function($event,title) {
                                $event.stopPropagation();

                                if (typeof($scope.action) === 'function') {
                                    var context = {};

                                    if ($scope.context) {
                                        context.context = $scope.context;
                                    }

                                    // Add the grid to the function call context if the uiGrid controller is present
                                    if (typeof(uiGridCtrl) !== 'undefined' && uiGridCtrl) {
                                        context.grid = uiGridCtrl.grid;
                                    }

                                    $scope.action.call(context, $event, title);

                                    if ( !$scope.leaveOpen ){
                                        $scope.$emit('hide-menu');
                                    } else {
                                        // Maintain focus on the selected item
                                        gridUtil.focus.bySelector(angular.element($event.target.parentElement), 'button[type=button]', true);
                                    }
                                }
                            };

                            $scope.i18n = i18nService.get();
                        }
                    };
                }
            };

            return uiGridMenuItem;
        }]);

})();

(function(){
    'use strict';
    /**
     * @ngdoc overview
     * @name ui.grid.directive:uiGridOneBind
     * @summary A group of directives that provide a one time bind to a dom element.
     * @description A group of directives that provide a one time bind to a dom element.
     * As one time bindings are not supported in Angular 1.2.* this directive provdes this capability.
     * This is done to reduce the number of watchers on the dom.
     * <br/>
     * <h2>Short Example ({@link ui.grid.directive:uiGridOneBindSrc ui-grid-one-bind-src})</h2>
     * <pre>
     <div ng-init="imageName = 'myImageDir.jpg'">
     <img ui-grid-one-bind-src="imageName"></img>
     </div>
     </pre>
     * Will become:
     * <pre>
     <div ng-init="imageName = 'myImageDir.jpg'">
     <img ui-grid-one-bind-src="imageName" src="myImageDir.jpg"></img>
     </div>
     </pre>
     </br>
     <h2>Short Example ({@link ui.grid.directive:uiGridOneBindText ui-grid-one-bind-text})</h2>
     * <pre>
     <div ng-init="text='Add this text'" ui-grid-one-bind-text="text"></div>
     </pre>
     * Will become:
     * <pre>
     <div ng-init="text='Add this text'" ui-grid-one-bind-text="text">Add this text</div>
     </pre>
     </br>
     * <b>Note:</b> This behavior is slightly different for the {@link ui.grid.directive:uiGridOneBindIdGrid uiGridOneBindIdGrid}
     * and {@link ui.grid.directive:uiGridOneBindAriaLabelledbyGrid uiGridOneBindAriaLabelledbyGrid} directives.
     *
     */
        //https://github.com/joshkurz/Black-Belt-AngularJS-Directives/blob/master/directives/Optimization/oneBind.js
    var oneBinders = angular.module('ui.grid');
    angular.forEach([
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindSrc
             * @memberof ui.grid.directive:uiGridOneBind
             * @element img
             * @restrict A
             * @param {String} uiGridOneBindSrc The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @description One time binding for the src dom tag.
             *
             */
            {tag: 'Src', method: 'attr'},
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindText
             * @element div
             * @restrict A
             * @param {String} uiGridOneBindText The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @description One time binding for the text dom tag.
             */
            {tag: 'Text', method: 'text'},
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindHref
             * @element div
             * @restrict A
             * @param {String} uiGridOneBindHref The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @description One time binding for the href dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
             */
            {tag: 'Href', method: 'attr'},
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindClass
             * @element div
             * @restrict A
             * @param {String} uiGridOneBindClass The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @param {Object} uiGridOneBindClass The object that you want to bind. At least one of the values in the object must be something other than null or undefined for the watcher to be removed.
             *                                    this is to prevent the watcher from being removed before the scope is initialized.
             * @param {Array} uiGridOneBindClass An array of classes to bind to this element.
             * @description One time binding for the class dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
             */
            {tag: 'Class', method: 'addClass'},
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindHtml
             * @element div
             * @restrict A
             * @param {String} uiGridOneBindHtml The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @description One time binding for the html method on a dom element. For more information see {@link ui.grid.directive:uiGridOneBind}.
             */
            {tag: 'Html', method: 'html'},
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindAlt
             * @element div
             * @restrict A
             * @param {String} uiGridOneBindAlt The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @description One time binding for the alt dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
             */
            {tag: 'Alt', method: 'attr'},
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindStyle
             * @element div
             * @restrict A
             * @param {String} uiGridOneBindStyle The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @description One time binding for the style dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
             */
            {tag: 'Style', method: 'css'},
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindValue
             * @element div
             * @restrict A
             * @param {String} uiGridOneBindValue The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @description One time binding for the value dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
             */
            {tag: 'Value', method: 'attr'},
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindId
             * @element div
             * @restrict A
             * @param {String} uiGridOneBindId The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @description One time binding for the value dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
             */
            {tag: 'Id', method: 'attr'},
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindIdGrid
             * @element div
             * @restrict A
             * @param {String} uiGridOneBindIdGrid The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @description One time binding for the id dom tag.
             * <h1>Important Note!</h1>
             * If the id tag passed as a parameter does <b>not</b> contain the grid id as a substring
             * then the directive will search the scope and the parent controller (if it is a uiGridController) for the grid.id value.
             * If this value is found then it is appended to the begining of the id tag. If the grid is not found then the directive throws an error.
             * This is done in order to ensure uniqueness of id tags across the grid.
             * This is to prevent two grids in the same document having duplicate id tags.
             */
            {tag: 'Id', directiveName:'IdGrid', method: 'attr', appendGridId: true},
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindTitle
             * @element div
             * @restrict A
             * @param {String} uiGridOneBindTitle The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @description One time binding for the title dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
             */
            {tag: 'Title', method: 'attr'},
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindAriaLabel
             * @element div
             * @restrict A
             * @param {String} uiGridOneBindAriaLabel The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @description One time binding for the aria-label dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
             *<br/>
             * <pre>
             <div ng-init="text='Add this text'" ui-grid-one-bind-aria-label="text"></div>
             </pre>
             * Will become:
             * <pre>
             <div ng-init="text='Add this text'" ui-grid-one-bind-aria-label="text" aria-label="Add this text"></div>
             </pre>
             */
            {tag: 'Label', method: 'attr', aria:true},
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindAriaLabelledby
             * @element div
             * @restrict A
             * @param {String} uiGridOneBindAriaLabelledby The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @description One time binding for the aria-labelledby dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
             *<br/>
             * <pre>
             <div ng-init="anId = 'gridID32'" ui-grid-one-bind-aria-labelledby="anId"></div>
             </pre>
             * Will become:
             * <pre>
             <div ng-init="anId = 'gridID32'" ui-grid-one-bind-aria-labelledby="anId" aria-labelledby="gridID32"></div>
             </pre>
             */
            {tag: 'Labelledby', method: 'attr', aria:true},
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindAriaLabelledbyGrid
             * @element div
             * @restrict A
             * @param {String} uiGridOneBindAriaLabelledbyGrid The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @description One time binding for the aria-labelledby dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
             * Works somewhat like {@link ui.grid.directive:uiGridOneBindIdGrid} however this one supports a list of ids (seperated by a space) and will dynamically add the
             * grid id to each one.
             *<br/>
             * <pre>
             <div ng-init="anId = 'gridID32'" ui-grid-one-bind-aria-labelledby-grid="anId"></div>
             </pre>
             * Will become ([grid.id] will be replaced by the actual grid id):
             * <pre>
             <div ng-init="anId = 'gridID32'" ui-grid-one-bind-aria-labelledby-grid="anId" aria-labelledby-Grid="[grid.id]-gridID32"></div>
             </pre>
             */
            {tag: 'Labelledby', directiveName:'LabelledbyGrid', appendGridId:true, method: 'attr', aria:true},
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindAriaDescribedby
             * @element ANY
             * @restrict A
             * @param {String} uiGridOneBindAriaDescribedby The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @description One time binding for the aria-describedby dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
             *<br/>
             * <pre>
             <div ng-init="anId = 'gridID32'" ui-grid-one-bind-aria-describedby="anId"></div>
             </pre>
             * Will become:
             * <pre>
             <div ng-init="anId = 'gridID32'" ui-grid-one-bind-aria-describedby="anId" aria-describedby="gridID32"></div>
             </pre>
             */
            {tag: 'Describedby', method: 'attr', aria:true},
            /**
             * @ngdoc directive
             * @name ui.grid.directive:uiGridOneBindAriaDescribedbyGrid
             * @element ANY
             * @restrict A
             * @param {String} uiGridOneBindAriaDescribedbyGrid The angular string you want to bind. Does not support interpolation. Don't use <code>{{scopeElt}}</code> instead use <code>scopeElt</code>.
             * @description One time binding for the aria-labelledby dom tag. For more information see {@link ui.grid.directive:uiGridOneBind}.
             * Works somewhat like {@link ui.grid.directive:uiGridOneBindIdGrid} however this one supports a list of ids (seperated by a space) and will dynamically add the
             * grid id to each one.
             *<br/>
             * <pre>
             <div ng-init="anId = 'gridID32'" ui-grid-one-bind-aria-describedby-grid="anId"></div>
             </pre>
             * Will become ([grid.id] will be replaced by the actual grid id):
             * <pre>
             <div ng-init="anId = 'gridID32'" ui-grid-one-bind-aria-describedby-grid="anId" aria-describedby="[grid.id]-gridID32"></div>
             </pre>
             */
            {tag: 'Describedby', directiveName:'DescribedbyGrid', appendGridId:true, method: 'attr', aria:true}],
        function(v){

            var baseDirectiveName = 'uiGridOneBind';
            //If it is an aria tag then append the aria label seperately
            //This is done because the aria tags are formatted aria-* and the directive name can't have a '-' character in it.
            //If the diretiveName has to be overridden then it does so here. This is because the tag being modified and the directive sometimes don't match up.
            var directiveName = (v.aria ? baseDirectiveName + 'Aria' : baseDirectiveName) + (v.directiveName ? v.directiveName : v.tag);
            oneBinders.directive(directiveName, ['gridUtil', function(gridUtil){
                return {
                    restrict: 'A',
                    require: ['?uiGrid','?^uiGrid'],
                    link: function(scope, iElement, iAttrs, controllers){
                        /* Appends the grid id to the beginnig of the value. */
                        var appendGridId = function(val){
                            var grid; //Get an instance of the grid if its available
                            //If its available in the scope then we don't need to try to find it elsewhere
                            if (scope.grid) {
                                grid = scope.grid;
                            }
                            //Another possible location to try to find the grid
                            else if (scope.col && scope.col.grid){
                                grid = scope.col.grid;
                            }
                            //Last ditch effort: Search through the provided controllers.
                            else if (!controllers.some( //Go through the controllers till one has the element we need
                                    function(controller){
                                        if (controller && controller.grid) {
                                            grid = controller.grid;
                                            return true; //We've found the grid
                                        }
                                    })){
                                //We tried our best to find it for you
                                gridUtil.logError("["+directiveName+"] A valid grid could not be found to bind id. Are you using this directive " +
                                    "within the correct scope? Trying to generate id: [gridID]-" + val);
                                throw new Error("No valid grid could be found");
                            }

                            if (grid){
                                var idRegex = new RegExp(grid.id.toString());
                                //If the grid id hasn't been appended already in the template declaration
                                if (!idRegex.test(val)){
                                    val = grid.id.toString() + '-' + val;
                                }
                            }
                            return val;
                        };

                        // The watch returns a function to remove itself.
                        var rmWatcher = scope.$watch(iAttrs[directiveName], function(newV){
                            if (newV){
                                //If we are trying to add an id element then we also apply the grid id if it isn't already there
                                if (v.appendGridId) {
                                    var newIdString = null;
                                    //Append the id to all of the new ids.
                                    angular.forEach( newV.split(' '), function(s){
                                        newIdString = (newIdString ? (newIdString + ' ') : '') +  appendGridId(s);
                                    });
                                    newV = newIdString;
                                }

                                // Append this newValue to the dom element.
                                switch (v.method) {
                                    case 'attr': //The attr method takes two paraams the tag and the value
                                        if (v.aria) {
                                            //If it is an aria element then append the aria prefix
                                            iElement[v.method]('aria-' + v.tag.toLowerCase(),newV);
                                        } else {
                                            iElement[v.method](v.tag.toLowerCase(),newV);
                                        }
                                        break;
                                    case 'addClass':
                                        //Pulled from https://github.com/Pasvaz/bindonce/blob/master/bindonce.js
                                        if (angular.isObject(newV) && !angular.isArray(newV)) {
                                            var results = [];
                                            var nonNullFound = false; //We don't want to remove the binding unless the key is actually defined
                                            angular.forEach(newV, function (value, index) {
                                                if (value !== null && typeof(value) !== "undefined"){
                                                    nonNullFound = true; //A non null value for a key was found so the object must have been initialized
                                                    if (value) {results.push(index);}
                                                }
                                            });
                                            //A non null value for a key wasn't found so assume that the scope values haven't been fully initialized
                                            if (!nonNullFound){
                                                return; // If not initialized then the watcher should not be removed yet.
                                            }
                                            newV = results;
                                        }

                                        if (newV) {
                                            iElement.addClass(angular.isArray(newV) ? newV.join(' ') : newV);
                                        } else {
                                            return;
                                        }
                                        break;
                                    default:
                                        iElement[v.method](newV);
                                        break;
                                }

                                //Removes the watcher on itself after the bind
                                rmWatcher();
                            }
                            // True ensures that equality is determined using angular.equals instead of ===
                        }, true); //End rm watchers
                    } //End compile function
                }; //End directive return
            } // End directive function
            ]); //End directive
        }); // End angular foreach
})();

(function () {
    'use strict';

    var module = angular.module('ui.grid');

    module.directive('uiGridRenderContainer', ['$timeout', '$document', 'uiGridConstants', 'gridUtil', 'ScrollEvent',
        function($timeout, $document, uiGridConstants, gridUtil, ScrollEvent) {
            return {
                replace: true,
                transclude: true,
                templateUrl: 'ui-grid/uiGridRenderContainer',
                require: ['^uiGrid', 'uiGridRenderContainer'],
                scope: {
                    containerId: '=',
                    rowContainerName: '=',
                    colContainerName: '=',
                    bindScrollHorizontal: '=',
                    bindScrollVertical: '=',
                    enableVerticalScrollbar: '=',
                    enableHorizontalScrollbar: '='
                },
                controller: 'uiGridRenderContainer as RenderContainer',
                compile: function () {
                    return {
                        pre: function prelink($scope, $elm, $attrs, controllers) {

                            var uiGridCtrl = controllers[0];
                            var containerCtrl = controllers[1];
                            var grid = $scope.grid = uiGridCtrl.grid;

                            // Verify that the render container for this element exists
                            if (!$scope.rowContainerName) {
                                throw "No row render container name specified";
                            }
                            if (!$scope.colContainerName) {
                                throw "No column render container name specified";
                            }

                            if (!grid.renderContainers[$scope.rowContainerName]) {
                                throw "Row render container '" + $scope.rowContainerName + "' is not registered.";
                            }
                            if (!grid.renderContainers[$scope.colContainerName]) {
                                throw "Column render container '" + $scope.colContainerName + "' is not registered.";
                            }

                            var rowContainer = $scope.rowContainer = grid.renderContainers[$scope.rowContainerName];
                            var colContainer = $scope.colContainer = grid.renderContainers[$scope.colContainerName];

                            containerCtrl.containerId = $scope.containerId;
                            containerCtrl.rowContainer = rowContainer;
                            containerCtrl.colContainer = colContainer;
                        },
                        post: function postlink($scope, $elm, $attrs, controllers) {

                            var uiGridCtrl = controllers[0];
                            var containerCtrl = controllers[1];

                            var grid = uiGridCtrl.grid;
                            var rowContainer = containerCtrl.rowContainer;
                            var colContainer = containerCtrl.colContainer;
                            var scrollTop = null;
                            var scrollLeft = null;


                            var renderContainer = grid.renderContainers[$scope.containerId];

                            // Put the container name on this element as a class
                            $elm.addClass('ui-grid-render-container-' + $scope.containerId);

                            // Scroll the render container viewport when the mousewheel is used
                            gridUtil.on.mousewheel($elm, function (event) {
                                var scrollEvent = new ScrollEvent(grid, rowContainer, colContainer, ScrollEvent.Sources.RenderContainerMouseWheel);
                                if (event.deltaY !== 0) {
                                    var scrollYAmount = event.deltaY * -1 * event.deltaFactor;

                                    scrollTop = containerCtrl.viewport[0].scrollTop;

                                    // Get the scroll percentage
                                    scrollEvent.verticalScrollLength = rowContainer.getVerticalScrollLength();
                                    var scrollYPercentage = (scrollTop + scrollYAmount) / scrollEvent.verticalScrollLength;

                                    // If we should be scrolled 100%, make sure the scrollTop matches the maximum scroll length
                                    //   Viewports that have "overflow: hidden" don't let the mousewheel scroll all the way to the bottom without this check
                                    if (scrollYPercentage >= 1 && scrollTop < scrollEvent.verticalScrollLength) {
                                        containerCtrl.viewport[0].scrollTop = scrollEvent.verticalScrollLength;
                                    }

                                    // Keep scrollPercentage within the range 0-1.
                                    if (scrollYPercentage < 0) { scrollYPercentage = 0; }
                                    else if (scrollYPercentage > 1) { scrollYPercentage = 1; }

                                    scrollEvent.y = { percentage: scrollYPercentage, pixels: scrollYAmount };
                                }
                                if (event.deltaX !== 0) {
                                    var scrollXAmount = event.deltaX * event.deltaFactor;

                                    // Get the scroll percentage
                                    scrollLeft = gridUtil.normalizeScrollLeft(containerCtrl.viewport, grid);
                                    scrollEvent.horizontalScrollLength = (colContainer.getCanvasWidth() - colContainer.getViewportWidth());
                                    var scrollXPercentage = (scrollLeft + scrollXAmount) / scrollEvent.horizontalScrollLength;

                                    // Keep scrollPercentage within the range 0-1.
                                    if (scrollXPercentage < 0) { scrollXPercentage = 0; }
                                    else if (scrollXPercentage > 1) { scrollXPercentage = 1; }

                                    scrollEvent.x = { percentage: scrollXPercentage, pixels: scrollXAmount };
                                }

                                // Let the parent container scroll if the grid is already at the top/bottom
                                if ((event.deltaY !== 0 && (scrollEvent.atTop(scrollTop) || scrollEvent.atBottom(scrollTop))) ||
                                    (event.deltaX !== 0 && (scrollEvent.atLeft(scrollLeft) || scrollEvent.atRight(scrollLeft)))) {
                                    //parent controller scrolls
                                }
                                else {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    scrollEvent.fireThrottledScrollingEvent('', scrollEvent);
                                }

                            });

                            $elm.bind('$destroy', function() {
                                $elm.unbind('keydown');

                                ['touchstart', 'touchmove', 'touchend','keydown', 'wheel', 'mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'].forEach(function (eventName) {
                                    $elm.unbind(eventName);
                                });
                            });

                            // TODO(c0bra): Handle resizing the inner canvas based on the number of elements
                            function update() {
                                var ret = '';

                                var canvasWidth = colContainer.canvasWidth;
                                var viewportWidth = colContainer.getViewportWidth();

                                var canvasHeight = rowContainer.getCanvasHeight();

                                //add additional height for scrollbar on left and right container
                                //if ($scope.containerId !== 'body') {
                                //  canvasHeight -= grid.scrollbarHeight;
                                //}

                                var viewportHeight = rowContainer.getViewportHeight();
                                //shorten the height to make room for a scrollbar placeholder
                                if (colContainer.needsHScrollbarPlaceholder()) {
                                    viewportHeight -= grid.scrollbarHeight;
                                }

                                var headerViewportWidth,
                                    footerViewportWidth;
                                headerViewportWidth = footerViewportWidth = colContainer.getHeaderViewportWidth();

                                // Set canvas dimensions
                                ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-canvas { width: ' + canvasWidth + 'px; height: ' + canvasHeight + 'px; }';

                                ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-header-canvas { width: ' + (canvasWidth + grid.scrollbarWidth) + 'px; }';

                                if (renderContainer.explicitHeaderCanvasHeight) {
                                    ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-header-canvas { height: ' + renderContainer.explicitHeaderCanvasHeight + 'px; }';
                                }
                                else {
                                    ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-header-canvas { height: inherit; }';
                                }

                                ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-viewport { width: ' + viewportWidth + 'px; height: ' + viewportHeight + 'px; }';
                                ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-header-viewport { width: ' + headerViewportWidth + 'px; }';

                                ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-footer-canvas { width: ' + (canvasWidth + grid.scrollbarWidth) + 'px; }';
                                ret += '\n .grid' + uiGridCtrl.grid.id + ' .ui-grid-render-container-' + $scope.containerId + ' .ui-grid-footer-viewport { width: ' + footerViewportWidth + 'px; }';

                                return ret;
                            }

                            uiGridCtrl.grid.registerStyleComputation({
                                priority: 6,
                                func: update
                            });
                        }
                    };
                }
            };

        }]);

    module.controller('uiGridRenderContainer', ['$scope', 'gridUtil', function ($scope, gridUtil) {

    }]);

})();

(function(){
    'use strict';

    angular.module('ui.grid').directive('uiGridRow', ['gridUtil', function(gridUtil) {
        return {
            replace: true,
            // priority: 2001,
            // templateUrl: 'ui-grid/ui-grid-row',
            require: ['^uiGrid', '^uiGridRenderContainer'],
            scope: {
                row: '=uiGridRow',
                //rowRenderIndex is added to scope to give the true visual index of the row to any directives that need it
                rowRenderIndex: '='
            },
            compile: function() {
                return {
                    pre: function($scope, $elm, $attrs, controllers) {
                        var uiGridCtrl = controllers[0];
                        var containerCtrl = controllers[1];

                        var grid = uiGridCtrl.grid;

                        $scope.grid = uiGridCtrl.grid;
                        $scope.colContainer = containerCtrl.colContainer;

                        // Function for attaching the template to this scope
                        var clonedElement, cloneScope;
                        function compileTemplate() {
                            $scope.row.getRowTemplateFn.then(function (compiledElementFn) {
                                // var compiledElementFn = $scope.row.compiledElementFn;

                                // Create a new scope for the contents of this row, so we can destroy it later if need be
                                var newScope = $scope.$new();

                                compiledElementFn(newScope, function (newElm, scope) {
                                    // If we already have a cloned element, we need to remove it and destroy its scope
                                    if (clonedElement) {
                                        clonedElement.remove();
                                        cloneScope.$destroy();
                                    }

                                    // Empty the row and append the new element
                                    $elm.empty().append(newElm);

                                    // Save the new cloned element and scope
                                    clonedElement = newElm;
                                    cloneScope = newScope;
                                });
                            }).catch(angular.noop);
                        }

                        // Initially attach the compiled template to this scope
                        compileTemplate();

                        // If the row's compiled element function changes, we need to replace this element's contents with the new compiled template
                        $scope.$watch('row.getRowTemplateFn', function (newFunc, oldFunc) {
                            if (newFunc !== oldFunc) {
                                compileTemplate();
                            }
                        });
                    },
                    post: function($scope, $elm, $attrs, controllers) {

                    }
                };
            }
        };
    }]);

})();

(function(){
// 'use strict';

    /**
     * @ngdoc directive
     * @name ui.grid.directive:uiGridStyle
     * @element style
     * @restrict A
     *
     * @description
     * Allows us to interpolate expressions in `<style>` elements. Angular doesn't do this by default as it can/will/might? break in IE8.
     *
     * @example
     <doc:example module="app">
     <doc:source>
     <script>
     var app = angular.module('app', ['ui.grid']);

     app.controller('MainCtrl', ['$scope', function ($scope) {
          $scope.myStyle = '.blah { border: 1px solid }';
        }]);
     </script>

     <div ng-controller="MainCtrl">
     <style ui-grid-style>{{ myStyle }}</style>
     <span class="blah">I am in a box.</span>
     </div>
     </doc:source>
     <doc:scenario>
     it('should apply the right class to the element', function () {
        element(by.css('.blah')).getCssValue('border-top-width')
          .then(function(c) {
            expect(c).toContain('1px');
          });
      });
     </doc:scenario>
     </doc:example>
     */


    angular.module('ui.grid').directive('uiGridStyle', ['gridUtil', '$interpolate', function(gridUtil, $interpolate) {
        return {
            // restrict: 'A',
            // priority: 1000,
            // require: '?^uiGrid',
            link: function($scope, $elm, $attrs, uiGridCtrl) {
                // gridUtil.logDebug('ui-grid-style link');
                // if (uiGridCtrl === undefined) {
                //    gridUtil.logWarn('[ui-grid-style link] uiGridCtrl is undefined!');
                // }

                var interpolateFn = $interpolate($elm.text(), true);

                if (interpolateFn) {
                    $scope.$watch(interpolateFn, function(value) {
                        $elm.text(value);
                    });
                }

                // uiGridCtrl.recalcRowStyles = function() {
                //   var offset = (scope.options.offsetTop || 0) - (scope.options.excessRows * scope.options.rowHeight);
                //   var rowHeight = scope.options.rowHeight;

                //   var ret = '';
                //   var rowStyleCount = uiGridCtrl.minRowsToRender() + (scope.options.excessRows * 2);
                //   for (var i = 1; i <= rowStyleCount; i++) {
                //     ret = ret + ' .grid' + scope.gridId + ' .ui-grid-row:nth-child(' + i + ') { top: ' + offset + 'px; }';
                //     offset = offset + rowHeight;
                //   }

                //   scope.rowStyles = ret;
                // };

                // uiGridCtrl.styleComputions.push(uiGridCtrl.recalcRowStyles);

            }
        };
    }]);

})();

(function(){
    'use strict';

    angular.module('ui.grid').directive('uiGridViewport', ['gridUtil','ScrollEvent','uiGridConstants', '$log',
        function(gridUtil, ScrollEvent, uiGridConstants, $log) {
            return {
                replace: true,
                scope: {},
                controllerAs: 'Viewport',
                templateUrl: 'ui-grid/uiGridViewport',
                require: ['^uiGrid', '^uiGridRenderContainer'],
                link: function($scope, $elm, $attrs, controllers) {
                    // gridUtil.logDebug('viewport post-link');

                    var uiGridCtrl = controllers[0];
                    var containerCtrl = controllers[1];

                    $scope.containerCtrl = containerCtrl;

                    var rowContainer = containerCtrl.rowContainer;
                    var colContainer = containerCtrl.colContainer;

                    var grid = uiGridCtrl.grid;

                    $scope.grid = uiGridCtrl.grid;

                    // Put the containers in scope so we can get rows and columns from them
                    $scope.rowContainer = containerCtrl.rowContainer;
                    $scope.colContainer = containerCtrl.colContainer;

                    // Register this viewport with its container
                    containerCtrl.viewport = $elm;

                    /**
                     * @ngdoc function
                     * @name customScroller
                     * @methodOf ui.grid.class:GridOptions
                     * @description (optional) uiGridViewport.on('scroll', scrollHandler) by default.
                     * A function that allows you to provide your own scroller function. It is particularly helpful if you want to use third party scrollers
                     * as this allows you to do that.
                     *
                     * <div class="alert alert-info" role="alert"> <strong>NOTE:</strong> It is important to remember to always pass in an event object to
                     * the scrollHandler as the grid scrolling behavior will break without it.</div>
                     * <h5>Example</h5>
                     * <pre>
                     *   $scope.gridOptions = {
           *       customScroller: function myScrolling(uiGridViewport, scrollHandler) {
           *           uiGridViewport.on('scroll', function myScrollingOverride(event) {
           *               // Do something here
           *
           *               scrollHandler(event);
           *           });
           *       }
           *   };
                     * </pre>
                     * @param {object} uiGridViewport Element being scrolled. (this gets passed in by the grid).
                     * @param {function} scrollHandler Function that needs to be called when scrolling happens. (this gets passed in by the grid).
                     */
                    if (grid && grid.options && grid.options.customScroller) {
                        grid.options.customScroller($elm, scrollHandler);
                    } else {
                        $elm.on('scroll', scrollHandler);
                    }

                    var ignoreScroll = false;

                    function scrollHandler(evt) {
                        //Leaving in this commented code in case it can someday be used
                        //It does improve performance, but because the horizontal scroll is normalized,
                        //  using this code will lead to the column header getting slightly out of line with columns
                        //
                        //if (ignoreScroll && (grid.isScrollingHorizontally || grid.isScrollingHorizontally)) {
                        //  //don't ask for scrollTop if we just set it
                        //  ignoreScroll = false;
                        //  return;
                        //}
                        //ignoreScroll = true;

                        var newScrollTop = $elm[0].scrollTop;
                        var newScrollLeft = gridUtil.normalizeScrollLeft($elm, grid);

                        var vertScrollPercentage = rowContainer.scrollVertical(newScrollTop);
                        var horizScrollPercentage = colContainer.scrollHorizontal(newScrollLeft);

                        var scrollEvent = new ScrollEvent(grid, rowContainer, colContainer, ScrollEvent.Sources.ViewPortScroll);
                        scrollEvent.newScrollLeft = newScrollLeft;
                        scrollEvent.newScrollTop = newScrollTop;
                        if ( horizScrollPercentage > -1 ){
                            scrollEvent.x = { percentage: horizScrollPercentage };
                        }

                        if ( vertScrollPercentage > -1 ){
                            scrollEvent.y = { percentage: vertScrollPercentage };
                        }

                        grid.scrollContainers($scope.$parent.containerId, scrollEvent);
                    }

                    if ($scope.$parent.bindScrollVertical) {
                        grid.addVerticalScrollSync($scope.$parent.containerId, syncVerticalScroll);
                    }

                    if ($scope.$parent.bindScrollHorizontal) {
                        grid.addHorizontalScrollSync($scope.$parent.containerId, syncHorizontalScroll);
                        grid.addHorizontalScrollSync($scope.$parent.containerId + 'header', syncHorizontalHeader);
                        grid.addHorizontalScrollSync($scope.$parent.containerId + 'footer', syncHorizontalFooter);
                    }

                    function syncVerticalScroll(scrollEvent){
                        containerCtrl.prevScrollArgs = scrollEvent;
                        var newScrollTop = scrollEvent.getNewScrollTop(rowContainer,containerCtrl.viewport);
                        $elm[0].scrollTop = newScrollTop;

                    }

                    function syncHorizontalScroll(scrollEvent){
                        containerCtrl.prevScrollArgs = scrollEvent;
                        var newScrollLeft = scrollEvent.getNewScrollLeft(colContainer, containerCtrl.viewport);
                        $elm[0].scrollLeft =  gridUtil.denormalizeScrollLeft(containerCtrl.viewport,newScrollLeft, grid);
                    }

                    function syncHorizontalHeader(scrollEvent){
                        var newScrollLeft = scrollEvent.getNewScrollLeft(colContainer, containerCtrl.viewport);
                        if (containerCtrl.headerViewport) {
                            containerCtrl.headerViewport.scrollLeft = gridUtil.denormalizeScrollLeft(containerCtrl.viewport,newScrollLeft, grid);
                        }
                    }

                    function syncHorizontalFooter(scrollEvent){
                        var newScrollLeft = scrollEvent.getNewScrollLeft(colContainer, containerCtrl.viewport);
                        if (containerCtrl.footerViewport) {
                            containerCtrl.footerViewport.scrollLeft =  gridUtil.denormalizeScrollLeft(containerCtrl.viewport,newScrollLeft, grid);
                        }
                    }

                    $scope.$on('$destroy', function unbindEvents() {
                        $elm.off();
                    });
                },
                controller: ['$scope', function ($scope) {
                    this.rowStyle = function (index) {
                        var rowContainer = $scope.rowContainer;
                        var colContainer = $scope.colContainer;

                        var styles = {};

                        if (rowContainer.currentTopRow !== 0){
                            //top offset based on hidden rows count
                            var translateY = "translateY("+ (rowContainer.currentTopRow * rowContainer.grid.options.rowHeight)  +"px)";
                            styles['transform'] = translateY;
                            styles['-webkit-transform'] = translateY;
                            styles['-ms-transform'] = translateY;
                        }

                        if (colContainer.currentFirstColumn !== 0) {
                            if (colContainer.grid.isRTL()) {
                                styles['margin-right'] = colContainer.columnOffset + 'px';
                            }
                            else {
                                styles['margin-left'] = colContainer.columnOffset + 'px';
                            }
                        }

                        return styles;
                    };
                }]
            };
        }
    ]);

})();

(function() {

    angular.module('ui.grid')
        .directive('uiGridVisible', function uiGridVisibleAction() {
            return function ($scope, $elm, $attr) {
                $scope.$watch($attr.uiGridVisible, function (visible) {
                    // $elm.css('visibility', visible ? 'visible' : 'hidden');
                    $elm[visible ? 'removeClass' : 'addClass']('ui-grid-invisible');
                });
            };
        });

})();
(function () {
    'use strict';

    angular.module('ui.grid').controller('uiGridController', ['$scope', '$element', '$attrs', 'gridUtil', '$q', 'uiGridConstants',
        'gridClassFactory', '$parse', '$compile',
        function ($scope, $elm, $attrs, gridUtil, $q, uiGridConstants,
                  gridClassFactory, $parse, $compile) {
            // gridUtil.logDebug('ui-grid controller');
            var self = this;
            var deregFunctions = [];

            self.grid = gridClassFactory.createGrid($scope.uiGrid);

            //assign $scope.$parent if appScope not already assigned
            self.grid.appScope = self.grid.appScope || $scope.$parent;

            $elm.addClass('grid' + self.grid.id);
            self.grid.rtl = gridUtil.getStyles($elm[0])['direction'] === 'rtl';


            // angular.extend(self.grid.options, );

            //all properties of grid are available on scope
            $scope.grid = self.grid;

            if ($attrs.uiGridColumns) {
                deregFunctions.push( $attrs.$observe('uiGridColumns', function(value) {
                    self.grid.options.columnDefs = angular.isString(value) ? angular.fromJson(value) : value;
                    self.grid.buildColumns()
                        .then(function(){
                            self.grid.preCompileCellTemplates();

                            self.grid.refreshCanvas(true);
                        }).catch(angular.noop);
                }) );
            }

            // prevents an error from being thrown when the array is not defined yet and fastWatch is on
            function getSize(array) {
                return array ? array.length : 0;
            }

            // if fastWatch is set we watch only the length and the reference, not every individual object
            if (self.grid.options.fastWatch) {
                self.uiGrid = $scope.uiGrid;
                if (angular.isString($scope.uiGrid.data)) {
                    deregFunctions.push( $scope.$parent.$watch($scope.uiGrid.data, dataWatchFunction) );
                    deregFunctions.push( $scope.$parent.$watch(function() {
                        if ( self.grid.appScope[$scope.uiGrid.data] ){
                            return self.grid.appScope[$scope.uiGrid.data].length;
                        } else {
                            return undefined;
                        }
                    }, dataWatchFunction) );
                } else {
                    deregFunctions.push( $scope.$parent.$watch(function() { return $scope.uiGrid.data; }, dataWatchFunction) );
                    deregFunctions.push( $scope.$parent.$watch(function() { return getSize($scope.uiGrid.data); }, function(){ dataWatchFunction($scope.uiGrid.data); }) );
                }
                deregFunctions.push( $scope.$parent.$watch(function() { return $scope.uiGrid.columnDefs; }, columnDefsWatchFunction) );
                deregFunctions.push( $scope.$parent.$watch(function() { return getSize($scope.uiGrid.columnDefs); }, function(){ columnDefsWatchFunction($scope.uiGrid.columnDefs); }) );
            } else {
                if (angular.isString($scope.uiGrid.data)) {
                    deregFunctions.push( $scope.$parent.$watchCollection($scope.uiGrid.data, dataWatchFunction) );
                } else {
                    deregFunctions.push( $scope.$parent.$watchCollection(function() { return $scope.uiGrid.data; }, dataWatchFunction) );
                }
                deregFunctions.push( $scope.$parent.$watchCollection(function() { return $scope.uiGrid.columnDefs; }, columnDefsWatchFunction) );
            }


            function columnDefsWatchFunction(n, o) {
                if (n && n !== o) {
                    self.grid.options.columnDefs = $scope.uiGrid.columnDefs;
                    self.grid.callDataChangeCallbacks(uiGridConstants.dataChange.COLUMN, {
                        orderByColumnDefs: true,
                        preCompileCellTemplates: true
                    });
                }
            }

            var mostRecentData;

            function dataWatchFunction(newData) {
                // gridUtil.logDebug('dataWatch fired');
                var promises = [];

                if (angular.isString($scope.uiGrid.data)) {
                    newData = self.grid.appScope[$scope.uiGrid.data];
                } else {
                    newData = $scope.uiGrid.data;
                }

                mostRecentData = newData;

                if (newData) {
                    // columns length is greater than the number of row header columns, which don't count because they're created automatically
                    var hasColumns = self.grid.columns.length > (self.grid.rowHeaderColumns ? self.grid.rowHeaderColumns.length : 0);

                    if (
                        // If we have no columns
                    !hasColumns &&
                    // ... and we don't have a ui-grid-columns attribute, which would define columns for us
                    !$attrs.uiGridColumns &&
                    // ... and we have no pre-defined columns
                    self.grid.options.columnDefs.length === 0 &&
                    // ... but we DO have data
                    newData.length > 0
                    ) {
                        // ... then build the column definitions from the data that we have
                        self.grid.buildColumnDefsFromData(newData);
                    }

                    // If we haven't built columns before and either have some columns defined or some data defined
                    if (!hasColumns && (self.grid.options.columnDefs.length > 0 || newData.length > 0)) {
                        // Build the column set, then pre-compile the column cell templates
                        promises.push(self.grid.buildColumns()
                            .then(function() {
                                self.grid.preCompileCellTemplates();
                            }).catch(angular.noop));
                    }

                    $q.all(promises).then(function() {
                        // use most recent data, rather than the potentially outdated data passed into watcher handler
                        self.grid.modifyRows(mostRecentData)
                            .then(function () {
                                // if (self.viewport) {
                                self.grid.redrawInPlace(true);
                                // }

                                $scope.$evalAsync(function() {
                                    self.grid.refreshCanvas(true);
                                    self.grid.callDataChangeCallbacks(uiGridConstants.dataChange.ROW);
                                });
                            }).catch(angular.noop);
                    }).catch(angular.noop);
                }
            }

            var styleWatchDereg = $scope.$watch(function () { return self.grid.styleComputations; }, function() {
                self.grid.refreshCanvas(true);
            });

            $scope.$on('$destroy', function() {
                deregFunctions.forEach( function( deregFn ){ deregFn(); });
                styleWatchDereg();
            });

            self.fireEvent = function(eventName, args) {
                args = args || {};

                // Add the grid to the event arguments if it's not there
                if (angular.isUndefined(args.grid)) {
                    args.grid = self.grid;
                }

                $scope.$broadcast(eventName, args);
            };

            self.innerCompile = function innerCompile(elm) {
                $compile(elm)($scope);
            };
        }]);

    /**
     *  @ngdoc directive
     *  @name ui.grid.directive:uiGrid
     *  @element div
     *  @restrict EA
     *  @param {Object} uiGrid Options for the grid to use
     *
     *  @description Create a very basic grid.
     *
     *  @example
     <example module="app">
     <file name="app.js">
     var app = angular.module('app', ['ui.grid']);

     app.controller('MainCtrl', ['$scope', function ($scope) {
          $scope.data = [
            { name: 'Bob', title: 'CEO' },
            { name: 'Frank', title: 'Lowly Developer' }
          ];
        }]);
     </file>
     <file name="index.html">
     <div ng-controller="MainCtrl">
     <div ui-grid="{ data: data }"></div>
     </div>
     </file>
     </example>
     */
    angular.module('ui.grid').directive('uiGrid', uiGridDirective);

    uiGridDirective.$inject = ['$window', 'gridUtil', 'uiGridConstants'];
    function uiGridDirective($window, gridUtil, uiGridConstants) {
        return {
            templateUrl: 'ui-grid/ui-grid',
            scope: {
                uiGrid: '='
            },
            replace: true,
            transclude: true,
            controller: 'uiGridController',
            compile: function () {
                return {
                    post: function ($scope, $elm, $attrs, uiGridCtrl) {
                        var grid = uiGridCtrl.grid;
                        // Initialize scrollbars (TODO: move to controller??)
                        uiGridCtrl.scrollbars = [];
                        grid.element = $elm;


                        // See if the grid has a rendered width, if not, wait a bit and try again
                        var sizeCheckInterval = 100; // ms
                        var maxSizeChecks = 20; // 2 seconds total
                        var sizeChecks = 0;

                        // Setup (event listeners) the grid
                        setup();

                        // And initialize it
                        init();

                        // Mark rendering complete so API events can happen
                        grid.renderingComplete();

                        // If the grid doesn't have size currently, wait for a bit to see if it gets size
                        checkSize();

                        /*-- Methods --*/

                        function checkSize() {
                            // If the grid has no width and we haven't checked more than <maxSizeChecks> times, check again in <sizeCheckInterval> milliseconds
                            if ($elm[0].offsetWidth <= 0 && sizeChecks < maxSizeChecks) {
                                setTimeout(checkSize, sizeCheckInterval);
                                sizeChecks++;
                            } else {
                                $scope.$applyAsync(init);
                            }
                        }

                        // Setup event listeners and watchers
                        function setup() {
                            var deregisterLeftWatcher, deregisterRightWatcher;

                            // Bind to window resize events
                            angular.element($window).on('resize', gridResize);

                            // Unbind from window resize events when the grid is destroyed
                            $elm.on('$destroy', function () {
                                angular.element($window).off('resize', gridResize);
                                deregisterLeftWatcher();
                                deregisterRightWatcher();
                            });

                            // If we add a left container after render, we need to watch and react
                            deregisterLeftWatcher = $scope.$watch(function () { return grid.hasLeftContainer();}, function (newValue, oldValue) {
                                if (newValue === oldValue) {
                                    return;
                                }
                                grid.refreshCanvas(true);
                            });

                            // If we add a right container after render, we need to watch and react
                            deregisterRightWatcher = $scope.$watch(function () { return grid.hasRightContainer();}, function (newValue, oldValue) {
                                if (newValue === oldValue) {
                                    return;
                                }
                                grid.refreshCanvas(true);
                            });
                        }

                        // Initialize the directive
                        function init() {
                            grid.gridWidth = $scope.gridWidth = gridUtil.elementWidth($elm);

                            // Default canvasWidth to the grid width, in case we don't get any column definitions to calculate it from
                            grid.canvasWidth = uiGridCtrl.grid.gridWidth;

                            grid.gridHeight = $scope.gridHeight = gridUtil.elementHeight($elm);

                            // If the grid isn't tall enough to fit a single row, it's kind of useless. Resize it to fit a minimum number of rows
                            if (grid.gridHeight <= grid.options.rowHeight && grid.options.enableMinHeightCheck) {
                                autoAdjustHeight();
                            }

                            // Run initial canvas refresh
                            grid.refreshCanvas(true);
                        }

                        // Set the grid's height ourselves in the case that its height would be unusably small
                        function autoAdjustHeight() {
                            // Figure out the new height
                            var contentHeight = grid.options.minRowsToShow * grid.options.rowHeight;
                            var headerHeight = grid.options.showHeader ? grid.options.headerRowHeight : 0;
                            var footerHeight = grid.calcFooterHeight();

                            var scrollbarHeight = 0;
                            if (grid.options.enableHorizontalScrollbar === uiGridConstants.scrollbars.ALWAYS) {
                                scrollbarHeight = gridUtil.getScrollbarWidth();
                            }

                            var maxNumberOfFilters = 0;
                            // Calculates the maximum number of filters in the columns
                            angular.forEach(grid.options.columnDefs, function(col) {
                                if (col.hasOwnProperty('filter')) {
                                    if (maxNumberOfFilters < 1) {
                                        maxNumberOfFilters = 1;
                                    }
                                }
                                else if (col.hasOwnProperty('filters')) {
                                    if (maxNumberOfFilters < col.filters.length) {
                                        maxNumberOfFilters = col.filters.length;
                                    }
                                }
                            });

                            if (grid.options.enableFiltering  && !maxNumberOfFilters) {
                                var allColumnsHaveFilteringTurnedOff = grid.options.columnDefs.length && grid.options.columnDefs.every(function(col) {
                                        return col.enableFiltering === false;
                                    });

                                if (!allColumnsHaveFilteringTurnedOff) {
                                    maxNumberOfFilters = 1;
                                }
                            }

                            var filterHeight = maxNumberOfFilters * headerHeight;

                            var newHeight = headerHeight + contentHeight + footerHeight + scrollbarHeight + filterHeight;

                            $elm.css('height', newHeight + 'px');

                            grid.gridHeight = $scope.gridHeight = gridUtil.elementHeight($elm);
                        }

                        // Resize the grid on window resize events
                        function gridResize() {
                            grid.gridWidth = $scope.gridWidth = gridUtil.elementWidth($elm);
                            grid.gridHeight = $scope.gridHeight = gridUtil.elementHeight($elm);

                            grid.refreshCanvas(true);
                        }
                    }
                };
            }
        };
    }
})();

(function(){
    'use strict';

    // TODO: rename this file to ui-grid-pinned-container.js

    angular.module('ui.grid').directive('uiGridPinnedContainer', ['gridUtil', function (gridUtil) {
        return {
            restrict: 'EA',
            replace: true,
            template: '<div class="ui-grid-pinned-container"><div ui-grid-render-container container-id="side" row-container-name="\'body\'" col-container-name="side" bind-scroll-vertical="true" class="{{ side }} ui-grid-render-container-{{ side }}"></div></div>',
            scope: {
                side: '=uiGridPinnedContainer'
            },
            require: '^uiGrid',
            compile: function compile() {
                return {
                    post: function ($scope, $elm, $attrs, uiGridCtrl) {
                        // gridUtil.logDebug('ui-grid-pinned-container ' + $scope.side + ' link');

                        var grid = uiGridCtrl.grid;

                        var myWidth = 0;

                        $elm.addClass('ui-grid-pinned-container-' + $scope.side);

                        // Monkey-patch the viewport width function
                        if ($scope.side === 'left' || $scope.side === 'right') {
                            grid.renderContainers[$scope.side].getViewportWidth = monkeyPatchedGetViewportWidth;
                        }

                        function monkeyPatchedGetViewportWidth() {
                            /*jshint validthis: true */
                            var self = this;

                            var viewportWidth = 0;
                            self.visibleColumnCache.forEach(function (column) {
                                viewportWidth += column.drawnWidth;
                            });

                            var adjustment = self.getViewportAdjustment();

                            viewportWidth = viewportWidth + adjustment.width;

                            return viewportWidth;
                        }

                        function updateContainerWidth() {
                            if ($scope.side === 'left' || $scope.side === 'right') {
                                var cols = grid.renderContainers[$scope.side].visibleColumnCache;
                                var width = 0;
                                for (var i = 0; i < cols.length; i++) {
                                    var col = cols[i];
                                    width += col.drawnWidth || col.width || 0;
                                }

                                return width;
                            }
                        }

                        function updateContainerDimensions() {
                            var ret = '';

                            // Column containers
                            if ($scope.side === 'left' || $scope.side === 'right') {
                                myWidth = updateContainerWidth();

                                // gridUtil.logDebug('myWidth', myWidth);

                                // TODO(c0bra): Subtract sum of col widths from grid viewport width and update it
                                $elm.attr('style', null);

                                //   var myHeight = grid.renderContainers.body.getViewportHeight(); // + grid.horizontalScrollbarHeight;

                                ret += '.grid' + grid.id + ' .ui-grid-pinned-container-' + $scope.side + ', .grid' + grid.id + ' .ui-grid-pinned-container-' + $scope.side + ' .ui-grid-render-container-' + $scope.side + ' .ui-grid-viewport { width: ' + myWidth + 'px; } ';
                            }

                            return ret;
                        }

                        grid.renderContainers.body.registerViewportAdjuster(function (adjustment) {
                            myWidth = updateContainerWidth();

                            // Subtract our own width
                            adjustment.width -= myWidth;
                            adjustment.side = $scope.side;

                            return adjustment;
                        });

                        // Register style computation to adjust for columns in `side`'s render container
                        grid.registerStyleComputation({
                            priority: 15,
                            func: updateContainerDimensions
                        });
                    }
                };
            }
        };
    }]);
})();

(function(){

    angular.module('ui.grid')
        .factory('Grid', ['$q', '$compile', '$parse', 'gridUtil', 'uiGridConstants', 'GridOptions', 'GridColumn', 'GridRow', 'GridApi', 'rowSorter', 'rowSearcher', 'GridRenderContainer', '$timeout','ScrollEvent',
            function($q, $compile, $parse, gridUtil, uiGridConstants, GridOptions, GridColumn, GridRow, GridApi, rowSorter, rowSearcher, GridRenderContainer, $timeout, ScrollEvent) {

                /**
                 * @ngdoc object
                 * @name ui.grid.core.api:PublicApi
                 * @description Public Api for the core grid features
                 *
                 */

                /**
                 * @ngdoc function
                 * @name ui.grid.class:Grid
                 * @description Grid is the main viewModel.  Any properties or methods needed to maintain state are defined in
                 * this prototype.  One instance of Grid is created per Grid directive instance.
                 * @param {object} options Object map of options to pass into the grid. An 'id' property is expected.
                 */
                var Grid = function Grid(options) {
                    var self = this;
                    // Get the id out of the options, then remove it
                    if (options !== undefined && typeof(options.id) !== 'undefined' && options.id) {
                        if (!/^[_a-zA-Z0-9-]+$/.test(options.id)) {
                            throw new Error("Grid id '" + options.id + '" is invalid. It must follow CSS selector syntax rules.');
                        }
                    }
                    else {
                        throw new Error('No ID provided. An ID must be given when creating a grid.');
                    }

                    self.id = options.id;
                    delete options.id;

                    // Get default options
                    self.options = GridOptions.initialize( options );

                    /**
                     * @ngdoc object
                     * @name appScope
                     * @propertyOf ui.grid.class:Grid
                     * @description reference to the application scope (the parent scope of the ui-grid element).  Assigned in ui-grid controller
                     * <br/>
                     * use gridOptions.appScopeProvider to override the default assignment of $scope.$parent with any reference
                     */
                    self.appScope = self.options.appScopeProvider;

                    self.headerHeight = self.options.headerRowHeight;


                    /**
                     * @ngdoc object
                     * @name footerHeight
                     * @propertyOf ui.grid.class:Grid
                     * @description returns the total footer height gridFooter + columnFooter
                     */
                    self.footerHeight = self.calcFooterHeight();


                    /**
                     * @ngdoc object
                     * @name columnFooterHeight
                     * @propertyOf ui.grid.class:Grid
                     * @description returns the total column footer height
                     */
                    self.columnFooterHeight = self.calcColumnFooterHeight();

                    self.rtl = false;
                    self.gridHeight = 0;
                    self.gridWidth = 0;
                    self.columnBuilders = [];
                    self.rowBuilders = [];
                    self.rowsProcessors = [];
                    self.columnsProcessors = [];
                    self.styleComputations = [];
                    self.viewportAdjusters = [];
                    self.rowHeaderColumns = [];
                    self.dataChangeCallbacks = {};
                    self.verticalScrollSyncCallBackFns = {};
                    self.horizontalScrollSyncCallBackFns = {};

                    // self.visibleRowCache = [];

                    // Set of 'render' containers for self grid, which can render sets of rows
                    self.renderContainers = {};

                    // Create a
                    self.renderContainers.body = new GridRenderContainer('body', self);

                    self.cellValueGetterCache = {};

                    // Cached function to use with custom row templates
                    self.getRowTemplateFn = null;


                    //representation of the rows on the grid.
                    //these are wrapped references to the actual data rows (options.data)
                    self.rows = [];

                    //represents the columns on the grid
                    self.columns = [];

                    /**
                     * @ngdoc boolean
                     * @name isScrollingVertically
                     * @propertyOf ui.grid.class:Grid
                     * @description set to true when Grid is scrolling vertically. Set to false via debounced method
                     */
                    self.isScrollingVertically = false;

                    /**
                     * @ngdoc boolean
                     * @name isScrollingHorizontally
                     * @propertyOf ui.grid.class:Grid
                     * @description set to true when Grid is scrolling horizontally. Set to false via debounced method
                     */
                    self.isScrollingHorizontally = false;

                    /**
                     * @ngdoc property
                     * @name scrollDirection
                     * @propertyOf ui.grid.class:Grid
                     * @description set one of the {@link ui.grid.service:uiGridConstants#properties_scrollDirection uiGridConstants.scrollDirection}
                     *  values (UP, DOWN, LEFT, RIGHT, NONE), which tells us which direction we are scrolling.
                     * Set to NONE via debounced method
                     */
                    self.scrollDirection = uiGridConstants.scrollDirection.NONE;

                    //if true, grid will not respond to any scroll events
                    self.disableScrolling = false;


                    function vertical (scrollEvent) {
                        self.isScrollingVertically = false;
                        self.api.core.raise.scrollEnd(scrollEvent);
                        self.scrollDirection = uiGridConstants.scrollDirection.NONE;
                    }

                    var debouncedVertical = gridUtil.debounce(vertical, self.options.scrollDebounce);
                    var debouncedVerticalMinDelay = gridUtil.debounce(vertical, 0);

                    function horizontal (scrollEvent) {
                        self.isScrollingHorizontally = false;
                        self.api.core.raise.scrollEnd(scrollEvent);
                        self.scrollDirection = uiGridConstants.scrollDirection.NONE;
                    }

                    var debouncedHorizontal = gridUtil.debounce(horizontal, self.options.scrollDebounce);
                    var debouncedHorizontalMinDelay = gridUtil.debounce(horizontal, 0);


                    /**
                     * @ngdoc function
                     * @name flagScrollingVertically
                     * @methodOf ui.grid.class:Grid
                     * @description sets isScrollingVertically to true and sets it to false in a debounced function
                     */
                    self.flagScrollingVertically = function(scrollEvent) {
                        if (!self.isScrollingVertically && !self.isScrollingHorizontally) {
                            self.api.core.raise.scrollBegin(scrollEvent);
                        }
                        self.isScrollingVertically = true;
                        if (self.options.scrollDebounce === 0 || !scrollEvent.withDelay) {
                            debouncedVerticalMinDelay(scrollEvent);
                        }
                        else {
                            debouncedVertical(scrollEvent);
                        }
                    };

                    /**
                     * @ngdoc function
                     * @name flagScrollingHorizontally
                     * @methodOf ui.grid.class:Grid
                     * @description sets isScrollingHorizontally to true and sets it to false in a debounced function
                     */
                    self.flagScrollingHorizontally = function(scrollEvent) {
                        if (!self.isScrollingVertically && !self.isScrollingHorizontally) {
                            self.api.core.raise.scrollBegin(scrollEvent);
                        }
                        self.isScrollingHorizontally = true;
                        if (self.options.scrollDebounce === 0 || !scrollEvent.withDelay) {
                            debouncedHorizontalMinDelay(scrollEvent);
                        }
                        else {
                            debouncedHorizontal(scrollEvent);
                        }
                    };

                    self.scrollbarHeight = 0;
                    self.scrollbarWidth = 0;
                    if (self.options.enableHorizontalScrollbar === uiGridConstants.scrollbars.ALWAYS) {
                        self.scrollbarHeight = gridUtil.getScrollbarWidth();
                    }

                    if (self.options.enableVerticalScrollbar === uiGridConstants.scrollbars.ALWAYS) {
                        self.scrollbarWidth = gridUtil.getScrollbarWidth();
                    }



                    self.api = new GridApi(self);

                    /**
                     * @ngdoc function
                     * @name refresh
                     * @methodOf ui.grid.core.api:PublicApi
                     * @description Refresh the rendered grid on screen.
                     * The refresh method re-runs both the columnProcessors and the
                     * rowProcessors, as well as calling refreshCanvas to update all
                     * the grid sizing.  In general you should prefer to use queueGridRefresh
                     * instead, which is basically a debounced version of refresh.
                     *
                     * If you only want to resize the grid, not regenerate all the rows
                     * and columns, you should consider directly calling refreshCanvas instead.
                     *
                     * @param {boolean} [rowsAltered] Optional flag for refreshing when the number of rows has changed
                     */
                    self.api.registerMethod( 'core', 'refresh', this.refresh );

                    /**
                     * @ngdoc function
                     * @name queueGridRefresh
                     * @methodOf ui.grid.core.api:PublicApi
                     * @description Request a refresh of the rendered grid on screen, if multiple
                     * calls to queueGridRefresh are made within a digest cycle only one will execute.
                     * The refresh method re-runs both the columnProcessors and the
                     * rowProcessors, as well as calling refreshCanvas to update all
                     * the grid sizing.  In general you should prefer to use queueGridRefresh
                     * instead, which is basically a debounced version of refresh.
                     *
                     */
                    self.api.registerMethod( 'core', 'queueGridRefresh', this.queueGridRefresh );

                    /**
                     * @ngdoc function
                     * @name refreshRows
                     * @methodOf ui.grid.core.api:PublicApi
                     * @description Runs only the rowProcessors, columns remain as they were.
                     * It then calls redrawInPlace and refreshCanvas, which adjust the grid sizing.
                     * @returns {promise} promise that is resolved when render completes?
                     *
                     */
                    self.api.registerMethod( 'core', 'refreshRows', this.refreshRows );

                    /**
                     * @ngdoc function
                     * @name queueRefresh
                     * @methodOf ui.grid.core.api:PublicApi
                     * @description Requests execution of refreshCanvas, if multiple requests are made
                     * during a digest cycle only one will run.  RefreshCanvas updates the grid sizing.
                     * @returns {promise} promise that is resolved when render completes?
                     *
                     */
                    self.api.registerMethod( 'core', 'queueRefresh', this.queueRefresh );

                    /**
                     * @ngdoc function
                     * @name handleWindowResize
                     * @methodOf ui.grid.core.api:PublicApi
                     * @description Trigger a grid resize, normally this would be picked
                     * up by a watch on window size, but in some circumstances it is necessary
                     * to call this manually
                     * @returns {promise} promise that is resolved when render completes?
                     *
                     */
                    self.api.registerMethod( 'core', 'handleWindowResize', this.handleWindowResize );


                    /**
                     * @ngdoc function
                     * @name addRowHeaderColumn
                     * @methodOf ui.grid.core.api:PublicApi
                     * @description adds a row header column to the grid
                     * @param {object} column def
                     * @param {number} order Determines order of header column on grid.  Lower order means header
                     * is positioned to the left of higher order headers
                     *
                     */
                    self.api.registerMethod( 'core', 'addRowHeaderColumn', this.addRowHeaderColumn );

                    /**
                     * @ngdoc function
                     * @name scrollToIfNecessary
                     * @methodOf ui.grid.core.api:PublicApi
                     * @description Scrolls the grid to make a certain row and column combo visible,
                     *   in the case that it is not completely visible on the screen already.
                     * @param {GridRow} gridRow row to make visible
                     * @param {GridCol} gridCol column to make visible
                     * @returns {promise} a promise that is resolved when scrolling is complete
                     *
                     */
                    self.api.registerMethod( 'core', 'scrollToIfNecessary', function(gridRow, gridCol) { return self.scrollToIfNecessary(gridRow, gridCol);} );

                    /**
                     * @ngdoc function
                     * @name scrollTo
                     * @methodOf ui.grid.core.api:PublicApi
                     * @description Scroll the grid such that the specified
                     * row and column is in view
                     * @param {object} rowEntity gridOptions.data[] array instance to make visible
                     * @param {object} colDef to make visible
                     * @returns {promise} a promise that is resolved after any scrolling is finished
                     */
                    self.api.registerMethod( 'core', 'scrollTo', function (rowEntity, colDef) { return self.scrollTo(rowEntity, colDef);}  );

                    /**
                     * @ngdoc function
                     * @name registerRowsProcessor
                     * @methodOf ui.grid.core.api:PublicApi
                     * @description
                     * Register a "rows processor" function. When the rows are updated,
                     * the grid calls each registered "rows processor", which has a chance
                     * to alter the set of rows (sorting, etc) as long as the count is not
                     * modified.
                     *
                     * @param {function(renderedRowsToProcess, columns )} processorFunction rows processor function, which
                     * is run in the context of the grid (i.e. this for the function will be the grid), and must
                     * return the updated rows list, which is passed to the next processor in the chain
                     * @param {number} priority the priority of this processor.  In general we try to do them in 100s to leave room
                     * for other people to inject rows processors at intermediate priorities.  Lower priority rowsProcessors run earlier.
                     *
                     * At present allRowsVisible is running at 50, sort manipulations running at 60-65, filter is running at 100,
                     * sort is at 200, grouping and treeview at 400-410, selectable rows at 500, pagination at 900 (pagination will generally want to be last)
                     */
                    self.api.registerMethod( 'core', 'registerRowsProcessor', this.registerRowsProcessor  );

                    /**
                     * @ngdoc function
                     * @name registerColumnsProcessor
                     * @methodOf ui.grid.core.api:PublicApi
                     * @description
                     * Register a "columns processor" function. When the columns are updated,
                     * the grid calls each registered "columns processor", which has a chance
                     * to alter the set of columns as long as the count is not
                     * modified.
                     *
                     * @param {function(renderedColumnsToProcess, rows )} processorFunction columns processor function, which
                     * is run in the context of the grid (i.e. this for the function will be the grid), and must
                     * return the updated columns list, which is passed to the next processor in the chain
                     * @param {number} priority the priority of this processor.  In general we try to do them in 100s to leave room
                     * for other people to inject columns processors at intermediate priorities.  Lower priority columnsProcessors run earlier.
                     *
                     * At present allRowsVisible is running at 50, filter is running at 100, sort is at 200, grouping at 400, selectable rows at 500, pagination at 900 (pagination will generally want to be last)
                     */
                    self.api.registerMethod( 'core', 'registerColumnsProcessor', this.registerColumnsProcessor  );



                    /**
                     * @ngdoc function
                     * @name sortHandleNulls
                     * @methodOf ui.grid.core.api:PublicApi
                     * @description A null handling method that can be used when building custom sort
                     * functions
                     * @example
                     * <pre>
                     *   mySortFn = function(a, b) {
     *   var nulls = $scope.gridApi.core.sortHandleNulls(a, b);
     *   if ( nulls !== null ){
     *     return nulls;
     *   } else {
     *     // your code for sorting here
     *   };
     * </pre>
                     * @param {object} a sort value a
                     * @param {object} b sort value b
                     * @returns {number} null if there were no nulls/undefineds, otherwise returns
                     * a sort value that should be passed back from the sort function
                     *
                     */
                    self.api.registerMethod( 'core', 'sortHandleNulls', rowSorter.handleNulls );


                    /**
                     * @ngdoc function
                     * @name sortChanged
                     * @methodOf  ui.grid.core.api:PublicApi
                     * @description The sort criteria on one or more columns has
                     * changed.  Provides as parameters the grid and the output of
                     * getColumnSorting, which is an array of gridColumns
                     * that have sorting on them, sorted in priority order.
                     *
                     * @param {$scope} scope The scope of the controller. This is used to deregister this event when the scope is destroyed.
                     * @param {Function} callBack Will be called when the event is emited. The function passes back the grid and an array of
                     * columns with sorts on them, in priority order.
                     *
                     * @example
                     * <pre>
                     *      gridApi.core.on.sortChanged( $scope, function(grid, sortColumns){
     *        // do something
     *      });
                     * </pre>
                     */
                    self.api.registerEvent( 'core', 'sortChanged' );

                    /**
                     * @ngdoc function
                     * @name columnVisibilityChanged
                     * @methodOf  ui.grid.core.api:PublicApi
                     * @description The visibility of a column has changed,
                     * the column itself is passed out as a parameter of the event.
                     *
                     * @param {$scope} scope The scope of the controller. This is used to deregister this event when the scope is destroyed.
                     * @param {Function} callBack Will be called when the event is emited. The function passes back the GridCol that has changed.
                     *
                     * @example
                     * <pre>
                     *      gridApi.core.on.columnVisibilityChanged( $scope, function (column) {
     *        // do something
     *      } );
                     * </pre>
                     */
                    self.api.registerEvent( 'core', 'columnVisibilityChanged' );

                    /**
                     * @ngdoc method
                     * @name notifyDataChange
                     * @methodOf ui.grid.core.api:PublicApi
                     * @description Notify the grid that a data or config change has occurred,
                     * where that change isn't something the grid was otherwise noticing.  This
                     * might be particularly relevant where you've changed values within the data
                     * and you'd like cell classes to be re-evaluated, or changed config within
                     * the columnDef and you'd like headerCellClasses to be re-evaluated.
                     * @param {string} type one of the
                     * {@link ui.grid.service:uiGridConstants#properties_dataChange uiGridConstants.dataChange}
                     * values (ALL, ROW, EDIT, COLUMN), which tells us which refreshes to fire.
                     *
                     */
                    self.api.registerMethod( 'core', 'notifyDataChange', this.notifyDataChange );

                    /**
                     * @ngdoc method
                     * @name clearAllFilters
                     * @methodOf ui.grid.core.api:PublicApi
                     * @description Clears all filters and optionally refreshes the visible rows.
                     * @param {object} refreshRows Defaults to true.
                     * @param {object} clearConditions Defaults to false.
                     * @param {object} clearFlags Defaults to false.
                     * @returns {promise} If `refreshRows` is true, returns a promise of the rows refreshing.
                     */
                    self.api.registerMethod('core', 'clearAllFilters', this.clearAllFilters);

                    self.registerDataChangeCallback( self.columnRefreshCallback, [uiGridConstants.dataChange.COLUMN]);
                    self.registerDataChangeCallback( self.processRowsCallback, [uiGridConstants.dataChange.EDIT]);
                    self.registerDataChangeCallback( self.updateFooterHeightCallback, [uiGridConstants.dataChange.OPTIONS]);

                    self.registerStyleComputation({
                        priority: 10,
                        func: self.getFooterStyles
                    });
                };

                Grid.prototype.calcFooterHeight = function () {
                    if (!this.hasFooter()) {
                        return 0;
                    }

                    var height = 0;
                    if (this.options.showGridFooter) {
                        height += this.options.gridFooterHeight;
                    }

                    height += this.calcColumnFooterHeight();

                    return height;
                };

                Grid.prototype.calcColumnFooterHeight = function () {
                    var height = 0;

                    if (this.options.showColumnFooter) {
                        height += this.options.columnFooterHeight;
                    }

                    return height;
                };

                Grid.prototype.getFooterStyles = function () {
                    var style = '.grid' + this.id + ' .ui-grid-footer-aggregates-row { height: ' + this.options.columnFooterHeight + 'px; }';
                    style += ' .grid' + this.id + ' .ui-grid-footer-info { height: ' + this.options.gridFooterHeight + 'px; }';
                    return style;
                };

                Grid.prototype.hasFooter = function () {
                    return this.options.showGridFooter || this.options.showColumnFooter;
                };

                /**
                 * @ngdoc function
                 * @name isRTL
                 * @methodOf ui.grid.class:Grid
                 * @description Returns true if grid is RightToLeft
                 */
                Grid.prototype.isRTL = function () {
                    return this.rtl;
                };


                /**
                 * @ngdoc function
                 * @name registerColumnBuilder
                 * @methodOf ui.grid.class:Grid
                 * @description When the build creates columns from column definitions, the columnbuilders will be called to add
                 * additional properties to the column.
                 * @param {function(colDef, col, gridOptions)} columnBuilder function to be called
                 */
                Grid.prototype.registerColumnBuilder = function registerColumnBuilder(columnBuilder) {
                    this.columnBuilders.push(columnBuilder);
                };

                /**
                 * @ngdoc function
                 * @name buildColumnDefsFromData
                 * @methodOf ui.grid.class:Grid
                 * @description Populates columnDefs from the provided data
                 * @param {function(colDef, col, gridOptions)} rowBuilder function to be called
                 */
                Grid.prototype.buildColumnDefsFromData = function (dataRows){
                    this.options.columnDefs =  gridUtil.getColumnsFromData(dataRows, this.options.excludeProperties);
                };

                /**
                 * @ngdoc function
                 * @name registerRowBuilder
                 * @methodOf ui.grid.class:Grid
                 * @description When the build creates rows from gridOptions.data, the rowBuilders will be called to add
                 * additional properties to the row.
                 * @param {function(row, gridOptions)} rowBuilder function to be called
                 */
                Grid.prototype.registerRowBuilder = function registerRowBuilder(rowBuilder) {
                    this.rowBuilders.push(rowBuilder);
                };


                /**
                 * @ngdoc function
                 * @name registerDataChangeCallback
                 * @methodOf ui.grid.class:Grid
                 * @description When a data change occurs, the data change callbacks of the specified type
                 * will be called.  The rules are:
                 *
                 * - when the data watch fires, that is considered a ROW change (the data watch only notices
                 *   added or removed rows)
                 * - when the api is called to inform us of a change, the declared type of that change is used
                 * - when a cell edit completes, the EDIT callbacks are triggered
                 * - when the columnDef watch fires, the COLUMN callbacks are triggered
                 * - when the options watch fires, the OPTIONS callbacks are triggered
                 *
                 * For a given event:
                 * - ALL calls ROW, EDIT, COLUMN, OPTIONS and ALL callbacks
                 * - ROW calls ROW and ALL callbacks
                 * - EDIT calls EDIT and ALL callbacks
                 * - COLUMN calls COLUMN and ALL callbacks
                 * - OPTIONS calls OPTIONS and ALL callbacks
                 *
                 * @param {function(grid)} callback function to be called
                 * @param {array} types the types of data change you want to be informed of.  Values from
                 * the {@link ui.grid.service:uiGridConstants#properties_dataChange uiGridConstants.dataChange}
                 *  values ( ALL, EDIT, ROW, COLUMN, OPTIONS ).  Optional and defaults to ALL
                 * @returns {function} deregister function - a function that can be called to deregister this callback
                 */
                Grid.prototype.registerDataChangeCallback = function registerDataChangeCallback(callback, types, _this) {
                    var uid = gridUtil.nextUid();
                    if ( !types ){
                        types = [uiGridConstants.dataChange.ALL];
                    }
                    if ( !Array.isArray(types)){
                        gridUtil.logError("Expected types to be an array or null in registerDataChangeCallback, value passed was: " + types );
                    }
                    this.dataChangeCallbacks[uid] = { callback: callback, types: types, _this:_this };

                    var self = this;
                    var deregisterFunction = function() {
                        delete self.dataChangeCallbacks[uid];
                    };
                    return deregisterFunction;
                };

                /**
                 * @ngdoc function
                 * @name callDataChangeCallbacks
                 * @methodOf ui.grid.class:Grid
                 * @description Calls the callbacks based on the type of data change that
                 * has occurred. Always calls the ALL callbacks, calls the ROW, EDIT, COLUMN and OPTIONS callbacks if the
                 * event type is matching, or if the type is ALL.
                 * @param {string} type the type of event that occurred - one of the
                 * {@link ui.grid.service:uiGridConstants#properties_dataChange uiGridConstants.dataChange}
                 *  values (ALL, ROW, EDIT, COLUMN, OPTIONS)
                 */
                Grid.prototype.callDataChangeCallbacks = function callDataChangeCallbacks(type, options) {
                    angular.forEach( this.dataChangeCallbacks, function( callback, uid ){
                        if ( callback.types.indexOf( uiGridConstants.dataChange.ALL ) !== -1 ||
                            callback.types.indexOf( type ) !== -1 ||
                            type === uiGridConstants.dataChange.ALL ) {
                            if (callback._this) {
                                callback.callback.apply(callback._this, this, options);
                            }
                            else {
                                callback.callback(this, options);
                            }
                        }
                    }, this);
                };

                /**
                 * @ngdoc function
                 * @name notifyDataChange
                 * @methodOf ui.grid.class:Grid
                 * @description Notifies us that a data change has occurred, used in the public
                 * api for users to tell us when they've changed data or some other event that
                 * our watches cannot pick up
                 * @param {string} type the type of event that occurred - one of the
                 * uiGridConstants.dataChange values (ALL, ROW, EDIT, COLUMN)
                 */
                Grid.prototype.notifyDataChange = function notifyDataChange(type) {
                    var constants = uiGridConstants.dataChange;
                    if ( type === constants.ALL ||
                        type === constants.COLUMN ||
                        type === constants.EDIT ||
                        type === constants.ROW ||
                        type === constants.OPTIONS ){
                        this.callDataChangeCallbacks( type );
                    } else {
                        gridUtil.logError("Notified of a data change, but the type was not recognised, so no action taken, type was: " + type);
                    }
                };


                /**
                 * @ngdoc function
                 * @name columnRefreshCallback
                 * @methodOf ui.grid.class:Grid
                 * @description refreshes the grid when a column refresh
                 * is notified, which triggers handling of the visible flag.
                 * This is called on uiGridConstants.dataChange.COLUMN, and is
                 * registered as a dataChangeCallback in grid.js
                 * @param {object} grid The grid object.
                 * @param {object} options Any options passed into the callback.
                 */
                Grid.prototype.columnRefreshCallback = function columnRefreshCallback(grid, options){
                    grid.buildColumns(options);
                    grid.queueGridRefresh();
                };


                /**
                 * @ngdoc function
                 * @name processRowsCallback
                 * @methodOf ui.grid.class:Grid
                 * @description calls the row processors, specifically
                 * intended to reset the sorting when an edit is called,
                 * registered as a dataChangeCallback on uiGridConstants.dataChange.EDIT
                 * @param {string} name column name
                 */
                Grid.prototype.processRowsCallback = function processRowsCallback( grid ){
                    grid.queueGridRefresh();
                };


                /**
                 * @ngdoc function
                 * @name updateFooterHeightCallback
                 * @methodOf ui.grid.class:Grid
                 * @description recalculates the footer height,
                 * registered as a dataChangeCallback on uiGridConstants.dataChange.OPTIONS
                 * @param {string} name column name
                 */
                Grid.prototype.updateFooterHeightCallback = function updateFooterHeightCallback( grid ){
                    grid.footerHeight = grid.calcFooterHeight();
                    grid.columnFooterHeight = grid.calcColumnFooterHeight();
                };


                /**
                 * @ngdoc function
                 * @name getColumn
                 * @methodOf ui.grid.class:Grid
                 * @description returns a grid column for the column name
                 * @param {string} name column name
                 */
                Grid.prototype.getColumn = function getColumn(name) {
                    var columns = this.columns.filter(function (column) {
                        return column.colDef.name === name;
                    });
                    return columns.length > 0 ? columns[0] : null;
                };

                /**
                 * @ngdoc function
                 * @name getColDef
                 * @methodOf ui.grid.class:Grid
                 * @description returns a grid colDef for the column name
                 * @param {string} name column.field
                 */
                Grid.prototype.getColDef = function getColDef(name) {
                    var colDefs = this.options.columnDefs.filter(function (colDef) {
                        return colDef.name === name;
                    });
                    return colDefs.length > 0 ? colDefs[0] : null;
                };

                /**
                 * @ngdoc function
                 * @name assignTypes
                 * @methodOf ui.grid.class:Grid
                 * @description uses the first row of data to assign colDef.type for any types not defined.
                 */
                /**
                 * @ngdoc property
                 * @name type
                 * @propertyOf ui.grid.class:GridOptions.columnDef
                 * @description the type of the column, used in sorting.  If not provided then the
                 * grid will guess the type.  Add this only if the grid guessing is not to your
                 * satisfaction.  One of:
                 * - 'string'
                 * - 'boolean'
                 * - 'number'
                 * - 'date'
                 * - 'object'
                 * - 'numberStr'
                 * Note that if you choose date, your dates should be in a javascript date type
                 *
                 */
                Grid.prototype.assignTypes = function(){
                    var self = this;
                    self.options.columnDefs.forEach(function (colDef, index) {

                        //Assign colDef type if not specified
                        if (!colDef.type) {
                            var col = new GridColumn(colDef, index, self);
                            var firstRow = self.rows.length > 0 ? self.rows[0] : null;
                            if (firstRow) {
                                colDef.type = gridUtil.guessType(self.getCellValue(firstRow, col));
                            }
                            else {
                                colDef.type = 'string';
                            }
                        }
                    });
                };


                /**
                 * @ngdoc function
                 * @name isRowHeaderColumn
                 * @methodOf ui.grid.class:Grid
                 * @description returns true if the column is a row Header
                 * @param {object} column column
                 */
                Grid.prototype.isRowHeaderColumn = function isRowHeaderColumn(column) {
                    return this.rowHeaderColumns.indexOf(column) !== -1;
                };

                /**
                 * @ngdoc function
                 * @name addRowHeaderColumn
                 * @methodOf ui.grid.class:Grid
                 * @description adds a row header column to the grid
                 * @param {object} colDef Column definition object.
                 * @param {float} order Number that indicates where the column should be placed in the grid.
                 * @param {boolean} stopColumnBuild Prevents the buildColumn callback from being triggered. This is useful to improve
                 * performance of the grid during initial load.
                 */
                Grid.prototype.addRowHeaderColumn = function addRowHeaderColumn(colDef, order, stopColumnBuild) {
                    var self = this;

                    //default order
                    if (order === undefined) {
                        order = 0;
                    }

                    var rowHeaderCol = new GridColumn(colDef, gridUtil.nextUid(), self);
                    rowHeaderCol.isRowHeader = true;
                    if (self.isRTL()) {
                        self.createRightContainer();
                        rowHeaderCol.renderContainer = 'right';
                    }
                    else {
                        self.createLeftContainer();
                        rowHeaderCol.renderContainer = 'left';
                    }

                    // relies on the default column builder being first in array, as it is instantiated
                    // as part of grid creation
                    self.columnBuilders[0](colDef,rowHeaderCol,self.options)
                        .then(function(){
                            rowHeaderCol.enableFiltering = false;
                            rowHeaderCol.enableSorting = false;
                            rowHeaderCol.enableHiding = false;
                            rowHeaderCol.headerPriority = order;
                            self.rowHeaderColumns.push(rowHeaderCol);
                            self.rowHeaderColumns = self.rowHeaderColumns.sort(function (a, b) {
                                return a.headerPriority - b.headerPriority;
                            });

                            if (!stopColumnBuild) {
                                self.buildColumns()
                                    .then(function() {
                                        self.preCompileCellTemplates();
                                        self.queueGridRefresh();
                                    }).catch(angular.noop);
                            }
                        }).catch(angular.noop);
                };

                /**
                 * @ngdoc function
                 * @name getOnlyDataColumns
                 * @methodOf ui.grid.class:Grid
                 * @description returns all columns except for rowHeader columns
                 */
                Grid.prototype.getOnlyDataColumns = function getOnlyDataColumns() {
                    var self = this;
                    var cols = [];
                    self.columns.forEach(function (col) {
                        if (self.rowHeaderColumns.indexOf(col) === -1) {
                            cols.push(col);
                        }
                    });
                    return cols;
                };

                /**
                 * @ngdoc function
                 * @name buildColumns
                 * @methodOf ui.grid.class:Grid
                 * @description creates GridColumn objects from the columnDefinition.  Calls each registered
                 * columnBuilder to further process the column
                 * @param {object} options  An object contains options to use when building columns
                 *
                 * * **orderByColumnDefs**: defaults to **false**. When true, `buildColumns` will reorder existing columns according to the order within the column definitions.
                 *
                 * @returns {Promise} a promise to load any needed column resources
                 */
                Grid.prototype.buildColumns = function buildColumns(opts) {
                    var options = {
                        orderByColumnDefs: false
                    };

                    angular.extend(options, opts);

                    // gridUtil.logDebug('buildColumns');
                    var self = this;
                    var builderPromises = [];
                    var headerOffset = self.rowHeaderColumns.length;
                    var i;

                    // Remove any columns for which a columnDef cannot be found
                    // Deliberately don't use forEach, as it doesn't like splice being called in the middle
                    // Also don't cache columns.length, as it will change during this operation
                    for (i = 0; i < self.columns.length; i++){
                        if (!self.getColDef(self.columns[i].name)) {
                            self.columns.splice(i, 1);
                            i--;
                        }
                    }

                    //add row header columns to the grid columns array _after_ columns without columnDefs have been removed
                    //rowHeaderColumns is ordered by priority so insert in reverse
                    for (var j = self.rowHeaderColumns.length - 1; j >= 0; j--) {
                        self.columns.unshift(self.rowHeaderColumns[j]);
                    }



                    // look at each column def, and update column properties to match.  If the column def
                    // doesn't have a column, then splice in a new gridCol
                    self.options.columnDefs.forEach(function (colDef, index) {
                        self.preprocessColDef(colDef);
                        var col = self.getColumn(colDef.name);

                        if (!col) {
                            col = new GridColumn(colDef, gridUtil.nextUid(), self);
                            self.columns.splice(index + headerOffset, 0, col);
                        }
                        else {
                            // tell updateColumnDef that the column was pre-existing
                            col.updateColumnDef(colDef, false);
                        }

                        self.columnBuilders.forEach(function (builder) {
                            builderPromises.push(builder.call(self, colDef, col, self.options));
                        });
                    });

                    /*** Reorder columns if necessary ***/
                    if (!!options.orderByColumnDefs) {
                        // Create a shallow copy of the columns as a cache
                        var columnCache = self.columns.slice(0);

                        // We need to allow for the "row headers" when mapping from the column defs array to the columns array
                        //   If we have a row header in columns[0] and don't account for it   we'll overwrite it with the column in columnDefs[0]

                        // Go through all the column defs, use the shorter of columns length and colDefs.length because if a user has given two columns the same name then
                        // columns will be shorter than columnDefs.  In this situation we'll avoid an error, but the user will still get an unexpected result
                        var len = Math.min(self.options.columnDefs.length, self.columns.length);
                        for (i = 0; i < len; i++) {
                            // If the column at this index has a different name than the column at the same index in the column defs...
                            if (self.columns[i + headerOffset].name !== self.options.columnDefs[i].name) {
                                // Replace the one in the cache with the appropriate column
                                columnCache[i + headerOffset] = self.getColumn(self.options.columnDefs[i].name);
                            }
                            else {
                                // Otherwise just copy over the one from the initial columns
                                columnCache[i + headerOffset] = self.columns[i + headerOffset];
                            }
                        }

                        // Empty out the columns array, non-destructively
                        self.columns.length = 0;

                        // And splice in the updated, ordered columns from the cache
                        Array.prototype.splice.apply(self.columns, [0, 0].concat(columnCache));
                    }

                    return $q.all(builderPromises).then(function(){
                        if (self.rows.length > 0){
                            self.assignTypes();
                        }
                        if (options.preCompileCellTemplates) {
                            self.preCompileCellTemplates();
                        }
                    }).catch(angular.noop);
                };

                Grid.prototype.preCompileCellTemplate = function(col) {
                    var self = this;
                    var html = col.cellTemplate.replace(uiGridConstants.MODEL_COL_FIELD, self.getQualifiedColField(col));
                    html = html.replace(uiGridConstants.COL_FIELD, 'grid.getCellValue(row, col)');

                    var compiledElementFn = $compile(html);
                    col.compiledElementFn = compiledElementFn;

                    if (col.compiledElementFnDefer) {
                        col.compiledElementFnDefer.resolve(col.compiledElementFn);
                    }
                };

                /**
                 * @ngdoc function
                 * @name preCompileCellTemplates
                 * @methodOf ui.grid.class:Grid
                 * @description precompiles all cell templates
                 */
                Grid.prototype.preCompileCellTemplates = function() {
                    var self = this;
                    self.columns.forEach(function (col) {
                        if ( col.cellTemplate ){
                            self.preCompileCellTemplate( col );
                        } else if ( col.cellTemplatePromise ){
                            col.cellTemplatePromise.then( function() {
                                self.preCompileCellTemplate( col );
                            }).catch(angular.noop);
                        }
                    });
                };

                /**
                 * @ngdoc function
                 * @name getGridQualifiedColField
                 * @methodOf ui.grid.class:Grid
                 * @description Returns the $parse-able accessor for a column within its $scope
                 * @param {GridColumn} col col object
                 */
                Grid.prototype.getQualifiedColField = function (col) {
                    var base = 'row.entity';
                    if ( col.field === uiGridConstants.ENTITY_BINDING ) {
                        return base;
                    }
                    return gridUtil.preEval(base + '.' + col.field);
                };

                /**
                 * @ngdoc function
                 * @name createLeftContainer
                 * @methodOf ui.grid.class:Grid
                 * @description creates the left render container if it doesn't already exist
                 */
                Grid.prototype.createLeftContainer = function() {
                    if (!this.hasLeftContainer()) {
                        this.renderContainers.left = new GridRenderContainer('left', this, { disableColumnOffset: true });
                    }
                };

                /**
                 * @ngdoc function
                 * @name createRightContainer
                 * @methodOf ui.grid.class:Grid
                 * @description creates the right render container if it doesn't already exist
                 */
                Grid.prototype.createRightContainer = function() {
                    if (!this.hasRightContainer()) {
                        this.renderContainers.right = new GridRenderContainer('right', this, { disableColumnOffset: true });
                    }
                };

                /**
                 * @ngdoc function
                 * @name hasLeftContainer
                 * @methodOf ui.grid.class:Grid
                 * @description returns true if leftContainer exists
                 */
                Grid.prototype.hasLeftContainer = function() {
                    return this.renderContainers.left !== undefined;
                };

                /**
                 * @ngdoc function
                 * @name hasRightContainer
                 * @methodOf ui.grid.class:Grid
                 * @description returns true if rightContainer exists
                 */
                Grid.prototype.hasRightContainer = function() {
                    return this.renderContainers.right !== undefined;
                };


                /**
                 * undocumented function
                 * @name preprocessColDef
                 * @methodOf ui.grid.class:Grid
                 * @description defaults the name property from field to maintain backwards compatibility with 2.x
                 * validates that name or field is present
                 */
                Grid.prototype.preprocessColDef = function preprocessColDef(colDef) {
                    var self = this;

                    if (!colDef.field && !colDef.name) {
                        throw new Error('colDef.name or colDef.field property is required');
                    }

                    //maintain backwards compatibility with 2.x
                    //field was required in 2.x.  now name is required
                    if (colDef.name === undefined && colDef.field !== undefined) {
                        // See if the column name already exists:
                        var newName = colDef.field,
                            counter = 2;
                        while (self.getColumn(newName)) {
                            newName = colDef.field + counter.toString();
                            counter++;
                        }
                        colDef.name = newName;
                    }
                };

                // Return a list of items that exist in the `n` array but not the `o` array. Uses optional property accessors passed as third & fourth parameters
                Grid.prototype.newInN = function newInN(o, n, oAccessor, nAccessor) {
                    var self = this;

                    var t = [];
                    for (var i = 0; i < n.length; i++) {
                        var nV = nAccessor ? n[i][nAccessor] : n[i];

                        var found = false;
                        for (var j = 0; j < o.length; j++) {
                            var oV = oAccessor ? o[j][oAccessor] : o[j];
                            if (self.options.rowEquality(nV, oV)) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            t.push(nV);
                        }
                    }

                    return t;
                };

                /**
                 * @ngdoc function
                 * @name getRow
                 * @methodOf ui.grid.class:Grid
                 * @description returns the GridRow that contains the rowEntity
                 * @param {object} rowEntity the gridOptions.data array element instance
                 * @param {array} lookInRows [optional] the rows to look in - if not provided then
                 * looks in grid.rows
                 */
                Grid.prototype.getRow = function getRow(rowEntity, lookInRows) {
                    var self = this;

                    lookInRows = typeof(lookInRows) === 'undefined' ? self.rows : lookInRows;

                    var rows = lookInRows.filter(function (row) {
                        return self.options.rowEquality(row.entity, rowEntity);
                    });
                    return rows.length > 0 ? rows[0] : null;
                };


                /**
                 * @ngdoc function
                 * @name modifyRows
                 * @methodOf ui.grid.class:Grid
                 * @description creates or removes GridRow objects from the newRawData array.  Calls each registered
                 * rowBuilder to further process the row
                 * @param {array} newRawData Modified set of data
                 *
                 * This method aims to achieve three things:
                 * 1. the resulting rows array is in the same order as the newRawData, we'll call
                 * rowsProcessors immediately after to sort the data anyway
                 * 2. if we have row hashing available, we try to use the rowHash to find the row
                 * 3. no memory leaks - rows that are no longer in newRawData need to be garbage collected
                 *
                 * The basic logic flow makes use of the newRawData, oldRows and oldHash, and creates
                 * the newRows and newHash
                 *
                 * ```
                 * newRawData.forEach newEntity
                 *   if (hashing enabled)
                 *     check oldHash for newEntity
                 *   else
                 *     look for old row directly in oldRows
                 *   if !oldRowFound     // must be a new row
                 *     create newRow
                 *   append to the newRows and add to newHash
                 *   run the processors
                 * ```
                 *
                 * Rows are identified using the hashKey if configured.  If not configured, then rows
                 * are identified using the gridOptions.rowEquality function
                 *
                 * This method is useful when trying to select rows immediately after loading data without
                 * using a $timeout/$interval, e.g.:
                 *
                 *   $scope.gridOptions.data =  someData;
                 *   $scope.gridApi.grid.modifyRows($scope.gridOptions.data);
                 *   $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
                 *
                 * OR to persist row selection after data update (e.g. rows selected, new data loaded, want
                 * originally selected rows to be re-selected))
                 */
                Grid.prototype.modifyRows = function modifyRows(newRawData) {
                    var self = this;
                    var oldRows = self.rows.slice(0);
                    var oldRowHash = self.rowHashMap || self.createRowHashMap();
                    self.rowHashMap = self.createRowHashMap();
                    self.rows.length = 0;

                    newRawData.forEach( function( newEntity, i ) {
                        var newRow, oldRow;

                        if ( self.options.enableRowHashing ){
                            // if hashing is enabled, then this row will be in the hash if we already know about it
                            oldRow = oldRowHash.get( newEntity );
                        } else {
                            // otherwise, manually search the oldRows to see if we can find this row
                            oldRow = self.getRow(newEntity, oldRows);
                        }

                        // update newRow to have an entity
                        if ( oldRow ) {
                            newRow = oldRow;
                            newRow.entity = newEntity;
                        }

                        // if we didn't find the row, it must be new, so create it
                        if ( !newRow ){
                            newRow = self.processRowBuilders(new GridRow(newEntity, i, self));
                        }

                        self.rows.push( newRow );
                        self.rowHashMap.put( newEntity, newRow );
                    });

                    self.assignTypes();

                    var p1 = $q.when(self.processRowsProcessors(self.rows))
                        .then(function (renderableRows) {
                            return self.setVisibleRows(renderableRows);
                        }).catch(angular.noop);

                    var p2 = $q.when(self.processColumnsProcessors(self.columns))
                        .then(function (renderableColumns) {
                            return self.setVisibleColumns(renderableColumns);
                        }).catch(angular.noop);

                    return $q.all([p1, p2]);
                };


                /**
                 * Private Undocumented Method
                 * @name addRows
                 * @methodOf ui.grid.class:Grid
                 * @description adds the newRawData array of rows to the grid and calls all registered
                 * rowBuilders. this keyword will reference the grid
                 */
                Grid.prototype.addRows = function addRows(newRawData) {
                    var self = this;

                    var existingRowCount = self.rows.length;
                    for (var i = 0; i < newRawData.length; i++) {
                        var newRow = self.processRowBuilders(new GridRow(newRawData[i], i + existingRowCount, self));

                        if (self.options.enableRowHashing) {
                            var found = self.rowHashMap.get(newRow.entity);
                            if (found) {
                                found.row = newRow;
                            }
                        }

                        self.rows.push(newRow);
                    }
                };

                /**
                 * @ngdoc function
                 * @name processRowBuilders
                 * @methodOf ui.grid.class:Grid
                 * @description processes all RowBuilders for the gridRow
                 * @param {GridRow} gridRow reference to gridRow
                 * @returns {GridRow} the gridRow with all additional behavior added
                 */
                Grid.prototype.processRowBuilders = function processRowBuilders(gridRow) {
                    var self = this;

                    self.rowBuilders.forEach(function (builder) {
                        builder.call(self, gridRow, self.options);
                    });

                    return gridRow;
                };

                /**
                 * @ngdoc function
                 * @name registerStyleComputation
                 * @methodOf ui.grid.class:Grid
                 * @description registered a styleComputation function
                 *
                 * If the function returns a value it will be appended into the grid's `<style>` block
                 * @param {function($scope)} styleComputation function
                 */
                Grid.prototype.registerStyleComputation = function registerStyleComputation(styleComputationInfo) {
                    this.styleComputations.push(styleComputationInfo);
                };


                // NOTE (c0bra): We already have rowBuilders. I think these do exactly the same thing...
                // Grid.prototype.registerRowFilter = function(filter) {
                //   // TODO(c0bra): validate filter?

                //   this.rowFilters.push(filter);
                // };

                // Grid.prototype.removeRowFilter = function(filter) {
                //   var idx = this.rowFilters.indexOf(filter);

                //   if (typeof(idx) !== 'undefined' && idx !== undefined) {
                //     this.rowFilters.slice(idx, 1);
                //   }
                // };

                // Grid.prototype.processRowFilters = function(rows) {
                //   var self = this;
                //   self.rowFilters.forEach(function (filter) {
                //     filter.call(self, rows);
                //   });
                // };


                /**
                 * @ngdoc function
                 * @name registerRowsProcessor
                 * @methodOf ui.grid.class:Grid
                 * @description
                 *
                 * Register a "rows processor" function. When the rows are updated,
                 * the grid calls each registered "rows processor", which has a chance
                 * to alter the set of rows (sorting, etc) as long as the count is not
                 * modified.
                 *
                 * @param {function(renderedRowsToProcess, columns )} processorFunction rows processor function, which
                 * is run in the context of the grid (i.e. this for the function will be the grid), and must
                 * return the updated rows list, which is passed to the next processor in the chain
                 * @param {number} priority the priority of this processor.  In general we try to do them in 100s to leave room
                 * for other people to inject rows processors at intermediate priorities.  Lower priority rowsProcessors run earlier.
                 *
                 * At present all rows visible is running at 50, filter is running at 100, sort is at 200, grouping at 400, selectable rows at 500, pagination at 900 (pagination will generally want to be last)
                 *
                 */
                Grid.prototype.registerRowsProcessor = function registerRowsProcessor(processor, priority) {
                    if (!angular.isFunction(processor)) {
                        throw 'Attempt to register non-function rows processor: ' + processor;
                    }

                    this.rowsProcessors.push({processor: processor, priority: priority});
                    this.rowsProcessors.sort(function sortByPriority( a, b ){
                        return a.priority - b.priority;
                    });
                };

                /**
                 * @ngdoc function
                 * @name removeRowsProcessor
                 * @methodOf ui.grid.class:Grid
                 * @param {function(renderableRows)} rows processor function
                 * @description Remove a registered rows processor
                 */
                Grid.prototype.removeRowsProcessor = function removeRowsProcessor(processor) {
                    var idx = -1;
                    this.rowsProcessors.forEach(function(rowsProcessor, index){
                        if ( rowsProcessor.processor === processor ){
                            idx = index;
                        }
                    });

                    if ( idx !== -1 ) {
                        this.rowsProcessors.splice(idx, 1);
                    }
                };

                /**
                 * Private Undocumented Method
                 * @name processRowsProcessors
                 * @methodOf ui.grid.class:Grid
                 * @param {Array[GridRow]} The array of "renderable" rows
                 * @param {Array[GridColumn]} The array of columns
                 * @description Run all the registered rows processors on the array of renderable rows
                 */
                Grid.prototype.processRowsProcessors = function processRowsProcessors(renderableRows) {
                    var self = this;

                    // Create a shallow copy of the rows so that we can safely sort them without altering the original grid.rows sort order
                    var myRenderableRows = renderableRows.slice(0);

                    // Return myRenderableRows with no processing if we have no rows processors
                    if (self.rowsProcessors.length === 0) {
                        return $q.when(myRenderableRows);
                    }

                    // Counter for iterating through rows processors
                    var i = 0;

                    // Promise for when we're done with all the processors
                    var finished = $q.defer();

                    // This function will call the processor in self.rowsProcessors at index 'i', and then
                    //   when done will call the next processor in the list, using the output from the processor
                    //   at i as the argument for 'renderedRowsToProcess' on the next iteration.
                    //
                    //   If we're at the end of the list of processors, we resolve our 'finished' callback with
                    //   the result.
                    function startProcessor(i, renderedRowsToProcess) {
                        // Get the processor at 'i'
                        var processor = self.rowsProcessors[i].processor;

                        // Call the processor, passing in the rows to process and the current columns
                        //   (note: it's wrapped in $q.when() in case the processor does not return a promise)
                        return $q.when( processor.call(self, renderedRowsToProcess, self.columns) )
                            .then(function handleProcessedRows(processedRows) {
                                // Check for errors
                                if (!processedRows) {
                                    throw "Processor at index " + i + " did not return a set of renderable rows";
                                }

                                if (!angular.isArray(processedRows)) {
                                    throw "Processor at index " + i + " did not return an array";
                                }

                                // Processor is done, increment the counter
                                i++;

                                // If we're not done with the processors, call the next one
                                if (i <= self.rowsProcessors.length - 1) {
                                    return startProcessor(i, processedRows);
                                }
                                // We're done! Resolve the 'finished' promise
                                else {
                                    finished.resolve(processedRows);
                                }
                            }).catch(angular.noop);
                    }

                    // Start on the first processor
                    startProcessor(0, myRenderableRows);

                    return finished.promise;
                };

                Grid.prototype.setVisibleRows = function setVisibleRows(rows) {
                    var self = this;

                    // Reset all the render container row caches
                    for (var i in self.renderContainers) {
                        var container = self.renderContainers[i];

                        container.canvasHeightShouldUpdate = true;

                        if ( typeof(container.visibleRowCache) === 'undefined' ){
                            container.visibleRowCache = [];
                        } else {
                            container.visibleRowCache.length = 0;
                        }
                    }

                    // rows.forEach(function (row) {
                    for (var ri = 0; ri < rows.length; ri++) {
                        var row = rows[ri];

                        var targetContainer = (typeof(row.renderContainer) !== 'undefined' && row.renderContainer) ? row.renderContainer : 'body';

                        // If the row is visible
                        if (row.visible) {
                            self.renderContainers[targetContainer].visibleRowCache.push(row);
                        }
                    }
                    self.api.core.raise.rowsVisibleChanged(this.api);
                    self.api.core.raise.rowsRendered(this.api);
                };

                /**
                 * @ngdoc function
                 * @name registerColumnsProcessor
                 * @methodOf ui.grid.class:Grid
                 * @param {function(renderedColumnsToProcess, rows)} columnProcessor column processor function, which
                 * is run in the context of the grid (i.e. this for the function will be the grid), and
                 * which must return an updated renderedColumnsToProcess which can be passed to the next processor
                 * in the chain
                 * @param {number} priority the priority of this processor.  In general we try to do them in 100s to leave room
                 * for other people to inject columns processors at intermediate priorities.  Lower priority columnsProcessors run earlier.
                 *
                 * At present all rows visible is running at 50, filter is running at 100, sort is at 200, grouping at 400, selectable rows at 500, pagination at 900 (pagination will generally want to be last)
                 * @description

                 Register a "columns processor" function. When the columns are updated,
                 the grid calls each registered "columns processor", which has a chance
                 to alter the set of columns, as long as the count is not modified.
                 */
                Grid.prototype.registerColumnsProcessor = function registerColumnsProcessor(processor, priority) {
                    if (!angular.isFunction(processor)) {
                        throw 'Attempt to register non-function rows processor: ' + processor;
                    }

                    this.columnsProcessors.push({processor: processor, priority: priority});
                    this.columnsProcessors.sort(function sortByPriority( a, b ){
                        return a.priority - b.priority;
                    });
                };

                Grid.prototype.removeColumnsProcessor = function removeColumnsProcessor(processor) {
                    var idx = this.columnsProcessors.indexOf(processor);

                    if (typeof(idx) !== 'undefined' && idx !== undefined) {
                        this.columnsProcessors.splice(idx, 1);
                    }
                };

                Grid.prototype.processColumnsProcessors = function processColumnsProcessors(renderableColumns) {
                    var self = this;

                    // Create a shallow copy of the rows so that we can safely sort them without altering the original grid.rows sort order
                    var myRenderableColumns = renderableColumns.slice(0);

                    // Return myRenderableRows with no processing if we have no rows processors
                    if (self.columnsProcessors.length === 0) {
                        return $q.when(myRenderableColumns);
                    }

                    // Counter for iterating through rows processors
                    var i = 0;

                    // Promise for when we're done with all the processors
                    var finished = $q.defer();

                    // This function will call the processor in self.rowsProcessors at index 'i', and then
                    //   when done will call the next processor in the list, using the output from the processor
                    //   at i as the argument for 'renderedRowsToProcess' on the next iteration.
                    //
                    //   If we're at the end of the list of processors, we resolve our 'finished' callback with
                    //   the result.
                    function startProcessor(i, renderedColumnsToProcess) {
                        // Get the processor at 'i'
                        var processor = self.columnsProcessors[i].processor;

                        // Call the processor, passing in the rows to process and the current columns
                        //   (note: it's wrapped in $q.when() in case the processor does not return a promise)
                        return $q.when( processor.call(self, renderedColumnsToProcess, self.rows) )
                            .then(function handleProcessedRows(processedColumns) {
                                // Check for errors
                                if (!processedColumns) {
                                    throw "Processor at index " + i + " did not return a set of renderable rows";
                                }

                                if (!angular.isArray(processedColumns)) {
                                    throw "Processor at index " + i + " did not return an array";
                                }

                                // Processor is done, increment the counter
                                i++;

                                // If we're not done with the processors, call the next one
                                if (i <= self.columnsProcessors.length - 1) {
                                    return startProcessor(i, myRenderableColumns);
                                }
                                // We're done! Resolve the 'finished' promise
                                else {
                                    finished.resolve(myRenderableColumns);
                                }
                            }).catch(angular.noop);
                    }

                    // Start on the first processor
                    startProcessor(0, myRenderableColumns);

                    return finished.promise;
                };

                Grid.prototype.setVisibleColumns = function setVisibleColumns(columns) {
                    // gridUtil.logDebug('setVisibleColumns');

                    var self = this;

                    // Reset all the render container row caches
                    for (var i in self.renderContainers) {
                        var container = self.renderContainers[i];

                        container.visibleColumnCache.length = 0;
                    }

                    for (var ci = 0; ci < columns.length; ci++) {
                        var column = columns[ci];

                        // If the column is visible
                        if (column.visible) {
                            // If the column has a container specified
                            if (typeof(column.renderContainer) !== 'undefined' && column.renderContainer) {
                                self.renderContainers[column.renderContainer].visibleColumnCache.push(column);
                            }
                            // If not, put it into the body container
                            else {
                                self.renderContainers.body.visibleColumnCache.push(column);
                            }
                        }
                    }
                };

                /**
                 * @ngdoc function
                 * @name handleWindowResize
                 * @methodOf ui.grid.class:Grid
                 * @description Triggered when the browser window resizes; automatically resizes the grid
                 * @returns {Promise} A resolved promise once the window resize has completed.
                 */
                Grid.prototype.handleWindowResize = function handleWindowResize($event) {
                    var self = this;

                    self.gridWidth = gridUtil.elementWidth(self.element);
                    self.gridHeight = gridUtil.elementHeight(self.element);

                    return self.queueRefresh();
                };

                /**
                 * @ngdoc function
                 * @name queueRefresh
                 * @methodOf ui.grid.class:Grid
                 * @description queues a grid refreshCanvas, a way of debouncing all the refreshes we might otherwise issue
                 */
                Grid.prototype.queueRefresh = function queueRefresh() {
                    var self = this;

                    if (self.refreshCanceller) {
                        $timeout.cancel(self.refreshCanceller);
                    }

                    self.refreshCanceller = $timeout(function () {
                        self.refreshCanvas(true);
                    });

                    self.refreshCanceller.then(function () {
                        self.refreshCanceller = null;
                    }).catch(angular.noop);

                    return self.refreshCanceller;
                };


                /**
                 * @ngdoc function
                 * @name queueGridRefresh
                 * @methodOf ui.grid.class:Grid
                 * @description queues a grid refresh, a way of debouncing all the refreshes we might otherwise issue
                 */
                Grid.prototype.queueGridRefresh = function queueGridRefresh() {
                    var self = this;

                    if (self.gridRefreshCanceller) {
                        $timeout.cancel(self.gridRefreshCanceller);
                    }

                    self.gridRefreshCanceller = $timeout(function () {
                        self.refresh(true);
                    });

                    self.gridRefreshCanceller.then(function () {
                        self.gridRefreshCanceller = null;
                    }).catch(angular.noop);

                    return self.gridRefreshCanceller;
                };


                /**
                 * @ngdoc function
                 * @name updateCanvasHeight
                 * @methodOf ui.grid.class:Grid
                 * @description flags all render containers to update their canvas height
                 */
                Grid.prototype.updateCanvasHeight = function updateCanvasHeight() {
                    var self = this;

                    for (var containerId in self.renderContainers) {
                        if (self.renderContainers.hasOwnProperty(containerId)) {
                            var container = self.renderContainers[containerId];
                            container.canvasHeightShouldUpdate = true;
                        }
                    }
                };

                /**
                 * @ngdoc function
                 * @name buildStyles
                 * @methodOf ui.grid.class:Grid
                 * @description calls each styleComputation function
                 */
                Grid.prototype.buildStyles = function buildStyles() {
                    var self = this;

                    // gridUtil.logDebug('buildStyles');

                    self.customStyles = '';

                    self.styleComputations
                        .sort(function(a, b) {
                            if (a.priority === null) { return 1; }
                            if (b.priority === null) { return -1; }
                            if (a.priority === null && b.priority === null) { return 0; }
                            return a.priority - b.priority;
                        })
                        .forEach(function (compInfo) {
                            // this used to provide $scope as a second parameter, but I couldn't find any
                            // style builders that used it, so removed it as part of moving to grid from controller
                            var ret = compInfo.func.call(self);

                            if (angular.isString(ret)) {
                                self.customStyles += '\n' + ret;
                            }
                        });
                };


                Grid.prototype.minColumnsToRender = function minColumnsToRender() {
                    var self = this;
                    var viewport = this.getViewportWidth();

                    var min = 0;
                    var totalWidth = 0;
                    self.columns.forEach(function(col, i) {
                        if (totalWidth < viewport) {
                            totalWidth += col.drawnWidth;
                            min++;
                        }
                        else {
                            var currWidth = 0;
                            for (var j = i; j >= i - min; j--) {
                                currWidth += self.columns[j].drawnWidth;
                            }
                            if (currWidth < viewport) {
                                min++;
                            }
                        }
                    });

                    return min;
                };

                Grid.prototype.getBodyHeight = function getBodyHeight() {
                    // Start with the viewportHeight
                    var bodyHeight = this.getViewportHeight();

                    // Add the horizontal scrollbar height if there is one
                    //if (typeof(this.horizontalScrollbarHeight) !== 'undefined' && this.horizontalScrollbarHeight !== undefined && this.horizontalScrollbarHeight > 0) {
                    //  bodyHeight = bodyHeight + this.horizontalScrollbarHeight;
                    //}

                    return bodyHeight;
                };

                // NOTE: viewport drawable height is the height of the grid minus the header row height (including any border)
                // TODO(c0bra): account for footer height
                Grid.prototype.getViewportHeight = function getViewportHeight() {
                    var self = this;

                    var viewPortHeight = this.gridHeight - this.headerHeight - this.footerHeight;

                    // Account for native horizontal scrollbar, if present
                    //if (typeof(this.horizontalScrollbarHeight) !== 'undefined' && this.horizontalScrollbarHeight !== undefined && this.horizontalScrollbarHeight > 0) {
                    //  viewPortHeight = viewPortHeight - this.horizontalScrollbarHeight;
                    //}

                    var adjustment = self.getViewportAdjustment();

                    viewPortHeight = viewPortHeight + adjustment.height;

                    //gridUtil.logDebug('viewPortHeight', viewPortHeight);

                    return viewPortHeight;
                };

                Grid.prototype.getViewportWidth = function getViewportWidth() {
                    var self = this;

                    var viewPortWidth = this.gridWidth;

                    //if (typeof(this.verticalScrollbarWidth) !== 'undefined' && this.verticalScrollbarWidth !== undefined && this.verticalScrollbarWidth > 0) {
                    //  viewPortWidth = viewPortWidth - this.verticalScrollbarWidth;
                    //}

                    var adjustment = self.getViewportAdjustment();

                    viewPortWidth = viewPortWidth + adjustment.width;

                    //gridUtil.logDebug('getviewPortWidth', viewPortWidth);

                    return viewPortWidth;
                };

                Grid.prototype.getHeaderViewportWidth = function getHeaderViewportWidth() {
                    var viewPortWidth = this.getViewportWidth();

                    //if (typeof(this.verticalScrollbarWidth) !== 'undefined' && this.verticalScrollbarWidth !== undefined && this.verticalScrollbarWidth > 0) {
                    //  viewPortWidth = viewPortWidth + this.verticalScrollbarWidth;
                    //}

                    return viewPortWidth;
                };

                Grid.prototype.addVerticalScrollSync = function (containerId, callBackFn) {
                    this.verticalScrollSyncCallBackFns[containerId] = callBackFn;
                };

                Grid.prototype.addHorizontalScrollSync = function (containerId, callBackFn) {
                    this.horizontalScrollSyncCallBackFns[containerId] = callBackFn;
                };

                /**
                 * Scroll needed containers by calling their ScrollSyncs
                 * @param sourceContainerId the containerId that has already set it's top/left.
                 *         can be empty string which means all containers need to set top/left
                 * @param scrollEvent
                 */
                Grid.prototype.scrollContainers = function (sourceContainerId, scrollEvent) {

                    if (scrollEvent.y) {
                        //default for no container Id (ex. mousewheel means that all containers must set scrollTop/Left)
                        var verts = ['body','left', 'right'];

                        this.flagScrollingVertically(scrollEvent);

                        if (sourceContainerId === 'body') {
                            verts = ['left', 'right'];
                        }
                        else if (sourceContainerId === 'left') {
                            verts = ['body', 'right'];
                        }
                        else if (sourceContainerId === 'right') {
                            verts = ['body', 'left'];
                        }

                        for (var i = 0; i < verts.length; i++) {
                            var id = verts[i];
                            if (this.verticalScrollSyncCallBackFns[id]) {
                                this.verticalScrollSyncCallBackFns[id](scrollEvent);
                            }
                        }

                    }

                    if (scrollEvent.x) {
                        //default for no container Id (ex. mousewheel means that all containers must set scrollTop/Left)
                        var horizs = ['body','bodyheader', 'bodyfooter'];

                        this.flagScrollingHorizontally(scrollEvent);
                        if (sourceContainerId === 'body') {
                            horizs = ['bodyheader', 'bodyfooter'];
                        }

                        for (var j = 0; j < horizs.length; j++) {
                            var idh = horizs[j];
                            if (this.horizontalScrollSyncCallBackFns[idh]) {
                                this.horizontalScrollSyncCallBackFns[idh](scrollEvent);
                            }
                        }

                    }

                };

                Grid.prototype.registerViewportAdjuster = function registerViewportAdjuster(func) {
                    this.viewportAdjusters.push(func);
                };

                Grid.prototype.removeViewportAdjuster = function registerViewportAdjuster(func) {
                    var idx = this.viewportAdjusters.indexOf(func);

                    if (typeof(idx) !== 'undefined' && idx !== undefined) {
                        this.viewportAdjusters.splice(idx, 1);
                    }
                };

                Grid.prototype.getViewportAdjustment = function getViewportAdjustment() {
                    var self = this;

                    var adjustment = { height: 0, width: 0 };

                    self.viewportAdjusters.forEach(function (func) {
                        adjustment = func.call(this, adjustment);
                    });

                    return adjustment;
                };

                Grid.prototype.getVisibleRowCount = function getVisibleRowCount() {
                    // var count = 0;

                    // this.rows.forEach(function (row) {
                    //   if (row.visible) {
                    //     count++;
                    //   }
                    // });

                    // return this.visibleRowCache.length;
                    return this.renderContainers.body.visibleRowCache.length;
                };

                Grid.prototype.getVisibleRows = function getVisibleRows() {
                    return this.renderContainers.body.visibleRowCache;
                };

                Grid.prototype.getVisibleColumnCount = function getVisibleColumnCount() {
                    // var count = 0;

                    // this.rows.forEach(function (row) {
                    //   if (row.visible) {
                    //     count++;
                    //   }
                    // });

                    // return this.visibleRowCache.length;
                    return this.renderContainers.body.visibleColumnCache.length;
                };


                Grid.prototype.searchRows = function searchRows(renderableRows) {
                    return rowSearcher.search(this, renderableRows, this.columns);
                };

                Grid.prototype.sortByColumn = function sortByColumn(renderableRows) {
                    return rowSorter.sort(this, renderableRows, this.columns);
                };

                /**
                 * @ngdoc function
                 * @name getCellValue
                 * @methodOf ui.grid.class:Grid
                 * @description Gets the value of a cell for a particular row and column
                 * @param {GridRow} row Row to access
                 * @param {GridColumn} col Column to access
                 */
                Grid.prototype.getCellValue = function getCellValue(row, col){
                    if ( typeof(row.entity[ '$$' + col.uid ]) !== 'undefined' ) {
                        return row.entity[ '$$' + col.uid].rendered;
                    } else if (this.options.flatEntityAccess && typeof(col.field) !== 'undefined' ){
                        return row.entity[col.field];
                    } else {
                        if (!col.cellValueGetterCache) {
                            col.cellValueGetterCache = $parse(row.getEntityQualifiedColField(col));
                        }

                        return col.cellValueGetterCache(row);
                    }
                };

                /**
                 * @ngdoc function
                 * @name getCellDisplayValue
                 * @methodOf ui.grid.class:Grid
                 * @description Gets the displayed value of a cell after applying any the `cellFilter`
                 * @param {GridRow} row Row to access
                 * @param {GridColumn} col Column to access
                 */
                Grid.prototype.getCellDisplayValue = function getCellDisplayValue(row, col) {
                    if ( !col.cellDisplayGetterCache ) {
                        var custom_filter = col.cellFilter ? " | " + col.cellFilter : "";

                        if (typeof(row.entity['$$' + col.uid]) !== 'undefined') {
                            col.cellDisplayGetterCache = $parse(row.entity['$$' + col.uid].rendered + custom_filter);
                        } else if (this.options.flatEntityAccess && typeof(col.field) !== 'undefined') {
                            col.cellDisplayGetterCache = $parse('entity.' + col.field + custom_filter);
                        } else {
                            col.cellDisplayGetterCache = $parse(row.getEntityQualifiedColField(col) + custom_filter);
                        }
                    }

                    return col.cellDisplayGetterCache(row);
                };


                Grid.prototype.getNextColumnSortPriority = function getNextColumnSortPriority() {
                    var self = this,
                        p = 0;

                    self.columns.forEach(function (col) {
                        if (col.sort && col.sort.priority !== undefined && col.sort.priority >= p) {
                            p = col.sort.priority + 1;
                        }
                    });

                    return p;
                };

                /**
                 * @ngdoc function
                 * @name resetColumnSorting
                 * @methodOf ui.grid.class:Grid
                 * @description Return the columns that the grid is currently being sorted by
                 * @param {GridColumn} [excludedColumn] Optional GridColumn to exclude from having its sorting reset
                 */
                Grid.prototype.resetColumnSorting = function resetColumnSorting(excludeCol) {
                    var self = this;

                    self.columns.forEach(function (col) {
                        if (col !== excludeCol && !col.suppressRemoveSort) {
                            col.sort = {};
                        }
                    });
                };

                /**
                 * @ngdoc function
                 * @name getColumnSorting
                 * @methodOf ui.grid.class:Grid
                 * @description Return the columns that the grid is currently being sorted by
                 * @returns {Array[GridColumn]} An array of GridColumn objects
                 */
                Grid.prototype.getColumnSorting = function getColumnSorting() {
                    var self = this;

                    var sortedCols = [], myCols;

                    // Iterate through all the columns, sorted by priority
                    // Make local copy of column list, because sorting is in-place and we do not want to
                    // change the original sequence of columns
                    myCols = self.columns.slice(0);
                    myCols.sort(rowSorter.prioritySort).forEach(function (col) {
                        if (col.sort && typeof(col.sort.direction) !== 'undefined' && col.sort.direction && (col.sort.direction === uiGridConstants.ASC || col.sort.direction === uiGridConstants.DESC)) {
                            sortedCols.push(col);
                        }
                    });

                    return sortedCols;
                };

                /**
                 * @ngdoc function
                 * @name sortColumn
                 * @methodOf ui.grid.class:Grid
                 * @description Set the sorting on a given column, optionally resetting any existing sorting on the Grid.
                 * Emits the sortChanged event whenever the sort criteria are changed.
                 * @param {GridColumn} column Column to set the sorting on
                 * @param {uiGridConstants.ASC|uiGridConstants.DESC} [direction] Direction to sort by, either descending or ascending.
                 *   If not provided, the column will iterate through the sort directions
                 *   specified in the {@link ui.grid.class:GridOptions.columnDef#sortDirectionCycle sortDirectionCycle} attribute.
                 * @param {boolean} [add] Add this column to the sorting. If not provided or set to `false`, the Grid will reset any existing sorting and sort
                 *   by this column only
                 * @returns {Promise} A resolved promise that supplies the column.
                 */

                Grid.prototype.sortColumn = function sortColumn(column, directionOrAdd, add) {
                    var self = this,
                        direction = null;

                    if (typeof(column) === 'undefined' || !column) {
                        throw new Error('No column parameter provided');
                    }

                    // Second argument can either be a direction or whether to add this column to the existing sort.
                    //   If it's a boolean, it's an add, otherwise, it's a direction
                    if (typeof(directionOrAdd) === 'boolean') {
                        add = directionOrAdd;
                    }
                    else {
                        direction = directionOrAdd;
                    }

                    if (!add) {
                        self.resetColumnSorting(column);
                        column.sort.priority = undefined;
                        // Get the actual priority since there may be columns which have suppressRemoveSort set
                        column.sort.priority = self.getNextColumnSortPriority();
                    }
                    else if (column.sort.priority === undefined){
                        column.sort.priority = self.getNextColumnSortPriority();
                    }

                    if (!direction) {
                        // Find the current position in the cycle (or -1).
                        var i = column.sortDirectionCycle.indexOf(column.sort.direction ? column.sort.direction : null);
                        // Proceed to the next position in the cycle (or start at the beginning).
                        i = (i+1) % column.sortDirectionCycle.length;
                        // If suppressRemoveSort is set, and the next position in the cycle would
                        // remove the sort, skip it.
                        if (column.colDef && column.suppressRemoveSort && !column.sortDirectionCycle[i]) {
                            i = (i+1) % column.sortDirectionCycle.length;
                        }

                        if (column.sortDirectionCycle[i]) {
                            column.sort.direction = column.sortDirectionCycle[i];
                        } else {
                            removeSortOfColumn(column, self);
                        }
                    }
                    else {
                        column.sort.direction = direction;
                    }

                    self.api.core.raise.sortChanged( self, self.getColumnSorting() );

                    return $q.when(column);
                };

                var removeSortOfColumn = function removeSortOfColumn(column, grid) {
                    //Decrease priority for every col where priority is higher than the removed sort's priority.
                    grid.columns.forEach(function (col) {
                        if (col.sort && col.sort.priority !== undefined && col.sort.priority > column.sort.priority) {
                            col.sort.priority -= 1;
                        }
                    });

                    //Remove sort
                    column.sort = {};
                };

                /**
                 * communicate to outside world that we are done with initial rendering
                 */
                Grid.prototype.renderingComplete = function(){
                    if (angular.isFunction(this.options.onRegisterApi)) {
                        this.options.onRegisterApi(this.api);
                    }
                    this.api.core.raise.renderingComplete( this.api );
                };

                Grid.prototype.createRowHashMap = function createRowHashMap() {
                    var self = this;

                    var hashMap = new RowHashMap();
                    hashMap.grid = self;

                    return hashMap;
                };


                /**
                 * @ngdoc function
                 * @name refresh
                 * @methodOf ui.grid.class:Grid
                 * @description Refresh the rendered grid on screen.
                 * @param {boolean} [rowsAltered] Optional flag for refreshing when the number of rows has changed.
                 */
                Grid.prototype.refresh = function refresh(rowsAltered) {
                    var self = this;

                    var p1 = self.processRowsProcessors(self.rows).then(function (renderableRows) {
                        self.setVisibleRows(renderableRows);
                    }).catch(angular.noop);

                    var p2 = self.processColumnsProcessors(self.columns).then(function (renderableColumns) {
                        self.setVisibleColumns(renderableColumns);
                    }).catch(angular.noop);

                    return $q.all([p1, p2]).then(function () {
                        self.refreshCanvas(true);
                        self.redrawInPlace(rowsAltered);
                    }).catch(angular.noop);
                };

                /**
                 * @ngdoc function
                 * @name refreshRows
                 * @methodOf ui.grid.class:Grid
                 * @description Refresh the rendered rows on screen?  Note: not functional at present
                 * @returns {promise} promise that is resolved when render completes?
                 *
                 */
                Grid.prototype.refreshRows = function refreshRows() {
                    var self = this;

                    return self.processRowsProcessors(self.rows)
                        .then(function (renderableRows) {
                            self.setVisibleRows(renderableRows);

                            self.redrawInPlace();

                            self.refreshCanvas( true );
                        }).catch(angular.noop);
                };

                /**
                 * @ngdoc function
                 * @name refreshCanvas
                 * @methodOf ui.grid.class:Grid
                 * @description Builds all styles and recalculates much of the grid sizing
                 * @param {object} buildStyles optional parameter.  Use TBD
                 * @returns {promise} promise that is resolved when the canvas
                 * has been refreshed
                 *
                 */
                Grid.prototype.refreshCanvas = function(buildStyles) {
                    var self = this;

                    // gridUtil.logDebug('refreshCanvas');

                    var p = $q.defer();

                    // Get all the header heights
                    var containerHeadersToRecalc = [];
                    for (var containerId in self.renderContainers) {
                        if (self.renderContainers.hasOwnProperty(containerId)) {
                            var container = self.renderContainers[containerId];

                            // Skip containers that have no canvasWidth set yet
                            if (container.canvasWidth === null || isNaN(container.canvasWidth)) {
                                continue;
                            }

                            if (container.header || container.headerCanvas) {
                                container.explicitHeaderHeight = container.explicitHeaderHeight || null;
                                container.explicitHeaderCanvasHeight = container.explicitHeaderCanvasHeight || null;

                                containerHeadersToRecalc.push(container);
                            }
                        }
                    }

                    // Build the styles without the explicit header heights
                    if (buildStyles) {
                        self.buildStyles();
                    }

                    /*
                     *
                     * Here we loop through the headers, measuring each element as well as any header "canvas" it has within it.
                     *
                     * If any header is less than the largest header height, it will be resized to that so that we don't have headers
                     * with different heights, which looks like a rendering problem
                     *
                     * We'll do the same thing with the header canvases, and give the header CELLS an explicit height if their canvas
                     * is smaller than the largest canvas height. That was header cells without extra controls like filtering don't
                     * appear shorter than other cells.
                     *
                     */
                    if (containerHeadersToRecalc.length > 0) {
                        // Putting in a timeout as it's not calculating after the grid element is rendered and filled out
                        $timeout(function() {
                            // var oldHeaderHeight = self.grid.headerHeight;
                            // self.grid.headerHeight = gridUtil.outerElementHeight(self.header);

                            var rebuildStyles = false;

                            // Get all the header heights
                            var maxHeaderHeight = 0;
                            var maxHeaderCanvasHeight = 0;
                            var i, container;
                            var getHeight = function(oldVal, newVal){
                                if ( oldVal !== newVal){
                                    rebuildStyles = true;
                                }
                                return newVal;
                            };
                            for (i = 0; i < containerHeadersToRecalc.length; i++) {
                                container = containerHeadersToRecalc[i];

                                // Skip containers that have no canvasWidth set yet
                                if (container.canvasWidth === null || isNaN(container.canvasWidth)) {
                                    continue;
                                }

                                if (container.header) {
                                    var headerHeight = container.headerHeight = getHeight(container.headerHeight, parseInt(gridUtil.outerElementHeight(container.header), 10));

                                    // Get the "inner" header height, that is the height minus the top and bottom borders, if present. We'll use it to make sure all the headers have a consistent height
                                    var topBorder = gridUtil.getBorderSize(container.header, 'top');
                                    var bottomBorder = gridUtil.getBorderSize(container.header, 'bottom');
                                    var innerHeaderHeight = parseInt(headerHeight - topBorder - bottomBorder, 10);

                                    innerHeaderHeight  = innerHeaderHeight < 0 ? 0 : innerHeaderHeight;

                                    container.innerHeaderHeight = innerHeaderHeight;

                                    // If the header doesn't have an explicit height set, save the largest header height for use later
                                    //   Explicit header heights are based off of the max we are calculating here. We never want to base the max on something we're setting explicitly
                                    if (!container.explicitHeaderHeight && innerHeaderHeight > maxHeaderHeight) {
                                        maxHeaderHeight = innerHeaderHeight;
                                    }
                                }

                                if (container.headerCanvas) {
                                    var headerCanvasHeight = container.headerCanvasHeight = getHeight(container.headerCanvasHeight, parseInt(gridUtil.outerElementHeight(container.headerCanvas), 10));


                                    // If the header doesn't have an explicit canvas height, save the largest header canvas height for use later
                                    //   Explicit header heights are based off of the max we are calculating here. We never want to base the max on something we're setting explicitly
                                    if (!container.explicitHeaderCanvasHeight && headerCanvasHeight > maxHeaderCanvasHeight) {
                                        maxHeaderCanvasHeight = headerCanvasHeight;
                                    }
                                }
                            }

                            // Go through all the headers
                            for (i = 0; i < containerHeadersToRecalc.length; i++) {
                                container = containerHeadersToRecalc[i];

                                /* If:
                                 1. We have a max header height
                                 2. This container has a header height defined
                                 3. And either this container has an explicit header height set, OR its header height is less than the max

                                 then:

                                 Give this container's header an explicit height so it will line up with the tallest header
                                 */
                                if (
                                    maxHeaderHeight > 0 && typeof(container.headerHeight) !== 'undefined' && container.headerHeight !== null &&
                                    (container.explicitHeaderHeight || container.headerHeight < maxHeaderHeight)
                                ) {
                                    container.explicitHeaderHeight = getHeight(container.explicitHeaderHeight, maxHeaderHeight);
                                }

                                // Do the same as above except for the header canvas
                                if (
                                    maxHeaderCanvasHeight > 0 && typeof(container.headerCanvasHeight) !== 'undefined' && container.headerCanvasHeight !== null &&
                                    (container.explicitHeaderCanvasHeight || container.headerCanvasHeight < maxHeaderCanvasHeight)
                                ) {
                                    container.explicitHeaderCanvasHeight = getHeight(container.explicitHeaderCanvasHeight, maxHeaderCanvasHeight);
                                }
                            }

                            // Rebuild styles if the header height has changed
                            //   The header height is used in body/viewport calculations and those are then used in other styles so we need it to be available
                            if (buildStyles && rebuildStyles) {
                                self.buildStyles();
                            }

                            p.resolve();
                        });
                    }
                    else {
                        // Timeout still needs to be here to trigger digest after styles have been rebuilt
                        $timeout(function() {
                            p.resolve();
                        });
                    }

                    return p.promise;
                };


                /**
                 * @ngdoc function
                 * @name redrawCanvas
                 * @methodOf ui.grid.class:Grid
                 * @description Redraw the rows and columns based on our current scroll position
                 * @param {boolean} [rowsAdded] Optional to indicate rows are added and the scroll percentage must be recalculated
                 *
                 */
                Grid.prototype.redrawInPlace = function redrawInPlace(rowsAdded) {
                    // gridUtil.logDebug('redrawInPlace');

                    var self = this;

                    for (var i in self.renderContainers) {
                        var container = self.renderContainers[i];

                        // gridUtil.logDebug('redrawing container', i);

                        if (rowsAdded) {
                            container.adjustRows(container.prevScrollTop, null);
                            container.adjustColumns(container.prevScrollLeft, null);
                        }
                        else {
                            container.adjustRows(null, container.prevScrolltopPercentage);
                            container.adjustColumns(null, container.prevScrollleftPercentage);
                        }
                    }
                };

                /**
                 * @ngdoc function
                 * @name hasLeftContainerColumns
                 * @methodOf ui.grid.class:Grid
                 * @description returns true if leftContainer has columns
                 */
                Grid.prototype.hasLeftContainerColumns = function () {
                    return this.hasLeftContainer() && this.renderContainers.left.renderedColumns.length > 0;
                };

                /**
                 * @ngdoc function
                 * @name hasRightContainerColumns
                 * @methodOf ui.grid.class:Grid
                 * @description returns true if rightContainer has columns
                 */
                Grid.prototype.hasRightContainerColumns = function () {
                    return this.hasRightContainer() && this.renderContainers.right.renderedColumns.length > 0;
                };

                /**
                 * @ngdoc method
                 * @methodOf  ui.grid.class:Grid
                 * @name scrollToIfNecessary
                 * @description Scrolls the grid to make a certain row and column combo visible,
                 *   in the case that it is not completely visible on the screen already.
                 * @param {GridRow} gridRow row to make visible
                 * @param {GridCol} gridCol column to make visible
                 * @returns {promise} a promise that is resolved when scrolling is complete
                 */
                Grid.prototype.scrollToIfNecessary = function (gridRow, gridCol) {
                    var self = this;

                    var scrollEvent = new ScrollEvent(self, 'uiGrid.scrollToIfNecessary');

                    // Alias the visible row and column caches
                    var visRowCache = self.renderContainers.body.visibleRowCache;
                    var visColCache = self.renderContainers.body.visibleColumnCache;

                    /*-- Get the top, left, right, and bottom "scrolled" edges of the grid --*/

                    // The top boundary is the current Y scroll position PLUS the header height, because the header can obscure rows when the grid is scrolled downwards
                    var topBound = self.renderContainers.body.prevScrollTop + self.headerHeight;

                    // Don't the let top boundary be less than 0
                    topBound = (topBound < 0) ? 0 : topBound;

                    // The left boundary is the current X scroll position
                    var leftBound = self.renderContainers.body.prevScrollLeft;

                    // The bottom boundary is the current Y scroll position, plus the height of the grid, but minus the header height.
                    //   Basically this is the viewport height added on to the scroll position
                    var bottomBound = self.renderContainers.body.prevScrollTop + self.gridHeight - self.renderContainers.body.headerHeight - self.footerHeight -  self.scrollbarWidth;

                    // If there's a horizontal scrollbar, remove its height from the bottom boundary, otherwise we'll be letting it obscure rows
                    //if (self.horizontalScrollbarHeight) {
                    //  bottomBound = bottomBound - self.horizontalScrollbarHeight;
                    //}

                    // The right position is the current X scroll position minus the grid width
                    var rightBound = self.renderContainers.body.prevScrollLeft + Math.ceil(self.renderContainers.body.getViewportWidth());

                    // If there's a vertical scrollbar, subtract it from the right boundary or we'll allow it to obscure cells
                    //if (self.verticalScrollbarWidth) {
                    //  rightBound = rightBound - self.verticalScrollbarWidth;
                    //}

                    // We were given a row to scroll to
                    if (gridRow !== null) {
                        // This is the index of the row we want to scroll to, within the list of rows that can be visible
                        var seekRowIndex = visRowCache.indexOf(gridRow);

                        // Total vertical scroll length of the grid
                        var scrollLength = (self.renderContainers.body.getCanvasHeight() - self.renderContainers.body.getViewportHeight());

                        // Add the height of the native horizontal scrollbar to the scroll length, if it's there. Otherwise it will mask over the final row
                        //if (self.horizontalScrollbarHeight && self.horizontalScrollbarHeight > 0) {
                        //  scrollLength = scrollLength + self.horizontalScrollbarHeight;
                        //}

                        // This is the minimum amount of pixels we need to scroll vertical in order to see this row.
                        var pixelsToSeeRow = (seekRowIndex * self.options.rowHeight + self.headerHeight);

                        // Don't let the pixels required to see the row be less than zero
                        pixelsToSeeRow = (pixelsToSeeRow < 0) ? 0 : pixelsToSeeRow;

                        var scrollPixels, percentage;

                        // If the scroll position we need to see the row is LESS than the top boundary, i.e. obscured above the top of the self...
                        if (pixelsToSeeRow < topBound) {
                            // Get the different between the top boundary and the required scroll position and subtract it from the current scroll position\
                            //   to get the full position we need
                            scrollPixels = self.renderContainers.body.prevScrollTop - (topBound - pixelsToSeeRow);

                            // Turn the scroll position into a percentage and make it an argument for a scroll event
                            percentage = scrollPixels / scrollLength;
                            scrollEvent.y = { percentage: percentage  };
                        }
                        // Otherwise if the scroll position we need to see the row is MORE than the bottom boundary, i.e. obscured below the bottom of the self...
                        else if (pixelsToSeeRow > bottomBound) {
                            // Get the different between the bottom boundary and the required scroll position and add it to the current scroll position
                            //   to get the full position we need
                            scrollPixels = pixelsToSeeRow - bottomBound + self.renderContainers.body.prevScrollTop;

                            // Turn the scroll position into a percentage and make it an argument for a scroll event
                            percentage = scrollPixels / scrollLength;
                            scrollEvent.y = { percentage: percentage  };
                        }
                    }

                    // We were given a column to scroll to
                    if (gridCol !== null) {
                        // This is the index of the column we want to scroll to, within the list of columns that can be visible
                        var seekColumnIndex = visColCache.indexOf(gridCol);

                        // Total horizontal scroll length of the grid
                        var horizScrollLength = (self.renderContainers.body.getCanvasWidth() - self.renderContainers.body.getViewportWidth());

                        // This is the minimum amount of pixels we need to scroll horizontal in order to see this column
                        var columnLeftEdge = 0;
                        for (var i = 0; i < seekColumnIndex; i++) {
                            var col = visColCache[i];
                            columnLeftEdge += col.drawnWidth;
                        }
                        columnLeftEdge = (columnLeftEdge < 0) ? 0 : columnLeftEdge;

                        var columnRightEdge = columnLeftEdge + gridCol.drawnWidth;

                        // Don't let the pixels required to see the column be less than zero
                        columnRightEdge = (columnRightEdge < 0) ? 0 : columnRightEdge;

                        var horizScrollPixels, horizPercentage;

                        // If the scroll position we need to see the column is LESS than the left boundary, i.e. obscured before the left of the self...
                        if (columnLeftEdge < leftBound) {
                            // Get the different between the left boundary and the required scroll position and subtract it from the current scroll position\
                            //   to get the full position we need
                            horizScrollPixels = self.renderContainers.body.prevScrollLeft - (leftBound - columnLeftEdge);

                            // Turn the scroll position into a percentage and make it an argument for a scroll event
                            horizPercentage = horizScrollPixels / horizScrollLength;
                            horizPercentage = (horizPercentage > 1) ? 1 : horizPercentage;
                            scrollEvent.x = { percentage: horizPercentage  };
                        }
                        // Otherwise if the scroll position we need to see the column is MORE than the right boundary, i.e. obscured after the right of the self...
                        else if (columnRightEdge > rightBound) {
                            // Get the different between the right boundary and the required scroll position and add it to the current scroll position
                            //   to get the full position we need
                            horizScrollPixels = columnRightEdge - rightBound + self.renderContainers.body.prevScrollLeft;

                            // Turn the scroll position into a percentage and make it an argument for a scroll event
                            horizPercentage = horizScrollPixels / horizScrollLength;
                            horizPercentage = (horizPercentage > 1) ? 1 : horizPercentage;
                            scrollEvent.x = { percentage: horizPercentage  };
                        }
                    }

                    var deferred = $q.defer();

                    // If we need to scroll on either the x or y axes, fire a scroll event
                    if (scrollEvent.y || scrollEvent.x) {
                        scrollEvent.withDelay = false;
                        self.scrollContainers('',scrollEvent);
                        var dereg = self.api.core.on.scrollEnd(null,function() {
                            deferred.resolve(scrollEvent);
                            dereg();
                        });
                    }
                    else {
                        deferred.resolve();
                    }

                    return deferred.promise;
                };

                /**
                 * @ngdoc method
                 * @methodOf ui.grid.class:Grid
                 * @name scrollTo
                 * @description Scroll the grid such that the specified
                 * row and column is in view
                 * @param {object} rowEntity gridOptions.data[] array instance to make visible
                 * @param {object} colDef to make visible
                 * @returns {promise} a promise that is resolved after any scrolling is finished
                 */
                Grid.prototype.scrollTo = function (rowEntity, colDef) {
                    var gridRow = null, gridCol = null;

                    if (rowEntity !== null && typeof(rowEntity) !== 'undefined' ) {
                        gridRow = this.getRow(rowEntity);
                    }

                    if (colDef !== null && typeof(colDef) !== 'undefined' ) {
                        gridCol = this.getColumn(colDef.name ? colDef.name : colDef.field);
                    }
                    return this.scrollToIfNecessary(gridRow, gridCol);
                };

                /**
                 * @ngdoc function
                 * @name clearAllFilters
                 * @methodOf ui.grid.class:Grid
                 * @description Clears all filters and optionally refreshes the visible rows.
                 * @param {object} refreshRows Defaults to true.
                 * @param {object} clearConditions Defaults to false.
                 * @param {object} clearFlags Defaults to false.
                 * @returns {promise} If `refreshRows` is true, returns a promise of the rows refreshing.
                 */
                Grid.prototype.clearAllFilters = function clearAllFilters(refreshRows, clearConditions, clearFlags) {
                    // Default `refreshRows` to true because it will be the most commonly desired behaviour.
                    if (refreshRows === undefined) {
                        refreshRows = true;
                    }
                    if (clearConditions === undefined) {
                        clearConditions = false;
                    }
                    if (clearFlags === undefined) {
                        clearFlags = false;
                    }

                    this.columns.forEach(function(column) {
                        column.filters.forEach(function(filter) {
                            filter.term = undefined;

                            if (clearConditions) {
                                filter.condition = undefined;
                            }

                            if (clearFlags) {
                                filter.flags = undefined;
                            }
                        });
                    });

                    if (refreshRows) {
                        return this.refreshRows();
                    }
                };


                // Blatantly stolen from Angular as it isn't exposed (yet? 2.0?)
                function RowHashMap() {}

                RowHashMap.prototype = {
                    /**
                     * Store key value pair
                     * @param key key to store can be any type
                     * @param value value to store can be any type
                     */
                    put: function(key, value) {
                        this[this.grid.options.rowIdentity(key)] = value;
                    },

                    /**
                     * @param key
                     * @returns {Object} the value for the key
                     */
                    get: function(key) {
                        return this[this.grid.options.rowIdentity(key)];
                    },

                    /**
                     * Remove the key/value pair
                     * @param key
                     */
                    remove: function(key) {
                        var value = this[key = this.grid.options.rowIdentity(key)];
                        delete this[key];
                        return value;
                    }
                };



                return Grid;

            }]);

})();

(function () {

    angular.module('ui.grid')
        .factory('GridApi', ['$q', '$rootScope', 'gridUtil', 'uiGridConstants', 'GridRow', 'uiGridGridMenuService',
            function ($q, $rootScope, gridUtil, uiGridConstants, GridRow, uiGridGridMenuService) {
                /**
                 * @ngdoc function
                 * @name ui.grid.class:GridApi
                 * @description GridApi provides the ability to register public methods events inside the grid and allow
                 * for other components to use the api via featureName.raise.methodName and featureName.on.eventName(function(args){}.
                 * <br/>
                 * To listen to events, you must add a callback to gridOptions.onRegisterApi
                 * <pre>
                 *   $scope.gridOptions.onRegisterApi = function(gridApi){
         *      gridApi.cellNav.on.navigate($scope,function(newRowCol, oldRowCol){
         *          $log.log('navigation event');
         *      });
         *   };
                 * </pre>
                 * @param {object} grid grid that owns api
                 */
                var GridApi = function GridApi(grid) {
                    this.grid = grid;
                    this.listeners = [];

                    /**
                     * @ngdoc function
                     * @name renderingComplete
                     * @methodOf  ui.grid.core.api:PublicApi
                     * @description Rendering is complete, called at the same
                     * time as `onRegisterApi`, but provides a way to obtain
                     * that same event within features without stopping end
                     * users from getting at the onRegisterApi method.
                     *
                     * Included in gridApi so that it's always there - otherwise
                     * there is still a timing problem with when a feature can
                     * call this.
                     *
                     * @param {GridApi} gridApi the grid api, as normally
                     * returned in the onRegisterApi method
                     *
                     * @example
                     * <pre>
                     *      gridApi.core.on.renderingComplete( grid );
                     * </pre>
                     */
                    this.registerEvent( 'core', 'renderingComplete' );

                    /**
                     * @ngdoc event
                     * @name filterChanged
                     * @eventOf  ui.grid.core.api:PublicApi
                     * @description  is raised after the filter is changed.  The nature
                     * of the watch expression doesn't allow notification of what changed,
                     * so the receiver of this event will need to re-extract the filter
                     * conditions from the columns.
                     *
                     */
                    this.registerEvent( 'core', 'filterChanged' );

                    /**
                     * @ngdoc function
                     * @name setRowInvisible
                     * @methodOf  ui.grid.core.api:PublicApi
                     * @description Sets an override on the row to make it always invisible,
                     * which will override any filtering or other visibility calculations.
                     * If the row is currently visible then sets it to invisible and calls
                     * both grid refresh and emits the rowsVisibleChanged event
                     * @param {GridRow} row the row we want to make invisible
                     */
                    this.registerMethod( 'core', 'setRowInvisible', GridRow.prototype.setRowInvisible );

                    /**
                     * @ngdoc function
                     * @name clearRowInvisible
                     * @methodOf  ui.grid.core.api:PublicApi
                     * @description Clears any override on visibility for the row so that it returns to
                     * using normal filtering and other visibility calculations.
                     * If the row is currently invisible then sets it to visible and calls
                     * both grid refresh and emits the rowsVisibleChanged event
                     * TODO: if a filter is active then we can't just set it to visible?
                     * @param {GridRow} row the row we want to make visible
                     */
                    this.registerMethod( 'core', 'clearRowInvisible', GridRow.prototype.clearRowInvisible );

                    /**
                     * @ngdoc function
                     * @name getVisibleRows
                     * @methodOf  ui.grid.core.api:PublicApi
                     * @description Returns all visible rows
                     * @param {Grid} grid the grid you want to get visible rows from
                     * @returns {array} an array of gridRow
                     */
                    this.registerMethod( 'core', 'getVisibleRows', this.grid.getVisibleRows );

                    /**
                     * @ngdoc event
                     * @name rowsVisibleChanged
                     * @eventOf  ui.grid.core.api:PublicApi
                     * @description  is raised after the rows that are visible
                     * change.  The filtering is zero-based, so it isn't possible
                     * to say which rows changed (unlike in the selection feature).
                     * We can plausibly know which row was changed when setRowInvisible
                     * is called, but in that situation the user already knows which row
                     * they changed.  When a filter runs we don't know what changed,
                     * and that is the one that would have been useful.
                     *
                     */
                    this.registerEvent( 'core', 'rowsVisibleChanged' );

                    /**
                     * @ngdoc event
                     * @name rowsRendered
                     * @eventOf  ui.grid.core.api:PublicApi
                     * @description  is raised after the cache of visible rows is changed.
                     */
                    this.registerEvent( 'core', 'rowsRendered' );


                    /**
                     * @ngdoc event
                     * @name scrollBegin
                     * @eventOf  ui.grid.core.api:PublicApi
                     * @description  is raised when scroll begins.  Is throttled, so won't be raised too frequently
                     */
                    this.registerEvent( 'core', 'scrollBegin' );

                    /**
                     * @ngdoc event
                     * @name scrollEnd
                     * @eventOf  ui.grid.core.api:PublicApi
                     * @description  is raised when scroll has finished.  Is throttled, so won't be raised too frequently
                     */
                    this.registerEvent( 'core', 'scrollEnd' );

                    /**
                     * @ngdoc event
                     * @name canvasHeightChanged
                     * @eventOf  ui.grid.core.api:PublicApi
                     * @description  is raised when the canvas height has changed
                     * <br/>
                     * arguments: oldHeight, newHeight
                     */
                    this.registerEvent( 'core', 'canvasHeightChanged');

                    /**
                     * @ngdoc event
                     * @name gridDimensionChanged
                     * @eventOf  ui.grid.core.api:PublicApi
                     * @description  is raised when the grid dimensions have changed (when autoResize is on)
                     * <br/>
                     * arguments: oldGridHeight, oldGridWidth, newGridHeight, newGridWidth
                     */
                    this.registerEvent( 'core', 'gridDimensionChanged');
                };

                /**
                 * @ngdoc function
                 * @name ui.grid.class:suppressEvents
                 * @methodOf ui.grid.class:GridApi
                 * @description Used to execute a function while disabling the specified event listeners.
                 * Disables the listenerFunctions, executes the callbackFn, and then enables
                 * the listenerFunctions again
                 * @param {object} listenerFuncs listenerFunc or array of listenerFuncs to suppress. These must be the same
                 * functions that were used in the .on.eventName method
                 * @param {object} callBackFn function to execute
                 * @example
                 * <pre>
                 *    var navigate = function (newRowCol, oldRowCol){
         *       //do something on navigate
         *    }
                 *
                 *    gridApi.cellNav.on.navigate(scope,navigate);
                 *
                 *
                 *    //call the scrollTo event and suppress our navigate listener
                 *    //scrollTo will still raise the event for other listeners
                 *    gridApi.suppressEvents(navigate, function(){
         *       gridApi.cellNav.scrollTo(aRow, aCol);
         *    });
                 *
                 * </pre>
                 */
                GridApi.prototype.suppressEvents = function (listenerFuncs, callBackFn) {
                    var self = this;
                    var listeners = angular.isArray(listenerFuncs) ? listenerFuncs : [listenerFuncs];

                    //find all registered listeners
                    var foundListeners = self.listeners.filter(function(listener) {
                        return listeners.some(function(l) {
                            return listener.handler === l;
                        });
                    });

                    //deregister all the listeners
                    foundListeners.forEach(function(l){
                        l.dereg();
                    });

                    callBackFn();

                    //reregister all the listeners
                    foundListeners.forEach(function(l){
                        l.dereg = registerEventWithAngular(l.eventId, l.handler, self.grid, l._this);
                    });

                };

                /**
                 * @ngdoc function
                 * @name registerEvent
                 * @methodOf ui.grid.class:GridApi
                 * @description Registers a new event for the given feature.  The event will get a
                 * .raise and .on prepended to it
                 * <br>
                 * .raise.eventName() - takes no arguments
                 * <br/>
                 * <br/>
                 * .on.eventName(scope, callBackFn, _this)
                 * <br/>
                 * scope - a scope reference to add a deregister call to the scopes .$on('destroy').  Scope is optional and can be a null value,
                 * but in this case you must deregister it yourself via the returned deregister function
                 * <br/>
                 * callBackFn - The function to call
                 * <br/>
                 * _this - optional this context variable for callbackFn. If omitted, grid.api will be used for the context
                 * <br/>
                 * .on.eventName returns a dereg funtion that will remove the listener.  It's not necessary to use it as the listener
                 * will be removed when the scope is destroyed.
                 * @param {string} featureName name of the feature that raises the event
                 * @param {string} eventName  name of the event
                 */
                GridApi.prototype.registerEvent = function (featureName, eventName) {
                    var self = this;
                    if (!self[featureName]) {
                        self[featureName] = {};
                    }

                    var feature = self[featureName];
                    if (!feature.on) {
                        feature.on = {};
                        feature.raise = {};
                    }

                    var eventId = self.grid.id + featureName + eventName;

                    // gridUtil.logDebug('Creating raise event method ' + featureName + '.raise.' + eventName);
                    feature.raise[eventName] = function () {
                        $rootScope.$emit.apply($rootScope, [eventId].concat(Array.prototype.slice.call(arguments)));
                    };

                    // gridUtil.logDebug('Creating on event method ' + featureName + '.on.' + eventName);
                    feature.on[eventName] = function (scope, handler, _this) {
                        if ( scope !== null && typeof(scope.$on) === 'undefined' ){
                            gridUtil.logError('asked to listen on ' + featureName + '.on.' + eventName + ' but scope wasn\'t passed in the input parameters.  It is legitimate to pass null, but you\'ve passed something else, so you probably forgot to provide scope rather than did it deliberately, not registering');
                            return;
                        }
                        var deregAngularOn = registerEventWithAngular(eventId, handler, self.grid, _this);

                        //track our listener so we can turn off and on
                        var listener = {handler: handler, dereg: deregAngularOn, eventId: eventId, scope: scope, _this:_this};
                        self.listeners.push(listener);

                        var removeListener = function(){
                            listener.dereg();
                            var index = self.listeners.indexOf(listener);
                            self.listeners.splice(index,1);
                        };

                        //destroy tracking when scope is destroyed
                        if (scope) {
                            scope.$on('$destroy', function() {
                                removeListener();
                            });
                        }


                        return removeListener;
                    };
                };

                function registerEventWithAngular(eventId, handler, grid, _this) {
                    return $rootScope.$on(eventId, function (event) {
                        var args = Array.prototype.slice.call(arguments);
                        args.splice(0, 1); //remove evt argument
                        handler.apply(_this ? _this : grid.api, args);
                    });
                }

                /**
                 * @ngdoc function
                 * @name registerEventsFromObject
                 * @methodOf ui.grid.class:GridApi
                 * @description Registers features and events from a simple objectMap.
                 * eventObjectMap must be in this format (multiple features allowed)
                 * <pre>
                 * {featureName:
         *        {
         *          eventNameOne:function(args){},
         *          eventNameTwo:function(args){}
         *        }
         *  }
                 * </pre>
                 * @param {object} eventObjectMap map of feature/event names
                 */
                GridApi.prototype.registerEventsFromObject = function (eventObjectMap) {
                    var self = this;
                    var features = [];
                    angular.forEach(eventObjectMap, function (featProp, featPropName) {
                        var feature = {name: featPropName, events: []};
                        angular.forEach(featProp, function (prop, propName) {
                            feature.events.push(propName);
                        });
                        features.push(feature);
                    });

                    features.forEach(function (feature) {
                        feature.events.forEach(function (event) {
                            self.registerEvent(feature.name, event);
                        });
                    });

                };

                /**
                 * @ngdoc function
                 * @name registerMethod
                 * @methodOf ui.grid.class:GridApi
                 * @description Registers a new event for the given feature
                 * @param {string} featureName name of the feature
                 * @param {string} methodName  name of the method
                 * @param {object} callBackFn function to execute
                 * @param {object} _this binds callBackFn 'this' to _this.  Defaults to gridApi.grid
                 */
                GridApi.prototype.registerMethod = function (featureName, methodName, callBackFn, _this) {
                    if (!this[featureName]) {
                        this[featureName] = {};
                    }

                    var feature = this[featureName];

                    feature[methodName] = gridUtil.createBoundedWrapper(_this || this.grid, callBackFn);
                };

                /**
                 * @ngdoc function
                 * @name registerMethodsFromObject
                 * @methodOf ui.grid.class:GridApi
                 * @description Registers features and methods from a simple objectMap.
                 * eventObjectMap must be in this format (multiple features allowed)
                 * <br>
                 * {featureName:
         *        {
         *          methodNameOne:function(args){},
         *          methodNameTwo:function(args){}
         *        }
                 * @param {object} eventObjectMap map of feature/event names
                 * @param {object} _this binds this to _this for all functions.  Defaults to gridApi.grid
                 */
                GridApi.prototype.registerMethodsFromObject = function (methodMap, _this) {
                    var self = this;
                    var features = [];
                    angular.forEach(methodMap, function (featProp, featPropName) {
                        var feature = {name: featPropName, methods: []};
                        angular.forEach(featProp, function (prop, propName) {
                            feature.methods.push({name: propName, fn: prop});
                        });
                        features.push(feature);
                    });

                    features.forEach(function (feature) {
                        feature.methods.forEach(function (method) {
                            self.registerMethod(feature.name, method.name, method.fn, _this);
                        });
                    });

                };

                return GridApi;

            }]);

})();

(function(){

    angular.module('ui.grid')
        .factory('GridColumn', ['gridUtil', 'uiGridConstants', 'i18nService', function(gridUtil, uiGridConstants, i18nService) {

            /**
             * ******************************************************************************************
             * PaulL1: Ugly hack here in documentation.  These properties are clearly properties of GridColumn,
             * and need to be noted as such for those extending and building ui-grid itself.
             * However, from an end-developer perspective, they interact with all these through columnDefs,
             * and they really need to be documented there.  I feel like they're relatively static, and
             * I can't find an elegant way for ngDoc to reference to both....so I've duplicated each
             * comment block.  Ugh.
             *
             */

            /**
             * @ngdoc property
             * @name name
             * @propertyOf ui.grid.class:GridColumn
             * @description (mandatory) Each column should have a name, although for backward
             * compatibility with 2.x name can be omitted if field is present.
             *
             * Important - This must be unique to each column on a web page since it can
             * be used as a key for retrieving information such as custom sort algorithms.
             *
             */

            /**
             * @ngdoc property
             * @name name
             * @propertyOf ui.grid.class:GridOptions.columnDef
             * @description (mandatory) Each column should have a name, although for backward
             * compatibility with 2.x name can be omitted if field is present.
             *
             * Important - This must be unique to each column on a web page since it can
             * be used as a key for retrieving information such as custom sort algorithms.
             *
             */

            /**
             * @ngdoc property
             * @name displayName
             * @propertyOf ui.grid.class:GridColumn
             * @description Column name that will be shown in the header.  If displayName is not
             * provided then one is generated using the name.
             *
             */

            /**
             * @ngdoc property
             * @name displayName
             * @propertyOf ui.grid.class:GridOptions.columnDef
             * @description Column name that will be shown in the header.  If displayName is not
             * provided then one is generated using the name.
             *
             */

            /**
             * @ngdoc property
             * @name field
             * @propertyOf ui.grid.class:GridColumn
             * @description field must be provided if you wish to bind to a
             * property in the data source.  Should be an angular expression that evaluates against grid.options.data
             * array element.  Can be a complex expression: <code>employee.address.city</code>, or can be a function: <code>employee.getFullAddress()</code>.
             * See the angular docs on binding expressions.
             *
             */

            /**
             * @ngdoc property
             * @name field
             * @propertyOf ui.grid.class:GridOptions.columnDef
             * @description field must be provided if you wish to bind to a
             * property in the data source.  Should be an angular expression that evaluates against grid.options.data
             * array element.  Can be a complex expression: <code>employee.address.city</code>, or can be a function: <code>employee.getFullAddress()</code>.    * See the angular docs on binding expressions.    *
             */

            /**
             * @ngdoc property
             * @name filter
             * @propertyOf ui.grid.class:GridColumn
             * @description Filter on this column.
             *
             * Available built-in conditions and types are listed under {@link jui.grid.service:uiGridConstants#properties_filter uiGridOptions.filter}
             * @example
             * <pre>{ term: 'text', condition: uiGridConstants.filter.STARTS_WITH, placeholder: 'type to filter...', ariaLabel: 'Filter for text', flags: { caseSensitive: false }, type: uiGridConstants.filter.SELECT, [ { value: 1, label: 'male' }, { value: 2, label: 'female' } ] }</pre>
             *
             */

            /**
             * @ngdoc property
             * @name extraStyle
             * @propertyOf ui.grid.class:GridColumn
             * @description additional on this column.
             * @example
             * <pre>{extraStyle: {display:'table-cell'}}</pre>
             *
             */

            /**
             * @ngdoc object
             * @name ui.grid.class:GridColumn
             * @description Represents the viewModel for each column.  Any state or methods needed for a Grid Column
             * are defined on this prototype
             * @param {ColumnDef} colDef the column def to associate with this column
             * @param {number} uid the unique and immutable uid we'd like to allocate to this column
             * @param {Grid} grid the grid we'd like to create this column in
             */
            function GridColumn(colDef, uid, grid) {
                var self = this;

                self.grid = grid;
                self.uid = uid;

                self.updateColumnDef(colDef, true);

                self.aggregationValue = undefined;

                // The footer cell registers to listen for the rowsRendered event, and calls this.  Needed to be
                // in something with a scope so that the dereg would get called
                self.updateAggregationValue = function() {

                    // gridUtil.logDebug('getAggregationValue for Column ' + self.colDef.name);

                    /**
                     * @ngdoc property
                     * @name aggregationType
                     * @propertyOf ui.grid.class:GridOptions.columnDef
                     * @description The aggregation that you'd like to show in the columnFooter for this
                     * column.  Valid values are in
                     * {@link ui.grid.service:uiGridConstants#properties_aggregationTypes uiGridConstants.aggregationTypes},
                     * and currently include `uiGridConstants.aggregationTypes.count`,
                     * `uiGridConstants.aggregationTypes.sum`, `uiGridConstants.aggregationTypes.avg`, `uiGridConstants.aggregationTypes.min`,
                     * `uiGridConstants.aggregationTypes.max`.
                     *
                     * You can also provide a function as the aggregation type, in this case your function needs to accept the full
                     * set of visible rows, and return a value that should be shown
                     */
                    if (!self.aggregationType) {
                        self.aggregationValue = undefined;
                        return;
                    }

                    var result = 0;
                    var visibleRows = self.grid.getVisibleRows();

                    var cellValues = function(){
                        var values = [];
                        visibleRows.forEach(function (row) {
                            var cellValue = self.grid.getCellValue(row, self);
                            var cellNumber = Number(cellValue);
                            if (!isNaN(cellNumber)) {
                                values.push(cellNumber);
                            }
                        });
                        return values;
                    };

                    if (angular.isFunction(self.aggregationType)) {
                        self.aggregationValue = self.aggregationType(visibleRows, self);
                    }
                    else if (self.aggregationType === uiGridConstants.aggregationTypes.count) {
                        self.aggregationValue = self.grid.getVisibleRowCount();
                    }
                    else if (self.aggregationType === uiGridConstants.aggregationTypes.sum) {
                        cellValues().forEach(function (value) {
                            result += value;
                        });
                        self.aggregationValue = result;
                    }
                    else if (self.aggregationType === uiGridConstants.aggregationTypes.avg) {
                        cellValues().forEach(function (value) {
                            result += value;
                        });
                        result = result / cellValues().length;
                        self.aggregationValue = result;
                    }
                    else if (self.aggregationType === uiGridConstants.aggregationTypes.min) {
                        self.aggregationValue = Math.min.apply(null, cellValues());
                    }
                    else if (self.aggregationType === uiGridConstants.aggregationTypes.max) {
                        self.aggregationValue = Math.max.apply(null, cellValues());
                    }
                    else {
                        self.aggregationValue = '\u00A0';
                    }
                };

//     var throttledUpdateAggregationValue = gridUtil.throttle(updateAggregationValue, self.grid.options.aggregationCalcThrottle, { trailing: true, context: self.name });

                /**
                 * @ngdoc function
                 * @name getAggregationValue
                 * @methodOf ui.grid.class:GridColumn
                 * @description gets the aggregation value based on the aggregation type for this column.
                 * Debounced using scrollDebounce option setting
                 */
                this.getAggregationValue =  function() {
//      if (!self.grid.isScrollingVertically && !self.grid.isScrollingHorizontally) {
//        throttledUpdateAggregationValue();
//      }

                    return self.aggregationValue;
                };
            }

            /**
             * @ngdoc function
             * @name hideColumn
             * @methodOf ui.grid.class:GridColumn
             * @description Hides the column by setting colDef.visible = false
             */
            GridColumn.prototype.hideColumn = function() {
                this.colDef.visible = false;
            };


            /**
             * @ngdoc method
             * @methodOf ui.grid.class:GridColumn
             * @name setPropertyOrDefault
             * @description Sets a property on the column using the passed in columnDef, and
             * setting the defaultValue if the value cannot be found on the colDef
             * @param {ColumnDef} colDef the column def to look in for the property value
             * @param {string} propName the property name we'd like to set
             * @param {object} defaultValue the value to use if the colDef doesn't provide the setting
             */
            GridColumn.prototype.setPropertyOrDefault = function (colDef, propName, defaultValue) {
                var self = this;

                // Use the column definition filter if we were passed it
                if (typeof(colDef[propName]) !== 'undefined' && colDef[propName]) {
                    self[propName] = colDef[propName];
                }
                // Otherwise use our own if it's set
                else if (typeof(self[propName]) !== 'undefined') {
                    self[propName] = self[propName];
                }
                // Default to empty object for the filter
                else {
                    self[propName] = defaultValue ? defaultValue : {};
                }
            };



            /**
             * @ngdoc property
             * @name width
             * @propertyOf ui.grid.class:GridOptions.columnDef
             * @description sets the column width.  Can be either
             * a number or a percentage, or an * for auto.
             * @example
             * <pre>  $scope.gridOptions.columnDefs = [ { field: 'field1', width: 100},
             *                                          { field: 'field2', width: '20%'},
             *                                          { field: 'field3', width: '*' }]; </pre>
             *
             */

            /**
             * @ngdoc property
             * @name minWidth
             * @propertyOf ui.grid.class:GridOptions.columnDef
             * @description sets the minimum column width.  Should be a number.
             * @example
             * <pre>  $scope.gridOptions.columnDefs = [ { field: 'field1', minWidth: 100}]; </pre>
             *
             */

            /**
             * @ngdoc property
             * @name maxWidth
             * @propertyOf ui.grid.class:GridOptions.columnDef
             * @description sets the maximum column width.  Should be a number.
             * @example
             * <pre>  $scope.gridOptions.columnDefs = [ { field: 'field1', maxWidth: 100}]; </pre>
             *
             */

            /**
             * @ngdoc property
             * @name visible
             * @propertyOf ui.grid.class:GridOptions.columnDef
             * @description sets whether or not the column is visible
             * </br>Default is true
             * @example
             * <pre>  $scope.gridOptions.columnDefs = [
             *     { field: 'field1', visible: true},
             *     { field: 'field2', visible: false }
             *   ]; </pre>
             *
             */

            /**
             * @ngdoc property
             * @name sort
             * @propertyOf ui.grid.class:GridOptions.columnDef
             * @description An object of sort information, attributes are:
             *
             * - direction: values are {@link ui.grid.service:uiGridConstants#properties_ASC uiGridConstants.ASC}
             *  or {@link ui.grid.service:uiGridConstants#properties_DESC uiGridConstants.DESC}
             * - ignoreSort: if set to true this sort is ignored (used by tree to manipulate the sort functionality)
             * - priority: says what order to sort the columns in (lower priority gets sorted first).
             * @example
             * <pre>
             *   $scope.gridOptions.columnDefs = [{
  *     field: 'field1',
  *     sort: {
  *       direction: uiGridConstants.ASC,
  *       ignoreSort: true,
  *       priority: 0
  *      }
  *   }];
             * </pre>
             */


            /**
             * @ngdoc property
             * @name sortingAlgorithm
             * @propertyOf ui.grid.class:GridOptions.columnDef
             * @description Algorithm to use for sorting this column. Takes 'a' and 'b' parameters
             * like any normal sorting function with additional 'rowA', 'rowB', and 'direction' parameters
             * that are the row objects and the current direction of the sort respectively.
             *
             */

            /**
             * @ngdoc property
             * @name defaultSort
             * @propertyOf ui.grid.class:GridOptions.columnDef
             * @description An object of sort information, provides a hidden default ordering of the data
             * when no user sorts are applied, or when a user-provided sort deems two rows to be equal.
             *
             * May be combined with a regular {@link ui.grid.class:GridOptions.columnDef#properties_sort columnDef.sort}
             * to explicitly sort by that column by default.
             *
             * Shares the same object format as {@link ui.grid.class:GridOptions.columnDef#properties_sort columnDef.sort}.
             *
             * Note that a defaultSort can never take priority over an explicit sort.
             * @example
             * <pre>
             *   $scope.gridOptions.columnDefs = [{
    *     field: 'field1',
    *     defaultSort: {
    *       direction: uiGridConstants.ASC,
    *       priority: 0
    *      }
    *   }];
             * </pre>
             */

            /**
             * @ngdoc array
             * @name filters
             * @propertyOf ui.grid.class:GridOptions.columnDef
             * @description Specify multiple filter fields.
             * @example
             * <pre>$scope.gridOptions.columnDefs = [
             *   {
   *     field: 'field1', filters: [
   *       {
   *         term: 'aa',
   *         condition: uiGridConstants.filter.STARTS_WITH,
   *         placeholder: 'starts with...',
   *         ariaLabel: 'Filter for field1',
   *         flags: { caseSensitive: false },
   *         type: uiGridConstants.filter.SELECT,
   *         selectOptions: [ { value: 1, label: 'male' }, { value: 2, label: 'female' } ]
   *       },
   *       {
   *         condition: uiGridConstants.filter.ENDS_WITH,
   *         placeholder: 'ends with...'
   *       }
   *     ]
   *   }
             * ]; </pre>
             *
             *
             */

            /**
             * @ngdoc array
             * @name filters
             * @propertyOf ui.grid.class:GridColumn
             * @description Filters for this column. Includes 'term' property bound to filter input elements.
             * @example
             * <pre>[
             *   {
   *     term: 'foo', // ngModel for <input>
   *     condition: uiGridConstants.filter.STARTS_WITH,
   *     placeholder: 'starts with...',
   *     ariaLabel: 'Filter for foo',
   *     flags: { caseSensitive: false },
   *     type: uiGridConstants.filter.SELECT,
   *     selectOptions: [ { value: 1, label: 'male' }, { value: 2, label: 'female' } ]
   *   },
             *   {
   *     term: 'baz',
   *     condition: uiGridConstants.filter.ENDS_WITH,
   *     placeholder: 'ends with...'
   *   }
             * ] </pre>
             *
             *
             */

            /**
             * @ngdoc array
             * @name menuItems
             * @propertyOf ui.grid.class:GridOptions.columnDef
             * @description used to add menu items to a column.  Refer to the tutorial on this
             * functionality.  A number of settings are supported:
             *
             * - title: controls the title that is displayed in the menu
             * - icon: the icon shown alongside that title
             * - action: the method to call when the menu is clicked
             * - shown: a function to evaluate to determine whether or not to show the item
             * - active: a function to evaluate to determine whether or not the item is currently selected
             * - context: context to pass to the action function, available in this.context in your handler
             * - leaveOpen: if set to true, the menu should stay open after the action, defaults to false
             * @example
             * <pre>  $scope.gridOptions.columnDefs = [
             *   { field: 'field1', menuItems: [
   *     {
   *       title: 'Outer Scope Alert',
   *       icon: 'ui-grid-icon-info-circled',
   *       action: function($event) {
   *         this.context.blargh(); // $scope.blargh() would work too, this is just an example
   *       },
   *       shown: function() { return true; },
   *       active: function() { return true; },
   *       context: $scope
   *     },
   *     {
   *       title: 'Grid ID',
   *       action: function() {
   *         alert('Grid ID: ' + this.grid.id);
   *       }
   *     }
   *   ] }]; </pre>
             *
             */

            /**
             * @ngdoc method
             * @methodOf ui.grid.class:GridColumn
             * @name updateColumnDef
             * @description Moves settings from the columnDef down onto the column,
             * and sets properties as appropriate
             * @param {ColumnDef} colDef the column def to look in for the property value
             * @param {boolean} isNew whether the column is being newly created, if not
             * we're updating an existing column, and some items such as the sort shouldn't
             * be copied down
             */
            GridColumn.prototype.updateColumnDef = function(colDef, isNew) {
                var self = this;

                self.colDef = colDef;

                if (colDef.name === undefined) {
                    throw new Error('colDef.name is required for column at index ' + self.grid.options.columnDefs.indexOf(colDef));
                }

                self.displayName = (colDef.displayName === undefined) ? gridUtil.readableColumnName(colDef.name) : colDef.displayName;

                if (!angular.isNumber(self.width) || !self.hasCustomWidth || colDef.allowCustomWidthOverride) {
                    var colDefWidth = colDef.width;
                    var parseErrorMsg = "Cannot parse column width '" + colDefWidth + "' for column named '" + colDef.name + "'";
                    self.hasCustomWidth = false;

                    if (!angular.isString(colDefWidth) && !angular.isNumber(colDefWidth)) {
                        self.width = '*';
                    } else if (angular.isString(colDefWidth)) {
                        // See if it ends with a percent
                        if (gridUtil.endsWith(colDefWidth, '%')) {
                            // If so we should be able to parse the non-percent-sign part to a number
                            var percentStr = colDefWidth.replace(/%/g, '');
                            var percent = parseInt(percentStr, 10);
                            if (isNaN(percent)) {
                                throw new Error(parseErrorMsg);
                            }
                            self.width = colDefWidth;
                        }
                        // And see if it's a number string
                        else if (colDefWidth.match(/^(\d+)$/)) {
                            self.width = parseInt(colDefWidth.match(/^(\d+)$/)[1], 10);
                        }
                        // Otherwise it should be a string of asterisks
                        else if (colDefWidth.match(/^\*+$/)) {
                            self.width = colDefWidth;
                        }
                        // No idea, throw an Error
                        else {
                            throw new Error(parseErrorMsg);
                        }
                    }
                    // Is a number, use it as the width
                    else {
                        self.width = colDefWidth;
                    }
                }

                ['minWidth', 'maxWidth'].forEach(function (name) {
                    var minOrMaxWidth = colDef[name];
                    var parseErrorMsg = "Cannot parse column " + name + " '" + minOrMaxWidth + "' for column named '" + colDef.name + "'";

                    if (!angular.isString(minOrMaxWidth) && !angular.isNumber(minOrMaxWidth)) {
                        //Sets default minWidth and maxWidth values
                        self[name] = ((name === 'minWidth') ? 30 : 9000);
                    } else if (angular.isString(minOrMaxWidth)) {
                        if (minOrMaxWidth.match(/^(\d+)$/)) {
                            self[name] = parseInt(minOrMaxWidth.match(/^(\d+)$/)[1], 10);
                        } else {
                            throw new Error(parseErrorMsg);
                        }
                    } else {
                        self[name] = minOrMaxWidth;
                    }
                });

                //use field if it is defined; name if it is not
                self.field = (colDef.field === undefined) ? colDef.name : colDef.field;

                if ( typeof( self.field ) !== 'string' ){
                    gridUtil.logError( 'Field is not a string, this is likely to break the code, Field is: ' + self.field );
                }

                self.name = colDef.name;

                // Use colDef.displayName as long as it's not undefined, otherwise default to the field name
                self.displayName = (colDef.displayName === undefined) ? gridUtil.readableColumnName(colDef.name) : colDef.displayName;

                //self.originalIndex = index;

                self.aggregationType = angular.isDefined(colDef.aggregationType) ? colDef.aggregationType : null;
                self.footerCellTemplate = angular.isDefined(colDef.footerCellTemplate) ? colDef.footerCellTemplate : null;

                /**
                 * @ngdoc property
                 * @name cellTooltip
                 * @propertyOf ui.grid.class:GridOptions.columnDef
                 * @description Whether or not to show a tooltip when a user hovers over the cell.
                 * If set to false, no tooltip.  If true, the cell value is shown in the tooltip (useful
                 * if you have long values in your cells), if a function then that function is called
                 * passing in the row and the col `cellTooltip( row, col )`, and the return value is shown in the tooltip,
                 * if it is a static string then displays that static string.
                 *
                 * Defaults to false
                 *
                 */
                if ( typeof(colDef.cellTooltip) === 'undefined' || colDef.cellTooltip === false ) {
                    self.cellTooltip = false;
                } else if ( colDef.cellTooltip === true ){
                    self.cellTooltip = function(row, col) {
                        return self.grid.getCellValue( row, col );
                    };
                } else if (typeof(colDef.cellTooltip) === 'function' ){
                    self.cellTooltip = colDef.cellTooltip;
                } else {
                    self.cellTooltip = function ( row, col ){
                        return col.colDef.cellTooltip;
                    };
                }

                /**
                 * @ngdoc property
                 * @name headerTooltip
                 * @propertyOf ui.grid.class:GridOptions.columnDef
                 * @description Whether or not to show a tooltip when a user hovers over the header cell.
                 * If set to false, no tooltip.  If true, the displayName is shown in the tooltip (useful
                 * if you have long values in your headers), if a function then that function is called
                 * passing in the row and the col `headerTooltip( col )`, and the return value is shown in the tooltip,
                 * if a static string then shows that static string.
                 *
                 * Defaults to false
                 *
                 */
                if ( typeof(colDef.headerTooltip) === 'undefined' || colDef.headerTooltip === false ) {
                    self.headerTooltip = false;
                } else if ( colDef.headerTooltip === true ){
                    self.headerTooltip = function(col) {
                        return col.displayName;
                    };
                } else if (typeof(colDef.headerTooltip) === 'function' ){
                    self.headerTooltip = colDef.headerTooltip;
                } else {
                    self.headerTooltip = function ( col ) {
                        return col.colDef.headerTooltip;
                    };
                }


                /**
                 * @ngdoc property
                 * @name footerCellClass
                 * @propertyOf ui.grid.class:GridOptions.columnDef
                 * @description footerCellClass can be a string specifying the class to append to a cell
                 * or it can be a function(grid, row, col, rowRenderIndex, colRenderIndex) that returns a class name
                 *
                 */
                self.footerCellClass = colDef.footerCellClass;

                /**
                 * @ngdoc property
                 * @name cellClass
                 * @propertyOf ui.grid.class:GridOptions.columnDef
                 * @description cellClass can be a string specifying the class to append to a cell
                 * or it can be a function(grid, row, col, rowRenderIndex, colRenderIndex) that returns a class name
                 *
                 */
                self.cellClass = colDef.cellClass;

                /**
                 * @ngdoc property
                 * @name headerCellClass
                 * @propertyOf ui.grid.class:GridOptions.columnDef
                 * @description headerCellClass can be a string specifying the class to append to a cell
                 * or it can be a function(grid, row, col, rowRenderIndex, colRenderIndex) that returns a class name
                 *
                 */
                self.headerCellClass = colDef.headerCellClass;

                /**
                 * @ngdoc property
                 * @name cellFilter
                 * @propertyOf ui.grid.class:GridOptions.columnDef
                 * @description cellFilter is a filter to apply to the content of each cell
                 * @example
                 * <pre>
                 *   gridOptions.columnDefs[0].cellFilter = 'date'
                 *
                 */
                self.cellFilter = colDef.cellFilter ? colDef.cellFilter : "";

                /**
                 * @ngdoc boolean
                 * @name sortCellFiltered
                 * @propertyOf ui.grid.class:GridOptions.columnDef
                 * @description (optional) False by default. When `true` uiGrid will apply the cellFilter before
                 * sorting the data. Note that when using this option uiGrid will assume that the displayed value is
                 * a string, and use the {@link ui.grid.class:RowSorter#sortAlpha sortAlpha} `sortFn`. It is possible
                 * to return a non-string value from an angularjs filter, in which case you should define a {@link ui.grid.class:GridOptions.columnDef#sortingAlgorithm sortingAlgorithm}
                 * for the column which hanldes the returned type. You may specify one of the `sortingAlgorithms`
                 * found in the {@link ui.grid.RowSorter rowSorter} service.
                 */
                self.sortCellFiltered = colDef.sortCellFiltered ? true : false;

                /**
                 * @ngdoc boolean
                 * @name filterCellFiltered
                 * @propertyOf ui.grid.class:GridOptions.columnDef
                 * @description (optional) False by default. When `true` uiGrid will apply the cellFilter before
                 * applying "search" `filters`.
                 */
                self.filterCellFiltered = colDef.filterCellFiltered ? true : false;

                /**
                 * @ngdoc property
                 * @name headerCellFilter
                 * @propertyOf ui.grid.class:GridOptions.columnDef
                 * @description headerCellFilter is a filter to apply to the content of the column header
                 * @example
                 * <pre>
                 *   gridOptions.columnDefs[0].headerCellFilter = 'translate'
                 *
                 */
                self.headerCellFilter = colDef.headerCellFilter ? colDef.headerCellFilter : "";

                /**
                 * @ngdoc property
                 * @name footerCellFilter
                 * @propertyOf ui.grid.class:GridOptions.columnDef
                 * @description footerCellFilter is a filter to apply to the content of the column footer
                 * @example
                 * <pre>
                 *   gridOptions.columnDefs[0].footerCellFilter = 'date'
                 *
                 */
                self.footerCellFilter = colDef.footerCellFilter ? colDef.footerCellFilter : "";

                self.visible = gridUtil.isNullOrUndefined(colDef.visible) || colDef.visible;

                self.headerClass = colDef.headerClass;
                //self.cursor = self.sortable ? 'pointer' : 'default';

                // Turn on sorting by default
                self.enableSorting = typeof(colDef.enableSorting) !== 'undefined' ? colDef.enableSorting : self.grid.options.enableSorting;
                self.sortingAlgorithm = colDef.sortingAlgorithm;

                /**
                 * @ngdoc property
                 * @name sortDirectionCycle
                 * @propertyOf ui.grid.class:GridOptions.columnDef
                 * @description (optional) An array of {@link ui.grid.service:uiGridConstants#properties_ASC sort directions},
                 * specifying the order that they should cycle through as the user repeatedly clicks on the column heading.
                 * The default is `[null, uiGridConstants.ASC, uiGridConstants.DESC]`. Null
                 * refers to the unsorted state. This does not affect the initial sort
                 * direction; use the {@link ui.grid.class:GridOptions.columnDef#sort sort}
                 * property for that. If
                 * {@link ui.grid.class:GridOptions.columnDef#suppressRemoveSort suppressRemoveSort}
                 * is also set, the unsorted state will be skipped even if it is listed here.
                 * Each direction may not appear in the list more than once (e.g. `[ASC,
                 * DESC, DESC]` is not allowed), and the list may not be empty.
                 */
                self.sortDirectionCycle = typeof(colDef.sortDirectionCycle) !== 'undefined' ?
                    colDef.sortDirectionCycle :
                    [null, uiGridConstants.ASC, uiGridConstants.DESC];

                /**
                 * @ngdoc boolean
                 * @name suppressRemoveSort
                 * @propertyOf ui.grid.class:GridOptions.columnDef
                 * @description (optional) False by default. When enabled, this setting hides the removeSort option
                 * in the menu, and prevents users from manually removing the sort
                 */
                if ( typeof(self.suppressRemoveSort) === 'undefined'){
                    self.suppressRemoveSort = typeof(colDef.suppressRemoveSort) !== 'undefined' ? colDef.suppressRemoveSort : false;
                }

                /**
                 * @ngdoc property
                 * @name enableFiltering
                 * @propertyOf ui.grid.class:GridOptions.columnDef
                 * @description turn off filtering for an individual column, where
                 * you've turned on filtering for the overall grid
                 * @example
                 * <pre>
                 *   gridOptions.columnDefs[0].enableFiltering = false;
                 *
                 */
                // Turn on filtering by default (it's disabled by default at the Grid level)
                self.enableFiltering = typeof(colDef.enableFiltering) !== 'undefined' ? colDef.enableFiltering : true;

                // self.menuItems = colDef.menuItems;
                self.setPropertyOrDefault(colDef, 'menuItems', []);

                // Use the column definition sort if we were passed it, but only if this is a newly added column
                if ( isNew ){
                    self.setPropertyOrDefault(colDef, 'sort');
                }

                // Use the column definition defaultSort always, unlike normal sort
                self.setPropertyOrDefault(colDef, 'defaultSort');

                // Set up default filters array for when one is not provided.
                //   In other words, this (in column def):
                //
                //       filter: { term: 'something', flags: {}, condition: [CONDITION] }
                //
                //   is just shorthand for this:
                //
                //       filters: [{ term: 'something', flags: {}, condition: [CONDITION] }]
                //
                var defaultFilters = [];
                if (colDef.filter) {
                    defaultFilters.push(colDef.filter);
                }
                else if ( colDef.filters ){
                    defaultFilters = colDef.filters;
                } else {
                    // Add an empty filter definition object, which will
                    // translate to a guessed condition and no pre-populated
                    // value for the filter <input>.
                    defaultFilters.push({});
                }

                /**
                 * @ngdoc property
                 * @name filter
                 * @propertyOf ui.grid.class:GridOptions.columnDef
                 * @description Specify a single filter field on this column.
                 *
                 * A filter consists of a condition, a term, and a placeholder:
                 *
                 * - condition defines how rows are chosen as matching the filter term. This can be set to
                 * one of the constants in {@link ui.grid.service:uiGridConstants#properties_filter uiGridConstants.filter},
                 * or you can supply a custom filter function
                 * that gets passed the following arguments: [searchTerm, cellValue, row, column].
                 * - term: If set, the filter field will be pre-populated
                 * with this value.
                 * - placeholder: String that will be set to the `<input>.placeholder` attribute.
                 * - ariaLabel: String that will be set to the `<input>.ariaLabel` attribute. This is what is read as a label to screen reader users.
                 * - noTerm: set this to true if you have defined a custom function in condition, and
                 * your custom function doesn't require a term (so it can run even when the term is null)
                 * - rawTerm: set this to true if you have defined a custom function in condition, and
                 * your custom function requires access to the raw unmodified search term that was entered
                 * - flags: only flag currently available is `caseSensitive`, set to false if you don't want
                 * case sensitive matching
                 * - type: defaults to {@link ui.grid.service:uiGridConstants#properties_filter uiGridConstants.filter.INPUT},
                 * which gives a text box.  If set to {@link ui.grid.service:uiGridConstants#properties_filter uiGridConstants.filter.SELECT}
                 * then a select box will be shown with options selectOptions
                 * - selectOptions: options in the format `[ { value: 1, label: 'male' }]`.  No i18n filter is provided, you need
                 * to perform the i18n on the values before you provide them
                 * - disableCancelFilterButton: defaults to false. If set to true then the 'x' button that cancels/clears the filter
                 * will not be shown.
                 * @example
                 * <pre>$scope.gridOptions.columnDefs = [
                 *   {
     *     field: 'field1',
     *     filter: {
     *       term: 'xx',
     *       condition: uiGridConstants.filter.STARTS_WITH,
     *       placeholder: 'starts with...',
     *       ariaLabel: 'Starts with filter for field1',
     *       flags: { caseSensitive: false },
     *       type: uiGridConstants.filter.SELECT,
     *       selectOptions: [ { value: 1, label: 'male' }, { value: 2, label: 'female' } ],
     *       disableCancelFilterButton: true
     *     }
     *   }
                 * ]; </pre>
                 *
                 */

                /*


                 /*

                 self.filters = [
                 {
                 term: 'search term'
                 condition: uiGridConstants.filter.CONTAINS,
                 placeholder: 'my placeholder',
                 ariaLabel: 'Starts with filter for field1',
                 flags: {
                 caseSensitive: true
                 }
                 }
                 ]

                 */

                // Only set filter if this is a newly added column, if we're updating an existing
                // column then we don't want to put the default filter back if the user may have already
                // removed it.
                // However, we do want to keep the settings if they change, just not the term
                if ( isNew ) {
                    self.setPropertyOrDefault(colDef, 'filter');
                    self.setPropertyOrDefault(colDef, 'extraStyle');
                    self.setPropertyOrDefault(colDef, 'filters', defaultFilters);
                } else if ( self.filters.length === defaultFilters.length ) {
                    self.filters.forEach( function( filter, index ){
                        if (typeof(defaultFilters[index].placeholder) !== 'undefined') {
                            filter.placeholder = defaultFilters[index].placeholder;
                        }
                        if (typeof(defaultFilters[index].ariaLabel) !== 'undefined') {
                            filter.ariaLabel = defaultFilters[index].ariaLabel;
                        }
                        if (typeof(defaultFilters[index].flags) !== 'undefined') {
                            filter.flags = defaultFilters[index].flags;
                        }
                        if (typeof(defaultFilters[index].type) !== 'undefined') {
                            filter.type = defaultFilters[index].type;
                        }
                        if (typeof(defaultFilters[index].selectOptions) !== 'undefined') {
                            filter.selectOptions = defaultFilters[index].selectOptions;
                        }
                    });
                }
            };

            /**
             * @ngdoc function
             * @name unsort
             * @methodOf ui.grid.class:GridColumn
             * @description Removes column from the grid sorting
             */
            GridColumn.prototype.unsort = function () {
                this.sort = {};
                this.grid.api.core.raise.sortChanged( this.grid, this.grid.getColumnSorting() );
            };


            /**
             * @ngdoc function
             * @name getColClass
             * @methodOf ui.grid.class:GridColumn
             * @description Returns the class name for the column
             * @param {bool} prefixDot  if true, will return .className instead of className
             */
            GridColumn.prototype.getColClass = function (prefixDot) {
                var cls = uiGridConstants.COL_CLASS_PREFIX + this.uid;

                return prefixDot ? '.' + cls : cls;
            };

            /**
             * @ngdoc function
             * @name isPinnedLeft
             * @methodOf ui.grid.class:GridColumn
             * @description Returns true if column is in the left render container
             */
            GridColumn.prototype.isPinnedLeft = function () {
                return this.renderContainer === 'left';
            };

            /**
             * @ngdoc function
             * @name isPinnedRight
             * @methodOf ui.grid.class:GridColumn
             * @description Returns true if column is in the right render container
             */
            GridColumn.prototype.isPinnedRight = function () {
                return this.renderContainer === 'right';
            };


            /**
             * @ngdoc function
             * @name getColClassDefinition
             * @methodOf ui.grid.class:GridColumn
             * @description Returns the class definition for th column
             */
            GridColumn.prototype.getColClassDefinition = function () {
                return ' .grid' + this.grid.id + ' ' + this.getColClass(true) + ' { min-width: ' + this.drawnWidth + 'px; max-width: ' + this.drawnWidth + 'px; }';
            };

            /**
             * @ngdoc function
             * @name getRenderContainer
             * @methodOf ui.grid.class:GridColumn
             * @description Returns the render container object that this column belongs to.
             *
             * Columns will be default be in the `body` render container if they aren't allocated to one specifically.
             */
            GridColumn.prototype.getRenderContainer = function getRenderContainer() {
                var self = this;

                var containerId = self.renderContainer;

                if (containerId === null || containerId === '' || containerId === undefined) {
                    containerId = 'body';
                }

                return self.grid.renderContainers[containerId];
            };

            /**
             * @ngdoc function
             * @name showColumn
             * @methodOf ui.grid.class:GridColumn
             * @description Makes the column visible by setting colDef.visible = true
             */
            GridColumn.prototype.showColumn = function() {
                this.colDef.visible = true;
            };


            /**
             * @ngdoc property
             * @name aggregationHideLabel
             * @propertyOf ui.grid.class:GridOptions.columnDef
             * @description defaults to false, if set to true hides the label text
             * in the aggregation footer, so only the value is displayed.
             *
             */
            /**
             * @ngdoc function
             * @name getAggregationText
             * @methodOf ui.grid.class:GridColumn
             * @description Gets the aggregation label from colDef.aggregationLabel if
             * specified or by using i18n, including deciding whether or not to display
             * based on colDef.aggregationHideLabel.
             *
             * @param {string} label the i18n lookup value to use for the column label
             *
             */
            GridColumn.prototype.getAggregationText = function () {
                var self = this;
                if ( self.colDef.aggregationHideLabel ){
                    return '';
                }
                else if ( self.colDef.aggregationLabel ) {
                    return self.colDef.aggregationLabel;
                }
                else {
                    switch ( self.colDef.aggregationType ){
                        case uiGridConstants.aggregationTypes.count:
                            return i18nService.getSafeText('aggregation.count');
                        case uiGridConstants.aggregationTypes.sum:
                            return i18nService.getSafeText('aggregation.sum');
                        case uiGridConstants.aggregationTypes.avg:
                            return i18nService.getSafeText('aggregation.avg');
                        case uiGridConstants.aggregationTypes.min:
                            return i18nService.getSafeText('aggregation.min');
                        case uiGridConstants.aggregationTypes.max:
                            return i18nService.getSafeText('aggregation.max');
                        default:
                            return '';
                    }
                }
            };

            GridColumn.prototype.getCellTemplate = function () {
                var self = this;

                return self.cellTemplatePromise;
            };

            GridColumn.prototype.getCompiledElementFn = function () {
                var self = this;

                return self.compiledElementFnDefer.promise;
            };

            return GridColumn;
        }]);

})();

(function(){

    angular.module('ui.grid')
        .factory('GridOptions', ['gridUtil','uiGridConstants', function(gridUtil,uiGridConstants) {

            /**
             * @ngdoc function
             * @name ui.grid.class:GridOptions
             * @description Default GridOptions class.  GridOptions are defined by the application developer and overlaid
             * over this object.  Setting gridOptions within your controller is the most common method for an application
             * developer to configure the behaviour of their ui-grid
             *
             * @example To define your gridOptions within your controller:
             * <pre>$scope.gridOptions = {
   *   data: $scope.myData,
   *   columnDefs: [
   *     { name: 'field1', displayName: 'pretty display name' },
   *     { name: 'field2', visible: false }
   *  ]
   * };</pre>
             *
             * You can then use this within your html template, when you define your grid:
             * <pre>&lt;div ui-grid="gridOptions"&gt;&lt;/div&gt;</pre>
             *
             * To provide default options for all of the grids within your application, use an angular
             * decorator to modify the GridOptions factory.
             * <pre>
             * app.config(function($provide){
   *   $provide.decorator('GridOptions',function($delegate){
   *     var gridOptions;
   *     gridOptions = angular.copy($delegate);
   *     gridOptions.initialize = function(options) {
   *       var initOptions;
   *       initOptions = $delegate.initialize(options);
   *       initOptions.enableColumnMenus = false;
   *       return initOptions;
   *     };
   *     return gridOptions;
   *   });
   * });
             * </pre>
             */
            return {
                initialize: function( baseOptions ){
                    /**
                     * @ngdoc function
                     * @name onRegisterApi
                     * @propertyOf ui.grid.class:GridOptions
                     * @description A callback that returns the gridApi once the grid is instantiated, which is
                     * then used to interact with the grid programatically.
                     *
                     * Note that the gridApi.core.renderingComplete event is identical to this
                     * callback, but has the advantage that it can be called from multiple places
                     * if needed
                     *
                     * @example
                     * <pre>
                     *   $scope.gridOptions.onRegisterApi = function ( gridApi ) {
       *     $scope.gridApi = gridApi;
       *     $scope.gridApi.selection.selectAllRows( $scope.gridApi.grid );
       *   };
                     * </pre>
                     *
                     */
                    baseOptions.onRegisterApi = baseOptions.onRegisterApi || angular.noop();

                    /**
                     * @ngdoc object
                     * @name data
                     * @propertyOf ui.grid.class:GridOptions
                     * @description (mandatory) Array of data to be rendered into the grid, providing the data source or data binding for
                     * the grid.
                     *
                     * Most commonly the data is an array of objects, where each object has a number of attributes.
                     * Each attribute automatically becomes a column in your grid.  This array could, for example, be sourced from
                     * an angularJS $resource query request.  The array can also contain complex objects, refer the binding tutorial
                     * for examples of that.
                     *
                     * The most flexible usage is to set your data on $scope:
                     *
                     * `$scope.data = data;`
                     *
                     * And then direct the grid to resolve whatever is in $scope.data:
                     *
                     * `$scope.gridOptions.data = 'data';`
                     *
                     * This is the most flexible approach as it allows you to replace $scope.data whenever you feel like it without
                     * getting pointer issues.
                     *
                     * Alternatively you can directly set the data array:
                     *
                     * `$scope.gridOptions.data = [ ];`
                     * or
                     *
                     * `$http.get('/data/100.json')
                     * .success(function(data) {
       *   $scope.myData = data;
       *   $scope.gridOptions.data = $scope.myData;
       *  });`
                     *
                     * Where you do this, you need to take care in updating the data - you can't just update `$scope.myData` to some other
                     * array, you need to update $scope.gridOptions.data to point to that new array as well.
                     *
                     */
                    baseOptions.data = baseOptions.data || [];

                    /**
                     * @ngdoc array
                     * @name columnDefs
                     * @propertyOf  ui.grid.class:GridOptions
                     * @description Array of columnDef objects.  Only required property is name.
                     * The individual options available in columnDefs are documented in the
                     * {@link ui.grid.class:GridOptions.columnDef columnDef} section
                     * </br>_field property can be used in place of name for backwards compatibility with 2.x_
                     *  @example
                     *
                     * <pre>var columnDefs = [{name:'field1'}, {name:'field2'}];</pre>
                     *
                     */
                    baseOptions.columnDefs = baseOptions.columnDefs || [];

                    /**
                     * @ngdoc object
                     * @name ui.grid.class:GridOptions.columnDef
                     * @description Definition / configuration of an individual column, which would typically be
                     * one of many column definitions within the gridOptions.columnDefs array
                     * @example
                     * <pre>{name:'field1', field: 'field1', filter: { term: 'xxx' }}</pre>
                     *
                     */


                    /**
                     * @ngdoc array
                     * @name excludeProperties
                     * @propertyOf  ui.grid.class:GridOptions
                     * @description Array of property names in data to ignore when auto-generating column names.  Provides the
                     * inverse of columnDefs - columnDefs is a list of columns to include, excludeProperties is a list of columns
                     * to exclude.
                     *
                     * If columnDefs is defined, this will be ignored.
                     *
                     * Defaults to ['$$hashKey']
                     */

                    baseOptions.excludeProperties = baseOptions.excludeProperties || ['$$hashKey'];

                    /**
                     * @ngdoc boolean
                     * @name enableRowHashing
                     * @propertyOf ui.grid.class:GridOptions
                     * @description True by default. When enabled, this setting allows uiGrid to add
                     * `$$hashKey`-type properties (similar to Angular) to elements in the `data` array. This allows
                     * the grid to maintain state while vastly speeding up the process of altering `data` by adding/moving/removing rows.
                     *
                     * Note that this DOES add properties to your data that you may not want, but they are stripped out when using `angular.toJson()`. IF
                     * you do not want this at all you can disable this setting but you will take a performance hit if you are using large numbers of rows
                     * and are altering the data set often.
                     */
                    baseOptions.enableRowHashing = baseOptions.enableRowHashing !== false;

                    /**
                     * @ngdoc function
                     * @name rowIdentity
                     * @methodOf ui.grid.class:GridOptions
                     * @description This function is used to get and, if necessary, set the value uniquely identifying this row (i.e. if an identity is not present it will set one).
                     *
                     * By default it returns the `$$hashKey` property if it exists. If it doesn't it uses gridUtil.nextUid() to generate one
                     */
                    baseOptions.rowIdentity = baseOptions.rowIdentity || function rowIdentity(row) {
                            return gridUtil.hashKey(row);
                        };

                    /**
                     * @ngdoc function
                     * @name getRowIdentity
                     * @methodOf ui.grid.class:GridOptions
                     * @description This function returns the identity value uniquely identifying this row, if one is not present it does not set it.
                     *
                     * By default it returns the `$$hashKey` property but can be overridden to use any property or set of properties you want.
                     */
                    baseOptions.getRowIdentity = baseOptions.getRowIdentity || function getRowIdentity(row) {
                            return row.$$hashKey;
                        };

                    /**
                     * @ngdoc property
                     * @name flatEntityAccess
                     * @propertyOf ui.grid.class:GridOptions
                     * @description Set to true if your columns are all related directly to fields in a flat object structure - i.e.
                     * each of your columns associate directly with a property on each of the entities in your data array.
                     *
                     * In that situation we can avoid all the logic associated with complex binding to functions or to properties of sub-objects,
                     * which can provide a significant speed improvement with large data sets when filtering or sorting.
                     *
                     * By default false
                     */
                    baseOptions.flatEntityAccess = baseOptions.flatEntityAccess === true;

                    /**
                     * @ngdoc property
                     * @name showHeader
                     * @propertyOf ui.grid.class:GridOptions
                     * @description True by default. When set to false, this setting will replace the
                     * standard header template with '<div></div>', resulting in no header being shown.
                     */
                    baseOptions.showHeader = typeof(baseOptions.showHeader) !== "undefined" ? baseOptions.showHeader : true;

                    /* (NOTE): Don't show this in the docs. We only use it internally
                     * @ngdoc property
                     * @name headerRowHeight
                     * @propertyOf ui.grid.class:GridOptions
                     * @description The height of the header in pixels, defaults to 30
                     *
                     */
                    if (!baseOptions.showHeader) {
                        baseOptions.headerRowHeight = 0;
                    }
                    else {
                        baseOptions.headerRowHeight = typeof(baseOptions.headerRowHeight) !== "undefined" ? baseOptions.headerRowHeight : 30;
                    }

                    /**
                     * @ngdoc property
                     * @name rowHeight
                     * @propertyOf ui.grid.class:GridOptions
                     * @description The height of the row in pixels,  Can be passed as integer or string. defaults to 30.
                     *
                     */

                    if (typeof baseOptions.rowHeight === "string") {
                        baseOptions.rowHeight = parseInt(baseOptions.rowHeight) || 30;
                    }

                    else {
                        baseOptions.rowHeight = baseOptions.rowHeight || 30;
                    }

/**
 * @ngdoc integer
 * @name minRowsToShow