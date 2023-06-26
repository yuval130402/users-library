import React from "react";
import SiteNavBar from "layout/siteNavBar";
import Background from "layout/background";
import SearchBar from "features/search/searchBar";

function Layout({ children }) {
  return (
    <>
      <SiteNavBar>
        <SearchBar />
      </SiteNavBar>
      <Background>
        <br />
        <div className="flex justify-end px-2 lg:ml-6">
          <div className="w-full max-w-lg lg:max-w-xs">{children}</div>
        </div>
      </Background>
    </>
  );
}

export default Layout;
