//Challenge 1: Your Age in Days

function ageindays(){
    let birthyear=prompt('What is your birth year?');
    let ageindays = (2020-birthyear) * 365;
    let h1 = document.createElement('h3');
    let answer = document.createTextNode('You are ' + ageindays + 'days old');
    h1.setAttribute('id','ageindays');
    h1.appendChild(answer);
    document.getElementById('result').appendChild(h1);
}
    
function del(){
    document.getElementById('ageindays').remove();
}    

//challenge 2: image generator
function generate(){
    let image=document.createElement('img');
    let div=document.getElementById('img-generator');
    image.src= "https://steamuserimages-a.akamaihd.net/ugc/923674458674433650/A94B6778712EED75F658CDDB09AED06520F74555/"
    div.appendChild(image);
}

//Challenge 3: Rock Paper Scissors

function rpsGame(yourchoice){
    let humanchoice, botchoice;
    humanchoice=yourchoice.id;
    
    botchoice=numbertochoice(randtorpsint());
    let results=decidewinner(humanchoice,botchoice);
    
    let message=finalmessage(results);
    rpsfrontend(yourchoice.id,botchoice, message);
}
function decidewinner(yourchoice, computerchoice){
    
    let rpsdatabase={
        'rock':{'scissors':1, 'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0}
    }

    let yourscore=rpsdatabase[yourchoice][computerchoice];
    let computerscore=rpsdatabase[computerchoice][yourchoice];

    return [yourscore, computerscore];
    //we can reurn two or more values in JavaScript
    //but if the same variable is passed in argument of
    //some function than the argument and return order of 
    //variables should be same
}
function randtorpsint(){
    return Math.floor(Math.random()*3);
}
function numbertochoice(number){
    return ['rock', 'paper', 'scissors'][number];
}

function finalmessage([yourscore, computerscore]){
    if (yourscore===0){
        return {'message': 'You Lost', 'color': 'red'};
        //this is a datastructure as well
    }
    else if(yourscore===0.5){
        return {'message': 'You Tied', 'color': 'yellow'};
    }
    else{
        return {'message': 'You Won', 'color': 'green'};
        // apparently we can give more than one return values
        
    }
}

function rpsfrontend(humanimagechoice, botimagechoice, finalmessage){
    
    //this is a datastructure or JSON or Dictionary in Python
    let imagedatabase={
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    console.log(imagedatabase[1]);

    //Removes All images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let humandiv =document.createElement('div');
    let botdiv=document.createElement('div');
    let messagediv=document.createElement('div');

    humandiv.innerHTML= "<img src='"+ imagedatabase[humanimagechoice] + "' height='150px' width='150px' style='box-shadow: 0px 10px 50px rgba(0, 89, 255, 1)'>"
    messagediv.innerHTML="<h1 style='color:"+ finalmessage['color']+ "; font-size: 60px; padding: 30px;' >"+ finalmessage['message'] + "</h1>"
    botdiv.innerHTML= "<img src='"+ imagedatabase[botimagechoice] + "' height=150px width=150px style='box-shadow: 0px 10px 50px rgba(243, 30, 24, 1)'>"    

    document.getElementById('flex-box-rps-div').appendChild(humandiv);
    document.getElementById('flex-box-rps-div').appendChild(messagediv);
    document.getElementById('flex-box-rps-div').appendChild(botdiv);
}

//Challenge 4: Change All the buttons

let all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);//This is how we do testing dynamically
// while coding
let copyallbuttons=[];
for (let i=0;i<all_buttons.length;i++){
    copyallbuttons.push(all_buttons[i]);
}

function buttoncolorchange(buttonthingy){
    if (buttonthingy.value==='red'){
        buttonred();
    }else if (buttonthingy.value==='blue'){
        buttonblack();
    }else if (buttonthingy.value==='reset'){
        buttoncolorReset();
    }else if (buttonthingy.value==='random'){
        randomcolors();
    }
}

function buttonred(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[i]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonblack(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[i]);
        all_buttons[i].classList.add('btn-dark');
    }
}

function buttoncolorReset(){
    for (let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[i]);
        all_buttons[i].classList.add(copyallbuttons[i]);
    }
}

function randomcolors(){
    let choices=['btn-primary','btn-danger','btn-dark','btn-success'];

    for(let i=0;i<all_buttons.length;i++){
        let randnumber= Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[i]);
        all_buttons[i].classList.add(choices[randnumber]);
    }
}

// Challenge 5: BlackJack

let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,'losses':0,'draws':0,
    'isstand':false,
    'turnover':false,
};

const YOU=blackjackGame['you'];
const DEALER=blackjackGame['dealer'];

const hitSound=new Audio('sounds/swish.m4a');
const winSound=new Audio('sounds/cash.mp3');
const lossSound=new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){

    if(blackjackGame['isstand']===false){
        let card=randomCard();
    console.log(card);
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
    }
}

function randomCard(){
    let randomindex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomindex];
}

function showCard(card,activeplayer){
    if(activeplayer['score']<=23){
        let cardImage=document.createElement('img');
        cardImage.src=`images/${card}.png`;
        document.querySelector(activeplayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    
    if(blackjackGame['turnover']===true){
        
        blackjackGame['isstand']=false;

        let yourImages=document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');
        
        for(let i=0;i<yourImages.length;i++){
            yourImages[i].remove();
        }

        for(let i=0;i<dealerImages.length;i++){
            dealerImages[i].remove();
        }
        YOU['score']=0;
        DEALER['score']=0;

        document.querySelector('#your-blackjack-result').textContent=0;
        document.querySelector('#dealer-blackjack-result').textContent=0;

        document.querySelector('#your-blackjack-result').style.color='#ffffffff';
        document.querySelector('#dealer-blackjack-result').style.color='#ffffffff';
        
        document.querySelector('#blackjack-result').textContent="Let's Play";
        document.querySelector('#blackjack-result').style.color='black';

        blackjackGame['turnover']=true;
    }
    
}

function updateScore(card,activeplayer){
    //If adding 11 keeps me below 21 then add 11; otherwise,
    //add 1.
    if(card==='A'){
        if(activeplayer['score']+blackjackGame['cardsMap'][card][1]<=23){
            activeplayer['score']+=blackjackGame['cardsMap'][card][1];
        }else {
            activeplayer['score']+=blackjackGame['cardsMap'][card][0];
        }
    } else{
        activeplayer['score']+=blackjackGame['cardsMap'][card];
    }
}

function showScore(activeplayer){
    if(activeplayer['score']>21){
        document.querySelector(activeplayer['scoreSpan']).textContent='BUST!';
        document.querySelector(activeplayer['scoreSpan']).style.color='red';
    } else{
        document.querySelector(activeplayer['scoreSpan']).textContent=activeplayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

async function dealerLogic(){
    blackjackGame['isstand']=true;
    
    while(DEALER['score']<16 && blackjackGame['isstand']===true){
        let card=randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    
        blackjackGame['turnover']=true;
        let winner =computeWinner();
        showResult(winner);
}

// compute winner and return who won
//update the wins, draws, and losses
function computeWinner(){
    let winner;
    if(YOU['score']<=21){
        //condition: higher score than the dealer or when dealer
        //busts but you are 21 or under

        if(YOU['score']>DEALER['score'] || (DEALER['score']>21)){
            blackjackGame['wins']++;
            winner=YOU;
        } else if(YOU['score']<DEALER['score']){
            blackjackGame['losses']++;
            winner=DEALER;
        } else if(YOU['score']===DEALER['score']){
            blackjackGame['draws']++;
        }
        //condition when user busts but dealer doesn't
    } else if(YOU['score']>21 && DEALER['score']<=21){
        blackjackGame['losses']++;
        winner=DEALER;
    }else if( YOU['score']>21 && DEALER['score']>21){
        blackjackGame['draws']++;
    }
    console.log('Winner is ',winner);
    return winner;
}

function showResult(winner){
    let message,messagecolor;

    if(blackjackGame['turnover']===true){
        if(winner===YOU){
            document.querySelector('#wins').textContent=blackjackGame['wins'];
            message='You Won';
            messagecolor='green';
            winSound.play();
        } else if(winner===DEALER){
            document.querySelector('#losses').textContent=blackjackGame['losses'];
            message='You Lost';
            messagecolor='red';
            lossSound.play();
        } else{
            document.querySelector('#draws').textContent=blackjackGame['draws'];
            message='You Drew';
            messagecolor='black';
        }
    
        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messagecolor;
    }   
}