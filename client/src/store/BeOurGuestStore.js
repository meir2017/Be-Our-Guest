


import { observable, action, computed, observer, reaction } from "mobx";

// import { observer } from 'mobx-react';
// @observer
class IceCreamStore {
    @observable iceCreams = [];
    @observable filterString = "";
    // @observable filterRes = [];


    @computed get iceCreamsCount() {
        return this.iceCreams.length;
    }
    @action addIceCream = (flavor, color) => {
        const item = {
            flavor: flavor,
            color: color,
            comment: []
        }
        this.iceCreams.push(item);
    }
    @action deleteIceCream = (index) => {
        console.log(index);
        this.iceCreams.splice(index, 1)
    }
    @action updateIce = (data, index, itemInObj) => {
        this.iceCreams[index][itemInObj] = data;
    }
    @action addComment = (index, comment) => {
        this.iceCreams[index].comment.push(comment);
    }
    @action updateComment = (data, indexIceCreams, indexComment) => {
        this.iceCreams[indexIceCreams].comment[indexComment] = data;
    }
    @action removeComment = (indexIceCreams, indexComment) => {
        // console.log("indexIceCreams  " + indexIceCreams);
        // console.log("indexComment  " + indexComment);
        // console.log(this.iceCreams[indexIceCreams].comment)
        console.log(this.iceCreams[indexIceCreams].comment[indexComment])
        this.iceCreams[indexIceCreams].comment.splice(indexComment, 1);
    }

    @computed get filterArry() {
        // let AarryRsalt = [];
        // this.iceCreams.forEach(ice => {
        //     if (ice.flavor == this.filterString) {
        //         AarryRsalt.push(ice)
        //     }
        // })
        // return AarryRsalt;
        //const result = words.filter(word => word.length > 6);
        const result = this.iceCreams.filter(ice => (ice.flavor.substr(0, this.filterString.length).toUpperCase() == this.filterString.toUpperCase()) & this.filterString.length != "")
        return result;
        // ice.flavor.substr(0, this.filterString.length).toUpperCase() == this.filterString.toUpperCase()

    }

}

const store = new IceCreamStore();
let disposer = reaction(() => store.iceCreams.map(item => ({ flavor: item.flavor, color: item.color })), () => console.log(JSON.stringify(store.iceCreams)));
// var myJSON = JSON.stringify(obj);

export default store;