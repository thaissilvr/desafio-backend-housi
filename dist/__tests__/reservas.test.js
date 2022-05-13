"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("../config/App"));
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
describe("GET /reservas", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoose_1.default.disconnect();
        const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    it("returns everything from the db", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(App_1.default).get("/reservas");
        expect(res.statusCode).toEqual(200);
    }));
    it("returns one result from the db", () => __awaiter(void 0, void 0, void 0, function* () {
        const resPost = yield (0, supertest_1.default)(App_1.default)
            .post("/reservas")
            .send({
            nomeApartamento: "Curitiba",
            dataCheckin: "2022-05-24 12:00:00",
            dataCheckout: "2022-05-27 12:00:00",
            qtdeHospedes: 1,
            infoHospedes: [
                {
                    nomeHospede: "Penelope",
                    emailHospede: "penelope@email.com",
                },
            ],
        });
        expect(resPost.statusCode).toEqual(201);
        const resGetOne = yield (0, supertest_1.default)(App_1.default).get(`/reservas/${resPost.body._id}`);
        expect(resGetOne.statusCode).toEqual(200);
    }));
});
describe("POST /reservas", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoose_1.default.disconnect();
        const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    it("returns status code 200 if the tests passes", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(App_1.default)
            .post("/reservas")
            .send({
            nomeApartamento: "Curitiba",
            dataCheckin: "2022-05-24 12:00:00",
            dataCheckout: "2022-05-27 12:00:00",
            qtdeHospedes: 1,
            infoHospedes: [
                {
                    nomeHospede: "Penelope",
                    emailHospede: "penelope@email.com",
                },
            ],
        });
        expect(res.statusCode).toEqual(201);
    }));
    it("returns status code 400 if qtdeHospedes doesn't match infoHospedes length", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(App_1.default)
            .post("/reservas")
            .send({
            nomeApartamento: "Curitiba",
            dataCheckin: "2022-05-28 12:00:00",
            dataCheckout: "2022-05-29 12:00:00",
            qtdeHospedes: 2,
            infoHospedes: [
                {
                    nomeHospede: "Penelope",
                    emailHospede: "penelope@email.com",
                },
            ],
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("message");
    }));
    it("returns status code 403 if apartamento is booked", () => __awaiter(void 0, void 0, void 0, function* () {
        const resReservaOne = yield (0, supertest_1.default)(App_1.default)
            .post("/reservas")
            .send({
            nomeApartamento: "Curitiba",
            dataCheckin: "2022-05-30 12:00:00",
            dataCheckout: "2022-05-31 12:00:00",
            qtdeHospedes: 1,
            infoHospedes: [
                {
                    nomeHospede: "Penelope",
                    emailHospede: "penelope@email.com",
                },
            ],
        });
        expect(resReservaOne.statusCode).toEqual(201);
        const resReservaTwo = yield (0, supertest_1.default)(App_1.default)
            .post("/reservas")
            .send({
            nomeApartamento: "Curitiba",
            dataCheckin: "2022-05-30 12:00:00",
            dataCheckout: "2022-05-31 12:00:00",
            qtdeHospedes: 1,
            infoHospedes: [
                {
                    nomeHospede: "Garibaldo",
                    emailHospede: "garibaldo@email.com",
                },
            ],
        });
        expect(resReservaTwo.statusCode).toEqual(403);
        expect(resReservaTwo.body).toHaveProperty("message");
    }));
});
describe("PUT /reservas/:id", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoose_1.default.disconnect();
        const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    it("verify if existing Reserva is updated correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const resPost = yield (0, supertest_1.default)(App_1.default)
            .post("/reservas")
            .send({
            nomeApartamento: "Curitiba",
            dataCheckin: "2022-05-24 12:00:00",
            dataCheckout: "2022-05-27 12:00:00",
            qtdeHospedes: 1,
            infoHospedes: [
                {
                    nomeHospede: "Penelope",
                    emailHospede: "penelope@email.com",
                },
            ],
        });
        expect(resPost.statusCode).toEqual(201);
        console.log(resPost.body);
        const resPut = yield (0, supertest_1.default)(App_1.default)
            .put(`/reservas/${resPost.body._id}`)
            .send({
            nomeApartamento: "Rio de Janeiro",
            dataCheckin: "2022-05-24 12:00:00",
            dataCheckout: "2022-05-27 12:00:00",
            qtdeHospedes: 2,
            infoHospedes: [
                {
                    nomeHospede: "Penelope",
                    emailHospede: "penelope@email.com",
                },
                {
                    nomeHospede: "Gilberto Gil",
                    emailHospede: "gilberto@email.com",
                },
            ],
        });
        expect(resPut.body.nomeApartamento).toBe("Rio de Janeiro");
        expect(resPut.body.qtdeHospedes).toBe(2);
    }));
});
describe("DELETE /reservas/:id", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoose_1.default.disconnect();
        const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    it("deleting existing Reserva correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const resPost = yield (0, supertest_1.default)(App_1.default)
            .post("/reservas")
            .send({
            nomeApartamento: "Curitiba",
            dataCheckin: "2022-05-24 12:00:00",
            dataCheckout: "2022-05-27 12:00:00",
            qtdeHospedes: 1,
            infoHospedes: [
                {
                    nomeHospede: "Penelope",
                    emailHospede: "penelope@email.com",
                },
            ],
        });
        expect(resPost.statusCode).toEqual(201);
        const resDelete = yield (0, supertest_1.default)(App_1.default)
            .delete(`/reservas/${resPost.body._id}`)
            .send();
        expect(resDelete.statusCode).toEqual(200);
        expect(resDelete.body).toHaveProperty("message");
    }));
});
