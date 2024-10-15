
let ul = document.querySelector("ul");
let bx = document.querySelector(".quiz-area")
let score = 0;
let qs = 0;

const api = 'https://the-trivia-api.com/v2/questions';
const category = 'music';

let api2 = 'https://the-trivia-api.com/v2/categories';
let map = {}
function step2(category) {

  bx.innerHTML = ''
  bx.classList.add("s2")
  bx.innerHTML = `<div style="margin-top:6%">
        <label for="cars">Choose a level:</label>

        <select name="cars" id="levels">
            <option value="choose">Choose</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
    </div> `
  let select = document.querySelector('#levels');
  select.addEventListener('change', () => {
    const selectedLevel = select.value;
    bx.innerText = ''
    fetchQuestions(category, selectedLevel)
  });

}
function clearScreen() {
  bx.innerHTML = '';
}
function count() {
  clearScreen();
  bx.innerHTML = `
    <h2 style=" margin-top:30px;">Number of Questions</h2>
    <div class="counter">
        <div class="minus">-</div>
        <div class="number">1</div>
        <div class="plus">+</div>
    </div>
    <button>Next</button>`
  bt = document.querySelector("button");
  bt.addEventListener("click", () => {
    qs = Number(nm.innerText);
    start();
  })
  mns = document.querySelector(".minus");
  pls = document.querySelector(".plus");
  nm = document.querySelector(".number");
  pls.addEventListener("click", () => {
    if (Number(nm.innerText) < 10) nm.innerText = Number(nm.innerText) + 1;
  })
  mns.addEventListener("click", () => {
    if (Number(nm.innerText) > 1) nm.innerText = Number(nm.innerText) - 1;
  })
}
function start() {
  clearScreen();
  bx.classList.remove("s2");
  bx.innerHTML = `<h2>Select Category</h2>
                    <ul></ul>`
  let ul = document.querySelector("ul");
  score = 0;
  fetch(api2)
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(category => {
        data[category].forEach(e => {
          let li = document.createElement("li");
          let p = e.toUpperCase();
          li.innerText = p;
          ul.appendChild(li)
          li.addEventListener("click", c => step2(e))
        })
      });
    })
    .catch(error => console.error('Error fetching categories:', error));

}

function fetchQuestions(cat, diff) {
  fetch(`${api}?categories=${cat}&difficulty=${diff}`)
    .then(response => response.json())
    .then(res => {
      runQuiz(res)
    })
}
function endQuiz() {
  let h = document.createElement("h2");
  h.innerText = `Your Score : ${score}/${qs}`
  bx.appendChild(h)
  let bt = document.createElement("button");
  bt.innerText = "Play Again?";
  bx.appendChild(bt);
  bt.addEventListener("click", e => {

    count();
  })
}
function checkAnswer(cr, ans, i, ques) {
  if (cr.innerText === ans) {
    score++;
    cr.classList.add("correct")
  } else {
    cr.classList.add("wrong")
    tt.classList.add("correct")
  }
  let bt = document.createElement("button");
  bt.innerText = "Next";
  bx.appendChild(bt);
  let ls = document.querySelectorAll(".options");
  ls.forEach(e => {
    e.classList.add("disabled");
  })
  bt.addEventListener("click", e => {
    clearScreen();
    if (i === qs - 1) endQuiz();
    else displayQuestion(ques, i + 1);
  })

}
function displayQuestion(ques, i) {
  //console.log(ques[i].question.text);
  let h2 = document.createElement("h4");
  h2.innerText = ques[i].question.text;
  bx.appendChild(h2)
  let op = Math.floor(Math.random() * 4);
  ques[i].incorrectAnswers.splice(op, 0, ques[i].correctAnswer);
  for (q in ques[i].incorrectAnswers) {
    let o = document.createElement("h3");
    o.innerText = ques[i].incorrectAnswers[q];
    o.classList.add("options");
    bx.appendChild(o)
    if (o.innerText === ques[i].correctAnswer) tt = o;
    o.addEventListener("click", cr => {
      checkAnswer(o, ques[i].correctAnswer, i, ques)
    })
  }
}
function runQuiz(ques) {
  let i = 0;
  displayQuestion(ques, 0)

}
console

const categor = 'sport_and_leisure';

// let ob2 = fetch(`${api21}?categories=${categor}`)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => console.error('Error fetching data:', error));

count()

function timer(){
  imp
}