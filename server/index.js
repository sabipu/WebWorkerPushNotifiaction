const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const webpush = require('web-push')

const app = express()

dotenv.config()

app.use(cors())
app.use(bodyParser.json())
// ###You can generate VAPID keys using the command:
// **./node_modules/.bin/web-push generate-vapid-keys**
webpush.setVapidDetails("mailto: `bipubajgai@gmail.com`", "BMZSEAvmZhbfM36WDoJou2vnyVAXNeUyqOrC22pi9dEsfPc_UWEeQEf8Mt9yfoh21TKOc9KN86wUX5FnlSb3zXs", "3KMwDrdaQf_Lp4QzjOc2gA7864JdvLSp2VN4K1UQRX0")

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.post('/notifications/subscribe', (req, res) => {
  console.log(req.body);
  const payload = JSON.stringify({
    title:req.body.title,
    description:req.body.description,
    icon:req.body.icon
  })
// console.log(req.body.subscription);
  webpush.sendNotification(req.body.subscription, payload)
    .then(result => console.log())
    .catch(e => console.log(e.stack))

  res.status(200).json({'success': true})
});

app.listen(7500, () => console.log('The server has been started on the port 7500'))