from flask import Flask, jsonify
import requests

app = Flask(__name__)

JSONPLACEHOLDER_URL = "https://jsonplaceholder.typicode.com"

@app.route('/<int:post_id>', methods = ['GET'])

def post_and_coments(post_id):
    # Busca o post selecionado
    busca_post = requests.get(f"{JSONPLACEHOLDER_URL}/post/{post_id}")
    post = busca_post.json

    # Busca os comentarios do post selecionado
    busca_comentario = requests.get(f"{JSONPLACEHOLDER_URL}/post/{post_id}/coments")
    coments = busca_comentario.json

    return jsonify(post)

app.run(debug=True)