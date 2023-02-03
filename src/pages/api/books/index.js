//import { getSession } from 'next-auth/react';
import Book from '../../../models/Book';
import dbConnect from '../../../utils/db';

const handler = async (req, res) => {
  //const session = await getSession({ req });
  //if (!session) {
  //  return res.status(401).send('signin required');
  //}

  //const { user } = session;
  await dbConnect();
  
  const result = await Book.find({})

  res.send(result)
  /*const newOrder = new Order({
    ...req.body,
    user: user._id,
  })result;



  const order = await newOrder.save();
  */
  

  //res.status(201).send({message: 'Order saved succesfully'});
};
export default handler;