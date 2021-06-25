const question = document.getElementById('question');
const choices= [...document.getElementsByClassName('choice-text')];
let qncounter = document.getElementById('questionCounter');
let scorecounter = document.getElementById('score-counter');
let loader=document.getElementById('loader');
let gamecontainer=document.getElementById('display');
console.log(choices);

let currquestions={};
let questioncounter=0;
let score=0;
let availablequestions=[];
let acceptinganswers=false;
let correct_bonus=10;
let max_qns=3;

let qns=[];
fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple")
.then(res =>{
    return res.json();
}).then(ldqns=>{
    console.log(ldqns);
  qns=  ldqns.results.map(ldqns=>{
        const formattedqn={
            question: ldqns.question
        
        };
    const anschoices=[...ldqns.incorrect_answers,ldqns.correct_answer];
    anschoices.forEach((choice,index)=>{
        formattedqn["choice"+(index+1)] =choice;
    });
        return formattedqn;
    }); 
    
    gamecontainer.classList.remove("hidden");
    loader.classList.add("hidden");
    startgame();
}) ;



 startgame = ()=>{
   score=0;
   const conatiner=document.getElementById('display-none');
   
//    conatiner.style.display='initial';

   questioncounter=0;
   availablequestions=[...qns];
   console.log(availablequestions);
   getnewqn();
} 
getnewqn=()=>{
    localStorage.setItem('recentscore',score);
    if(questioncounter>=max_qns || availablequestions===[])
    {
        window.location.assign('./end.html');
    }
   questioncounter++;
   qncounter.innerText = `${questioncounter}/${max_qns}`;
   const index= Math.floor(Math.random()*availablequestions.length);
    currquestions = availablequestions[index];
   question.innerHTML= availablequestions[index].question;
  

for(let i=0;i<4;i++)
{    const num=i+1;
    choices[i].innerText=currquestions['choice'+num];
}
availablequestions.splice(index,1);
acceptinganswers=true;
}; 
choices.forEach(choice=>{
    choice.addEventListener('click',e=>{
        if(!acceptinganswers)return;
        acceptinganswers=false;
        const selectedchoice = e.target;
        const selectedans = selectedchoice.dataset['number'];
        console.log(selectedchoice);
        console.log(selectedans);
        let classtoapply;
        if(selectedans== currquestions.answer){
            score+= correct_bonus;
            classtoapply = 'correct';
            scorecounter.innerHTML = `${score}`;
        }
        else{
            classtoapply = 'incorrect';
        } 
        selectedchoice.previousElementSibling.classList.add(classtoapply);
        selectedchoice.classList.add(classtoapply);
        setTimeout(
            ()=>{
                selectedchoice.previousElementSibling.classList.remove(classtoapply);
                selectedchoice.classList.remove(classtoapply);
                getnewqn();
            }
        ,1000);
    })
})

startgame();
