from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from flask_jwt_extended import JWTManager

load_dotenv('.env.local')

app = Flask(__name__)
CORS(app)
app.secret_key= os.getenv('SECRET_KEY')

#jwtManager 초기화 
jwt = JWTManager(app)

#jwt 토큰의 위치 설정
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config["JWT_HEADER_TYPE"] = "Bearer"

from routes.login import login_blueprint

app.register_blueprint(login_blueprint)

if __name__ == '__main__':
  app.run(host='127.0.0.1', port='8080', debug=True)
