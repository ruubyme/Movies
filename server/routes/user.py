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
    
#user가 작성한 모든 리뷰 조회 
@user_blueprint.route('/user/reviews', methods=['GET'])
@cross_origin()
def getReviews():
  userId = request.args.get('userId')
  
  try:
    conn, cur = conn_mysqldb()
    cur.execute("SELECT * FROM reviews WHERE user_id = %s", (userId,))
    result = cur.fetchall()
    
    return jsonify({"success": True, "data": result})
  
  except Exception as e:
    print(e)
    return jsonify({'success': False, 'message': str(e)})
  
  finally:
    cur.close()
    conn.close()
    
#user의 리뷰 작성
@user_blueprint.route('/user/reviews', methods=['POST'])
@cross_origin()
def addReview():
  data = request.get_json()
  movieId = data.get('movieId')
  userId = data.get('userId')
  rating = data.get('rating')
  comment = data.get('comment')
  
  try:
    conn, cur = conn_mysqldb()
    cur.execute("INSERT INTO reviews (user_id, movie_id, rating, comment) VALUES (%s, %s, %s, %s)", (userId, movieId, rating, comment))
    conn.commit()
    
    return jsonify({"success": True, "message": "리뷰가 등록되었습니다."})
  
  except Exception as e:
    print(e)
    return jsonify({"success": False, 'message': str(e)})
  
  finally:
    cur.close()
    conn.close()
    
#user의 리뷰 삭제 
@user_blueprint.route('/user/reviews', methods=['DELETE'])
@cross_origin()
def deleteReview():
  data = request.get_json()
  movieId = data.get('movieId')
  userId = data.get('userId')
  
  try:
    conn, cur = conn_mysqldb()
    cur.execute("DELETE FROM reviews WHERE movie_id = %s AND user_id = %s", (movieId, userId))
    conn.commit()
    
    return jsonify({"success": True, "message": "리뷰가 삭제되었습니다."})
  
  except Exception as e:
    print(e)
    return jsonify({'success': False, 'message': str(e)})

  finally:
    cur.close()
    conn.close()  
    
    
  
  