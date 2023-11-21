import { Image } from "../../api/v1/models/image";
import { faker } from '@faker-js/faker';

export const imageFactory = async (count: number = 1) => {
    let image = new Image();
    image.src = faker.image.url();//'1699455056767.jpeg';
    image.mimeType = 'image/jpeg';
    image.title = faker.lorem.sentence();
    return image;
}