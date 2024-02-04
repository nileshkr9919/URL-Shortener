import { Request, Response } from 'express';
import { URLService } from '../services';

export const URLController = {
    shortenURL: async (req: Request, res: Response) => {
        try {
            const { longURL } = req.body;

            if (!longURL) {
                return res.status(400).json({ error: 'Long URL is required' });
            }

            const url = await URLService.findOrCreate(longURL);

            return res.status(200).json({ shortenedURL: encodeURI(`${process.env.HOST_URL}/${url.shortKey}`) });
        } catch (error) {
            console.error('Error shortening URL:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    redirectToOriginalURL: async (req: Request, res: Response) => {
        try {
            const { shortKey } = req.params;

            if (!shortKey) {
                return res.status(400).json({ error: 'Short key is required' });
            }

            const url = await URLService.findOne(shortKey);

            if (!url) {
                return res.status(404).json({ error: 'URL not found' });
            }

            return res.redirect(url.longURL);
        } catch (error) {
            console.error('Error retrieving shortened URL:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
};
