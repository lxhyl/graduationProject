const str = '0123456789qwertyuiopasdfghjklzxcvbnm'
const len = str.length

const makeId = (l) =>{
    let result = ''
    for(let i = 0;i<l;i++){
      const randomN = Math.floor(Math.random()*len)
      result = `${result}${str[randomN]}`
    }
    return result
}

module.exports = makeId