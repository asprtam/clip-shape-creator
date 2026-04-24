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
    /** @type {{ name: String, regex: RegExp, flagBg: String, texts: {[K in keyof typeof localisationEN]?: TG.StealHisLookOptional<(typeof localisationEN)[K]>['=>']} }} */
    es: {
        name: 'Spanish (Español)',
        regex: /es/gmi,
        flagBg: 'linear-gradient(180deg, #CE1126 0%, #CE1126 25%, #FCD116 25%, #FCD116 75%, #CE1126 75%, #CE1126 100%);',
        texts: {
            hints: {
                hold: 'Mantener',
                hints: 'Sugerencias:',
                dragHint: 'al arrastrar para que los puntos se ajusten a la cuadrícula.',
                extractHint: 'para extraer el punto de control de la curva que está debajo.',
                byDefault: 'Por defecto ',
                whenDraggingPathPoint: 'cuando arrastras un punto de la ruta',
                notCurveControlPoint: 'no un punto de control de curva',
                andTheLineIsNotCurved: 'y la línea no está curvada, también arrastrarás los puntos de control de la curva para mantener la línea recta.',
                inTechnicalTerms: 'En términos técnicos',
                dragAnyAdjacent: 'también arrastrarás cualquier',
                adjacentExplanation: 'conectado al punto siguiente o anterior',
                curveControlPointsUnderneath: 'puntos de control de curva que están directamente debajo de este punto.',
                dragOnlyDesired: 'para arrastrar solo el punto de ruta deseado y permitir curvar la línea recta.',
                close: 'Cerrar sugerencias',
                show: 'Mostrar sugerencias',
                workInProgress: 'En progreso',
                click: 'Presiona',
                point: 'punto',
                points: 'puntos',
                points2: 'puntos',
                line: 'línea',
                toAddPoint: 'al hacer clic en la ${line} entre dos ${points} para añadir un ${point} entre estos dos ${points2}.',
                toUndo: 'para deshacer.'
            },
            controls: {
                workspace: 'Área de trabajo',
                boxSize: 'Tamaño del cuadro',
                width: 'ancho',
                height: 'alto',
                externalSize: 'Tamaño del área de trabajo externa',
                grid: 'Cuadrícula',
                gridSize: 'Tamaño de la cuadrícula',
                gridVisibility: 'Visibilidad de la cuadrícula',
                bg: 'Fondo',
                points: 'Puntos',
                value: 'Valor',
                inPercents: 'en %',
                inPx: 'en px',
                calcType: 'Tipo de cálculo',
                remove: 'eliminar',
                scale: 'Escala',
                position: 'Posición',
                point: 'Punto',
                curve: 'Curva',
                bgSettings: 'Configuración del fondo',
                bgShowUnclipped: 'Mostrar fondo sin recortar',
                bgOpacity: 'Opacidad del fondo',
                bgUnclippedOpacity: 'Opacidad del fondo sin recortar'
            },
            calcTypes: {
                'percent': 'porcentajes (relativo)',
                'middle': 'desde el centro (calc(50% + N px)) (absoluto)',
                'start': 'desde el inicio (N px) (absoluto)',
                'end': 'desde el final (calc(100% + N px)) (absoluto)'
            },
            footer: {
                checkTheRepo: 'Ver el repositorio',
                inspiredBy: 'Inspirado por',
                fontTakenFrom: 'La fuente ${name} fue tomada de',
                isLicensed: 'está licenciada bajo CC BY 4.0'
            },
            cookieBanner: {
                weUse: 'Usamos cookies para guardar la configuración del editor',
                misc: 'por ejemplo, fondo, cuadrícula, tamaño',
                noTrack: 'No recopilamos información de seguimiento ni datos personales.',
                accept: 'Aceptar',
                decline: 'Rechazar'
            }
        }
    },
    /** @type {{ name: String, regex: RegExp, flagBg: String, texts: {[K in keyof typeof localisationEN]?: TG.StealHisLookOptional<(typeof localisationEN)[K]>['=>']} }} */
    pl: {
        name: 'Polish (polski)',
        regex: /pl/gmi,
        flagBg: 'linear-gradient(180deg, #EBE1E1 0%, #EBE1E1 50%, #DC143C 50%, #DC143C 100%);',
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
    },
    /** @type {{ name: String, regex: RegExp, flagBg: String, texts: {[K in keyof typeof localisationEN]?: TG.StealHisLookOptional<(typeof localisationEN)[K]>['=>']} }} */
    de: {
        name: 'German (Deutsch)',
        regex: /de/gmi,
        flagBg: 'linear-gradient(180deg, #FFD700 0%, #FFD700 calc(100% / 3), #DD0000 calc(100% / 3), #DD0000 calc(calc(100% / 3) * 2), #2B1C03 calc(calc(100% / 3) * 2), #2B1C03 100%)',
        texts: {
            hints: {
                hold: 'Halten',
                hints: 'Hinweise:',
                dragHint: 'beim Ziehen, damit Punkte am Raster einrasten.',
                extractHint: 'um den darunterliegenden Kurvenkontrollpunkt zu extrahieren.',
                byDefault: 'Standardmäßig ',
                whenDraggingPathPoint: 'wenn du einen Pfadpunkt ziehst',
                notCurveControlPoint: 'nicht einen Kurvenkontrollpunkt',
                andTheLineIsNotCurved: 'und die Linie nicht gekrümmt ist, ziehst du auch die Kurvenkontrollpunkte mit, damit die Linie gerade bleibt.',
                inTechnicalTerms: 'Technisch ausgedrückt',
                dragAnyAdjacent: 'ziehst du auch alle angrenzenden',
                adjacentExplanation: 'die mit dem nächsten oder vorherigen Punkt verbunden sind',
                curveControlPointsUnderneath: 'Kurvenkontrollpunkte, die sich direkt unter diesem Punkt befinden.',
                dragOnlyDesired: 'um nur den gewünschten Pfadpunkt zu ziehen und das Krümmen der geraden Linie zu ermöglichen.',
                close: 'Hinweise schließen',
                show: 'Hinweise anzeigen',
                workInProgress: 'In Arbeit',
                click: 'Drücke',
                point: 'Punkt',
                points: 'Punkte',
                points2: 'Punkte',
                line: 'Linie',
                toAddPoint: 'beim Klicken auf die ${line} zwischen zwei ${points}, um einen ${point} zwischen diesen beiden ${points2} hinzuzufügen.',
                toUndo: 'um rückgängig zu machen.'
            },
            controls: {
                workspace: 'Arbeitsbereich',
                boxSize: 'Boxgröße',
                width: 'Breite',
                height: 'Höhe',
                externalSize: 'Externe Arbeitsbereichsgröße',
                grid: 'Raster',
                gridSize: 'Rastergröße',
                gridVisibility: 'Raster anzeigen',
                bg: 'Hintergrund',
                points: 'Punkte',
                value: 'Wert',
                inPercents: 'in %',
                inPx: 'in px',
                calcType: 'Berechnungstyp',
                remove: 'entfernen',
                scale: 'Skalierung',
                position: 'Position',
                point: 'Punkt',
                curve: 'Kurve',
                bgSettings: 'Hintergrundeinstellungen',
                bgShowUnclipped: 'Unbeschnittenen Hintergrund anzeigen',
                bgOpacity: 'Hintergrund-Deckkraft',
                bgUnclippedOpacity: 'Deckkraft des unbeschnittenen Hintergrunds'
            },
            calcTypes: {
                'percent': 'Prozente (relativ)',
                'middle': 'von der Mitte (calc(50% + N px)) (absolut)',
                'start': 'vom Anfang (N px) (absolut)',
                'end': 'vom Ende (calc(100% + N px)) (absolut)'
            },
            footer: {
                checkTheRepo: 'Repository ansehen',
                inspiredBy: 'Inspiriert von',
                fontTakenFrom: 'Schriftart ${name} stammt von',
                isLicensed: 'ist unter CC BY 4.0 lizenziert'
            },
            cookieBanner: {
                weUse: 'Wir verwenden Cookies, um deine Editor-Einstellungen zu speichern',
                misc: 'z. B. Hintergrund, Raster, Größe',
                noTrack: 'Wir erfassen keine Tracking- oder personenbezogenen Daten.',
                accept: 'Akzeptieren',
                decline: 'Ablehnen'
            }
        }
    },
    /** @type {{ name: String, regex: RegExp, flagBg: String, texts: {[K in keyof typeof localisationEN]?: TG.StealHisLookOptional<(typeof localisationEN)[K]>['=>']} }} */
    uk: {
        name: 'Ukrainian (українська)',
        regex: /(uk)|(ru)/gmi,
        flagBg: 'linear-gradient(180deg, #0057B7 0%, #0057B7 50%, #FFD700 50%, #FFD700 100%);',
        texts: {
            hints: {
                hold: 'Утримуйте',
                hints: 'Підказки:',
                dragHint: 'під час перетягування, щоб точки прив’язувалися до сітки.',
                extractHint: 'щоб витягнути точку керування кривої, що знаходиться під нею.',
                byDefault: 'За замовчуванням ',
                whenDraggingPathPoint: 'коли ви перетягуєте точку шляху',
                notCurveControlPoint: 'а не точку керування кривої',
                andTheLineIsNotCurved: 'і лінія не вигнута, ви також перетягуватимете точки керування кривої, щоб лінія залишалася прямою.',
                inTechnicalTerms: 'Технічно кажучи',
                dragAnyAdjacent: 'ви також перетягуватимете будь-які сусідні',
                adjacentExplanation: 'з’єднані з наступною або попередньою точкою',
                curveControlPointsUnderneath: 'точки керування кривої, які знаходяться безпосередньо під цією точкою.',
                dragOnlyDesired: 'щоб перетягувати лише потрібну точку шляху та дозволити вигин прямої лінії.',
                close: 'Закрити підказки',
                show: 'Показати підказки',
                workInProgress: 'У розробці',
                click: 'Натисніть',
                point: 'точку',
                points: 'точками',
                points2: 'точки',
                line: 'лінію',
                toAddPoint: 'при натисканні на ${line} між двома ${points}, щоб додати ${point} між цими ${points2}.',
                toUndo: 'щоб скасувати.'
            },
            controls: {
                workspace: 'Робоча область',
                boxSize: 'Розмір блоку',
                width: 'ширина',
                height: 'висота',
                externalSize: 'Розмір зовнішньої робочої області',
                grid: 'Сітка',
                gridSize: 'Розмір сітки',
                gridVisibility: 'Видимість сітки',
                bg: 'Фон',
                points: 'Точки',
                value: 'Значення',
                inPercents: 'у %',
                inPx: 'у px',
                calcType: 'Тип обчислення',
                remove: 'видалити',
                scale: 'Масштаб',
                position: 'Позиція',
                point: 'Точка',
                curve: 'Крива',
                bgSettings: 'Налаштування фону',
                bgShowUnclipped: 'Показати необрізаний фон',
                bgOpacity: 'Прозорість фону',
                bgUnclippedOpacity: 'Прозорість необрізаного фону'
            },
            calcTypes: {
                'percent': 'відсотки (відносно)',
                'middle': 'від центру (calc(50% + N px)) (абсолютно)',
                'start': 'від початку (N px) (абсолютно)',
                'end': 'від кінця (calc(100% + N px)) (абсолютно)'
            },
            footer: {
                checkTheRepo: 'Переглянути репозиторій',
                inspiredBy: 'Натхнено',
                fontTakenFrom: 'Шрифт ${name} взято з',
                isLicensed: 'ліцензовано за CC BY 4.0'
            },
            cookieBanner: {
                weUse: 'Ми використовуємо файли cookie для збереження налаштувань редактора',
                misc: 'наприклад, фон, сітка, розмір',
                noTrack: 'Ми не збираємо дані для відстеження або особисту інформацію.',
                accept: 'Прийняти',
                decline: 'Відхилити'
            }
        }
    },
    /** @type {{ name: String, regex: RegExp, flagBg: String, texts: {[K in keyof typeof localisationEN]?: TG.StealHisLookOptional<(typeof localisationEN)[K]>['=>']} }} */
    hi: {
        name: 'Hindi (हिंदी भाषा)',
        flagBg: 'linear-gradient(180deg, #FF9933 0%, #FF9933 calc(100% / 3), #EBE1E1 calc(100% / 3), #EBE1E1 calc(calc(100% / 3) * 2), #138808 calc(calc(100% / 3) * 2), #138808 100%)',
        regex: /hi/gmi,
        texts: {
            hints: {
                hold: 'पकड़ें',
                hints: 'संकेत:',
                dragHint: 'खींचते समय ताकि बिंदु ग्रिड से चिपक जाएं।',
                extractHint: 'नीचे मौजूद कर्व कंट्रोल पॉइंट निकालने के लिए।',
                byDefault: 'डिफ़ॉल्ट रूप से ',
                whenDraggingPathPoint: 'जब आप पाथ पॉइंट खींचते हैं',
                notCurveControlPoint: 'कर्व कंट्रोल पॉइंट नहीं',
                andTheLineIsNotCurved: 'और लाइन कर्व नहीं है, तो आप कर्व कंट्रोल पॉइंट्स भी खींचेंगे ताकि लाइन सीधी रहे।',
                inTechnicalTerms: 'तकनीकी रूप से',
                dragAnyAdjacent: 'आप किसी भी पास के',
                adjacentExplanation: 'जो अगले या पिछले पॉइंट से जुड़े हों',
                curveControlPointsUnderneath: 'कर्व कंट्रोल पॉइंट्स जो सीधे इस पॉइंट के नीचे हैं।',
                dragOnlyDesired: 'केवल इच्छित पाथ पॉइंट को खींचने और सीधी लाइन को कर्व करने के लिए।',
                close: 'संकेत बंद करें',
                show: 'संकेत दिखाएं',
                workInProgress: 'प्रगति में',
                click: 'दबाएं',
                point: 'बिंदु',
                points: 'बिंदुओं',
                points2: 'बिंदु',
                line: 'रेखा',
                toAddPoint: 'दो ${points} के बीच ${line} पर क्लिक करने पर इन ${points2} के बीच ${point} जोड़ने के लिए।',
                toUndo: 'पूर्ववत करने के लिए।'
            },
            controls: {
                workspace: 'कार्य क्षेत्र',
                boxSize: 'बॉक्स आकार',
                width: 'चौड़ाई',
                height: 'ऊंचाई',
                externalSize: 'बाहरी कार्य क्षेत्र का आकार',
                grid: 'ग्रिड',
                gridSize: 'ग्रिड आकार',
                gridVisibility: 'ग्रिड दृश्यता',
                bg: 'पृष्ठभूमि',
                points: 'बिंदु',
                value: 'मान',
                inPercents: '% में',
                inPx: 'px में',
                calcType: 'गणना प्रकार',
                remove: 'हटाएं',
                scale: 'स्केल',
                position: 'स्थिति',
                point: 'बिंदु',
                curve: 'कर्व',
                bgSettings: 'पृष्ठभूमि सेटिंग्स',
                bgShowUnclipped: 'अनकट पृष्ठभूमि दिखाएं',
                bgOpacity: 'पृष्ठभूमि अपारदर्शिता',
                bgUnclippedOpacity: 'अनकट पृष्ठभूमि अपारदर्शिता'
            },
            calcTypes: {
                'percent': 'प्रतिशत (सापेक्ष)',
                'middle': 'मध्य से (calc(50% + N px)) (निरपेक्ष)',
                'start': 'शुरुआत से (N px) (निरपेक्ष)',
                'end': 'अंत से (calc(100% + N px)) (निरपेक्ष)'
            },
            footer: {
                checkTheRepo: 'रिपॉजिटरी देखें',
                inspiredBy: 'से प्रेरित',
                fontTakenFrom: '${name} फ़ॉन्ट लिया गया है',
                isLicensed: 'CC BY 4.0 के अंतर्गत लाइसेंस प्राप्त है'
            },
            cookieBanner: {
                weUse: 'हम आपके एडिटर सेटिंग्स सहेजने के लिए कुकीज़ का उपयोग करते हैं',
                misc: 'जैसे पृष्ठभूमि, ग्रिड, आकार',
                noTrack: 'हम कोई ट्रैकिंग या व्यक्तिगत जानकारी एकत्र नहीं करते।',
                accept: 'स्वीकार करें',
                decline: 'अस्वीकार करें'
            }
        }
    },
    /** @type {{ name: String, regex: RegExp, flagBg: String, texts: {[K in keyof typeof localisationEN]?: TG.StealHisLookOptional<(typeof localisationEN)[K]>['=>']} }} */
    fr: {
        name: 'French (Français)',
        flagBg: 'linear-gradient(90deg, #000091 0%, #000091 calc(100% / 3), #EBE1E1 calc(100% / 3), #EBE1E1 calc(calc(100% / 3) * 2), #EF4135 calc(calc(100% / 3) * 2), #EF4135 100%)',
        regex: /fr/gmi,
        texts: {
            hints: {
                hold: 'Maintenir',
                hints: 'Astuces :',
                dragHint: 'en faisant glisser pour que les points s’alignent sur la grille.',
                extractHint: 'pour extraire le point de contrôle de courbe situé en dessous.',
                byDefault: 'Par défaut ',
                whenDraggingPathPoint: 'lorsque vous déplacez un point de chemin',
                notCurveControlPoint: 'et non un point de contrôle de courbe',
                andTheLineIsNotCurved: 'et que la ligne n’est pas courbée, vous déplacerez également les points de contrôle de courbe pour garder la ligne droite.',
                inTechnicalTerms: 'En termes techniques',
                dragAnyAdjacent: 'vous déplacerez également tous les',
                adjacentExplanation: 'reliés au point suivant ou précédent',
                curveControlPointsUnderneath: 'points de contrôle de courbe situés directement sous ce point.',
                dragOnlyDesired: 'pour déplacer uniquement le point de chemin souhaité et permettre de courber la ligne droite.',
                close: 'Fermer les astuces',
                show: 'Afficher les astuces',
                workInProgress: 'En cours',
                click: 'Appuyez sur',
                point: 'point',
                points: 'points',
                points2: 'points',
                line: 'ligne',
                toAddPoint: 'en cliquant sur la ${line} entre deux ${points} pour ajouter un ${point} entre ces deux ${points2}.',
                toUndo: 'pour annuler.'
            },
            controls: {
                workspace: 'Espace de travail',
                boxSize: 'Taille de la boîte',
                width: 'largeur',
                height: 'hauteur',
                externalSize: 'Taille de la zone de travail externe',
                grid: 'Grille',
                gridSize: 'Taille de la grille',
                gridVisibility: 'Visibilité de la grille',
                bg: 'Arrière-plan',
                points: 'Points',
                value: 'Valeur',
                inPercents: 'en %',
                inPx: 'en px',
                calcType: 'Type de calcul',
                remove: 'supprimer',
                scale: 'Échelle',
                position: 'Position',
                point: 'Point',
                curve: 'Courbe',
                bgSettings: 'Paramètres de l’arrière-plan',
                bgShowUnclipped: 'Afficher l’arrière-plan non rogné',
                bgOpacity: 'Opacité de l’arrière-plan',
                bgUnclippedOpacity: 'Opacité de l’arrière-plan non rogné'
            },
            calcTypes: {
                'percent': 'pourcentages (relatif)',
                'middle': 'depuis le centre (calc(50% + N px)) (absolu)',
                'start': 'depuis le début (N px) (absolu)',
                'end': 'depuis la fin (calc(100% + N px)) (absolu)'
            },
            footer: {
                checkTheRepo: 'Voir le dépôt',
                inspiredBy: 'Inspiré par',
                fontTakenFrom: 'La police ${name} provient de',
                isLicensed: 'est sous licence CC BY 4.0'
            },
            cookieBanner: {
                weUse: 'Nous utilisons des cookies pour enregistrer les paramètres de votre éditeur',
                misc: 'par ex., arrière-plan, grille, taille',
                noTrack: 'Nous ne collectons aucune donnée de suivi ni information personnelle.',
                accept: 'Accepter',
                decline: 'Refuser'
            }
        }
    }
};

/**
 * @type {{[K in ('en')|(keyof typeof otherLocalisations)]: {flag: String, name: String}}}
 */ //@ts-ignore
let localisationsFlags = {
};

Object.defineProperty(localisationsFlags, 'en', {
    set: () => {},
    get: () => {
        return { name: 'English', flag: `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 80 50' preserveAspectRatio='none'%3E%3Cdefs%3E%3Cstyle%3E .e %7B fill: none; %7D .f %7B fill: %23b31942; %7D .g %7B fill: %230a3161; %7D .h %7B fill: %23c8102e; %7D .i %7B clip-path: url(%23d); %7D .j %7B clip-path: url(%23b); %7D .k %7B fill: %23012169; %7D %3C/style%3E%3CclipPath id='b'%3E%3Cpolygon class='e' points='80 50 80 0 0 50 80 50'/%3E%3C/clipPath%3E%3CclipPath id='d'%3E%3Cpolygon class='e' points='0 0 80 0 0 50 0 0'/%3E%3C/clipPath%3E%3C/defs%3E%3Cg id='a' data-name='Warstwa 1'%3E%3Cg class='j'%3E%3Cpolygon class='k' points='0 5.83 0 16.67 17.34 16.67 0 5.83'/%3E%3Cpolygon class='k' points='0 33.33 0 44.17 17.34 33.33 0 33.33'/%3E%3Cpolygon class='k' points='30.67 25 22.67 20 0 20 0 30 22.67 30 30.67 25'/%3E%3Cpolygon class='k' points='70.67 0 48 0 48 14.17 70.67 0'/%3E%3Cpolygon class='k' points='35.2 0 35.2 16.17 40 19.17 44.8 16.17 44.8 0 35.2 0'/%3E%3Cpolygon class='k' points='32 0 9.33 0 32 14.17 32 0'/%3E%3Cpolygon class='k' points='9.33 50 32 50 32 35.83 9.33 50'/%3E%3Cpolygon class='k' points='40 30.83 35.2 33.83 35.2 50 44.8 50 44.8 33.83 40 30.83'/%3E%3Cpolygon class='k' points='48 50 70.67 50 48 35.83 48 50'/%3E%3Cpolygon class='k' points='80 44.17 80 33.33 62.66 33.33 80 44.17'/%3E%3Cpolygon class='k' points='49.33 25 57.33 30 80 30 80 20 57.33 20 49.33 25'/%3E%3Cpolygon class='k' points='62.66 16.67 80 16.67 80 5.83 62.66 16.67'/%3E%3Cpolygon class='h' points='22 33.33 0 47.08 0 50 0 50 4.66 50 31.33 33.33 22 33.33'/%3E%3Cpolygon class='h' points='31.33 16.67 4.66 0 0 0 0 2.92 22 16.67 31.33 16.67'/%3E%3Cpolygon class='h' points='75.34 0 48.67 16.67 58 16.67 80 2.92 80 0 75.34 0'/%3E%3Cpolygon class='h' points='48.67 33.33 75.34 50 80 50 80 47.08 58 33.33 48.67 33.33'/%3E%3Cpolygon class='h' points='44.8 20 44.8 0 35.2 0 35.2 20 0 20 0 30 35.2 30 35.2 50 44.8 50 44.8 30 80 30 80 20 44.8 20'/%3E%3C/g%3E%3C/g%3E%3Cg id='c' data-name='Warstwa 2'%3E%3Cg class='i'%3E%3Crect class='f' y='30.77' width='80' height='3.85'/%3E%3Crect class='f' y='38.46' width='80' height='3.85'/%3E%3Crect class='f' y='46.15' width='80' height='3.85'/%3E%3Crect class='f' x='32' y='15.38' width='48' height='3.85'/%3E%3Crect class='f' x='32' y='7.69' width='48' height='3.85'/%3E%3Crect class='f' x='32' y='23.08' width='48' height='3.85'/%3E%3Crect class='f' x='32' width='48' height='3.85'/%3E%3Cpath class='g' d='M0,0v26.92h32V0H0ZM2.67,25.27c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM2.67,19.88c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM2.67,14.64c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM2.67,9.11c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM2.67,3.73c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM5.33,22.57c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM5.33,17.19c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM5.33,11.8c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM5.33,6.42c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM8,25.27c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM8,19.88c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM8,14.64c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM8,9.11c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM8,3.73c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM10.67,22.57c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM10.67,17.19c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM10.67,11.8c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM10.67,6.42c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM13.33,25.27c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM13.33,19.88c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM13.33,14.64c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM13.33,9.11c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM13.33,3.73c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM16,22.57c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM16,17.19c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM16,11.8c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM16,6.42c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM18.67,25.27c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM18.67,19.88c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM18.67,14.64c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM18.67,9.11c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM18.67,3.73c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM21.33,22.57c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM21.33,17.19c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM21.33,11.8c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM21.33,6.42c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM24,25.27c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM24,19.88c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM24,14.64c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM24,9.11c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM24,3.73c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM26.67,22.57c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM26.67,17.19c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM26.67,11.8c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM26.67,6.42c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM29.33,25.27c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM29.33,19.88c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM29.33,14.64c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM29.33,9.11c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18ZM29.33,3.73c-.55,0-1-.53-1-1.18s.45-1.18,1-1.18,1,.53,1,1.18-.45,1.18-1,1.18Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` };
    },
    enumerable: true
});

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
    Object.defineProperty(localisationsFlags, `${locToParse}`, {
        set: () => { },
        get: () => {
            return { flag: otherLocalisations[`${locToParse}`].flagBg, name: otherLocalisations[`${locToParse}`].name };
        },
        enumerable: true
    });
});

/**  @returns {'en'|(keyof typeof otherLocalisations)} */
const getSystemDefinedLocalisation = () => {
    let navigatorLocalisation = navigator.language;
    if(/(en\-UK)|(en\-AG)|(en\-AI)|(en\-AS)|(en\-AT)|(en\-AU)|(en\-BB)|(en\-BE)|(en\-BI)|(en\-BM)|(en\-BS)|(en\-BW)|(en\-BZ)|(en\-CA)|(en\-CC)|(en\-CH)|(en\-CK)|(en\-CM)|(en\-CX)|(en\-CY)|(en\-DE)|(en\-DG)|(en\-DK)|(en\-DM)|(en\-ER)|(en\-FI)|(en\-FJ)|(en\-FK)|(en\-FM)|(en\-GB)|(en\-GD)|(en\-GG)|(en\-GH)|(en\-GI)|(en\-GM)|(en\-GU)|(en\-GY)|(en\-HK)|(en\-IE)|(en\-IL)|(en\-IM)|(en\-IN)|(en\-IO)|(en\-JE)|(en\-JM)|(en\-KE)|(en\-KI)|(en\-KN)|(en\-KY)|(en\-LC)|(en\-LR)|(en\-LS)|(en\-MG)|(en\-MH)|(en\-MO)|(en\-MP)|(en\-MS)|(en\-MT)|(en\-MU)|(en\-MW)|(en\-MY)|(en\-NA)|(en\-NF)|(en\-NG)|(en\-NL)|(en\-NR)|(en\-NU)|(en\-NZ)|(en\-PG)|(en\-PH)|(en\-PK)|(en\-PN)|(en\-PR)|(en\-PW)|(en\-RW)|(en\-SB)|(en\-SC)|(en\-SD)|(en\-SE)|(en\-SG)|(en\-SH)|(en\-SI)|(en\-SL)|(en\-SS)|(en\-SX)|(en\-SZ)|(en\-TC)|(en\-TK)|(en\-TO)|(en\-TT)|(en\-TV)|(en\-TZ)|(en\-UG)|(en\-UM)|(en\-US)|(en\-US\-POSIX)|(en\-VC)|(en\-VG)|(en\-VI)|(en\-VU)|(en\-WS)|(en\-ZA)|(en\-ZM)|(en\-ZW)/gmi.test(navigatorLocalisation)) {
        return 'en';
    }
    for(/** @type {keyof typeof otherLocalisations} */let key of Object.keys(otherLocalisations)) {
        if(otherLocalisations[key].regex.test(navigator.language)) { //@ts-ignore
            return `${key}`;
            break;
        }
    }
    return 'en';
}

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

export { parseLocalisationText, getSystemDefinedLocalisation, localisationEN, otherLocalisations, localisationsFlags }