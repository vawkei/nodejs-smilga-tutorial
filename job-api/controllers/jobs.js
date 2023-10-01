const Job = require("../models/jobs")

const getAllJobs =async (req,res)=>{
    const jobs =await Job.find({createdBy:req.user.userId}).sort("-createdAt") //this gives us all the jobs associated with this userId,voke2.
    //console.log(jobs)
    // initially:res.send("get all jobs");
    res.status(200).json({jobs,nbhits:jobs.length})
  };

const getJob =async (req,res)=>{
   
   try{
            //hisconst{user:{userId},params:{id:jobId}}  =req;
     const jobId = req.params.id
     // params: { id: '6518ea2f5d4e5d5be011516e' },
      const userId = req.user.userId
     // user: { userId: '6518e94d5d4e5d5be011516c', name: 'voke2' },
     console.log(req)
     const job = await Job.findOne({
         _id:jobId, createdBy:userId
     });
     if(!job){
        return res.status(404).json({msg:`No job with id: ${jobId}`})
     };
     //initially: res.send("get a single job")
     res.status(200).json({job})
     // so if i type in pstman: localhost:3000/api/v1/jobs/6518ea2f5d4e5d5be011516e 
     // i get: {
     //     "job": {
     //         "status": "pending",
     //         "_id": "6518ea2f5d4e5d5be011516e",
     //         "company": "google",
     //         "position": "intern",
     //         "createdBy": "6518e94d5d4e5d5be011516c",
     //         "createdAt": "2023-10-01T03:40:31.985Z",
     //         "updatedAt": "2023-10-01T03:40:31.985Z",
     //         "__v": 0
     //     }
     // }
   }catch(error){
    if(error.name==="CastError"){
        res.status(404).json({msg:`no item found with id: ${error.value}`})
    }
        res.status(500).json({msg:error})
   }
    
};
const createJob = async(req,res)=>{
    //res.json(req.body);
    req.body.createdBy = req.user.userId
    const job =await Job.create(req.body)    
    //console.log(job)

    //i get in the postman and console: {
//     "_id": "6517c75cb327ad2a0823778f",
//     "company": "google",
//     "position": "intern",
//     "createdBy": "6517b80670b48b5e84c4be97", this shows it was created by voke2
//     "createdAt": "2023-09-30T06:59:40.643Z", we get this by default cuz timestamp is set to true, same with updatedAt
//     "updatedAt": "2023-09-30T06:59:40.643Z",
//     "__v": 0
// }

    //res.send("create job")
    res.status(201).json({job})  
};
const updateJob =async (req,res)=>{
    
    try{
        const userId = req.user.userId;
    const jobId = req.params.id;
    const company = req.body.company;
    const position = req.body.position;

    if(!company || !position){
        res.status(400).json({msg:"Inputs can't be empty"})
    };

    const job =await Job.findOneAndUpdate({_id:jobId,createdBy:userId},req.body,{new:true,runValidators:true})

    if(!job){
       return res.status(404).json({msg:`no job found with id: ${jobId}`})
    };
    
    res.status(200).json({job})
    }catch(error){
        if(error.name==="CastError"){
            res.status(404).json({msg:`no item found with id: ${error.value}`})    
        }
        res.status(500).json({msg:error})
    }
    //initially:res.send("update job")
};

 const deleteJob =async (req,res)=>{
    
    try{
        const userId = req.user.userId;
    const jobId = req.params.id;

    const job =await Job.findOneAndRemove({_id:jobId,createdBy:userId})
    if(!job){
       return res.status(404).json({msg:`no job found with id: ${jobId}`} )
    };
    
    res.status(200).json({job})
    }catch(error){
        res.status(500).json({msg:error})
    }
    //intially:res.send("delete job")
  }; 

  module.exports = { getAllJobs,getJob,createJob,updateJob,deleteJob };