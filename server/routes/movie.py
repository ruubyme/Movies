from flask import Blueprint, jsonify, request
import os 
from dotenv import load_dotenv
from db_model.mysql import conn_mysqldb
from flask_cors import CORS, cross_origin

movie_blueprint = Blueprint('movie', __name__)

@movie_blueprint.route('/movie/reviews', methods=['GET'])
@cross_origin()
def getMovieReviews():
  movieId = request.args.get('movieId')
  
  try:
    conn, cur = conn_mysqldb()
    cur.execute("SELECT * FROM reviews WHERE movie_id = %s", (movieId,))
    result = cur.fetchall()
    
    return jsonify({"success": True, "data": result})

  except Exception as e:
    print(e)
    return jsonify({"success": False, 'message': str(e)})
  
  finally:
    cur.close()
    conn.close()

