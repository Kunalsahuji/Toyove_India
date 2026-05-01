import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

connectDB(); // Uncomment when .env is ready

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
