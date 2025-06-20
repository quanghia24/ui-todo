"use client";

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { Box, Toolbar, CssBaseline, Typography, Divider, IconButton } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText }from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";    
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChecklistIcon from "@mui/icons-material/Checklist";
import GridViewIcon from "@mui/icons-material/GridView";
import TimerIcon from "@mui/icons-material/Timer";
import BookIcon from '@mui/icons-material/Book';
import MenuIcon from "@mui/icons-material/Menu";

import { redirect } from "next/navigation";

import ActionButton from "@/components/common/ActionButton";  

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
        props: ({ open }) => open,
        style: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
            }),
        },
        },
    ],
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    variants: [
        {
        props: ({ open }) => open,
        style: {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": openedMixin(theme),
        },
        },
        {
        props: ({ open }) => !open,
        style: {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
        },
        },
    ],
}));

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = useTheme();
    const [open, setOpen] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<string>("Todos"); 

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleChangePage = (page: string) => {
        setPage(page);
        switch (page) {
            case "Todos":
                redirect("/todos");
            case "Eisenhower matrix":
                redirect("/matrix"); 
            case "Pomodoro":
                redirect("/pomo"); 
            case "Habit":
                redirect("/habit"); 
            case "Mood tracker":
                redirect("/mood")
            default:
                console.error("Unknown page:", page);
                return;
        }
    };

    const handleLogout = () => {
        // clear session
        redirect('/auth/logout');
    }

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* Side bar */}
            <AppBar position="fixed" open={open}> 
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                        {
                            marginRight: 5,
                        },
                        open && { display: "none" },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {page}
                    </Typography>
                </Toolbar> 
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <div className="flex flex-row items-center justify-between">
                    {/* Logout button */}
                    <ActionButton handler={handleLogout} mcolor="error" text="logout"/>

                    {/* Close drawer button */}
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                        </IconButton>
                    </DrawerHeader>
                </div>
                <Divider />
                <List>
                    {["Todos", "Eisenhower matrix", "Pomodoro", "Habit", "Mood tracker"].map(
                        (text, _) => (
                        <ListItem
                            onClick={() => handleChangePage(text)}
                            key={text}
                            disablePadding
                            sx={{ display: "block" }}
                        >
                            <ListItemButton
                            sx={[
                                {
                                minHeight: 48,
                                px: 2.5,
                                },
                                open
                                ? {
                                    justifyContent: "initial",
                                    }
                                : {
                                    justifyContent: "center",
                                    },
                            ]}
                            >
                            <ListItemIcon
                                sx={[
                                {
                                    minWidth: 0,
                                    justifyContent: "center",
                                },
                                open
                                    ? {
                                        mr: 3,
                                    }
                                    : {
                                        mr: "auto",
                                    },
                                ]}
                            >
                                {text === "Eisenhower matrix" && <GridViewIcon />}
                                {text === "Todos" && <ChecklistIcon />}
                                {text === "Pomodoro" && <TimerIcon />}
                                {text === "Habit" && <WhereToVoteIcon />}
                                {text === "Mood tracker" && <BookIcon/>}
                            </ListItemIcon>
                            <ListItemText
                                primary={text}
                                sx={[
                                open
                                    ? {
                                        opacity: 1,
                                    }
                                    : {
                                        opacity: 0,
                                    },
                                ]}
                            />
                            </ListItemButton>
                        </ListItem>
                        )
                    )}
                </List>
                <Divider />
            </Drawer>

            {/* main content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
