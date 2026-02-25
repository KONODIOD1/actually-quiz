
const username = document.getElementById("username");
const saveScorebtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem("mostRecentScore");
const Email = document.getElementById("Email");
const HighScores = JSON.parse(localStorage.getItem("highScores")) || [];

finalScore.innerText = mostRecentScore;




username.addEventListener("keyup", () => {
   saveScorebtn.disabled = !username.value;
 
})

Email.addEventListener("keyup", () => {
   saveScorebtn.disabled = !Email.value;
 
})

saveHighScore = e => {
   console.log("click")
   e.preventDefault();

   const score = mostRecentScore
   
   console.log (score)

   const USername =  {
      name:username.value
   };

   const email = {
      Email:Email.value
   };

   connection.connect(err => {
      if (err) throw err;
      const sql = "INSERT INTO score (score) VALUES (?)";

      connection.query(sql, [score], function(err, results) {
       if (err) throw err;
    
       console.log("saved");
      })
  });

}