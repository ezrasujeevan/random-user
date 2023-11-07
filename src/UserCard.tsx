import React, {useState} from "react";
import {Avatar, Card, CardContent, IconButton, TextField, Typography, Unstable_Grid2 as Grid} from '@mui/material';
import {User} from "./Type";
import {EditNote, Save} from '@mui/icons-material';

type UserCardProps = {
    user: User
}

const UserCard: React.FC<UserCardProps> = ({user}: UserCardProps) => {

    const [edit, setEdit] = useState<boolean>(false)


    const handleOnClickEdit = (event: React.MouseEvent<HTMLElement>) => {
        setEdit(false)
    }

    const handleOnClickSave = (event: React.MouseEvent<HTMLElement>) => {
        setEdit(true)
    }

    if (edit) {
        return (

            <Card variant="outlined">
                <CardContent>
                    <IconButton aria-label="edit" onClick={handleOnClickEdit}>
                        <EditNote/>
                    </IconButton>
                    <Typography variant="h5">
                        {user.name.title}.{user.name.first} {user.name.last}
                    </Typography>
                    <Avatar alt={user.name.first} src={user.picture.large} sx={{width: 100, height: 100}}/>
                    <Typography variant="h6" alignItems="center" component={"div"}>
                        {user.email}
                    </Typography>
                    <Typography variant="h6" alignItems="center" component={"div"}>
                        {user.phone}
                    </Typography>
                    <Typography variant="h6" alignItems="center" component={"div"}>
                        {user.location.city},{user.location.state}
                    </Typography>
                </CardContent>
            </Card>
        )
    } else {
        return (
            <Grid direction={"column"}>
                <Grid>
                    <IconButton aria-label="save" onClick={handleOnClickSave}>
                        <Save/>
                    </IconButton>
                </Grid>
                <Avatar alt={user.name.first} src={user.picture.large} sx={{width: 100, height: 100}}/>
                <Grid direction={"row"}>
                    <TextField
                        required
                        id="fname"
                        label="First Name"
                        value={user.name.first}
                    />
                    <TextField
                        required
                        id="lname"
                        label="Last Name"
                        value={user.name.last}
                    />

                    <TextField
                        required
                        id="city"
                        label="City"
                        value={user.location.city}
                    />
                    <TextField
                        required
                        id="country"
                        label="State"
                        value={user.location.state}
                    />
                </Grid>
            </Grid>
        )
    }


}

export default UserCard