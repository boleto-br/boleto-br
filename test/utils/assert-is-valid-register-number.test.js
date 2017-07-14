import assertIsValidRegisterNumber from '../../lib/utils/assert-is-valid-register-number'

describe('assertIsValidRegisterNumber main functionality', () => {
  it('assertIsValidRegisterNumber should throw a TypeError if CPF is invalid', () => {
    const expected = expect(() => {
      assertIsValidRegisterNumber('functionName', '01', '00000000000')
    })

    expected.toThrow(TypeError)
    expected.toThrow(/On function `functionName` registerNumber is invalid:/)
    expected.toThrow(
      /Expect: `registerType` value is `01` so `registerNumber` should be a valid CPF/m
    )
    expected.toThrow(/Actual: `registerNumber` is not a valid CPF/m)
  })

  it('assertIsValidRegisterNumber should throw a TypeError if CNPJ is invalid', () => {
    const expected = expect(() => {
      assertIsValidRegisterNumber('functionName', '02', '00000000000')
    })

    expected.toThrow(TypeError)
    expected.toThrow(/On function `functionName` registerNumber is invalid:/)
    expected.toThrow(
      /Expect: `registerType` value is `02` so `registerNumber` should be a valid CNPJ/m
    )
    expected.toThrow(/Actual: `registerNumber` is not a valid CNPJ/m)
  })

  it('assertIsValidRegisterNumber should throw nothing if registerType is Not `01` or `02`', () => {
    expect(() => {
      assertIsValidRegisterNumber('functionName', '03', '00000000000')
    }).not.toThrow(TypeError)

    expect(() => {
      assertIsValidRegisterNumber('functionName', '98', '00000000000')
    }).not.toThrow(TypeError)

    expect(() => {
      assertIsValidRegisterNumber('functionName', '99', '00000000000')
    }).not.toThrow(TypeError)
  })
})
