import { db } from '../../loaders/database';
import { StoreSettings } from '../../api/v1/models/store-settings';
import { StoreSettingsFactory } from '../factories/store-settings.factory';

export class StoreSettingsSeeder {
    public async run() {
        let storeSettings = await StoreSettingsFactory();


        await db.getRepository(StoreSettings).save(storeSettings);
    }
}