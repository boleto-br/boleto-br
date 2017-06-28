exports.moduleElevenBaseNine = num => {
  const sum = num
  .split('')
  .reverse()
  .reduce((previous,current,index) => previous + (parseInt(current) * (index + 2)),0)

  const digit = 11 - (sum % 11)

  if(digit < 2 || digit > 9) {
    return 1
  } else {
    return digit
  }
}
