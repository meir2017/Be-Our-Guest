 import { observable, action, computed, observer, reaction } from "mobx";


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


    // evnte function
    @action LogoutUser = () => {
        this.user.userLog = false;
        console.log("user logout")
    }
    @action openModalLogin = () => {
        this.user.ModalLogin = !this.user.ModalLogin;
        console.log(this.user.ModalLogin)
    }

    @action getRandomColor() {
        var color = Math.floor(0x1000000 * Math.random()).toString(16);
        return '#' + ('000000' + color).slice(-6);

    }

    @action populateEvent = () => {
      /*   this.user.categories = [{ name: "Bride Family", colorCode: this.getRandomColor(), _id:'0'},
        { name: "Groom Family", colorCode: this.getRandomColor(), _id: '1' },
        { name: "Bride Friends", colorCode: this.getRandomColor(), _id: '2' },
        { name: "Groom Friends", colorCode: this.getRandomColor(), _id: '3' }
        ]; */
        this.user.events[this.eventIndex].guests =
         [{ name: "Shlomo Steinitz", _id: "44", categories: [1, 2], seated:false, numInvited:2, numConfirmed:2, numNotComing:0 },
        { name: "Akiva Stern", _id: "45", categories: [0] ,seated:false,  numInvited:2, numConfirmed:2, numNotComing:0},
        { name: "Rivki and Yoel Ben David", _id: "46", categories: [1], seated:false,  numInvited:2, numConfirmed:2, numNotComing:0 },
        { name: "Tzvi Stern", _id: "47", categories: [2], seated:false,  numInvited:4, numConfirmed:3, numNotComing:0 },
         { name: "Akiva Stern", _id: "30", categories: [0, 2], seated:false, numInvited:2, numConfirmed:2, numNotComing:0 }, 
         { name: "Shana Stern", _id: "48", categories: [0], seated:false,  numInvited:1, numConfirmed:1, numNotComing:0 },
        { name: "Akiva Stern", _id: "31", categories: [2, 1], seated:false,  numInvited:2, numConfirmed:2, numNotComing:0 },
        { name: "Joshua Stern", _id: "49", categories: [1], seated:false, numInvited:5, numConfirmed:4 , numNotComing:0}];

       /*  this.user.events[0].tables = [
            { _id: "1", category: this.user.categories[0], title: this.user.categories[0].name, guests: [{ name: "Yocheved & Shimon Steinitz", _id: "1", categories: [1, 2] }, { name: "Dror", _id: "2", categories: [0] }] },
            { _id: "2", category: this.user.categories[0], title: this.user.categories[0].name, guests: [{ name: "Shimon", _id: "3", categories: [1] }, { name: "Rachel", _id: "4", categories: [1, 2] }] },
            { _id: "3", category: this.user.categories[1], title: this.user.categories[1].name, guests: [{ name: "tal", _id: "5", categories: [3] }, { name: "Meir", _id: "6", categories: [1, 2, 3] }] },
            { _id: "4", category: this.user.categories[1], title: this.user.categories[1].name, guests: [{ name: "tal", _id: "51", categories: [1, 2] }, { name: "Meir", _id: "62", categories: [3] }] },
            { _id: "5", category: this.user.categories[2], title: this.user.categories[2].name, guests: [{ name: "tal", _id: "53", categories: [0, 1, 2] }, { name: "Meir", _id: "64", categories: [1, 2] }] },
            { _id: "6", category: this.user.categories[2], title: this.user.categories[2].name, guests: [{ name: "tal", _id: "55", categories: [2] }, { name: "Meir", _id: "66", categories: [1, 2] }] },
            { _id: "7", category: this.user.categories[3], title: this.user.categories[3].name, guests: [{ name: "tal", _id: "57", categories: [1] }, { name: "Meir", _id: "68", categories: [2] }] }
        ] */
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
        this.user.userLog = true;
        this.user._Id = item._id
        this.user.username = item.username;
        this.user.password = item.password;
        this.user.email = item.email;
        this.user.events = item.events;
        this.user.guests = item.guests;
        this.user.categories = item.categories;
        // console.log(JSON.stringify(this.user.events))
        console.log(JSON.stringify(this.user.categories))

        let user = {
            username: item.username,
            password: item.password
        }

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
            globalGuest_id: newGuest.globalGuestId,
            invitations: newGuest.invitations,
            categories: newGuest.categories,
            comment: newGuest.comment,
            numComing: newGuest.numComing,
            numInvited: newGuest.numInvited,
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
    //****************************************************** */

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
    //****************************************************** */

    /// Category  function
    @action addCategory = (newCategory) => {
        let listCategory = this.user.categories.concat();
        listCategory.push(newCategory);
        this.user.categories = listCategory;

    }

    /// Table function
    @action addTable = (newTable) => {
        let tables = this.user.events[this.eventIndex].tables.push(newTable);
        console.log(this.user.events[this.eventIndex].tables);

    }
    @action updateTable = (table, index) => {
        this.user.events[this.eventIndex].tables[index] = table;
        console.log(table);
    }

    @action updateTables = (newTables) => {
        this.user.events[this.eventIndex].tables = newTables;
        console.log(newTables)
    }

    @action updateGuests = (newGuests) => {
        this.user.events[this.eventIndex].guests = newGuests;
        console.log(newGuests);
    }
  
}

const store = new BeOurGuestStore();


export default store;
