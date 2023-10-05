const App = require("../App.js")
const MissionUtils = require("@woowacourse/mission-utils")

describe("컴퓨터 숫자와 사용자 숫자 비교 결과", () => {
  let app
  beforeEach(() => {
    app = new App()
  })

  const getLogSpy = () => {
    const logSpy = jest.spyOn(MissionUtils.Console, "print")
    logSpy.mockClear()
    return logSpy
  }

  test("스트라이크 개수가 맞는지 검사", () => {
    app.computerNumber = [1, 2, 3]
    const user = ["123", "124", "145", "456"]
    const strike = [3, 2, 1, 0]

    strike.forEach((strike, index) => {
      app.userInput = user[index]
      expect(app.countStrikeNumbers(app.computerNumber, user[index])).toBe(
        strike
      )
    })
  })

  test("볼 개수가 맞는지 검사", () => {
    app.computerNumber = [1, 2, 3]
    const user = ["312", "321", "134", "145"]
    const ball = [3, 2, 1, 0]

    ball.forEach((ball, index) => {
      app.userInput = user[index]
      expect(app.countBallNumbers(app.computerNumber, user[index])).toBe(ball)
    })
  })
})
