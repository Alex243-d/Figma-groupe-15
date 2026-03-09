// 1. On prépare notre tableau avec le CHEMIN EXACT vers tes 9 stickers

const contenuCases = [
    '../pictures/shoes_for_scratch.png', '../pictures/shoes_for_scratch.png', '../pictures/shoes_for_scratch.png',
    '../pictures/sock_for_scratch.png', '../pictures/sock_for_scratch.png', '../pictures/sock_for_scratch.png',
    '../pictures/spray_for_scratch.png', '../pictures/spray_for_scratch.png', '../pictures/spray_for_scratch.png'
];

// ... (le reste du code JS ne change pas du tout !) ...
// 2. Fonction pour mélanger les images aléatoirement (Algorithme de Fisher-Yates)
function melangerTableau(tableau) {
    for (let i = tableau.length - 1; i > 0; i--) {
        // On choisit un index au hasard
        const j = Math.floor(Math.random() * (i + 1));
        // On inverse la case actuelle avec la case choisie au hasard
        let temp = tableau[i];
        tableau[i] = tableau[j];
        tableau[j] = temp;
    }
}

// On exécute la fonction de mélange dès le chargement de la page
melangerTableau(contenuCases);

// 3. On récupère tous nos carrés rouges dans le HTML
const carres = document.querySelectorAll('.carre-rouge');

// 4. Variables pour suivre l'état de la partie
let compteursImages = {}; // Un objet pour compter combien on a trouvé de chaque item
let essaisRestants = 5;   // Le joueur n'a le droit de gratter que 5 cases maximum
let jeuTermine = false;   // Pour bloquer les clics une fois la partie finie

// 5. On ajoute l'action du clic sur CHAQUE carré rouge
carres.forEach(function(carre, index) {
    
    carre.addEventListener('click', function() {
        
        // Si le jeu est fini OU que le carré a déjà été cliqué, on ne fait rien
        if (jeuTermine === true || this.classList.contains('gratte')) {
            return; 
        }

        // On marque le carré comme "gratté"
        this.classList.add('gratte');
        
        // On enlève un essai au joueur
        essaisRestants = essaisRestants - 1;

        // On va chercher l'image qui correspond à ce carré dans notre tableau mélangé
        const imageTrouvee = contenuCases[index];

        // On affiche ton sticker sur le carré avec le CSS
        this.style.backgroundImage = `url('${imageTrouvee}')`;
        this.style.backgroundColor = '#222222'; // Un fond sombre pour faire ressortir tes stickers
        this.style.backgroundSize = '80%'; // L'image prend 80% de la case
        this.style.backgroundRepeat = 'no-repeat';
        this.style.backgroundPosition = 'center';

        // --- SYSTÈME DE COMPTAGE ---
        
        // Si on a déjà trouvé cette image avant, on ajoute +1 à son compteur
        if (compteursImages[imageTrouvee]) {
            compteursImages[imageTrouvee] = compteursImages[imageTrouvee] + 1;
        } else {
            // Sinon, c'est la première fois, on met le compteur à 1
            compteursImages[imageTrouvee] = 1;
        }

        // VÉRIFICATION : GAGNÉ OU PERDU ?
        
        // CONDITION DE VICTOIRE : A-t-on trouvé 3 images identiques ?
        if (compteursImages[imageTrouvee] === 3) {
            jeuTermine = true; // On bloque le jeu
            
            // setTimeout pour attendre 0.5 seconde pour que le joueur voie bien son 3ème sticker
            setTimeout(function() {
                alert("Félicitations ! Tu as un match parfait !");
                window.location.href = '../page_GAGNANT_PERDANT/gagnant.html'; // Redirection vers la victoire
            }, 500);
            return; 
        }

        // CONDITION DE DÉFAITE : Plus d'essais et on n'a pas gagné ?
        if (essaisRestants === 0) {
            jeuTermine = true; // On bloque le jeu
            
            setTimeout(function() {
                alert("Aïe, c'est raté pour cette fois. Retente ta chance !");
                window.location.href = '../page_GAGNANT_PERDANT/perdant.html'; // Redirection vers la défaite
            }, 500);
        }

    });
});