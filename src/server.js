import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { getAllContacts, getContactsById} from './services/servicesContacts.js';

dotenv.config();
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();
        res.status(200).json({
            status: 200,
            message: 'Successufully found contacts!',
            data: contacts,
        });
    });

        app.get('/contacts/:contactsId', async (req, res,next) => {
        const { contactsId } = req.params;
        const contact = await getContactsById(contactsId);

            if (!contact) {
                res.status(404).json({
                    message: 'Not found',
                });
                return;
            }
            res.status(200).json({
                status: 200,
                message: `Successfully found contact with id ${contactsId}!`,
                data: contact,
            });
    });

    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Route not found',
        });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message,
        });
    });

    app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
};
