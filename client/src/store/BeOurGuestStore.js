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
        listEvents.push(newEvent);
        this.user.events = listEvents;
    }

    @action removEvent = (eventIndex) => {
        let listEvents = this.user.events.concat();
        listEvents.splice(eventIndex, 1);
        this.user.events = listEvents;
    }

    @action addGlobalGuest = (newGuest) => {
        let guestList = this.user.guests.concat();
        guestList.push(newGuest);
        this.guests.events = guestList;
    }

    @action addGuest = (newGuest) => {
        let globalGuest = {
            _id: newGuest.globalGuestId,
            name: newGuest.name,
            email: newGuest.email,
            phone: newGuest.phone
        };

        // Add globalGuest to global guest list
        let guestList = this.user.guests.concat();
        guestList.push(globalGuest);
        this.user.guests = guestList;

        let guest = {
            _id: newGuest.guestId,
            name: newGuest.name,
            email: newGuest.email,
            phone: newGuest.phone,
            invitations: newGuest.invitations,
            categories: newGuest.categories,
            comment: newGuest.comment,
            numUndecided: newGuest.numInvited
        };

        // Add guest to event's guest list
        guestList = this.user.event[this.store.eventIndex].guests.concat();
        guestList.push(guest);
        this.user.event[this.store.eventIndex].guests = guestList;
    }

    @action removGuest = (guestIndex) => {
        let guestList = this.user.events.concat();
        guestList.splice(guestIndex, 1);
        this.user.events = guestList;
    }
}

const store = new BeOurGuestStore();


export default store;
