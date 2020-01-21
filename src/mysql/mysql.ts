import mysql = require('mysql');

export default class MySQL
{
    private static _instance: MySQL;

    cnn: mysql.Connection;
    connected: boolean = false;

    constructor()
    {
        console.log('Clase inicializada');

        this.cnn = mysql.createConnection({
            host: '',
            user: '',
            password: '',
            database: '',
            port: 3306,
            socketPath: ''
        });
        this.connectDB();
    }

    public static get instance()
    {
        return this._instance || (this._instance = new this());
    }

    static execQuery(query: string, callback: Function)
    {
        this.instance.cnn.query(query, (err, results: Object[], fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                return callback('El registro solicitado no existe');
            } else {
                callback(null, results);
            }
        });
    }

    private connectDB()
    {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log('base de datos conectada')
        })
    }
}