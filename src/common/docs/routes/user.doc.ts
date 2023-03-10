export const user = {
  // method of operation
  "/users/register": {
    post: {
      tags: ["User"], // operation's tag.
      description: "Get users", // operation's desc.
      summary: "Register here",
      operationId: "registerUser", // unique operation id.
      parameters: [
        {
          $ref: "#/components/parameters/nickName",
        },
      ],
      requestBody: {
        // expected request body
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserRegistrationInput",
            },
          },
        },
      }, // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "User registered", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        404: {
          description: "User not found", // response desc.
        },
      },
    },
    get: {
      tags: ["User"], // operation's tag.
      description: "Registration of a user", // operation's desc.
      summary: "Login here",
      operationId: "registerUser", // unique operation id.
      parameters: [
        {
          $ref: "#/components/parameters/nickName",
        },
      ],
      requestBody: {
        // expected request body
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserRegistrationInput",
            },
          },
        },
      }, // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "User registered", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        404: {
          description: "User not found", // response desc.
        },
      },
    },
  },
};
