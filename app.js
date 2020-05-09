// the corrrect combination user must guess
let combination;

// all of the input fields where user enter's their guesses
let inputs = [];

// the total number of guesses the user has for this round
let totalGuesses;

const h1 = document.createElement('h1');
h1.innerHTML = 'Guess Combo';
document.body.appendChild(h1);

const div = document.createElement('div');
document.body.appendChild(div);

const btn = document.createElement('button');
btn.innerHTML = 'Start';
btn.setAttribute('style', 'display:block;margin-top:20px');
document.body.appendChild(btn);

const para = document.createElement('p');
para.innerHTML = '<em>Instructions: Guess the combo. Royalblue means guess higher, orangered means guess lower, and green means you guessed correctly.</em>';
document.body.appendChild(para);

btn.addEventListener('click', setUp);
    
function setUp() {
    // If the input fields are showing up for the first time
    if(div.childElementCount === 0) {
        createLock();
    }
    // Change the value of the input fields back to zero in order to restart game
    else {
        revertToNormal();
    }
    // generate random numbers between 0-9 for the combination
    combination = [random(), random(), random(), random(), random(), random()];
    totalGuesses = 0;
    h1.innerHTML = 'Guess the combo';
    btn.textContent = "Check Combo";
    btn.removeEventListener('click', setUp);
    btn.textContent = 'Check Combo';
    btn.addEventListener('click', checkCombo);
}

// Create the 6 input fields and add the correct attributes
function createLock() {
    for(let i = 0; i < 6; i++) {
        const input = document.createElement('input');
        input.setAttribute('type', 'number');
        // initial value in input field will be zero
        input.setAttribute('value', '0');
        // lowest value allowed in input field is zero
        input.setAttribute('min', '0');
        // largest value allowed in input field is 9
        input.setAttribute('max', '9');
        input.setAttribute('style', 'width:100px;height:100px;font-size:3rem;color:black');
        div.appendChild(input);
        // store the input field in inputs array for later use
        inputs[i] = input;
    }
}

// When user hits Check Combo button this function will compare the values in the input fields to the values in the combination array and check to see if they match or not and give hints/feedback.
function checkCombo() {
    // Add one to total number of guesses for this round
    totalGuesses++;
    h1.textContent = `Guesses ${totalGuesses}`;
    // keep track of how many input fields match the values in combination array so that we know when to change button to allow user to restart the game
    let count = 0;
    for(let i = 0; i < combination.length; i++) {
        // if input field value matches value in combination array, then change background to green
        if(Number(inputs[i].value) === combination[i]) {
            inputs[i].style.backgroundColor = '#2d862d';
            count++;
        }
        // if input field value is greater than value in combination array, then change background to orangered which indicates to user to guess lower next time
        else if(Number(inputs[i].value) > combination[i]) {
            inputs[i].style.backgroundColor = 'orangered';
        }
        // if input field value is less than value in combination array, then change background to royalblue which indicates to user to guess higher next time
        else {
            inputs[i].style.backgroundColor = 'royalblue';
        }
    }
    // if all input fields background are green then allow user to restart and play another game
    if(count === 6) {
        btn.removeEventListener('click', checkCombo);
        btn.textContent = 'Restart Game';
        btn.addEventListener('click', setUp);
    }
}

// Change all the input field values back to zero and the backgrounds to white
function revertToNormal() {
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = '0';
        inputs[i].style.backgroundColor = 'white';
    }
}

// generate a random number between 0-9
function random() {
    return Math.floor(Math.random() * 10);
}