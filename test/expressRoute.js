
module.exports = {
    next: () => 'next',
    res: {
        status: function(statusCode){
            return { send: (property) => property }
        }
    },
    req: {
        body: {},
        query: {},
        headers: {}
    }
}