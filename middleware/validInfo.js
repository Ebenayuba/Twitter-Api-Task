module.exports = (req, res, next) => {
    const { id, name, username, password, email, created_on, last_login } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/") {
      console.log(!email.length);
      if (![name, username, password, email, created_on, last_login].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }
    } 
    
    else if (req.path === "/login") {
      if (![username, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } 
    }

    else if (req.path === "/user") {
      if(![username].every(Boolean)){
        return res.status(401).json("Missing Credentials")
      }
    }

    else if( req.path === "/follow") {
      if (![username].every(Boolean)){
        return res.status(401).json("Missing Credentials");
      }  
    }
    
    else if( req.path === "/following") {
      if(![id, username].every(Boolean)){
        return res.status(401).json("Missing Credentials");
      }
    }

    else if( req.path === "/getfollowers"){
      if(![id].every(Boolean)){
        return res.status(401).json("Missing Credentials");
      }
    }

    else if(req.path === "/getfollowing"){
      if(![id].every(Boolean)){
        return res.status(401).json("Missing Credentials");
      }
    }
    next();
  };
  