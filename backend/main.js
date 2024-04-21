const express = require('express')
const db = require('./dataBaseConfig');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use(express.json())
app.use(express.static('uploads'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))

db.connect((err) => {
    if (err) throw err 
    else {
        console.log('database connected')
    }
})

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productType VARCHAR(255) NOT NULL,
    productBrand VARCHAR(255) NOT NULL,
    productPrice VARCHAR(255) NOT NULL,
    productRating VARCHAR(255) NOT NULL
  )
`;

db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table created successfully:');
  });


// product routes
app.use('/api', productRoutes);

// admin routes
app.use('/api', adminRoutes);

app.get('/cartdata', (req, res) => {
    let sql = 'select * from cart'
    db.query(sql, (err, result) => {
        if (err) throw err
        else {
            res.json(result)
        }
    })
})

app.post('/submitCart', (req, res) => {
    let product_name = req.body.product_name
    let product_type = req.body.product_type
    let product_rating = req.body.product_rating
    let product_price = req.body.product_price
    let value = [[product_name, product_type, product_rating, product_price]]
    let sql = "insert into cart(product_name,product_type,product_rating,product_price) values ?"
    db.query(sql, [value], (err, result) => {
        if (err) throw err
        else {
            res.send("submit")
        }
    })
})

app.delete('/removecart/:id', (req, res) => {
    let id = req.params.id
    let sql = "delete from cart where id = ?"
    db.query(sql, [id], (err, result) => {
        if (err) throw err
        else {
            res.send("deleted")
        }

    })
})


app.listen(3000, () => {
    console.log('server running on port 3000')
})
