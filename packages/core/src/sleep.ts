/**
 * A function that halts execution for a specified amount of time.
 *
 * @param {number} sec - The time in seconds to pause execution.
 *
 * ---
 *
 * 지정된 시간 동안 실행을 중지시키는 함수입니다.
 *
 * @param {number} sec - 실행을 일시 중단할 초단위 시간.
 */
export const sleep = (sec: number) => new Promise((resolve) => setTimeout(resolve, sec * 1000))
