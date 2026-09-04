# TM Shoes

Este é o repositório do site TM Shoes.

## Como Executar o Projeto

Para visualizar o site localmente, basta abrir o arquivo `index.html` em seu navegador web preferido.

## Estrutura do Projeto

- `index.html`: Página inicial do site.
- `botas.html`: Página de produtos de botas.
- `tenis.html`: Página de produtos de tênis.
- `sapatos.html`: Página de produtos de sapatos.
- `flats.html`: Página de produtos flats.
- `outlet.html`: Página de produtos outlet.
- `style.css`: Folha de estilos CSS para o design do site.
- `script.js`: Arquivo JavaScript para funcionalidades interativas.
- `download_products.py`: Script Python para gerenciamento de produtos (e.g., atualização de planilha).

## Configuração de Produtos

### Inserção de Imagens

Para adicionar imagens aos produtos, siga os passos abaixo:

1.  Acesse o site [imgbb.com](https://imgbb.com/).
2.  Crie uma conta no site. Recomenda-se usar um nome de usuário simples.
3.  Faça o upload das imagens dos seus produtos. Você pode criar um álbum ou fazer o upload direto das imagens.
4.  Após o upload, copie o link correspondente da opção "códigos para incorporar". O link deve ser similar a este exemplo: `https://i.ibb.co/1GrHbr30/bota.png`.
5.  Insira este link na célula correspondente da planilha de produtos, na coluna destinada às imagens.

### Configuração da Planilha de Produtos

A planilha de produtos deve seguir as seguintes diretrizes para garantir o correto funcionamento do sistema:

*   **Imagens**: As imagens devem ser adicionadas através do link gerado no site [imgbb.com](https://imgbb.com/) e colocado na célula correspondente à imagem do produto.
*   **Numeração de Calçados**: A numeração dos calçados deve ser adicionada separada por ponto e vírgula (`;`). Por exemplo: `32;33;34;35;36;43`.
*   **Publicação da Planilha**: A planilha deve ser publicada na web para que o sistema possa acessá-la. Siga os passos:
    1.  No Google Sheets (ou similar), vá em `Arquivo` > `Compartilhar` > `Publicar na web`.
    2.  Selecione a opção "Documento inteiro" e clique em "Publicar".
    3.  Copie o link gerado e configure-o no script `download_products.py`.

## Atualização de Planilha de Produtos

O script `download_products.py` é responsável por baixar e processar os dados de produtos de uma planilha publicada na web, atualizando o site com as informações mais recentes.

**Pré-requisitos:**

1.  Certifique-se de ter Python instalado em sua máquina.
2.  Instale as dependências necessárias executando:
    ```bash
    pip install pandas openpyxl gspread oauth2client
    ```

**Configuração do Link da Planilha:**

Para que o script funcione corretamente, você precisará configurar o link da sua planilha publicada na web dentro do arquivo `download_products.py`.

1.  Abra o arquivo [`download_products.py`](download_products.py) no seu editor de texto.
2.  Localize a variável responsável por armazenar o URL da planilha (ex: `SPREADSHEET_URL = "SEU_LINK_DA_PLANILHA_AQUI"`).
3.  Substitua `"SEU_LINK_DA_PLANILHA_AQUI"` pelo link da sua planilha publicada.

**Instruções para executar `download_products.py`:**

1.  Certifique-se de ter configurado o link da planilha conforme as instruções acima.
2.  Abra o terminal na pasta raiz do projeto.
3.  Execute o script:
    ```bash
    python download_products.py
    ```
Este script irá baixar os dados da planilha e atualizar os arquivos HTML do site com as informações dos produtos.
