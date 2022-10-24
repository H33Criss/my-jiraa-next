import { Entry, IEntry } from '../models';
import { db } from './'
import { isValidObjectId } from 'mongoose';


export const getEntryByID = async (id: string): Promise<IEntry | null> => {

    if (!isValidObjectId(id)) return null;

    await db.connect();
    const entry = await Entry.findById(id).lean();
    await db.disconnect();

    // return { ...entry, _id: entry._id.toString() };

    // return entry;
    return JSON.parse(JSON.stringify(entry));
}