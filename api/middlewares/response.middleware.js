const { Prisma } = require("@prisma/client")
const ApiError = require("./../response_models/api_error")
const ApiResponse = require("./../response_models/api_response")

const apiResponseHandler = (data, req, res, next) => {

    if(data instanceof Prisma.PrismaClientKnownRequestError){
        let message = 'Something went wrong'
        switch(data.code){
            case 'P2002':
                message = `${data.meta.target[0]} should be unique`
                break
        }
        return res.status(400).json({ status: false, error: message })
    }

    if (data instanceof Error) {
        if (data instanceof ApiError) {
            return res.status(data.statusCode).json({ status: false, error: data.msg })
        }
        return res.status(500).json({ status: false, error: 'Something went wrong' })
    }

    if (data instanceof ApiResponse) {
        if(data.data === null) return res.sendStatus(data.statusCode) 
        return res.status(data.statusCode).json({ status: true, data: data.data })
    }

}

module.exports = apiResponseHandler