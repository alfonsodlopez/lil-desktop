function notifyUser() {
    //We need to ask for the user's permission to display notifications.
    Notification.requestPermission().then(function (result) {
        let myNotification = new Notification('Sample Notfication', {
            //max 256 bytes of text here.
            'body': 'Keep Learning!',
            'icon': '../media/lilicon.png'
        });
    });
};