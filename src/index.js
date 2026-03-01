import express from 'express';
import 'dotenv/config'
import axios from 'axios';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/message', async (req, res) => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    
    res.json({
      message: 'Express backend is working',
      quote: response.data.content,
      author: response.data.author,
      timestamp: new Date().toLocaleString('ru-RU')
    });
  } catch (error) {
    res.json({
      message: 'Express backend succesfully started!',
      status: 'Working is well',
      timestamp: new Date().toLocaleString('ru-RU')
    });
  }
});

app.listen(PORT, () => {
    console.log(`Server started at port http://localhost:${PORT}`);
    console.log(`Check route: http://localhost:${PORT}/api/message`);
});
