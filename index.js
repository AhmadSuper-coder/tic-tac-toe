// intializing all varibale here 
const xsound=new Audio("sound/one.wav");
const osound=new Audio("sound/two.wav");
const winsound=new Audio("sound/winning.wav");

const win2=new Audio("sound/win2.wav");
const win3=new Audio("sound/win3.wav");
const win4=new Audio("sound/win4.wav");
const win5=new Audio("sound/win5.wav");
const mainwin=document.getElementById("mainwin");
let gameover=false;
let turn="x";


// changing the player turn 
let changeTurn=()=>{
    return turn==="x"?"o":"x";
}



// here checking the winner 

let checkWinner=()=>{
    const bt=document.getElementsByClassName("blocktext");
    const win=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    win.forEach(e=>{
        if((bt[e[0]].innerText===bt[e[1]].innerText) && (bt[e[1]].innerText===bt[e[2]].innerText) && (bt[e[0]].innerText!="")){

            const winner=bt[e[0]].innerText;
            mainwin.innerHTML=`Finally ${winner} has won the game`;
            mainwin.setAttribute('style',"color:red");
            bt[e[0]].style.color="red";
            bt[e[1]].style.color="red";
            bt[e[2]].style.color="red";
            const cheersound=[winsound,win2,win3,win4,win5];
            const rand=Math.floor(Math.random()*5);
            cheersound[rand].play();
            gameover=true;
        }
        
    })

    
}


// here is the game logic 
let playerturn=document.getElementById("playerturn");
const block=document.getElementsByClassName("block");

// reset function 
const myresetFun=()=>{
    
    Array.from(block).forEach(element=>{
        element.querySelector(".blocktext").innerHTML="";
        element.querySelector(".blocktext").setAttribute("style","color:black,opacity:0.7");
        mainwin.style.color="black";
    })   
    
}


Array.from(block).forEach(element=>{
    const blocktext=element.querySelector(".blocktext");

    const stopEvent=()=>{
        setTimeout(() => {
            myresetFun();
            console.log("Game is finished start Now");
            mainwin.innerHTML="Start your game, let see who win?";
            gameover=false;
        }, 2500);
    }

    const gameFunction=()=>{
        if (blocktext.innerText===''){
            blocktext.innerHTML=turn;
            
            if (turn==='x'){
                xsound.play();
                playerturn.innerHTML="Player turn O";
            }else{
                osound.play();
                playerturn.innerHTML="Player turn X";
            }
            checkWinner();
            if (gameover){
                stopEvent()
            }
            turn=changeTurn();
        }
    }
    element.addEventListener('click',gameFunction);
    

});




// restart listener
const restart=document.getElementById("restart");
restart.addEventListener('click',myresetFun);
