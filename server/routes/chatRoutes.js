import express from 'express'
import { protect } from '../middlewares/auth.js';
import { createChats, deleteChats, getChats } from '../controllers/chatController.js';

const chatRouter=express.Router();

chatRouter.get('/create' , protect,createChats);
chatRouter.get('/get' , protect,getChats);
chatRouter.post('/delete' , protect,deleteChats);

export default chatRouter