"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const service_route_1 = require("../modules/Services/service.route");
const slot_route_1 = require("../modules/Slot/slot.route");
const booking_router_1 = require("../modules/Bookings/booking.router");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoute,
    },
    {
        path: '/services',
        route: service_route_1.ServiceRoute,
    },
    {
        path: '/slots',
        route: slot_route_1.SlotRoute,
    },
    {
        path: '/bookings',
        route: booking_router_1.BookingRoute,
    },
    {
        path: '/my-bookings',
        route: booking_router_1.BookingGetRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
