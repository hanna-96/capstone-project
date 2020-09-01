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
  subtotal: true,
  supermarket: true,
  market: true,
  ctown: true,
  tare: true,
  visa: true,
  mastercard: true,
  card: true,
  cash: true,
  lb: true,
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
  grocery: true
}

export const readReceipt = receipt => {
  const isAWord = w => {
    if (w in blacklisted) return false
    return w ? w.length > 2 : false
  }
  receipt = receipt.map(word => {
    word = word.toLowerCase().replace(/[0-9\.:/@#$%\-\*&\(\),]+/g, '').replace(/^\s+/g, '')
    word =  word in ingAliases ? ingAliases[word] : word
    word = word.split(' ').filter(w => !blacklisted[w]).join(' ')
    return word
  })
  return receipt.filter(isAWord)
}