function solution(A) {
    //make an array to add all numbers divisble by four
    let divisByFour = [];
    let maxNum = 0;
    //add numbers to array if divisble by four
    for(let i = 0; i < A.length; i++) {
        if(A[i] % 4 == 0) {
            divisByFour.push(A[i]);
        }
    }
    //iterate through new array for highest value
    for(let x = 0; x < divisByFour.length; x++) {
        if(divisByFour[x] > maxNum) {
            maxNum = divisByFour[x];
        }
    }
    //return highest divisible number
    return maxNum;

}