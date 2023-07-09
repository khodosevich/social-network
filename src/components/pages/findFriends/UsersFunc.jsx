import React from 'react';
import {Avatar, Box, Button} from "@mui/material";
import x from "./findFriend.module.css";
import userPhoto from "../../../assets/img/149071.png";
import {NavLink} from "react-router-dom";
import axios from "axios";


const UsersFunc = (props) => {

    let pagesCount = Math.ceil(props.totalCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    return (
        <Box sx={{
            backgroundColor:"#7f7da8",
            paddingBottom:"100px"
        }}>

            <Box sx={{display:"flex",  justifyContent:"center", gap:"5px"}}>
                {pages.map(p => {
                    return <span
                        className={props.currentPage === p ? x.active : x.page}
                        style={{cursor:"pointer"}}
                        onClick={() => {
                            props.changePage(p)} }
                    >
                            {p}
                        </span>
                })}
            </Box>

            <Box sx={{
                display:"flex",
                justifyContent:"center",
                margin:"30px 0",
                fontWeight:"600",
                fontSize:"25px"
            }}>
                Find friends:
            </Box>

            <Box sx={{
                display:"flex",
                flexDirection:"column",
                gap:"20px",
                alignItems:"center"
            }}>
                {
                    props.users.map((user) => (

                        <Box key={user.id} sx={{
                            width:"500px",
                            background:"white",
                            padding:"20px",
                            color:"black",
                            borderRadius:"10px 20%"
                        }}>
                            <Box sx={{
                                marginBottom:"20px",
                                display:"flex",
                                justifyContent:"space-between"
                            }}>

                                <NavLink to={'/profile/' + user.id} >
                                      <Avatar alt={user.name} src={user.photos.small != null ? user.photos.small : userPhoto } />
                                </NavLink>

                                <Box>
                                    {user.followed
                                        ? <Button variant="contained" onClick={ () =>
                                        {
                                            axios
                                                .delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                                                    {
                                                        withCredentials: true,
                                                        headers: {
                                                            "API-KEY": "0324ee1c-77a4-42ba-b072-51841a95f51c"
                                                        }
                                                    }).then(response => {
                                                if(response.data.resultCode === 0) {
                                                    props.changeUnFollow(user.id)
                                                }
                                            })


                                        }
                                        }>Unfollow</Button>
                                        : <Button variant="contained" onClick={ () =>
                                        {

                                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}` ,
                                                {} ,
                                                {withCredentials: true,
                                                    headers:{
                                                        "API-KEY": "0324ee1c-77a4-42ba-b072-51841a95f51c"
                                                    }}
                                            )
                                                .then(response => {
                                                    if(response.data.resultCode === 0) {
                                                        props.changeFollow(user.id)
                                                    }
                                                })

                                        }
                                        }>Follow</Button>
                                    }
                                </Box>

                            </Box>

                            <Box>
                                {user.name}
                            </Box>
                            <Box sx={{
                                display:"flex",
                                justifyContent:"space-between",
                                marginTop:"10px",
                                alignItems:"center"
                            }}>
                                <Box>
                                    {user.status}
                                </Box>

                                <Box>
                                    Belarus
                                </Box>

                            </Box>
                        </Box>
                    ))
                }
            </Box>
        </Box>
    );
};

export default UsersFunc;