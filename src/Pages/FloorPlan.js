import {useContext, useEffect, useState} from "react";
import {MDBCol, MDBContainer,MDBRow} from "mdb-react-ui-kit";
import ImageMapper from 'react-img-mapper'
import {CFAContext} from "../State/Context";
import {useHistory} from "react-router-dom";
import oakAN from "../Assets/OakmontANorth.png"
import oakAM from "../Assets/OakmontAMiddle.png"
import oakAS from "../Assets/OakmontASouth.png"
import oakBN from "../Assets/OakmontBNorth.png"
import oakBM from "../Assets/OakmontBMiddle.png"
import oakBS from "../Assets/OakmontBSouth.png"
import mainFL from "../Assets/FitnessLower.png"
import mainF from "../Assets/Fitness.png"
import mainN1 from "../Assets/mn1new.png"
import mainN2 from "../Assets/mn2new.png"
import mainN3 from "../Assets/mn3new.png"
import mainN4 from "../Assets/mn4new.png"
import mainN5 from "../Assets/mn5new.png"
import mainD from "../Assets/Dining.png"
import mainT from "../Assets/Terrace.png"
import mainS1 from "../Assets/ms1new.png"
import mainS2 from "../Assets/ms2new.png"
import mainS3 from "../Assets/ms3new.png"
import mainS4 from "../Assets/ms4new.png"
import mainS5 from "../Assets/ms5new.png"
import itA from "../Assets/ITA.gif"
import itB from "../Assets/ITB.gif"
import itC from "../Assets/ITC.gif"
import itD from "../Assets/ITD.gif"
import ponceA from "../Assets/PonceAnew.png"
import ponceB from "../Assets/PonceBnew.png"
import Linc1 from "../Assets/Lincoln100.png"
import Linc1E from "../Assets/Lincoln100East.png"
import Linc1FIC from "../Assets/Lincoln100West.png"
import Linc1M from "../Assets/Lincoln100Middle.png"
import Linc2 from "../Assets/Lincoln200_Overall.png"
import Linc2E from '../Assets/Lincoln200East.png'
import Linc2M from '../Assets/Lincoln200Middle.png'
import Linc2W from '../Assets/Lincoln200West.png'
import Linc3 from "../Assets/Lincoln300_Overall.png"
import Linc3E from '../Assets/Lincoln300East.png'
import Linc3W from '../Assets/Lincoln300West.png'

const FloorPlan = (props) => {
    // images and areas will probably need to be prebuilt and sent here. Can send floor but will still have to manually change all of them
    const [floorPlan, setFloorPlan] = useState({name: 'defaultFloor', rooms: [{name: 'meeting24', data: {}}] })
    const { state: { building, floorName, campusData }, dispatch } = useContext(CFAContext); //building needs to be a path since thats the only unique identifier
    let history = useHistory()
    const[map, setMap] = useState()

    useEffect(() => {
        // get the data from the json file parse it into this component
        getData('data.json').then(data => (setMap(data)))
        // interrupts back function and resets state
        return history.listen(location => {
            console.log('change')
            if(history.action === 'POP') {
                handleBeforeUnload()
            }
        })
    }, [history]);

    // resets state
    function handleBeforeUnload() {
        dispatch({floorName: ''})
        dispatch({building: ''})
        dispatch({title: 'Building List'})
    }
    //gets data from local files
    async function getData (object) {
        let data = await fetch(object, {headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }}
        )
        data = await data.json()
        return data
    }
    //object containing keys and image values
    let imageObjects = {
        "OakmontAFloor North": oakAN,
        "OakmontAFloor Middle": oakAM,
        "OakmontAFloor South": oakAS,
        "OakmontBFloor North": oakBN,
        "OakmontBFloor Middle": oakBM,
        "OakmontBFloor South": oakBS,
        "MainNorthFitness Lower": mainFL,
        MainNorthFitness: mainF,
        "MainNorthFloor 1": mainN1,
        "MainNorthFloor 2": mainN2,
        "MainNorthFloor 3": mainN3,
        "MainNorthFloor 4": mainN4,
        "MainNorthFloor 5": mainN5,
        MainSouthTerrace: mainT,
        MainSouthDining: mainD,
        "MainSouthFloor 1": mainS1,
        "MainSouthFloor 2": mainS2,
        "MainSouthFloor 3": mainS3,
        "MainSouthFloor 4": mainS4,
        "MainSouthFloor 5": mainS5,
        "PonceFloor A": ponceA,
        "PonceFloor B": ponceB,
        "ITDeckFloor North": itA,
        "ITDeckFloor East": itB,
        "ITDeckFloor West": itC,
        "ITDeckFloor South": itD,
        Lincoln1001: Linc1,
        "Lincoln100Floor East": Linc1E,
        "Lincoln100Floor FIC": Linc1FIC,
        "Lincoln100Floor Middle": Linc1M,
        Lincoln2001: Linc2,
        "Lincoln200Floor East": Linc2E,
        "Lincoln200Floor Middle": Linc2M,
        "Lincoln200Floor West": Linc2W,
        Lincoln3001: Linc3,
        "Lincoln300Floor East": Linc3E,
        "Lincoln300Floor West": Linc3W
    }


    useEffect(()=>{
        //based on the gathered data from clicks, gets the image matching the name of the building and floor
        let image =  imageObjects[building+floorName]
        setFloorPlan(image)
    },[building, floorName])

    //from a map of objects, gets the one with a name matching the building floorname.
    //adds current count to each mapped object to be read by the modified image mapper
    const createMap = (map) => {
        let arr =  map.filter((input) =>
            input.name === building + floorName
        )

        arr[0].areas.forEach((item) => {
            if(campusData[building][floorName] && campusData[building][floorName].hasOwnProperty(item.name)) {
                item.text = campusData[building][floorName][item.name].currentCount.toString()
            }
        })

        return arr[0]
    }


    const clicked = (area)=>{
        dispatch({room: area.name})
        dispatch({title: area.alias})
    }
    return (
        <>
            <MDBContainer className= 'p-1 mt-2 d-flex justify-content-center'>
                <MDBRow className= ''>
                    <MDBCol className= 'floorPlanMargin mapContainer'>
                            <ImageMapper src = {floorPlan} map = {map && createMap(map)}
                                 onClick = {area => {clicked(area);history.push("/buildingPage")} }>
                            </ImageMapper>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        </>
    )
}

export default FloorPlan
