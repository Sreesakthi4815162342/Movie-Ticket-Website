import { createBrowserRouter } from "react-router-dom";
import Moviedetails from "../pages/MovieDetails";
import Ticketdetails from "../pages/Ticketdetails";
import Seatdetails from "../pages/Seatdetails";
import Loginpage from "../pages/Loginpage";
import Signuppage from "../pages/Signuppage";
import Moviespage from "../pages/Moviespage";
import Theaterpage from "../pages/Theaterpage";
import Mybookings from "../pages/Mybookings";
import Theaterdetails from "../pages/Theaterdetails";
import Adminlayout from "../layout/Adminlayout";
import Homepage from "../pages/Homepage";
import Userlayout from "../layout/Userlayout";
import AdminTheaterspage from "../pages/Admin/AdminTheaterspage";
import AdminTheaterdetails from "../pages/Admin/AdminTheaterdetails";
import Sellerlayout from "../layout/Sellerlayout";
import AdminHomepage from "../pages/Admin/AdminHomepage";
import SellerHomepage from "../pages/Seller/SellerHomepage";
import SellerShowpage from "../pages/Seller/SellerShowpage";
import SellerTheaterpage from "../pages/Seller/SellerTheaterpage";
import SellerMoviesPage from "../pages/Seller/SellerMoviesPage";
import SellerMovieDetailspage from "../pages/Seller/SellerMovieDetailspage";
import AdminMoviespage from "../pages/Admin/AdminMoviespage";
import AdminMovieDetails from "../pages/Admin/AdminMovieDetails";
import SearchResults from "../pages/SearchResults";
import Successpage from "../pages/Successpage";
import UserRoutes from "../components/protectedRoutes/UserRoutes";
import Failedpage from "../pages/Failedpage";
import NotFoundpage from "../pages/NotFoundpage";


export  const router = createBrowserRouter([
    {
        path:"/",
        element:<Userlayout/>,
        errorElement:<NotFoundpage/>,
        children:[{
          path:"",
            element:<Homepage/>
        },
        {
          path:"moviedetails/:id",
          element:<UserRoutes><Moviedetails/></UserRoutes>
        },
        {
          path:"login",
          element:<Loginpage/>
        },
        {
          path:"signUp",
          element:<Signuppage/>
        },
        {
          path:"ticket/:id",
          element:<Ticketdetails/>
        },
        {
          path:"seats/:id",
          element:<Seatdetails/>
        },
        {
          path:"movie",
          element:<UserRoutes><Moviespage/></UserRoutes>
        },
        {
          path:"Theater",
          element:<UserRoutes><Theaterpage/></UserRoutes>
        },
        {
          path:"bookings",
          element:<UserRoutes><Mybookings/></UserRoutes>
        },
        {
          path:"theaterdetails/:id",
          element:<Theaterdetails/>
        },
        {
          path:"search",
          element:<SearchResults/>
        },
        {
          path:"/payment/success",
          element:<Successpage/>
        },
        {
          path:"/payment/failed",
          element:<Failedpage/>
        }

      ]
    },{
      path:"/admin",
      element:<Adminlayout/>,
      children:[{
      path:"",
      element:<AdminHomepage/>
    },
    {
      path:"adminmoviespage",
      element:<AdminMoviespage/>
    },
    {
      path:"admintheaters",
      element:<AdminTheaterspage/>
    },
    {
      path:"admintheaterdetails/:id",
      element:<AdminTheaterdetails/>
    },{
      path:"adminmoviedetails/:id",
      element:<AdminMovieDetails/>
    }
  ]
    },{
      path:"/seller",
      element:<Sellerlayout/>,
      children:[{
        path:"",
        element:<SellerHomepage/>
      },
      {
        path:"sellershowspage",
        element:<SellerShowpage/>
      },
      {
        path:"sellertheaterpage",
        element:<SellerTheaterpage/>
      },
      {
        path:"sellermoviespage",
        element:<SellerMoviesPage/>
      },
      {
        path:"sellermoviedatails/:id",
        element:<SellerMovieDetailspage/>
      }
    ]
    }
  ]);