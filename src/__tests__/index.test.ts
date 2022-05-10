import app from "../config/App";
import request from "supertest";

describe("GET /reservas", () => {
  it("returns everything from the db", async () => {
    const res = await request(app).get("/reservas");

    expect(res.statusCode).toEqual(200);
  });
});

describe("POST /reservas", () => {
  it("returns status code 200 if the tests passes", async () => {
    const res = await request(app)
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
  });

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
