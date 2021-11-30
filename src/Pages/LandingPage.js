import {MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdb-react-ui-kit";
import BuildingList from "./BuildingList";
import {useContext} from "react";
import BuildingPage from "./BuildingPage";
import move3 from '../Assets/newMovie.mp4'
import FloorPlan from "./FloorPlan";
import {CFAContext} from "../State/Context";
import {Route, Switch} from "react-router-dom";

const LandingPage = () => {
    const { state: { building, floorName, title, cTotal }, dispatch } = useContext(CFAContext);
    // console.log(cTotal);
    // page that contains the video, building name/count label and building list component. Using MDBkit for faster styling
    return (
    <>
    <video autoPlay loop muted className= 'video'><source src = {move3} type = 'video/mp4'/></video>
        <MDBContainer fluid  className= 'content p-4' >
            {/*Header/Label with the campus count and building/floorname*/}
            <MDBRow className = 'g-1'>
                    <MDBCol size = '2' className= 'rounded-6 whiteBackgroundRed p-3 m-1 sticky-top' >
                        <div>
                            <span className= 'font-weight-bold text-center'> Campus Total <MDBIcon icon="circle" />
                            </span><span className= 'biggerFont'> {/*Hardcoded but this should be taken from the building list component after gathering all of the data*/}{cTotal}</span>
                        </div>
                    {building&&<div><hr/><MDBIcon far icon="building" /><span className='newFont font-weight-bold'> {building}</span></div>}
                    </MDBCol>
                </MDBRow>
            {/*Container for the title of the page and building list*/}
                <MDBRow className= 'justify-content-center'>
                     <MDBCol size= '6'>
                         <MDBRow className= 'negative justify-content-end align-items-center'>
                             <MDBCol>
                                 <div className= 'title whiteBackgroundRed biggerFont text-center p-2 mx-auto mb-2'>
                                     {title}
                                 </div>
                             </MDBCol>
                         </MDBRow>
                         {/*Routing Here*/}
                         <Switch>
                           <Route exact path = '/'>
                               <BuildingList/>
                           </Route>
                             <Route path = '/floorPlan'>
                                 <FloorPlan/>
                             </Route>
                             <Route path = '/buildingPage'>
                                 <BuildingPage/>
                             </Route>
                         </Switch>
                     </MDBCol>
                </MDBRow>
        </MDBContainer>

    </>
)}
export default LandingPage
