const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
let correct = true;
quoteInputElement.addEventListener('input',()=>{
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    arrayQuote.forEach((characterSpan,index) => {
        const character = arrayValue[index];
        if(character==null)
            {
                characterSpan.classList.remove('incorrect')
                characterSpan.classList.remove('correct');   
                correct = false;     
                
            }
        else if(character===characterSpan.innerText){
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
            correct = true;
        }
        else{
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');   
        correct = false;     }
    })
    if(correct){ 
        showTime();
        renderNewQuote()
    }
})

async function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    })
    quoteInputElement.value = null;
    startTimer();
}
let startTime;
let lastTime;
const startTimer = () =>{
    timerElement.innerText=0;
    startTime = new Date();
    setInterval(()=>{
       timer.innerText= getTimerTime()
    },1000)
}

const getTimerTime = () =>{
    lastTime = Math.round((new Date() - startTime)/1000);
   return lastTime;
}

const showTime = () =>{
    prevTime.innerText='Last time : ' + lastTime;
}
renderNewQuote();