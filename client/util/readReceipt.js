const ingAliases = {
  coke: 'coca-cola',
  cokacola: 'coca-cola',
  'coka cola': 'coca-cola',
  apples: 'apple',
  bananas: 'banana',
  cantaloupes: 'cantaloupe',
  lemons: 'lemon',
  limes: 'lime',
  oranges: 'orange',
  olives: 'olive',
  pineapples: 'pineapple',
  kiwis: 'kiwi',
  papayas: 'papaya',
  strawberry: 'strawberries',
  cranberry: 'cranberries',
  grape: 'grapes',
  'yellow bananas': 'banana',
  'bananas yellow': 'banana',
  'ice cream': 'ice-cream'
}

const blacklisted = {
  total: true,
  tare: true,
  fresh: true,
  mastercard: true,
  card: true,
  cash: true,
  lb: true,
  lblb: true,
  merch: true,
  merchandise: true,
  balance: true,
  items: true,
  item: true,
  id: true,
  markdown: true,
  f: true,
  fw: true,
  t: true,
  tf: true,
  produce: true,
  grocery: true,
  bulk: true,
  dairy: true,
}

let serialRegex = /[a-z]{2,3}#:? ?\d+/ig
let phoneRegex = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/
let strAddressRegex = /\b\d{1,6} +.{2,25}\b(avenue|ave|court|ct|street|st|drive|dr|lane|ln|road|rd|blvd|plaza|plz|parkway|pkwy)[.,]?(.{0,25} +\b\d{5}\b)?/ig
let gridAddressRegex = /(\b( +)?\d{1,6} +(north|east|south|west|n|e|s|w)[,.]?){2}(.{0,25} +\b\d{5}\b)?\b/ig

//cuts off parts of the receipt text that aren't products and returns an array
const findProducts = text => {
  let textArr = text.split('\n').map(word => word.toLowerCase())
  let fullText = textArr.join(' ')
  //If there's an address, finds which line it ends at, cut it off and everything that comes before it
  let address = fullText.match(strAddressRegex)
  if (!address) address = fullText.match(gridAddressRegex)
  if (address) {
    address = address[address.length-1].split(' ')
    address = address[address.length-1]
    for (let i = 0; i < textArr.length; i++) {
      if (textArr[i].includes(address)) {
        textArr = textArr.slice(i + 1, textArr.length)
      }
    }
  }
  for (let i = 0; i < textArr.length; i++) {
    if(textArr[i] === undefined) break
    if (serialRegex.test(textArr[i]) || phoneRegex.test(textArr[i])) {
      textArr = textArr.slice(i + 1, textArr.length)
      i = 0
    }
  }
  let subtotalRegex = /(subtotal|bag refund|reusable bag)/
  for (let i = 0; i < textArr.length; i++) {
    if (subtotalRegex.test(textArr[i])) {
      return textArr.slice(0, i)
    }
  }
  return textArr
}

//after findProducts(), run through remaining elements to remove prices, weights, blacklisted words, and swap partially valid keywords with fully valid keywords
const readReceipt = text => {
  let moreReg = /\s\w{1}$/
  let receipt = findProducts(text)
  const isAWord = w => {
    if (w in blacklisted) return false
    return w.length > 2
  }
  receipt = receipt.map(word => {
    word = word.toLowerCase().replace(/[0-9\.:/@#$%\-\*&\(\),]+/g, '').replace(/\s+/g, ' ').replace(moreReg, '')
    word =  word in ingAliases ? ingAliases[word] : word
    word = word.split(' ').filter(w => !blacklisted[w]).join(' ')
    return word.trim()
  })
  return receipt.filter(isAWord)
}

export default readReceipt