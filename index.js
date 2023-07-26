const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser');

// middleware configured to parse the request body
app.use(express.json());

const USERS = [{"email":"kruthi@gmail.com","password":"1234","role":"admin"}];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];

//must include / at the end of each line if we want actual line breaks inside code:

const SUBMISSIONS = [
    {
        title: "Two states",
        description: "Given an array , return the maximum of the array?",
        language: "python",
        code: `
        def findMax(arr):
            return(max(arr))
        `,
        status: "rejected"
    },
    {
        title: "Next problem",
        description: "Given an array , return the minimum of the array?",
        language: "python",
        code: `
        def findMin(arr):
            return(min(arr))
        `,
        status: "accepted"
    }
];

app.get('/', function(req,res){
    res.send("WELCOME TO EXPRESS KRUTHI")
})

//admin roles have to be directly inserted into the USERS array as of now
app.post('/signup', function(req, res) {
  const {email, password} = req.body;

  const existingUser = USERS.find(user => user.email == email);
  
  if(existingUser){
    return res.status(409).send('User with this email already exists')
  }

  USERS.push({email: email, password: password, role: "user"})
 
  res.sendStatus(200);
})

app.post('/login', function(req, res) {
    const {email, password} = req.body;

    const existingUser = USERS.find(user => user.email == email);

    if(existingUser){
        if(existingUser.password == password){
            res.status(200).send("Successfull login")
        }else{
            res.status(401).send("wrong password, try again")
        }
    }else{
        res.send("account not found, Sign Up here")
    }
})

app.get('/questions', function(req, res) {
    res.json(QUESTIONS)
})

//only admins can add questions
app.post('/questions', function(req,res){

    const{userEmail, title, description, testCases} = req.body;

    const isAdmin = USERS.find(user => user.email == userEmail)

    if(isAdmin){
        QUESTIONS.push({title: title, description: description, testCases: testCases});
        console.log(QUESTIONS)
        res.send("Added question successfully")
    }else{
        console.log(QUESTIONS)
        res.status(222).send("only admins can add questions")
    }

})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  res.json(SUBMISSIONS)
});


app.post("/submissions", function(req, res) {
    // let the user submit a problem, randomly accept or reject the solution
    // Store the submission in the SUBMISSION array above
    const {title, description, language, code} = req.body
    let state;
    if(language == "python"){
        state = "accepted"
    }else{
        state = "rejected"
    }
    console.log("before")
    console.log(SUBMISSIONS)
    SUBMISSIONS.push({title:title, description:description, language:language, code:code, status: state})
    console.log("after")
    console.log(SUBMISSIONS)
    res.send("The submission was "+ state)
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function() {
  console.log(`Application listening on port ${port}`)
})