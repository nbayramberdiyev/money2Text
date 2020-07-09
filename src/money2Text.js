'use strict'

import { isValidSeparator, isValidFormattedNumber, isValidUnformattedNumber } from './validation'
import { convertToFloatBasedOnSeparator, extractNumberParts, trimWhitespaces } from './utils'

/**
 * Sayıyı parasal yazı formatına çevirir.
 *
 * @param {string|number} money
 * @param {Object|null} options
 * @returns {string}
 * @throws {Error|RangeError}
 */
export default function money2Text(money, options = null) {
    const defaults = {
        separator: ',',
        lira: 'Türk Lirası',
        kurus: 'Kuruş',
    }
    const opts = { ...defaults, ...options }

    const birlikler = ['', 'Bir', 'İki', 'Üç', 'Dört', 'Beş', 'Altı', 'Yedi', 'Sekiz', 'Dokuz']
    const onluklar = ['', 'On', 'Yirmi', 'Otuz', 'Kırk', 'Elli', 'Altmış', 'Yetmiş', 'Seksen', 'Doksan']

    const billions = (num) => {
        if (num < 1e9) {
            return millions(num)
        }
        return `${billions(Math.floor(num / 1e9))} Milyar ${millions(num % 1e9)}`
    }

    const millions = (num) => {
        if (num < 1e6) {
            return thousands(num)
        }
        return `${millions(Math.floor(num / 1e6))} Milyon ${thousands(num % 1e6)}`
    }

    const thousands = (num) => {
        if (num < 1e3) {
            return hundreds(num)
        }

        if (Math.floor(num / 1e3) === 1) {
            return `Bin ${hundreds(num % 1e3)}`
        }

        return `${hundreds(Math.floor(num / 1e3))} Bin ${hundreds(num % 1e3)}`
    }

    const hundreds = (num) => {
        if (num < 100) {
            return tens(num)
        }

        if (Math.floor(num / 100) === 1) {
            return `Yüz ${tens(num % 100)}`
        }

        return `${birlikler[Math.floor(num / 100)]} Yüz ${tens(num % 100)}`
    }

    const tens = (num) => {
        if (num < 10) {
            return birlikler[num]
        }

        if (num % 10 === 0) {
            return onluklar[Math.floor(num / 10)]
        }

        return `${onluklar[Math.floor(num / 10)]} ${birlikler[num % 10]} `
    }

    if (!isValidSeparator(opts.separator)) {
        throw new Error('Ayraç, virgül (,) veya nokta (.) olmalıdır.')
    }

    const formatter = opts.separator === '.' ? ',' : '.'

    if (!isValidFormattedNumber(money, opts.separator, formatter) && !isValidUnformattedNumber(money, opts.separator)) {
        throw new Error('Sayı veya formatı geçerli değil.')
    }

    const number = convertToFloatBasedOnSeparator(money, opts.separator)

    if (isNaN(number)) {
        return ''
    }

    if (number >= 1e12) {
        throw new RangeError('Bir trilyon ve üstü sayılar (şimdilik) desteklenmemektedir.')
    }

    if (number === 0) {
        return `Sıfır ${opts.lira}`
    }

    const { wholeNumberPart, decimalPart } = extractNumberParts(number)

    let text = ''

    if (wholeNumberPart > 0) {
        text += `${billions(wholeNumberPart)} ${opts.lira}`
    }

    if (decimalPart > 0) {
        text += ` ${tens(decimalPart)} ${opts.kurus}`
    }

    return trimWhitespaces(text)
}
