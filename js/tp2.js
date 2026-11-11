// TP : Mes notes du semestre - votre code ici


const formulaire  = document.querySelector("#formulaire");
const matiereInput = document.querySelector("#matiere");
const noteInput   = document.querySelector("#note");
const coefInput   = document.querySelector("#coef");     
const erreur      = document.querySelector("#erreur");
const liste       = document.querySelector("#liste");

const nombreSpan  = document.querySelector("#nombre");
const moyenneSpan = document.querySelector("#moyenne");
const mentionSpan = document.querySelector("#mention");

const notes = [];   


function mettreAJourResultats() {
  nombreSpan.textContent = notes.length;

  if (notes.length === 0) {
    moyenneSpan.textContent = "-";
    mentionSpan.textContent = "-";
    return;
  }

  let somme = 0;
  let sommeCoef = 0;
  for (let i = 0; i < notes.length; i++) {
    somme     += notes[i].note * notes[i].coef;
    sommeCoef += notes[i].coef;
  }

  const moyenne = somme / sommeCoef;
  moyenneSpan.textContent = moyenne.toFixed(2);

  let mention;
  if (moyenne < 10)      mention = "Ajourné";       
  else if (moyenne < 12) mention = "Passable";
  else if (moyenne < 14) mention = "Assez bien";
  else if (moyenne < 16) mention = "Bien";
  else                   mention = "Très bien";
  mentionSpan.textContent = mention;
}


function afficherNotes() {
  liste.innerHTML = "";

  for (let i = 0; i < notes.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${notes[i].matiere} : ${notes[i].note}/20 (coef ${notes[i].coef})`;

    
    li.classList.add(notes[i].note >= 10 ? "reussi" : "echoue"); 

    
    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.type = "button";
    boutonSupprimer.textContent = "×";
    boutonSupprimer.classList.add("supprimer");
    boutonSupprimer.setAttribute("data-index", i);
    li.appendChild(boutonSupprimer);

    liste.appendChild(li);
  }

  mettreAJourResultats();   
}



formulaire.addEventListener("submit", (e) => {
  e.preventDefault();

  const matiere = matiereInput.value.trim();
  const note    = Number(noteInput.value);
  const coef    = Number(coefInput.value);


  if (
    matiere === "" ||
    noteInput.value.trim() === "" ||
    Number.isNaN(note) || note < 0 || note > 20 ||
    Number.isNaN(coef) || coef < 1
  ) {
    erreur.textContent = "Matière vide, note hors 0–20 ou coefficient invalide.";
    return;
  }
  erreur.textContent = "";

  notes.push({ matiere, note, coef });
  formulaire.reset();
  noteInput.classList.remove("invalide");
  afficherNotes();          
});


liste.addEventListener("click", (e) => {
  if (e.target.classList.contains("supprimer")) {
    const index = Number(e.target.getAttribute("data-index"));
    notes.splice(index, 1);
    afficherNotes();
  }
});

noteInput.addEventListener("input", () => {
  const v = noteInput.value.trim();
  const n = Number(v);

  if (v === "" || Number.isNaN(n) || n < 0 || n > 20) {
    noteInput.classList.add("invalide");
  } else {
    noteInput.classList.remove("invalide");
  }
});

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "Escape":
      formulaire.reset();
      erreur.textContent = "";
      noteInput.classList.remove("invalide");
      break;

    case "Delete":
      if (e.target.tagName !== "INPUT" && notes.length > 0) {
        notes.pop();
        afficherNotes();
      }
      break;
  }
});


afficherNotes();
