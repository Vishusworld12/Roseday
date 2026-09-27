from flask import Blueprint, request
from routes.RoseValidation import rose_schema, update_rose_schema
from marshmallow import ValidationError
from utils.db import getConnection


rose_route = Blueprint("RoseRoute", __name__)


# =========================
# GET ALL ROSES
# =========================
@rose_route.route("/get-roses", methods=["GET"])
def get_roses():
    try:
        mysql = getConnection()
        cursor = mysql.cursor()

        sql = "SELECT * FROM rose"
        cursor.execute(sql)

        roses = cursor.fetchall()

        cursor.close()
        mysql.close()

        roses_arr = []

        for i in roses:
            items = {
                "id": i[0],
                "title": i[1],
                "description": i[2],
                "image": i[3],
            }

            roses_arr.append(items)

        return roses_arr, 200

    except Exception as e:
        return {
            "error": str(e)
        }, 500


# =========================
# GET SINGLE ROSE
# =========================
@rose_route.route("/get-roses/<int:id>", methods=["GET"])
def get_rose_by_id(id):
    try:
        mysql = getConnection()
        cursor = mysql.cursor()

        sql = "SELECT * FROM rose WHERE id=%s"
        cursor.execute(sql, (id,))

        roses = cursor.fetchall()

        cursor.close()
        mysql.close()

        roses_arr = []

        for i in roses:
            items = {
                "id": i[0],
                "title": i[1],
                "description": i[2],
                "image": i[3],
            }

            roses_arr.append(items)

        if len(roses_arr) == 0:
            return {
                "error": "Rose not found"
            }, 404

        return roses_arr[0], 200

    except Exception as e:
        return {
            "error": str(e)
        }, 500


# =========================
# DELETE ROSE
# =========================
@rose_route.route("/delete-roses/<int:id>", methods=["DELETE"])
def delete_rose_by_id(id):
    try:
        mysql = getConnection()
        cursor = mysql.cursor()

        sql = "DELETE FROM rose WHERE id=%s"

        cursor.execute(sql, (id,))
        mysql.commit()

        cursor.close()
        mysql.close()

        return {
            "msg": "Rose Delete Successfully !"
        }, 200

    except Exception as e:
        return {
            "error": str(e)
        }, 500


# =========================
# UPDATE ROSE
# =========================
@rose_route.route("/update-rose/<int:id>", methods=["PUT"])
def update_rose_by_id(id):
    try:
        data = update_rose_schema.load(request.json)

        mysql = getConnection()
        cursor = mysql.cursor()

        sql = """
        UPDATE rose
        SET title=%s, description=%s, image=%s
        WHERE id=%s
        """

        cursor.execute(
            sql,
            (
                data["title"],
                data["desc"],
                data["image"],
                id
            )
        )

        mysql.commit()

        cursor.close()
        mysql.close()

        return {
            "msg": "Rose Update Successfully !"
        }, 200

    except ValidationError as err:
        return {
            "error": next(iter(err.messages.values()))[0]
        }, 400

    except Exception as e:
        return {
            "error": str(e)
        }, 500


# =========================
# ADD ROSE
# =========================
@rose_route.route("/add-rose", methods=["POST"])
def rose():
    mysql = None
    cursor = None

    try:
        mysql = getConnection()
        cursor = mysql.cursor()

        rose_data = rose_schema.load(request.get_json())

        sql = """
        INSERT INTO rose(title, description, image)
        VALUES (%s, %s, %s)
        """

        cursor.execute(
            sql,
            (
                rose_data["title"],
                rose_data["desc"],
                rose_data["image"]
            )
        )

        mysql.commit()

        return {
            "msg": "Rose Added in Nursery !"
        }, 200

    except ValidationError as err:
        return {
            "error": next(iter(err.messages.values()))[0]
        }, 400

    except Exception as e:
        if mysql:
            mysql.rollback()

        return {
            "error": str(e)
        }, 500

    finally:
        if cursor:
            cursor.close()

        if mysql:
            mysql.close()