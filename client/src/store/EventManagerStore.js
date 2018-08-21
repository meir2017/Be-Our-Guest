import { observable, action } from "mobx";

class EventManagerStore {
    @observable guests = [];
    @observable tables = [];
    @observable categories = [];

    @action addGuest = (flavor ,color) => {
    	this.guests.push({ flavor, color });
    }

    @action deleteGuest = (index) => {
        this.guests.splice(index, 1);
    }

    @action editGuest = (index, guest) => {
        this.guests.splice(index, 1, guest);
    }

    @action addTable = (flavor ,color) => {
    	this.guests.push({ flavor, color });
    }

    @action deleteTable = (index) => {
        this.iceCreams.splice(index, 1);
    }

    @action editTable = (index, table) => {
        this.iceCreams.splice(index, 1, table);
    }

    @action addCategory = (flavor ,color) => {
    	this.guests.push({ flavor, color });
    }

    @action deleteCategory = (index) => {
        this.guests.splice(index, 1);
    }

    @action editCategory = (index, category) => {
        this.guests.splice(index, 1, category);
    }
}

const store = new EventManagerStore();
export default store;
