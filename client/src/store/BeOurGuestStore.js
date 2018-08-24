// import { observable, action, computed, observer, reaction } from "mobx";
import { observable, action } from "mobx";

class BeOurGuestStore {
    @observable user = {
        userLog: false,
        _Id: "",
        username: "meir",
        password: "",
        email: "",
        events: [],
        guests: [],
        categories: [],
        eventindex: null,

        ModalLogin: false


    }
    @action openModalLogin = () => {
        this.user.ModalLogin = !this.user.ModalLogin;
        console.log(this.user.ModalLogin)
    }

    @action updateUser = (item) => {
        this.user.userLog = true;
        this.user._Id = item._id
        this.user.username = item.username;
        this.user.password = item.password;
        this.user.email = item.email;
        this.user.events = item.events;
        this.user.guests = item.guests;
        this.user.categories = item.categories;
    }

    @action addEvent = (newEvent) => {
        let listEvents = this.user.events.concat();
        listEvents.push(newEvent)
        this.user.events = listEvents;
    }

    @action removEvent = (eventIndex) => {
        let listEvents = this.user.events.concat();
        listEvents.splice(eventIndex, 1)
        this.user.events = listEvents;
    }
}

const store = new BeOurGuestStore();


export default store;
