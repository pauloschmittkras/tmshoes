import requests

SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmnxg2ulGt7mDWX0C0blBFW72Bq4y92kWnK_wIGUvhRMV73MPsfztDX3NyHXBQaO37abzEa0O-gVLs/pub?output=csv'
LOCAL_CSV_PATH = 'products.csv'

def download_csv(url, path):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors
        with open(path, 'w', encoding='utf-8') as f:
            f.write(response.text)
        print(f"CSV baixado e salvo como '{path}' com sucesso.")
    except requests.exceptions.RequestException as e:
        print(f"Erro ao baixar o CSV: {e}")

if __name__ == "__main__":
    download_csv(SPREADSHEET_URL, LOCAL_CSV_PATH)
