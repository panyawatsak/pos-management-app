const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

const PORT = 5000;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log('DB Connection Error:', err));