'use strict';

(function () {

    function mainCtrl ($scope) {

        function setup () {
            generarExpresionesRegulares();
            generarModal();
            generarEstructuraError();
            generarVariablesEnScope();
        }

        $scope.__mostrarModalCargando = function() {
            $scope.modal.show = true;
            $scope.modal.type = 'LOADING';
        };

        $scope.__mostrarModalError = function(errorMsg) {
            $scope.modal.show = true;
            $scope.modal.type = 'ERROR';
            $scope.modal.msg = errorMsg;
        };

        $scope.__mostrarModalTemplate = function(template) {
            $scope.modal.show = true;
            $scope.modal.type = 'TEMPLATE';
            $scope.modal.template = template;
        };

        $scope.__ocultarModal = function() {
            generarModal();
        };

        $scope.__mostrarError = function(errorMsg) {
            $scope.error.msg = errorMsg;
            $scope.error.show = true;
        };

        $scope.__ocultarError = function() {
            generarEstructuraError();
        };

        function generarExpresionesRegulares () {
            $scope.reg = {};
            $scope.reg.alfa = /^([a-zA-Z0-9\sÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð\*])+$/;
            $scope.reg.curp = /^(([A-Z]|[a-z]){4})([0-9]{6})(([A-Z]|[a-z]){6})((([A-Z]|[a-z]|[0-9]){1}))([0-9]{1})$/;
            $scope.reg.email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            $scope.reg.is2Digits = /^([0-9]{2})$/;
            $scope.reg.is3Digits = /^([0-9]{3})$/;
            $scope.reg.is4Digits = /^([0-9]{4})$/;
            $scope.reg.is5Digits = /^([0-9]{5})$/;
            $scope.reg.is7Digits = /^([0-9]{7})$/;
            $scope.reg.is10Digits = /^([0-9]{10})$/;
            $scope.reg.is10or16or18Digits = /^((([0-9]{10})|([0-9]{16})|([0-9]{18}))|(([\*]{6}[0-9]{4})|([\*]{12}[0-9]{4})|([\*]{14}[0-9]{4})))$/;
            $scope.reg.is10or20Digits = /^((([0-9]{10})|([0-9]{20}))|(([\*]{6}[0-9]{4})|([\*]{16}[0-9]{4})))$/;
            $scope.reg.is11Digits = /^([0-9]{11})$/;
            $scope.reg.is15Digits = /^(([0-9]{15})|([\*]{11}[0-9]{4}))$/;
            $scope.reg.is16Digits = /^(([0-9]{16})|([\*]{12}[0-9]{4}))$/;
            $scope.reg.is18Digits = /^([0-9]{18})|([\*]{14}[0-9]{4})$/;
            $scope.reg.is20Digits = /^(([0-9]{20})|([\*]{16}[0-9]{4}))$/;
            $scope.reg.isCurp = /^(([A-Z]|[a-z]){4})([0-9]{6})(([A-Z]|[a-z]){6})((([A-Z]|[a-z]|[0-9]){1}))([0-9]{1})$/;
            $scope.reg.isRfcFisica = /^(([a-zA-ZÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð]{4})([0-9]{6}))$/;
            $scope.reg.isRfcFisicaHomoclave = /^(([a-zA-ZÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð]{4}[0-9]{6})|[a-zA-Z]{4}[0-9]{6}[a-zA-Z0-9]{3})$/;
            $scope.reg.isRfcMoral = /^(([a-zA-ZÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð]{3})([0-9]{6}))$/;
            $scope.reg.letter = /^([a-zA-Z\sÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð])+$/;
            $scope.reg.letterCaracter = /^([a-zA-Z0-9\sÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð\;\:\-\.\,\/])+$/;
            $scope.reg.letterYNumeric = /^([a-zA-Z0-9\sÁÉÍÓÚÝáéíóúÑñ])+$/;
            $scope.reg.notEmpty = /^(.+)$/;
            $scope.reg.numeric = /^[0-9]*$/;
            $scope.reg.zipcodeRegExp = /^([0-9]{5})$/;
            $scope.reg.is10Chars = /^(([a-zA-Z0-9\sÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöüçÇßØøÅåÆæÞþÐð\(\)\[\]\{\}\-\+\*\s]){10})$/;
            $scope.reg.is5Alfa = /^([a-zA-Z0-9]{5})$/;
            $scope.reg.isAutoSerialNumber = /^(([a-zA-Z0-9]){17})$/;
            $scope.reg.min1Caracter = /^[0-9a-zA-Z]{1,}$/;
            $scope.reg.min10Caracteres = /^[0-9a-zA-Z]{10,}$/;
        }

        function generarModal () {
            $scope.modal = {
                show: false,
                type: null,
                msg: null,
                template: null
            };
        }

        function generarEstructuraError () {
            $scope.error = {
                show: false,
                msg: null
            };
        }

        function generarVariablesEnScope () {
            $scope.templateModal = 'views/commons/templateModal.html';
            $scope.configuracionLogitudMaxima = {
                nombre : 40,
                apellidoPaterno : 40,
                apellidoMaterno : 40,
                fechaNacimiento : 10,
                rfc : 13,
                rfcMoral : 12,
                curp : 18,
                email : 50,
                telefono : 10,
                extensionTelefono : 5,
                calle : 60,
                numeroExterior : 10,
                numeroInterior : 10,
                codigoPostal : 5,
                entreCalles : 200,
                indicacionesEntrega : 200
            };
        }

        setup();

    }

    angular.module('formsAngularApp')
    .controller('MainCtrl', ['$scope', mainCtrl]);

})();