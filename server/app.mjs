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


const saveReview = () => {
  let reviews = []

  if (fs.existsSync(filerPath)) {
    try {
      const data = fs.readFileSync(filerPath, "utf-8"); //Läser filens innehåll som text 
      reviews = JSON.parse(data)    //Gör om texten till JavaScript-format (oftast en array)

      // Om filen inte innnehåller en array, skapa en tom array
      if(!Array.isArray(reviews)) reviews = []; //Om det inte är en array, skapa en tom array
    } catch (error) {
      // Om JSON är tråsigt eller något går fel -> nollställ reviews
      console.error("Error during read of reviews.json:", error)
      reviews = [];
    }
    
  }

  reviews.push(reviewData);

  try {
    console.log({reviews: reviews});

    // Spara tillbaka alla recensioner till reviews.json
    fs.writeFileSync(filerPath, JSON.stringify(reviews, null, 2));
  } catch (error) {
    // Skriv ut error medelande om något går fel vid skrivning
    console.error("Error writing to reviews.json:")
  }

 
};

app.post ("/save-reviews", (req, res) => {
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