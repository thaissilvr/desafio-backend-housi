import app from "../config/App";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("GET /reservas", () => {
  beforeAll(async () => {
    mongoose.disconnect();
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it("returns everything from the db", async () => {
    const res = await request(app).get("/reservas");

    expect(res.statusCode).toEqual(200);
  });
  it("returns one result from the db", async () => {
    const resPost = await request(app)
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

    const resGetOne = await request(app).get(`/reservas/${resPost.body._id}`);
    expect(resGetOne.statusCode).toEqual(200);
  });
});

describe("POST /reservas", () => {
  beforeAll(async () => {
    mongoose.disconnect();
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it("returns status code 200 if the tests passes", async () => {
    const res = await request(app)
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
  });
  it("returns status code 400 if qtdeHospedes doesn't match infoHospedes length", async () => {
    const res = await request(app)
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
  });
  it("returns status code 403 if apartamento is booked", async () => {
    const resReservaOne = await request(app)
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
    
    const resReservaTwo = await request(app)
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
  });
});

describe("PUT /reservas/:id", () => {
  beforeAll(async () => {
    mongoose.disconnect();
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it("verify if existing Reserva is updated correctly", async () => {
    const resPost = await request(app)
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
    const resPut = await request(app)
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
  });
});

describe("DELETE /reservas/:id", () => {
  beforeAll(async () => {
    mongoose.disconnect();
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  it("deleting existing Reserva correctly", async () => {
    const resPost = await request(app)
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
    const resDelete = await request(app)
      .delete(`/reservas/${resPost.body._id}`)
      .send();
    expect(resDelete.statusCode).toEqual(200);
    expect(resDelete.body).toHaveProperty("message");
  });
});
