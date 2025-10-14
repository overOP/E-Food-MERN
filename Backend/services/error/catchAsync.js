// catch asynchronous errors
// this is hai other functions 
// this is Error handling
const catchAsync = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
};

export default catchAsync