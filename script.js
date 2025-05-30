const form = document.querySelector("form");
const leaderBoardDiv = document.querySelector("#leaderBoard");
const elements = Array.from(document.forms[0].elements);
elements.pop();
let leaderBoard = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {
    id: leaderBoard.length,
    fname: elements[0].value,
    lname: elements[1].value,
    country: elements[2].value,
    score: elements[3].value,
  };
  leaderBoard.push(obj);

  clrForm();
  sortScore();
  printLeaderBoard();
  deleteId();
});

function clrForm() {
  elements.forEach((element) => (element.value = ""));
  elements[0].focus();
}

function sortScore() {
  leaderBoard.sort((a, b) => {
    return b.score - a.score;
  });
}

function printLeaderBoard() {
  leaderBoardDiv.innerHTML = "";
  const fragment = document.createDocumentFragment();
  leaderBoard.forEach((obj) => {
    const parent = document.createElement("div");
    const name = document.createElement("p");
    const country = document.createElement("p");
    const score = document.createElement("p");
    const actions = document.createElement("p");
    const del = document.createElement("span");
    const plus5 = document.createElement("span");
    const minus5 = document.createElement("span");

    parent.classList.add("parent");

    name.innerText = `${obj.fname} ${obj.lname}`;
    country.innerText = `${obj.country}`;
    score.innerText = `${obj.score}`;
    parent.append(name, country, score, actions);
    fragment.append(parent);

    del.addEventListener("click", () => deleteData(obj.id));
    plus5.addEventListener("click", () => modifyScore(obj.id, "+"));
    minus5.addEventListener("click", () => modifyScore(obj.id, "-"));

    actions.classList.add("actions");
    actions.append(del, plus5, minus5);
    del.innerHTML = "&#128465;";
    plus5.innerText = "+5";
    minus5.innerText = "-5";
  });
  function deleteData(idToDelete) {
    leaderBoard = leaderBoard.filter((existingData) => {
      return existingData.id !== idToDelete;
    });
    printLeaderBoard();
    sortScore();
  }

  function modifyScore(idToModify, sign) {
    if (sign == "+") {
      leaderBoard.map((existing) => {
        if (existing.id == idToModify)
          existing.score = Number(existing.score) + 5;
      });
    } else {
      leaderBoard.map((existing) => {
        if (existing.id == idToModify)
          existing.score = Number(existing.score) - 5;
      });
    }
    sortScore();
    printLeaderBoard();
  }
  leaderBoardDiv.append(fragment);
}
