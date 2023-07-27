import { textDisplayElement, textInputElement } from './elements.js'

const WORDS_API = 'https://api.quotable.io/random'

export async function getText() {
    try {
        const response = await fetch(WORDS_API);
        if (!response.ok) throw new Error('Error with accessing server')
        const data = await response.json();
        const words = data.content
        const processedText = words.toLowerCase().replace(/[;.!?:,...-]/g, '')
        return processedText
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export async function getNewText() {
    textDisplayElement.innerText = ''
    textInputElement.value = ''
    try {
        const lines = await getText()
        if (!lines) throw new Error('Error with receiving data')
        lines.split('').forEach(char => {
            const charSpan = document.createElement('span')
            charSpan.innerText = char
            textDisplayElement.appendChild(charSpan)
        })
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}