import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Context from '../Component/Context'
import CommentComp from '../Component/Comment';
import store from '../Mobx/Store';


@observer
class HomePage extends Component {
    static contextType = Context;
    context!: React.ContextType<typeof Context>

    componentDidMount() {
        store.updatePath("/")
    }

    render() {
        return (
            <div>
                {this.context.listComment.map(v => {
                    return <CommentComp key={v.id} comment={v} operation="ADD" />
                })}
            </div>
        );
    }
}

export default HomePage;
