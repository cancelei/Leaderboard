// import _ from 'lodash';
import './style.css';

// const gameID = 'AsHkmrIRRRVDeNZNfO3f';
const playername = document.getElementById('playername');
const playerscore = document.getElementById('playerscore');
const scoresubmit = document.getElementById('scoresubmit');

async function getScores() {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/{$gameID}/scores/');
  if (response.ok) {
    const data = await response.json();
    const ul = document.getElementById('list');
    ul.innerHTML = '';
    data.result.forEach((score) => {
      const li = document.createElement('li');
      li.innerHTML = `${score.user}: ${score.score}`;
      ul.appendChild(li);
    });
  } else {
    // console.log('Error');
  }
}

async function postScores(name, score) {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/{$gameID}/scores/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: name, score }),
  });
  if (response.ok) {
    getScores();
  } else {
    // console.log('Error'); for error handling.
  }
  const data = await response.json();
  return data;
}

scoresubmit.addEventListener('click', () => {
  const name = playername.value;
  const score = parseInt(playerscore.value, 10);
  postScores(name, score);
  playername.value = '';
  playerscore.value = '';
});

// function createScoreList() {

//   const scoreList = document.getElementById('ul');

//   scoreList.setAttribute('id', 'score-list');
//   return scoreList;
// }

// function createScoreListItem(name, score) {
//   const scoreListItem = document.createElement('li');
//   scoreListItem.innerHTML = `${name}: ${score}`;
//   return scoreListItem;
// }

// function createScoreListItems(scores) {
//   const scoreListItems = [];
//   scores.forEach((score) => {
//     scoreListItems.push(createScoreListItem(score.user, score.score));
//   });
//   return scoreListItems;
// }