
import { updateUI } from "../src/client/js/formHandler";

describe("Testing function responsible for taking data returned from API, and updating user interface", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the updateUI function", () => {
    // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
    // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
           expect(updateUI).toBeDefined();
    })
});