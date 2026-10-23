import type{ Request, Response } from  'express';
import mongoose from 'mongoose';
import { createBooking, cancelBooking } from '../../controllers/bookingController';
import Booking from '../../models/Booking'
import Service from '../../models/Service'
import Salon from '../../models/Salon'

jest.mock('../../models/Booking', ()=>{
    const BookingMock: any = jest.fn();
    BookingMock.find = jest.fn();
    BookingMock.findById = jest.fn();
    return {__esModule: true, default: BookingMock};
});

jest.mock('../../models/Service');

jest.mock('../../models/Salon');

const objId = () => new mongoose.Types.ObjectId();

const mockReq = (body: Record<string, unknown>): Request => (
    {
        body,
        user: { _id: objId(), roles: 'customer'},
    } as unknown as Request
);

const mockRes = () : Response =>{
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Validation - createBooking', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    it(`return 400 with 'date is required' when date is missing`, async()=>{
        const req = mockReq({
            salonId : objId(),
            stylishId : objId(),
            serviceId : objId(),
            slotTime: '10:00',
        });
        const res = mockRes();

        await createBooking(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "date is required"});
        expect(Service.findById).not.toHaveBeenCalled();
        expect(Booking.find).not.toHaveBeenCalled();
        expect(Booking).not.toHaveBeenCalled();
    })
})