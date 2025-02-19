import  mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(

    {   
        category: {type: String, required: false},
        title: {type: String, required: false},
        summary: {type: String, required: false},
        slug: {type: String, required: false}, 
        coverURL: {type: String, required: false}, 
        pages: {type: Number, required: false}, 
        price: {type: Number, required: false},
        format: {type: String, required: false},
        authors: [{type: String, required: false}],
        language: {type: String, required: false},
        publicationDate: {type: Date, required: false},
        stars: {type: Number, required: false},
    }
    ,
    {
        timestamps: true,
    }
);

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
export default Book;