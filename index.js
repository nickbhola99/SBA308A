import * as Lists from "./lists.js";
const jokeBtn = document.getElementById("spawn");
const single = document.querySelector(".single-joke");
const double = document.querySelector(".setup-joke");
const likedSingle = document.querySelector("#likeButtonSingle");
const likedDouble = document.querySelector("#likeButtonDouble");
single.style.display = "none";
double.style.display = "none";

var currentUrl = "https://v2.jokeapi.dev/joke/Programming"; //default link, only Programming jokes
var currentElement = {}; //current object, sent to the list of liked jokes when liked
jokeBtn.addEventListener("click", getJokes); //retrieves a joke from the Joke Api when clicked

//async version of getJokes()
// async function getJokes(){
//   var checkedValue = document.querySelectorAll(".form-check-input:checked");
//   console.log(checkedValue);

//   var blacklist = document.querySelectorAll(".form-check1-input:checked");
//   console.log(blacklist);

//   var str = "https://v2.jokeapi.dev/joke/";
//   checkedValue.forEach((element) => {
//     str = str.concat(`${element.value},`);
//   });
//   str = str.substring(0, str.length - 1);
//   console.log(str);
//   if(blacklist.length !== 0){
//     str = str.concat("?blacklistFlags=");
//     blacklist.forEach((element) => {
//       str = str.concat(`${element.value},`);
//     });
//     str = str.substring(0, str.length - 1);
//   console.log(str);
//   }
//   const res = await axios.get(str);
//   if(res.data.error === true){
//     window.alert("Bad Selection");
//   }
//   if(res.data.type === "single"){
//     single.style.display="block";
//     double.style.display="none";
//         console.log(res.data);
//   single.querySelector(".card").querySelector("p").innerHTML = res.data.joke;
//   currentElement = single.cloneNode(true);
//   }
//   else{
//     console.log(res.data);
//     single.style.display="none";
//     double.style.display="block";
//     double.querySelector(".card").querySelector("#setup").innerHTML = res.data.setup;
//     double.querySelector(".card").querySelector("#delivery").innerHTML = res.data.delivery;
//     currentElement = double.cloneNode(true);
//   }
// }

//function that calls the API for a joke
function getJokes() {
  //retrieves the values the User asked for to manipulate the API call
  var checkedValue = document.querySelectorAll(".form-check-input:checked");
  console.log(checkedValue);
  var blacklist = document.querySelectorAll(".form-check1-input:checked");
  console.log(blacklist);

  //string has the base api call link, the options the Users asked for is appended to it.
  var str = "https://v2.jokeapi.dev/joke/";
  checkedValue.forEach((element) => {
    str = str.concat(`${element.value},`);
  });
  str = str.substring(0, str.length - 1);
  console.log(str);
  if (blacklist.length !== 0) {
    str = str.concat("?blacklistFlags=");
    blacklist.forEach((element) => {
      str = str.concat(`${element.value},`);
    });
    str = str.substring(0, str.length - 1);
    console.log(str);
  }
  //axios call
  axios
    .get(str)
    .then((res) => {
      if (res.data.error === true) {
        //Alert User if an error occurs, will mostly happen if they didn't check anything
        window.alert("Bad Selection");
      }
      //there are two kinds of jokes, single ones that are just one line, and double ones with a setup and punchline, they need different cards
      if (res.data.type === "single") {
        single.style.display = "block";
        double.style.display = "none";
        console.log(res.data);
        single.querySelector(".card").querySelector("p").innerHTML =
          res.data.joke;
        currentElement = single.cloneNode(true);
      } else {
        console.log(res.data);
        single.style.display = "none";
        double.style.display = "block";
        double.querySelector(".card").querySelector("#setup").innerHTML =
          res.data.setup;
        double.querySelector(".card").querySelector("#delivery").innerHTML =
          res.data.delivery;
        currentElement = double.cloneNode(true);
      }

      // console.log(categories.value);

      currentUrl = str;
    })
    .catch((error) => {
      window.alert(error);
    });
}

//function to add liked jokes to the list
likedSingle.addEventListener("click", add);
likedDouble.addEventListener("click", add);
function add() {
  Lists.appendLiked(currentElement);
}
