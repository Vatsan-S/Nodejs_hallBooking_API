const halls = [
  {
    roomID: 1,
    hallName: "Wedding hall_1",
    seatCount: 2500,
    amenities: [
      "airconditioner",
      "Echo proof",
      "Restrooms",
      "Audio visual Equipments",
    ],
    price: 10000,
    customersBooked: [],
  },
  {
    roomID: 2,
    hallName: "Conference Hall",
    seatCount: 150,
    customersBooked: [],
    amenities: [
      "Air Conditioner",
      "Audio Visual Equipment",
      "Furnitures",
      "Internet",
      "Restrooms",
    ],
    price: 1500,
  },
  {
    roomID: 3,
    hallName: "party Hall",
    seatCount: 75,
    customersBooked: [],
    amenities: [
      "AirConditioner",
      "Audio Visual Equipments",
      "Banquete Hall",
      "Restrooms",
    ],
    price: 1800,
  },
  {
    roomID: 4,
    hallName: "Meeting Hall",
    seatCount: 25,
    customersBooked: [],
    amenities: ["AirConditioner", "Projector setup", "Restrooms", "Furnitures"],
    price: 1200,
  },
  {
    roomID: 5,
    hallName: "Auditorium Hall",
    seatCount: 5000,
    customersBooked: [],
    amenities: [
      "Adequete Ventilation",
      "Restrooms",
      "Parking Facility",
      "Air coolers",
    ],
    price: 12000,
  },
];

const customerList = [
  {
    customerName: "Vignesh",
    customerBookingDetails: [],
  },
  {
    customerName: "Vishnu",
    customerBookingDetails: [],
  },
  {
    customerName: "Vinoth",
    customerBookingDetails: [],
  },
];

export const createRoom = (req, res) => {
  const { hallName, seatCount, amenities, price } = req.body;
  const newRoom = {
    roomID: halls.length + 1,
    hallName: hallName,
    seatCount: seatCount,
    amenities: amenities,
    price: price,
    customersBooked:[]
  };
  halls.push(newRoom);
  res.status(200).send({ message: "New room created", data: newRoom });
};

export const roomsList = (req, res) => {
  res.status(200).send(halls);
};

export const roomBooking = (req, res) => {
  const { roomID, customerID, customerName, date, startTime, endTime } =
    req.body;
  const newBooking = {
    roomID: roomID,
    customerID: customerID || customerList.length + 1,
    customerName: customerName,
    date: date,
    startTime: startTime,
    endTime: endTime,
  };
  let availability = true;
  halls.map((ele) => {
    if (ele.roomID == roomID) {
      const length = ele.customersBooked.length;

      for (var i = 0; i < length; i++) {
        if (ele.customersBooked[i].date == date) {
          res.send("Room already booked on that date");
          i = length + 1;
          availability = false;
        }
      }

      if (availability) {
        const b = {
          customerName: customerName,
          date: date,
          startTime: startTime,
          endTime: endTime,
        };
        ele.customersBooked.push(b);
        // res.send(ele.customersBooked);
      }
    }
  });
  if (availability) {
    let customerAvailability = false;
    customerList.map((ele) => {
      if (ele.customerName == customerName) {
        let a = {
          bookingDate: date,
          RoomID: roomID,
          // RoomName: hallName,
          startTime: startTime,
          endTime: endTime,
        };
        ele.customerBookingDetails.push(a);
        customerAvailability = true;
      } else {
        return;
      }
    });

    if (!customerAvailability) {
      let newUser = {
        customerName: customerName,
        customerBookingDetails: [
          {
            bookingDate: date,
            RoomID: roomID,
            startTime: startTime,
            endTime: endTime,
          },
        ],
      };
      customerList.push(newUser);
    }
    res.status(200).json({ message: "Customer added successfully" });
  }
};

export const roomBookingDetails = (req, res) => {
  const roomDetailsCopy = [];
  halls.map((ele) => {
    let a = {
      RoomName: ele.hallName,
      BookingDetails: ele.customersBooked,
    };
    roomDetailsCopy.push(a);
  });
  res.status(200).json(roomDetailsCopy);
};

export const customer_list = (req, res) => {
  res.status(200).json(customerList);
};

export const roomBookedByCustomer = (req, res) => {
  const { customerName, roomID } = req.body;
  const output = {
    customerName: "",
    roomName: "",
    datesBooked: [],
    bookedTimes: 0,
  };
  const selectedRoom = halls.filter((ele) => ele.roomID == roomID);
  // console.log(selectedRoom)
  selectedRoom[0].customersBooked.map((ele) => {
    if (ele.customerName == customerName) {
      output.customerName = customerName;
      output.roomName = selectedRoom[0].hallName;
      output.bookedTimes += 1;
      output["datesBooked"].push(ele.date);
    } 
    else {
      return;
    }
  });
  if(output.bookedTimes == 0){
    res.status(404).json({message:"No Customers found on that name"})
  }
  else{
    res.status(200).json(output);
  }
  
};
