const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmnxg2ulGt7mDWX0C0blBFW72Bq4y92kWnK_wIGUvhRMV73MPsfztDX3NyHXBQaO37abzEa0O-gVLs/pub?output=csv';

async function fetchAndParseCSV(url) {
    const response = await fetch(url);
    const csvText = await response.text();
    return parseCSV(csvText);
}

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const row = {};
        for (let j = 0; j < headers.length; j++) {
            row[headers[j].trim()] = values[j].trim();
        }
        data.push(row);
    }
    return data;
}

function displayShoes(shoes, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }
    container.innerHTML = ''; // Limpar conteúdo existente

    if (shoes.length === 0) {
        container.innerHTML = '<p>Nenhum calçado encontrado para este tipo.</p>';
        return;
    }

    shoes.forEach(shoe => {
        const shoeCard = document.createElement('div');
        shoeCard.className = 'shoe-card';
        shoeCard.innerHTML = `
            <img src="${shoe.Imagem}" alt="${shoe.Nome}">
            <h3>${shoe.Nome}</h3>
            <p><strong>COD:</strong> ${shoe.COD}</p>
            <p><strong>Marca:</strong> ${shoe.Marca}</p>
            <p><strong>Tipo:</strong> ${shoe.Tipo}</p>
            <p><strong>Cor:</strong> ${shoe.Cor}</p>
            <p><strong>Numeração:</strong> ${shoe.Numeracao}</p>
            <p><strong>Descrição:</strong> ${shoe.Descricao}</p>
        `;
        container.appendChild(shoeCard);
    });
}

// Lógica para carregar os dados e exibir na página atual
document.addEventListener('DOMContentLoaded', async () => {
    const allShoes = await fetchAndParseCSV(SPREADSHEET_URL);
    const currentPage = window.location.pathname.split('/').pop();
    let filteredShoes = [];
    let containerId = 'shoes-container'; // ID padrão do container

    if (currentPage === 'botas.html') {
        filteredShoes = allShoes.filter(shoe => shoe.Tipo && shoe.Tipo.toLowerCase() === 'bota');
    } else if (currentPage === 'sapatos.html') {
        filteredShoes = allShoes.filter(shoe => shoe.Tipo && shoe.Tipo.toLowerCase() === 'sapato');
    } else if (currentPage === 'tenis.html') {
        filteredShoes = allShoes.filter(shoe => shoe.Tipo && shoe.Tipo.toLowerCase() === 'tênis');
    } else if (currentPage === 'flats.html') {
        filteredShoes = allShoes.filter(shoe => shoe.Tipo && shoe.Tipo.toLowerCase() === 'sandália');
    } else if (currentPage === 'outlet.html') {
        // No momento, o outlet exibe todos os calçados. Se houver um tipo 'outlet' na planilha, ajustar aqui.
        filteredShoes = allShoes;
    } else {
        // Para a página principal ou outros, exibir todos os calçados
        filteredShoes = allShoes;
    }
    displayShoes(filteredShoes, containerId);
});
