const User = require('../models/User')
const Event = require('../models/Event')

exports.loginView = (req,res,next) => {
  res.render('auth/login', {message: req.flash('error')})
}

exports.signUpView = (req,res,next) => {
  res.render('auth/signup')
}

exports.signUpPost = async (req,res,next) => {
  const { name, email, password, genre, age, country } = req.body
  if(email === '' || password === '' || genre === '' || age === '' || country === ''){
    res.render('auth/signup', { 
      message: 'Se requiere llenar todos los campos.'
    })
  }
  const userOnDB = await User.findOne({email})
  if(userOnDB !== null){
    res.render('auth/signup', {
      message: 'Este correo ya está registrado'
    })
  }
  await User.register({name, email, genre, age, country }, password)
  res.redirect('/login')
}

exports.profileView = async (req,res,next) => {
  const user = req.user
  res.render('auth/profile', {user})
}

exports.profilePost = async (req,res,next) => {

}

exports.createEvents = async (req,res,next) => {
  res.render('auth/create')
}

exports.createEventsPost = async (req,res,next) => {
  const { genre, name, date, capacity, price, description } = req.body
  if(genre === '' || name === '' || date === '' || capacity === '' || price === '' || description){
    res.render('auth/create', { 
      message: 'Se requiere llenar todos los campos.'
    })
  }
  await Event.create({genre, name, date, capacity, price, photo, description })
  res.redirect('/create')
}

exports.savedView = async (req,res,next) => {
  res.render('auth/saved')
}

exports.savedPost = async (req,res,next) => {

}

exports.logout = (req,res) => {
  req.logout()
  res.redirect('/')
}
