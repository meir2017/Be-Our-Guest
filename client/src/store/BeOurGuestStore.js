


import { observable, action, computed, observer, reaction } from "mobx";

class BeOurGuestStore {
    @observable user = {
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