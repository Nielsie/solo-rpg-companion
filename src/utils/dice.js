/**
 * inclusive of min
 * exclusive of max
 */
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const roll = Math.floor(Math.random() * (max - min)) + min;
    return roll;
};

const rollScoreCheck = (score) => {
    const roll = DICE.d100();
    const result = roll <= score;
    console.log(`${result ? 'SUCCESS' : 'FAILURE'}: rolled ${roll} against ${score}`);
    return result;
};

const doAmountTimes = (func, amount) => {
    let result = 0;
    for (let i = 0; i < amount; i++) {
        result += func();
    }
    return result;
};

export const DICE = {
    random: (min, max) => getRandomInt(min, max),
    d3: (amount = 1) => doAmountTimes(() => getRandomInt(1,4), amount),
    d4: (amount = 1) => doAmountTimes(() => getRandomInt(1,5), amount),
    d6: (amount = 1) => doAmountTimes(() => getRandomInt(1,7), amount),
    d8: (amount = 1) => doAmountTimes(() => getRandomInt(1,9), amount),
    d10: (amount = 1) => doAmountTimes(() => getRandomInt(1,11), amount),
    d12: (amount = 1) => doAmountTimes(() => getRandomInt(1,13), amount),
    d20: (amount = 1) => doAmountTimes(() => getRandomInt(1,21), amount),
    d100: (amount = 1) => doAmountTimes(() => getRandomInt(1,101), amount),
    rollScoreCheck,
};
