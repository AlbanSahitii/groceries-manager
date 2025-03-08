import {React, useContext, useEffect, useState} from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  onlineManager,
} from "react-query";
import {AuthContext} from "../../context/AuthContext";
import {getUser, updateUser} from "../../api/user";
import {fetchFamilyInformation} from "../../api/family";
import Spinner from "../Spinner.js";
import Navbar from "./Navbar";
import "./src/styles/settings-style.css";

import ProfileLogo from "./src/img/profile-icon.png";
import ProfileWallpaper from "./src/img/profile-background.png";
const Settings = () => {
  const {user, logout} = useContext(AuthContext);
  const [inputs, setInputs] = useState({});
  const [seePassword, setSeePassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const {data: userData, isLoading: loadingUser} = useQuery(
    ["userData", user.userId],
    () => getUser(user.userId, user.jwt)
  );

  const {data: familyData, isLoading: loadingFamily} = useQuery(
    "familyData",
    () => fetchFamilyInformation(user.familyId, user.jwt)
  );

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onError: e => console.log(e),
  });
  const handleSubmit = async e => {
    updateMutation.mutate({...inputs, user_id: user.userId, jwt: user.jwt});
    queryClient.invalidateQueries(["userData"]);
    alert("please login again");
    logout();
  };

  const handleChange = e => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setInputs(values => ({...values, [name]: value}));
  };

  if (loadingUser || loadingFamily) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />
      <div className="settings-body-container">
        <div className="settings-body">
          <div className="settings-header">
            <div className="settings-header-images">
              <img src={ProfileWallpaper}></img>
              <img src={ProfileLogo}></img>
            </div>
            <div className="settings-header-data">
              <div className="settings-header-data-personal-information">
                <p className="settings-header-data-name">
                  {userData?.fullName}
                </p>
                <p className="settings-header-data-family-name">
                  {`${familyData?.family_name.toUpperCase()} Family`}
                </p>
              </div>
              <div className="settings-header-data-options">
                {/*todo check figma design for more information*/}
                <p>Private</p>
                <p>Public</p>
              </div>
            </div>
          </div>
          <div className="settings-form">
            <form onSubmit={handleSubmit}>
              <label>
                FullName -
                <input
                  type="text"
                  name="fullName"
                  onChange={handleChange}
                  readOnly={!isEditing}
                  value={
                    !isEditing ? userData?.fullName : inputs.fullName || ""
                  }
                />
              </label>
              <br />
              <label>
                Email -
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  readOnly={!isEditing}
                  value={!isEditing ? userData?.email : inputs.email || ""}
                />
                {userData?.isVerified ? "Verified" : "Not Verified"}
              </label>
              <br />
              <label>
                Username -
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  readOnly={!isEditing}
                  value={
                    !isEditing ? userData?.username : inputs.username || ""
                  }
                />
              </label>
              <br />
              <label>
                Password -
                <input
                  type={seePassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  readOnly={!isEditing}
                  value={!isEditing ? "password" : inputs.password || ""}
                />
              </label>
              <br />
              <label>
                Confirm Password -
                <input
                  type={seePassword ? "text" : "password"}
                  name="confirmPassword"
                  onChange={handleChange}
                  readOnly={!isEditing}
                  value={!isEditing ? "password" : inputs.confirmPassword || ""}
                />
              </label>
              {isEditing && (
                <>
                  <button
                    type="button"
                    onClick={() => setSeePassword(!seePassword)}
                  >
                    Show password
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    Go Back
                  </button>
                </>
              )}
              {isEditing === true ? (
                <input type="submit" value="Save Changes" />
              ) : (
                <button
                  type="button"
                  className="butoni"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  Edit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
