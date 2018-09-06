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
    this.user.username = userInfo.username;
    this.user.events = userInfo.events;
    this.user.guests = userInfo.guests;
    this.user.categories = userInfo.categories;
    //this.user.categories = item.userCategories;
    // console.log(JSON.stringify(this.user.events))
    console.log(JSON.stringify(this.user.categories))

    let user = {
      username: userInfo.username,
      password: userInfo.password
    }

    // @action populateEvent = () => {
    /*   this.user.categories = [{ name: "Bride Family", colorCode: this.getRandomColor(), _id:'0'},
      { name: "Groom Family", colorCode: this.getRandomColor(), _id: '1' },
      { name: "Bride Friends", colorCode: this.getRandomColor(), _id: '2' },
      { name: "Groom Friends", colorCode: this.getRandomColor(), _id: '3' }
      ]; */
    //   this.user.events[this.eventIndex].guests =
    //    [{ name: "Shlomo Steinitz", _id: "44", categories: [1, 2], seated:false, numInvited:2, numConfirmed:2, numNotComing:0 },
    //   { name: "Akiva Stern", _id: "45", categories: [0] ,seated:false,  numInvited:2, numConfirmed:2, numNotComing:0},
    //   { name: "Rivki and Yoel Ben David", _id: "46", categories: [1], seated:false,  numInvited:2, numConfirmed:2, numNotComing:0 },
    //   { name: "Tzvi Stern", _id: "47", categories: [2], seated:false,  numInvited:4, numConfirmed:3, numNotComing:0 },
    //    { name: "Akiva Stern", _id: "30", categories: [0, 2], seated:false, numInvited:2, numConfirmed:2, numNotComing:0 }, 
    //    { name: "Shana Stern", _id: "48", categories: [0], seated:false,  numInvited:1, numConfirmed:1, numNotComing:0 },
    //   { name: "Akiva Stern", _id: "31", categories: [2, 1], seated:false,  numInvited:2, numConfirmed:2, numNotComing:0 },
    //   { name: "Joshua Stern", _id: "49", categories: [1], seated:false, numInvited:5, numConfirmed:4 , numNotComing:0}];

    //  /*  this.user.events[0].tables = [
    //         { _id: "1", category: this.user.categories[0], title: this.user.categories[0].name, guests: [{ name: "Yocheved & Shimon Steinitz", _id: "1", categories: [1, 2] }, { name: "Dror", _id: "2", categories: [0] }] },
    //         { _id: "2", category: this.user.categories[0], title: this.user.categories[0].name, guests: [{ name: "Shimon", _id: "3", categories: [1] }, { name: "Rachel", _id: "4", categories: [1, 2] }] },
    //         { _id: "3", category: this.user.categories[1], title: this.user.categories[1].name, guests: [{ name: "tal", _id: "5", categories: [3] }, { name: "Meir", _id: "6", categories: [1, 2, 3] }] },
    //         { _id: "4", category: this.user.categories[1], title: this.user.categories[1].name, guests: [{ name: "tal", _id: "51", categories: [1, 2] }, { name: "Meir", _id: "62", categories: [3] }] },
    //         { _id: "5", category: this.user.categories[2], title: this.user.categories[2].name, guests: [{ name: "tal", _id: "53", categories: [0, 1, 2] }, { name: "Meir", _id: "64", categories: [1, 2] }] },
    //         { _id: "6", category: this.user.categories[2], title: this.user.categories[2].name, guests: [{ name: "tal", _id: "55", categories: [2] }, { name: "Meir", _id: "66", categories: [1, 2] }] },
    //         { _id: "7", category: this.user.categories[3], title: this.user.categories[3].name, guests: [{ name: "tal", _id: "57", categories: [1] }, { name: "Meir", _id: "68", categories: [2] }] }
    //     ] */
    // }

    /*  @action populateEventCategories = () => {
         let self = this;
         this.user.events.forEach((event, eventIx) => {
             event.guests.forEach((guest, guestIx) => {
                 let guestCategory = self.user.categories.find(category => category.id === guest.categories[0].id);
                 self.user.events[eventIx].guests[guestIx].categories = [{ _id: guestCategory._id, name: guestCategory.name }];
             });
         })} */
  }
  @action updateEventIndex = eventIndex => {
    this.user.eventIndex = eventIndex;
  }

  //****************************************************** */

  // evnte function
  @action thisEventIndex = (index) => {
    this.eventIndex = index;
    console.log("event index is  " + index);

    localStorage.setItem("beOurGuestEventIndex", JSON.stringify(index));
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
  /// Table function
  @action addTable = (newTable) => {
    let tables = this.user.events[this.eventIndex].tables.push(newTable);
    console.log(this.user.events[this.eventIndex].tables);

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

}

const store = new BeOurGuestStore();

export default store;
