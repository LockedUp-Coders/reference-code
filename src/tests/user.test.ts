import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import { describe, it } from "mocha";
import database from "../modules/database/connect";
import User from "../modules/user/schema";

const expect = chai.expect;

chai.use(chaiHttp);
describe("# User Management Suite", function () {
  this.beforeAll((done) => {
    database.connect();
    User.deleteMany({}).then(() => {
      console.log("Database Cleared");
      done();
    });
  });
  /**
   * Testing create new user controller
   **/
  it("# Should Create a new User", async function () {
    const res = await chai
      .request(app)
      .post("/user/create")
      .send({
        user: {
          name: "yash kumar verma",
          businessName: "programming den",
          mobileNumber: "0000000000",
        },
      });
    expect(res.body.error).to.be.false;
  });

  it("# Should Create another User", async function () {
    const res = await chai
      .request(app)
      .post("/user/create")
      .send({
        user: {
          name: "dhruv kumar verma",
          businessName: "programming den",
          mobileNumber: "9999999999",
        },
      });

    expect(res.body.error).to.be.false;
  });

  it("# Should Not Create a new User citing duplicate", async function () {
    const res = await chai
      .request(app)
      .post("/user/create")
      .send({
        user: {
          name: "yash kumar verma",
          businessName: "programming den",
          mobileNumber: "0000000000",
        },
      });
    expect(res.body.error).to.be.true;
  });

  it("# Should Not Create a new User with incomplete data", async function () {
    const res = await chai
      .request(app)
      .post("/user/create")
      .send({
        user: {
          name: "yash kumar verma",
          businessName: "programming den",
        },
      });
    expect(res.body.error).to.be.true;
  });

  /**
   * Testing Search Controller
   */
  it("# Should Search for user successfully using mobile number", async function () {
    const res = await chai
      .request(app)
      .post("/user/search")
      .send({
        user: {
          mobileNumber: "0000000000",
        },
      });
    expect(res.body.error).to.be.false;
    expect(res.body.payload.mobileNumber).to.be.equal("0000000000");
  });

  it("# Should Search for user successfully using business name", async function () {
    const res = await chai
      .request(app)
      .post("/user/search")
      .send({
        user: {
          businessName: "programming den",
        },
      });
    expect(res.body.error).to.be.false;
    expect(res.body.payload.businessName).to.equal("programming den");
  });

  /**
   * Testing Update Controller
   */
  it("# Should Update user by mobile number", async function () {
    const res = await chai
      .request(app)
      .put("/user/update")
      .send({
        user: {
          mobileNumber: "0000000000",
          name: "Yash",
          businessName: "New Balaji Sweets",
        },
      });
    expect(res.body.error).to.be.false;
    expect(res.body.payload.nModified).to.be.equal(1);
  });

  it("# Should Not Update when mobile number doesn't match", async function () {
    const res = await chai
      .request(app)
      .put("/user/update")
      .send({
        user: {
          mobileNumber: "00000000",
          name: "Yash",
          businessName: "New Balaji Sweets",
        },
      });
    expect(res.body.error).to.be.false;
    expect(res.body.payload.nModified).to.be.equal(0);
  });
});
