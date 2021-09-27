import '../Styles/LandingPage.css'
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdb-react-ui-kit";
import BuildingList from "./BuildingList";
import {useContext, useState} from "react";
import BuildingPage from "./BuildingPage";
import boardwalkVideo from '../Assets/board2.mp4'
import building2 from '../Assets/building2.mp4'
import front from '../Assets/frontbuilding.mp4'
import back from '../Assets/back1.mp4'
import move3 from '../Assets/move3.mp4'
import FloorPlan from "./FloorPlan";
import {CFAContext} from "../State/Context";
import {Route, Switch} from "react-router-dom";

const LandingPage = () => {
    // let [loading, setLoading] = useState(false)
    // let [shift, setShift] = useState(false)

    const { state: { building, floorName }, dispatch } = useContext(CFAContext);

    // let [arrayOfVideos, setVideoes] = useState([{name: 'Building Alpha'}, {name: 'Building Beta'},{name: 'Building Theta'}])
    // let [floorPlan, setShowFloor] = useState(false)
    // let [room, setRoom] = useState(false)



    return (
        <>
    <video autoPlay loop muted className= 'video'><source src = {move3} type = 'video/mp4'/></video>
        <MDBContainer fluid  className= 'content p-4' >
                <MDBRow>
                    <MDBCol size = '2' className= 'rounded-6 whiteBackgroundRed p-3 m-1'>
                        <div>
                            <span className= 'font-weight-bold text-center'>Campus Total <MDBIcon icon="circle" />
                            </span><span className= 'biggerFont'> 274</span>
                        </div>
                    {building&&<div><hr/><MDBIcon far icon="building" /><span className='newFont font-weight-bold'> {building}</span></div>}
                    {floorName&&<div><MDBIcon icon="layer-group" /><span className='newFont font-weight-bold'> {floorName}</span></div>}
                    </MDBCol>
                </MDBRow>
                <MDBRow center className={'justify-content-start'}>
                     <MDBCol size='8' className=''>
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
                    {/*</MDBCol> : <MDBBtn onClick={()=>{setShowFloor(false); setBuilding(null); setFloorName(null)}} size="lg" floating  className= 'btn-danger'>*/}
                    {/*    <MDBIcon icon="bars"  />*/}
                    {/*</MDBBtn>}*/}
                </MDBRow>
        </MDBContainer>

    </>
)
    
    
}
export default LandingPage
