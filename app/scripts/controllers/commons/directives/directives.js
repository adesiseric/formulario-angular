'use strict';

(function () {

    var dateInputDirective = "dateinput";

    function ValidarElementoDirective() {
        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            template:
                '<div class="validarElementoDirective">'+
                    '<div ng-form name="formularioActual" >'+
                        '<div ng-transclude></div>'+
                        '<ul>'+
                            '<li style="list-style:none">'+
                                '<div class="errorValidacion v06"  ng-show="showCondition == \'true\' && mouseIn">'+
                                    '<div class="validacionInterior">'+
                                        '<p class="titulo">' +
                                            '<em>Error</em>' +
                                        '</p>'+
                                        '<div class="textoGestionable">'+
                                            '<p class="message">'+
                                                '{{msg}}'+
                                            '</p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<span class="puntero"></span>'+
                                '</div>'+
                            '</li>'+
                        '</ul>'+
                    '</div>'+
                '</div>',
            scope: {
                msg: '@errorMsg'
            },
            link: function(scope, element, attrs) {
                var mouseInName = 'mouseIn',
                    Element = element.find('div[class="validarElementoDirective"]'),
                    formName = 'formularioActual',
                    inputElement = element.find('input').length > 0 ? element.find('input') : element.find('select'),
                    elementName = angular.element(inputElement).attr('name'),
                    showConditionName = 'showCondition';

                element.bind("mouseenter", function() {
                    scope.$apply(function() {
                        scope[mouseInName] = true;
                    });
                });

                element.bind("mouseleave", function() {
                    scope.$apply(function() {
                        scope[mouseInName] = false;
                    });
                });

                scope.$watch(formName+'.'+elementName+'.$dirty && '+formName+'.'+elementName+'.$invalid',function (value){
                    scope[showConditionName] = ''+value;
                });

                var li = element.find('li');
                var tooltip = li.find('.errorValidacion');

                scope.$watch(mouseInName, posicionValidarElementoDirective(inputElement, li, tooltip));
            }
        }
    }

    function posicionValidarElementoDirective(inputElement, li, tooltip) {
        return function() {

            var offset = inputElement.offset(),
                offsetTop = offset.top,
                offsetLeft = offset.left,
                offsetParent,
                offsetParentElement = inputElement.offsetParent();

            if ( offsetParentElement.is('body') ) {
                offsetParentElement = null;
            }
            
            while ( offsetParentElement ) {

                offsetParent = offsetParentElement.offset();
                offsetTop = offsetTop - offsetParent.top;
                offsetLeft = offsetLeft - offsetParent.left;

                offsetParentElement = offsetParentElement.offsetParent();

                if ( offsetParentElement.is('body') || offsetParentElement.is('html') ) {
                    offsetParentElement = null;
                }

            }

            offsetTop < 0 ? offsetTop = 0 : offsetTop = offsetTop;
            offsetLeft < 0 ? offsetLeft = '15px' : offsetLeft = offsetLeft;
            
            li.css({
                top : offsetTop,
                left : offsetLeft,
                position : 'absolute'
            });

            tooltip.css({
                width : inputElement.outerWidth()
            });
        }
    }

    function DateInput($filter) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                function readParameters () {
                    var parameters = attr[dateInputDirective];
                    if ( parameters && parameters.replace(trimRegExp, "").length > 0 ) {
                        return JSON.parse(parameters);
                    }
                    return {};
                }

                var parameters = readParameters();

                function parseDateFromUser (text) {
                    var day, month, year, date, validationDate;

                    if ( text ) {
                        text = text.replace('/', '').replace('/', '');
                    }

                    if ( ! text || text.length !== 8 ) {
                        return undefined;
                    }

                    day = parseInt(text.substring(0, 2), 10);
                    month = parseInt(text.substring(2, 4), 10) - 1;
                    year = parseInt(text.substring(4, 8), 10);
                    date = new Date(year, month, day, 12, 0, 0);
                    validationDate = new Date(date);

                    if ( day !== validationDate.getDate() || month !== validationDate.getMonth() || year !== validationDate.getFullYear() ) {
                        return undefined;
                    }

                    return date.getTime();
                }

                function transformaFecha (text) {
                    var texto = undefined;

                    if ( text && text.length > 1 ) {
                        texto = parseInt(text.replace('/', '').replace('/', '').substring(0, 8)).toString();
                    }

                    return texto;
                }

                function fromUser (text) {
                    var texto = transformaFecha(text);

                    if ( ! text && ! element.hasClass('ng-invalid-date') ) {
                        ctrl.$setValidity('date', true);
                    }

                    var date = parseDateFromUser(texto);

                    if ( ! date ) {
                        ctrl.$setValidity('date', false);
                        return date;
                    }

                    if ( parameters.greaterThan && (date < scope.$eval(parameters.greaterThan)) ) {
                        ctrl.$setValidity('date', false);
                        return date;
                    }

                    ctrl.$setValidity('date', true);
                    return date;
                }

                function formatDate (date) {
                    var newDate = undefined;

                    if ( date ) {
                        newDate = parseInt(date.replace('/', '').replace('/', '') + '0000');
                    }

                    return newDate;
                }

                function toUser (date) {
                    var localizedDate;
                    date = formatDate(date);
                    
                    if ( typeof date === 'undefined' || date === null ) {
                        return date;
                    }
                    localizedDate = new Date(date);
                    return $filter('date')(localizedDate, 'dd/MM/yyyy');
                }
                ctrl.$parsers.push(fromUser);
                ctrl.$formatters.push(toUser);
            }
        };
    }

    DateInput.$inject = ['$filter'];

    angular.module('commonDirectives', [])
    .directive('validarelemento', ValidarElementoDirective)
    .directive(dateInputDirective, DateInput);

})();