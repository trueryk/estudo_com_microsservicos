from flask import Flask, request
from flask_cors import cross_origin

import requests

def main():
    app = Flask(__name__)

    
    @app.route("/estoque/get")
    @cross_origin('/*')
    def get():
        response = requests.get('http://localhost:5200/estoque')
        data = response.json()
    
        filtro = request.args.get('filtro', default='Todos')
            
        json_get = []
        for d in data:
            # Definir prioridade
            status = "Normal"
            if(d.get('qtd') == 0):
                status="Esgotado"
            elif(d.get('qtd') <= 10 ):
                status="Esgotando"
            elif(d.get('qtd') <= 50):
                status = "Atenção"
            elif(d.get('qtd') <= 100):
                status = "Atenção Moderada"
    
            json_get.append({
                "id": d.get('id'),
                "produto":d.get('nome'),
                "quantidade":d.get('qtd'),
                "status": status
            })
            json_response = [item for item in json_get if item.get('status').lower() == filtro.lower() or filtro == 'Todos']
        return json_response
    
    app.run(debug=True, port=5000)

if __name__ == "__main__":
    main()
