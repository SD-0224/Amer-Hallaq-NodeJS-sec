

// haandle the input search value before sending it to the controller
// if the user didn't enter any value ask him to enter a value
const validateInput=(req,res,next) => {
    console.log(req.query.q);
    const searchVal=req.query.q;
    
    if(!searchVal) {
        res.json({message:"Please enter a file name"})
        throw Error("Please enter a file name")
        
    }

    next()
}

export { validateInput }