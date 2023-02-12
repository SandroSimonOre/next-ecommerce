import Book from '../../../models/Book';
import dbConnect from '../../../utils/db';

export default async function handler(req, res) {
  
  await dbConnect();
  
  switch (req.method) {

    case 'GET': {
      const result = await Book.find({})
      res.send(result)
      break
    }
      
    case 'POST': {
      res.send({message: 'Not implemented yet...'})
      break
    }
  }
  
}