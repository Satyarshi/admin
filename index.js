
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import express from "express";
import User from "./models/User.js";
import { Components,componentLoader } from "./components.js";

AdminJS.registerAdapter(AdminJSMongoose);

const PORT = 3000;
const app = express();
app.use(express.json());

const adminJS = new AdminJS({
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: {
            isVisible: {list: false, 
                filter: false, 
                show: ({ currentAdmin }) => currentAdmin?.role === 'admin', 
                edit: ({ currentAdmin }) => currentAdmin?.role === 'admin', },
          },
          role:{
            components:{
                list: Components.RoleBadge,
                edit: Components.MyRole,
            }
          }
        },
        actions: {
          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role === "admin",
          },
          edit: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role === "admin",
          },
          delete: {
            isAccessible: ({ currentAdmin }) => currentAdmin?.role === "admin",
          },
          list: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin?.role === "admin" || currentAdmin?.role === "viewer",
          },
        },
      },
    },
  ],
  componentLoader,
  rootPath: "/admin",
});
adminJS.watch()

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJS, {
  authenticate: async (username,password) => {
    const user = await User.findOne({ username,password });
    if (user&&user.password===password) {
      return user;
    }
  },
  cookiePassword: "some-secret-password",
});

app.use(adminJS.options.rootPath, adminRouter);

app.post("/createUser", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const newUser = new User({ username, password, role });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
