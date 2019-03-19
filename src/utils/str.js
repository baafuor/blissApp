export default {
    getFormattedTime () {
        const today = new Date();
        const y = today.getFullYear();
        const m = today.getMonth();
        const d = today.getDate();
        const h = today.getHours();
        const mm = today.getMinutes();
        const s = today.getSeconds();
        return '_' + y + '-' + m + '-' + d + '-' + h + '-' + mm + '-' + s;
    },
    getRandom (length) {
        let text = '';
        const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {text += possible.charAt(Math.floor(Math.random() * possible.length));}

        return text;
    },
    getFileName () {
        return this.getRandom(4) + this.getFormattedTime();
    },
    formatAMPM (date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    },
    getDate (dateObj) {
        const month = dateObj.getUTCMonth() + 1; // months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();

        return year + '-' + month + '-' + day;
    }
};
  