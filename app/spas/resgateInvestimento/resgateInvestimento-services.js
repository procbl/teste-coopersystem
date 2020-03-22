angular.module('resgateInvestimentoServices', [])
    .factory('ResgateInvestimentoService', ['$http', function($http) {
    	
    	 var Objeto = '';
    	 
            return {
            	getItem: function () {
                    return Objeto;
                },
                setItem: function(value) {
                	Objeto = value;
				},
				
				consultarInvestimentos :function(){
	            	return $http.get('http://www.mocky.io/v2/5e76797e2f0000f057986099')
	            	.then(function (response){
	            		return response.data.response.data;
	            	});
	            }, 
            };
    }
]);

