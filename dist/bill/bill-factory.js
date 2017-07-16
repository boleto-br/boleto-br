'use strict';

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

var billFactory = function (_ref) {
  var generateRemittanceFile = _ref.generateRemittanceFile,
      generateBarCode = _ref.generateBarCode,
      generateDigitableLine = _ref.generateDigitableLine,
      formatCardOurNumber = _ref.formatCardOurNumber;

  return {
    generateBillData(billData) {
      return new Promise(function (resolve, reject) {
        try {
          var newBillData = billData.map(function (bill) {
            var barcode = generateBarCode(bill);
            return _extends({}, bill, {
              barcodeData: barcode,
              digitableLine: generateDigitableLine(barcode),
              formatedOurNumber: formatCardOurNumber(bill)
            });
          });
          resolve(newBillData);
        } catch (err) {
          reject(err);
        }
      });
    },
    generateRemittanceFile(remittanceData) {
      return new Promise(function (resolve, reject) {
        try {
          var remittanceFile = generateRemittanceFile(remittanceData);
          resolve(remittanceFile);
        } catch (err) {
          reject(err);
        }
      });
    }
  };
};

module.exports = billFactory;
