
(function (angular) {
    'use strict';

    angular.module('resgateInvestimentoControllers', [])
        .controller('ResgateInvestimentoController', ResgateInvestimentoController);

		ResgateInvestimentoController.$inject = ['$rootScope', '$scope', '$location', '$filter', '$q', 'ResgateInvestimentoService'];

    function ResgateInvestimentoController($rootScope, $scope, $location, $filter, $q, ResgateInvestimentoService ) {
        var vm = this;


// Atributos
		vm.listaInvestimentos;
		vm.dadosInvestimento;
		vm.erroTotalDisponivel = false;
		vm.erroSaldoAcumulado = false;
		vm.erroPreencherValores = false;
		vm.totalResgate = 0;
		vm.mostraModal = false;

// Funções
		vm.resgatePersonalizado = resgatePersonalizado;
		vm.verificaResgate = verificaResgate;
		vm.voltar = voltar;
		vm.confirmarResgate = confirmarResgate;
		vm.consultarInvestimentos = consultarInvestimentos;
		vm.iniciar = iniciar;

        iniciar();		
		function iniciar(){
			consultarInvestimentos();
		};

		function resgatePersonalizado(investimento){
			if(investimento.indicadorCarencia === 'N'){
				vm.dadosInvestimento = investimento;
				angular.forEach(vm.dadosInvestimento.acoes, function(item){
					item.saldoAcumulado = (vm.dadosInvestimento.saldoTotalDisponivel * item.percentual)/100;
					item.resgate = "0,00"
				});
				vm.erroTotalDisponivel = false;
				vm.erroSaldoAcumulado = false;
				vm.erroPreencherValores = false;
				vm.totalResgate = 0;
				vm.mostraModal = false;
				$location.path('/resgatePersonalizado');
			}
		};

		
		
		function confirmarResgate(){
			vm.mostraModal = "";
			if(!vm.erroSaldoAcumulado){
				vm.erroTotalDisponivel = false;
				if(vm.totalResgate > vm.dadosInvestimento.saldoTotalDisponivel){
					vm.erroTotalDisponivel = true;
				} else if(vm.totalResgate <= 0){
					vm.erroPreencherValores = true;
				} else {
					vm.mostraModal = "modal";
				}
			}
		};
		
        
		function consultarInvestimentos(){
			ResgateInvestimentoService.consultarInvestimentos()
    		.then(function (response){
				vm.listaInvestimentos  = response.listaInvestimentos;
    		});
		}
		
		function verificaResgate(valorResgate, totalAcao) {
			vm.erroPreencherValores = false;
			vm.erroSaldoAcumulado = false;
			vm.erroTotalDisponivel = false;
			if(Number(valorResgate.replace('.','').replace('.','').replace('.','').replace(',','.')) > totalAcao){
				vm.erroSaldoAcumulado = true;
				vm.totalResgate = 0;
				angular.forEach(vm.dadosInvestimento.acoes, function(item){
					vm.totalResgate = vm.totalResgate + Number(item.resgate.replace('.','').replace('.','').replace('.','').replace(',','.'));
				});
			} else {
				vm.totalResgate = 0;
				angular.forEach(vm.dadosInvestimento.acoes, function(item){
					if(item.saldoAcumulado < item.resgate){
						vm.erroSaldoAcumulado = true;
					}
					vm.totalResgate = vm.totalResgate + Number(item.resgate.replace('.','').replace('.','').replace('.','').replace(',','.'));
				});
			}
		}
		
		function voltar(){
			angular.forEach(vm.dadosInvestimento.acoes, function(item){
				item.resgate = "";
			});
			vm.totalResgate = 0;
			vm.dadosInvestimento = {};
			$location.path('/resgateInvestimento');
		};
		
		
    };
})(angular);