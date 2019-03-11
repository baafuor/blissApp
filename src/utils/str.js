export default {
  getFormattedTime() {
    var today = new Date()
    var y = today.getFullYear()
    var m = today.getMonth()
    var d = today.getDate()
    var h = today.getHours()
    var m = today.getMinutes()
    var s = today.getSeconds()
    return '_' + y + '-' + m + '-' + d + '-' + h + '-' + m + '-' + s
  },
  getRandom(length) {
    var text = ''
    var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
  },
  getFileName() {
    return this.getRandom(4) + this.getFormattedTime()
  }
}
  