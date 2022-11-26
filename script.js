    const motEl = document.getElementById('mot'); 
const mauvaisesLettres = document.getElementById('mauvaises-lettres'); 
const rejouerBtn = document.getElementById('play-bouton'); 
const popup = document.getElementById('popup-contenant'); 
const notification = document.getElementById('notification-contenant'); 
const messageFinal = document.getElementById('message-final'); 

const figurePartie = document.querySelectorAll('.figure-partie');

const mots = [
    "abricot"
    ,"ananas"
    ,"citron"
    ,"kaki"
    ,"kiwi"
    ,"banane"
    ,"cassis"
    ,"cerise"]

//Selection

// Math.random = Génère un nombre aléatoire entre 0 et 1 
// Math.floor = Retourne la valeur de l’entier inférieur le plus proche
let motSelectionne = mots[Math.floor(Math.random() * mots.length)];

// console.log(mots.length);
console.log(motSelectionne);

//Les arryas
const bonnesLettresArr = [''];
const mauvaisesLettresArr = [];


//Affichage du mot   /*.split('') = séparer les lettres*/
/*.map(Passage d'une lettre à la fois) */  /*? = si : = sinon */ 

function afficherMot() {
    motEl.innerHTML = `
        ${motSelectionne
            .split('')
            .map(
                lettre => `
                    <span class="lettre">
                        ${bonnesLettresArr.includes(lettre) ? lettre : ''}  
                    </span>
                `
                )
                .join('')} 
    `;

// Pour enelver les espace et saut de ligne entre les lettres 

    const innerWord = motEl.innerText.replace(/\n/g, '');  
    // console.log(motEl.innerText, innerWord);

    if(innerWord === motSelectionne) {
        messageFinal.innerText = 'Bravo! Tu as gagné!';
        popup.style.display = 'flex';
    }
}

// Clavier

window.addEventListener('keydown', e => {
    //console.log(e.keyCode);

    // 65<keydow<90 alphabet du clavier A
    /*keycode = 65*/ /*key = A*/
    
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const lettre = e.key;

        // console.log(lettre);

        //bonnes lettres inclut dans le mot selectionné
        if(motSelectionne.includes(lettre)) {
            if(!bonnesLettresArr.includes(lettre)) {
                bonnesLettresArr.push(lettre);
    
                afficherMot() //Ajouter dans le array bonnesLettresArr[]
            } else{
                afficherNotification(); // afficher la notification
            }

        //Aucune bonnes lettres inclut dans le mot selectionné    
        } else {
            if(!mauvaisesLettresArr.includes(lettre)) {
                mauvaisesLettresArr.push(lettre);
    
                updateMauvaisesLettresEl(); //Ajouter dans le array mauvaisesLettresArr[]
            } else {
                afficherNotification();
            }
        }
    }
});

 //Afficher les mauvaies lettres
function updateMauvaisesLettresEl() {
    
    // Nombre de mauvaise lettre +1 
    mauvaisesLettres.innerHTML = `
        ${mauvaisesLettresArr.length > 0 ? '<p>Mauvaises Lettres :</p>' : ''}
        ${mauvaisesLettresArr.map (lettre => `<span> ${lettre}</span>`)}
        `;

    //Animation 


    figurePartie.forEach((partie, index) => {
        const erreurs = mauvaisesLettresArr.length;

        // nombre de bonnes letrres <inferieure nombre de mauvaises letre
        if(index < erreurs) {
            partie.style.display = 'block';
        
        //contraire
        } else {
            partie.style.display = 'none';
        }

    //GAME OVER 
    
    // nombre de mauvaises lettre = nombre de partie du corps = 6
    if(mauvaisesLettresArr.length === figurePartie.length) {
        messageFinal.innerText = 'GAME OVER!';
        popup.style.display = 'flex';
    }
    }); 
}

//Notification

function afficherNotification() {
    notification.classList.add('afficher');
    setTimeout(() => {
        notification.classList.remove('afficher');
    }, 2000);
}



//Replay  /*array.slice(0) pour remove les lettres 

rejouerBtn.addEventListener('click', () => {
    
    bonnesLettresArr.splice(0);
    mauvaisesLettresArr.splice(0);

    motSelectionne = mots[Math.floor(Math.random() * mots.length)];

    afficherMot();

    updateMauvaisesLettresEl();

    popup.style.display = 'none'
});

afficherMot();