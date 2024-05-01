import { requireAuthMock } from "../../__testUtils__/authMiddlewareMock";

describe("requireAuth", () => {
  it("should send 403 error when session cookie is invalid", () => {
    const req = {
      cookies: {
        session: "invalidToken",
      },
      data: {
        userId: 1234567890,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const next = jest.fn();

    requireAuthMock(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith({
      error: "Session cookie not found or invalid.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should send 403 error when authenticated user does not match valid user", () => {
    const req = {
      cookies: {
        session: "validToken",
      },
      data: {
        userId: 987654321,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const next = jest.fn();

    requireAuthMock(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith({
      error: "Authenticated user does not match valid user.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should send 403 error when user does not exist", () => {
    const req = {
      cookies: {
        session: "validToken",
      },
      data: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const next = jest.fn();

    requireAuthMock(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith({
      error: "Authenticated user does not exist.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should authenticate user when session cookie is valid", () => {
    const req = {
      cookies: {
        session: "validToken",
      },
      data: {
        userId: 1234567890,
      },
    };

    const res = {};
    const next = jest.fn();

    requireAuthMock(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.data.userId).toBeDefined();
  });
});
