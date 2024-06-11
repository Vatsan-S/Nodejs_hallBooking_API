import express from "express";
import { roomsList, createRoom, roomBooking, roomBookingDetails, customer_list, roomBookedByCustomer } from "../Controllers/controllers.js";


const router = express.Router()

router.get("/all_rooms",roomsList)
router.post("/create_room", createRoom)
router.post("/book_room", roomBooking)
router.get("/roomList",roomBookingDetails)
router.get("/customer_list",customer_list)
router.get("/customer_count",roomBookedByCustomer)
export default router