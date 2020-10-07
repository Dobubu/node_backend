const average = require('../utils/for_testing').average

describe('average', () => {
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})

// npm test -- -t 'enter you want to test test describe'
// ex: npm test -- -t 'of empty array is zero'

// toBe：https://jestjs.io/docs/en/expect#tobevalue
// toEqual：https://jestjs.io/docs/en/expect#toequalvalue
// only：https://jestjs.io/docs/en/api.html#testonlyname-fn-timeout

// other test runner
// ava：https://github.com/avajs/ava
