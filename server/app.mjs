import cors from "cors";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const filerPath = `${__dirname}/reviews.json`;
const data = fs.readFileSync(filerPath, "utf-8");

const saveReview = () => {
  let reviews = []

  if (fs.existsSync(filerPath)) {
    reviews = JSON.parse(data);
  }

  reviews.push(reviewData);

  fs.writeFileSync(filerPath, JSON.stringify(reviews, null, 2));
};

app.post ("/reviews", (req, res) => {
  const { bookTitle, author, reviewer, rating, review } = req.body;
  console.log("Recension mottagen:", req.body);

  const id = uuidv4();

  try {
    const newReview = {
      bookTitle,
        author,
        reviewer,
        rating,
        review,
        id,
        timestamp: new Date().toISOString(),
    };

    //consloe.log("newReview:", newReview);

    saveReview(newReview);

    res.status(201).json({ message: "Recension skapad", review: newReview });
  } catch (error) {
    
    console.log("Fel vid skapande av recension:", error);

    res.status(500).json({ success: false });
  }
});


export default app;