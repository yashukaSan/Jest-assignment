import request from 'supertest';
import express from 'express';
import router from '../../routes/salonRoutes';
import { getAvailableSlots } from '../../controllers/salonController';

jest.mock('../../controllers/salonController');

const app = express();
app.use(express.json());
app.use(router);

describe('Salon Router', () => {
    const mockGetAvailableSlots = getAvailableSlots as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();

        mockGetAvailableSlots.mockImplementation((req, res) => {
            res.status(200).json({
                success: true,
                salonId: req.params.salonId,
                date: req.query.date,
                serviceId: req.query.serviceId
            });
        });
    });

    it('should route the request to getAvailableSlots', async () => {
        const res = await request(app)
            .get('/salons/salon-123/available-slots');

        expect(res.status).toBe(200);
        expect(mockGetAvailableSlots).toHaveBeenCalledTimes(1);
    });

    it('should pass the salon ID to the controller', async () => {
        const res = await request(app)
            .get('/salons/salon-123/available-slots');

        expect(res.body.salonId).toBe('salon-123');
    });

    it('should pass query parameters to the controller', async () => {
        const res = await request(app)
            .get('/salons/salon-123/available-slots')
            .query({
                date: '2026-10-25',
                serviceId: 'service-123'
            });

        expect(res.body.date).toBe('2026-10-25');
        expect(res.body.serviceId).toBe('service-123');
    });

    it('should return the expected response from the controller', async () => {
        const res = await request(app)
            .get('/salons/salon-456/available-slots')
            .query({ date: '2026-10-26' });

        expect(res.body).toEqual({
            success: true,
            salonId: 'salon-456',
            date: '2026-10-26',
            serviceId: undefined
        });
    });

    it('should handle a request without query parameters', async () => {
        const res = await request(app)
            .get('/salons/salon-123/available-slots');

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.date).toBeUndefined();
        expect(res.body.serviceId).toBeUndefined();
    });

    it('should return 404 when using POST instead of GET', async () => {
        const res = await request(app)
            .post('/salons/salon-123/available-slots');

        expect(res.status).toBe(404);
        expect(mockGetAvailableSlots).not.toHaveBeenCalled();
    });

    it('should return 404 for an incorrect route', async () => {
        const res = await request(app)
            .get('/salons/salon-123/wrong-path');

        expect(res.status).toBe(404);
        expect(mockGetAvailableSlots).not.toHaveBeenCalled();
    });

    it('should return 404 when the salon ID is missing', async () => {
        const res = await request(app)
            .get('/salons/available-slots');

        expect(res.status).toBe(404);
        expect(mockGetAvailableSlots).not.toHaveBeenCalled();
    });
});