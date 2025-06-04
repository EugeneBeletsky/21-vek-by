export default class Utils {

  randomString(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length);
  }

  randomEmail() {
    return `user_${this.randomString(6)}@gmail.com`;
  }
}