import { saveSessionData, getStoredsessions } from "./storage.js"
import { getNewText } from "./text.js"
import * as Element from "./elements.js"
import {Session} from './session.js'

let timer, charIndex, mistakes, totalTyped, correctWords, incorrectChar

// restartSession()

//events


const session = new Session(timer, charIndex, mistakes, totalTyped, correctWords, incorrectChar)
session.restartSession()
runSession(session)

function runSession(session) {
    Element.textInputElement.addEventListener('input', session.initTyping)
    Element.textInputElement.addEventListener('input', startTimer, { once: true })
    Element.textInputElement.addEventListener('keydown', event => escKeyPress(event))
    Element.textInputElement.addEventListener('keydown', event => enterKeyPress(event))
}


// function restartSession() {
//     timer = 6
//     charIndex = 0
//     mistakes = 0
//     totalTyped = 0
//     correctWords = 0
//     incorrectChar = false
//     getNewText(Element.textDisplayElement, Element.textInputElement)
// }

// //typing

// function checkCharacter(allCharacters, char) {
//     if (char === ' ' && allCharacters[charIndex].innerText === ' ') {
//         if (incorrectChar) {
//             incorrectChar = false
//         } else {
//             correctWords++
//         }
//     }
//     if (char == null) {
//         charIndex--
//         totalTyped--
//         if (allCharacters[charIndex].classList.contains('incorrect')) {
//             mistakes--
//             incorrectChar = false
//         }

//         allCharacters[charIndex].classList.remove('correct', 'incorrect')
//     } else {
//         if (allCharacters[charIndex].innerText === char) {
//             allCharacters[charIndex].classList.add('correct')
//         } else {
//             incorrectChar = true
//             mistakes++
//             allCharacters[charIndex].classList.add('incorrect')
//         }
//         charIndex++
//         totalTyped++
//     }
// }


// function initTyping() {
//     const characters = Element.textDisplayElement.querySelectorAll('span')
//     const typedChar = Element.textInputElement.value.split('')[charIndex]

//     checkCharacter(characters, typedChar)
//     characters.forEach(span => span.classList.remove('current'))
//     if (charIndex < characters.length) {
//         characters[charIndex].classList.add('current')
//     }
// }


//based on events

function resetText() {
    session.charIndex = 0
    session.incorrectChar = false
    getNewText()
}


function escKeyPress(e) {
    if (e.key === 'Escape') {
        getNewText()
        resetText()
    }
}

function enterKeyPress(e) {
    if (e.key === 'Enter') {
        e.preventDefault()
        window.location.reload()
    }
}

function startTimer() {
    Element.timerElement.innerText = session.timer
    const interval = setInterval(() => {
        if (session.timer < 1) {
            clearInterval(interval)
            endOfSession()
            return
        }
        session.timer--
        Element.timerElement.innerText = session.timer
    }, 1000)
}


//display data after game

function calculateAccuracy() {
    if (session.totalTyped === 0) {
        return 0
    }
    return parseInt((((session.totalTyped - session.mistakes) / session.totalTyped) * 100).toFixed(0))
}


function hideScreens() {
    Element.containerElement.classList.add('invisible')
    Element.timerElement.classList.add('invisible')
    Element.gameName.classList.add('invisible')
    Element.resetInstruction.classList.add('invisible')
}

function createSessionData() {
    const today = new Date().toISOString().slice(0, 10)
    const accuracy = calculateAccuracy()
    return {
        date: today,
        wpm: session.correctWords,
        accuracy: accuracy
    }
}

function listenForRestart() {
    document.addEventListener('keydown', event =>
        enterKeyPress(event))
}

function endOfSession() {

    hideScreens()
    const sessionData = createSessionData()
    saveSessionData(sessionData)
    Element.wpmElement.innerText = `Your WPM: ${sessionData.wpm}`
    Element.accuracyElement.innerText = `Your accuracy: ${sessionData.accuracy}%`
    displayMetrics()
    listenForRestart()

}

function createCells(result, row) {
    const dateCell = document.createElement('td')
    const wpmCell = document.createElement('td')
    const accuracyCell = document.createElement('td')

    dateCell.innerText = result.date
    wpmCell.innerText = result.wpm
    accuracyCell.innerText = result.accuracy

    row.appendChild(dateCell)
    row.appendChild(wpmCell)
    row.appendChild(accuracyCell)
}

function createTable(allSessions) {
    Element.resulsTableBody.innerText = ''
    allSessions.forEach(result => {
        const row = document.createElement('tr')
        createCells(result, row)
        Element.resulsTableBody.appendChild(row)
    })
}

function displayMetrics() {
    const allSessions = getStoredsessions().reverse()
    createTable(allSessions)
    if (allSessions.length > 1) {
        addImprovementMessage('wpm', allSessions)
        addImprovementMessage('accuracy', allSessions)
    } else {
        Element.wpmMessage.innerText = 'Practice regurlarly to achieve improvement!'
    }
    Element.resultsElement.classList.remove('invisible')
}

function compareMetrics(allSessions, metric) {
    const thisSession = allSessions[0]
    const previousSession = allSessions[1]
    return metric === 'wpm'
        ? improvementWpm(thisSession, previousSession)
        : improvementAccuracy(thisSession, previousSession)
}


function improvementWpm(thisSession, previousSession) {
    if (thisSession.wpm > previousSession.wpm) {
        return 'You have improved typing speed over the last session!'
    } else if (thisSession.wpm < previousSession.wpm) {
        return 'Keep practicing, you typed faster on the previous session!'
    } else {
        return 'Your typing speed is the same as in previous session!'
    }
}

function improvementAccuracy(thisSession, previousSession) {

    if (thisSession.accuracy > previousSession.accuracy) {
        return 'You have improved your accuracy over the last session!'
    } else if (thisSession.accuracy < previousSession.accuracy) {
        return 'Keep practicing, you typed more accurate on previous session!'
    } else {
        return 'Your accuracy is the same as in previous session!'
    }
}

function addImprovementMessage(element, allSessions) {
    element === 'wpm'
        ? Element.wpmMessage.innerText = compareMetrics(allSessions, 'wpm')
        : Element.accuracyMessage.innerText = compareMetrics(allSessions, 'accuracy')
}


