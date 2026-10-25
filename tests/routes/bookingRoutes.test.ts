import request from 'supertest';
import express from 'express';
import router from '../../routes/bookingRoutes';
import { createBooking, cancelBooking } from '../../controllers/bookingController';
import { authMiddleware } from '../../middleware/auth';

jest.mock('../../controllers/bookingController');
jest.mock('../../middleware/auth');

const app = express();
app.use(express.json());
app.use(router);

describe('Booking Router', () => {
    const mockCreateBooking = createBooking as jest.Mock;
    const mockCancelBooking = cancelBooking as jest.Mock;
    const mockAuthMiddleware = authMiddleware as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();

        mockAuthMiddleware.mockImplementation((req, res, next) => {
            next();
        });

        mockCreateBooking.mockImplementation((req, res) => {
            res.status(201).json({ message: 'Booking created successfully' });
        });

        mockCancelBooking.mockImplementation((req, res) => {
            res.status(200).json({ message: 'Booking cancelled successfully' });
        });
    });

    it('should route POST /bookings to createBooking', async () => {
        const res = await request(app)
            .post('/bookings')
            .send({ serviceId: 'service-123' });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Booking created successfully');
        expect(mockCreateBooking).toHaveBeenCalledTimes(1);
    });

    it('should run the authentication middleware before creating a booking', async () => {
        await request(app)
            .post('/bookings')
            .send({ serviceId: 'service-123' });

        expect(mockAuthMiddleware).toHaveBeenCalledTimes(1);
    });

    it('should route the cancellation request to cancelBooking', async () => {
        const res = await request(app)
            .post('/bookings/booking-123/cancel');

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Booking cancelled successfully');
        expect(mockCancelBooking).toHaveBeenCalledTimes(1);
    });

    it('should run the authentication middleware before cancelling a booking', async () => {
        await request(app)
            .post('/bookings/booking-123/cancel');

        expect(mockAuthMiddleware).toHaveBeenCalledTimes(1);
    });

    it('should able to handle wrong HTTP method to create a booking', async () => {
        const res = await request(app).get('/bookings');

        expect(res.status).toBe(404);
        expect(mockCreateBooking).not.toHaveBeenCalled();
    });

});
