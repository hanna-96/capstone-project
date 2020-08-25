const vision = require('@google-cloud/vision')

async function app(){
  const client = new vision.ImageAnnotatorClient()
  const fileName = 'https://media.glamour.com/photos/569598f116d0dc3747ec8bf1/master/w_1024%2Cc_limit/health-fitness-2014-10-cash-register-shopping-receipt-main.jpg'
  const [result] = await client.documentTextDetection(fileName)
  const fullTextAnnotation = result.fullTextAnnotation
  console.log(`Result: ${fullTextAnnotation.text}`)
 }
 
 app()