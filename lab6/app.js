(() => {
    const App = {
        methods: {
            calcularSerieFibonacci: (valorR) => {
                let response = [0, 1];
                for (var i = 2; i < valorR; i++) {
                  response[i] = response[i - 1] + response[i - 2];
                }
                console.log(valorR,"=>",response);
              }
        },

        init() {
            App.methods.calcularSerieFibonacci(7)
        },
        
    };
    App.init();
})();
  