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

function displayCards() {
  if (cardsElement) {
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
  } else {
    return;
  }
}
displayCards();

interface ICards {
  question: string;
  status: boolean;
}
function iterateCards(element: ICards, index: number) {
  cardsHTML =
    cardsHTML +
    `<div class="column is-4 tile is-parent">
      <div class="card tile is-child box has-background-${
        checkStatus(element).cardsColorHTML
      }">
        <div class="card-content">
          <div class="icon-text has-text-grey pb-2" data-question="${index}">
          <span class="icon has-text-info">${
            checkStatus(element).statusHTML
          }</span>
          </div>
            <p class="title is-size-5 has-text-grey">${element.question}</p>
        </div>
      </div>
    </div>
`;
  return cardsHTML;
}

function checkStatus(question: ICards) {
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
  const newQuestion = document.querySelector(".textarea") as HTMLInputElement;
  if (cardsElement) {
    cardsElement.innerHTML = "";
    questions.push({ question: newQuestion?.value, status: false });
    displayCards();
  } else {
    return;
  }
}

function showFalseCards() {
  cardsHTML = "";
  const arrayStatusFalse = questions.filter(
    (question) => question.status === false
  );
  if (cardsElement) {
    cardsElement.innerHTML = "";
    arrayStatusFalse.forEach(iterateCards);
    cardsElement.insertAdjacentHTML("afterbegin", cardsHTML);
  } else {
    return;
  }
}

const checkbox = document.getElementById("checkbox") as HTMLInputElement;
checkbox.addEventListener("click", () => {
  if (checkbox.checked) {
    showFalseCards();
  } else {
    displayCards();
  }
});

function subscribe() {
  const listQuestionSelectors = document.querySelectorAll(
    "#cards > div > div > div > div"
  );

  listQuestionSelectors.forEach((element) => {
    if (element instanceof HTMLElement) {
      const dataset = (element as HTMLElement).dataset;
      const id = element.dataset.question;
      if (id) {
        element.addEventListener("click", function (event) {
          changeStatus(+id);
        });
        console.log(dataset.example);
      } else {
        console.log("Please, be careful with divs :)");
      }
    }
  });
}
subscribe();

function changeStatus(id: number) {
  const currentQuestion = questions[id];
  currentQuestion.status = !currentQuestion.status;
  displayCards();
}
