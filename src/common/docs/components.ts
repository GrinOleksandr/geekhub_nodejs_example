export const components = {
  components: {
    schemas: {
      UserRegistrationInput: {
        type: "object",
        properties: {
          login: {
            type: "string",
            description: "login for a user",
            example: "MyUserLogin",
            required: true,
          },
          password: {
            type: "string",
            description: "password for a user",
            example: "secret password)",
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "ID of a user",
            example: "FDSrw43r4e2c35h6j765hgre",
          },
          login: {
            type: "string",
            description: "login for a user",
            example: "MyUserLogin",
          },
          password: {
            type: "string",
            description: "password for a user",
            example: "secret password)",
          },
          isAdmin: {
            type: "boolean",
            description: "Indicates whether a user is admin",
            example: true,
          },
        },
      },
    },
    parameters: {
      nickName: {
        name: "testParam1",
        in: "query",
        required: true,
        description: "Sasha testing his params",
        example: "The example of Sasha params",
      },
    },
  },
};
