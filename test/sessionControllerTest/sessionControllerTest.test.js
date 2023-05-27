import chai, { assert } from "chai";
import {VALID_TOKEN} from "../../src/constants/constants.js"
import { getCurrentUser } from "../../src/controllers/session.controller.js";
import { ERRORS } from "../../src/constants/errors.js";


const expected = chai.expected;
describe("Session Controllers Test", () => {

    // Tests that the function returns a JSON response with a valid token and user object when the user is authenticated and the request contains a user object.
    it("test_get_current_user_happy_path", () => {
        const req = { user: { name: "John Doe" } };
        const res = {
            json: (data) => {
                assert.strictEqual(data.message, VALID_TOKEN);
                assert.deepStrictEqual(data.user, req.user);
            }
        };
        getCurrentUser(req, res);
    });

    //Tests that the function throws an error when creating the CustomError object.
    it("test_get_current_user_edge_case_2", () => {
        const req = { user: { name: "John Doe" } };
        const res = {
            json: () => {
                throw new Error("Error creating response object.");
            }
        };
        assert.throws(() => getCurrentUser(req, res), ERRORS.UNHANDLED_ERROR.message);
    });

    //Tests that the function handles an invalid user object.
    it("test_get_current_user_general_behavior_3", () => {
        const req = { user: null };
        const res = {
            json: (data) => {
                assert.strictEqual(data.message, VALID_TOKEN);
                assert.strictEqual(data.user, null);
            }
        };
        getCurrentUser(req, res);
    });

    
    //Tests that the function handles an invalid request object.
    it("test_get_current_user_general_behavior_1", () => {
        const req = {};
        const res = {
            json: (data) => {
                assert.strictEqual(data.message, VALID_TOKEN);
                assert.strictEqual(data.user, undefined);
            }
        };
        getCurrentUser(req, res);
    });


})