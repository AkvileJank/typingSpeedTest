import { setNewText } from './text.js'
import * as Element from './elements.js'
import { hideScreens, listenForRestart } from './userInterface.js'
import { displayMetrics } from './progress.js'
import { saveSessionData } from './storage.js'

export default class Session {


    // Decided to not have both constructor and startSession method as values for attributes are set in this method
    async startSession() {
        if (!setNewText) {
            return
        }
        this.timer = 60
        this.charIndex = 0
        this.mistakes = 0
        this.totalTyped = 0
        this.correctWords = 0
        this.isIncorrectChar = false
        await setNewText(Element.textDisplayElement, Element.textInputElement) // await is used to indicate that get new Text is also async function - recommended by STL
    }

    async resetText() {
        this.charIndex = 0
        this.IsIncorrectChar = false
        await setNewText()
    }


    checkCharacter(char, characters) {
        // check if user typed the same amount of characters as are in displayed text, if yes, give new text
        if (characters.length === this.charIndex + 1) { // something's not right here
            this.resetText()
        }
        if (char === ' ' && characters[this.charIndex].innerText === ' ') {
            if (this.IsIncorrectChar) {
                this.IsIncorrectChar = false
            } else {
                this.correctWords++
            }
        }
        if (char == null) { // null type here is to check if user pressed backspace (deleted a character)
            if (this.charIndex > 0) {
                this.charIndex--
                this.totalTyped--
            } // check if deleted character was typed incorrect previously
            if (characters[this.charIndex].classList.contains('incorrect')) {
                this.mistakes--
                this.IsIncorrectChar = false
            }
            characters[this.charIndex].classList.remove('correct', 'incorrect')
        } else { // determine if typed character was correct or not
            if (characters[this.charIndex].innerText === char) {
                characters[this.charIndex].classList.add('correct')
            } else {
                this.IsIncorrectChar = true
                this.mistakes++
                characters[this.charIndex].classList.add('incorrect')
            }
            this.charIndex++
            this.totalTyped++
        }
    }


    initTyping = () => {
        const characters = Element.textDisplayElement.querySelectorAll('span')
        const typedChar = Element.textInputElement.value.split('')[this.charIndex]
        this.checkCharacter(typedChar, characters)
        characters.forEach(span => span.classList.remove('current'))
        if (this.charIndex < characters.length) {
            characters[this.charIndex].classList.add('current')
        }
    }

    calculateAccuracy() {
        if (this.totalTyped === 0) {
            return 0
        }
        return parseInt((((this.totalTyped - this.mistakes) / this.totalTyped) * 100).toFixed(0)) // used parseInt as toFixed returns a string
    }

    createSessionData() {
        const today = new Date().toISOString().slice(0, 10)
        const accuracy = this.calculateAccuracy()
        return {
            date: today,
            wpm: this.correctWords,
            accuracy: accuracy
        }
    }

    endOfSession() {
        hideScreens()
        const sessionData = this.createSessionData()
        saveSessionData(sessionData)
        Element.wpmElement.innerText = `Your WPM: ${sessionData.wpm}`
        Element.accuracyElement.innerText = `Your accuracy: ${sessionData.accuracy}%`
        displayMetrics()
        listenForRestart()
    }
}