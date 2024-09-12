import dbConnect from '../../../config/db';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}