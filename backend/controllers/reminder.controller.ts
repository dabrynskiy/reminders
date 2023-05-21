import pool from "../db-settings";
import { Request, Response } from "express";
import { checkBeforeCreate } from "../checks/checks";

const SUCCESS = "success";
const FAILURE = "failure";
const USER = 1;

interface IReminder {
    id: number;
    text: string;
    timestamp: string;
    person_id: number;
    completed: boolean;
}

export default class ReminderController {
    static async create(request: Request, response: Response) {
        const {text, timestamp} = request.body;

        try {
            checkBeforeCreate(text, timestamp);

            const dbResult = await pool.query(
                'INSERT INTO reminders (text, datetime, completed, person_id) values ($1, $2, $3, $4) RETURNING *', 
                [text, timestamp, false, USER]
            );

            response.json( {result: SUCCESS, reminder: <IReminder>dbResult.rows[0]} );
        } catch(error) {
            response.status(500).json({result: FAILURE, error: error});
        }
    };

    static async get(request: Request, response: Response) {
        try {
            const reminders = await pool.query('SELECT * FROM reminders');

            response.json({result: SUCCESS, reminders: <IReminder[]>reminders.rows});
        } catch (error) {
            response.status(500).json({result: FAILURE, error: error});
        }
    };

    static async getById(request: Request, response: Response) {
        try {
            const reminder = await pool.query(
                'SELECT * FROM reminders WHERE id = $1',
                [request.params.id]
            );
            response.json({result: SUCCESS, reminder: reminder.rows[0]});
        } catch (error) {
            response.status(500).json({result: FAILURE, error: error});
        }
    };

    static updateById(request: Request, response: Response): void {
        const {text, dateTime, completed} = request.body;
        const id = request.params.id;

        const updatedReminder = pool.query(
            'UPDATE reminders SET text = $1, datetime = $2, completed = $3 WHERE id = $4 RETURNING *',
            [text, dateTime, completed, id]
        );

        updatedReminder
            .then((result) => {
                response.json({result: SUCCESS, reminder: result.rows[0]});
            })
            .catch((reason) => {
                response.status(500).json({result: FAILURE, error: reason});
            });
    };

    static delete(request: Request, response: Response): void {
        const id: number = +request.params.id;

        const deletedReminder = pool.query(
            'DELETE from reminders where id = $1 RETURNING *', 
            [id]
        );

        deletedReminder
            .then((result) => {
                response.json( {result: SUCCESS, reminder: <IReminder>result.rows[0]} );
            })
            .catch((reason) => {
                response.status(500).json({result: FAILURE, error: reason});
            });
    };
};