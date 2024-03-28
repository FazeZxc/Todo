import express, {
  Express,
  Request,
  Response,
  Application,
  response,
} from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { User } from "./models/user";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { authenticationToken } from "./middlewares/auth";
import { Todo } from "./models/todos";
import cookieParser from 'cookie-parser'
dotenv.config();

const app: Application = express();
const port = (process.env.PORT as string) || 8000;
const jwtsecretKey: string = process.env.JWTSECRET as string;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser())
app.use(bodyParser.json());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Express");
});

app.post("/auth/register", async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);

    const user = req.body;
    const { name, email } = user;
    const isEmailAlreadyExist = await User.findOne({
      email: email,
    });
    if (isEmailAlreadyExist) {
      res.status(400).json({
        status: 400,
        message: "Email already in use",
      });
      return;
    }
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      status: 201,
      message: "User created Successfully",
      user: newUser,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

app.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { email, password } = user;
    const isUserExist = await User.findOne({
      email: email,
    });

    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        message: "User not found",
      });
      return;
    }
    const isPasswordMatched = await bcryptjs.compare(
      req.body.password,
      isUserExist?.password
    );
    if (!isPasswordMatched) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "Wrong password",
      });
      return;
    }
    const token = jwt.sign(
      { _id: isUserExist?._id, email: isUserExist?.email },
      jwtsecretKey
    );
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Login Success",
      token: token,
      user: isUserExist,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

app.get("/protected", authenticationToken, (req: Request, res: Response) => {
  res.send("Welcome to protected route!");
});

app.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.send("Logged out successfully");
});

app.get("/todos", authenticationToken, async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      todos: todos,
      message: "Todos fetched from the server",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/todos", authenticationToken, async (req: Request, res: Response) => {
  try {
    const { title, status, dueDate, createdby, description, tickedComplete } =
      req.body;
    const newTodo = new Todo({
      title,
      status,
      dueDate,
      createdby,
      description,
      tickedComplete,
    });
    await newTodo.save();
    res.status(201).json({
      newTodo: newTodo,
      message: "Todo created succesfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create a to-do");
  }
});

app.put(
  "/todos/:id",
  authenticationToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, status, dueDate, createdby, description, tickedComplete } =
        req.body;
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { title, status, dueDate, createdby, description, tickedComplete },
        { new: true }
      );
      if (!updatedTodo) {
        return res.status(404).json({
          message: "to-do not found",
        });
      }
      res.status(200).json({
        message: "to-do updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.delete(
  "/todos/:id",
  authenticationToken,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, status, dueDate, createdby, description, tickedComplete } =
        req.body;
      const deletedTodo = await Todo.findByIdAndDelete(id);
      if (!deletedTodo) {
        return res.status(404).json({
          message: "to-do not found",
        });
      }
      res.status(200).json({
        message: "to-do deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("🛢️ Connected To Database");
  } catch (error) {
    console.log("⚠️ Error to connect Database");
  }
});
