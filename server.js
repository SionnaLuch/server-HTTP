const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({storage: storage})
const app = express();
app.engine('hbs', hbs());
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});
app.post('/contact/send-message', upload.single('uploadedFile'), (req, res) => {
    const { author, sender, title, message } = req.body;
    const uploadedFile = req.file;
    if (author && sender && title && message && uploadedFile) {
      res.render('contact', { isSent: true, name: uploadedFile.originalname });
    }
    else {
      res.render('contact', { isError: true });
    }
  });

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', { layout: 'dark' });
  });

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});


app.listen(8008, () => {
  console.log('Server is running on port: 8008');
});