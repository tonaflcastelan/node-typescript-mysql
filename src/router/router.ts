import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {

    const query = `SELECT * FROM heroes`;

    MySQL.execQuery(query, (err: any, heroes: Object[]) => {
        if (err) {
            res.status(400).json({
                status: false,
                error: err
            })
        } else {
            res.json({
                success: true,
                heroes
            })
        }
    })
})

router.get('/heroes/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const query = `SELECT * FROM heroes WHERE id = ${MySQL.instance.cnn.escape(id)}`;

    MySQL.execQuery(query, (err: any, heroes: Object[]) => {
        if (err) {
            res.status(400).json({
                status: false,
                error: err
            })
        } else {
            res.json({
                success: true,
                heroes
            })
        }
    })
})

export default router;