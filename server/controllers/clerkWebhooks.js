import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    // Create a Svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Getting Headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verifying Heders
    await whook.verify(JSON.stringify(req.body), headers);

    // Getting Data from request body
    const { data, type } = req.body;



    // Switch Cases for different Events
    console.log("🔗 Clerk webhook received:", type, "for user:", data.id);
    
    switch (type) {
      case "user.created": {
        const fullName = (data.first_name + " " + data.last_name).trim().toUpperCase();
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          username: fullName || "USER",
          image: data.image_url,
          role: "user",
          recentSearchedCities: [],
        }
        await User.create(userData);
        console.log("✅ User created in database:", data.id);
        break;
      }

      case "user.updated": {
        const fullName = (data.first_name + " " + data.last_name).trim().toUpperCase();
        const userData = {
          email: data.email_addresses[0].email_address,
          username: fullName || "USER",
          image: data.image_url,
        }
        await User.findByIdAndUpdate(data.id, userData);
        console.log("✅ User updated in database:", data.id);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("✅ User deleted from database:", data.id);
        break;
      }

      default:
        console.log("⚠️ Unhandled webhook event:", type);
        break;
    }
    res.json({ success: true, message: "Webhook Recieved" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
