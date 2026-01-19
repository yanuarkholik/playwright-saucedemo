// get today date time 
export function getTodayDatetime() {
  return new Date().toLocaleString('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).replace(' ', ' ');
}


// find prices and sum 
export function parseCurrency(text: string): number {
  const cleanString = text.replace(/[^0-9.-]+/g, "")
  return parseFloat(cleanString)
}
