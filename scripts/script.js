import { textInputElement } from './elements.js'
import Session from './session.js'
import { startTimer, escKeyPress, enterKeyPress } from './userInterface.js'

const session = new Session()
session.startSession()
enableEvents()

// made into a function with an idea to prevent from calling if error with page contents occurs
function enableEvents() {
    textInputElement.addEventListener('input', session.initTyping)
    textInputElement.addEventListener('input', () => startTimer(session), { once: true })
    textInputElement.addEventListener('keydown', event => escKeyPress(event, session))
    textInputElement.addEventListener('keydown', event => enterKeyPress(event))
}