from flask import jsonify, make_response, request
import json

from server import app, db
from server.models import element


@app.route("/", methods=["GET", "POST"])
def main():
    if request.method == "GET":
        return make_response(jsonify([elmnt.value for elmnt in element.query.all()]), 200)
    else:
        db.session.add(element(json.loads(request.data)["task"]))
        db.session.commit()
        print([elmnt.value for elmnt in element.query.all()])
        return make_response(jsonify([elmnt.value for elmnt in element.query.all()]), 200)


@app.route("/<id>", methods=["DELETE", "PUT"])
def task(id):
    if request.method == "DELETE":
        element.query.filter_by(_id=id).delete()
        db.session.query(element).filter(element._id > id).update(
            {element._id: element._id - 1})
        db.session.commit()
        return make_response(jsonify([elmnt.value for elmnt in element.query.all()]), 200)
    else:
        db.session.query(element).filter(element._id == id).update(
            {element.value: json.loads(request.data)["value"]})
        db.session.commit()
        return make_response(jsonify([elmnt.value for elmnt in element.query.all()]), 200)
