import { textDisplayElement, textInputElement } from "./elements.js"


const WORDS_API = 'https://api.quotable.io/random'

export function getText() {
    return fetch(WORDS_API)
        .then(response => response.json())
        .then(data => data.content)
        .then(words => words.toLowerCase().replace(/[;.!?:,...-]/g, ''))
        .catch(error => console.log(`Error: ${error}`))
}

export async function getNewText() {
    textDisplayElement.innerText = ''
    textInputElement.value = ''
    const lines = await getText()
    lines.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        textDisplayElement.appendChild(charSpan)
    })
}