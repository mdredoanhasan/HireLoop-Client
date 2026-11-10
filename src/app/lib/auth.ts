import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("HireLoop");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
   user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "seeker",
        input: true, // lets the sign-up request send it
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Only these roles can be chosen at sign up.
          const allowed = ["seeker", "recruiter"]
          const role = allowed.includes(user.role as string)
            ? (user.role as string)
            : "seeker"
          return { data: { ...user, role } }
        },
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
