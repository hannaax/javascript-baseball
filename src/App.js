const MissionUtils = require("@woowacourse/mission-utils")

const GAME_START_MESSAGE = "숫자 야구 게임을 시작합니다."
const INPUT_MESSAGE = "숫자를 입력해주세요 : "

class App {
  constructor() {
    this.userInput = ""
    this.computerNumbers = []
  }

  printGameStartMessage() {
    MissionUtils.Console.print(GAME_START_MESSAGE)
  }

  askRestartGame() {
    MissionUtils.Console.readLine(
      "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.",
      (userInput) => {
        userInput = Number(userInput)
        if (userInput === 1) {
          let computerNumbers = this.generateRandomNumbers()
          this.readUserInput(computerNumbers)
        } else if (userInput === 2) {
          MissionUtils.Console.close()
        } else {
          throw "잘못된 값을 입력하였습니다."
        }
      }
    )
  }

  readUserInput(computerNumbers) {
    MissionUtils.Console.readLine(INPUT_MESSAGE, (userInput) => {
      this.userInput = userInput
      let strike = this.countStrikeNumbers(computerNumbers, userInput)
      let ball = this.countBallNumbers(computerNumbers, userInput)

      if (!this.isCorrectUserInput(userInput)) {
        throw "잘못된 값을 입력하였습니다."
      }

      if (strike === 0 && ball === 0) {
        MissionUtils.Console.print("낫싱")
        this.readUserInput(computerNumbers)
      }

      if (strike !== 3) {
        let message = ""
        message += ball ? `${ball}볼 ` : ""
        message += strike ? `${strike}스트라이크` : ""
        MissionUtils.Console.print(message)
        this.readUserInput(computerNumbers)
      }

      if (strike === 3) {
        MissionUtils.Console.print(
          `3스트라이크\n3개의 숫자를 모두 맞히셨습니다! 게임 종료`
        )
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
