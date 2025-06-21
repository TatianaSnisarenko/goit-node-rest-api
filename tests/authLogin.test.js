import { expect, jest } from "@jest/globals";

const mockLoginUser = jest.fn();

await jest.unstable_mockModule("../services/authServices.js", () => ({
  loginUser: mockLoginUser,
}));

const { default: authController } = await import(
  "../controllers/authControllers.js"
);
const login = authController.login;

describe("Login controller", () => {
  it("should return token and user", async () => {
    mockLoginUser.mockResolvedValue({
      token: "mock-token",
      user: { email: "test@example.com", subscription: "starter" },
    });

    const req = { body: { email: "test@example.com", password: "Test1234!" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    const response = res.json.mock.calls[0][0];
    expect(typeof response.user).toBe("object");
    expect(typeof response.user.email).toBe("string");
    expect(typeof response.user.subscription).toBe("string");
    expect(response.user.email).toBe("test@example.com");
    expect(response.user.subscription).toBe("starter");

    expect(res.json).toHaveBeenCalledWith({
      token: "mock-token",
      user: {
        email: "test@example.com",
        subscription: "starter",
      },
    });
  });
});
