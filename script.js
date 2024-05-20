// Funzione per verificare la password
function checkPassword() {
    const correctPassword = "Mini"; // Sostituire con la password corretta
    const enteredPassword = document.getElementById("password").value;

    if (enteredPassword === correctPassword) {
        enableElements();
        document.getElementById("password-popup").style.display = "none";
        document.getElementById('button-container').style.opacity = '1';
        document.getElementById('button-container').style.pointerEvents = 'auto';
        const buttons = document.querySelectorAll('.button-container button');
        buttons.forEach(button => button.disabled = false);
    } else {
        alert("Password errata, riprova.");
    }
}

// Funzione per abilitare tutti gli elementi
function enableElements() {
    const buttons = document.querySelectorAll(".button-container button");
    const textboxes = document.querySelectorAll(".text-box");
    const updateButtons = document.querySelectorAll(".text-box-container button");

    buttons.forEach(button => {
        button.removeAttribute("disabled");
        button.style.display = "inline-block"; // Assicurati che i pulsanti siano visibili
    });
    textboxes.forEach(textbox => textbox.removeAttribute("disabled"));
    updateButtons.forEach(button => button.removeAttribute("disabled"));
}

// Funzioni per incrementare e decrementare i contatori
function increment(name, action) {
    const element = document.getElementById(`${name}-${action}`);
    element.textContent = parseInt(element.textContent) + 1;
    saveData(); // Salva i dati ogni volta che vengono modificati
}

function decrement(name, action) {
    const element = document.getElementById(`${name}-${action}`);
    element.textContent = Math.max(parseInt(element.textContent) - 1, 0);
    saveData(); // Salva i dati ogni volta che vengono modificati
}

// Funzione per aggiornare i nomi
function updateName(inputId) {
    const inputElement = document.getElementById(inputId);
    const newName = inputElement.value;
    document.getElementById(`turns-text`).textContent = document.getElementById(`turns-text`).textContent.replace(new RegExp(inputElement.placeholder, 'g'), newName);
    inputElement.placeholder = newName;
    saveData(); // Salva i dati ogni volta che vengono modificati
}

// Funzione per salvare i dati nel database Firebase
function saveData() {
    const db = firebase.database();
    const data = {
        gilberto: {
            water: document.getElementById('gilberto-water').textContent,
            cleaned: document.getElementById('gilberto-cleaned').textContent,
            brought: document.getElementById('gilberto-brought').textContent
        },
        adriano: {
            water: document.getElementById('adriano-water').textContent,
            cleaned: document.getElementById('adriano-cleaned').textContent,
            brought: document.getElementById('adriano-brought').textContent
        },
        gregorio: {
            water: document.getElementById('gregorio-water').textContent,
            cleaned: document.getElementById('gregorio-cleaned').textContent,
            brought: document.getElementById('gregorio-brought').textContent
        },
        names: {
            name1: document.getElementById('name1').placeholder,
            name2: document.getElementById('name2').placeholder,
            name3: document.getElementById('name3').placeholder
        }
    };
    db.ref('data').set(data);
}

// Funzione per caricare i dati dal database Firebase
function loadData() {
    const db = firebase.database();
    db.ref('data').once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            document.getElementById('gilberto-water').textContent = data.gilberto.water;
            document.getElementById('gilberto-cleaned').textContent = data.gilberto.cleaned;
            document.getElementById('gilberto-brought').textContent = data.gilberto.brought;
            
            document.getElementById('adriano-water').textContent = data.adriano.water;
            document.getElementById('adriano-cleaned').textContent = data.adriano.cleaned;
            document.getElementById('adriano-brought').textContent = data.adriano.brought;
            
            document.getElementById('gregorio-water').textContent = data.gregorio.water;
            document.getElementById('gregorio-cleaned').textContent = data.gregorio.cleaned;
            document.getElementById('gregorio-brought').textContent = data.gregorio.brought;
            
            document.getElementById('name1').placeholder = data.names.name1;
            document.getElementById('name2').placeholder = data.names.name2;
            document.getElementById('name3').placeholder = data.names.name3;
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

// Carica i dati quando la pagina viene caricata
window.onload = loadData;
