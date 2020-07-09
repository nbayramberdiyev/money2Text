import money2Text from '../src/money2Text'

describe('Sayıyı parasal yazı formatına çevirir.', () => {
    test.each([
        ['0,99', 'Doksan Dokuz Kuruş'],
        ['1', 'Bir Türk Lirası'],
        ['123,45', 'Yüz Yirmi Üç Türk Lirası Kırk Beş Kuruş'],
        ['1.234,56', 'Bin İki Yüz Otuz Dört Türk Lirası Elli Altı Kuruş'],
        ['1.234.567,89', 'Bir Milyon İki Yüz Otuz Dört Bin Beş Yüz Altmış Yedi Türk Lirası Seksen Dokuz Kuruş'],
        ['1.234.567.890', 'Bir Milyar İki Yüz Otuz Dört Milyon Beş Yüz Altmış Yedi Bin Sekiz Yüz Doksan Türk Lirası'],
        [
            '1.234.567.890,12',
            'Bir Milyar İki Yüz Otuz Dört Milyon Beş Yüz Altmış Yedi Bin Sekiz Yüz Doksan Türk Lirası On İki Kuruş',
        ],
        [
            '999.999.999.999,99',
            'Dokuz Yüz Doksan Dokuz Milyar Dokuz Yüz Doksan Dokuz Milyon Dokuz Yüz Doksan Dokuz Bin Dokuz Yüz Doksan Dokuz Türk Lirası Doksan Dokuz Kuruş',
        ],
    ])('money2Text("%s", "%s")', (number, expected) => {
        expect(money2Text(number)).toBe(expected)
    })

    expect(() => {
        money2Text('123,45', { separator: '_' })
    }).toThrow(Error)

    expect(() => {
        money2Text('123,45', { separator: '.' })
    }).toThrow(Error)

    expect(() => {
        money2Text('123,45,67')
    }).toThrow(Error)

    expect(() => {
        money2Text(1e12)
    }).toThrow(RangeError)
})
