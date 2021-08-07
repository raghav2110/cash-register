const btn_next =document.querySelector("#btn_next");
const btn_check =document.querySelector("#btn_check");

const billAmount =document.querySelector("#billAmount");
const cashReceived =document.querySelector("#cashReceived");

const cash_received =document.querySelector(".cash_received");
const return_change = document.querySelector(".return_change");

const noOfNotes= document.querySelectorAll(".noOfNotes");
const errorMsg = document.querySelector(".errorMsg");

const notesArray = [2000,500,100,20,10,5,1];

btn_next.addEventListener("click", () => {
    hideError();
    if(Number(billAmount.value) > 0){
        btn_next.style.display="none";
        cash_received.style.display="block";
    }
    else{
        showError("Please enter valid Bill Amount!");
    }
})

btn_check.addEventListener("click", () => {
    clearNoOfNotes();
    hideError();
    let billAmountValue = Number(billAmount.value);
    let cashReceivedValue = Number(cashReceived.value);

    if(billAmountValue>0 && cashReceivedValue>0)
    {
        if(billAmountValue > cashReceivedValue){
            showError("Cash Received is less than the bill, please enter right amount");
            return;
        }
        calculateNoOfNotes(billAmountValue, cashReceivedValue);

    }
    else{
        showError("Enter valid bill amount and cash given to continue");
    }
    
})

function calculateNoOfNotes(bill,cash){
    let returnAmount=cash-bill;

    if(returnAmount<1){
        showError("No amount to be returned");
        return;
    }
    return_change.style.display="block";
    for(var i=0;i<notesArray.length;i++)
    {
        returnAmount=compare(returnAmount,notesArray[i],i);
    }
}

function compare(returnAmount,noteAmount,index)
{
    if(returnAmount>=noteAmount)
    {
        let notes =Math.floor(returnAmount/noteAmount);
        returnAmount=returnAmount-(notes*noteAmount);
        noOfNotes[index].innerText=`${notes}`;
    }
    return returnAmount;
}

function showError(text){
    errorMsg.style.display="block";
    errorMsg.innerText = text;
    return_change.style.display="none";
}

function clearNoOfNotes(){
    for(var i of noOfNotes)
    {
        i.innerText="";
    }
}

function hideError(){
    errorMsg.style.display="none";
}