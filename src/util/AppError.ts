 export class AppError extends Error{

    statusCode:number
    status:number
    constructor(message:string,statusCode:number,status:number){

        super(message)
        this.statusCode=statusCode
        this.status=status
    }
}