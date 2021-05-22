namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
        EMAIL_SERVER: string
        EMAIL_FROM: string
        DATABASE_URL: string
        SECRET: string
    }
}
