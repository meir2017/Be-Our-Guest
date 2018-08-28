


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
                { _id: "1", title:"Bride Family", guests: [{ name: "Yocheved", _id: "1" }, { name: "Dror", _id: "2" }] },
                {  _id: "2", title:"Groom Family", guests: [{ name: "Shimon", _id: "3" }, { name: "Rachel", _id: "4" } ]},
                {  _id: "3",  title:"Bride Friends",guests: [{ name: "tal", _id: "5" }, { name: "Meir", _id: "6" } ]},
                {  _id: "4",  title:"Bride Friends",guests: [{ name: "tal", _id: "51" }, { name: "Meir", _id: "62" } ]},
                {  _id: "5",  title:"Bride Friends",guests: [{ name: "tal", _id: "53" }, { name: "Meir", _id: "64" } ]},
                {  _id: "6",  title:"Bride Friends",guests: [{ name: "tal", _id: "55" }, { name: "Meir", _id: "66" } ]},
                {  _id: "7",  title:"Bride Friends",guests: [{ name: "tal", _id: "57" }, { name: "Meir", _id: "68" } ]}
            ]
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
