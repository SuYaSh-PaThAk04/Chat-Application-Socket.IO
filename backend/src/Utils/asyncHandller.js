const asyncHandler =(reqHandller)=>{
    return (req,res,next)=>[
        Promise.resolve(reqHandller(req,res,next))
        .catch((err)=>next(err))
    ]
}
export default asyncHandler;