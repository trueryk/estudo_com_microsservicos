from flask import Flask, request
import requests

def main():
    app = Flask(__name__)

    @app.route("/estoque/delete")
    def delete():
        id = str(request.args.get('id'))
        response = requests.delete(f'http://localhost:5201/estoque/{id}')
        return str(response.status_code)
        

    app.run(debug=True, port=5003)

if __name__ == "__main__":
    main()
