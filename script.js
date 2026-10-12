// grabing all elements needed

// display elements
const input_function = document.querySelector('#input_function');
const result = document.querySelector('#result');

//buttons 
const buttons = document.querySelector('.buttons');

// keping track of the input "memory"
let op = null; // +, -, /, * are set to undefined at the start
let curr = '';
let prev = '';
// what holds the inputted function
let history = '';
let eq = '';
//flag to restart after =
let calculated = false;

// allowing clicks on buttons
buttons.addEventListener('click', (e) => {
    // if the element being clicked is not a buttton, ignore
    // note: when .tagName is used it only returns the tag used and when it's
    // not used it returns the full tag info, the info insde it too (*basically the whole line of code). 
    if(e.target.tagName !== 'BUTTON') return;

    //grabing the value content of the button being click 
    const value = e.target.value;
    //this grabs the data-action. for those buttons that have not value= ..
    const action = e.target.dataset.action;

    // clear the eq(uation) on new press
    eq = '';


    if(action === 'clear'){
        clear();
    }
    else if(action === 'delete'){
        deleteCurr();
    }
    else if(action === 'sqrt'){
        handleSqrt();
    }
    else if(action ==='equals'){
        if (op && curr !== ''){
            eq = `${history} ${curr}`;
        }
        calculate();
        history = '';
        calculated = true;
    }
    //if value is a number or the "." run the handle value function 
    else if(!isNaN(value) || value === '.'){
        handleNum(value);
    }
    //if button pressed is an opperation
    else{
        handleOp(value);
    }

    // display 
    screenDisplay();
})

// functions 
//function to show 0 if nothing has been typed, show the buttons being pressed
function screenDisplay(){
    // this shows the function being made 5 + 4 + ...
    // op || ''  => since op is null at the start, we need to allow '' or else it would display "null"
    input_function.textContent = eq || `${history}${curr}`;
    result.textContent = curr || prev || '0';
}
function clear(){
    curr='';
    prev='';
    op = null;
    history = '';
}
function deleteCurr(){
    //using slice so it only deletes the lastest number typed. 
    // using curr='' would delete the full string 
    curr=curr.slice(0, -1);
}
function handleSqrt(){
    if(curr===''){
        return;
    }
    // converting string into an int 
    const num = parseFloat(curr);
    //if negative throw error
    if(num < 0 ){
        curr='Error'
        return;
    }
    //convert ans back to string
    curr = String(Math.sqrt(num));
}
//handling number and or .
function handleNum(value){
     //if error was previously outputted, clear it
    if(curr === 'Error'){
        curr = '';
    }
    //clear after = 
    if(calculated){
        curr = '';
        calculated = false;
    }
    // make sure to only allow one "." 
    if(value === '.' && curr.includes('.')){
        return;
    }
    curr += value;
}
//handling operations (+,-,/,*)
function handleOp(value){
    calculated = false;
     //if error was previously outputted, clear it
    if(curr === 'Error'){
        curr = '';
    }
    //make sure a number has already been clicked
    if(curr === ''){
        return;
    }
    history += `${curr} ${value} `;
    //if numbers already been pressed; calculate (chaing 1 + 1 + 1+ etc.)
    if(prev !== ''){
        calculate();
        if(curr === 'Error'){
            history = '';
            return;
        }
    }
    //saves the operation that was pressed
    op = value;
    // moves the typed number to prev to save it 
    prev = curr;
    // empties out curr so the next number can get clicked
    curr = '';
}
function calculate(){
    //if empty, do nothing
    if(op === null || curr === ''){
        return;
    }
    // varables used for calculations
    const a = parseFloat(prev);
    const b = parseFloat(curr);
    let result;
    // the use of operations
    switch(op){
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': if(b === 0){
            result = "Error"
        } else{
            result = a /b;
        }
        break;
    }
    curr = String(result);
    prev = '';
    op = null;
}