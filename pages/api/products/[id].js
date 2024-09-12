import dbConnect from '../../../config/db';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  await dbConnect();
  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case 'GET':
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.status(200).json(product);
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!product) {
          return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.status(200).json(product);
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedProduct = await Product.deleteOne({ _id: id });
        if (!deletedProduct) {
          return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: `Método ${method} no permitido` });
      break;
  }
}