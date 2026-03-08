import { Request, Response, NextFunction } from "express";

export async function logger(req:Request,res:Response,next:NextFunction) {
    const method=req.method;
    const status=res.statusCode;
    const time=new Date().toISOString();
    const body=req.body;

    if(body){
        console.log(`body:${body}`)
        console.log(`method:${method}`)
        console.log(`status:${status}`)
        console.log(`time:${time}`)
    }else{
        console.log(`method:${method}`)
        console.log(`status:${status}`)
        console.log(`time:${time}`)
    }
    next();
}