# money2Text

money2Text (tam veya ondalık) sayıyı parasal yazı formatına çeviren ufak bir JavaScript kütüphanesidir.

## Kurulum

### CDN

```html
<script src="https://unpkg.com/money2text"></script>
```

### NPM

```sh
npm i money2text
```

## Kullanım

### Tarayıcıda

Yukarıda belirtildiği gibi kütüphaneyi CDN üzerinden veya alternatif olarak `money2Text.min.js` dosyasını projenize dahil etmeniz yeterli olacaktır. Başka herhangi bir dosya veya kütüphaneye bağımlılığı yoktur.

### Modül Olarak

```javascript
const money2Text = require('money2text')
// veya
import money2Text from 'money2text'
```

## API

```javascript
money2Text(sayı [, seçenekler])
```

### sayı:

Tipi: `number|string`

Belirtmek zorunlu olup integer, float, string tipinde olabilir. Geçerli sayı aralığı ise 0-999999999999.99'dur. Yani bir trilyondan küçük sayılar desteklenmektedir. İsteğe bağlı olarak formatlanmış veya formatlanmamış olabilir ancak sayı formatlanmış ise geçerli format olmak zorundadır.

### seçenekler:

Tipi: `Object`

Belirtmek zorunlu olmayıp, girdiyi ve çıktıyı özelleştirmemizi sağlar. Eğer belirtilecekse key/value şeklinde obje olarak belirtilmelidir. Aşağıda detaylı olarak açıklanmıştır.

## Seçenekler

|   Seçenek   |                                              Açıklama                                               | Varsayılan Değer |
| :---------: | :-------------------------------------------------------------------------------------------------: | :--------------: |
| `separator` | Sayıdaki ondalık kısmı hangi karakter ile ayırmak istediğinizi belirtir. Geçerli değerler: `,`, `.` |       `,`        |
| `currency`  |                            Sayının tam kısmının para birimini belirtir.                             |  `Türk Lirası`   |
|   `penny`   |                          Sayının ondalık kısmının para birimini belirtir.                           |     `Kuruş`      |

## Örnekler

```javascript
money2Text('12,34') // On İki Türk Lirası Otuz Dört Kuruş

money2Text('12.34', { separator: '.' }) // On İki Türk Lirası Otuz Dört Kuruş

money2Text('12,34', { currency: 'TL' }) // On İki TL Otuz Dört Kuruş

money2Text('12.34', { separator: '.', currency: 'TL', penny: 'Krş.' }) // On İki TL Otuz Dört Krş.

money2Text('12,34', { separator: '_' }) // Error: Ayraç, virgül (,) veya nokta (.) olmalıdır.

money2Text('12,34', { separator: '.' }) // Error: Sayı veya formatı geçerli değil.

money2Text('1,23,45') // Error: Sayı veya formatı geçerli değil.

money2Text(1000000000000) // RangeError: Bir trilyon ve üstü sayılar (şimdilik) desteklenmemektedir.
```

## To Do
- [ ] İngilizce döküman eklenecek.
- [ ] Verilen hatalara İngilizce dil desteği eklenecek.

## License

MIT
