'use strict';

(function () {

    function formCtrl ($scope, $timeout) {

        var self = this;

        function setup () {
            $scope.templateEjemplo = 'views/templateEjemplo.html';
            $scope.__mostrarModalCargando();
            self.tiempo;
        }

        this.tiempo = $timeout(function () {
            $scope.__ocultarModal();
        }, 2000);

        this.arrayEjemplo = [
            {
                texto: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni quisquam nobis iste similique inventore aspernatur autem, quod perspiciatis minus et est explicabo fugit aliquam ad perferendis iure adipisci. Cupiditate, sed.',
            },
            {
                texto: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni quisquam nobis iste similique inventore aspernatur autem, quod perspiciatis minus et est explicabo fugit aliquam ad perferendis iure adipisci. Cupiditate, sed.',
            },
            {
                texto: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni quisquam nobis iste similique inventore aspernatur autem, quod perspiciatis minus et est explicabo fugit aliquam ad perferendis iure adipisci. Cupiditate, sed.',
            },
            {
                texto: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni quisquam nobis iste similique inventore aspernatur autem, quod perspiciatis minus et est explicabo fugit aliquam ad perferendis iure adipisci. Cupiditate, sed.',
            },
            {
                texto: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni quisquam nobis iste similique inventore aspernatur autem, quod perspiciatis minus et est explicabo fugit aliquam ad perferendis iure adipisci. Cupiditate, sed.',
            }
        ];

        setup();

    }

    angular.module('formsAngularApp')
    .controller('FormCtrl', ['$scope', '$timeout', formCtrl]);

})();