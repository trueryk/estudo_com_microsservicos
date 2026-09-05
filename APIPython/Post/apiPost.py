from flask import Flask, request
import requests

def main():
    app = Flask(__name__)
    
    @app.route("/estoque/post")
    def post():
        response = requests.get('http://localhost:5201/estoque')
        data = response.json()

        def post_fun(json_post):
            response_post = requests.post('http://localhost:5201/estoque', json=json_post)
            return 'Status do Post:' + str(response_post.status_code)

        def put_fun(json_put, id):
            response_put = requests.put(f'http://localhost:5201/estoque/{id}', json=json_put)
            return 'Status do put:' + str(response_put.status_code)

        prod = request.args.get('nome')
        quant = request.args.get('quant')
        put = False

        for d in data:
            if d.get('nome').lower() == prod.lower():
                json_data = {
                    'nome':d.get('nome'),
                    'qtd': d.get('qtd') + int(quant)
                }
                put = True
                return put_fun(json_data, d.get('id'))
                

        if put == False:
            json_data = {
                'nome':prod.capitalize(),
                'qtd':quant
            }
            return post_fun(json_data)
        
    app.run(debug=True, port=5000)

if __name__ == "__main__":
    main()
