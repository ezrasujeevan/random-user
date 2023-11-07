import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Location, Name, User} from "./Type";
import {
    Avatar,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Container,
    IconButton,
    TextField,
    Typography,
    Unstable_Grid2 as Grid
} from "@mui/material";
import {EditNote, Save} from "@mui/icons-material";
import {useImmer} from "use-immer";


function App() {
    const [editUser, updateEditUser] = useImmer<User>({} as User)
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("");

    const [edit, setEdit] = useState<number>(-1)

    const fetchUsers = async () => {
        const response = await axios.get("https://randomuser.me/api/?results=12&nat=us");
        setUsers(response.data.results);
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
    }, [sortBy]);


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (field: string) => {
        setSortBy(field);
    };

    const handleEdit = (index: number) => {
        if (edit < 0) {
            setEdit(index)
            updateEditUser(users[index] as User)
        }
    };

    const handleSave = (index: number) => {
        const newUsers = [...users]
        newUsers[index] = editUser;
        setUsers(newUsers)
        setEdit(-1)
        updateEditUser({} as User)
    }

    const handleEditUserName = (node: string, value: string) => {
        updateEditUser(draft => {
            draft.name[node as keyof Name] = value

        })


    }
    const handleEditUserLocation = (node: string, value: string) => {

        updateEditUser(draft => {
            draft.location[node as keyof Location] = value
        })

    }


    const filteredUsers = users.filter(
        (user) =>
            user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name.last.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container fixed>
            <Grid container spacing={2}>
                <Grid sm={12}>
                    <TextField id="outlined-basic" label="Search" variant="outlined"/>
                </Grid>
                <Grid sm={12}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button>First Name</Button>
                        <Button>Last Name</Button>
                        <Button>State</Button>
                    </ButtonGroup>
                </Grid>
                <Grid spacing={2} sm={12} container>
                    {filteredUsers.map((user, index) => {
                        if (edit === index) {
                            return (
                                <Grid sm={4} display="flex" justifyContent="center" key={index}>
                                    <Grid direction={"column"}>
                                        <Grid>
                                            <IconButton aria-label="save" onClick={() => handleSave(index)}>
                                                <Save/>
                                            </IconButton>
                                        </Grid>
                                        <Avatar alt={user.name.first} src={user.picture.large}
                                                sx={{width: 100, height: 100}}/>
                                        <Grid direction={"row"}>
                                            <TextField
                                                required
                                                id="first"
                                                label="First Name"
                                                value={editUser?.name.first}
                                                onChange={(e) => handleEditUserName(e.target.id, e.target.value)}
                                            />
                                            <TextField
                                                required
                                                id="last"
                                                label="Last Name"
                                                value={editUser?.name.last}
                                                onChange={(e) => handleEditUserName(e.target.id, e.target.value)}
                                            />

                                            <TextField
                                                required
                                                id="city"
                                                label="City"
                                                value={editUser?.location.city}
                                                onChange={(e) => handleEditUserLocation(e.target.id, e.target.value)}
                                            />
                                            <TextField
                                                required
                                                id="state"
                                                label="State"
                                                value={editUser?.location.state}
                                                onChange={(e) => handleEditUserLocation(e.target.id, e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>)
                        } else {
                            return (
                                <Grid sm={4} display="flex" justifyContent="center" key={index}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <IconButton aria-label="edit" onClick={() => handleEdit(index)}>
                                                <EditNote/>
                                            </IconButton>
                                            <Typography variant="h5">
                                                {user.name.title}.{user.name.first} {user.name.last}
                                            </Typography>
                                            <Avatar alt={user.name.first} src={user.picture.large}
                                                    sx={{width: 100, height: 100}}/>
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
                                </Grid>
                            )
                        }

                    })}
                </Grid>
            </Grid>
        </Container>
    )

}

export default App;
