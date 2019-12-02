import { observable, configure, action, toJS } from "mobx";
import { IComment } from "../Interface/IComment";

class Store {
    @observable path: string = "/";
    @observable open: boolean = false;
    @observable listComment: Array<IComment> = [];
    @observable favoriteComment: Array<IComment> = [];

    @action updatePath = (path: string) => {
        this.path = path;
    }
    @action updateListComment = (list: Array<IComment>) => {
        this.listComment = list
    }
    @action addToListComment = (comment: IComment) => {
        this.listComment.push(comment);
    }
    @action addFavoriteComment = (comment: IComment) => {
        this.favoriteComment.push(comment);
    }
    @action removeFavoriteComment = (comment: IComment) => {
        this.favoriteComment = this.favoriteComment.filter(x => {
            return x.id != comment.id
        })
    }
    @action setOpen = (open: boolean) => {
        this.open = open;
    }
}

configure({ enforceActions: "always" })

const store = new Store();
export default store;