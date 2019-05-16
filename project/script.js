var gameStatus = "firstQuestion";
var score = 0;
document.getElementById("startButton").addEventListener("click", function(event) {
  event.preventDefault();
  if(gameStatus === "correctAnswer") {
    document.getElementById("resultMessage").innerHTML = '<div id="resultMessage></div>';
  }
  else if(gameStatus === "wrongAnswer") {
    document.getElementById("resultMessage").innerHTML = '<div id="resultMessage></div>';
    score = 0;
    document.getElementById("score").innerHTML = "Next Question";
    document.getElementById("score").innerHTML = "<h2>Score: 0</h2>"
  }
  const catDropDown = document.getElementById("categories");
  const categoryLabel = catDropDown.options[catDropDown.selectedIndex].value;
  const category = (categoryLabel === "random") ? ("") : ("&category=" + categoryLabel);
  const diffDropDown = document.getElementById("difficulty");
  const difficultyLabel = diffDropDown.options[diffDropDown.selectedIndex].value;
  const difficulty = (difficultyLabel === "any") ? ("") : ("&difficulty=" + difficultyLabel);
  const url = "https://opentdb.com/api.php?amount=1" + category + difficulty;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += '<div class="question" id="myQuestion">';
      results += '<p>' + json.results[0].question + '</p>';
      var answersBeforeCorrectAnswer = Math.floor(Math.random() * (json.results[0].incorrect_answers.length));
      for (let i = 0; i < answersBeforeCorrectAnswer; i++) {
        results += '<input type="radio" name="answer" value="i' + i + '" id="i' + i + '">' + json.results[0].incorrect_answers[i] + '<br>'
      }
      results += '<input type="radio" name="answer" value="c" id="c">' + json.results[0].correct_answer + '<br>';
      for (let i = answersBeforeCorrectAnswer; i < json.results[0].incorrect_answers.length; i++) {
        results += '<input type="radio" name="answer" value="i' + i + '" id="i' + i + '">' + json.results[0].incorrect_answers[i] + '<br>'
      }
      results += '</div>'
      console.log(json);
      document.getElementById("newQuestion").innerHTML = results;
      document.getElementById("i0").addEventListener("click", function(event) {
        gameStatus = "wrongAnswer";
        let results2 = "";
        document.getElementById("score").innerHTML = '<h2 class="wrong" id="score">Score: ' + score + '</h2>'
        results2 += '<div id="resultMessage">'
        results2 += '<h2>WRONG!!!</h2>'
        results2 += '<p>Press Restart to try for a better score!</p>'
        results2 += '</div>'
        document.getElementById("startButton").innerHTML = "Restart";
        document.getElementById("resultMessage").innerHTML = results2;
      });
      document.getElementById("c").addEventListener("click", function(event) {
          if(this.id === "c") {
            gameStatus = "correctAnswer";
            score++;
            let results2 = "";
            results2 += '<div id="resultMessage">'
            results2 += '<h2>CORRECT!!!</h2>'
            results2 += '<p>Press Next Question to move on!</p>'
            results2 += '</div>'
            document.getElementById("startButton").innerHTML = "Next Question";
            document.getElementById("resultMessage").innerHTML = results2;
            document.getElementById("score").innerHTML = '<h2 class="correct" id="score">Score: ' + score;
            console.log(results2);

          }
      });
    });
});






