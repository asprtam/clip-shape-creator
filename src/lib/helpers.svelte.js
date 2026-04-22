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
    }
}
export default helpers;