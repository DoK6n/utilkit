/* eslint-disable @typescript-eslint/no-empty-function */
import { isPromise, isFunction, isAsyncFunction, isAsync } from '../src/validation-utils'

describe('Utility function tests', () => {
  // 일반 함수 및 화살표 함수
  const regularFunction = function () {}
  const arrowFunction = () => {}

  // 비동기 함수 및 화살표 함수
  const asyncRegularFunction = async function () {}
  const asyncArrowFunction = async () => {}

  // Generator 함수
  const generatorFunction = function* () {}

  // 클래스 메서드
  class TestClass {
    regularMethod() {}
    async asyncMethod() {}
  }
  const classInstance = new TestClass()

  // isPromise 테스트
  test('isPromise should correctly identify Promises', () => {
    expect(isPromise(new Promise(() => {}))).toBeTruthy()
    expect(isPromise(regularFunction)).toBeFalsy()
  })

  // isFunction 테스트
  test('isFunction should identify all types of functions', () => {
    expect(isFunction(regularFunction)).toBeTruthy()
    expect(isFunction(arrowFunction)).toBeTruthy()
    expect(isFunction(asyncRegularFunction)).toBeTruthy()
    expect(isFunction(asyncArrowFunction)).toBeTruthy()
    expect(isFunction(generatorFunction)).toBeTruthy()
    expect(isFunction(classInstance.regularMethod)).toBeTruthy()
    expect(isFunction(classInstance.asyncMethod)).toBeTruthy()
    expect(isFunction({})).toBeFalsy()
  })

  // isAsyncFunction 테스트
  test('isAsyncFunction should only identify async functions', () => {
    expect(isAsyncFunction(asyncRegularFunction)).toBeTruthy()
    expect(isAsyncFunction(asyncArrowFunction)).toBeTruthy()
    expect(isAsyncFunction(classInstance.asyncMethod)).toBeTruthy()
    expect(isAsyncFunction(regularFunction)).toBeFalsy()
    expect(isAsyncFunction(arrowFunction)).toBeFalsy()
    expect(isAsyncFunction(generatorFunction)).toBeFalsy()
  })

  // isAsync 테스트
  test('isAsync should identify Promises and async functions', () => {
    expect(isAsync(new Promise(() => {}))).toBeTruthy()
    expect(isAsync(asyncRegularFunction)).toBeTruthy()
    expect(isAsync(asyncArrowFunction)).toBeTruthy()
    expect(isAsync(classInstance.asyncMethod)).toBeTruthy()
    expect(isAsync(regularFunction)).toBeFalsy()
    expect(isAsync(arrowFunction)).toBeFalsy()
    expect(isAsync(generatorFunction)).toBeFalsy()
  })
})
