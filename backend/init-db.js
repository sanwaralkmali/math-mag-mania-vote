const mongoose = require('mongoose');
require('dotenv').config();

const initialMagazines = [
  {
    id: "11a",
    title: "Grade 11A Math Magazine",
    grade: "11A",
    coverImage: "https://sanwaralkmali.github.io/math-mag-mania-vote/magazine-covers/G11A_CP.png",
    flipHtml5Url: "https://online.fliphtml5.com/plyrp/ikfu/",
    qrCodeImage: "https://sanwaralkmali.github.io/math-mag-mania-vote/qr-codes/G11A_QR.png",
    votes: 0
  },
  {
    id: "11b",
    title: "Grade 11B Math Magazine",
    grade: "11B",
    coverImage: "https://sanwaralkmali.github.io/math-mag-mania-vote/magazine-covers/G11B_CP.png",
    flipHtml5Url: "https://online.fliphtml5.com/plyrp/ylzh/",
    qrCodeImage: "https://sanwaralkmali.github.io/math-mag-mania-vote/qr-codes/G11B_QR.png",
    votes: 0
  },
  {
    id: "12a",
    title: "Grade 12A Math Magazine",
    grade: "12A",
    coverImage: "https://sanwaralkmali.github.io/math-mag-mania-vote/magazine-covers/G12A_CP.png",
    flipHtml5Url: "https://online.fliphtml5.com/plyrp/ulbp/",
    qrCodeImage: "https://sanwaralkmali.github.io/math-mag-mania-vote/qr-codes/G12A_QR.png",
    votes: 0
  },
  {
    id: "12b",
    title: "Grade 12B Math Magazine",
    grade: "12B",
    coverImage: "https://sanwaralkmali.github.io/math-mag-mania-vote/magazine-covers/G12B_CP.png",
    flipHtml5Url: "https://online.fliphtml5.com/plyrp/cbmq/",
    qrCodeImage: "https://sanwaralkmali.github.io/math-mag-mania-vote/qr-codes/G12B_QR.png",
    votes: 0
  }
];

const magazineSchema = new mongoose.Schema({
  id: String,
  title: String,
  grade: String,
  coverImage: String,
  flipHtml5Url: String,
  qrCodeImage: String,
  votes: { type: Number, default: 0 }
});

const Magazine = mongoose.model('Magazine', magazineSchema);

async function initializeDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/math-mag-mania');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Magazine.deleteMany({});
    console.log('Cleared existing data');

    // Insert initial data
    await Magazine.insertMany(initialMagazines);
    console.log('Initial data inserted successfully');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

initializeDatabase(); 