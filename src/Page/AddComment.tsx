import React, { useContext, useEffect, ChangeEvent, useState, useRef, ReactElement } from 'react';
import Context from '../Component/Context';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import styled from 'styled-components';
import { IComment } from '../Interface/IComment';
import { PaperSC } from '../Component/PaperSC';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: right;
    > *  {
        margin: 7px 20px !important;
    }
    button{
        width: 40%;
        align-self:flex-end;
    }
`;

interface INewComment {
    name: {
        value: string,
        error: boolean
    };
    email: {
        value: string,
        error: boolean
    };
    body: {
        value: string,
        error: boolean
    };
}
const defaultInput = {
    name: {
        value: "",
        error: false
    },
    body: {
        value: "",
        error: false
    },
    email: {
        value: "",
        error: false
    }
}
const AddComment = (props: any) => {
    const context = useContext(Context);
    const [inputs, setInputs] = useState<INewComment>(defaultInput);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        context.updatePath(props.location.pathname)
    }, [])
    useEffect(() => {
        context.updatePath(props.location.pathname)
    }, [inputs])

    const addNew = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const maxId = Math.max.apply(null, context.listComment.map(v => v.id))
        const newComment: IComment = {
            id: maxId,
            postId: maxId,
            email: inputs.email.value,
            body: inputs.body.value,
            name: inputs.name.value,
        }
        let error = false;

        const regExOnlyLetter = new RegExp('^[A-Za-zĄĆĘŁŃÓŚŹŻ]{3,}$', 'g');
        const testLetter = regExOnlyLetter.test(inputs.name.value);

        if (!testLetter) {
            inputs.name.error = true;
            error = true;
        } else {
            inputs.name.error = false;
        }
        if (inputs.body.value.length < 3) {
            inputs.body.error = true;
            error = true;
        } else {
            inputs.body.error = false;
        }
        if (inputs.email.value.length < 1) {
            inputs.email.error = true;
            error = true;
        } else {
            inputs.email.error = false;
        }
        setInputs({ ...inputs })
        if (!error) {
            context.addToListComment(newComment);
            setInputs(defaultInput);
            setOpen(true)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name: "name" | "email" | "body" = e.currentTarget.name as "name" | "email" | "body";
        const value = e.currentTarget.value;
        setInputs({ ...inputs, [name]: { ...inputs[name], value: value } })
    }

    return (
        <div style={{ width: "60%" }}>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    Komentarz dodany
               </DialogTitle>
                <DialogContent>
                    <p>
                        Twój komentarz został dodany prawidłowo.
                    </p>
                    <p>Możesz dodać kolejny</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>OK</Button>
                </DialogActions>
            </Dialog>
            <PaperSC>
                <Form onSubmit={addNew}>
                    <TextField
                        error={inputs.name.error}
                        name="name"
                        helperText={inputs.name.error && "Musisz wprowadzić minimum 3 znaki i tylko litery"}
                        onChange={handleChange}
                        variant="outlined"
                        label="Nazwa"
                        value={inputs.name.value}
                    />
                    <TextField
                        name="email"
                        onChange={handleChange}
                        error={inputs.email.error}
                        helperText={inputs.email.error && "Musisz wprowadzić poprawny email"}
                        variant="outlined"
                        label="Email"
                        type="email"
                        value={inputs.email.value}
                    />
                    <TextField
                        name="body"
                        multiline
                        onChange={handleChange}
                        error={inputs.body.error}
                        helperText={inputs.body.error && "Musisz wprowadzić minimum 2 znaki"}
                        variant="outlined"
                        value={inputs.body.value}
                        label="Treść"
                    />
                    <Button type="submit" variant="contained" color="primary"
                    // onClick={addNew}
                    >Dodaj nowy</Button>
                </Form>
            </PaperSC>
        </div>
    )
}

export default AddComment;