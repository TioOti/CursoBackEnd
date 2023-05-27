import chai, { assert } from "chai";
import {VALID_TOKEN} from "../../src/constants/constants.js"
import { getCurrentUser } from "../../src/controllers/session.controller.js";
import { ERRORS } from "../../src/constants/errors.js";
import sinon from "sinon";
import * as Constants from "../../src/constants/constants.js"
import { getProducts } from "../../src/controllers/product.controller.js"

const expected = chai.expected;

describe("Products Controllers Test", () => {

    // Tests that the function handles filtering by status correctly.
    it("test_get_products_with_status_filtering", async () => {
        const req = {
            query: {
                status: "available"
            }
        };
        const res = {
            json: function(data) {
                assert.equal(data.status, Constants.STATUS.SUCCESS);
                assert.equal(data.products.query.status, "available");
            }
        };
        await getProducts(req, res, () => {});
    });

    //Tests that the function handles pagination correctly.

    it("test_get_products_with_pagination", async () => {
        const req = {
            query: {
                limit: 5,
                page: 2
            }
        };
        const res = {
            json: function(data) {
                assert.equal(data.status, Constants.STATUS.SUCCESS);
                assert.equal(data.products.page, 2);
                assert.equal(data.products.limit, 5);
            }
        };
        await getProducts(req, res, () => {});
    });

    //Tests that the function handles sorting correctly.

    it("test_get_products_with_sorting", async () => {
        const req = {
            query: {
                sort: "desc"
            }
        };
        const res = {
            json: function(data) {
                assert.equal(data.status, Constants.STATUS.SUCCESS);
                assert.equal(data.products.sort.price, "desc");
            }
        };
        await getProducts(req, res, () => {});
    });

    //Tests that the function handles filtering by category correctly.

    it("test_get_products_with_category_filtering", async () => {
        const req = {
            query: {
                category: "category1"
            }
        };
        const res = {
            json: function(data) {
                assert.equal(data.status, Constants.STATUS.SUCCESS);
                assert.equal(data.products.query.category, "category1");
            }
        };
        await getProducts(req, res, () => {});
    });

})