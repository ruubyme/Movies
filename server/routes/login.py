from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
import os
import requests
from db_model.mysql import conn_mysqldb
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token
from datetime import timedelta

login_blueprint = Blueprint('login', __name__)

load_dotenv('.env.local')

#카카오 로그인 
@login_blueprint.route('/login/kakao', methods=['POST'])
@cross_origin()
def login():
  code = request.args.get('code')
  
  CLIENT_ID = os.getenv('NEXT_PUBLIC_KAKAOLOGIN_APPKEY')
  KAKAO_REDIRECT_URI = "http://localhost:3000/login/kakao";
  
  #API 요청
  response = requests.post(
    'https://kauth.kakao.com/oauth/token',
    data = {
      'grant_type': 'authorization_code',
      'client_id': CLIENT_ID,
      'redirect_uri': KAKAO_REDIRECT_URI,
      'code': code
    }
  )
  
  #응답 처리 
  token_data = response.json()
  print(token_data)
  access_token = token_data.get('access_token')
  
  if not access_token:
        error_description = token_data.get('error_description', 'Unknown error')
        return jsonify(success=False, error_description=error_description), 400
    
    # 액세스 토큰을 사용하여 사용자 정보 요청
  headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    }

  user_info_response = requests.get("https://kapi.kakao.com/v2/user/me", headers=headers)
  user_data = user_info_response.json()
    
  # 'kakao_account' 필드 아래에 'profile' 필드에서 'nickname' 값을 가져옴, id토큰 가져옴
  nickname = user_data.get('kakao_account', {}).get('profile', {}).get('nickname')
  userId = user_data.get('id')
  
  try:
    conn, cur = conn_mysqldb()
    cur.execute("SELECT * FROM users WHERE social_id = %s", (userId,))
    user_data = cur.fetchone()
    
    #신규 user이면 
    if not user_data:
      cur.execute("INSERT INTO users (social_id, username) VALUES (%s, %s)", (userId, nickname))
      conn.commit()
      
      #신규 user의 id와 username 조회 
      cur.execute("SELECT id, username FROM users WHERE social_id = %s", (userId,))
      user_data = cur.fetchone()
      
    #jwt 토큰 생성 
    access_token = create_access_token(identity=user_data["user_id"], additional_claims={'name': user_data["username"]}, expires_delta=timedelta(hours=6))
    
    return jsonify({'status': 'success', 'token': access_token, 'nickname': nickname})
      
  except Exception as e:
    print(e)
    return jsonify({'status': 'error', 'message': str(e)})
  
  finally:
    cur.close()
    conn.close()
    
    
  
  