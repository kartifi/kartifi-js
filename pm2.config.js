module.exports = {
    apps: [
        {
            name: "core",
            script: "yarn",
            args: "start",
            cwd: "packages/core",

        },
        {
            name: "frontend",
            script: "yarn",
            args: "preview",
            cwd: "packages/frontend",

        },
        {
            name: "admin",
            script: "yarn",
            args: "preview",
            cwd: "packages/admin",

        },
        // {
        //     name: "stripe",
        //     script: "yarn",
        //     args: "dev",
        //     cwd: "packages/kartifi-plugin-stripe",

        // },
        // {
        //     name: "shippo",
        //     script: "yarn",
        //     args: "dev",
        //     cwd: "packages/kartifi-plugin-shippo",

        // }
    ]
}