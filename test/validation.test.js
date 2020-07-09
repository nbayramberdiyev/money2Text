import { isValidSeparator, isValidFormattedNumber, isValidUnformattedNumber } from '../src/validation'

describe('Separator değerinin geçerli olup olmadığını kontrol eder.', () => {
    test.each([
        [',', true],
        ['.', true],
        ['', false],
        ['_', false],
    ])('isValidSeparator("%s")', (separator, expected) => {
        expect(isValidSeparator(separator)).toBe(expected)
    })
})

describe('Formatlanmış bir ondalık sayının geçerli olup olmadığını kontrol eder.', () => {
    test.each([
        ['1.234', ',', '.', true],
        ['1.234,', ',', '.', false],
        ['1.234,00', ',', '.', true],
        ['1.234,567', ',', '.', true],
        ['1,234,567', ',', '.', false],
        ['1,234.56', ',', '.', false],
        ['1.234', '.', ',', true],
        ['1,234.', '.', ',', false],
        ['1,234.00', '.', ',', true],
        ['1,234.567', '.', ',', true],
        ['1.234.567', '.', ',', false],
        ['1.234,56', '.', ',', false],
    ])('isValidFormattedNumber("%s", "%s", "%s")', (number, separator, formatter, expected) => {
        expect(isValidFormattedNumber(number, separator, formatter)).toBe(expected)
    })
})

describe('Formatlanmamış bir ondalık sayının geçerli olup olmadığını kontrol eder.', () => {
    test.each([
        ['1234', ',', true],
        ['1234,', ',', false],
        ['1234,00', ',', true],
        ['1234,567', ',', true],
        ['1,234,567', ',', false],
        ['1234.56', ',', false],
        ['1234', '.', true],
        ['1234.', '.', false],
        ['1234.00', '.', true],
        ['1234.567', '.', true],
        ['1.234.567', '.', false],
        ['1234,56', '.', false],
    ])('isValidUnformattedNumber("%s", "%s")', (number, separator, expected) => {
        expect(isValidUnformattedNumber(number, separator)).toBe(expected)
    })
})
