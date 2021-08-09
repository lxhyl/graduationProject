import { add0 } from "./addZero";

const s = 1000
const mi = s * 60
const h = mi * 60
const d = h * 24
const m = d * 30 
const y = m * 12
const getDateDetail = date => {
  if (!date) return {};
  const tempDate = new Date(parseInt(date));
  const result = {
    y: tempDate.getFullYear(),
    m: tempDate.getMonth() + 1,
    d: tempDate.getDate(),
    h: tempDate.getHours(),
    mi: tempDate.getMinutes(),
    s: tempDate.getSeconds()
  }
  return result
};



export const formatDate = date => {
  const tempDate = getDateDetail(date);
  const { y, m, d, h, mi } = tempDate;
  return `${y}/${add0(m)}/${add0(d)} ${add0(h)}:${add0(mi)}`;
};


export const btyDate = date => {
  if(!date) return '日期格式不正确'
  const temp = parseInt(date) - Date.now()
  switch(true){
    case temp < 0:
      return '<span style="color:red">已超时!</span>'
    case temp >= y:
      return `<span style="color:#66BB6A">${parseInt(temp / y)}年后</span>`
    case temp >= m:
      return `<span style="color:#66BB6A">${parseInt(temp / m)}个多月后</span>`
    case temp >= d:
      return `<span style="color:#9CCC65">还有${parseInt(temp / d)}天</span>`
    case temp >= h:
        return `<span style="color:#FFA726">${parseInt(temp / h)}小时后</span>`
    case temp >= mi:
        return `<span style="color:#FF7043">${parseInt(temp / mi)}分钟后</span>`
    default:
        return '<span style="color:#E91E63">不到一分钟了!</span>'
  }

}