import express from "express";
import cors from "cors";
import pizzaRoutes from "./routes/pizzaRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = 8081;

// CORS configuration
app.use(cors({
  origin: "*", // Allow all origins for simplicity
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
}));

app.use(express.json());

// API Routes
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
