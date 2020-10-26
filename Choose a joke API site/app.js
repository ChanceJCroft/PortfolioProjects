
//fetch the api and return a joke
const jokes = document.querySelector('#jokes');
let image = document.querySelector('#changingImg');


//fetch the api and return a dad joke
const getDadJoke = async () => {
    try {
    const config = { headers: {Accept: 'application/json'}}
    const res = await axios.get('https://icanhazdadjoke.com/', config);
    return res.data.joke;
    } catch (e) {
        return "NO DAD JOKES AVAILABLE!"
    }
}

//update line to show new joke text
const addNewDadJoke = async () => {
    const jokeText = await getDadJoke();
    image.src = "obamalaughing.png";
    jokes.textContent = jokeText;
}

//button to add 
const dadButton = document.getElementById('dadJokeBtn');
dadButton.addEventListener('click', addNewDadJoke);

//get CN Joke
const getCNJoke = async () => {
    try {
    const config = { headers: {Accept: 'application/json'}}
    const res = await axios.get('http://api.icndb.com/jokes/random', config);
    return res.data.value.joke;
    } catch (e) {
        return "NO CHUCK NORRIS JOKES AVAILABLE!"
    }
}

//update line to show new CN joke text
const addNewCNJoke = async () => {
    const cnJokeText = await getCNJoke();
    image.src = "chucknorris.png";
    jokes.textContent = cnJokeText;
}

//button event listener to add a CN joke
const cnButton = document.getElementById('cnJokeBtn');
cnButton.addEventListener('click', addNewCNJoke);


//get random joke of the day
const getjotd = async () => {
    try {
    const config = { headers: {Accept: 'application/json'}}
    const res = await axios.get('https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist&type=single', config);
    return res.data.joke;c
    } catch (e) {
        return "NO JOKE OF THE DAY AVAILABLE!"
    }
}

//update line to show new CN joke text
const addNewjotd = async () => {
    const jotdText = await getjotd();
    image.src = "laughingemoji.png"
    jokes.textContent = jotdText;
}

//button event listener to add a CN joke
const jotdButton = document.getElementById('jotdBtn');
jotdButton.addEventListener('click', addNewjotd);