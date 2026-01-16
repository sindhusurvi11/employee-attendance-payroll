require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Employee = require("../src/models/Employee.model");

const TOTAL_EMPLOYEES = 100;

const INDIAN_FIRST_NAMES = [
  "Ravi", "Rahul", "Amit", "Suresh", "Vikram", "Arjun",
  "Rohit", "Karthik", "Manoj", "Sunil", "Deepak",
  "Prashant", "Naveen", "Harish", "Mahesh", "Ajay",
  "Sanjay", "Anil", "Rakesh", "Pankaj",
  "Priya", "Ananya", "Kavya", "Neha", "Pooja", "Sneha",
  "Divya", "Shruti", "Shreya", "Aishwarya", "Meera",
  "Lakshmi", "Sushma", "Nandini", "Bhavya", "Ritu"
];

const INDIAN_LAST_NAMES = [
  "Kumar", "Sharma", "Reddy", "Iyer", "Patel",
  "Verma", "Singh", "Gupta", "Nair", "Das",
  "Choudhary", "Bansal", "Agarwal", "Malhotra",
  "Mehta", "Kapoor", "Joshi", "Kulkarni",
  "Deshpande", "Naidu"
];

const SOFTWARE_DEPARTMENTS = [
   // Core Engineering
  "Backend Engineering",
  "Frontend Engineering",
  "Full Stack Engineering",
  "Platform Engineering",
  "Product Engineering",

  // Infrastructure & Ops
  "DevOps",
  "Cloud Engineering",
  "Site Reliability Engineering (SRE)",
  "IT Infrastructure",
  "IT Support",

  // Data & AI
  "Data Engineering",
  "Data Science",
  "Machine Learning",
  "Business Intelligence",

  // Quality & Process
  "QA / Testing",
  "Automation Testing",

  // Product & Delivery
  "Product Management",
  "Project Management",
  "Program Management",

  // Security & Support
  "Information Security",
  "Application Support"
];

const seedEmployees = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Employee.deleteMany();
    console.log("Old employees removed");

    const employees = [];

    for (let i = 0; i < TOTAL_EMPLOYEES; i++) {
      const firstName = faker.helpers.arrayElement(INDIAN_FIRST_NAMES);
      const lastName = faker.helpers.arrayElement(INDIAN_LAST_NAMES);

      employees.push({
        name: `${firstName} ${lastName}`,
        employeeCode: `EMP${1000 + i}`,
        department: faker.helpers.arrayElement(SOFTWARE_DEPARTMENTS),
        baseSalary: faker.number.int({ min: 30000, max: 90000 }),
        status: "active",
        joiningDate: faker.date.past({ years: 3 }),
      });
    }

    await Employee.insertMany(employees);
    console.log(`${TOTAL_EMPLOYEES} Indian IT employees seeded`);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedEmployees();
