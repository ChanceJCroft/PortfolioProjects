//pass in a function, returns a new function that has the original function executed and passes any errors to next

module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}