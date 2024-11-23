import axios from 'axios';
import './bootstrap';


import $ from 'jquery'
window.$ = window.jQuery = $;


$(document).ready(function () {
    Echo.join('games')
        .here(users => {
            users.forEach(user => {
                updateUserStatus(user.id, true)
            })
        })
        .joining(user => {
            updateUserStatus(user.id, true)
        })
        .leaving(user => {
            updateUserStatus(user.id, false)
        })
        .listen('GameEvent', function (event) {
            if (event.userReceived.id == userSignIn) {
                let check = confirm(`Người chời ${event.userSend.name} đang khiểu chiến bạn`)
                if (check) {
                    axios.post('/send-fight-accept', {
                        userSendId: event.userSend.id
                    })
                        .then(response => {
                            console.log(response.data.message);
                            window.location.href = `start-game/${event.userSend.id}/${event.userReceived.id}`
                        })
                        .catch(error => {
                            console.error(`Lỗi call API ${error}`)
                        })
                }
            } else if (event.userSend.id == userSignIn && event.acceptFight == true) {
                console.log('Đã chấp nhận');
                window.location.href = `start-game/${event.userSend.id}/${event.userReceived.id}`
            }
        })

    function updateUserStatus(userId, isOnline) {
        let cell = $(`#status-user-${userId}`)
        let cellButton = $(`#button-user-${userId}`)
        if (isOnline) {
            cell.text('Online').addClass('text-success').removeClass('text-danger')
            cellButton.append(`<button class="btn btn-success" onclick="handleFight('${userId}')">Thách đấu</button>`)

        } else {
            cell.text('Offline').addClass('text-danger').removeClass('text-success')
            cellButton.empty()
        }
    }

    window.handleFight = function (userId) {
        axios.post('/send-fight', {
            receivedId: userId
        })
            .then(response => {
                console.log(response.data.message);
            })
            .catch(error => {
                console.error(`Lỗi call API ${error}`)
            })

    }
})
