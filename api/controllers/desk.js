import Desk from "../models/Desk"
import Floor from "../models/Floor"

export const createDesk = async (req, res, next) =>{

    const floorId = req.params.floorId;
    const newDesk = new Desk(req.body);

    try{
        const savedDesk = await newDesk.save()
        try{
            await Floor.findByIdAndUpdate(floorId, {$push:{desk: savedDesk._id}})
        }catch(err){
            next(err)
        }
    
    }catch(err){
        next(err)
    }

    }