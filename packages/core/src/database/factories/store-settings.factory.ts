import { faker } from "@faker-js/faker";
import { StoreSettings } from "../../api/v1/models/store-settings";
import { AddressFactory } from "./address.factory";

export const StoreSettingsFactory = async () => {
    let storeSettings = new StoreSettings();
    storeSettings.name = faker.company.name();
    storeSettings.currecy = faker.finance.currencyCode();
    storeSettings.address = await AddressFactory();
    return storeSettings;
}