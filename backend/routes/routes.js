const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { loginController , registerController ,singleBoard , allBoards , createBoard , updateBoard  , deleteBoard, getAllCards , updateCard , deleteCard , createCard , getCard , allUsers}  = require('../controller/appController')



router.get('/',(req,res)=>{
    res.send('Hola From Server');
})


//      Auth End Points 
router.post("/login", loginController);
router.post("/register", registerController);
//      User End Points
router.get("/users", allUsers);
//      Boards End Points
router.get("/users/:userId/boards", allBoards);
router.get("/users/:userId/boards/:boardId", singleBoard);
router.post("/users/:userId/boards", createBoard);
router.put("/users/:userId/boards/:boardId",updateBoard);
router.delete("/users/:userId/boards/:boardId", deleteBoard);
//      Cards End Points
router.get("/users/:userId/boards/:boardId/cards", getAllCards);
router.put("/users/:userId/boards/:boardId/cards/:cardId", updateCard);
router.delete("/users/:userId/boards/:boardId/cards/:cardId", deleteCard);
router.post("/users/:userId/boards/:boardId/cards",createCard );
router.get("/users/:userId/boards/:boardId/cards/:cardId",getCard );





module.exports = router;