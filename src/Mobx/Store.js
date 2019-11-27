import { observable, configure } from "mobx";

class Store {
    @observable listComment = [];
}

configure({ enforceActions: true })

const store = new Store();
export default store;