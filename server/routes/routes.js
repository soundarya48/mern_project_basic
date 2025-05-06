import express from 'express'
import { postData } from '../controller/controller.js'



const route = express.Router();
route.post("/post", postData);





export default route;