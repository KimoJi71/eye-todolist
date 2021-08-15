export default {
    methods: {
        timeFormat(val) {
            let newdate = new Date(val)
            let year = newdate.getFullYear()
            let month = newdate.getMonth() + 1 < 10 ? "0" + (newdate.getMonth() + 1) : newdate.getMonth() +1
            let date = newdate.getDate() < 10 ? "0" + newdate.getDate() : newdate.getDate()
            let hh = newdate.getHours() < 10 ? "0" + newdate.getHours() : newdate.getHours()
            let mm = newdate.getMinutes() < 10 ? "0" + newdate.getMinutes() : newdate.getMinutes()
            let ss = newdate.getSeconds() < 10 ? "0" + newdate.getSeconds() : newdate.getSeconds()

            return  year + "-" + month + "-" + date + " " + hh + ":" + mm + ":" + ss
        }
    }
}