import * as Element from "./elements.js"
import Session from "./session.js"
import { startTimer, escKeyPress, enterKeyPress } from "./userInterface.js"

let timer, charIndex, mistakes, totalTyped, correctWords, incorrectChar
const session = new Session(timer, charIndex, mistakes, totalTyped, correctWords, incorrectChar)
session.startSession()

Element.textInputElement.addEventListener('input', session.initTyping)
Element.textInputElement.addEventListener('input', () => startTimer(session), { once: true })
Element.textInputElement.addEventListener('keydown', event => escKeyPress(event, session))
Element.textInputElement.addEventListener('keydown', event => enterKeyPress(event))