import mysql from "mysql2";
import config from "config";

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } = config.get("DB");
//const DB = {
  //    DB_USERNAME: "drivewit_sara",
  //     DB_PASSWORD: "saradb",
  //     DB_NAME: "drivewit_saradb",
  //     DB_HOST: "drivewithmillionare.com"
  //  }

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME
}).promise();


async function getAllData() {
    try {
        const [result] = await pool.query('SHOW TABLES');
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}


async function getData() {
    try {
        const [result] = await pool.query(`SELECT * FROM users`);
        return result
    } catch (error) {
        console.error(error);
    }
}

async function getDatas() {
    try {
        const [result] = await pool.query(`SELECT * FROM posts`);
        return result
    } catch (error) {
        console.error(error);
    }
}

async function data() {
    try {
        const [result] = await pool.query('DELETE FROM posts where id=12');
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}


console.log("Connected");
// getDatas()
export { getAllData, getData, pool, getDatas }
