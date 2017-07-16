// @flow
import {moduleElevenBaseSeven} from '../integrity-verificator/'
import addLeadingZeros from '../utils/add-leading-zeros'

type ourNumberType = {
  card: string,
  ourNumber: string
}
export default function ({card, ourNumber}: ourNumberType) {
  const formated =
    card +
    '/' +
    addLeadingZeros(ourNumber, 11) +
    '-' +
    moduleElevenBaseSeven(card + ourNumber)
  return formated
}
