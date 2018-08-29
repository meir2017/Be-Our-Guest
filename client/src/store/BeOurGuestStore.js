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
    }

    // user function


    @action thisEventIndex = (index) => {
        this.eventIndex = index
        console.log("event index is  " + index)
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
