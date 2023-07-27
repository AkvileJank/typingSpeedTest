import { getStoredsessions } from "./storage.js"
import { createTable } from "./userInterface.js"
import * as Element from './elements.js'

export function displayMetrics() {
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

export function compareMetrics(allSessions, metric) {
    const thisSession = allSessions[0]
    const previousSession = allSessions[1]
    return metric === 'wpm'
        ? improvementWpm(thisSession, previousSession)
        : improvementAccuracy(thisSession, previousSession)
}

export function improvementWpm(thisSession, previousSession) {
    if (thisSession.wpm > previousSession.wpm) {
        return 'You have improved typing speed over the last session!'
    } else if (thisSession.wpm < previousSession.wpm) {
        return 'Keep practicing, you typed faster on the previous session!'
    } else {
        return 'Your typing speed is the same as in previous session!'
    }
}

export function improvementAccuracy(thisSession, previousSession) {

    if (thisSession.accuracy > previousSession.accuracy) {
        return 'You have improved your accuracy over the last session!'
    } else if (thisSession.accuracy < previousSession.accuracy) {
        return 'Keep practicing, you typed more accurate on the previous session!'
    } else {
        return 'Your accuracy is the same as in previous session!'
    }
}

export function addImprovementMessage(element, allSessions) {
    element === 'wpm'
        ? Element.wpmMessage.innerText = compareMetrics(allSessions, 'wpm')
        : Element.accuracyMessage.innerText = compareMetrics(allSessions, 'accuracy')
}