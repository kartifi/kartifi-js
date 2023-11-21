import { appContainer } from "./express";
export function setUpPlugins() {
    let plugins = ["@kartifi/plugin-stripe/", "@kartifi/plugin-shippo/"]
    for (let plugin of plugins) {
        let pluginModule = require(plugin);
        appContainer.app.use(pluginModule.setUpRoutes().router);
    }

    // appContainer.app.use("/stripe", setUpRoutes().router);

}