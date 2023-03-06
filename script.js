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

function displayCards() {
  let cardsElement = document.getElementById("cards");
  let statusHTML = "";
  let cardsHTML = "";
  let cardsColorHTML = "";

  questions.forEach((element) => {
    if (element.status === true) {
      statusHTML = `<i class="fa-solid fa-check has-text-light"></i></span><span>Got it`;
      cardsColorHTML = "primary";
    } else {
      statusHTML = `<i class="fa-solid fa-xmark has-text-light"></i></span><span>Still learning`;
      cardsColorHTML = "warning";
    }
    cardsHTML =
      cardsHTML +
      `
            <div class="column is-4 tile is-parent">
              <div class="card tile is-child box has-background-${cardsColorHTML}">
                <div class="card-content">
                  <div class="icon-text has-text-grey pb-2"><span class="icon has-text-info">${statusHTML}</span></div>
                  <p class="title is-size-5 has-text-grey">${element.question}</p>
                </div>
              </div>
            </div>
`
  });

  cardsElement.insertAdjacentHTML("afterbegin", cardsHTML);
}
displayCards();
