"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const providerRoutes_1 = __importDefault(require("./route/providerRoutes"));
const cors = require('cors');
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://autohub024:AutoHub@cluster0.qi4lt.mongodb.net/serviceproviderdb?retryWrites=true&w=majority")
    .then(() => console.log('Connected to mongoDb'))
    .catch((error) => console.log('not connected to mongoDb'));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.use('/api/providers', providerRoutes_1.default);
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Service Provider service running on port ${PORT}`);
});
