//appends a liked joke to the list of liked joke, the card is edited a little to include an X button
export function appendLiked(element){
    const list = document.querySelector("#listInner");
    const clone = element.cloneNode(true);
    clone.querySelectorAll("button").forEach(e => e.remove());
    var XBTN = document.createElement("button"); //the X button to delete entries
    XBTN.appendChild(document.createTextNode("X"));
    clone.querySelector(".card").appendChild(XBTN);
    function close(){
        clone.style.display = "none";
    }
    XBTN.addEventListener('click', close);
    list.appendChild(clone);
}