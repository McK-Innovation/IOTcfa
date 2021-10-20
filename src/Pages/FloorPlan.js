import {useContext, useEffect, useState} from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdb-react-ui-kit";
import ImageMapper from 'react-img-mapper'
import defaultFloorImage from '../Assets/ChickFILa_Floor02B[941].png'
import {CFAContext} from "../State/Context";
import {useHistory} from "react-router-dom";
import oakmontA1 from "../Assets/Optimized-OakmontA_Overall.png"
import oak from "../Assets/OakmontA_.png"
import oakB from "../Assets/OakmontB.png"

const FloorPlan = (props) => {
    // images and areas will probably need to be prebuilt and sent here. Can send floor but will still have to manually change all of them
    const [floorPlan, setFloorPlan] = useState({name: 'defaultFloor', rooms: [{name: 'meeting24', data: {}}] })
    const { state: { building, floorName }, dispatch } = useContext(CFAContext); //building needs to be a path since thats the only unique identifier
    let history = useHistory()
    useEffect(() => {
        return history.listen(location => {
            console.log('change')
            if(history.action === 'POP') {
                handleBeforeUnload()
            }
        })
    }, [history]);
    function handleBeforeUnload() {
        dispatch({floorName: ''})
        dispatch({building: ''})
        dispatch({title: 'Building List'})
    }
    let imageObjects = {oakmontA1: oak, oakmontB1:oakB, default: defaultFloorImage}
    let mapArray = [{
        name: 'oakmontA1',
        areas: [
            {
                name: "Rest_Sim1",
                shape: "poly",
                coords: [66, 159, 52, 237, 102, 239, 115, 156],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "Perch_D",
                shape: "poly",
                coords: [58, 86, 53, 114, 123, 114, 128, 87],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "TheCoop",
                shape: "poly",
                coords: [66, 159, 52, 237, 102, 239, 115, 156],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "Mens_RR_N",
                shape: "poly",
                coords: [230, 100, 222, 92, 237, 81, 245, 89],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "Womens_RR_N",
                shape: "poly",
                coords: [227, 123, 237,134, 266, 113, 255, 95],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "Nest_Perch",
                shape: "poly",
                coords: [305, 82, 330, 107, 252, 188, 219, 152],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "Perch_B",
                shape: "poly",
                coords: [359, 112, 338, 128, 362, 159, 388, 136],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "ThePerch",
                shape: "poly",
                coords: [408, 120, 443, 117, 445, 188, 404, 230, 382, 230, 344, 191, 344, 178],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "Perch_C",
                shape: "poly",
                coords: [437, 200, 406, 229, 442, 229, 443, 203],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "Perch_A",
                shape: "poly",
                coords: [411, 50, 411, 91, 452, 92, 432, 52],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "Cafe",
                shape: "poly",
                coords: [ 504, 26, 505, 47, 535, 47, 551, 58, 591, 105, 601, 104, 609, 118, 746,113,738,26,522,24],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "The_Coop",
                shape: "poly",
                coords: [ 637,144,
                    639,195,
                    694,196,
                    710,338,
                    736,338,
                    735,271,
                    756,271,
                    751,217,
                    726,217,
                    723,139],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "Incubator",
                shape: "poly",
                coords: [ 474,97,
                    474,232,
                    609,234,
                    608,136,
                    616,138,
                    600,105,
                    596,110,
                    549,63,
                    556,60,
                    525,45,
                    504,48,
                    484,58,
                    471,78],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "IncubaterSto",
                shape: "poly",
                coords: [ 476,284,
                    476,344,
                    569,344,
                    567,284],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "Incubator_A",
                shape: "poly",
                coords: [ 613,284,
                    614,346,
                    570,346,
                    569,282],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "CoopRm_A",
                shape: "poly",
                coords: [ 639,196,
                    640,230,
                    699,230,
                    697,196],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "CoopRm_B",
                shape: "poly",
                coords: [ 639,232,
                    640,269,
                    702,269,
                    702,230],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "CoopRm_C",
                shape: "poly",
                coords: [ 643,269,
                    640,308,
                    704,307,
                    704,269],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "CoopRm_D",
                shape: "poly",
                coords: [ 642,310,
                    642,348,
                    673,346,
                    673,308],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "CoopRm_E",
                shape: "poly",
                coords: [ 674,307,
                    674,346,
                    705,348,
                    705,307
                ],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "Mens_RR_S",
                shape: "poly",
                coords: [770,95,
                    780,94,
                    778,74,
                    769,73,
                    769,60,
                    774,60,
                    775,50,
                    767,48,
                    767,39,
                    754,37,
                    761,115,
                    774,117,
                    772,105,
                    783,104

                ],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "Womens_RR_S",
                shape: "poly",
                coords: [ 790,94,
                    788,71,
                    798,71,
                    798,58,
                    790,55,
                    790,48,
                    795,48,
                    795,37,
                    806,37,
                    816,113,
                    801,113,
                    801,104,
                    801,92
                ],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "TheCoop",
                shape: "poly",
                coords: [ 817,19,
                    829,115,
                    930,113,
                    931,120,
                    949,118,
                    931,34,
                    928,21,
                    840,22,
                    840,17
                ],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "Rest_Sim3",
                shape: "poly",
                coords: [ 946,263,
                    925,265,
                    923,248,
                    847,247,
                    842,191,
                    930,191,
                    931,198,
                    936,198,
                    941,234,
                    939,234,
                    939,247,
                    944,247,
                ],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },
            {
                name: "Rest_Sim2",
                shape: "poly",
                coords: [ 955,265,
                    935,265,
                    935,292,
                    847,292,
                    847,287,
                    826,287,
                    832,350,
                    915,350,
                    912,308,
                    917,308,
                    917,304,
                    955,304

                ],
                fillColor: "#a207154f",
                strokeColor: "#ffffff"
            },

        ],


    },
        {
            name: 'oakmontB1',
            areas: [
                {
                    name: "Rest_Sim1",
                    shape: "poly",
                    coords: [66, 159, 52, 237, 102, 239, 115, 156],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "Perch_D",
                    shape: "poly",
                    coords: [58, 86, 53, 114, 123, 114, 128, 87],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "TheCoop",
                    shape: "poly",
                    coords: [66, 159, 52, 237, 102, 239, 115, 156],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "Mens_RR_N",
                    shape: "poly",
                    coords: [230, 100, 222, 92, 237, 81, 245, 89],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "Womens_RR_N",
                    shape: "poly",
                    coords: [227, 123, 237,134, 266, 113, 255, 95],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "Nest_Perch",
                    shape: "poly",
                    coords: [305, 82, 330, 107, 252, 188, 219, 152],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "Perch_B",
                    shape: "poly",
                    coords: [359, 112, 338, 128, 362, 159, 388, 136],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "ThePerch",
                    shape: "poly",
                    coords: [408, 120, 443, 117, 445, 188, 404, 230, 382, 230, 344, 191, 344, 178],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "Perch_C",
                    shape: "poly",
                    coords: [437, 200, 406, 229, 442, 229, 443, 203],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "Perch_A",
                    shape: "poly",
                    coords: [411, 50, 411, 91, 452, 92, 432, 52],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "Cafe",
                    shape: "poly",
                    coords: [ 504, 26, 505, 47, 535, 47, 551, 58, 591, 105, 601, 104, 609, 118, 746,113,738,26,522,24],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "The_Coop",
                    shape: "poly",
                    coords: [ 637,144,
                        639,195,
                        694,196,
                        710,338,
                        736,338,
                        735,271,
                        756,271,
                        751,217,
                        726,217,
                        723,139],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "Incubator",
                    shape: "poly",
                    coords: [ 474,97,
                        474,232,
                        609,234,
                        608,136,
                        616,138,
                        600,105,
                        596,110,
                        549,63,
                        556,60,
                        525,45,
                        504,48,
                        484,58,
                        471,78],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "IncubaterSto",
                    shape: "poly",
                    coords: [ 476,284,
                        476,344,
                        569,344,
                        567,284],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "Incubator_A",
                    shape: "poly",
                    coords: [ 613,284,
                        614,346,
                        570,346,
                        569,282],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "CoopRm_A",
                    shape: "poly",
                    coords: [ 639,196,
                        640,230,
                        699,230,
                        697,196],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "CoopRm_B",
                    shape: "poly",
                    coords: [ 639,232,
                        640,269,
                        702,269,
                        702,230],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "CoopRm_C",
                    shape: "poly",
                    coords: [ 643,269,
                        640,308,
                        704,307,
                        704,269],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "CoopRm_D",
                    shape: "poly",
                    coords: [ 642,310,
                        642,348,
                        673,346,
                        673,308],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "CoopRm_E",
                    shape: "poly",
                    coords: [ 674,307,
                        674,346,
                        705,348,
                        705,307
                    ],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "Mens_RR_S",
                    shape: "poly",
                    coords: [770,95,
                        780,94,
                        778,74,
                        769,73,
                        769,60,
                        774,60,
                        775,50,
                        767,48,
                        767,39,
                        754,37,
                        761,115,
                        774,117,
                        772,105,
                        783,104

                    ],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "Womens_RR_S",
                    shape: "poly",
                    coords: [ 790,94,
                        788,71,
                        798,71,
                        798,58,
                        790,55,
                        790,48,
                        795,48,
                        795,37,
                        806,37,
                        816,113,
                        801,113,
                        801,104,
                        801,92
                    ],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "TheCoop",
                    shape: "poly",
                    coords: [ 817,19,
                        829,115,
                        930,113,
                        931,120,
                        949,118,
                        931,34,
                        928,21,
                        840,22,
                        840,17
                    ],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "Rest_Sim3",
                    shape: "poly",
                    coords: [ 946,263,
                        925,265,
                        923,248,
                        847,247,
                        842,191,
                        930,191,
                        931,198,
                        936,198,
                        941,234,
                        939,234,
                        939,247,
                        944,247,
                    ],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },
                {
                    name: "Rest_Sim2",
                    shape: "poly",
                    coords: [ 955,265,
                        935,265,
                        935,292,
                        847,292,
                        847,287,
                        826,287,
                        832,350,
                        915,350,
                        912,308,
                        917,308,
                        917,304,
                        955,304

                    ],
                    fillColor: "#a207154f",
                    strokeColor: "#ffffff"
                },

            ],


        },]
    useEffect(()=>{
        let image =  imageObjects[building+floorName]
        setFloorPlan(image)
    },[building, floorName])

    const createMap = () => {
      let arr =  mapArray.filter(input => (
            input.name === building + floorName
      ))
        return arr[0]
    }


    const clicked = (area)=>{
        // will be the data instead
        dispatch({room: area.name})
        dispatch({title: `Statistics on ` + area.name})
    }
    return (
        <>
            <MDBContainer className= 'p-1 mt-3 '>

                <MDBRow className= ''>
                    <MDBCol className= 'floorPlanMargin '>

                            <ImageMapper src = {floorPlan} map = {createMap()}
                                imgWidth={1000} width={1200} onClick = {area => {clicked(area);history.push("/buildingPage")} }>
                            </ImageMapper>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>

        </>
    )
}

export default FloorPlan
