from flask import Blueprint, jsonify, request
import os 
from dotenv import load_dotenv
from db_model.mysql import conn_mysqldb
from flask_cors import CORS, cross_origin

user_blueprint = Blueprint('user', __name__)

#좋아요 조회 
@user_blueprint.route('/user/likes', methods=['GET'])
@cross_origin()
def getLikes():
  #쿼리파라미터에서 movieId, userId 추출 
  movieId = request.args.get('movieId')
  userId = request.args.get('userId')
  
  try:
    conn, cur = conn_mysqldb()
    cur.execute("SELECT * FROM likes WHERE movie_Id = %s AND user_Id = %s", (movieId, userId))
    result = cur.fetchone()
    
    return jsonify({"success": True, "data": result})
  
  except Exception as e:
    print(e)
    return jsonify({'success': False, 'message': str(e)})
  
  finally:
    cur.close()
    conn.close()

#좋아요 추가 
@user_blueprint.route('/user/likes', methods=['POST'])
@cross_origin()
def addLikes():
  data = request.get_json()
  movieId = data.get('movieId')
  userId = data.get('userId')
  try: 
    conn, cur = conn_mysqldb()
    cur.execute("INSERT INTO likes (movie_Id, user_Id) VALUES (%s, %s)", (movieId, userId))
    conn.commit()
    return jsonify({'success': True, 'message': "찜 목록에 추가되었습니다."})
  
  except Exception as e:
    print(e)
    return jsonify({'success': False, 'message': str(e)})
  
  finally:
    cur.close()
    conn.close()
    
    
#좋아요 삭제 
@user_blueprint.route('/user/likes', methods=['DELETE'])
@cross_origin()
def removeLike():
  data = request.get_json()
  movieId = data.get('movieId')
  userId = data.get('userId')
  try: 
    conn, cur = conn_mysqldb()
    cur.execute("DELETE FROM likes WHERE movie_Id = %s AND user_Id = %s", (movieId, userId))
    conn.commit()
    
    return jsonify({"success": True, 'message': "찜 목록에서 삭제되었습니다."})
  
  except Exception as e:
    print(e)
    return jsonify({'success': False, 'message': str(e)})
  
  finally:
    cur.close()
    conn.close()
    
  
  