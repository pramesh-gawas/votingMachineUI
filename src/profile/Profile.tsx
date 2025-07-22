import * as React from "react";
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { UserProfile } from "../apiIntegration/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../common/url";
import { Box } from "@mui/material";
import { Toaster } from "../common/Toaster";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1.3),
  textAlign: "center",
  border: "none",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

interface errorInterface {
  fname?: string;
  lname?: string;
  contact?: string;
  email?: string;
  photo?: string;
  age?: string;
}

interface profileDataInterface {
  firstname?: string;
  lastname?: string;
  age?: number;
  contact?: string;
  email?: string;
  photo?: string;
}

export const Profile = () => {
  const [profileData, setProfileData] = React.useState<profileDataInterface>(
    {}
  );
  const [avatarSrc, setAvatarSrc] = React.useState<string>();
  const [formData, setFormData] = React.useState({
    fname: "",
    lname: "",
    email: "",
    contact: "",
  });
  const [errors, setErrors] = React.useState<errorInterface>({});
  const [loading, setLoading] = React.useState(true);

  const Navigate = useNavigate();
  useEffect(() => {
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
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    loadUserProfile();
  }, [avatarSrc]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setFormData({ fname: "", lname: "", email: "", contact: "" });
  };

  const validation = () => {
    const indianMobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let newError: errorInterface = {};
    let isValid = true;
    if (!formData.fname.trim() || "") {
      newError.fname = "First name is Required";
      isValid = false;
    }

    if (!formData.lname.trim() || "") {
      newError.lname = "Last name is Required";
      isValid = false;
    }
    if (!formData.contact.trim() || "") {
      newError.contact = "Contact number Required";
      isValid = false;
    } else if (!indianMobileRegex.test(formData.contact.trim())) {
      newError.contact = "Please Enter valid phone number";
      isValid = false;
    }

    if (!formData.email || "") {
      newError.email = "Email Address Required";
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      newError.email = "Please Enter Valid email Address";
      isValid = false;
    }
    setErrors(newError);
    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validation()) {
      console.log("data validated");
      const data = await UserProfile();
      console.log(data);
    } else {
      console.error("validation failed");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box padding={4}>
      <ButtonBase
        component="label"
        role={undefined}
        tabIndex={-1} // prevent label from tab focus
        aria-label="Avatar image"
        sx={{
          borderRadius: "40px",
          "&:has(:focus-visible)": {
            outline: "2px solid",
            outlineOffset: "2px",
          },
        }}
      >
        <Avatar
          alt={profileData?.firstname}
          src={getImageUrl(profileData?.photo)}
          sx={{ height: "100px", width: "100px", marginTop: "1rem" }}
        />
        <img
          // type="file"
          // accept="image/*"
          style={{
            border: 0,
            clip: "rect(0 0 0 0)",
            height: "60px",
            margin: "-1px",
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            whiteSpace: "nowrap",
            width: "60px",
          }}
          // onChange={handleAvatarChange}
        />
      </ButtonBase>
      <h2>{profileData?.firstname + " " + profileData?.lastname}</h2>

      {/* onSubmit={handleSubmit} */}
      <form>
        <Grid container spacing={3}>
          <Grid size={6}>
            <Item>
              <input
                type="text"
                placeholder="First Name"
                style={{
                  border: "none",
                  outline: "none",
                  paddingLeft: "3px",
                  width: "100%",
                }}
                onChange={handleChange}
                value={"FIRST NAME : " + " " + profileData?.firstname}
                name="firstname"
              />
            </Item>
            {errors.fname}
          </Grid>
          <Grid size={6}>
            <Item>
              <input
                type="text"
                placeholder="Last Name"
                style={{
                  border: "none",
                  outline: "none",
                  padding: "3px",
                  width: "100%",
                }}
                onChange={handleChange}
                value={"SURNAME : " + " " + profileData?.lastname}
                name="lname"
              />
            </Item>
            {errors.lname}
          </Grid>
          <Grid size={6}>
            <Item>
              <input
                type="text"
                placeholder="Email Address"
                style={{
                  border: "none",
                  outline: "none",
                  padding: "3px",
                  width: "100%",
                }}
                onChange={handleChange}
                value={"EMAIL : " + " " + profileData?.email}
                name="email"
              />
            </Item>
            {errors.email}
          </Grid>
          <Grid size={6}>
            <Item>
              <input
                type="text"
                placeholder="Age"
                style={{
                  border: "none",
                  outline: "none",
                  padding: "3px",
                  width: "100%",
                }}
                onChange={handleChange}
                value={"AGE : " + " " + profileData?.age}
                name="contact"
              />
            </Item>
            {errors.age}
          </Grid>

          <Grid>
            {/* onClick={handleSubmit} */}
            <Button variant="contained" color="inherit">
              Save Profile
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="success" onClick={handleReset}>
              Reset
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="info" onClick={handleReset}>
              Edit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
