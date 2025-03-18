let userData = [
    {
        name: "Michael Choi",
        createdAt: "january 15th 2013",
        message: "This is my message. This is my message. This is my message. This is my message. This is my message. This is my message. This is my message. This is my message. This is my message."

    },
    
    {
        name: "Michael Choi",
        createdAt: "January 23rd 2013",
        message: "This is my message. This is my message. This is my message. This is my message,This is my message. This is my message. This is my message. This is my message.This is my message. This is my message.This is my message."
        
    },
    {
        name: "Cory Whiteland",
        createdAt: "January 15th 2013",
        message: "This is my message. This is my message. This is my message. This is my message. This is my message. This is my message. This is my message. This is my message."
        
    },
    {
        name: "Cory Whiteland",
        createdAt: "January 1st  2013",
        message: "This is my message. This is my message. This is my message. This is my message. This is my message. This is my message. This is my message. This is my message."
        
     }
]
const homePage = (req, res) => {
    res.render("homepage", {
        users:userData,

    })
}
 
const notFoundPage = (req, res) => {
    res.status(404).send("404 Page not found")
}

module.exports = {
    homePage,
    notFoundPage
}