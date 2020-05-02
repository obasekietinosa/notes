const express = require('express')
const path = require('path')

const PORT = 3000

const reactRenderer = require('./react-renderer');
const routes = ['/', '/page'];

const app = express()

app.get('/*', reactRenderer.render(routes))

app.use(express.static(path.resolve(__dirname, '../build')))
app.use(express.static(path.resolve(__dirname, '../public')))

app.use(reactRenderer.render(routes))

app.listen(PORT, () => console.log("Etin's Notes."))