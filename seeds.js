const mongoose = require('mongoose');
const postModel = require('./models/posts');

mongoose.connect('mongodb://localhost:27017/chartsDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Error: ");
        console.log(err);
    });

const p = new postModel(
    {
        author: "Dr. Rodriguez",
        text: "Sensado de Temperature y humedad para Proyecto de Composta en Ciudad Juarez",
        chart: [
          {
            name: "Temperature",
            series: [
              {
                name: new Date(),
                value: 26.2
              },
              {
                name: new Date(),
                value: 26.8
              },
              {
                name: new Date(),
                value: 26.1
              }
            ]
          }
        ],
        comments: [
          {
            name: "Dr. Margez",
            text: "Excelente proyecto"
          },
          {
            name: "Ing Manuel Rodriguez",
            text: "El mismo porcentaje funciona para fresas?"
          },
          {
            name: "nuevo nombre",
            text: "Hola profesor"
          },
          {
            name: "nuevo nombre",
            text: "probando..."
          }
        ]
    }
);

p.save()
    .then(r => {
        console.log(r);
    })
    .catch(err => {
        console.log(err);
    });