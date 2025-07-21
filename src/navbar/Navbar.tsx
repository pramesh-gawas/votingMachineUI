import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../apiIntegration/api";
import { getImageUrl } from "../common/url";
import { Toaster } from "../common/Toaster";

export const Navbar = ({ auth, role }: any) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [profileData, setProfileData] = React.useState({});

  const [loading, setLoading] = React.useState(true);
  const Navigate = useNavigate();

  React.useEffect(() => {
    const loadUserProfile = async () => {
      setLoading(true);
      try {
        const { error, user } = await UserProfile();
        if (!user) {
          Toaster(error, "error");
          if (error === "invalid token") {
            localStorage.clear();
            Navigate("/user/login");
            window.location.reload();
          }
        }
        setProfileData(user);
      } catch (err: any) {
        Toaster(err, "error");
      }
    };

    loadUserProfile();
  }, [profileData?.photo]);

  const authPages = React.useMemo(() => {
    const pages = [
      { name: "Sign up", action: "/user/signup" },
      { name: "Sign in", action: "/user/login" },
    ];
    if (auth) {
      pages.length = 0;
      pages.push({ name: "Home", action: "/user/home" });
    }
    if (auth && role === "voter") {
      pages.push({ name: "voting", action: "/candidate/vote" });
    }
    return pages;
  }, [auth, role]);

  const settings = [
    { name: "Profile", action: "/user/profile" },
    { name: "Change Password", action: "/user/profile/password" },
    {
      name: "Logout",
      action: "Logout",
    },
  ];

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (action: any) => {
    handleCloseUserMenu();
    if (action === "Logout") {
      Toaster("Logout Successfully", "success");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      Navigate("user/login");
      window.location.reload();
    } else {
      Navigate(action);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-Vote Hub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {authPages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    <Link
                      style={{ color: "blue", textDecoration: "none" }}
                      to={`${page.action}`}
                    >
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {authPages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ color: "#ffff", textDecoration: "none" }}
                  to={`${page.action}`}
                >
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>
          {auth && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={profileData?.firstname}
                    src={getImageUrl(profileData?.photo)}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {auth &&
                  settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={() => handleSettingClick(setting.action)}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting.name}
                      </Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
