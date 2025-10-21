import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

    saveReview(newReview);

    res.status(201).json({ message: "Recension skapad", review: newReview });
  } catch (error) {
    
    console.log("Fel vid skapande av recension:", error);

    res.status(500).json({ success: false });
  }
});


export default app;