import psycopg2
import psycopg2.extras
import os

# connection details
DB_NAME = os.environ.get('DB_NAME', 'yacs')
DB_USER = os.environ.get('DB_USER', None)
DB_HOST = os.environ.get('DB_HOST', 'localhost')
DB_PORT = os.environ.get('DB_PORT', None)
DB_PASS = os.environ.get('DB_PASS', None)

class database():
    def connect(self):
        # if we cannot connect to db, then app is useless, so better crash, don't catch error here.
        self.conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASS,
            host=DB_HOST,
            port=DB_PORT,
        )
        print("[INFO] Database Connected")

    def close(self):
        self.conn.close()

    def execute(self, sql, args, isSELECT=True):
        cur = self.conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        ret = None
        try:
            if isSELECT:
                cur.execute(sql, args)
                ret = cur.fetchall()
            else:
                cur.execute(sql, args)
                ret = 0
                self.conn.commit()

        except psycopg2.Error as e:
            print("DATABASE ERROR: ", end="")
            print(e)
            return (ret, e)

        return (ret, None)

    def get_connection(self):
        return self.conn

    def tableExists(self, table):
        exist = False
        try:
            cur = self.conn.cursor()
            query = "SELECT table_name FROM information_schema.tables WHERE table_name='" + table + "'"
            cur.execute(query)
            exist = cur.fetchone()[0]
            cur.close()
        except psycopg2.Error as e:
            print(e)
        return exist

db = database()
db.connect()
