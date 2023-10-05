const MissionUtils = require("@woowacourse/mission-utils")

const { RESULT, GAME_MESSAGE, GAME_ERROR_MESSAGE } = require("./constants.js")

class App {
  constructor() {
    this.userInput = ""
    this.computerNumbers = []
  }

  printGameStartMessage() {
    MissionUtils.Console.print(GAME_MESSAGE.START)
  }

  askRestartGame() {
    MissionUtils.Console.readLine(GAME_MESSAGE.RESTART, (userInput) => {
      userInput = Number(userInput)
      if (userInput === 1) {
        let computerNumbers = this.generateRandomNumbers()
        this.readUserInput(computerNumbers)
      } else if (userInput === 2) {
        MissionUtils.Console.close()
      } else {
        throw GAME_ERROR_MESSAGE.WRONG_INPUT
      }
    })
  }

  readUserInput(computerNumbers) {
    MissionUtils.Console.readLine(GAME_MESSAGE.INPUT, (userInput) => {
      this.userInput = userInput
      let strike = this.countStrikeNumbers(computerNumbers, userInput)
      let ball = this.countBallNumbers(computerNumbers, userInput)

      if (!this.isCorrectUserInput(userInput)) {
        throw GAME_ERROR_MESSAGE.WRONG_INPUT
      }

      if (strike === 0 && ball === 0) {
        MissionUtils.Console.print(RESULT.NOTHING)
        this.readUserInput(computerNumbers)
      }

      if (strike !== 3) {
        let message = ""
        message += ball ? `${ball}${RESULT.BALL} ` : RESULT.BLANK
        message += strike ? `${strike}${RESULT.STRIKE}` : RESULT.BLANK
        MissionUtils.Console.print(message)
        this.readUserInput(computerNumbers)
      }

      if (strike === 3) {
        MissionUtils.Console.print(GAME_MESSAGE.ANSWER)
        this.askRestartGame()
      }
    })
  }

  isCorrectUserInput(userInput) {
    if (userInput === "") return false
    if (/[^1-9]/g.test(userInput)) return false
    if (userInput.length !== 3) return false
    if (new Set(userInput.split("")).size !== 3) return false
    return true
  }

  countStrikeNumbers(computerNumbers, userInput) {
    const count = computerNumbers.filter(
      (number, index) => number == userInput[index]
    ).length
    return count
  }

  countBallNumbers(computerNumbers, userInput) {
    const count = computerNumbers.filter(
      (number, index) =>
        userInput.includes(number) && number != userInput[index]
    ).length
    return count
  }

  generateRandomNumbers() {
    while (this.computerNumbers.length < 3) {
      const randomNumber = MissionUtils.Random.pickNumberInRange(1, 9)
      if (!this.computerNumbers.includes(randomNumber)) {
        this.computerNumbers.push(randomNumber)
      }
    }
    return this.computerNumbers
  }

  play() {
    let computerNumbers = this.generateRandomNumbers()
    this.printGameStartMessage()
    this.readUserInput(computerNumbers)
  }
}

const app = new App()
app.play()

module.exports = App
