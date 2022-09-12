"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '123456',
    database: 'demo',
    synchronize: true,
    logging: false,
    entities: ["dist/src/entity/*js"],
    migrations: ["dist/src/migrations/*js"]
});
//# sourceMappingURL=data-source.js.map