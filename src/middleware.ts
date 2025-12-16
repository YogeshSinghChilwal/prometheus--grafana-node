import type {NextFunction, Request, Response} from 'express'

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now()
    next()
    const endTime = Date.now()
    console.log(`Request took ${endTime - start}ms`)
}