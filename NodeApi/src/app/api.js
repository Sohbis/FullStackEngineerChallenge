let express = require('express');
require('dotenv').config()
let dboperations = require('./dboperations')
let app = express()
let router = express.Router()
let cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
app.use(cors())
app.use(express.json());
let user=0
// app.use(express.urlencoded({
//     extended: true
// }));

app.use('/api', router)
app.use(
    helmet({
        referrerPolicy: {
            policy: "no-referrer"
        }
    })
)
app.disable('x-powered-by')

// router.route('/username').post((req, res) => {
//     //Validation need to be added
    
//     // if(req.body.uname){
//     //     console.log('username', req.body)
//     // }
//     // else{
//     //     console.log('password', req.body)
//     // }
//     dboperations.login(req.body).then(result => {
//         console.log('res.statusCode', res.statusCode)
//         if (result.data.length == 0) {
//             res.status(401).send({
//                 msg: 'Invalid Credential'
//             })
//         }
//         else{
//             const token=jwt.sign(result.data[0].Role,process.env.ACCESS_TOKEN_SECRET)
//             res.send({success:true,token:token})
//         }
        

//     })

// })

router.route('/login').post((req, res) => {
    // console.log('login', req.body)
    dboperations.login(req.body).then(result => {
        // console.log('res.statusCode', res.statusCode)
        if (result.data.length == 0) {
            res.status(401).send({
                msg: 'Invalid Credential'
            })
        }
        else if(result.data[0].Status==1){
            // console.log('login result',result.data )
            user=result.data[0].ID
            let obj={
                ID: result.data[0].ID,
                Firstname: result.data[0].Firstname,
                Lastname: result.data[0].Lastname,
                Designation: result.data[0].Designation,
                Department: result.data[0].Department, 
                Role:result.data[0].Role
            }
            const token=jwt.sign(obj,process.env.ACCESS_TOKEN_SECRET)
            res.send({success:true,token:token,status:result.data[0].Status})
        }else{
            res.send({success:true,status:result.data[0].Status})
        }
  
    })

})
router.route('/empRecords').get(authenticateToken,(req, res) => {
    // console.log('empRecords ',req.body)
    dboperations.empRecords(req.body).then(result => {
        // console.log('result', result)
        res.send(result)

    })

})

router.route('/reviewRecords').get(authenticateToken,(req, res) => {
    // console.log('reviewRecords ',req.body)
    dboperations.reviewRecords(req.body).then(result => {
        // console.log('result', result)
        res.send(result)

    })

})
router.route('/addReview').post(authenticateToken,(req, res) => {
    console.log('addReview ',req.body)
    dboperations.addReview(req.body).then(result => {
        console.log('result', result)
        res.send(result)

    })

})

router.route('/pendingRecords').post(authenticateToken,(req, res) => {
    console.log('pendingRecords ',req.body)
    dboperations.pendingRecords(req.body).then(result => {
        console.log('result', result)
        res.send(result)

    })

})

router.route('/getEmp').post(authenticateToken,(req, res) => {
    // console.log('res.body',req.body)
    dboperations.getEmp(req.body).then(result => {
        // console.log('result', result)
        res.send(result)

    })

})

router.route('/update').put(authenticateToken,(req, res) => {
    // console.log('res.body',req.body)
    dboperations.update(req.body).then(result => {
        // console.log('result', result)
        res.send(result)

    })

})

router.route('/removeEmp').put(authenticateToken,(req, res) => {
    // console.log('res.body',req.body)
    dboperations.removeEmp(req.body).then(result => {
        // console.log('result', result)
        res.send(result)

    })
})



router.route('/addEmp').post(authenticateToken,(req, res) => {
    // console.log('res.body',req.body)
    dboperations.addEmp(req.body).then(result => {
        // console.log('result', result)
        res.send(result)
    })

})

router.route('/empNameByDept').post(authenticateToken,(req, res) => {
    // console.log('res.body',req.body)
    dboperations.empNameByDept(req.body).then(result => {
        // console.log('result', result)
        res.send(result)
    })

})

router.route('/getReview').post(authenticateToken,(req, res) => {
    // console.log('res.body',req.body)
    dboperations.getReview(req.body,user).then(result => {
        console.log(' getReview result', result)
        res.send(result)
    })

})

router.route('/getPendingReview').post(authenticateToken,(req, res) => {
    // console.log('res.body',req.body)
    dboperations.getPendingReview(req.body,user).then(result => {
        console.log(' getPendingReview result', result)
        res.send(result)
    })

})
router.route('/updateReview').put(authenticateToken,(req, res) => {
    // console.log('res.body',req.body)
    dboperations.updateReview(req.body).then(result => {
        console.log(' updateReview result', result)
        res.send(result)
    })

})

router.route('/auth').get(authenticateToken,(req, res) => { 
    res.send({success:true})
})



function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      user=jwt.decode()
      next()
    })
  }


app.listen(3000, function () {
    console.log('Server is running on 3000')
})