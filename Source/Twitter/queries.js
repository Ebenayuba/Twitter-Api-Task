
 const getAllAccounts = "SELECT * FROM accounts"
 const checkEmailExists = "SELECT * FROM accounts  WHERE email = $1"
 const checkUsernameExists = "SELECT * FROM accounts  WHERE username = $1"
 const checkId = "SELECT * FROM accounts WHERE user_id = $1"
 const signUpUser = "INSERT INTO accounts (name, username, password, email, created_on, last_login) VALUES($1, $2, $3, $4, $5, $6)"
 const loginUser = "SELECT * FROM accounts WHERE email = $1"
 const checkPassword = "SELECT * FROM accounts WHERE password = $1"
 const updateFollowers = "UPDATE accounts set followers = array_append(followers, $1) WHERE username = $2"
 const updateFollowing = "UPDATE accounts set following = array_append(following, $1) WHERE username = $2"
 const getfollowers = "SELECT followers FROM accounts WHERE user_id = $1"
 const getfollowing = "SELECT following FROM accounts WHERE user_id = $1"


 module.exports = {
     getAllAccounts,
     checkEmailExists,
     signUpUser,
     checkUsernameExists, 
     checkId, 
     loginUser,
     checkPassword,
     updateFollowers,
     updateFollowing, 
     getfollowers,
     getfollowing, 
 }