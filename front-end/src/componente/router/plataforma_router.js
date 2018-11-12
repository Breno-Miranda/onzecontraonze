
app.config(function($routeProvider) {
    $routeProvider.when('/plataforma:type', {
        templateUrl: 'src/componente/view/plataforma.html',
        controller: 'plataforma_controller',
        controllerAs: "app"
    })
});
    