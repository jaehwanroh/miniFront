import React, {useEffect} from 'react';

 const MasterLayout = ({children}) => {
  useEffect(() => {
    document.querySelector("body").classList.add("dx-viewport")
  }, []);

  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default MasterLayout;
