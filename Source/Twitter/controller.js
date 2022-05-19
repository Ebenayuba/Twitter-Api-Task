const db = require("../../db")
const queries = require("./queries")
const bcrypt = require("bcrypt")
const jwtGenerator = require("./utils/jwtGenerator")
const authorization = require("../../middleware/authorization")




const getAllAccounts = (req, res) => {
    db.query(queries.getAllAccounts, (error, results) => {
        res.status(200).send(results.rows)
    })
}


const signUpUser = (req,res) => {   
    bcrypt.hash((req.body.password) , 10 ,(err, hash) =>{
        if(err){
            return res.status(500).json({
                error: err
            })
        } else{
            
            const {name, username, email, created_on, last_login} = req.body
            const password = hash
              

            db.query(queries.checkUsernameExists, [username], (error, results) => {
                if(results.rows.length){
                    return res.status(409).json({ message: 'Username already exists'})
                }   
            })
            
            //check if email exists
            db.query(queries.checkEmailExists, [email], (erro, results) => {
                if(results.rows.length){
                    return res.status(409).json({message: 'email already exists'})  
                }
        
                db.query(queries.signUpUser, [name, username, password, email, created_on, last_login], (error, result) => {
                    if (error) throw error                                                   
                    if(result){                     
                        return res.status(201).json({ 
                         message: "Account successfully created",
                        })
                    }                    
                })
            }) 
        }
    }) 
} 
 


const loginUser = (req, res) =>{
      
    db.query(queries.checkUsernameExists, [req.body.username], (err, result) => {
        if(result.rows.length === 0){ 
            return res.status(401).json({message: "Auth failed"})  
        }

        bcrypt.compare(req.body.password, result.rows[0].password, (err, results) => {
            if(err){
                console.log(err) 
                return res.status(401).json({message: "Auth failed"})  
            }
            if(results){  
                const token = jwtGenerator(result.rows[0].user_id)                
                return res.status(200).json({ 
                message: `Auth Successful ${req.body.username}`,
                token,                      
                })
            }
    
            res.status(401).json({
                message: "Auth failed"
            })  
        })
    })  
    
}

const getUserByUsername = (req, res) => {
    const username = req.body.username
    db.query(queries.checkUsernameExists, [username], (error, results) => {
        res.status(200).send(results.rows)
    })
}

const follow= (req, res) => {  
    
    const id = req.user.user_id//id of the logged in user
    const username = req.body.username//username of the person you want to follow
    
    db.query(queries.updateFollowers, [id, username], (error, results) => {
        if(error){
            res.status(401).json({Error: error})
        }   
        if(results){
            res.status(200).json(`Successfully followed ${username}`)
        }
             
    })

}

const following = (req, res) => {
    const id = req.body.id//id of the person you're following
    const username = req.body.username//your username

    db.query(queries.updateFollowing, [id, username], (err, result) => {
        if(result){
            res.status(201).json({message: "Following updated"})
        }
        else{
            res.status(402).json({Error: err})                     
        }
    })         
}

 const getfollowers = (req, res) => {
     const {username, id} = req.body
     db.query(queries.checkUsernameExists, [username], (error, result) => {
         if(error){
             res.status(402).json({message: "User not found"})
         }
         db.query(queries.getfollowers, [id], (err, results) => {
             if(results){
                 res.status(200).send(results.rows)
             }
             else{
                 res.status(402).json({
                     message: "User not found"
                 })
             }
         } )
     })

 }

 const getfollowing = (req, res) => {
    const {username, id} = req.body
    db.query(queries.checkUsernameExists, [username], (error, result) => {
        if(error){
            res.status(402).json({message: "User not found"})
        }
        db.query(queries.getfollowing, [id], (err, results) => {
            if(results){
                res.status(200).send(results.rows)
            }
            else{
                res.status(402).json({
                    message: "User not found"
                })
            }
        } )
    })
 }
    





module.exports = {
    getAllAccounts,
    signUpUser, 
    loginUser,
    follow,
    following,
    getUserByUsername,
    getfollowers,
    getfollowing,
} 