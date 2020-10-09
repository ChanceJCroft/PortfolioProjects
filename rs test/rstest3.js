function solution() {
    //make an array to put all text content into
    let finalArr = [];

    
    //make a function to check if color and background color are different, if so push the text into the new array
    const newArray = function(){
        if(document.getElementById('td').style.color !== document.getElementById('td').style.backgroundColor){
            finalArr.push(document.getElementById('td').textContent);
    }
    }

    //make a forEach to run the newArray function
    document.getElementById('td').forEach(newArray);    
//join the final array together into a string
const finalAnswer = finalArr.join();
//return to final string
return finalAnswer; 
}