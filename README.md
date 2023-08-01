# Speed Typing Test Game

This is a speed typing test game where users can test their typing speed and accuracy. The game displays random quotes that users need to type as quickly and accurately as possible. The game measures typing speed in words per minute (WPM) and accuracy percentage. In this project HTMl, CSS and pure JavaScript are used without any external libraries.

## Getting Started

To play the speed typing test game, follow these instructions:

1. Clone the repository to your local machine.
2. Open the `index.html` file in your web browser.

## Gameplay functionalities

1. Once the game page is loaded, a random quote will be displayed on the screen.
2. The timer will begin once user starts typing the displayed quote in the provided text input area.
3. While typing, each character will be evaluated:
   - Correctly typed characters will be marked as green.
   - Incorrectly typed characters will be marked as red.
   - Mistakes will be counted to determine typing accuracy.
4. The game will end after 60 seconds and display user statistics with previous attempts, retrieved from the local storage.
5. User is presented with a message comparing this attempt's scores to the previous one.

## Acknowledgments

The game utilizes the [quotable.io](https://api.quotable.io/random) API to fetch random quotes for the typing test.
