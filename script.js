const questions = [
  {
    question:
      "What's the difference between a variable that is: null, undefined or undeclared?",
    status: true,
  },
  {
    question: "Explain how this works in JavaScript",
    status: false,
  },
  {
    question:
      "What language constructions do you use for iterating over object properties and array items?",
    status: true,
  },
  {
    question:
      "What are the pros and cons of extending built-in JavaScript objects?",
    status: false,
  },
  {
    question: "What is the difference between == and ===?",
    status: true,
  },
  {
    question:
      "What is strict mode? What are some of the advantages / disadvantages of using it?",
    status: false,
  },
];
const cardsElement = document.getElementById("cards");
let cardsHTML = "";

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

function showCards(element) {   
  cardsHTML =
    cardsHTML +
    `
          <div class="column is-4 tile is-parent">
            <div class="card tile is-child box has-background-${checkStatus(element).cardsColorHTML}">
              <div class="card-content">
                <div class="icon-text has-text-grey pb-2"><span class="icon has-text-info">${checkStatus(element).statusHTML}</span></div>
                <p class="title is-size-5 has-text-grey">${element.question}</p>
              </div>
            </div>
          </div>
`;
  return cardsHTML;
}

function addNewQuestion() {  
  let newQuestion = document.querySelector(".textarea");
  cardsElement.innerHTML = "";
  questions.push({ question: newQuestion.value, status: false });
  displayCards();
}

function showFalseCards() {
  cardsHTML = "";
  const arrayStatusFalse = questions.filter(
    (question) => question.status === false
  );
  cardsElement.innerHTML = "";
  arrayStatusFalse.forEach(showCards);
  cardsElement.insertAdjacentHTML("afterbegin", cardsHTML);
}

function displayCards() {
  cardsElement.innerHTML = "";
  cardsHTML = `<div class="column is-4 tile is-parent">
  <div class="card tile is-child box has-background-light">
    <div class="card-content">
      <textarea class="textarea" placeholder="Add your own question here.." id="new-question"></textarea>
      <button class="button is-white mt-3 is-fullwidth is-primary" onclick="addNewQuestion()">Add new question</button>
    </div>
  </div>
  </div>`;
  questions.forEach(showCards);
  cardsElement.insertAdjacentHTML("afterbegin", cardsHTML);
}
displayCards();
