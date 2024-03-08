import express from "express"
import ejs from "ejs"
import morgan from "morgan"
import file_routes from "./routes/file_routes.js"


const app= express();
// Use morgan middleware with the "combined" format
app.use(morgan('dev'));

// To access static files 
app.use(express.static('public'));

// register view engine - it checks views folder by default
app.set('view engine', 'ejs');

// Data coming from HTML forms
app.use(express.urlencoded({ extended: true }));

// Data coming as JSON - POSTMAN for instace 
app.use(express.json());



//Server app on the port 3000
app.listen(3000, () => {
    console.log("Express app is listening on the port 3000!");
});

//use routes in the routes folder
app.use(file_routes);

//if file routes are not available render the root('/')
if(!file_routes) {

    app.get('/', (req, res) => {
    res.render('index');
    });
}

app.use((req,res) => {
    console.log(err)
    res.status(404).render('404', { title: '404'});
});


export default app;


