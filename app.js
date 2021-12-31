const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = /*process.env.PORT ||*/ 3000;

app.use(bodyParser.json());
const db = require("./models");

const {User} = require("./models");
const {Answer} = require("./models");

app.get('/getAnswers', (req, res)=>{
    Answer.findAll().then((answers)=>{
        res.send(answers);
    }).catch(err => {
        if(err){
            res.status(404).json(err);
        }
    });
});

app.get('/getAnswer/:userId', (req, res)=>{
    Answer.findAll({where: {userid: req.params.userId}}).then((answers)=>{
        res.send(answers);
    }).catch(err => {
        if(err){
            res.status(404).json(err);
        }
    });
});

app.post('/insertAnswer', (req, res)=>{
    Answer.create({
        answerTag: req.body.answerTag,
        answerTime: req.body.answerTime,
        isFavourite: req.body.isFavourite,
        isModeration: req.body.isModeration,
        isReported: req.body.isReported,
        isVerified: req.body.isVerified,
        userAnswer: req.body.userAnswer,
        userId: req.body.userId,
        userVote: req.body.userVote,
    }).catch(err => {
        if(err){
            res.status(404).json(err);
        }
    }).then(function(answer) {
        res.json(answer);
    });
});

app.put('/updateAnswer/:id', (req, res)=>{
    Answer.findByPk(req.params.id).then(function(answer) {
        answer.update({
            answerTag: req.body.answerTag,
            answerTime: req.body.answerTime,
            isFavourite: req.body.isFavourite,
            isModeration: req.body.isModeration,
            isReported: req.body.isReported,
            isVerified: req.body.isVerified,
            userAnswer: req.body.userAnswer,
            userId: req.body.userId,
            userVote: req.body.userVote
        }).catch(err => {
            if(err){
                res.status(404).json(err);
            }
        }).then((answer) => {
            res.json(answer);
        });
    });
});

app.delete('/deleteAnswer/:id', async (req, res)=>{
    let deletedAnswer = await Answer.findByPk(req.params.id);
    if(deletedAnswer==null){
        res.status(404).json("Answer is not available.");
        return;
    }
    Answer.destroy({where: {id: req.params.id}}).then(() => {
        res.json(deletedAnswer);
    });
});


app.get('/select', (req, res)=>{
    User.findAll().then((users)=>{
        res.send(users);
    }).catch(err => {
        if(err){
            res.status(404).json(err);
        }
    });
});

app.get('/select/:id', (req, res)=>{
    User.findAll({where: {id: req.params.id}}).then((users)=>{
        res.send(users);
    }).catch(err => {
        if(err){
            res.status(404).json(err);
        }
    });
});

app.post('/insert', (req, res)=>{
    if(isBlank(req.body.firstName) || isBlank(req.body.lastName)){
        res.status(404).json("Name Cant be blank.");
        return;
    }

    if(!req.body.userAge || req.body.userAge <= 10){
        res.status(404).json("Age Should be more than 10+.");
        return;
    }
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword,
        userAge: req.body.userAge
    }).catch(err => {
        if(err){
            res.status(404).json(err);
        }
    }).then(function(user) {
        res.json(user);
    });
});

app.put('/update/:id', (req, res)=>{
    User.findByPk(req.params.id).then(function(user) {
        if(!req.body.userAge || req.body.userAge <= 10){
            res.status(404).json("Age Should be more than 10+.");
            return;
        }
        user.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword,
            userAge: req.body.userAge
        }).catch(err => {
            if(err){
                res.status(404).json(err);
            }
        }).then((user) => {
            res.json(user);
        });
    });
});

app.delete('/delete/:id', async (req, res)=>{
    let deletedUser = await User.findByPk(req.params.id);
    if(deletedUser==null){
        res.status(404).json("User is not available.");
        return;
    }
    User.destroy({where: {id: req.params.id}}).then(() => {
        res.json(deletedUser);
    });
});

db.sequelize.sync().then((req)=>{
    app.listen(port, () => {
        console.info(`Listening on port http://localhost:${port}`);
    });
});

//For checking if a variable is falsey or if the string only contains whitespace or is empty, I use:
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}
