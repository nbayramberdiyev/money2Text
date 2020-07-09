'use strict'

/**
 * Çeşitli formatlardaki ondalık sayıyı float tipine çevirir.
 *
 * @param {string|number} number
 * @param {string} separator
 * @returns {number}
 */
export function convertToFloatBasedOnSeparator(number, separator) {
    if (separator === '.') {
        return Math.abs(Math.round(number.toString().replace(/,/g, '') * 1e2) / 1e2)
    }
    return Math.abs(Math.round(number.toString().replace(/\./g, '').replace(',', '.') * 1e2) / 1e2)
}

/**
 * Ondalık sayıyın tam sayı kısmını döndürür.
 *
 * @param {number} number
 * @returns {number}
 */
export function getWholeNumberPart(number) {
    return Math.floor(Math.abs(number)) || 0
}

/**
 * Sayının (varsa) ondalık kısmını 2 basamaklı sayı halinde döndürür.
 *
 * @param {number} number
 * @returns {number}
 */
export function getDecimalPart(number) {
    const parts = (number - Math.floor(number)).toFixed(2).split('.')
    return parseInt(parts[1]) || 0
}

/**
 * Ondalık sayının tam sayı kısmı ile ondalık kısmını parçalayıp obje halinde döndürür.
 *
 * @param {number} number
 * @returns {Object}
 */
export function extractNumberParts(number) {
    return {
        wholeNumberPart: getWholeNumberPart(number),
        decimalPart: getDecimalPart(number),
    }
}

/**
 * Yazının iki tarafındaki boşluları kaldırır ve içindeki çoklu boşlukları da tek boşluğa çevirir.
 *
 * @param {string} str
 * @returns {string}
 */
export function trimWhitespaces(str) {
    return str.replace(/\s+/g, ' ').trim()
}
