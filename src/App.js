const MissionUtils = require("@woowacourse/mission-utils")

const GAME_START_MESSAGE = "숫자 야구 게임을 시작합니다."
const INPUT_MESSAGE = "숫자를 입력해주세요 : "

class App {
  constructor() {
    this.userInput = ""
    this.computerNumber = []
  }

  printGameStartMessage() {
    MissionUtils.Console.print(GAME_START_MESSAGE)
  }

  readUserInput() {
    MissionUtils.Console.readLine(INPUT_MESSAGE, (userInput) => {
      this.userInput = userInput
      this.readUserInput()
    })
  }

  generateRandomNumber() {
    while (this.computerNumber.length < 3) {
      const randomNumber = MissionUtils.Random.pickNumberInRange(1, 9)
      if (!this.computerNumber.includes(randomNumber)) {
        this.computerNumber.push(randomNumber)
      }
    }
    return computerNumber
  }

  play() {
    this.printGameStartMessage()
    this.generateRandomNumber()
    this.readUserInput()
  }
}

const app = new App()
app.play()

module.exports = App
