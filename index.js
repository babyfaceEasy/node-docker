const express = require("express")
const mongoose = require("mongoose")
const session = require('express-session')
const redis = require('redis')
const cors = require('cors')
const { 
    MONGO_USER, 
    MONGO_PASSWORD, 
    MONGO_IP, 
    MONGO_PORT, 
    REDIS_URL, 
    REDIS_PORT, 
    SESSION_SECRET 
} = require('./config/config')
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

const postRoutes = require('./routes/postRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

const connectWithRetry = () => {
    const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
    mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Successfully connected to the db."))
    .catch((e) => {
        console.log(e)
        setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()

app.enable("trust proxy")
app.use(cors({}))
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 60000 // in milliseconds 1000 milliseconds = 1 seconds
    }
}))
app.use(express.json())

app.get("/api/v1", (_, res) => {
    console.log('Yeah it ran here')
    res.send("<h2>It ran things</h2>")
})

app.use('/api/v1/users', userRoutes)
app.use("/api/v1/posts", postRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port: ${port}`))

