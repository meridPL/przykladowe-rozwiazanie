import React, { useContext } from 'react';
import { IComment } from '../Interface/IComment';
import { Button, Typography, Divider, Box, DialogActions, Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import styled from 'styled-components';
import Context from './Context';
import { PaperSC as Paper } from './PaperSC';
import { observer } from 'mobx-react';

const Element = styled.div`
    margin: 1rem 0;
    max-width: 500px;
`;
const PaperSC = styled(Paper)`
    display: flex;
    flex-direction: column;
    button{
        width: 40%;
        align-self: flex-end;
        margin-top: 1rem;
    }
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const Email = styled(Typography)`
    color: grey;
`;
const Name = styled(Typography)`
    font-weight: bold !important;
    font-size: 1.3rem !important;
`;
const Body = styled(Typography)`
    padding: .6rem;
`;

interface ICommentComp {
    comment: IComment;
    operation: "ADD" | "REMOVE"
}

const lib = {
    "ADD": "Dodaj do ulubionych",
    "REMOVE": "Usuń z ulubionych",
}
const CommentComp = observer(({ comment, operation }: ICommentComp) => {
    const context = useContext(Context)

    const addToFavorite = () => {
        context.addFavoriteComment(comment)
        context.setOpen(true);
    }

    const removeFromFavorite = () => {
        context.removeFavoriteComment(comment)
    }

    const switchAction = () => {
        switch (operation) {
            case "ADD":
                addToFavorite()                
                break;
            case "REMOVE":
                removeFromFavorite()
                break;
        }
    }

    return (
        <Element>
            <Dialog open={context.open}>
                <DialogTitle>
                    Sukces
                </DialogTitle>
                <DialogContent>
                    Komentarz dodany prawidłowo
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => context.setOpen(false)}>OK</Button>
                </DialogActions>
            </Dialog>
            <PaperSC>
                <Container>
                    <Email>{comment.email}</Email>
                    <Name>{comment.name}</Name>
                    <Box border={1} borderColor="grey.400" borderRadius={16}>
                        <Body>{comment.body.slice(0, 20)}</Body>
                    </Box>
                </Container>
                <Button size="small" variant="outlined" color="primary" onClick={() => switchAction()}>{lib[operation]}</Button>
            </PaperSC>
        </Element>
    )
});

export default CommentComp