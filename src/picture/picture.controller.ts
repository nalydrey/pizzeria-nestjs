import { Controller, Post, UploadedFile, UseInterceptors  } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import multer, { diskStorage } from "multer";
import { PictureService } from "./picture.service";


const storageConfig: multer.DiskStorageOptions = {
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+file.originalname);
    }
};

@Controller('upload')
export class PictureController {
    constructor(private pictureService: PictureService){}

    @Post() 
    @UseInterceptors(FileInterceptor('file', {storage: diskStorage(storageConfig)}))
    uploadFile(@UploadedFile() file: Express.Multer.File){
        console.log('picture');
        
        return this.pictureService.getFileName(file)
    }
}