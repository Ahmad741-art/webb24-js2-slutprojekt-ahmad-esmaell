import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { log } from 'console';

const app = express();
app.use(cors());
app.use(express.json());


const PORT = 3000;

const productsFile = path.resolve('src/product.json');


await app.get('/products', (req, res) => {

  console.log("TEST");
  

  fs.readFile(productsFile, 'utf8', (err, data) =>  {

    if (err) {
      return res.status(500).json({ error: 'Unable to load products' });
    } else {
      const object = JSON.parse(data);
      res.json(object);
    }
  });




});


app.post('/transaction', (req, res) => {
  console.log("HEJHEJ");
  
  const purchasedItems = req.body;
  console.log("Processing purchase request:", purchasedItems);

  fs.readFile(productsFile, 'utf8', (err, data) => {
    if (err) {
      console.error("Failed to load products:", err);
      return res.status(500).json({ error: 'Unable to load products' });
    }

    let products = JSON.parse(data);

    purchasedItems.forEach(purchasedItem => {
      const product = products.find(p => p.id === purchasedItem.id);
      if (product && product.stock >= purchasedItem.quantity) {
        product.stock -= purchasedItem.quantity;
      }
    });

console.log("IN PRODUCTS OBJECT:", products);


    fs.writeFile(productsFile, JSON.stringify(products, null, 2), (err) => {
      if (err) {
        console.error("Error writing to products.json:", err);
        return res.status(500).json({ error: 'Failed to update product stock' });
      }

      console.log("Stock successfully updated in products.json");
      res.status(200).json({ message: 'Stock updated successfully' });
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});