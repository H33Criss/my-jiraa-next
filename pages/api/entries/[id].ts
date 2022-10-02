
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry, IEntry } from '../../../models';

type Data = {message: string}
|IEntry
export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id }=req.query;
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({message: 'Este no es un id valido..'});
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);
        case 'GET':
            return getEntry(req, res);
    
        default:
            return res.status(400).json({message: 'Servicio inexistente.'});;
    }
    
}

const getEntry = async(req:NextApiRequest, res:NextApiResponse)=>{
    const { id }=req.query;
    await db.connect()
    const entryRequested = await Entry.findById(id);
    if(!entryRequested){
        res.status(400).json({message:`La entrada con id '${id}' no existe.`})
    }
    res.status(200).json(entryRequested)
    await db.disconnect()
}

const updateEntry = async(req:NextApiRequest, res:NextApiResponse)=>{
    const { id }=req.query;
    await db.connect()
    const entryToUpdate = await Entry.findById(id);
    if(!entryToUpdate){
        await db.disconnect()
        return res.status(400).json({message:`La entrada con id '${id}' no existe.`})
    }

    const { 
        description = entryToUpdate.description, 
        status=entryToUpdate.status,
    } = req.body;

    try {
        const entryUpdated = await Entry.findByIdAndUpdate(id, {description,status},{runValidators:true, new:true,});
        res.status(200).json(entryUpdated!)
        await db.disconnect()
    } catch (error:any) {
        console.log(error);
        await db.disconnect()
        res.status(400).json({message:error.errors.status.message})
    }


}