import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import TestInstructionsPage from './Components/TestInstructions/TestInstructions';
import LoginPage from './Components/LoginPage/LoginPage';
import EssayPage from './Components/EssayPage/EssayPage';
import AudioTestPage from './Components/AudioTesting/AudioTestingPage';
import AudioPage from './Components/AudioPage/AduioPage';
import WriteEssayPage from './Components/WriteEssay/WriteEssay';
import SummaryPage from './Components/Summary/Summary';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import InstructionsLayout from './Components/InstructionsLayout/InstructionsLayout';
import { loader as WelcomeLoader } from './Components/WelcomePage/WelcomePage';
import { loader as TestInstructionsLoader } from './Components/TestInstructions/TestInstructions';
import EssayPage2 from './Components/EssayPage2/Essaypage2';
import AudioPage2 from './Components/AudioPage2/AduioPage2';
import NavigatePage from './Components/NavigatePage/NavigatePage';
import {loader as AudioPageLoader} from './Components/AudioPage/AduioPage'
import WriteEssayPage2 from './Components/WriteEssayPage2/WriteEssay';
import { loader as AudioPageLoader2 } from './Components/AudioPage2/AduioPage2';
// import Instructions from './Components/LoginPage/LoginPage';
const router = createBrowserRouter([
  {
    path:"/",
    element:<LoginPage/>,
  },
  {
    element: <PrivateRoute element={<InstructionsLayout />} />, // Wrap Layout with PrivateRoute
    children: [
      {
        path: "/welcome",
        element: <WelcomePage />,
        loader:WelcomeLoader,
        errorElement:<NavigatePage buttonText="Back to login" message="An error occured in WelcomePage" title="Oops!!"  goToPath="/"></NavigatePage>
      
      },
      {
        path: "/audio-test",
        element: <AudioTestPage />, 
        loader:WelcomeLoader,
        errorElement:<NavigatePage buttonText="Back to login" message="An error occured in Audio Test" title="Oops!!"  goToPath="/"></NavigatePage>


        // Add this route
      },
      {
        path:"/test-instructions",
        element:<TestInstructionsPage />,
        loader:WelcomeLoader,
        errorElement:<NavigatePage buttonText="Back to login" message="An error occured in Audio Test" title="Oops!!"  goToPath="/"></NavigatePage>

      },
    ]
  },
 {
path:"/essay",
element:<PrivateRoute element={<EssayPage/>}/>,
loader:WelcomeLoader,

 },
  {
    path:"/essay-audio",
    element:<PrivateRoute element={<AudioPage/>}/>,
    loader:AudioPageLoader


  },
  {
    path:"/write-test",
    // element:<WriteEssayPage/>
    element:<PrivateRoute element={<WriteEssayPage/>}/>,


  }
  ,
  {
  path:"/summary",
  element:<SummaryPage/>
  },
  {
    path:"/essay-2",
    element:<PrivateRoute element={<EssayPage2/>}/>,
    loader:TestInstructionsLoader
    
     },
      {
        path:"/essay-audio-2",
        element:<PrivateRoute element={<AudioPage2/>}/>,
        loader:AudioPageLoader2
    
    
      },
      {
        path:"/write-test-2",
        element:<PrivateRoute element={<WriteEssayPage2/>}/>,
    
    
      }
      ,
      {
      path:"/summary",
      element:<SummaryPage/>
      }
])
function App() {

    return <RouterProvider router={router}/>;

  
}

export default App;
