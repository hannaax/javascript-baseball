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
        console.log(userInput)
      }
    )
  }

  readUserInput(computerNumbers) {
    MissionUtils.Console.readLine(INPUT_MESSAGE, (userInput) => {
      this.userInput = userInput
      let strike = this.countStrikeNumbers(computerNumbers, userInput)
      let ball = this.countBallNumbers(computerNumbers, userInput)
      console.log(strike, ball)

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

  countStrikeNumbers(computerNumbers, userInput) {
    const count = computerNumbers.filter(
      (number, index) => number == userInput[index]
    ).length
    console.log(computerNumbers, userInput)
    return count
  }

  countBallNumbers(computerNumbers, userInput) {
    const count = computerNumbers.filter(
      (number, index) =>
        userInput.includes(number) && number != userInput[index]
    ).length
    console.log(computerNumbers, userInput)
    return count
  }

  generateRandomNumbers() {
    while (this.computerNumbers.length < 3) {
      const randomNumber = MissionUtils.Random.pickNumberInRange(1, 9)
      if (!this.computerNumbers.includes(randomNumber)) {
        this.computerNumbers.push(randomNumber)
      }
    }
    console.log(this.computerNumbers)
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
