import {MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdb-react-ui-kit";
import Hls from 'hls.js'
import BuildingList from "./BuildingList";
import {useContext, componentDidUpdate} from "react";
import BuildingPage from "./BuildingPage";
// import move3 from '../Assets/newMovie.mp4';
// import move3 from '../Assets/Untitled3.webm';
import move4 from '../Assets/move3.mp4'
import lincoln1 from '../Assets/Lincoln100.mp4'
import lincoln2 from '../Assets/Lincoln200.mp4'
import lincoln3 from '../Assets/Lincoln300.mp4'
import ITDeck from '../Assets/ITDeck.mp4'
import Main from '../Assets/Main.mp4'
import Oakmont from '../Assets/Oakmont.mp4'
import FloorPlan from "./FloorPlan";
import {CFAContext} from "../State/Context";
import {Route, Switch, Link} from "react-router-dom";
import { detect } from 'detect-browser'

const LandingPage = () => {
    const { state: { building, floorName, title, cTotal }, dispatch } = useContext(CFAContext);
    const browser = detect();
    // console.log(cTotal);
    // page that contains the video, building name/count label and building list component. Using MDBkit for faster styling

    // COMMENT IN FOR DYNAMIC VIDOES
    // let move3 = 'http://10.9.9.212:3010/cfaIotMovies/cfaBackground.m3u8'

    switch (browser && browser.name) {
        case 'chrome':
            console.log('working');
            break;
        case 'firefox':
          console.log('supported');
          break;
      
        case 'edge':
          console.log('kinda ok');
          break;
      
        default:
          console.log('not supported');
      }

    if (Hls.isSupported()) {
        var video = document.getElementById('video');
        var config = {
            // debug: true,
            xhrSetup: function (xhr,url) {
                // xhr.withCredentials = true; // do send cookie
            xhr.setRequestHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
            xhr.setRequestHeader("Access-Control-Allow-Origin","*");
            xhr.setRequestHeader("Access-Control-Allow-Credentials","true");
            xhr.setRequestHeader("Access-Control-Allow-Methods", "GET");
            }
        }
            
        var hls = new Hls();
        // bind them together
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            console.log('video and hls.js are now bound together !');
            // url goes here
            hls.loadSource('http://10.9.9.212:3010/cfaIotMovies/cfaBackground.m3u8');
            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                console.log(
                    'manifest loaded, found ' + data.levels.length + ' quality level'
                );
            });
        });
      }

    // COMMENT IN FOR DYNAMIC VIDEOS
    // let background = 'http://10.9.9.212:3010/cfaIotMovies/cfaBackground.m3u8';
    // switch(building) {
    //     case 'OakmontA':
    //         background = Oakmont;
    //         break;
    //     case 'OakmontB':
    //         background = Oakmont;
    //         break;
    //     case 'Lincoln100':
    //         background = lincoln1;
    //         break;
    //     case 'Lincoln200':
    //         background = lincoln2;
    //         break;
    //     case 'Lincoln300':
    //         background = lincoln3;
    //         break;
    //     case 'MainNorth':
    //         background = Main;
    //         break;
    //     case 'MainSouth':
    //         background = Main;
    //         break;
    //     case 'ITDeck':
    //         background = ITDeck;
    //         break;
    //     default:
    //         background = 'http://10.9.9.212:3010/cfaIotMovies/cfaBackground.m3u8';
    // }

    return (
    <> 
    {/* COMMENT IN FOR DYNAMIC VIDEO */}
    {/* <video autoPlay muted loop crossOrigin='anonymous' id='video'><source src = {move3} /></video>
    {building&& <video preload = "auto" autoPlay loop muted id= 'video'><source src = {background} type = 'video/mp4'/></video>} */}

    <video autoPlay muted loop crossOrigin='anonymous' id='video'><source crossOrigin src="http://10.9.9.212:3010/cfaIotMovies/cfaBackground.m3u8"></source></video>

    {/* <video autoPlay loop muted className= 'video'><source src = {move3} type = 'video/mp4'/></video> */}
    {/* <video
            className="video"
            ref={player => (this.player = player)}
            autoPlay={true}
          /> */}
        <MDBContainer fluid  className= 'content p-4' >
            {/*Header/Label with the campus count and building/floorname*/}
            <MDBRow className = 'g-1'>
                    <MDBCol size = '2' className= 'rounded-6 whiteBackgroundRed p-3 m-1 sticky-top' >
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}><div className='cursorPointer'>
                            <span className= 'font-weight-bold text-center' style={{cursor: 'pointer'}}> Campus Total <MDBIcon icon="circle" style={{cursor: 'pointer'}}/>
                            </span><span className= 'biggerFont' style={{cursor: 'pointer'}}> {/*Hardcoded but this should be taken from the building list component after gathering all of the data*/}{cTotal}</span>
                        </div></Link>
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
