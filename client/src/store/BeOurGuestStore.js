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
  @observable eventIndex = null;
  @observable invitationIndex = null;

  @observable myEventPage = true;

  @action ChangeMyEventPage = (item) => {
    this.myEventPage = item;
  }
  @action test = (obj) => {
    debugger
    let g1 = this.user.events[0].guests[0];
    g1.numComing = obj.numComing;
    g1.numNotComing = obj.numNotComing;
    debugger

  }

  @action realTimeRsvp = (i_events, i_guest, Coming, NotComing) => {
    let item = this.user.events[i_events].guests[i_guest]
    item.numComing = Coming;
    item.numNotComing = NotComing;

  }
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
    //let userInfo = item.user;
    let userInfo = item;
    this.user.userLog = true;
    this.user._Id = userInfo._id
    this.user.email = userInfo.email
    this.user.username = userInfo.username;
    this.user.events = userInfo.events;
    this.user.guests = userInfo.guests;
    this.user.categories = userInfo.categories;
    //this.user.categories = item.userCategories;
    // console.log(JSON.stringify(this.user.events))

    // console.log(JSON.stringify(this.user.categories))

    let user = {
      username: item.username,
      password: item.password
    }



    localStorage.setItem("beOurGuestUser", JSON.stringify(user));
  }



  //****************************************************** */

  // evnte function
  @action thisEventIndex = (index) => {
    this.eventIndex = index;
    // console.log("event index is  " + index);
    localStorage.setItem("beOurGuestEventIndex", JSON.stringify(index));
  }

  @action addEvent = (newEvent) => {
    let listEvents = this.user.events.concat();
    listEvents.push(newEvent);
    this.user.events = listEvents;
    console.log(this.user.events.length);
    console.log(this.user.events.length - 1);
    this.thisEventIndex(this.user.events.length - 1)

  }


  @action editEvent = (newEvent, index) => {
    let theEvent = this.user.events[index];
    theEvent.Title = newEvent.Title;
    theEvent.Date = newEvent.Date;
    theEvent.Location = newEvent.Location;
    theEvent.maxGuests = newEvent.maxGuests
    theEvent.HostName = newEvent.HostName;

    this.thisEventIndex(index)

  }

  @action removEvent = (eventIndex) => {
    let listEvents = this.user.events.concat();
    listEvents.splice(eventIndex, 1);
    this.user.events = listEvents;

    // If current active event is being removed
    if (this.eventIndex === eventIndex) {
      this.eventIndex = null;
      localStorage.setItem("beOurGuestEventIndex", JSON.stringify(this.eventIndex));
    }
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

    console.log(newGuest);
    // Add globalGuest to global guest list
    let guestList = this.user.guests.concat();
    guestList.push(globalGuest);
    this.user.guests = guestList;
    console.log(JSON.stringify(this.user.guests));

    let guest = {
      _id: newGuest.guestId,
      globalGuest_id: globalGuest,
      invitations: newGuest.invitations,
      categories: newGuest.categories,
      comment: newGuest.comment,
      numInvited: newGuest.numInvited,
      numComing: newGuest.numComing,
      numNotComing: newGuest.numNotComing,
      seated: newGuest.seated
    };

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


  /// Table function
  @action addTable = (newTable) => {
    let tables = this.user.events[this.eventIndex].tables.push(newTable);
    // console.log(this.user.events[this.eventIndex].tables);
  }
  @action updateTable = (table, index) => {
    this.user.events[this.eventIndex].tables[index] = table;
    console.log(table);
  }

  @action updateTableById = (newTable) => {
    let index = this.user.events[this.eventIndex].tables.findIndex(table => table._id === newTable._id);
    this.user.events[this.eventIndex].tables[index] = newTable;
    console.log(newTable);
  }

  @action updateTables = (newTables) => {
    this.user.events[this.eventIndex].tables = newTables;
    console.log(newTables);
  }

  @action updateGuests = (newGuests) => {
    this.user.events[this.eventIndex].guests = newGuests;
    console.log(newGuests);
  }

}

const store = new BeOurGuestStore();

export default store;
