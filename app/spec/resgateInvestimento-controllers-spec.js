describe('resgateInvestimento-controllers-spec', function () {

    var $rootScope, vm, $scope, $q, $controller, ResgateInvestimentoService;

    beforeEach(angular.mock.module('resgateInvestimentoApp'));
    beforeEach(module('resgateInvestimentoControllers'));
    
    beforeEach(inject(function ($injector, _$rootScope_, _$controller_,_$q_,_$httpBackend_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $scope.$parent.vm = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
    }));

    beforeEach(inject(function (_$rootScope_, _$controller_,_$q_,_ResgateInvestimentoService_) {
        ResgateInvestimentoService = jasmine.createSpyObj('ResgateInvestimentoService', ['']);
        ResgateInvestimentoService = _ResgateInvestimentoService_;
        vm = _$controller_('ResgateInvestimentoController', {
            $scope: $scope,  
            service: ResgateInvestimentoService
        });
       
    }));
    it('Consultar Investimentos - Teste', function () {
        vm.consultarInvestimentos();
    });
     it('Resgate Personalizado - Teste', function () {
         var investimento = {
            "nome": "INVESTIMENTO III",
            "objetivo": "Abrir meu próprio negócio",
            "saldoTotalDisponivel": 26000,
            "indicadorCarencia": "N",
            "acoes": [
              {
                "id": "1",
                "nome": "BBAS3",
                "percentual": 41.1
              },
              {
                "id": "2",
                "nome": "VALE3",
                "percentual": 22.43
              },
              {
                "id": "3",
                "nome": "PETR4",
                "percentual": 26.12
              },
              {
                "id": "5",
                "nome": "OIBR3",
                "percentual": 10.35
              }
            ]
          }
        vm.resgatePersonalizado(investimento);
    });
    it('Consultar Investimentos - Teste', function () {
        vm.dadosInvestimento = { "acoes": [
            {
              "id": "1",
              "nome": "BBAS3",
              "percentual": 41.1,
              "resgate": '222.222.222.222,00'
            },
            {
              "id": "2",
              "nome": "VALE3",
              "percentual": 22.43,
              "resgate": '222.222.222.222,00'
            },
            {
              "id": "3",
              "nome": "PETR4",
              "percentual": 26.12,
              "resgate": '222.222.222.222,00'
            },
            {
              "id": "5",
              "nome": "OIBR3",
              "percentual": 10.35,
              "resgate": '222.222.222.222,00'
            }
          ]}
          vm.totalResgate = 0;
        vm.verificaResgate("222.222.222.222,00", 30000);
    });
    it('Navegação de voltar para a tela principal - Teste', function () {
        vm.dadosInvestimento = { "acoes": [
            {
              "id": "1",
              "nome": "BBAS3",
              "percentual": 41.1,
              "resgate": '222.222.222.222,00'
            },
            {
              "id": "2",
              "nome": "VALE3",
              "percentual": 22.43,
              "resgate": '222.222.222.222,00'
            },
            {
              "id": "3",
              "nome": "PETR4",
              "percentual": 26.12,
              "resgate": '222.222.222.222,00'
            },
            {
              "id": "5",
              "nome": "OIBR3",
              "percentual": 10.35,
              "resgate": '222.222.222.222,00'
            }
          ]}
          vm.totalResgate = 0;
        vm.voltar();
    });
    it('Confirmar Resgate - Teste', function () {
        vm.dadosInvestimento = {saldoTotalDisponivel: 222};
        vm.confirmarResgate(); 
    });
    it('Iniciar - Teste', function () {
        vm.iniciar(); 
    });
 
});