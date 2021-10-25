import '../Styles/LandingPage.css'
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdb-react-ui-kit";
import BuildingList from "./BuildingList";
import {useContext, useState, useEffect} from "react";
import BuildingPage from "./BuildingPage";
import move3 from '../Assets/CFAmoview.mp4'
import FloorPlan from "./FloorPlan";
import {CFAContext} from "../State/Context";
import {Route, Switch} from "react-router-dom";

const LandingPage = () => {
    // let [loading, setLoading] = useState(false)
    // let [shift, setShift] = useState(false)y

    const { state: { building, floorName, title }, dispatch } = useContext(CFAContext);
//    const {message, connectionStatus}= useSubscription(
//    'CFA_IOT/OakmontA'
//    )
//    useEffect(()=>{
//        console.log(connectionStatus)
//        if(message) {
//        console.log(message)}
//
//    }, [connectionStatus, message])



    // let [arrayOfVideos, setVideoes] = useState([{name: 'Building Alpha'}, {name: 'Building Beta'},{name: 'Building Theta'}])
    // let [floorPlan, setShowFloor] = useState(false)
    // let [room, setRoom] = useState(false)



    return (
        <>
    <video autoPlay loop muted className= 'video'><source src = {move3} type = 'video/mp4'/></video>
        <MDBContainer fluid  className= 'content p-4' >
                <MDBRow className = 'g-1'>
                    <MDBCol size = '2' className= 'rounded-6 whiteBackgroundRed p-3 m-1 sticky-top'>
                        <div>
                            <span className= 'font-weight-bold text-center'>Campus Total <MDBIcon icon="circle" />
                            </span><span className= 'biggerFont'> 32</span>
                        </div>
                    {building&&<div><hr/><MDBIcon far icon="building" /><span className='newFont font-weight-bold'> {building}</span></div>}
                    {floorName&&<div><MDBIcon icon="layer-group" /><span className='newFont font-weight-bold'> {floorName}</span></div>}
                    </MDBCol>
                </MDBRow>

                <MDBRow className= 'justify-content-center'>
                     <MDBCol size= '6'>
                         <MDBRow className= 'negative justify-content-end align-items-center'>
                             <MDBCol>
                                 <div className= 'title whiteBackgroundRed biggerFont text-center p-2 mx-auto'>
                                     {title}
                                 </div>
                             </MDBCol>
                         </MDBRow>
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
