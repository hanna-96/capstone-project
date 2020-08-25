const vision = require('@google-cloud/vision')

//google vision test
async function app(){
  const client = new vision.ImageAnnotatorClient()
  const fileName = ''
  const [result] = await client.documentTextDetection(fileName)
  const fullTextAnnotation = result.fullTextAnnotation
  console.log(`Result: ${fullTextAnnotation.text}`)
}
 
 app()