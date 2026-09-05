from flask import Flask, request
import requests

def main():
    app = Flask(__name__)

    @app.route("/estoque/put")
    def put():
        prod = request.args.get('nome')
        quant = request.args.get('quant', default = 0)
        id = request.args.get('id')
        json_data = {
                        'nome':prod.capitalize(),
                        'qtd':quant
                    }
        response_put = requests.put(f'http://localhost:5201/estoque/{id}', json=json_data)
        return 'Status do put:' + str(response_put.status_code)
    
        

    app.run(debug=True, port=5001)

if __name__ == "__main__":
    main()
