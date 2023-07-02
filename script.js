var cardsElement = document.getElementById("cards");
var cardsHTML = "";
function displayCards() {
    cardsElement.innerHTML = "";
    cardsHTML = "\n  <div class=\"column is-4 tile is-parent\">\n  <div class=\"card tile is-child box has-background-light\">\n    <div class=\"card-content\">\n      <textarea class=\"textarea\" placeholder=\"Add your own question here..\" id=\"new-question\"></textarea>\n      <button class=\"button is-white mt-3 is-fullwidth is-primary\" onclick=\"addNewQuestion()\">Add new question</button>\n    </div>\n  </div>\n  </div>";
    questions.forEach(iterateCards);
    cardsElement.insertAdjacentHTML("afterbegin", cardsHTML);
    subscribe();
}
displayCards();
function iterateCards(element, index) {
    cardsHTML =
        cardsHTML +
            "<div class=\"column is-4 tile is-parent\">\n      <div class=\"card tile is-child box has-background-".concat(checkStatus(element).cardsColorHTML, "\">\n        <div class=\"card-content\">\n          <div class=\"icon-text has-text-grey pb-2\" data-question=\"").concat(index, "\">\n          <span class=\"icon has-text-info\">").concat(checkStatus(element).statusHTML, "</span>\n          </div>\n            <p class=\"title is-size-5 has-text-grey\">").concat(element.question, "</p>\n        </div>\n      </div>\n    </div>\n");
    return cardsHTML;
}
function checkStatus(question) {
    if (question.status === true) {
        return {
            statusHTML: "<i class=\"fa-solid fa-check has-text-light\"></i></span><span>Got it",
            cardsColorHTML: "primary",
        };
    }
    else {
        return {
            statusHTML: "<i class=\"fa-solid fa-xmark has-text-light\"></i></span><span>Still learning",
            cardsColorHTML: "warning",
        };
    }
}
function addNewQuestion() {
    var newQuestion = document.querySelector(".textarea");
    cardsElement.innerHTML = "";
    questions.push({ question: newQuestion.value, status: false });
    displayCards(questions);
}
function showFalseCards() {
    cardsHTML = "";
    var arrayStatusFalse = questions.filter(function (question) { return question.status === false; });
    cardsElement.innerHTML = "";
    arrayStatusFalse.forEach(iterateCards);
    cardsElement.insertAdjacentHTML("afterbegin", cardsHTML);
}
var checkbox = document.getElementById("checkbox");
checkbox.addEventListener("click", function () {
    if (checkbox.checked) {
        showFalseCards();
    }
    else {
        displayCards(questions);
    }
});
function subscribe() {
    var listQuestionSelectors = document.querySelectorAll("#cards > div > div > div > div");
    listQuestionSelectors.forEach(function (element) {
        var id = element.dataset.question;
        element.addEventListener("click", function (event) {
            changeStatus(id);
        });
    });
}
subscribe();
function changeStatus(id) {
    var currentQuestion = questions[id];
    currentQuestion.status = !currentQuestion.status;
    displayCards();
}
