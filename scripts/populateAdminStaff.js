import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import Staff from "../models/Staff.js";

const MONGODB_URI =
  "mongodb+srv://gkrishnasree5_db_user:xIoeHEahcDTrT4Wj@intelligent-complaint-m.8kkt7aq.mongodb.net/?retryWrites=true&w=majority&appName=Intelligent-Complaint-Management-System";

const TARGET_DISTRICT = "Warangal Urban";
const ADMIN_ID = new mongoose.Types.ObjectId();


const adminData = {
  _id: ADMIN_ID,
  name: "Sunitha",
  address: "Warangal Admin Office, Main Road",
    phone: "+919652910937",
  password: "$2b$10$uw/PARv/aH2nLnayLfmqUOSslQ5Wq1DEZO6SNecNru7As7/G3fPg6",
  district: TARGET_DISTRICT,
};

const staffData = [
  {
    name: "Laxmi",
    address: "Hanamkonda Bypass",
    phone: "9900114455",
    password: "$2b$10$uw/PARv/aH2nLnayLfmqUOSslQ5Wq1DEZO6SNecNru7As7/G3fPg6",
    district: TARGET_DISTRICT,
    addedByAdmin: ADMIN_ID,
  },
];

const seedDatabase = async () => {
  try {
   
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Successfully connected to MongoDB.");
    console.log("Starting data insertion...");

    
    await Admin.deleteMany({});
    await Staff.deleteMany({});
    console.log("🧹 Existing Admin (admins) and Staff (staffs) data cleared.");

    await Admin.create(adminData);
    console.log(
      `👤 Admin '${adminData.name}' added successfully (ID: ${ADMIN_ID}).`
    );

    const insertedStaffs = await Staff.insertMany(staffData);
    console.log(
      `👥 Successfully added ${insertedStaffs.length} staff members.`
    );

    console.log(`\n--- Seeding Verification ---`);
    console.log(`Admin ID used for staff: ${ADMIN_ID}`);
    console.log(
      `All staff linked to Admin ID: ${insertedStaffs.every(
        (s) => s.addedByAdmin.toString() === ADMIN_ID.toString()
      )}`
    );
    console.log(`District used for all records: ${insertedStaffs[0].district}`);
  } catch (error) {
    console.error("❌ Database Seeding Failed:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log(
      "🔌 MongoDB connection closed. Check Compass for new collections!"
    );
  }
};

seedDatabase();
