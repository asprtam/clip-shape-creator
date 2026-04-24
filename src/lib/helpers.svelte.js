const helpers = {
    /**
     * @param {HTMLInputElement} input
     * @param {(val: Number) => void} onChange
     * @param {Number} [defaultValue]
     * @param {Boolean} [float]
     * @param {Number} [min]
     * @param {Number} [max]
     * @param {Number} [jump]
     * @returns {{onChange: (val: Number) => void, min: Number, max: Number, jump: Number, float: Boolean}}
     */
    createNumericInput: (input, onChange, defaultValue = 10, float = false, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, jump = 1) => {
        let returnElement = {
            onChange: onChange,
            min: min,
            max: max,
            jump: jump,
            float: float
        }
        let currentNum = defaultValue + 0;
        input.value = `${defaultValue}`;
        /** @param {KeyboardEvent} e */
        const handleKeydown = (e) => {
            if(e.key == 'ArrowUp' || e.keyCode == 38 || e.which == 38 || e.code == 'ArrowUp') {
                currentNum += returnElement.jump;
                if(!returnElement.float) {
                    currentNum = Math.round(currentNum);
                }
                if(currentNum < returnElement.min) {
                    currentNum = returnElement.min + 0;
                } else if(currentNum > returnElement.max) {
                    currentNum = returnElement.max + 0;
                }
                input.value = `${currentNum}`;
                returnElement.onChange(currentNum);
            } else if(e.key == 'ArrowDown' || e.keyCode == 40 || e.which == 40 || e.code == 'ArrowDown') {
                currentNum -= returnElement.jump;
                if(!returnElement.float) {
                    currentNum = Math.round(currentNum);
                }
                if(currentNum < returnElement.min) {
                    currentNum = returnElement.min + 0;
                } else if(currentNum > returnElement.max) {
                    currentNum = returnElement.max + 0;
                }
                input.value = `${currentNum}`;
                returnElement.onChange(currentNum);
            }
        };
        const handleChange = () => {
            if(!isNaN(Number(input.value))) {
                currentNum = Number(input.value);
                if(!returnElement.float) {
                    currentNum = Math.round(currentNum);
                }
                if(currentNum < returnElement.min) {
                    currentNum = returnElement.min + 0;
                    input.value = `${currentNum}`;
                } else if(currentNum > returnElement.max) {
                    currentNum = returnElement.max + 0;
                    input.value = `${currentNum}`;
                }
                returnElement.onChange(currentNum);
            } else {
                currentNum = returnElement.min + 0;
                input.value = `${currentNum}`;
                returnElement.onChange(currentNum);
            }
        };
        const handleInput = () => {
            if(`${input.value}`.match(/[^\d\,\.\-]/gm) != null) {
                input.value = input.value.replaceAll(/[^\d\,\.\-]/gm, '');
            }
        };
        input.onkeydown = handleKeydown;
        input.onchange = handleChange;
        input.oninput = handleInput;
        handleChange();
        return returnElement;
    },
    /**
     * zaokragla podana liczbe do ulamka o podanym mianowniku
     * @param {number} num - numer do zaokrąglenia
     * @param {number} [denominator=2] - mianownik ułamka
     * @returns {number}
     */
    roundToFraction: (num = 0.31221, denominator = 2) => {
        if(denominator <= 0) {
            return Math.round(num);
        }
        return (num - num % 1) + Math.round((num % 1) * denominator) / denominator;
    },
    /**
     * zaokragla w gore podana liczbe do ulamka o podanym mianowniku
     * @param {number} num - numer do zaokrąglenia
     * @param {number} [denominator=2] - mianownik ułamka
     * @returns {number}
     */
    ceilToFraction: (num = 0.31221, denominator = 2) => {
        if(denominator <= 0) {
            return Math.ceil(num);
        }
        return (num - num % 1) + Math.ceil((num % 1) * denominator) / denominator;
    },
    /**
     * zaokragla w dol podana liczbe do ulamka o podanym mianowniku
     * @param {number} num - numer do zaokrąglenia
     * @param {number} [denominator=2] - mianownik ułamka
     * @returns {number}
     */
    floorToFraction: (num = 0.31221, denominator = 2) => {
        if(denominator <= 0) {
            return Math.floor(num);
        }
        return (num - num % 1) + Math.floor((num % 1) * denominator) / denominator;
    },
    /**
     * Zaokrągla numer do wielokrotności innego numeru
     * @param {Number} num 
     * @param {Number} multiplicity 
     * @returns {Number}
     */
    roundToMultiplicity: (num, multiplicity) => {
        let multiplicityFractions = 0;
        let _multiplicity = Math.abs(multiplicity);

        while(_multiplicity % 1 != 0) {
            _multiplicity = _multiplicity * 10;
            multiplicityFractions++;
        }
        let _num = (num * Math.pow(10, multiplicityFractions));

        let rest = _num % _multiplicity;
        let count = (_num - rest) / _multiplicity;

        if(rest >= _multiplicity / 2) {
            count++;
        }

        return (count * _multiplicity) / Math.pow(10, multiplicityFractions);
    },
    /**
     * generuje unikalne id (nie powtarzane w obrebie jednej strony/zadania), id moze byc poprzedzone i zakonczone podanym ciagiem znakow
     * @param {number} [length=10] - długośc id
     * @param {string} [startWith=''] - początkowy ciąg znaków
     * @param {string} [endWith=''] - końcowy ciąg znaków
     * @param {('all'|'lowercase'|'uppercase'|'none')} [charcase='all'] - jakich znaków uzywać w tworzonym id
     * @param {Boolean} [allowNumbers=true] - czy uzywać liczb
     * @param {Array<String>} [checkArr]
     * @returns {string}
     */
    makeId: (length = 10, startWith = '', endWith = '', charcase = 'all', allowNumbers = true, checkArr = []) => {
        let make = (_length) => {
            let result = '';
            let characters = '';
            switch(charcase) {
                case "all":
                case "lowercase": {
                    characters += 'abcdefghijklmnopqrstuvwxyz';
                    if(charcase == 'lowercase') {
                        break;
                    }
                }
                case "uppercase": {
                    characters += 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
                    break;
                }
            }
            if(allowNumbers) {
                characters += '0123456789';
            }
            if(characters.length == 0) {
                characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ0123456789';
            }
            const charactersLength = characters.length;
            let counter = 0;
            while(counter < _length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        }
        let testId = `${startWith}${make(length)}${endWith}`;
        if(checkArr.includes(testId)) {
            return helpers.makeId(length, startWith, endWith);
        } else {
            return testId;
        }
    },
    /**
     * zwraca pozycje elementu w odniesieniu do wybranego elementu, korzystajac z funkcji getBoundingClientRect(), bedzie wiec brac pod uwage transform
     * @param {HTMLElement} element - element którego pozycję chcemy uzyskać
     * @param {HTMLElement} element2 - element względem którego pozycję chcemy uzyskać
     * @param {Boolean} [round=true]
     * @returns {{width: Number, height: Number, left: Number, top: Number}}
     */
    getPositionRelativeTo: (element, element2, round = true) => {
        let mainElBounds = element2.getBoundingClientRect();
        let rectBounds = element.getBoundingClientRect();
        if(round) {
            return { left: helpers.roundToFraction((rectBounds.left - mainElBounds.left)), top: helpers.roundToFraction((rectBounds.top - mainElBounds.top)), width: helpers.roundToFraction(rectBounds.width), height: helpers.roundToFraction(rectBounds.height) };
        }
        return { left: (rectBounds.left - mainElBounds.left), top: (rectBounds.top - mainElBounds.top), width: rectBounds.width, height: rectBounds.height };
    }
};

export default helpers;