let config = require('./sqlconnect')
let sql = require("mssql")

// async function getRecords() {
//     let pool = await sql.connect(config)
//     try {
        
//         let data = await pool.query`select * from emptbl;`
//         console.log('data', data)
//         return data.recordset
//     } catch (err) {
//         // ... error checks
//     }
// }
// async function username(body) {
//     console.log('body', body.uname)
//     let pool = await sql.connect(config)
//     try {       
//         let data = await pool.request()
//         .input('uname',sql.VarChar(255),body.uname)
//         .input('flag',sql.VarChar(255),'login')
//         .execute('sp_Emp')
//         return {'success':true, 'data':data.recordset }

//     } catch (err) {
//         // ... error checks
//     }
// }

async function getEmp(body) {
    console.log('getEmp body', body)
    let pool = await sql.connect(config)
    try {       
        let data = await pool.request()
        .input('id',sql.Int,body.id)
        .input('flag',sql.VarChar(255),'getEmp')
        .execute('sp_Emp')
        return {'success':true, 'data':data.recordset }

    } catch (err) {
        // ... error checks
    }
}

async function login(body) {
    console.log('login body', body.action)
    let pool = await sql.connect(config)
    try {       
        let data = await pool.request()
        .input('id',sql.Int,body.id)
        .input('password',sql.VarChar(255),body.password)
        .input('flag',sql.VarChar(255),body.action)
        .execute('sp_Emp')
        console.log('body', data.recordset.Status)
        return {'success':true, 'data':data.recordset }
    } catch (err) {
        // ... error checks
        return {'success':false, 'msg':'Invalid Credential' }
    }
}

async function update(body) {
    // console.log('body', body)
    let pool = await sql.connect(config)
    try {       
        let data = await pool.request()
        .input('id',sql.Int,body.id)
        .input('firstName',sql.VarChar(255),body.form.firstName)
        .input('lastName',sql.VarChar(255),body.form.lastName)
        .input('department',sql.VarChar(255),body.form.department)
        .input('designation',sql.VarChar(255),body.form.designation)
        .input('flag',sql.VarChar(255),'update')
        .execute('sp_Emp')
        console.log('body', data.recordset.Status)
        return {'success':true, 'data':data.recordset, 'msg':'record updated' }
    } catch (err) {
        // ... error checks
    }
}

async function addEmp(body) {
    // console.log('body', body)
    let pool = await sql.connect(config)
    try {       
        let data = await pool.request()
        .input('firstName',sql.VarChar(255),body.form.firstName)
        .input('lastName',sql.VarChar(255),body.form.lastName)
        .input('department',sql.VarChar(255),body.form.department)
        .input('designation',sql.VarChar(255),body.form.designation)
        .input('flag',sql.VarChar(255),'add')
        .execute('sp_Emp')
        // console.log('body', data.recordset.Status)
        return {'success':true, 'msg':'record added'}
    } catch (err) {
        // ... error checks
    }
}

async function removeEmp(body) {
    // console.log('body', body)
    let pool = await sql.connect(config)
    try {       
        let data = await pool.request()
        .input('id',sql.Int,body.id)
        .input('flag',sql.VarChar(255),'removeEmp')
        .execute('sp_Emp')
        console.log('body', data.recordset.Status)
        return {'success':true, 'data':data.recordset }
    } catch (err) {
        // ... error checks
    }
}

async function empNameByDept(body) {
    // console.log('body', body)
    let pool = await sql.connect(config)
    try {       
        let data = await pool.request()
        .input('department',sql.VarChar(255),body.department)
        .input('flag',sql.VarChar(255),'empNameByDept')
        .execute('sp_Emp')
        console.log('body', data.recordset.Status)
        return {'success':true, 'data':data.recordset }
    } catch (err) {
        // ... error checks
    }
}

async function empRecords(body) {
    let pool = await sql.connect(config)
    console.log('empRecords body', body)
    try {       
        let data = await pool.request()
        .input('flag',sql.VarChar(255),'get')
        .execute('sp_Emp')
        return {'success':true, 'data':data.recordset }

    } catch (err) {
        // ... error checks
    }
}

async function reviewRecords(body) {
    let pool = await sql.connect(config)
    console.log('reviewRecords body', body)
    try {       
        let data = await pool.request()
        .input('flag',sql.VarChar(255),'reviewRecords')
        .execute('sp_Emp')
        return {'success':true, 'data':data.recordset }

    } catch (err) {
        // ... error checks
    }
}

async function getReview(body,reviewerID) {
    let pool = await sql.connect(config)
    console.log('getReview body', body.id)
    try {       
        let data = await pool.request()
        .input('reviewerID',sql.Int,reviewerID)
        .input('id',sql.Int,body.id)
        .input('flag',sql.VarChar(255),'getReview')
        .execute('sp_Emp')
        console.log('getReview data', data)
        return {'success':true, 'data':data.recordset }

    } catch (err) {
        console.log('err',err)
        // ... error checks
    }
}
async function addReview(body) {
    let pool = await sql.connect(config)
    console.log('addReview body', body)
    try {       
        let data = await pool.request()
        .input('reviewerID',sql.VarChar(255),body.reviewerID)
        .input('id',sql.Int,body.id)
        .input('communication',sql.VarChar(255),body.form.communication)
        .input('projectDelivery',sql.VarChar(255),body.form.projectDelivery)
        .input('selfInitiative',sql.VarChar(255),body.form.selfInitiative)
        .input('tat',sql.VarChar(255),body.form.tat)
        .input('status',sql.Int,body.status)
        .input('flag',sql.VarChar(255),'addReview')
        .execute('sp_Emp')
        return {'success':true,'msg':'record added' }

    } catch (err) {
        // ... error checks
        console.log('err addReview', err)
    }
}

async function updateReview(body) {
    let pool = await sql.connect(config)
    console.log('updateReview body', body)
    try {       
        let data = await pool.request()
        .input('reviewerID',sql.VarChar(255),body.reviewerID)
        .input('id',sql.VarChar(255),body.id)
        .input('communication',sql.VarChar(255),body.form.communication)
        .input('projectDelivery',sql.VarChar(255),body.form.projectDelivery)
        .input('selfInitiative',sql.VarChar(255),body.form.selfInitiative)
        .input('tat',sql.VarChar(255),body.form.tat)
        .input('status',sql.VarChar(255),body.status)
        .input('flag',sql.VarChar(255),'updateReview')
        .execute('sp_Emp')
        return {'success':true, 'data':data.recordset, 'msg':'record updated' }

    } catch (err) {
        // ... error checks
    }
}

async function pendingRecords(body) {
    let pool = await sql.connect(config)
    console.log('pendingRecords body', body)
    try {       
        let data = await pool.request()
        .input('reviewerID',sql.Int,body.reviewerID)
        .input('flag',sql.VarChar(255),'pendingRecords')
        .execute('sp_Emp')
        return {'success':true, 'data':data.recordset }

    } catch (err) {
        // ... error checks
    }
}

async function getPendingReview(body,reviewerID) {
    let pool = await sql.connect(config)
    console.log('getPendingReview body', body.id)
    try {       
        let data = await pool.request()
        .input('reviewerID',sql.Int,reviewerID)
        .input('id',sql.Int,body.id)
        .input('flag',sql.VarChar(255),'getPendingReview')
        .execute('sp_Emp')
        console.log('getPendingReview data', data)
        return {'success':true, 'data':data.recordset }

    } catch (err) {
        console.log('err',err)
        // ... error checks
    }
}

module.exports = {
    empRecords,
    reviewRecords,
    updateReview,
    getReview,
    getPendingReview,
    addEmp,
    removeEmp,
    pendingRecords,
    update,
    getEmp,
    empNameByDept,
    addReview,
    login,
}