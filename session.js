import { getNewText } from './text.js'
import * as Element from './elements.js'

export class Session {

    constructor(timer, charIndex, mistakes, totalTyped, corrrectWords, incorrectChar) {
        this.timer = timer
        this.charIndex = charIndex
        this.mistakes = mistakes
        this.totalTyped = totalTyped
        this.correctWords = corrrectWords
        this.incorrectChar = incorrectChar
    }

    restartSession() {
        this.timer = 6
        this.charIndex = 0
        this.mistakes = 0
        this.totalTyped = 0
        this.correctWords = 0
        this.incorrectChar = false
        getNewText(Element.textDisplayElement, Element.textInputElement)
    }

    checkCharacter(char, characters) {

        console.log('works')

        if (char === ' ' && characters[this.charIndex].innerText === ' ') {
            if (this.incorrectChar) {
                this.incorrectChar = false
            } else {
                this.correctWords++
            }
        }
        if (char == null) {
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

    tester() {
        console.log('works')
    }

    initTyping() {
        this.tester()
        const characters = Element.textDisplayElement.querySelectorAll('span')
        const typedChar = Element.textInputElement.value.split('')[this.charIndex]
        this.checkCharacter(typedChar, characters)
        characters.forEach(span => span.classList.remove('current'))
        if (this.charIndex < characters.length) {
            characters[this.charIndex].classList.add('current')
        }
    }
}