import React, { useState, useEffect } from "react"
import { UserContext } from "../components/contexts/UserContext";
import Cookies from "js-cookie";
import Profile from "../components/layouts/Profle";
import ProfileTabs from "../components/tabs/ProfileTabs";
import ProfileTab from "../components/tabs/ProfileTabs";
import Favourites from "../components/layouts/Favourites";
import { Tab } from "../components/tabs/AdminTabs";
import Delivery from "../components/layouts/Delivery";
import { useParams, useSearchParams } from "react-router-dom";

const ProfilePage = () => {
  const [param, setParam] = useSearchParams() 
  const tab = param.get('tab')

  return (
    <div className="w-full">
      <ProfileTabs tab={tab ? +tab : 0}>
        <Tab className="flex w-full" title="Личные данные"><Profile/></Tab>
        <Tab className="flex w-full" title="Избранное"><Favourites/></Tab>
        <Tab className="flex w-full" title="Доставка"><Delivery/></Tab>
      </ProfileTabs>
    </div>
  )
};

export default ProfilePage;
