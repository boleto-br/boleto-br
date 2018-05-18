import parseDate from '../utils/parse-date'

export default function (file: string): Object {
  const digits = /^[\d]+$/

  const parsed = file.split('\n').reduce((previous, current) => {
    const register = current.substring(0, 1)

    if (register === '0') {
      previous.company = current.substring(46, 76).trim()
      previous.date = parseDate(current.substring(94, 100))
    } else if (register === '1') {
      previous.registerCode = current.substring(3, 17)
      previous.card = current.substring(22, 24)
      previous.agency = current.substring(24, 29)
      previous.account = current.substring(29, 37)

      previous.bills = previous.bills.concat({
        occurency: current.substring(108, 110),
        occurencyReasons: current.substring(318, 328).match(/.{2}/g),
        occurencyDate: parseDate(current.substring(110, 116)),
        creditDate: digits.test(current.substring(295, 301)) ?
          parseDate(current.substring(295, 301)) :
          null,
        maturity: parseDate(current.substring(110, 116)),
        paidValue: parseInt(current.substring(253, 266), 10),
        value: parseInt(current.substring(152, 165), 10),
        bank: current.substring(165, 168),
        agency: current.substring(168, 173),
        ourNumber: current.substring(70, 81)
      })
    }
    return previous
  }, {bills: []})

  return parsed
}
