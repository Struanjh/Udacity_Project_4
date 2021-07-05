
import { checkForName } from "../src/client/js/nameChecker";

describe("Testing function responsible for validating the URL the user enters in the form", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the checkForName function", () => {
    // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
    // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
           expect(checkForName).toBeDefined();
    })
});