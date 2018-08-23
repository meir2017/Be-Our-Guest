


import { observable, action, computed, observer, reaction } from "mobx";

class BeOurGuestStore {
    @observable user = {
        userLog: false,
        _Id: "",
        username: "meir",
        password: "",
        email: "",
        events: [],
        guests: [],
        categories: []

    }


    @observable eventIndex = 0;

    @action populateEvent = () => {
        this.user.events[0] = {
            _id:"1", 
            maxGuests: 50,
            tables: [
                { _id: "1", guests: [{ name: "Yocheved", _id: "1" }, { name: "Dror", _id: "2" }] },
                {  _id: "2", guests: [{ name: "Shimon", _id: "3" }, { name: "Rachel", _id: "4" } ]}]
        }
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
    @action AddEvent = (newEvent) => {
        let listEvents = this.user.events.concat();
        listEvents.push(newEvent)
        this.user.events = listEvents;
    }
    @action RemovEvent = (eventIndex) => {
        let listEvents = this.user.events.concat();
        listEvents.splice(eventIndex, 1)
        this.user.events = listEvents;
    }


}

const store = new BeOurGuestStore();


export default store;
