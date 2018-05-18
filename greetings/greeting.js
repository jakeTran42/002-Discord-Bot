const greeting = require('./greetings.json')

module.exports = function()  {
        current_hour = new Date().getHours()
        random_index = Math.floor(Math.random() * greeting.random_msg.length)
        if (current_hour>6 && current_hour<10) {
            return greeting.morning_greeting
        } else if (current_hour>=10 && current_hour<12) {
            return greeting.random_msg[random_index]
        } else if (current_hour>=12 && current_hour<16) {
            return greeting.afternoon_greeting
        } else if (current_hour>=16 && current_hour<18) {
            return greeting.random_msg[random_index]
        } else if (current_hour>=18 && current_hour<21) {
            return greeting.evening_greeting
        } else if (current_hour>=21 && current_hour<=23) {
            return greeting.random_msg[random_index]
        } else if (current_hour>=0 && current_hour<=4) {
            return greeting.late_night_msg
        } else if (current_hour>4 && current_hour<=6) {
            return greeting.all_nighter_msg
        } else {
            return greeting.random_msg[random_index]
        }
}