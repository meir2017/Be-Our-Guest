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
        this.user.categories = [{ name: "Bride Family", colorCode: this.getRandomColor() },
        { name: "Groom Family", colorCode: this.getRandomColor(), _id: '1' },
        { name: "Bride Friends", colorCode: this.getRandomColor(), _id: '2' },
        { name: "Groom Friends", colorCode: this.getRandomColor(), _id: '3' }
        ];
        this.user.events[0].guests = [{ name: "Shlomo Steinitz", _id: "44", categories: [1, 2] },
        { name: "Akiva Stern", _id: "45", categories: [0] },
        { name: "Rivki and Yoel Ben David", _id: "46", categories: [1] },
        { name: "Tzvi Stern", _id: "47", categories: [2] }, { name: "Akiva Stern", _id: "30", categories: [0, 2] }
            , { name: "Shana Stern", _id: "48", categories: [3] }, { name: "Akiva Stern", _id: "31", categories: [2, 3] },
        { name: "Joshua Stern", _id: "49", categories: [3] }];

        this.user.events[0].tables = [
            { _id: "1", category: this.user.categories[0], title: this.user.categories[0].name, guests: [{ name: "Yocheved & Shimon Steinitz", _id: "1", categories: [1, 2] }, { name: "Dror", _id: "2", categories: [0] }] },
            { _id: "2", category: this.user.categories[0], title: this.user.categories[0].name, guests: [{ name: "Shimon", _id: "3", categories: [1] }, { name: "Rachel", _id: "4", categories: [1, 2] }] },
            { _id: "3", category: this.user.categories[1], title: this.user.categories[1].name, guests: [{ name: "tal", _id: "5", categories: [3] }, { name: "Meir", _id: "6", categories: [1, 2, 3] }] },
            { _id: "4", category: this.user.categories[1], title: this.user.categories[1].name, guests: [{ name: "tal", _id: "51", categories: [1, 2] }, { name: "Meir", _id: "62", categories: [3] }] },
            { _id: "5", category: this.user.categories[2], title: this.user.categories[2].name, guests: [{ name: "tal", _id: "53", categories: [0, 1, 2] }, { name: "Meir", _id: "64", categories: [1, 2] }] },
            { _id: "6", category: this.user.categories[2], title: this.user.categories[2].name, guests: [{ name: "tal", _id: "55", categories: [2] }, { name: "Meir", _id: "66", categories: [1, 2] }] },
            { _id: "7", category: this.user.categories[3], title: this.user.categories[3].name, guests: [{ name: "tal", _id: "57", categories: [1] }, { name: "Meir", _id: "68", categories: [2] }] }
        ]
    }

    @observable eventIndex = null;


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


    @action mYeventindex = (index) => {
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

}

const store = new BeOurGuestStore();


export default store;
