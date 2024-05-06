//Recupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

for (let i = 0; i < pieces.length; i++){
    //creation des balises
    const article = pieces[i] 
    console.log(article)
    //Rattachement à nos balises créés au DOM
    const sectionFiches = document.querySelector('.fiches')

    const pieceElement = document.createElement("article")

    const imageElement = document.createElement("img") 
    imageElement.src = article.image 

    const nomElement = document.createElement("h2")
    nomElement.innerText = article.nom  

    const prixElement = document.createElement("p")
    prixElement.innerText = `Prix: ${article.prix} £ (${article.prix < 35 ?`£`: `£££`})`

    const categorieElement = document.createElement("p")
    categorieElement.innerText = article.categorie ?? ("aucune catégorie")

    const descriptionElement = document.createElement("p")
    descriptionElement.innerText = article.description ?? ("aucune description pour le moment")

    const disponibiliteElement = document.createElement("p")

    disponibiliteElement.innerText = article.disponibilité ? "En stock" : "Rupture de stock"

    //On rattache la balise article à la section fiche
    sectionFiches.appendChild(pieceElement)

    //On rattache les texte, image à pieceElement 
    pieceElement.appendChild(imageElement)
    pieceElement.appendChild(nomElement)
    pieceElement.appendChild(prixElement)
    pieceElement.appendChild(categorieElement)
    pieceElement.appendChild(descriptionElement)
    pieceElement.appendChild(disponibiliteElement)
}
 
//trier par ordre croissant
const buttonTrier = document.querySelector(".btn-trier");
buttonTrier.addEventListener("click", ()=>{
    const pieceOrdonne = Array.from(pieces)
    
    //filtrer les pieces non abordables
    pieceOrdonne.sort((a, b) => a.prix - b.prix)

    // Sélectionner la section où afficher les pièces filtrées
    const sectionFiches = document.querySelector(".fiches")

    // Nettoyer la section avant d'ajouter les nouvelles pièces
    sectionFiches.innerHTML = ''

    //parcourir l'ensemble des pieces ordonnées
    pieceOrdonne.forEach(piece =>{
        const article = document.createElement('article')
        const imageElement = document.createElement('img')
        const nomElement = document.createElement('h2')
        const prixElement = document.createElement('p')
        const categorieElement = document.createElement('p')
        const descriptionElement = document.createElement('p')
        const disponibiliteElement = document.createElement('p')

        //remplir les donneé html
        imageElement.src = piece.image 
        nomElement.innerText = piece.nom
        prixElement.innerText = `Prix: ${piece.prix} £ (${piece.prix < 35 ? '£' : '£££'})`
        categorieElement.innerText = piece.categorie ?? "aucune catégorie"
        descriptionElement.innerText = piece.description ?? "aucun descriprion pour le moment"
        disponibiliteElement.innerText = piece.disponibilité ? "En stock" : "Rupture de stock"

        //attacher l'article à la section
        article.appendChild(imageElement)
        article.appendChild(nomElement)
        article.appendChild(prixElement)
        article.appendChild(categorieElement)
        article.appendChild(descriptionElement)
        article.appendChild(disponibiliteElement)

        //attacher l'article à la section
        sectionFiches.appendChild(article)

    })
})

// fonction filtrer les pieces abordables
const buttonFiltrer = document.querySelector(".btn-filtrer")
buttonFiltrer.addEventListener('click', ()=>{

    //filtrer les pieces non abordables
    const pieceNonAbordable = Array.from(pieces) 
    pieceNonAbordable.filter(piece => piece.prix > 35)

    // Sélectionner la section où afficher les pièces filtrées
    const sectionFiches = document.querySelector('.fiches')

    // Nettoyer la section avant d'ajouter les nouvelles pièces
    sectionFiches.innerHTML = ''

    // Parcourir les pièces non abordables et les afficher
    pieceNonAbordable.forEach(piece=>{
        const article = document.createElement('article')
        const imageElement = document.createElement('img')
        const nomElement = document.createElement('h2')
        const prixElement = document.createElement('p')
        const categorieElement = document.createElement('p')
        const descriptionElement = document.createElement('p')
        const disponibiliteElement = document.createElement('p')

        //remplir les donneé html
        imageElement.src = piece.image 
        nomElement.innerText = piece.nom
        prixElement.innerText = `Prix: ${piece.prix} £ (${piece.prix < 35 ? '£' : '£££'})`
        categorieElement.innerText = piece.categorie ?? "aucune catégorie"
        descriptionElement.innerText = piece.description ?? "aucun descriprion pour le moment"
        disponibiliteElement.innerText = piece.disponibilité ? "En stock" : "Rupture de stock"

        //attacher l'article à la section
        article.appendChild(imageElement)
        article.appendChild(nomElement)
        article.appendChild(prixElement)
        article.appendChild(categorieElement)
        article.appendChild(descriptionElement)
        article.appendChild(disponibiliteElement)

        //attacher l'article à la section
        sectionFiches.appendChild(article)
    })
})

//trier par ordre décroissant
const buttonDecroissant = document.querySelector(".btn-decroissant");
buttonDecroissant.addEventListener("click", ()=>{
    const pieceOrdonne = Array.from(pieces)
    pieceOrdonne.sort(function (a, b){
        return b.prix - a.prix
    })
    console.log(pieceOrdonne)
})

//filtrer les pieces sans description
const buttonNoDescription = document.querySelector(".btn-nodesc")
buttonNoDescription.addEventListener("click",()=>{
    const pieceFiltrer = pieces.filter(function(piece){
        return piece.description
    })
    console.log(pieceFiltrer)
})


const noms = pieces.map(piece => piece.nom)

for(let i = pieces.length - 1; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1)
    }
}

const abordableElement = document.createElement("ul")
for(let i = 0; i < noms.length; i++){
    const mesElement = document.createElement("li")
    mesElement.innerText = noms[i]
    abordableElement.appendChild(mesElement)
}

document.querySelector('.abordable')
    .appendChild(abordableElement)

const nomDisponible = pieces.map(piece => piece.nom)
const prixDisponible = pieces.map(piece => piece.prix)

for(let i = pieces.length -1; i >= 0; i--){
    if(pieces[i].disponibilité === false){
        nomDisponible.splice(i,1)
        prixDisponible.splice(i,1)
    }
}

const disponibleElement = document.createElement("ul")
for(let i = 0; i < nomDisponible.length; i++){
    const nomElement = document.createElement("li")
    nomElement.innerText = `${nomDisponible[i]} - ${prixDisponible[i]} £`
    disponibleElement.appendChild(nomElement)
}
document.querySelector(".disponible").appendChild(disponibleElement)