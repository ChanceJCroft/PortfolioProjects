
function solution(A) {
    let headStart;
    let tailStart;
    //make 2 copies of the array so it isn't mutated by each other
    let newA = A;
    let newB = A;
    //force to start with heads
    if(newA[0] != 0){
        newA[0] = 0;
        headStart++;
    }
    //iterate through, if next item in array is the same, switch it
    for(let i = 0; i < newA.length; i++){
       if(newA[i] = newA[i + 1]){
           if(newA[i + 1] = 0){
               newA[i+1] = 1;
           }
           else if(newA[i+1] = 1){
               newA[i+1] = 0;
           }
           headStart++  
       }
    }
    
    //force to start with tails
    if(newB[0] != 1){
        newB[0] = 1;
        tailStart++;
    }
    //iterate through the array changing the next one if it is the same is current
    for(let x = 0; x < newB.length; x++){
        if(newB[x] = newB[x + 1]){
            if(newB[x + 1] = 0){
                newB[x + 1] = 1;
            }
            else if(newB[x + 1] = 1){
                newB[x+1] = 0;
            }
            tailStart++  
        }
     }

    //which number change was lower? Return that number.
    if(headStart <= tailStart) {
        return tailStart;
    }
    else {
        return headStart;
    }
}