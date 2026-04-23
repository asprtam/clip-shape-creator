//@ts-ignore
import { TG } from "../types.js";

const localisationEN = {
    hints: {
        hold: 'Hold',
        hints: 'Hints:',
        dragHint: 'while dragging to make points snap to grid.',
        extractHint: 'to extract curve control point from underneath.',
        byDefault: 'By default ',
        whenDraggingPathPoint: 'when you are dragging path point',
        notCurveControlPoint: 'not curve control point',
        andTheLineIsNotCurved: 'and the line is not curved you will also drag curve control points to keep the line straight.',
        inTechnicalTerms: 'In technical terms',
        dragAnyAdjacent: 'you will also drag any adjacent',
        adjacentExplanation: 'connecting to next or prev point',
        curveControlPointsUnderneath: 'curve control points that are directly underneath this point.',
        dragOnlyDesired: 'to drag only the desired path point and allow curving the straight line.',
        close: 'Close hints',
        show: 'Show hints',
        workInProgress: 'Work in progress',
        click: 'Press',
        point: 'point',
        points: 'points',
        points2: 'points',
        line: 'line',
        toAddPoint: 'when clicking on ${line} beetween two ${points} to add ${point} between theese two ${points2}.',
        toUndo: 'to undo.'
    },
    controls: {
        workspace: 'Workspace',
        boxSize: 'Box size',
        width: 'width',
        height: 'height',
        externalSize: 'External work area size',
        grid: 'Grid',
        gridSize: 'Grid size',
        gridVisibility: 'Grid visiblity',
        bg: 'Background',
        points: 'Points',
        value: 'Value',
        inPercents: 'in %',
        inPx: 'in px\'s',
        calcType: 'Calculation type',
        remove: 'remove',
        scale: 'Scale',
        position: 'Position',
        point: 'Point',
        curve: 'Curve',
        bgSettings: 'Background settings',
        bgShowUnclipped: 'Show unclipped background',
        bgOpacity: 'Background opacity',
        bgUnclippedOpacity: 'Unclipped background opacity'
    },
    calcTypes: {
        'percent': 'percents (relative)',
        'middle': 'from middle (calc(50% + N px)) (absolute)',
        'start': 'from start (N px) (absolute)',
        'end': 'from end (calc(100% + N px)) (absolute)'
    },
    footer: {
        checkTheRepo: 'Check the repo',
        inspiredBy: 'Inspired by',
        fontTakenFrom: '${name} font taken from',
        isLicensed: 'is licensed by CC BY 4.0'
    },
    cookieBanner: {
        weUse: 'We use cookies to save your editor settings',
        misc: 'e.g., background, grid, size',
        noTrack: 'We do not collect any tracking or personally identifiable information.',
        accept: 'Accept',
        decline: 'Decline'
    }
};

const otherLocalisations = {
    /** @type {{ regex: RegExp, texts: {[K in keyof typeof localisationEN]?: TG.StealHisLookOptional<(typeof localisationEN)[K]>['=>']} }} */
    pl: {
        regex: /pl/gmi,
        texts: {
            hints: {
                hold: 'Przytrzymaj',
                hints: 'Pomoc',
                dragHint: 'podczas przeciągania punktu, aby przyciągał się do siatki.',
                extractHint: 'aby wyodrębnić punkt kontrolny krzywej znajdujący się poniżej.',
                byDefault: 'Domyślnie',
                whenDraggingPathPoint: ', gdy przeciągasz punkt ścieżki',
                notCurveControlPoint: 'nie punkt kontrolny krzywej',
                andTheLineIsNotCurved: 'a linia nie jest zakrzywiona. Przeciągniesz również punkty kontrolne krzywej, tak aby linia pozostała prosta.',
                inTechnicalTerms: 'Mówiąc językiem technicznym',
                dragAnyAdjacent: 'przeciągniesz również wszystkie sąsiadujące',
                adjacentExplanation: 'łączące się z następnym lub poprzednim punktem',
                curveControlPointsUnderneath: 'punkty kontrolne krzywej, które znajdują się bezpośrednio pod tym punktem.',
                dragOnlyDesired: 'aby przeciągnąć tylko żądany punkt ścieżki i umożliwić zakrzywianie linii prostej.',
                close: 'Zamknij',
                show: 'Pokaż pomoc',
                workInProgress: 'W realizacji',
                click: 'Naciśnij',
                points: 'punktami',
                points2: 'punkty',
                point: 'punkt',
                line: 'linia',
                toAddPoint: 'when clicking on ${line} beetween two ${points} to add ${point} between theese two ${points2}.'
            },
            controls: {
                workspace: 'Obszar roboczy',
                boxSize: 'Rozmiar elementu',
                width: 'szerokość',
                height: 'wysokość',
                externalSize: 'Rozmiar zewnętrznego obszaru roboczego',
                grid: 'Siatka',
                gridSize: 'Rozmiar siatki',
                gridVisibility: 'Pokaż siatkę',
                bg: 'Tło',
                points: 'Punkty',
                value: 'Wartość',
                inPercents: 'w %',
                inPx: 'w px',
                calcType: 'Licz',
                remove: 'usuń',
                scale: 'Skala',
                position: 'Pozycja',
                point: 'Punkt',
                curve: 'Zakrzywienie',
                bgSettings: 'Ustawienia tła',
                bgShowUnclipped: 'Pokaż nieprzycięte tło',
                bgOpacity: 'Przezroczystość tła',
                bgUnclippedOpacity: 'Przezroczystość nieprzyciętego tła'
            },
            calcTypes: {
                'percent': 'procenty',
                'middle': 'od środka (calc(50% + N px))',
                'start': 'od początku (N px)',
                'end': 'od końca (calc(100% + N px))'
            },
            footer: {
                checkTheRepo: 'Sprawdź repo',
                inspiredBy: 'Zainspirowane przez',
                fontTakenFrom: 'Czcionka ${name} pobrana z',
                isLicensed: 'na licencji CC BY 4.0'
            },
            cookieBanner: {
                weUse: 'Używamy plików cookie do zapisywania ustawień edytora',
                misc: 'np. tła, siatki, rozmiaru',
                noTrack: 'Nie gromadzimy żadnych informacji śledzących ani danych osobowych.',
                accept: 'OK',
                decline: 'Odmów'
            }
        }
    }
};

Object.keys(otherLocalisations).forEach((locToParse) => {
    const parseLvl = (lvl, srcLvl) => {
        Object.keys(srcLvl).forEach((key) => {
            if(lvl[key]) {
                if((typeof lvl[key] == 'object' || lvl[key] == 'function') && typeof lvl[key] == typeof srcLvl[key]) {
                    parseLvl(lvl[key], srcLvl[key]);
                } else if(typeof lvl[key] != typeof srcLvl[key]) {
                    lvl[key] = srcLvl[key];
                }
            } else {
                lvl[key] = srcLvl[key];
            }
        });
    }
    parseLvl(otherLocalisations[locToParse].texts, localisationEN);
});

/**  @returns {'en'|(keyof typeof otherLocalisations)} */
const initLocalisation = () => {
    for(/** @type {keyof typeof otherLocalisations} */let key of Object.keys(otherLocalisations)) {
        if(otherLocalisations[key].regex.test(navigator.language)) {
            return 'pl';
            break;
        }
    }
    return 'en';
};

let currentLocalisation = $state(initLocalisation());

/** @type {typeof localisationEN} */ //@ts-ignore
let localisationTexts = (() => {
    switch(currentLocalisation) {
        case "pl": {
            return otherLocalisations.pl.texts;
            break;
        }
        default: {
            return localisationEN;
        }
    }
})();

/**
 * @param {String} text
 * @param {{[id: String]: String}} namesObj
 * @returns {String}
 */
const parseLocalisationText = (text, namesObj) => {
    let retStr = `${text}`;
    let matches = retStr.match(/\$\{[^\}]*\}/gmi);
    if(matches) {
        matches.forEach((match) => {
            let matchInner = match.slice(2, -1);
            if(typeof namesObj[matchInner] == 'string') {
                retStr = retStr.replace(match, `${namesObj[matchInner]}`);
            } else {
                retStr = retStr.replace(match, ``);
            }
        });
    }
    return retStr;
}

export { currentLocalisation, localisationTexts, parseLocalisationText }