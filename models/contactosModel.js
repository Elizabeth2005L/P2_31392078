import sqlite3 from "sqlite3";
import path from "node:path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SQL para crear la tabla de la base de datos
const sql = `CREATE TABLE IF NOT EXISTS Comments (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    comment TEXT NOT NULL,
    email TEXT NOT NULL,
    ip TEXT NOT NULL,
    date NUMERIC NOT NULL);`

class contactoModel {
  constructor() {
    //Utilizamos el path para verificar si existe la base de datos
    const dbPath = path.resolve(__dirname, "./mydb.db");

    // Creamos la conexion a la base de datos
    this.connection = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Conectado a la base de datos.");
      // Crea la tabla si no existe
      this.connection.get(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Comments'",
        (err, table) => {
          if (table === undefined) {
            // Crea la tabla
            this.connection.run(sql);
          }
        }
      );
    });
  }

  //Metodo para crear
  async create({ name, comment, email, ip, date }) {
    try {
      const createComment = await this.connection.run(
        "INSERT INTO Comments (name,comment,email,ip,date) VALUES (?,?,?,?,?)",
        name,
        comment,
        email,
        ip,
        date,
        function (err) {
          if (err) {
            return console.error(err.message);
          }
          console.log(`Se ha insertado una fila con rowid ${this.lastID}`);
        }
      );
      return { status: "creado", createComment };
    } catch (error) {
      return { status: "error", error };
    }
  }

  //Metodo para Obtener todos los datos
  async getAll() {
    try {
      let comments = [];
      await new Promise((resolve, reject) => {
        this.connection.all("SELECT * FROM Comments", (err, rows) => {
          if (err) {
            reject(err);
          } else {
            rows.forEach((element) => {
              comments.push(element);
            });
            resolve();
          }
        });
      });

      return comments;
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }
}

// Exportamos una sola instancia del Modelo
export default new contactoModel();