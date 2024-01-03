import React, { useEffect, useState } from "react";
import logo from "./youtube logo.png";
import user from "./user icon.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { Link } from "react-router-dom";
import { YOUTUBE_SEARCH_API } from "../utils/constant";
import { cacheResults } from "../utils/searchSlice";
const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggetion, setSuggetion] = useState("");
  const [showSuggetion, setShowSuggetion] = useState(false);

  const searchcache = useSelector(store=>store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    //make an api call after ever key press
    //but if the diffrence between 2 api calls is  <200ms
    //decline the api call
    const timer = setTimeout(() =>{
      if(searchcache[searchQuery]){
        setSuggetion(searchcache[searchQuery]);
      }
      else{
        getSearchSuggetion()
      }
      
    }, 200);
    
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggetion = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggetion(json[1]);

    //update cache
    dispatch(cacheResults({
     [searchQuery]: json[1],
    }));
  };
 
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1 ">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 mx-2 cursor-pointer"
          alt="menu"
          src="https://cdn.iconscout.com/icon/free/png-512/free-hamburger-menu-462145.png?f=webp&w=256"
        />
        <img className="h-8" alt="youtube-logo" src={logo} />
      </div>
      <div className="col-span-10 text-center">
        <div>
          <input
            className="w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggetion(true)}
            onBlur={() => setShowSuggetion(false)}
          />

          <button className="border border-gray-500 bg-gray-200 px-5 py-2 rounded-r-full">
            🔍
          </button>
        </div>
        {showSuggetion && (
          <div className="fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100 ml-60">
            <ul>
              {suggetion.map((s) => (
                <li
                  key={s}
                  className="py-2 px-3 shadow-sm hover:bg-gray-100 ml- -20"
                >
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <img className="h-8" alt="user" src={user} />
      </div>
    </div>
  );
};

export default Head;
