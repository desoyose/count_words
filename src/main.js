import './style.css';

const textArea = document.querySelector("#textarea");
const characters = document.querySelector(".characters");
const spaces = document.querySelector("#spaces");
const words = document.querySelector('.words');
const limitCheckbox = document.querySelector('#limit');
const sentences = document.querySelector('.sentences');
const seeMore = document.querySelector('.see__more');
const containerDensity = document.querySelector('.container__density'); 
const containerNext = document.querySelector('.container__next');
const time = document.querySelector('.time');
const seeLess = document.querySelector('.see__less');
const emptyText = document.querySelector('.empty__text');
let originalText = textArea.value;
const mode = document.querySelectorAll('.mode');
const html = document.documentElement;
const maxLetters = 1000;
const alerta = document.querySelector('.alert');
const boxLimit = document.querySelector('.box__limit');
let wordsArray;


const resetCounters = () => {
    // Verificar si el texto excede los 1000 caracteres
    if (textArea.value.length > maxLetters) {
        alerta.classList.remove('hidden');
        alerta.classList.add('flex');
        
        characters.textContent = 0;
        words.textContent = 0;
        sentences.textContent = 0;
        emptyText.innerHTML = 'No characters found. Start typing to see letter density.';
        time.innerHTML = "";
        containerDensity.innerHTML = '';
        containerNext.innerHTML = '';
        seeMore.classList.remove('opacity-100');
        seeMore.classList.add('opacity-0');
        seeLess.classList.remove('flex');
        seeLess.classList.add('hidden');
        autoResize();
        if(html.classList.contains('dark')){
            textArea.classList.remove('dark:border-custom_neutral-700');
            textArea.classList.add('dark:border-Purple-400','dark:shadow-[0px_0px_10px_rgba(192,132,252,0.5)]');
        }
            textArea.classList.remove('border-cyan-200');
            textArea.classList.add('border-custom__orage-800','dark:shadow-[0px_0px_10px_rgba(0,0,0,0.5)]');
        
        return;
    } else {
        autoResize();
        alerta.classList.remove('flex');
        alerta.classList.add('hidden');
        if(html.classList.contains('dark')){
            
            textArea.classList.remove('dark:border-Purple-400','dark:shadow-[0px_0px_10px_rgba(192,132,252,0.5)]');
            textArea.classList.add('dark:border-custom_neutral-700');
        }
            
            textArea.classList.remove('border-custom__orage-800','dark:shadow-[0px_0px_10px_rgba(0,0,0,0.5)]');
            textArea.classList.add('border-cyan-200');
        
    }

    autoResize();
    countChar();
    countWord();
    countSentences();
    getDistinctLetters();
    if (textArea.value === "") {
        time.innerHTML = ""; // Borra el tiempo si no hay caracteres
    } else {
        readingTimes(wordsArray.length);
    }
};
const changeMode = () => {
    const isDark = html.classList.toggle('dark'); 
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        html.classList.add('dark'); 
    } else {
        html.classList.remove('dark');
    }
};

mode.forEach(btn => btn.addEventListener('click', changeMode));



function autoResize() {
    // Restablecemos la altura a 'auto' para que se ajuste al contenido
    textArea.style.height = 'auto';

    // Ajustamos la altura del textarea a su scrollHeight (el contenido completo)
    textArea.style.height = `${textArea.scrollHeight}px`;
}
// Agregamos un evento de input para detectar cuando el usuario escribe
textArea.addEventListener("input", autoResize);


const countChar = () => {
    // Obtener el texto del textarea
    let text = textArea.value;

    // Comprobar si el checkbox está marcado
    if (spaces.checked) {
        // Si el checkbox está marcado, eliminamos todos los espacios
        text = text.replace(/\s+/g, ''); // Eliminar todos los espacios
    }

    // Actualizamos el contador de caracteres
    animateCounter(characters, 0, text.length, 500);
};

const countWord = () => {
    let text = textArea.value.trim(); // Eliminar espacios al principio y al final

    // Verificar si el texto está vacío
    if (text.length > maxLetters) {
        words.textContent = 0;
        wordsArray = []; // Si el texto está vacío, mostramos 0 palabras
    } else {
        // Dividir el texto por los espacios y contar las palabras
        wordsArray = text.split(/\s+/); // Filtramos los espacios vacíos
        words.textContent = wordsArray.length;
    }
    return wordsArray.length;
};

const readingTimes = (words) => {
    
    let totalWords = words;
    let timing = 80;
    const readingTimeInMinutes = totalWords / timing;
    const roundedTime = Math.ceil(readingTimeInMinutes);
    time.innerHTML = `< ${roundedTime} minute${roundedTime > 1 ? 's' : ''}`;
}

const countSentences = () => {
    let text = textArea.value.trim();

    // Dividir el texto en oraciones, filtrando por puntuaciones (.?!)
    const sentencesArray = text.split(/[.?!]/);
    let sentenceCount = 0;

    // Iteramos sobre cada oración
    for (let sentence of sentencesArray) {
        // Si la oración no está vacía y contiene al menos una letra o número
        if (sentence.trim() !== "" && /[a-zA-Z0-9]/.test(sentence)) {
            sentenceCount++;
        }
    }

    sentences.textContent = sentenceCount;
}
// Función para recortar el texto cuando se excede el límite
const cutText = () => {
    const text = textArea.value.trim();
    if(textArea.value = ""){
        resetCounters(); 
    }
    // Si el checkbox está marcado, cortamos el texto a los primeros 1000 caracteres
    if (limitCheckbox.checked) {
        if(textArea.value = ""){
            resetCounters(); 
        }
        textArea.value = originalText.substring(0, 1000); // Recorta el texto a los primeros 1000 caracteres
        alerta.classList.remove('flex');
        alerta.classList.add('hidden');
        boxLimit.classList.remove('flex');
        boxLimit.classList.add('hidden');
        
    } else {
        // Si el checkbox no está marcado, mostramos el texto completo
        textArea.value = originalText;

        // Comprobar si el texto completo excede el límite de 1000 caracteres
        if (textArea.value.length > maxLetters) {
            alerta.classList.remove('hidden');
            alerta.classList.add('flex');
            boxLimit.classList.remove('hidden');
            boxLimit.classList.add('flex');
            textArea.classList.remove('border-cyan-200');
                textArea.classList.add('border-custom__orage-800','dark:shadow-[0px_0px_10px_rgba(0,0,0,0.5)]');
            if(html.classList.contains('dark')){
                textArea.classList.remove('dark:border-custom_neutral-700');
                textArea.classList.add('dark:border-Purple-400', 'dark:shadow-[0px_0px_10px_rgba(192,132,252,0.5)]');
            }

                

        } else {
            alerta.classList.remove('flex');
            alerta.classList.add('hidden');
            boxLimit.classList.remove('flex');
            boxLimit.classList.add('hidden');
            textArea.classList.remove('border-custom__orage-800','dark:shadow-[0px_0px_10px_rgba(0,0,0,0.5)]');
                textArea.classList.add('border-cyan-200');
            if(html.classList.contains('dark')){
            
                textArea.classList.remove('dark:border-Purple-400','dark:shadow-[0px_0px_10px_rgba(192,132,252,0.5)]');
                textArea.classList.add('dark:border-custom_neutral-700');
            }

                
                

        }
    }

    // Siempre que se cambie el estado del checkbox, se actualizan los contadores
    if (textArea.value.length <= maxLetters) {
        resetCounters(); // Actualiza los contadores si el texto no excede los 1000 caracteres
    }
    
};

limitCheckbox.addEventListener("change", () => {
    cutText(); // Recorta el texto si se aplica el límite
    const text = textArea.value.trim();
    if (text.length <= maxLetters) {
        let totalWords = countWord(); // Actualiza el contador de palabras
        countSentences(); // Llama a countSentences
        readingTimes(totalWords); // Actualiza el tiempo de lectura
    } else {
        resetCounters();
    }
});


const countLetters = () => {
    let text = textArea.value.trim();

    // Verificamos si el texto tiene más de 1000 caracteres
    if (text.length > maxLetters) {
        alerta.classList.remove('hidden');
        alerta.classList.add('flex');
        boxLimit.classList.remove('hidden');
        boxLimit.classList.add('flex');
        if(html.classList.contains('dark')){
            textArea.classList.remove('dark:border-custom_neutral-700');
            textArea.classList.add('dark:border-Purple-400', 'dark:shadow-[0px_0px_10px_rgba(192,132,252,0.5)]');
        }
        characters.textContent = 0;
        return []; // Detenemos la ejecución y devolvemos un array vacío
    }

    if (text.length !== 0) {
        emptyText.classList.remove('flex');
        emptyText.classList.add('hidden');
    } else {
        emptyText.classList.remove('hidden');
        emptyText.classList.add('flex');
    }

    // Verificamos si el texto está vacío
    if (text === "") {
        return []; // Si el texto está vacío, devolvemos un array vacío (sin letras)
    }

    // Obtener todas las letras del texto, ignorando caracteres especiales y números
    const lettersMatch = text.match(/[a-zA-Z]/g); // Buscar las letras
    let letters = []; // Inicializamos un array vacío para las letras

    // Si encontramos coincidencias, las procesamos
    if (lettersMatch !== null) {
        // Convertimos todas las letras a minúsculas
        for (let i = 0; i < lettersMatch.length; i++) {
            letters.push(lettersMatch[i].toLowerCase());
        }
    }

    let letterCounts = []; // Usaremos un array de pares [letra, frecuencia]

    // Recorremos las letras y las contamos
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        let found = false;

        // Si la letra ya está en el array, incrementamos su cuenta
        for (let j = 0; j < letterCounts.length; j++) {
            if (letterCounts[j][0] === letter) {
                letterCounts[j][1] += 1;
                found = true;
                break;
            }
        }

        // Si la letra no está en el array, la añadimos con un conteo de 1
        if (!found) {
            letterCounts.push([letter, 1]);
        }
    }

    // Calculamos el total de letras
    const totalLetters = letters.length;

    // Calculamos el porcentaje para cada letra usando un bucle for
    for (let i = 0; i < letterCounts.length; i++) {
        const [letter, count] = letterCounts[i]; // Desestructuramos [letra, frecuencia]
        const percentage = ((count / totalLetters) * 100).toFixed(2); // Calculamos el porcentaje y lo redondeamos a 2 decimales
        letterCounts[i].push(percentage); // Agregamos el porcentaje al array [letra, frecuencia, porcentaje]
    }

    return letterCounts; // Devolvemos el array de pares [letra, frecuencia, porcentaje]
};

// Función para mostrar las letras con su frecuencia y porcentaje
const displayLetters = (letterCounts) => {
    // Contenedor para el resto de letras

    containerDensity.innerHTML = ''; // Limpiamos el contenido previo del contenedor de las 5 más frecuentes
    containerNext.innerHTML = ''; // Limpiamos el contenido previo del contenedor del resto de letras
    if (letterCounts.length > 0) {
        // Ordenamos por frecuencia descendente
        letterCounts.sort((a, b) => b[1] - a[1]);

        // Tomamos las 5 letras más frecuentes
        const top5 = letterCounts.slice(0, 5);
        const rest = letterCounts.slice(5); // El resto de las letras




        // Mostrar las 5 letras más frecuentes en el contenedor .container__density
        for (let i = 0; i < top5.length; i++) {
            const [letter, count, percentage] = top5[i];

            const letterDiv = document.createElement('div');
            letterDiv.classList.add('box__density', 'flex', 'flex-row', 'justify-between', 'items-center', 'text__preset4');

            // Mostrar la letra
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter.toUpperCase();
            letterSpan.classList.add('pr-4');

            // Barra de densidad
            const barDiv = document.createElement('div');
            barDiv.classList.add('relative', 'w-full', 'h-3', 'rounded-20', 'bg-custom_neutral-100'); // Barra de fondo

            const bar = document.createElement('div');
            bar.classList.add('absolute', 'top-0', 'left-0', 'h-3', 'rounded-20', 'bg-Purple-400');
            bar.style.width = `${percentage}%`; // El ancho de la barra será proporcional al porcentaje

            barDiv.appendChild(bar);

            // Mostrar número y porcentaje
            const numberPercentDiv = document.createElement('div');
            numberPercentDiv.classList.add('flex', 'flex-row', 'pl-6');

            const numberSpan = document.createElement('span');
            numberSpan.classList.add('density__number');
            numberSpan.textContent = count;

            const percentSpan = document.createElement('span');
            percentSpan.classList.add('density__percent');
            percentSpan.textContent = ` (${percentage}%)`;

            numberPercentDiv.appendChild(numberSpan);
            numberPercentDiv.appendChild(percentSpan);

            letterDiv.appendChild(letterSpan);
            letterDiv.appendChild(barDiv);
            letterDiv.appendChild(numberPercentDiv);
            containerDensity.appendChild(letterDiv);
        }

        // Mostrar el resto de las letras en el contenedor .container__next
        for (let i = 0; i < rest.length; i++) {
            const [letter, count, percentage] = rest[i];

            const letterDiv = document.createElement('div');
            letterDiv.classList.add('box__density', 'flex', 'flex-row', 'justify-between', 'items-center', 'text__preset4');

            // Mostrar la letra
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter.toUpperCase();
            letterSpan.classList.add('pr-4');

            // Barra de densidad
            const barDiv = document.createElement('div');
            barDiv.classList.add('relative', 'w-full', 'h-3', 'rounded-20', 'bg-custom_neutral-100'); // Barra de fondo

            const bar = document.createElement('div');
            bar.classList.add('absolute', 'top-0', 'left-0', 'h-3', 'rounded-20', 'bg-Purple-400');
            bar.style.width = `${percentage}%`; // El ancho de la barra será proporcional al porcentaje

            barDiv.appendChild(bar);

            // Mostrar número y porcentaje
            const numberPercentDiv = document.createElement('div');
            numberPercentDiv.classList.add('flex', 'flex-row', 'pl-6');

            const numberSpan = document.createElement('span');
            numberSpan.classList.add('density__number');
            numberSpan.textContent = count;

            const percentSpan = document.createElement('span');
            percentSpan.classList.add('density__percent');
            percentSpan.textContent = ` (${percentage}%)`;

            numberPercentDiv.appendChild(numberSpan);
            numberPercentDiv.appendChild(percentSpan);

            letterDiv.appendChild(letterSpan);
            letterDiv.appendChild(barDiv);
            letterDiv.appendChild(numberPercentDiv);
            containerNext.appendChild(letterDiv);
        }
    }
    updateVisibility();

};


const getDistinctLetters = () => {
    const text = textArea.value.trim();

    // Si el texto tiene más de 1000 caracteres, no ejecutamos los contadores
    if (text.length > maxLetters) {
        alerta.classList.remove('hidden');
        alerta.classList.add('flex');
        box.classList.remove('hidden');
        box.classList.add('flex');
        if(html.classList.contains('dark')){
            textArea.classList.remove('dark:border-custom_neutral-700');
            textArea.classList.add('dark:border-Purple-400', 'dark:shadow-[0px_0px_10px_rgba(192,132,252,0.5)]');
        }
        return; // Detenemos la ejecución de la función
    }

    const letterCounts = countLetters(); // Contamos las letras
    displayLetters(letterCounts); // Mostramos las letras con su conteo y porcentaje
};
const updateVisibility = () => {
    const hasElements = containerNext.childElementCount > 0;
    if (hasElements) {
        seeMore.classList.remove('opacity-0');
        seeMore.classList.add('opacity-100');
    } else {
        seeMore.classList.add('opacity-0');
        seeMore.classList.remove('opacity-100');
    }
};
const seeAll = () => {

    seeMore.addEventListener('click', () => {
        if (!containerNext.classList.contains('active')) {
            containerNext.classList.add('active');
            seeMore.classList.remove('after:rotate-0');
            seeMore.classList.add('after:rotate-[180deg]');
            seeLess.classList.remove('hidden');
            seeLess.classList.add('flex');
        } else {
            containerNext.classList.remove('active');
            seeMore.classList.remove('after:rotate-[180deg]');
            seeMore.classList.add('after:rotate-0');
            seeLess.classList.remove('flex');
            seeLess.classList.add('hidden');
        }
    });

};


const seeLessFunction = () => {
    seeLess.addEventListener('click', () => {
        if (containerNext.classList.contains('active')) {
            containerNext.classList.remove('active');
            seeMore.classList.add('after:rotate-0');
            seeMore.classList.remove('after:rotate-[180deg]');

            // Ocultar el botón seeLess
            seeLess.classList.add('hidden');
            seeLess.classList.remove('flex');
        }
    });
};


const animateCounter = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        // Calculamos el progreso en función del tiempo transcurrido
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Actualizamos el valor del contador
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};



// En el evento `input` solo necesitas asegurarte de que `resetCounters` se llame bien:
textArea.addEventListener("input", () => {
    originalText = textArea.value;
    
    // Validamos si el texto tiene más de 1000 caracteres
    if (originalText.length > maxLetters) {
        // Si excede, mostramos la alerta y no hacemos nada más
        alerta.classList.remove('hidden');
        alerta.classList.add('flex');
        boxLimit.classList.remove('hidden');
        boxLimit.classList.add('flex');
        if(html.classList.contains('dark')){
            textArea.classList.remove('dark:border-custom_neutral-700');
            textArea.classList.add('dark:border-Purple-400', 'dark:shadow-[0px_0px_10px_rgba(192,132,252,0.5)]');
        }
        return; // Salimos de la función
    }
    
    // Si no excede el límite, ocultamos la alerta
    alerta.classList.remove('flex');
    alerta.classList.add('hidden');
    boxLimit.classList.remove('flex');
    boxLimit.classList.add('hidden');
    if(html.classList.contains('dark')){
            
        textArea.classList.remove('dark:border-Purple-400','dark:shadow-[0px_0px_10px_rgba(192,132,252,0.5)]');
        textArea.classList.add('dark:border-custom_neutral-700');
    }

    // Llamamos a `resetCounters` solo si el texto no excede el límite
    resetCounters();
});

spaces.addEventListener("change", () => {
    const text = textArea.value.trim();
    if (text.length <= maxLetters) {
        countChar(); // Actualiza el contador de caracteres
        countWord(); // Actualiza el contador de palabras
        countSentences(); // Llama a countSentences
    }
});

limitCheckbox.addEventListener("change", () => {
    let totalWords = countWord();
    const text = textArea.value;
    if (maxLetters >= text.length) {
        cutText(); // Recorta el texto si se aplica el límite
        // Actualiza el contador de palabras
        countSentences(); // Llama a countSentences
        readingTimes(totalWords); // Actualiza el tiempo de lectura
    }

});

loadTheme();
autoResize();

seeAll();
seeLessFunction();