'use strict'

import express from 'express'
import rest from 'rest'
const app = express()

const yahoo = (city) => {
  const query = `select item.condition.temp from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}") and u="c"`
  const url = 'https://query.yahooapis.com/v1/public/yql?q='+encodeURIComponent(query)+"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"

  return rest(url).then((res) => {
    const entity = JSON.parse(res.entity)
    return parseFloat(entity.query.results.channel.item.condition.temp)
  })
}

const open = (city) => {
  const query = encodeURIComponent(city)
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&mode=json&units=metric`

  return rest(url).then((res) => {
    const entity = JSON.parse(res.entity)
    return entity.main.temp
  })
}

app.get('/city', (req, res) => {
  const name = req.query.name
  Promise.all([yahoo(name), open(name)]).then(([yahooTemp, openTemp]) => {
    res.send({
      'yahoo': yahooTemp,
      'open': openTemp
    })
  }).catch((err) => {
    res.sendStatus(404)
  })

})

app.use(express.static('target'))

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
