import { BadRequestException } from "@nestjs/common";
import { Request } from "express";
import { Callback } from "typeorm";

export const fileValidator = (r: Request, file: Express.Multer.File, cb: Callback) => {
    if (!file) {
        return cb(new BadRequestException('no hay nadota'), false);
    }
    const validExtension = file.mimetype.split('/')[1];
    const typesValid = ['jpg', 'gif','png','jpeg'];

    if(typesValid.includes(validExtension)){
        return cb(null, true);
    }
    return cb(new BadRequestException,false);

}