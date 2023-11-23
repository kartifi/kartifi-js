module.exports = {
    apps: [
        {
            name: "core",
            script: "yarn",
            args: "dev",
            cwd: "packages/core",
            env: {
                NODE_ENV: "development",
            },
        },
        {
            name: "frontend",
            script: "yarn",
            args: "dev",
            cwd: "packages/frontend",
            env: {
                NODE_ENV: "development",
            },
        },
        {
            name: "admin",
            script: "yarn",
            args: "dev",
            cwd: "packages/admin",
            env: {
                NODE_ENV: "development",
            },
        }
    ]
}