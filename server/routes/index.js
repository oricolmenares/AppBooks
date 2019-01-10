var express = require('express');
var router = express.Router();
var path= require('path');
var axios = require('axios');

const isbns = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/books',function(req, res, next){
  res.sendFile(path.join(__dirname,'..','public','html','index.html'))
  
})

router.get('/books/detalle',function(req, res, next){
  res.sendFile(path.join(__dirname,'..','public','html', 'detalle.html'))
});

router.get('/booknew',function(req, res, next){
  res.sendFile(path.join(__dirname,'..','public','html','nuevo.html'))
})

//GET 
router.get('/api/books',function(req, res, next){
  const keyword= req.query.search

  axios
  .get('https://www.googleapis.com/books/v1/volumes?q='+ keyword)
  .then(function(result){
      const books = result.data.items.map(function(book){
        return{
        title: book.volumeInfo.title,
        id: book.id,
        subtitle: book.volumeInfo.subtitle,
        description: book.volumeInfo.description,
        authors: book.volumeInfo.authors,
        cover: book.volumeInfo.imageLinks ?
         book.volumeInfo.imageLinks.thumbnail : 'http://s3-eu-west-1.amazonaws.com/cinemania-cdn/wp-content/uploads/2019/01/06124759/Batman_Largo_Halloween.png',
        }
      })
      console.log(books)
      
      res.json(books);
  })
  
})

//GET DETAIL
router.get('/api/books/:id', function (req, res) {
  const id = req.params.id;
  axios
    .get('https://www.googleapis.com/books/v1/volumes?q=id:' + id)
    .then(function (result) {
      const book = result.data.items[0];
      const newBook = {
        id: book.id,
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        cover: book.volumeInfo.imageLinks ?
                book.volumeInfo.imageLinks.thumbnail : IMG_DEFAULT,
        }

        res.json(newBook);
    })
})



module.exports = router;
