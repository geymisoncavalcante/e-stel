const express = require('express');
const router = express.Router();



router.get('/', (req, res)=>{
    res.render('home/home')
});

router.get("/emConst", (req, res)=> {
    res.render('ci/emConst')
  });



module.exports = router;