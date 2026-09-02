const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmnxg2ulGt7mDWX0C0blBFW72Bq4y92kWnK_wIGUvhRMV73MPsfztDX3NyHXBQaO37abzEa0O-gVLs/pub?output=csv';

async function fetchAndParseCSV(url) {
    const response = await fetch(url);
    const csvText = await response.text();
    return parseCSV(csvText);
}

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const values = [];
        let inQuote = false;
        let currentField = '';

        for (let j = 0; j < line.length; j++) {
            const char = line[j];

            if (char === '"') {
                inQuote = !inQuote;
                // Handle escaped quotes: if the next char is also a quote, it\'s an escaped quote
                if (inQuote && line[j + 1] === '"') {
                    currentField += '"';
                    j++; // Skip the next quote
                }
            } else if (char === ',' && !inQuote) {
                values.push(currentField.trim());
                currentField = '';
            } else {
                currentField += char;
            }
        }
        values.push(currentField.trim()); // Add the last field

        const row = {};
        for (let j = 0; j < headers.length; j++) {
            row[headers[j]] = values[j] !== undefined ? values[j].trim() : ''; // Handle cases where values might be missing
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
            <p><strong>COD:</strong> ${shoe.COD}<strong>&emsp;</strong><strong>Marca:</strong> ${shoe.Marca}</p>
            <p><strong>Cor:</strong> ${shoe.Cor}</p>
            <p><strong>Numeração disponível:</strong></p>
            <p class="shoe-numeration">${shoe.Numeracao.split(';').map(num => `<span class="numeration-box">${num.trim()}</span>`).join('')}</p>
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
