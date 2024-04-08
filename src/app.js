import express from 'express';
import { __dirname } from './utils.js';

import {productRouter} from '../src/routes/products.router.js'
import { uploader } from './multer.js';
import { cartRouter } from '../src/routes/carts.router.js';


const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(express.static(__dirname+'/public'));
app.use('/subir-archivo', uploader.single('myFile'), (req, res) => {
    if(!req.file) {
        return res.send('No se pudo subir el archivo')
    }
    res.send('Archivo subido')
})


app.listen(port, () => console.log(`¡Servidor arriba en el puerto ${port}`))

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)