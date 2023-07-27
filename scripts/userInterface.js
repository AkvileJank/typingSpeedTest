import * as Element from "./elements.js"

export function startTimer(session) {
    Element.timerElement.innerText = session.timer
    const interval = setInterval(() => {
        if (session.timer < 1) {
            clearInterval(interval)
            session.endOfSession()
            return
        }
        session.timer--
        Element.timerElement.innerText = session.timer
    }, 1000)
}

export function hideScreens() {
    Element.containerElement.classList.add('invisible')
    Element.timerElement.classList.add('invisible')
    Element.gameName.classList.add('invisible')
    Element.resetInstruction.classList.add('invisible')
}

export function escKeyPress(e, session) {
    if (e.key === 'Escape') {
        session.resetText()
    }
}

export function enterKeyPress(e) {
    if (e.key === 'Enter') {
        e.preventDefault()
        window.location.reload()
    }
}

export function listenForRestart() {
    document.addEventListener('keydown', event =>
        enterKeyPress(event))
}

export function createCells(result, row) {
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

export function createTable(allSessions) {
    Element.resulsTableBody.innerText = ''
    allSessions.forEach(result => {
        const row = document.createElement('tr')
        createCells(result, row)
        Element.resulsTableBody.appendChild(row)
    })
}
