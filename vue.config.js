

 module.exports = {
    devServer:{
        proxy: 'http://neodfs.com:8080/questionnaire/'
        
        /*{
          '^/*': {
            target: 'http://216.137.189.207:8080/questionnaire/',
            ws: true,
            changeOrigin: true
          }
        }*/
    }
  }
