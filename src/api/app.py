from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

JSON_URL = "https://my-json-server.typicode.com/DanieCoimbra/JsonTest" #Url da API FAKE

@app.route('/post/<int:id>') # Rota de acesso dos itens da minha API
def post_and_coments(id):
    # Busca o post selecionado
    busca_post = requests.get(f"{JSON_URL}/Personagem/{id}")
    if busca_post.status_code != 200:
        return jsonify({'error': 'Erro ao buscar o post.'}), 500
    # Adiciona o post em uma variavel  
    post = busca_post.json()

    # Busca os comentarios do post selecionado
    busca_comentario = requests.get(f"{JSON_URL}/Comentario/{id}")
    if busca_post.status_code != 200:
        return jsonify({'error': 'Erro ao buscar o post.'}), 500
    # Adiciona os comentarios em uma variavel
    coments = busca_comentario.json()

    # Retorna as duas variáveis naquela rota
    return jsonify({'Personagem': post, 'Comentarios': coments})

app.run(debug=True)