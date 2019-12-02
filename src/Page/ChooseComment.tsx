import React, { useContext, useEffect } from 'react';
import Context from '../Component/Context';
import { observer } from 'mobx-react';
import CommentComp from '../Component/Comment';
import { PaperSC } from '../Component/PaperSC';

const ChooseComment = observer((props: any) => {
    const context = useContext(Context);
    useEffect(() => {
        context.updatePath(props.location.pathname)
    }, [])

    return (
        <div>
            {context.favoriteComment.length > 0 ? context.favoriteComment.map(v => {
                return (
                    <CommentComp comment={v} operation="REMOVE" />
                )
            })
                :
                <PaperSC>
                    <h1>Brak ulubionych</h1>
                </PaperSC>
            }
        </div>
    )
})

export default ChooseComment;