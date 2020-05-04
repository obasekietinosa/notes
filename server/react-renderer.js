const React = require('react')
const renderToString = require('react-dom/server').renderToString
const matchPath = require('react-router').matchPath
const path = require('path')
const fs = require('fs')

const App = require('../src/Components/App/App').default

const BlogService = require('../src/Services/BlogService').default

const blogService = new BlogService()

exports = module.exports

exports.render = (routes) => {
    return async (req, res, next) => {
        var match = routes.find(route => matchPath(req.path, {
            path: route,
        }))

        const is404 = req._possible404

        if (match || is404) {
            const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

            fs.readFile(filePath, 'utf8', async (err, htmlData) => {
                if (err) {
                    console.error('err', err)
                    return res.status(404).end()
                }

                const location = req.url

                let posts = []
                
                if (is404) {
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    console.log(`SSR of unrouted path ${req.path} (404 ahead)`)
                }
                else {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    console.log(`SSR of ${req.path}`)
                    if(req.path.includes('/posts')){
                        posts = await blogService.getPosts()
                    }
                }
                // console.log(posts)
                const jsx = <App posts={posts} location={location} />
                const reactDom = renderToString(jsx)

                const renderedHTML = htmlData.replace(
                    '<div id="root" class="loader"></div>',
                    `<div id="root" class="loader">${reactDom}</div>`
                ).replace(
                    '__STORE__',
                    JSON.stringify(posts).replace("script>", "srcipt>")
                )

                return res.end(
                    renderedHTML
                )
            })
        }
        else {
            req._possible404 = true
            return next()
        }
    }
}