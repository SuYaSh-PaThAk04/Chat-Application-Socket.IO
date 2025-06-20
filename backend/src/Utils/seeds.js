import dotenv from "dotenv";
import dbConnect from "../DB/Db.js"
import {User} from "../Models/user.Models.js";

dotenv.config({ path: "../../.env" });
const seedUsers = [
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    username: "emma_t23",
    password: "123456",
    profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    username: "oliviam_88",
    password: "123456",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "sophia.davis@example.com",
    fullName: "Sophia Davis",
    username: "sophiad_19",
    password: "123456",
    profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "ava.wilson@example.com",
    fullName: "Ava Wilson",
    username: "ava_wl",
    password: "123456",
    profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "isabella.brown@example.com",
    fullName: "Isabella Brown",
    username: "isa_brownie",
    password: "123456",
    profileImage: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "mia.johnson@example.com",
    fullName: "Mia Johnson",
    username: "mia_jsn",
    password: "123456",
    profileImage: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "charlotte.williams@example.com",
    fullName: "Charlotte Williams",
    username: "char_willz",
    password: "123456",
    profileImage: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "amelia.garcia@example.com",
    fullName: "Amelia Garcia",
    username: "ameliax_g",
    password: "123456",
    profileImage: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    email: "james.anderson@example.com",
    fullName: "James Anderson",
    username: "james_a1",
    password: "123456",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "william.clark@example.com",
    fullName: "William Clark",
    username: "will_clark22",
    password: "123456",
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "benjamin.taylor@example.com",
    fullName: "Benjamin Taylor",
    username: "ben_tayl",
    password: "123456",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "lucas.moore@example.com",
    fullName: "Lucas Moore",
    username: "lucasmore_33",
    password: "123456",
    profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "henry.jackson@example.com",
    fullName: "Henry Jackson",
    username: "henjackson",
    password: "123456",
    profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "alexander.martin@example.com",
    fullName: "Alexander Martin",
    username: "alexmart99",
    password: "123456",
    profileImage: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "daniel.rodriguez@example.com",
    fullName: "Daniel Rodriguez",
    username: "danrod_777",
    password: "123456",
    profileImage: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];


const seedDatabase = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI);
    await dbConnect();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();