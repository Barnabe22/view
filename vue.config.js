

 module.exports = {
    devServer:{
        proxy:{
          '^/*': {
            target: 'http://216.137.189.207:8080/questionnaire/',
            ws: true,
            changeOrigin: true
          }
        }
    }
  }
