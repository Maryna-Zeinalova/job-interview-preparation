const cardsElement = document.getElementById("cards");
let cardsHTML = "";

function displayCards() {
  cardsElement.innerHTML = "";
  cardsHTML = `
  <div class="column is-4 tile is-parent">
  <div class="card tile is-child box has-background-light">
    <div class="card-content">
      <textarea class="textarea" placeholder="Add your own question here.." id="new-question"></textarea>
      <button class="button is-white mt-3 is-fullwidth is-primary" onclick="addNewQuestion()">Add new question</button>
    </div>
  </div>
  </div>`;
  questions.forEach(iterateCards);
  cardsElement.insertAdjacentHTML("afterbegin", cardsHTML);
  subscribe();
}
displayCards();

function iterateCards(element, index) {
  cardsHTML =
    cardsHTML +
    `<div class="column is-4 tile is-parent">
      <div class="card tile is-child box has-background-${checkStatus(element).cardsColorHTML}">
        <div class="card-content">
          <div class="icon-text has-text-grey pb-2" data-question="${index}">
          <span class="icon has-text-info">${checkStatus(element).statusHTML}</span>
          </div>
            <p class="title is-size-5 has-text-grey">${element.question}</p>
        </div>
      </div>
    </div>
`;
  return cardsHTML;
}

function checkStatus(question) {
  if (question.status === true) {
    return {
      statusHTML: `<i class="fa-solid fa-check has-text-light"></i></span><span>Got it`,
      cardsColorHTML: "primary",
    };
  } else {
    return {
      statusHTML: `<i class="fa-solid fa-xmark has-text-light"></i></span><span>Still learning`,
      cardsColorHTML: "warning",
    };
  }
}

function addNewQuestion() {
  const newQuestion = document.querySelector(".textarea");
  cardsElement.innerHTML = "";
  questions.push({ question: newQuestion.value, status: false });
  displayCards(questions);
}

function showFalseCards() {
  cardsHTML = "";
  const arrayStatusFalse = questions.filter(
    (question) => question.status === false
  );
  cardsElement.innerHTML = "";
  arrayStatusFalse.forEach(iterateCards);
  cardsElement.insertAdjacentHTML("afterbegin", cardsHTML);
}

const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("click", () => {
  if (checkbox.checked) {
    showFalseCards();
  } else {
    displayCards(questions);
  }
});

function subscribe() {
  const listQuestionSelectors = document.querySelectorAll(
    "#cards > div > div > div > div"
  );
  listQuestionSelectors.forEach((element) => {
    const id = element.dataset.question;
    element.addEventListener("click", function (event) {
      changeStatus(id);
    });
  });
}
subscribe();

function changeStatus(id) {
  const currentQuestion = questions[id];
  currentQuestion.status = !currentQuestion.status;
  displayCards();
}
