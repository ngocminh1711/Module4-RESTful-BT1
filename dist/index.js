"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./src/data-source");
const BLog_1 = require("./src/entity/BLog");
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = 8000;
data_source_1.AppDataSource.initialize().then(async (connection) => {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use(express_1.default.json());
    const BLogRepo = await connection.getRepository(BLog_1.BLog);
    app.post('/blog/create', async (req, res) => {
        try {
            const blogSearch = await BLogRepo.findOneBy({ title: req.body.title });
            if (blogSearch) {
                res.status(500).json({
                    message: 'Da co blog title nay'
                });
            }
            const blogData = {
                id: req.body.id,
                title: req.body.title,
                content: req.body.content
            };
            const blog = await BLogRepo.save(blogData);
            if (blog) {
                res.status(200).json({
                    message: "Create blog successfully",
                    blog: blog
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });
    app.put('/blog/update', async (req, res) => {
        try {
            let blogSearch = await BLogRepo.findOneBy({ id: req.body.id });
            if (!blogSearch) {
                res.status(500).json({
                    message: 'Blog nay da ton tai'
                });
            }
            const blog = await BLogRepo.update({ id: req.body.id }, req.body);
            res.status(200).json({
                message: 'Update blog successfully'
            });
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });
    app.delete('/blog/delete', async (req, res) => {
        try {
            let blogSearch = await BLogRepo.findOneBy({ id: req.body.id });
            if (!blogSearch) {
                res.status(500).json({
                    message: 'Blog da ton tai'
                });
            }
            const blog = await BLogRepo.delete({ id: req.body.id });
            res.status(200).json({
                message: 'Delete blog successfully'
            });
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });
    app.get('/blog/list', async (req, res) => {
        try {
            const blogs = await BLogRepo.find();
            if (blogs) {
                res.status(200).json({
                    message: "Success",
                    blogs: blogs
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });
    app.listen(PORT, function () {
        console.log('http://localhost:' + PORT);
    });
});
//# sourceMappingURL=index.js.map