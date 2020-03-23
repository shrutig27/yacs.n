#!/usr/bin/python3
from flask import Flask
from flask import send_from_directory
from flask import jsonify
from flask import Response
from flask import request
from flask import redirect
from flask import url_for
import db.connection as connection
import db.classinfo as ClassInfo
import db.courses as Courses
import db.semester_date_mapping as DateMapping
from io import StringIO

# - init interfaces to db
db_conn = connection.db
class_info = ClassInfo.ClassInfo(db_conn)
courses = Courses.Courses(db_conn)
date_range_map = DateMapping.semester_date_mapping(db_conn)

app = Flask(
    __name__,
    template_folder='./public/templates')

# - data routes

@app.route('/api/class', methods=['GET'])
def get_classes():
    return jsonify(class_info.get_classes_full())


@app.route('/api/department', methods=['GET'])
def get_departments():
    return jsonify(class_info.get_departments())


@app.route('/api/subsemester', methods=['GET'])
def get_subsemesters():
    return jsonify(class_info.get_subsemesters())

@app.route('/api/semester', methods=['GET'])
def get_semesters():
    return jsonify(class_info.get_semesters())


@app.route('/api/bulkCourseUpload', methods=['POST'])
def uploadHandler():
    # check for user files
    if not len(request.files):
        return Response("Need a *.csv file", 400)
    # get file
    csv_file = StringIO(request.files['file'].read().decode())
    isSuccess, error = courses.populate_from_csv(csv_file)
    if (isSuccess):
        return Response(status=200)
    else:
        print(error)
        return Response(error.__str__(), status=500)

@app.route('/api/mapDateRangeToSemesterPart', methods=['POST'])
def map_date_range_to_semester_part_handler():
    if (request.form and request.form['date_start'] and request.form['date_end'] and request.form['semester_part_name']):
        date_range_map.insert(request.form['date_start'], request.form['date_end'], request.form['semester_part_name'])
        return Response("received")
    return Response("Did not receive proper form data")

if __name__ == '__main__':
    app.run()
