const app = require('./src/app')
port = 3000

app.listen(port, () => {
    console.log(`System starts at PORT: ${port}`)
})