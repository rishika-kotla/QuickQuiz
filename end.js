let username = document.getElementById('username');
let save = document.getElementById('save');
let finnalscore = document.getElementById('final');
let recentscore = localStorage.getItem('recentscore');
 finnalscore.innerText= `${recentscore}`;

let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
console.log(highscores);

username.addEventListener('keyup',()=>{
   save.disabled = !username.value;
   
});
// $('.saveme').click(()=>{
//    console.log('....');
// });


savehighscore = e =>{
    console.log('hjhkjn');
    e.preventDefault();
   
    const scores ={
        score: recentscore,
        name: username.value
    };  
     highscores.push(scores);
     console.log(highscores);
     highscores.sort((a,b)=>b.score-a.score);
     highscores.splice(5);
     localStorage.setItem('highscores',JSON.stringify(highscores));
     window.location.assign('./homepage.html');
}