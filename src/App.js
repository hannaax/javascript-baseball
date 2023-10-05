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

  readUserInput(computerNumbers) {
    MissionUtils.Console.readLine(INPUT_MESSAGE, (userInput) => {
      this.userInput = userInput
      this.readUserInput()
      let strike = this.countStrikeNumbers(computerNumbers, userInput)
      let ball = this.countBallNumbers(computerNumbers, userInput)
      console.log(strike, ball)
      if (strike === 0 && ball === 0) {
        MissionUtils.Console.print("낫싱")
      }
    })
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
