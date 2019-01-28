const parallax = document.getElementById("parallax-div");

window.addEventListener("scroll", function() {
  let offset = window.pageYOffset;
  parallax.style.backgroundPositionY = offset * 0.7 + "px";
})




$(function () {
  oldWord = 0;
  newWord = 0;
  wordsArray = ["husband", "father", "believer", "educator", "teacher", "nerd", "scholar", "linguist", "learner", "polyglot", "techie", "writer", "adventurer", "traveler", "creator", "coder"];
  setInterval(function () {
    while (newWord == oldWord){
      newWord = Math.floor(Math.random() * 19);
    }
    oldWord = newWord;
    $("#changingWord").fadeOut(400, function () {
      $(this).text(wordsArray[newWord % wordsArray.length]).fadeIn(400);
    });
  }, 2000);
});
