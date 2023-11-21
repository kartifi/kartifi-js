import 'express-session';

declare module 'express-session' {
    interface SessionData {
        customer: number;
        user: number;
    }
}