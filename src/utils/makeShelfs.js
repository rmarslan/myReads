const makeShelfs = books => {
    const shelfs = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    books.forEach(book => {
        shelfs[book.shelf].push(book);
    });

    return shelfs;
}

export default makeShelfs;