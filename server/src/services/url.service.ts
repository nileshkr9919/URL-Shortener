import { URLModel } from '../models/url.model';
import crypto from 'crypto';

export const URLService = {
    findOrCreate: async (longURL: string) => {
        try {
            let url = await URLModel.findOne({ longURL });

            if (!url) {
                const shortKey = generateShortKey(longURL);
                url = await URLModel.create({ longURL, shortKey });
            }

            return url;
        } catch (error: any) {
            throw new Error(`Error in findOrCreate: ${error.message}`);
        }
    },

    findOne: async (shortKey: string) => {
        try {
            return URLModel.findOne({ shortKey });
        } catch (error: any) {
            throw new Error(`Error in findOne: ${error.message}`);
        }
    },
};


function generateHash(longURL: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(longURL);
    return hash.digest('hex');
}

function base62Encode(value: number, length: number): string {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    while (value > 0 && result.length < length) {
        result = characters.charAt(value % 62) + result;
        value = Math.floor(value / 62);
    }

    return result;
}

export function generateShortKey(longURL: string): string {
    const hashValue = generateHash(longURL);
    const numericValue = parseInt(hashValue, 16);
    return base62Encode(numericValue, 10);
}
