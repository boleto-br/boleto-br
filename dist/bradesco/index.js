'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var vanillaCommons = require('vanilla-commons');
var padEnd = _interopDefault(require('pad-end'));
var padStart = _interopDefault(require('pad-start'));

var assertIsDateLesserThan = function (func, firstDateDescription, secondDateDescription, firstDate, secondDate) {
  if (firstDate.getTime() > secondDate.getTime()) {
    throw new TypeError(`On function \`${func}\` Date comparison generated an unexpected result:
    \nExpect: \`${firstDateDescription}\` to be lesser than \`${secondDateDescription}\`
    \nActual: \`${firstDateDescription}\` is greater than \`${secondDateDescription}\``);
  }
};

var assertIsGreaterThanZero = function (func, property, value) {
  if (value < 1) {
    throw new TypeError(`On function \`${func}\` \`${property}\` is invalid:
    \n Expect: to be gretter than zero.
    \n Actual: \`${value}\``);
  }
};

function assertMaxLength(func, prop, len, value) {
  if (value.length > len) {
    throw new TypeError(`On function \`${func}\`, property \`${prop}\` has an invalid length:
      \nExpected max length: ${len}
      \nActual length: ${value.length}`);
  }
}

function assertMinLength(func, prop, len, value) {
  if (value.length < len) {
    throw new TypeError(`On function \`${func}\`, property \`${prop}\` has an invalid length:
      \nExpected min length: ${len}
      \nActual length: ${value.length}`);
  }
}

var addLeadingZeros = (function (number, n) {
  return padStart(String(number), n, '0');
});

var sumDigits = (function (num) {
  return String(num).split('').reduce(function (previous, current) {
    return previous + parseInt(current, 10);
  }, 0);
});

function moduleElevenBaseNine(num) {
  var sum = num.split('').reverse().reduce(function (previous, current, index) {
    return previous + parseInt(current, 10) * (index % 8 + 2);
  }, 0);

  var digit = 11 - sum % 11;

  if (digit < 2 || digit > 9) {
    return 1;
  }
  return digit;
}

function moduleElevenBaseSeven(num) {
  var sum = num.split('').reverse().reduce(function (previous, current, index) {
    return previous + parseInt(current, 10) * (index % 6 + 2);
  }, 0);

  var remaind = sum % 11;
  if (remaind === 1) {
    return 'P';
  }
  if (remaind === 0) {
    return 0;
  }
  return 11 - remaind;
}

function moduleTen(num) {
  var sum = num.split('').reverse().reduce(function (previous, current, index) {
    var factor = (index + 1) % 2 === 0 ? 1 : 2;
    var num = factor * parseInt(current, 10);
    var numFinal = num < 9 ? num : sumDigits(num);

    return previous + numFinal;
  }, 0);

  var remain = sum % 10;
  return remain === 0 ? 0 : 10 - remain;
}

function generateMainHeaderLine(_ref) {
  var bankCode = _ref.bankCode,
      bank = _ref.bank,
      company = _ref.company,
      companyCode = _ref.companyCode,
      date = _ref.date,
      sequentialNumber = _ref.sequentialNumber;

  var functionName = 'generateMainHeaderLine';

  assertMaxLength(functionName, 'companyCode', 20, companyCode);
  assertMaxLength(functionName, 'company', 30, company);
  assertMaxLength(functionName, 'bank', 15, bank);

  var line = '01' + 'REMESSA' + '01' + padEnd('COBRANCA', 15, ' ') + addLeadingZeros(companyCode, 20) + padEnd(company, 30, ' ') + bankCode + padEnd(bank, 15, ' ') + date + padStart('', 8, ' ') + 'MX' + addLeadingZeros(sequentialNumber, 7) + padStart('', 277, ' ') + '000001';

  return line;
}

function generateLineRegisterTypeOne(_ref2) {
  var bankCode = _ref2.bankCode,
      card = _ref2.card,
      agencyNumber = _ref2.agencyNumber,
      accountNumber = _ref2.accountNumber,
      accountDigity = _ref2.accountDigity,
      lateFee = _ref2.lateFee,
      lateFeePercentual = _ref2.lateFeePercentual,
      ourNumber = _ref2.ourNumber,
      discountPerDay = _ref2.discountPerDay,
      occurencyCode = _ref2.occurencyCode,
      documentNumber = _ref2.documentNumber,
      expirationDay = _ref2.expirationDay,
      value = _ref2.value,
      debtType = _ref2.debtType,
      issueDay = _ref2.issueDay,
      lateFeeValuePerDay = _ref2.lateFeeValuePerDay,
      discountDayLimit = _ref2.discountDayLimit,
      discountValue = _ref2.discountValue,
      iofValue = _ref2.iofValue,
      decreaseValue = _ref2.decreaseValue,
      registerType = _ref2.registerType,
      registerNumber = _ref2.registerNumber,
      payerName = _ref2.payerName,
      payerAddress = _ref2.payerAddress,
      messageOne = _ref2.messageOne,
      payerPostalCode = _ref2.payerPostalCode,
      messageTwo = _ref2.messageTwo,
      sequentialNumber = _ref2.sequentialNumber;

  var functionName = 'generateLineRegisterTypeOne';

  assertMaxLength(functionName, 'messageOne', 12, messageOne);
  assertMaxLength(functionName, 'messageTwo', 60, messageTwo);
  assertMaxLength(functionName, 'ourNumber', 14, ourNumber);
  assertMaxLength(functionName, 'occurencyCode', 2, occurencyCode);
  assertMaxLength(functionName, 'registerType', 2, registerType);
  assertMaxLength(functionName, 'payerName', 40, payerName);
  assertMaxLength(functionName, 'payerAddress', 40, payerAddress);
  assertMaxLength(functionName, 'registerNumber', 14, registerNumber);
  assertMaxLength(functionName, 'card', 2, card);
  assertMaxLength(functionName, 'debtType', 2, debtType);

  assertMinLength(functionName, 'registerType', 2, registerType);
  assertMinLength(functionName, 'occurencyCode', 2, occurencyCode);
  assertMinLength(functionName, 'card', 2, card);
  assertMinLength(functionName, 'debtType', 2, debtType);

  var line = '1' + padStart('', 19, ' ') + '0' + addLeadingZeros(card, 3) + addLeadingZeros(agencyNumber, 5) + addLeadingZeros(accountNumber, 7) + accountDigity + padStart('', 25, ' ') + bankCode + (lateFee ? '2' : '0') + (lateFee ? addLeadingZeros(lateFeePercentual, 4) : '0000') + addLeadingZeros(ourNumber, 11) + moduleElevenBaseSeven(card + addLeadingZeros(ourNumber, 11)) + addLeadingZeros(discountPerDay, 10) + '2' + 'N' + padStart('', 14, ' ') + // Fix this to be configurable
  occurencyCode + addLeadingZeros(documentNumber, 10) + expirationDay + addLeadingZeros(value, 13) + '000' + '00000' + debtType + 'N' + issueDay + '00' + '00' + addLeadingZeros(lateFeeValuePerDay, 13) + addLeadingZeros(discountDayLimit, 6) + addLeadingZeros(discountValue, 13) + addLeadingZeros(iofValue, 13) + addLeadingZeros(decreaseValue, 13) + registerType + addLeadingZeros(registerNumber, 14) + padEnd(payerName, 40, ' ') + padEnd(payerAddress, 40, ' ') + padEnd(messageOne, 12, ' ') + payerPostalCode + padEnd(messageTwo, 60, ' ') + addLeadingZeros(sequentialNumber, 6);

  return line;
}

function generateTraillerLine(sequentialNumber) {
  return '9' + padStart('', 393, ' ') + addLeadingZeros(sequentialNumber, 6);
}

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var generateRemittanceFile = function (_ref) {
  var emitterCompanyCode = _ref.emitterCompanyCode,
      agencyNumber = _ref.agencyNumber,
      accountNumber = _ref.accountNumber,
      accountDigity = _ref.accountDigity,
      emitterCompany = _ref.emitterCompany,
      card = _ref.card,
      date = _ref.date,
      seedingSequentialNumber = _ref.seedingSequentialNumber,
      bills = _ref.bills;

  var endLine = '\n';
  var endFile = '\n';

  var headerLine = generateMainHeaderLine({
    bankCode: 237,
    bank: 'BRADESCO',
    companyCode: emitterCompanyCode,
    company: emitterCompany,
    date: vanillaCommons.formatDate('{DD}{MM}{YY}', date),
    sequentialNumber: seedingSequentialNumber
  });

  var linesBills = bills.map(function (bill, index) {
    assertIsDateLesserThan('generateRemittanceFile', 'expirationDay', 'issueDay', bill.expirationDay, bill.issueDay);

    if (bill.lateFee) {
      assertIsGreaterThanZero('generateRemittanceFile', 'lateFeeValuePerDay', bill.lateFeeValuePerDay);
      assertIsGreaterThanZero('generateRemittanceFile', 'lateFeePercentual', bill.lateFeePercentual);
    }

    return generateLineRegisterTypeOne(_extends({}, bill, {
      card,
      agencyNumber,
      accountNumber,
      accountDigity,
      bankCode: 237,
      expirationDay: vanillaCommons.formatDate('{DD}{MM}{YY}', bill.expirationDay),
      issueDay: vanillaCommons.formatDate('{DD}{MM}{YY}', bill.issueDay),
      sequentialNumber: index + 2
    }));
  });
  var traillerLine = generateTraillerLine(linesBills.length + 2);

  return headerLine + endLine + linesBills.join(endLine) + endLine + traillerLine + endFile;
};

var calculateExpirationFactor = function (expirationDate) {
  var expirationTime = expirationDate.getTime();
  var baseTime = new Date(1997, 9, 7).getTime();

  if (expirationTime <= baseTime) {
    return '0000';
  }
  var diff = Math.floor((expirationTime - baseTime) / (24 * 3600 * 1000));

  return addLeadingZeros(String(diff), 4);
};

var generateBarCode = function (_ref) {
  var expirationDay = _ref.expirationDay,
      value = _ref.value,
      agency = _ref.agency,
      card = _ref.card,
      ourNumber = _ref.ourNumber,
      account = _ref.account;

  var bankCode = '237';
  var coinCode = '9';
  var code = bankCode + coinCode + calculateExpirationFactor(expirationDay) + addLeadingZeros(value, 10) + addLeadingZeros(agency, 4) + addLeadingZeros(card, 2) + addLeadingZeros(ourNumber, 11) + addLeadingZeros(account, 7) + '0';

  return code.substring(0, 4) + String(moduleElevenBaseNine(code)) + code.substring(4, code.length);
};

var generateDigitableLine = function (barcode) {
  var firstPart = barcode.substring(0, 4) + barcode.substring(19, 20) + '.' + barcode.substring(20, 24) + String(moduleTen(barcode.substring(0, 4) + barcode.substring(19, 24)));

  var secondPart = barcode.substring(24, 29) + '.' + barcode.substring(29, 34) + String(moduleTen(barcode.substring(24, 34)));

  var thirdPart = barcode.substring(34, 39) + '.' + barcode.substring(39, 44) + String(moduleTen(barcode.substring(34, 44)));

  var fourthPart = barcode.substring(4, 5);
  var sixthPart = barcode.substring(5, 19);

  return [firstPart, secondPart, thirdPart, fourthPart, sixthPart].join(' ');
};

var formatCardOurNumber = function (_ref) {
  var card = _ref.card,
      ourNumber = _ref.ourNumber;

  var formated = card + '/' + addLeadingZeros(ourNumber, 11) + '-' + moduleElevenBaseSeven(card + ourNumber);
  return formated;
};

var index = {
  generateRemittanceFile,
  generateBarCode,
  generateDigitableLine,
  formatCardOurNumber
};

module.exports = index;
