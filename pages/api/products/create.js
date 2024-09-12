import dbConnect from '../../../config/db';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    try {
      const { name, description, price, image } = req.body;
      const product = new Product({ name, description, price, image });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}