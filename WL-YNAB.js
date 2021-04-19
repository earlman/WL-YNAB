/*eslint-disable*/
Module.register("WL-YNAB", {
    defaults: {
        token: "",
        categories: [
            "Household",
            "Pets",
            "Grocery",
            "Lunch",
            "Kids Clothes",
            "Restaurants",
            "Spontaneous Fun"
        ]
    },

    start: function () {
        this.sendSocketNotification("SET_CONFIG", this.config);
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.classList = ["xsmall"];
        console.log(this.data);
        if (this.data.items && this.data.items.length > 0) {
            for (let i of this.data.items) {
                wrapper.innerHTML = this.data.items
                    .map(
                        (a) =>
                            "<span class='ynab-name'>" +
                            a.name +
                            "</span><span class='ynab-balance'>$" +
                            (a.balance / 1000).toFixed(2) +
                            "</span>"
                    )
                    .join("");
            }
        }
        return wrapper;
    },

    socketNotificationReceived: function (notification, payload) {
        console.log("notification: " + notification);
        if (notification == "UPDATE") {
            this.data.items = payload.items;
            this.updateDom(0);
        }
    },

    getStyles: function () {
        return [this.file("WL-YNAB.css")];
    }
});
