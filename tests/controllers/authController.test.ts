import { Request, Response } from 'express';
import { login } from '../../controllers/authController';
import User from '../../models/User';

jest.mock('../../models/User');

describe('AuthController - Login', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let responseObject: any;

    beforeEach(() => {
        jest.clearAllMocks();

        responseObject = {};

        mockReq = {
            body: {
                email: 'test@example.com',
                password: 'pass123'
            }
        };

        mockRes = {
            status: jest.fn().mockImplementation((code) => {
                responseObject.status = code;
                return mockRes;
            }),
            json: jest.fn().mockImplementation((data) => {
                responseObject.json = data;
                return mockRes;
            })
        };
    });

    it('should return 400 if the user does not exist', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(null);

        await login(mockReq as Request, mockRes as Response);

        expect(responseObject.status).toBe(400);
        expect(responseObject.json).toEqual({
            error: 'Invalid credentials'
        });
    });

    it('should look up the user using the email provided in the request', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(null);

        await login(mockReq as Request, mockRes as Response);

        expect(User.findOne).toHaveBeenCalledWith({
            email: 'test@example.com'
        });
    });

    it('should not look up a user when the email is missing', async () => {
        mockReq.body = {
            password: 'pass123'
        };

        await login(mockReq as Request, mockRes as Response);

        expect(User.findOne).toHaveBeenCalledTimes(1);
    });

    it('should not look up a user when the password is missing', async () => {
        mockReq.body = {
            email: 'test@example.com'
        };

        await login(mockReq as Request, mockRes as Response);

        expect(User.findOne).toHaveBeenCalledTimes(1);
        expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it('should handle an empty email and password', async () => {
        mockReq.body = {
            email: '',
            password: ''
        };

        await login(mockReq as Request, mockRes as Response);

        expect(User.findOne).toHaveBeenCalledTimes(1);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: "Invalid credentials" });
    });
});