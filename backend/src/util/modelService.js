const mongoose = require('mongoose');
const Model = mongoose.Model

const list = function (req, res, next) {
    this.find({}, (err, data) => {
        respondOrErr(res, next, 500, err, 200, { data })
    });
}

const get = function (req, res, next) {
    this.findById(req.params.id, (err, data) => {
        respondOrErr(res, next, 500, err, 200, { data })
    });
}

const post = function (req, res, next) {
    this.create(req.body, (err, data) => {
        respondOrErr(res, next, 400, err, 201, { data })
    })
}

const put = function (req, res, next) {
    this.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, data) => {
        respondOrErr(res, next, 500, err, 200, { data })
    })
}

const del = function (req, res, next) {
    this.findByIdAndRemove(req.params.id, req.body, (err, data) => {
        respondOrErr(res, next, 500, err, 200, { data })
    })
}

const respondOrErr = function (res, next, errStatusCode, err, statusCode, data) {
    if (err) {
        res.status(errStatusCode);
        next(err)
    } else {
        res.status(statusCode).json(data);
    }
};

const handlerError = function (err, req, res, next) {
    res.json({ error: err.message })
};

Model.register = function (app, path) {
    app.get(path, list.bind(this))
    app.get(path + '/:id', get.bind(this))
    app.post(path, post.bind(this))
    app.put(path + '/:id', put.bind(this))
    app.delete(path + '/:id', del.bind(this))
    app.use(handlerError)
}

function model() {
    return mongoose.model.apply(mongoose, arguments)
}

exports = module.exports = model