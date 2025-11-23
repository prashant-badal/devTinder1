const express = require('express')
const connectDatabasess = require("./config/database")
const cookieParser = require('cookie-parser')

const app = express()
const port = 3000

const authRoutes=require('./routes/authRoutes')  
const {adminAuth}=require('./middlewares/auth.jsx')
const ProfileRoutes=require('./routes/profile.js')

app.use(express.json())
app.use(cookieParser())

connectDatabasess().then(() => console.log('MongoDB connected'))
.then(()=>app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}))

  .catch(err => console.error('MongoDB connection error:', err));


app.use('/ok', (req, res,next) => {
console.log('Hello1!')
next()
},
 (req, res,next ) => {
console.log('Hello 1-2')
next()  
}
)

app.use('/profile',adminAuth,ProfileRoutes)



  app.use("/session",authRoutes)

app.use('/', (req, res) => {
  console.log('Hello ok second!')

  res.send('Hello ok second!')
})



