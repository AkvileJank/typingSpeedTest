import { getNewText } from './text.js'
import * as Element from './elements.js'
import { hideScreens, listenForRestart } from './userInterface.js'
import { displayMetrics } from './progress.js'
import { saveSessionData } from './storage.js'

export default class Session {

    constructor(timer, charIndex, mistakes, totalTyped, corrrectWords, incorrectChar) {
        this.timer = timer
        this.charIndex = charIndex
        this.mistakes = mistakes
        this.totalTyped = totalTyped
        this.correctWords = corrrectWords
        this.incorrectChar = incorrectChar
    }

    startSession() {
        this.timer = 60
        this.charIndex = 0
        this.mistakes = 0
        this.totalTyped = 0
        this.correctWords = 0
        this.incorrectChar = false
        getNewText(Element.textDisplayElement, Element.textInputElement)

    }

    resetText() {
        console.log('works')
        this.charIndex = 0
        this.incorrectChar = false
        getNewText()
    }

    checkCharacter(char, characters) {
        console.log(this.charIndex)
        if (characters.length === this.charIndex + 1 || this.charIndex < 0) {
            this.resetText()
        } if (char === ' ' && characters[this.charIndex].innerText === ' ') {
            if (this.incorrectChar) {
                this.incorrectChar = false
            } else {
                this.correctWords++
            }
        } if (char == null) {
            this.charIndex--
            this.totalTyped--
            if (characters[this.charIndex].classList.contains('incorrect')) {
                this.mistakes--
                this.incorrectChar = false
            }
            characters[this.charIndex].classList.remove('correct', 'incorrect')
        } else {
            if (characters[this.charIndex].innerText === char) {
                characters[this.charIndex].classList.add('correct')
            } else {
                this.incorrectChar = true
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
        return parseInt((((this.totalTyped - this.mistakes) / this.totalTyped) * 100).toFixed(0))
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