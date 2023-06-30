import './style.css';

const playername = document.getElementById('playername');
const playerscore = document.getElementById('playerscore');
const scoresubmit = document.getElementById('scoresubmit');

const getScores = async () => {
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
  }
};

const postScores = async (name, score) => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/{$gameID}/scores/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: name, score }),
  });
  if (response.ok) {
    getScores();
  } 
  const data = await response.json();
  return data;
};

scoresubmit.addEventListener('click', () => {
  const name = playername.value;
  const score = parseInt(playerscore.value, 10);
  postScores(name, score);
  playername.value = '';
  playerscore.value = '';
});