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
import Linc2 from "../Assets/Lincoln200_Overall.png"
import Linc3 from "../Assets/Lincoln300_Overall.png"

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
        OakmontANorth: oakAN,
        OakmontAMiddle: oakAM,
        OakmontASouth: oakAS,
        OakmontBNorth: oakBN,
        OakmontBMiddle: oakBM,
        OakmontBSouth: oakBS,
        MainNorthFitnessLower: mainFL,
        MainNorthFitness: mainF,
        MainNorth1: mainN1,
        MainNorth2: mainN2,
        MainNorth3: mainN3,
        MainNorth4: mainN4,
        MainNorth5: mainN5,
        MainSouthTerrace: mainT,
        MainSouthDining: mainD,
        MainSouth1: mainS1,
        MainSouth2: mainS2,
        MainSouth3: mainS3,
        MainSouth4: mainS4,
        MainSouth5: mainS5,
        PonceA1: ponceA,
        PonceB1: ponceB,
        ITDeckNorth: itA,
        ITDeckEast: itB,
        ITDeckWest: itC,
        ITDeckSouth: itD,
        Lincoln1001: Linc1,
        Lincoln2001: Linc2,
        Lincoln3001: Linc3}


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
        dispatch({title: `Statistics on ` + area.name})
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
