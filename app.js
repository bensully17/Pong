const baseURL = 'https://galvanize-leader-board.herokuapp.com/api/v1/leader-board'
const section = document.querySelector('.scores')



for (let i = 0; i < 3; i++) {
    const newP = document.createElement('p')
    newP.className = 'score-card'
    section.appendChild(newP)
    const newPs = document.querySelectorAll('.score-card')
    for (let j = 0; j < 2; j++) {
        const newSpan = document.createElement('span')
        newPs[i].appendChild(newSpan)
          
    }
       
}
let span = document.querySelectorAll('span')
span[0].className = 'player-name'
span[1].className = 'score' 
span[2].className = 'player-name'
span[3].className = 'score'
span[4].className = 'player-name'
span[5].className = 'score'

function getHighScores() {
    fetch (baseURL)
        .then (response => {
            if (!response.ok){
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then (response => {
            let highScore = 0
            let secondHighScore = 0
            let secondHighScoreArray = null
            let thirdHighScore = 0
            let thirdHighScoreArray = null
            let highScoreArray = null
            response.forEach(x => {
                if (x.game_name === 'GBP' && x.score > highScore) {
                    highScore = x.score
                    highScoreArray = x
                }
                else if (x.game_name === 'GBP' && x.score < highScore && x.score > secondHighScore) {
                    secondHighScore = x.score
                    secondHighScoreArray = x
                }
                else if (x.game_name === 'GBP' && x.score < highScore && x.score < secondHighScore && x.score > thirdHighScore) {
                    thirdHighScore = x.score
                    thirdHighScoreArray = x
                }
            });
            let highScorePlayerName = document.querySelectorAll('.player-name')
            let highScorePlayerScore = document.querySelectorAll('.score')
            highScorePlayerName[0].textContent = highScoreArray.player_name
            highScorePlayerScore[0].textContent = highScoreArray.score
            highScorePlayerName[1].textContent = secondHighScoreArray.player_name
            highScorePlayerScore[1].textContent = secondHighScoreArray.score
            highScorePlayerName[2].textContent = thirdHighScoreArray.player_name
            highScorePlayerScore[2].textContent = thirdHighScoreArray.score   
            
        }
        )
    }  
getHighScores() 
canvas.addEventListener('gameOver', gameIsOver)
function gameIsOver() {
    window.alert('Game Over. Score: ' + score) 
    let playerName = document.querySelector('.big-input').value

    fetch (baseURL, {
        method: 'POST',
        body: JSON.stringify({
            'game_name': 'GBP',
            'player_name': playerName,
            'score': score,
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then (response => {
        if (!response.ok) {
            throw new Error(response.statusText)
            console.error('Oops')
        }
    })
    .then (response => {
        getHighScores() 
    })
    
    .catch(error => alert(error))
}   
   
    
    
   
    
    

    