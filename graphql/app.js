var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const app = express();

app.use(express.json());

// Add dependency
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


app.get('/users', async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/movies', async (req, res) => {
    try {
      const movies = await prisma.movies.findMany();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/users/:id', async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.params.id },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User Not Found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await prisma.users.create({
      data: { name, email, password },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await prisma.users.update({
      where: { id: req.params.id },
      data: { name, email },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await prisma.users.delete({
      where: { id: req.params.id },
    });
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
