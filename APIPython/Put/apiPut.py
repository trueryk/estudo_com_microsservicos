from flask import Flask, request
from flask_cors import cross_origin
import requests

def main():
    app = Flask(__name__)

    @app.route("/estoque/put")
    @cross_origin('/*')
    def put():
        prod = request.args.get('nome')
        quant = request.args.get('quant', default = 0)
        id = request.args.get('id')
        json_data = {
                        'nome':prod.capitalize(),
                        'qtd':quant
                    }
        response_put = requests.put(f'http://localhost:5202/estoque/{id}', json=json_data)
        return 'Status do put:' + str(response_put.status_code)
    
        

    app.run(debug=True, port=5002)

if __name__ == "__main__":
    main()
