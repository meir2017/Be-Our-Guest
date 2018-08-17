


import { observable, action, computed, observer, reaction } from "mobx";

class BeOurGuestStore {
    user = {
        username: "",
        password: "",
        email: "",
        events: [],
        guests: [],
        categories: []
    }

}

const store = new BeOurGuestStore();


export default store;