exports.maturityFactor = date => Math.floor((date.getTime() - new Date(1997, 9, 7).getTime()) / (24 * 3600 * 1000))

exports.joinStrings = (...args) => args.join('')

exports.fillLeftZeros = (number, n) => leftPad(number,n,'0')
