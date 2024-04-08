import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './Components/Signup.jsx'
import Home from './Components/Home.jsx'
import Login from './Components/Login.jsx'
import Upload from './Components/Upload.jsx'
import Homefeed from './Components/Homefeed.jsx'
import TopCreator from './Components/TopCreator.jsx'
import Mainhome from './Components/Mainhome.jsx'
import HomeAndTopCraetor from './Components/HomeAndTopCraetor.jsx'
import Logout from './Components/Logout.jsx'
import Saved from './Components/Saved.jsx'
import Profile from './Components/Profile.jsx'
import Post from './Components/Post.jsx'
import UploadedPost from './Components/UploadedPost.jsx'
import SavedPostUI from './Components/SavedPostUI.jsx'
import UploadReels from './Components/UploadReels.jsx'
import WatchReels from './Components/WatchReels.jsx'
import YourReesls from './Components/YourReels.jsx'
import Following from './Components/Following.jsx'
import Explore from './Components/Explore.jsx'
const router = createBrowserRouter([
  {
    path:"/",
    element:<Login />
  },
  {
    path:"/signup",
    element:<Signup />
  }
  ,
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/upload",
    element:<Upload />
  }
  ,
  {
    path:"/homefeed",
    element:<Homefeed />
  },
  {
    path:"/topcreator",
    element:<HomeAndTopCraetor />
  }
  , {
    path:"/mainhome",
    element:<Mainhome />
  }
  , {
    path:"/logout",
    element:<Logout />
  }
  , {
    path:"/saved",
    element:<Saved />
  }
  , {
    path:"/profile",
    element:<Profile />
  }
  , {
    path:"/post",
    element:<UploadedPost />
  }
  , {
    path:"/savedpost",
    element:<SavedPostUI />
  }
  , {
    path:"/uploadreels",
    element:<UploadReels />
  }
  , {
    path:"/reels",
    element:<WatchReels />
  }
  , {
    path:"/yourreels",
    element:<YourReesls />
  }
  , {
    path:"/following",
    element:<Following />
  }
  , {
    path:"/explore",
    element:<Explore />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
 
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
