import request from 'supertest';
import express from 'express';
import router from '../../routes/salonRoutes';
import { getAvailableSlots } from '../../controllers/salonController';

jest.mock('../../controllers/salonController');

const app = express();
app.use(router);

describe('Salon Router', () => {
    const mockGetAvailableSlots = getAvailableSlots as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('routes GET /salons/:salonId/available-slots to getAvailableSlots', async () => {
        mockGetAvailableSlots.mockImplementation((req, res) => {
            res.status(200).json({
                success: true,
                salonId: req.params.salonId,
                date: req.query.date,
            });
        });

        const response = await request(app)
            .get('/salons/abc-123/available-slots')
            .query({ date: '2025-10-25', serviceId: 'svc-99' });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.salonId).toBe('abc-123');
        expect(response.body.date).toBe('2025-10-25');
        expect(mockGetAvailableSlots).toHaveBeenCalledTimes(1);
    });

    it('passes query parameters to the controller', async () => {
        mockGetAvailableSlots.mockImplementation((req, res) => {
            res.status(200).json(req.query);
        });

        const response = await request(app)
            .get('/salons/salon-1/available-slots')
            .query({ date: '2025-01-01', serviceId: 'svc-1' });

        expect(response.body.date).toBe('2025-01-01');
        expect(response.body.serviceId).toBe('svc-1');
    });

    it('returns 404 for an unsupported HTTP method', async () => {
        const response = await request(app).post('/salons/123/available-slots');

        expect(response.status).toBe(404);
        expect(mockGetAvailableSlots).not.toHaveBeenCalled();
    });

    it('returns 404 for an incorrect path', async () => {
        const response = await request(app).get('/salons/123/wrong-path');

        expect(response.status).toBe(404);
        expect(mockGetAvailableSlots).not.toHaveBeenCalled();
    });
});