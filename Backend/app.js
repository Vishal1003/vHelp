const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv');

const app = express();
env.config();

app.use(cors());
app.options('*', cors());

// database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'vHelp',
  })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
const vendorRoutes = require('./routes/vendor');
const userRoutes = require('./routes/user');

app.use('/vendor', vendorRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => {
  console.log('Server Started!');
});
