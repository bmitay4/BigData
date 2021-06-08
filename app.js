const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    var cards=["Borrowed","Annual Profit","Lead Conversion","Average Income",];
  res.render("./pages/index",{cards:cards});
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

//For local running, disable the above lines
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })