import { Injectable } from "@nestjs/common";
import path, { dirname, join } from "path";
import {access, constants, rm} from "fs"

@Injectable()
export class PictureService {
    private path: string = join(__dirname, '..', '..', 'uploads', '/')

    getFileName(file: Express.Multer.File) {
        return {imgUrl: file.filename} 
    }

    deleteFileByName(name: string) {
        const filePath = this.path + name
        
        const isExist = access(filePath, constants.F_OK, (err) => {
            if(err){
                console.log('file is not exist');
            }
            else{
                rm(filePath, (err) => {
                    if(!err) console.log('file was deleted');
                })
            }
        })
        console.log(isExist);
        
    }
}
