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
describe("GET /reservas", () => {
    it("returns everything from the db", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(App_1.default).get("/reservas");
        expect(res.statusCode).toEqual(200);
    }));
});
describe("POST /reservas", () => {
    it("returns status code 200 if the tests passes", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(App_1.default)
            .post("/reservas")
            .send({
            nomeApartamento: "Curitiba",
            dataCheckin: "2022-05-24 12:00:00",
            dataCheckout: "2022-05-27 12:00:00",
            qtdeHospedes: 1,
            infoHospede: {
                nomeHospede: "Penelope",
                emailHospede: "penelope@email.com",
            },
        });
        expect(res.statusCode).toEqual(200);
    }));
    // it("returns update reservation", async () =>{
    //     const res = await request(app)
    //     .put("/reservas/627aa3fc9eee99f31f0a3121")
    //     .send({
    //         nomeApartamento: "Campo Grande",
    //         dataCheckin: "2022-05-24 12:00:00",
    //         dataCheckout: "2022-05-27 12:00:00",
    //         qtdeHospedes: 3,
    //         infoHospede: [
    //             {
    //                 nomeHospede: [
    //                     "Garcia"
    //                 ],
    //                 emailHospede: [
    //                     "garciapadro@email.com"
    //                 ]
    //             }
    //         ]
    //     })
    //     expect(console.log(res))
    // })
});
