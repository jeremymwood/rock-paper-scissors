const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '<i class="fa-solid fa-hand-fist"></i>',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '<i class="fa-solid fa-hand"></i>',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '<i class="fa-solid fa-hand-peace"></i>',
        beats: 'paper'
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

function makeSelection(selection) {
    const computerSelection = randomSelection();
    const youAreWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)
    console.log(computerSelection)

    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, youAreWinner)

    if (youAreWinner) incrementScore(yourScoreSpan)
    if (computerWinner) incrementScore(computerScoreSpan)

}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerHTML = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')

    finalColumn.after(div)
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}
function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex];
}
