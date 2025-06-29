import logger from "../config/logger.js";
import { BookShelf } from "../models/book-shelf.js";
import CrudRepository from "./crud-repository.js";

class BookRepository extends CrudRepository{
  constructor(){
    super(BookShelf)
  }
  bulkCreate = async (data) => {
        try {
            const bookShelves = await BookShelf.insertMany(data);
            return bookShelves;
        } catch(error) {
            logger.error('Something went wrong in BookShelf Repository : bulkCreate', error);
            throw error;
        }
    }

    getAllShelvesForAUser = async (userId) => {
        try {
            const shelves = await BookShelf.find({
                userId: userId
            }).populate({
                path: 'books',
                populate: {
                    path: 'author genres',
                }
            });
            return shelves;
        } catch(error) {
            logger.error('Something went wrong in BookShelf Repository : getAllShelfsForAUser', error);
            throw error;
        }
    }

    addBookToShelf = async (userId, shelfName, bookId) => {
        try {
            const shelf = await BookShelf.findOne({
                userId: userId,
                name: shelfName
            });
            shelf.books.push(bookId);
            await shelf.save();
            return shelf;
        } catch(error) {
            logger.error('Something went wrong in BookShelf Repository : addBookToShelf', error);
            throw error;
        }
    }

    getUserShelf = async (userId, shelfName) => {
        try {
            const shelf = await BookShelf.findOne({
                userId: userId,
                name: shelfName
            }).populate('books');
            return shelf;
        } catch(error) {
            logger.error('Something went wrong in BookShelf Repository : getUserShelf', error);
            throw error;
        }
    }
}

export default BookRepository