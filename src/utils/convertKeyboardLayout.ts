export const convertFunctions = convert(
    ".exportsfunc\"#$&',/:;<>?@[]^`abdghijklmqvwyz{|}~",
    'юучзщкеыагтсЭ№;?эб.ЖжБЮ,"хъ:ёфивпршолдьймцняХ/ЪЁ'
);

function convert(keys: string, values: string): IConvertFunctions {
    const reverse = {};
    const full = {};
    let i;

    for (i = keys.length; i--; ) {
        full[keys[i].toUpperCase()] = values[i].toUpperCase();
        full[keys[i]] = values[i];
    }

    for (i in full) {
        if (full.hasOwnProperty(i)) {
            reverse[full[i]] = i;
        }
    }

    return {
        fromEn(str: string): string {
            return str.replace(/./g, (ch: string) => {
                return full[ch] || ch;
            });
        },
        toEn(str: string): string {
            return str.replace(/./g, (ch: string) => {
                return reverse[ch] || ch;
            });
        },
    };
}

interface IConvertFunctions {
    fromEn: (str: string) => string;
    toEn: (str: string) => string;
}
