'use strict'

/**
 * Separator değerinin geçerli olup olmadığını kontrol eder.
 *
 * @param {string} separator
 * @returns {boolean}
 */
export function isValidSeparator(separator) {
    return separator === '.' || separator === ','
}

/**
 * Formatlanmış bir ondalık sayının geçerli olup olmadığını kontrol eder. ( ^[-+]?[0-9]{1,3}(?:(\.|,)[0-9]{3})*(?:(\.|,)[0-9]+)?$ )
 *
 * @param {string} number
 * @param {string} separator
 * @param {string} formatter
 * @returns {boolean}
 */
export function isValidFormattedNumber(number, separator, formatter) {
    return new RegExp('^[-+]?[0-9]{1,3}(?:\\' + formatter + '[0-9]{3})*(?:\\' + separator + '[0-9]+)?$', 'g').test(
        number
    )
}

/**
 * Formatlanmamış bir ondalık sayının geçerli olup olmadığını kontrol eder. ( ^[-+]?\d+((\.|,)\d+)?$ )
 *
 * @param {string|number} number
 * @param {string} separator
 * @returns {boolean}
 */
export function isValidUnformattedNumber(number, separator) {
    return new RegExp('^[-+]?\\d+(\\' + separator + '\\d+)?$', 'g').test(number)
}
