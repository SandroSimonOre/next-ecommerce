import { getSession } from 'next-auth/react';
import Product from '../../models/Product';
import dbConnect from '../../utils/db';

const handler = async (req, res) => {

    const db = await  dbConnect()
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).send('signin required');
    }

    const {
        title,
        slug,
        description,
        price,
        rating,
        brand,
        category,
        thumbnail,
        image
    } = req.body.data;

    const newProduct = new Product({
        title,
        slug,
        description,
        price,
        rating,
        brand,
        category,
        thumbnail,
        image
    });
    
    await newProduct.save()

    res.status(201).send({message: 'Order saved succesfully'});
};
export default handler;