const app = require('./src/app')

PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`System starts at PORT: ${PORT}`)
})