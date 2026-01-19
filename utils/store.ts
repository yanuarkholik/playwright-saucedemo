import * as path from 'path'
import * as fs from 'fs'

const storePath = path.resolve(__dirname, '../temp/tempStore.json')

function ensureDirectoryExist() {
  const dir = path.dirname(storePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// initiate store  
export function initStore(): void {
  ensureDirectoryExist(); // Pastikan folder ada
  fs.writeFileSync(storePath, JSON.stringify({}));
}

// read value 
export function readValue(): Record<string, any> {
  if (!fs.existsSync(storePath)) {
    return {};
  }
  try {
    const data = fs.readFileSync(storePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

// add data to 
export function setValue(key: string, value: any) {
  ensureDirectoryExist()
  const store = readValue()
  store[key] = value
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2))
}

// get the value from storage 
export function getValue<T = any>(key: string): T | undefined {
  const store = readValue();
  return store[key];
}

// input to the array list
export function appendToList(key: string, value: any) {
  ensureDirectoryExist()
  const store = readValue()

  if (!store[key]) {
    store[key] = [value]
  } else {
    store[key].push(value)
  }

  fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
}

// remove item pada array 
export function removeItem<T = any>(key: string, valueToRemove: T) {
  const store = readValue();
  store[key] = store[key].filter((item: any) => item !== valueToRemove);
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
}

// remove object dari field
export function removeObjectByField(key: string, fieldName: string, fieldValue: any) {
  const store = readValue();

  store[key] = store[key].filter((item: any) => item[fieldName] !== fieldValue);
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
}
