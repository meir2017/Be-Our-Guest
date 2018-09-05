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


    // user function
    @action LogoutUser = () => {
        this.user.userLog = false;
        console.log("user logout")
    }
    @action openModalLogin = () => {
        this.user.ModalLogin = !this.user.ModalLogin;
        console.log(this.user.ModalLogin)
    }

    @action updateUser = (item) => {
        let userInfo = item.user;
        this.user.userLog = true;
        this.user._Id = userInfo._id
        this.user.username = userInfo.username;
        this.user.events = userInfo.events;
        this.user.guests = userInfo.guests;
        this.user.categories = item.userCategories;
        // console.log(JSON.stringify(this.user.events))
        console.log(JSON.stringify(this.user.categories))

        let user = {
            username: item.username,
            password: item.password
        }

        // Update Event-guest's categories
        this.populateEventCategories();
        

        localStorage.setItem("beOurGuestUser", JSON.stringify(user));

        // this.populateEvent();
    }
    //****************************************************** */

    // evnte function
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
    //****************************************************** */

    /// Guest  function
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
            globalGuest_id: globalGuest,
            invitations: newGuest.invitations,
            categories: [{ _id: newGuest.categories[0]._id, name: newGuest.categories[0].name }],
            comment: newGuest.comment,
            numInvited: newGuest.numInvited,
            numComing: newGuest.numComing,
            numNotComing: newGuest.numNotComing
        };

        // let globalGuest = {
        //     _id: newGuest.globalGuest.globalGuestId,
        //     name: newGuest.globalGuest.name,
        //     email: newGuest.globalGuest.email,
        //     phone: newGuest.globalGuest.phone
        // };

        // let guest = {
        //     _id: newGuest.guest.guestId,
        //     globalGuest_id: newGuest.guest.globalGuestId,
        //     invitations: newGuest.guest.invitations,
        //     categories: newGuest.guest.categories,
        //     comment: newGuest.guest.comment,
        //     numInvited: newGuest.guest.numInvited,
        //     numComing: newGuest.guest.numComing,
        //     numNotComing: newGuest.guest.numNotComing
        // };

        // Add guest to event's guest list
        guestList = this.user.events[this.eventIndex].guests.concat();
        guestList.push(guest);
        this.user.events[this.eventIndex].guests = guestList;
        console.log(JSON.stringify(this.user.events[this.eventIndex].guests));
    }

    @action removeGuest = (guestIndex) => {
        let guestList = this.user.events[this.eventIndex].guests.concat();
        guestList.splice(guestIndex, 1);
        this.user.events[this.eventIndex].guests = guestList;
    }
    //****************************************************** */

    // Invitation function
    @action addInvitation = (newlistinvitations) => {
        let listinvitations = this.user.events[this.eventIndex].invitations.concat();
        listinvitations.push(newlistinvitations);
        this.user.events[this.eventIndex].invitations = listinvitations;
        console.log(" save  invitations in client  ");
    }

    @action theInvitationIndex = (index) => {
        this.invitationIndex = index;
        console.log("theInvitationIndex   " + index);
    }
    @action removeInvitation = (index) => {
        let listInvitations = this.user.events[this.eventIndex].invitations.concat();
        listInvitations.splice(index, 1);
        this.user.events[this.eventIndex].invitations = listInvitations;
    }
    //****************************************************** */

    /// Category  function
    @action addCategory = (newCategory) => {
        let listCategory = this.user.categories.concat();
        listCategory.push(newCategory);
        this.user.categories = listCategory;
        console.log("New category " + newCategory._id);
    }

    // @action populateEvent = () => {
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

    // }

    @action populateEventCategories = () => {
        let self = this;
        this.user.events.forEach((event, eventIx) => {
            event.guests.forEach((guest, guestIx) => {
                let guestCategory = self.user.categories.find(category => category.id === guest.categories[0].id);
                self.user.events[eventIx].guests[guestIx].categories = [{ _id: guestCategory._id, name: guestCategory.name }];
            });
        })
    }

}

const store = new BeOurGuestStore();


export default store;
