const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: "Fill All Details", success: false });
  }
  try {
     const userExist = await User.findOne({ email: email });
     if (!userExist) {
       return res.status(401).json({ error: "User Not Exist.", success: false });
    }
    const verifyPass = await bcrypt.compare(password, userExist.password);
    if(!verifyPass){
        return res.status(401).json({ error: "Auth Fail!", success: false });
    }
    const token = jwt.sign({ userId: userExist._id }, process.env.JWT);
    const expirationDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year from now
    const options = {
      expires: expirationDate,
      httpOnly: true,
      secure: true,
      sameSite: "strict", 
    };
    res.cookie("token",token,options).status(200).json({ message: "Login Done!", success: true });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error, success: false });
  }
};



const registerController = async (req, res) => {
  const { email, password, cpassword, name, phone } = req.body;

  if (!email || !password || !name || !phone || !cpassword) {
    return res.status(401).json({ error: "Fill All Details", success: false });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res
        .status(401)
        .json({ error: "User Exist.", success: false });
    }
    const user = new User({
      name,
      email,
      phone,
      password,
      cpassword,
    });

    await user.save();
    res.status(200).json({ message: "Register Done!", success: true });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error, success: false });
  }
};




const allUsers = async (req, res) => {
  try {
    const userExist = await User.find().exec();
    res.status(200).json(userExist);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error, success: false });
  }
};



const allBoards = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const boards = user.boards;
    return res.json({ boards });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
};



const singleBoard = async (req, res) => {
  const { userId, boardId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const board = user.boards.id(boardId);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    return res.json({ board });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
};


const createBoard = async (req, res) => {
  const { userId } = req.params;
  const { title } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.boards.push({ title });
    await user.save();

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};


const updateBoard = async (req, res) => {
  const { userId, boardId } = req.params;
  const { title } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const board = user.boards.id(boardId);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    board.title = title;
    await user.save();

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
};


const deleteBoard = async (req, res) => {
  const { userId, boardId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user.boards.id(boardId));
    user.boards.id(boardId).deleteOne();
    await user.save();

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};




const getAllCards = async (req,res)=>{
  const { userId, boardId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const board = user.boards.id(boardId);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    const cards = board.cards;
    return res.json({ cards });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
}


const updateCard = async (req,res)=>{
   const { userId, boardId, cardId } = req.params;
   const { title, content } = req.body;


   try {
     const user = await User.findById(userId);
     if (!user) {
       return res.status(404).json({ error: "User not found" });
     }

     const board = user.boards.id(boardId);
     if (!board) {
       return res.status(404).json({ error: "Board not found" });
     }

     const card = board.cards.id(cardId);
     if (!card) {
       return res.status(404).json({ error: "Card not found" });
     }
     console.log(card.title);
      card.title = title;
      card.content = content;
      await user.save();

     return res.json({ card });
   } catch (error) {
     return res.status(500).json({ error: "An error occurred" });
   }

}


const deleteCard = async (req, res) => {
  const { userId, boardId, cardId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user.boards.id(boardId));
    user.boards.cards.id(cardId).deleteOne();
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

const createCard = async (req,res)=>{
  const { userId, boardId } = req.params;
  const { title, content } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const board = user.boards.id(boardId);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    board.cards.push({ title, content });
    await user.save();

    const newCard = board.cards[board.cards.length - 1]; // Get the newly created card
    return res.status(201).json(newCard);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
} 


const getCard = async (req, res) => {
  const { userId, boardId, cardId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const board = user.boards.id(boardId);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    const card = board.cards.id(cardId);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    return res.json({ card });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
};


module.exports = { loginController, registerController ,singleBoard , allBoards , createBoard , updateBoard  , deleteBoard , getAllCards , updateCard , deleteCard , createCard , getCard , allUsers};
