import { Routes, Route } from "react-router-dom";
import { SignUp } from "../signUp/SignUp";
import { Profile } from "../profile/Profile";
import { ChangePassword } from "../chnagePassword/ChangePassword";
import { SignIn } from "../SignIn/SignIn";
import { Home } from "../home/Home";
import { Admin } from "../admin/Admin";
import { Voting } from "../voting/Voting";

import { Candidate } from "../Candidate/Candidate";
import { User } from "../User/User";
import { Dashboard } from "../dashboard/Dashboard";
import { ForgotPassword } from "../forgotPassword/ForgotPassword";
import { ResetPassword } from "../resetPassword/ResetPassword";

export const Router = ({ role, auth }: any) => {
  return (
    <Routes>
      {!auth && (
        <>
          <Route path="/user/signup" element={<SignUp></SignUp>} />
          <Route path="/user/login" element={<SignIn></SignIn>} />
          <Route path="/" element={<SignIn></SignIn>} />
          <Route
            path="/user/forgotpassword"
            element={<ForgotPassword></ForgotPassword>}
          />
          <Route
            path="/user/reset-password"
            element={<ResetPassword></ResetPassword>}
          ></Route>

          <Route
            path="/user/reset-password/:userID/:token"
            element={<ResetPassword></ResetPassword>}
          ></Route>
        </>
      )}
      {auth && (
        <>
          <Route path="/user/profile" element={<Profile></Profile>} />
          <Route
            path="/user/profile/password"
            element={<ChangePassword></ChangePassword>}
          />
          <Route path="/user/home" element={<Home></Home>}></Route>

          <Route path="/candidate/vote" element={<Voting></Voting>}></Route>
          <Route
            path="/candidate/vote/:candidateID"
            element={<Voting></Voting>}
          ></Route>

          {auth && role === "admin" && (
            <>
              <Route path="/admin" element={<Admin />}>
                <Route path="/admin/profile" element={<Profile></Profile>} />
                <Route
                  path="/admin/profile/password"
                  element={<ChangePassword></ChangePassword>}
                />
                <Route
                  path="/admin/dashboard"
                  element={<Dashboard></Dashboard>}
                ></Route>
                <Route path="/admin" element={<Dashboard></Dashboard>}></Route>
                <Route
                  path="/admin/candidate"
                  element={<Candidate></Candidate>}
                ></Route>
                <Route
                  path="/admin/candidate/:candidateID"
                  element={<Candidate></Candidate>}
                ></Route>
                <Route path="/admin/user" element={<User></User>}></Route>
                <Route
                  path="/admin/user/:userID"
                  element={<User></User>}
                ></Route>
              </Route>
            </>
          )}
        </>
      )}
    </Routes>
  );
};
