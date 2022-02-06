require("dotenv").config();

const mongoose = require("mongoose");

const { Carrier, Ticket, Transaction } = require("../models");

const seed = async () => {
  mongoose.connect(
    process.env.DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Connected");
    }
  );

  const seedCarriers = [
    { name: "Samoborček" },
    { name: "HŽ" },
    { name: "ZET" },
    { name: "Najbolji prijevoznik" },
  ];

  await Carrier.deleteMany({});
  const carriers = await Carrier.insertMany(seedCarriers);
  const carrierIds = carriers.map((carrier) => carrier._id.toString());

  const generateRandomNumber = (numberOfDigits) => {
    let bottomValue = Math.pow(10, numberOfDigits - 1);
    let topValue = 9 * bottomValue;

    return Math.floor(bottomValue + Math.random() * topValue);
  };

  const seedTickets = [];

  carrierIds.forEach((carrierId) => {
    for (let i = 0; i < 3; i++) {
      const departTime = Date.now() + generateRandomNumber(1) * 60 * 60 * 1000;
      const arrivalTime = departTime + (1 + (generateRandomNumber(2) % 23)) * 60 * 60 * 1000;
      const quantity = generateRandomNumber(2);
      seedTickets.push({ departTime, arrivalTime, quantity, carrierId });
    }
  });

  await Ticket.deleteMany({});
  await Ticket.insertMany(seedTickets);

  await Transaction.deleteMany({});

  await mongoose.connection.close();
  console.log("Seeding completed");
};

seed();
