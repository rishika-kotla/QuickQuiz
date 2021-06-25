const highscoreList = document.getElementById('highscoreslist');
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
highscoreList.innerHTML = highscores.map(score=>{
    return `<li class="highscore"> ${score.name}-${score.score}</li>`
});