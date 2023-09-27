from flask import Blueprint, jsonify, request
import os 
from dotenv import load_dotenv
from db_model.mysql import conn_mysqldb
from flask_cors import CORS, cross_origin

user_blueprint = Blueprint('user', __name__)