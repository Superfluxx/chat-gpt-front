// Récupérez les éléments HTML nécessaires
const inputText = document.getElementById("inputText");
const generateButton = document.getElementById("generateButton");
const dropdownButton = document.querySelector(".dropbtn"); // Bouton du menu déroulant
const output = document.getElementById("output");
const dropdownItems = document.querySelectorAll(".dropdown-content a");

let selectedType = "soutenu"; // Par défaut

// Ajoutez un écouteur d'événement sur les éléments du menu déroulant
dropdownItems.forEach(item => {
    item.addEventListener("click", () => {
        selectedType = item.id; // Met à jour le type de langage sélectionné
        dropdownButton.textContent = item.textContent; // Met à jour le texte du bouton
        dropdownItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    });
});

// Ajoutez un événement de clic au bouton "Générer"
generateButton.addEventListener("click", async () => {
    const apiKey = "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";
    // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const phrase = inputText.value;
    const content = `Donne moi trois autres façon de dire : \"${phrase}\" dans un langage ${selectedType}. Ta réponse devra correspondre au format suivant (il ne doit pas y avoir ne numéro, seulement le réponse pure) : ###façon1###façon2###façon3###`;

    // Effectuez une requête à l'API ChatGPT via le proxy CORS Anywhere
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            messages: [{ "role": "user", "content": content }],
            max_tokens: 2048,
            model: "gpt-3.5-turbo",
        }),
    })
    .then(response => response.json()) 
    .then((data) => {
        // Traitez la réponse JSON ici
        console.log(data.choices[0].message.content); // Affichez la réponse JSON dans la console (à adapter selon vos besoins)
        var variations = data.choices[0].message.content.split("###");
        
        // Vous pouvez maintenant manipuler les données reçues et les afficher dans votre interface utilisateur
        output.innerHTML = `<p>Type de Langage : ${selectedType}</p>`;
        output.innerHTML += `<p>Variation 1: ${variations[0]}</p><p>Variation 2: ${variations[1]}</p><p>Variation 3: ${variations[2]}</p>`;
    })
    .catch((error) => {
        // Gérez les erreurs ici
        console.error("Erreur lors de la requête:", error);
        output.innerHTML = "Une erreur s'est produite lors de la requête.";
    });
});
