import mongoose,{ Model, Schema, SchemaTypeOptions } from "mongoose"; 
import { Entries } from "../interfaces";

export interface IEntry extends Entries{}

const entrySchema  = new Schema<SchemaTypeOptions<Object>>({
    description:{type:String, required:true},
    createdAt:{type:Number, required:true},
    status:{
        type:String,
        enum:{
            values:['pending','in-progress','finished'],
            message:'{VALUE} status no permitido.'
        },
        default:'pending'
    },
   
    
},{collection:'Entradas'});

const EntryModel : Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;