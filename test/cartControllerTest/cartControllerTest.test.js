import chai from "chai";
import factory from "../../src/services/factory.js";
import {  getCart } from "../../src/controllers/cart.controllers.js";
import * as Constants from "../../src/constants/constants.js"
import sinon from "sinon";


const expected = chai.expected;
describe("Cart Router Tests", () => {

    //Tests that the function returns a JSON object with the correct cart.

    it("test_get_cart_response_cart", async () => {
        const req = { params: { cid: "valid_cid" } };
        const res = { json: sinon.spy() };
        const cart = { id: "valid_cid", products: [] };
        factory.cart.getCart = sinon.stub().returns(cart);

        await getCart(req, res);

        sinon.assert.calledWith(res.json, { cart, status: Constants.STATUS.SUCCESS });
    });

    
})