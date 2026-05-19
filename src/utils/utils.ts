export class Utils {
  static getTimestamp(): string {
    const timestamp = new Date().toISOString()
    return timestamp
  }

  static getUnixTimestamp(): number {
    const unixTimestamp = Math.floor(Date.now() / 1000)
    return unixTimestamp
  }

  static getTodayDate(daysOffset: number = 0): string {
    const date = new Date();

    date.setDate(date.getDate() + daysOffset);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  static getRandomText(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  static getRandomEmail(): string {
    return `email${this.getUnixTimestamp()}@mail.com`;
  }

  static getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }

  static getRandomNumberInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
