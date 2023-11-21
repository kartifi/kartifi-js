import { BaseService } from "./base";
import { Image } from "../models/image";
import { Repository } from "typeorm";

export class ImagesService extends BaseService {
    imagesRepo: Repository<Image>;

    constructor() {
        super();
        this.imagesRepo = this.db.getRepository(Image);
    }

    public async create(image) {

        const newImage = new Image();
        newImage.title = image.title;
        newImage.src = image.src;
        newImage.mimeType = image.mimeType;

        return await this.imagesRepo.save(newImage);

    }

    public async delete(id: number) {
        const image = await this.imagesRepo.findOne({
            where: {
                id: id
            }
        });

        return await this.imagesRepo.remove(image!);
    }
}