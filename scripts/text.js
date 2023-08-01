import { textDisplayElement, textInputElement } from './elements.js'

const WORDS_API = 'https://api.quotable.io/random'

export async function getText() {
    try {
        const response = await fetch(WORDS_API);
        const data = await response.json();
        const words = data.content
        const processedText = words.toLowerCase().replace(/[;.!?:,...-]/g, '') // remove not aplhanumerical characters except '
        return processedText
    } catch (error) {
        throw new Error(`Request failed`, { cause: error })  // error cause (chaining) example from STL, cause as key
    }
}

export async function setNewText() {
    textDisplayElement.innerText = ''
    textInputElement.value = ''
    try {
        const lines = await getText()
        lines.split('').forEach(char => {
            const charSpan = document.createElement('span')
            charSpan.innerText = char
            textDisplayElement.appendChild(charSpan)
        })} catch (error) {
            handleError(error)
            return
        }
    }

function handleError(error) {
    textDisplayElement.classList.add('error')
    textDisplayElement.innerText = error
}