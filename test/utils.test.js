import { convertToFloatBasedOnSeparator, getWholeNumberPart, getDecimalPart, trimWhitespaces } from '../src/utils'

describe('Çeşitli formatlardaki ondalık sayıyı float tipine çevirir.', () => {
    test.each([
        ['123', ',', 123],
        ['0,99', ',', 0.99],
        ['123,45', ',', 123.45],
        ['1.234,56', ',', 1234.56],
        ['123', '.', 123],
        ['0.99', '.', 0.99],
        ['123.45', '.', 123.45],
        ['1,234.56', '.', 1234.56],
    ])('convertToFloatBasedOnSeparator("%s", "%s")', (number, separator, expected) => {
        expect(convertToFloatBasedOnSeparator(number, separator)).toBe(expected)
    })
})

describe('Ondalık sayıyın tam sayı kısmını döndürür.', () => {
    test.each([
        [123.0, 123],
        [0.99, 0],
        [123.45, 123],
        [1234.56, 1234],
    ])('getWholeNumberPart("%f")', (number, expected) => {
        expect(getWholeNumberPart(number)).toBe(expected)
    })
})

describe('Sayının (varsa) ondalık kısmını 2 basamaklı sayı halinde döndürür.', () => {
    test.each([
        [123, 0],
        [0.99, 99],
        [123.45, 45],
        [1234.56, 56],
    ])('getDecimalPart("%f")', (number, expected) => {
        expect(getDecimalPart(number)).toBe(expected)
    })
})

describe('Yazının iki tarafındaki boşluları kaldırır ve içindeki çoklu boşlukları da tek boşluğa çevirir.', () => {
    test.each([
        ['   Soldan boşluğu kaldır.', 'Soldan boşluğu kaldır.'],
        ['Sağdan boşluğu kaldır.   ', 'Sağdan boşluğu kaldır.'],
        ['Ortadan   boşluğu   kaldır.', 'Ortadan boşluğu kaldır.'],
        ['   Tüm   boşlukları   kaldır.   ', 'Tüm boşlukları kaldır.'],
    ])('trimWhitespaces("%s")', (str, expected) => {
        expect(trimWhitespaces(str)).toBe(expected)
    })
})
