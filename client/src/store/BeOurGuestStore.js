// import { observable, action, computed, observer, reaction } from "mobx";
import { observable, action } from "mobx";

class BeOurGuestStore {
    @observable user = {
        userLog: false,
        _Id: "",
        username: "",
        password: "",
        email: "",
        events: [],
        guests: [],
        categories: [],

        ModalLogin: false
    }
    @observable eventIndex = null;
    @observable invitationIndex = null;


    // evnte function
    @action LogoutUser = () => {
        this.user.userLog = false;
        console.log("user logout")
    }
    @action openModalLogin = () => {
        this.user.ModalLogin = !this.user.ModalLogin;
        console.log(this.user.ModalLogin)
    }



    @action populateEvent = () => {
        /*  this.user.events[0] = {
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
         } */

        //  this.user.events[0] = {
        //     _id: "1",
        //     maxGuests: 50,
        //     Title: "meir",
        //     invitations: [],
        //     tables: [
        //         { _id: "1", maxGueste: 10, title: "Bride Family", guests: [{ name: "Yocheved", _id: "1" }, { name: "Dror", _id: "2" }] },
        //         { _id: "2", maxGueste: 10, title: "Groom Family", guests: [{ name: "Shimon", _id: "3" }, { name: "Rachel", _id: "4" }] },
        //         { _id: "3", maxGueste: 10, title: "Bride Friends", guests: [{ name: "tal", _id: "5" }, { name: "Meir", _id: "6" }] },
        //         { _id: "4", maxGueste: 10, title: "Bride Friends", guests: [{ name: "tal", _id: "51" }, { name: "Meir", _id: "62" }] },
        //         { _id: "5", maxGueste: 10, title: "Bride Friends", guests: [{ name: "tal", _id: "53" }, { name: "Meir", _id: "64" }] },
        //         { _id: "6", maxGueste: 10, title: "Bride Friends", guests: [{ name: "tal", _id: "55" }, { name: "Meir", _id: "66" }] },
        //         { _id: "7", maxGueste: 10, title: "Bride Friends", guests: [{ name: "tal", _id: "57" }, { name: "Meir", _id: "68" }] }
        //     ]
        // }



    }

    @observable eventIndex = null;


    // evnte function

    @action updateUser = (item) => {
        this.user.userLog = true;
        this.user._Id = item._id
        this.user.username = item.username;
        this.user.password = item.password;
        this.user.email = item.email;
        this.user.events = item.events;
        this.user.guests = item.guests;
        this.user.categories = item.categories;
        console.log(JSON.stringify(this.user.events))
        // this.populateEvent();
    }

    // user function


    @action thisEventIndex = (index) => {
        this.eventIndex = index
        console.log("event index is  " + index)
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
        console.log(JSON.stringify(this.user.guests));

        let guest = {
            _id: newGuest.guestId,
            // The name, email & phone are saved here too
            name: newGuest.name,
            email: newGuest.email,
            phone: newGuest.phone,
            invitations: newGuest.invitations,
            categories: newGuest.categories,
            comment: newGuest.comment,
            numConfirmed: newGuest.numConfirmed,
            numUndecided: newGuest.numInvited,
            numNotComing: newGuest.numNotComing
        };

        // Add guest to event's guest list
        guestList = this.user.events[this.eventIndex].guests.concat();
        guestList.push(guest);
        this.user.events[this.eventIndex].guests = guestList;
        console.log(JSON.stringify(this.user.events[this.eventIndex].guests));
    }

    @action removGuest = (guestIndex) => {
        let guestList = this.user.events.concat();
        guestList.splice(guestIndex, 1);
        this.user.events = guestList;
    }
    // Invitation function
    @action addInvitation = (newlistinvitations) => {
        let listinvitations = this.user.events[this.eventIndex].invitations.concat();
        listinvitations.push(newlistinvitations)
        this.user.events[this.eventIndex].invitations = listinvitations;
        console.log(" save  invitations in client  ")
    }

    @action theInvitationIndex = (index) => {
        this.invitationIndex = index
        console.log("theInvitationIndex   " + index)
    }
    @action removeInvitation = (index) => {
        let listInvitations = this.user.events[this.eventIndex].invitations.concat();
        listInvitations.splice(index, 1);
        this.user.events[this.eventIndex].invitations = listInvitations;
    }
}

const store = new BeOurGuestStore();


export default store;
