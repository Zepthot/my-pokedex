// import libraries
import React from 'react';
// import components
import Gallery from "../../components/gallery";
// Home function
function Home () {
    
    return (
        // <React.StrictMode> comment to avoid double render of useEffect
        // Create search component
            <Gallery />
        // </React.StrictMode>
    );
}
// Export to call it up in app.jsx
export default Home;