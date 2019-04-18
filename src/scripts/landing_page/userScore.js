let userScore = parseInt(localStorage.getItem(KEY_tttScore))
if (!isNaN(userScore)){
    element("#userScore").innerHTML = "Your current best score : "+userScore.toLocaleString('fr')+ "pts"
}