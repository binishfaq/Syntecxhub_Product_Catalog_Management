import React from "react";

const Footer = () => {
return ( <footer className="mt-auto border-t border-slate-200 bg-white py-4"> <div className="mx-auto max-w-7xl px-6 text-center"> <p className="text-sm text-slate-500">
© {new Date().getFullYear()} Product Catalog Management. All rights reserved. </p> </div> </footer>
);
};

export default Footer;
