const defaultController =
{
    defaultRoute(req, res, next)
    {
        const error = 
        {
            message: "NodeJS Server",
            status: 404
        }
        next(error);
    }
}

module.exports = defaultController;