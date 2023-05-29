(() => {
  const App = {
    htmlElements: {
      form: document.querySelector("form"),
      txtNumber: document.querySelector(".input_grade"),
      areaResult: document.querySelector("#list_grades"),
      btnAddGrade: document.querySelector(".btn_add_grade"),
      btnDeleteAllGrades : document.querySelector(".btn_delete_grades"),
      resultAverage: document.querySelector("#my_average"),
      resultGrade: document.querySelector("#my_grade"),
      circularProgress: document.querySelector(".circular-progress"),
      progressValue: document.querySelector(".progress-value"),
    },

    handlers: {
      onFormSubmit: (e) => {
        e.preventDefault();
        const valueGrade = App.htmlElements.txtNumber.value;
        App.methodsFront.addCard(valueGrade);
        App.methodsFront.showAverageText();
        App.methodsFront.showAverageGraphic();
        App.methodsFront.showGrade();
      },
    },

    methodsFront: {
      deleteInput: () => {
        App.htmlElements.txtNumber.value = "";
      },

      deleteAllGrades: () => {
        App.htmlElements.areaResult.innerHTML = " ";
      },

      addBtnDelete: () => {
        const btnDelete = document.createElement("button");
        btnDelete.innerText = "X";
        btnDelete.type = "button";
        btnDelete.classList.add("btnDelete");

        btnDelete.addEventListener("click", () => {
          var respuesta = confirm("¿Desea eliminar esta tarjeta?");
          if (respuesta == true) {
            const card = btnDelete.parentNode;
            card.remove();

            App.methodsFront.showAverageText();
            App.methodsFront.showAverageGraphic();
            App.methodsFront.showGrade();
          }
        });
        return btnDelete;
      },

      addCard: (valueR) => {
        const cardGeneral = document.createElement("div");
        App.htmlElements.areaResult.appendChild(cardGeneral);
        cardGeneral.classList.add("cardGrades");

        const cardContainer = document.createElement("div");
        const cardText = document.createTextNode(valueR);
        cardContainer.appendChild(cardText);
        cardContainer.classList.add("container");

        cardGeneral.appendChild(cardContainer);
        cardGeneral.appendChild(App.methodsFront.addBtnDelete());

        App.methodsFront.deleteInput();
      },

      showAverageText: () => {
        const average = App.methodsBack.calculateAverage();
        const response = App.methodsBack.convertTextToDecimal(average);
        App.htmlElements.resultAverage.innerHTML = response;
      },

      showAverageGraphic: () => {
        let average = App.methodsBack.calculateAverage(),
          progressStartValue = App.methodsBack.convertDecimalToInt(
            App.htmlElements.resultAverage.innerText
          ),
          progressEndValue = App.methodsBack.convertDecimalToInt(average),
          speed = 100;

        let progress = setInterval(() => {
          if (progressStartValue < progressEndValue) {
            progressStartValue++;
          } else if (progressStartValue > progressEndValue) {
            progressStartValue--;
          }

          App.htmlElements.progressValue.textContent = `${progressStartValue}%`;
          App.htmlElements.circularProgress.style.background = `conic-gradient(#4070f4 ${
            progressStartValue * 3.6
          }deg, #ededed 0deg)`;

          if (progressStartValue == progressEndValue) {
            clearInterval(progress);
          }
        }, speed);
      },

      showGrade: () => {
        const average = App.methodsBack.calculateAverage();
        const response = App.methodsBack.calculateGrade(average);
        App.methodsFront.validateStyleGrade(response);
        App.htmlElements.resultGrade.innerHTML = response;
      },

      validateStyleGrade: (grade)=>{
        let response = "";

        switch (grade) {
          case "A" :
            App.htmlElements.resultGrade.style.color="white";
            App.htmlElements.resultGrade.style.background="#028237";
            break;
          case "B" :
            App.htmlElements.resultGrade.style.color="white";
            App.htmlElements.resultGrade.style.background="#67BE00";
            break;
          case "C" :
            App.htmlElements.resultGrade.style.color="#A1881D";
            App.htmlElements.resultGrade.style.background="#FFD207";
            break;
          case "D" :
            App.htmlElements.resultGrade.style.color="white";
            App.htmlElements.resultGrade.style.background="#FF8202";
            break;
          default:
            App.htmlElements.resultGrade.style.color="white";
            App.htmlElements.resultGrade.style.background="#FF3800";
            break;
        }

        return response;
      }

    },

    methodsBack: {
      calculateAverage: () => {
        const listGrades = document.querySelectorAll(".cardGrades .container");
        let response = 0,
          sumGrades = 0;
        listGrades.forEach((grade) => {
          sumGrades += App.methodsBack.convertTextToInt(grade.textContent);
        });
        response = sumGrades / listGrades.length;
        return response;
      },

      calculateGrade: (average) => {
        let response = "";

        switch (true) {
          case average >= 90:
            response = "A";
            break;
          case average >= 80:
            response = "B";
            break;
          case average >= 70:
            response = "C";
            break;
          case average >= 60:
            response = "D";
            break;
          default:
            response = "F";
            break;
        }

        return response;
      },

      convertTextToDecimal: (value) => {
        return parseFloat(value).toFixed(2);
      },

      convertTextToInt: (value) => {
        return parseInt(value);
      },

      convertDecimalToInt: (value) => {
        return Math.floor(value);
      },
    },

    init: () => {
      App.htmlElements.form.addEventListener(
        "submit",
        App.handlers.onFormSubmit
      );
    },
  };

  App.init();
})();
