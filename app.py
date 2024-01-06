"""Flask app for Cupcakes"""

from flask import Flask, render_template, jsonify, request
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_ECHO'] = True
# app.config['SECRET_KEY'] = "springboard"

connect_db(app)

@app.route("/api/cupcakes")
def get_cupcakes():
    """ GET all cupcakes in cupcakes.db as JSON. """

    cupcakes = [cupcake.to_json() for cupcake in Cupcake.query.all()]

    return jsonify(cupcakes=cupcakes)

@app.route("/api/cupcakes/<int:id>")
def get_cupcake(id):
    """ GET one cupcake by ID. Return 404 if not found. """

    cupcake = Cupcake.query.get_or_404(id)

    return jsonify(cupcake=cupcake.to_json())

@app.route("/api/cupcakes", methods=["POST"])
def create_cupcake():
    """ Create/POST a cupcakes into cupcakes.db and return it as JSON. """

    flavor = request.json.get("flavor")
    size = request.json.get("size")
    rating = request.json.get("rating")
    image = request.json.get("image")

    cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)

    db.session.add(cupcake)
    db.session.commit()

    return jsonify(cupcake=cupcake.to_json()), 201
