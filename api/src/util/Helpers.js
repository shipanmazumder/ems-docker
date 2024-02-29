module.exports = class Helpers {
    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    static toJSONLocal(date) {
        let local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    }

    static toLocal(date) {
        let local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON();
    }

    static getFormatDate() {
        let t = new Date().toLocaleString("en").split("/");
        let month = t[0].toString().padStart(2, "0")
        let date = t[1].toString().padStart(2, "0")
        let year = t[2].split(",")[0].toString().padStart(2, "0");
        return `${year}-${month}-${date}`;
    }

    static getLocalTime() {
        var timer = new Date();
        let sMinute = timer.getMinutes();
        let sHours = timer.getHours();
        return sHours.toString() + ":" + sMinute.toString();
    }

    static getConvertDateTime(value) {
        // con
        let t = new Date(value).toLocaleString("en").split("/");
        let month = t[0].toString().padStart(2, "0")
        let date = t[1].toString().padStart(2, "0")
        let year = t[2];
        return `${date}-${month}-${year}`;
        // return t[2];
    }

}
;
