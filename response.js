const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        playload: {
            status_code : statusCode,
            datas : data,
            message: message
        },
        pagination:{
            sebelumnya:"",
            selanjutnya:"",
            maks:""
        }
    })
}
module.exports = response