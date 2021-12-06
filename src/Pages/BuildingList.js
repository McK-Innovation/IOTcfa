import {
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow,
    MDBIcon
} from "mdb-react-ui-kit";
import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router";
import {CFAContext} from "../State/Context";
import mOakA from "../Assets/OakA.jpg";
import mOakB from "../Assets/OakB.jpg"
import mLincoln1 from "../Assets/Lincoln100.jpg"
import mLincoln2 from "../Assets/Lincoln200.jpg"
import mLincoln3 from "../Assets/Lincoln300.jpg"
import mITDeck from "../Assets/ITDeck.jpg"
import mMainN from "../Assets/MainN.jpg"
import mMainS from "../Assets/MainS.jpg"
import mqtt from 'mqtt'

const BuildingList = () => {
    //there needs to be a function that uses switch or if statements to determine which require('path')
    // to use since require doesnt use variables directly
    let tt = {}
    let ttl = 0
    let totalCampus = {}
    let history = useHistory();
    const { state: {}, dispatch } = useContext(CFAContext);
    let [input, setInput] =useState('')
    let [loading, setLoading] = useState(false)
    let [shift, setShift] = useState(false)
    let [total, setTotal] = useState({})
    // let [cTotal, setCTotal] = useState(0);
    //array of building objects here. Path is the path to the route for mqtt
    let [buildingArray, setArray] = useState( [
        {imagePath: mOakA,
            name: 'OakmontA',
            floors: [
                {name: "North", path: 'OakmontA.json'},
                {name: "Middle", path: 'OakmontA.json'},
                {name: "South", path: 'OakmontA.json'},
            ], buildingInformation: {} },
        {imagePath: mOakB,
            name: 'OakmontB', 
            floors: [
                {name: "North", path: 'OakmontB.json'},
                {name: "Middle", path: 'OakmontB.json'},
                {name: "South", path: 'OakmontB.json'},
            ], buildingInformation: {} },
        {imagePath: mMainN,
            name: 'MainNorth',
            floors: [
                {name: "Fitness Lower", path: 'MainNorth.json'},
                {name: "Fitness", path: 'MainNorth.json'},
                {name: "1", path: 'MainNorth.json'},
                {name: "2", path: 'MainNorth.json'},
                {name: "3", path: 'MainNorth.json'},
                {name: "4", path: 'MainNorth.json'},
                {name: "5", path: 'MainNorth.json'}
            ], buildingInformation: {} },
        {imagePath: mMainS,
            name: 'MainSouth', floors: [
                {name: "Terrace", path: 'OakmontB.json',},
                {name: "Dining", path: 'OakmontB.json',},
                {name: "1", path: 'OakmontB.json',},
                {name: "2", path: 'OakmontB.json',},
                {name: "3", path: 'OakmontB.json',},
                {name: "4", path: 'OakmontB.json',},
                {name: "5", path: 'OakmontB.json',},
            ], buildingInformation: {} },
        {imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'Ponce', floors: [
                {name: "A", path: 'OakmontB.json',},
                {name: "B", path: 'OakmontB.json',},  
            ], buildingInformation: {} },
        {imagePath: mLincoln1,
            name: 'Lincoln100', floors: [
                {name: "East", path: 'Lincoln100.json',},
                {name: "Middle", path: 'Lincoln100.json',}, 
                {name: "FIC", path: 'Lincoln100.json',}, 
            ], buildingInformation: {} },
        {imagePath: mLincoln2,
            name: 'Lincoln200', floors: [
                {name: "East", path: 'Lincoln200.json',},
                {name: "Middle", path: 'Lincoln200.json',},
                {name: "West", path: 'Lincoln200.json',},
            ], buildingInformation: {} },
        {imagePath: mLincoln3,
            name: 'Lincoln300', floors: [
                {name: "East", path: 'Lincoln300.json',}, 
                {name: "West", path: 'Lincoln300.json',},
            ], buildingInformation: {} },
        {imagePath: mITDeck,
            name: 'ITDeck', floors: [
                {name: "North", path: 'ITDeck.json',},
                {name: "East", path: 'ITDeck.json',},
                {name: "South", path: 'ITDeck.json',},
                {name: "West", path: 'ITDeck.json',},
            ], buildingInformation: {} },
    ])

    const options = {
    protocol: 'ws',
    clientId: 342900,

   }
//    const client = mqtt.connect("ws://localhost:1884/", options)
//    client.subscribe('CFA_IOT/OakmontA')
    // building A: floor 1, floor2
    // two files: file1, file2
    // path: floor1/files1, floor2/file2

    const handleSetBuilding = (building) => {
        dispatch({building: building})
    }
    const handleSetFloor = (floor) => {
        dispatch({floorName: floor})
    }
    const handleTitle = (title) => {
        dispatch({title: title})
    }

    const handleCampusTotal = (total) => {
        dispatch({cTotal: total})
    }
    async function getData (object) {
        let data = await fetch(object, {headers : {
            'Content-Type': 'application/json',
                'Accept': 'application/json'
        }}
        )
        data = await data.json()
        return data
    }

    useEffect( () => {
        buildingArray.forEach(val => {
            totalCampus[val.name] = {}
            val.floors.forEach(floorVal => {
                //this needs to be replaced with mqtt but the function will use the mqtt route, subscribe and pull data, then unsubscribe.
                //Only getData needs to be changed
                getData(floorVal.path).then((data)=>{
                    let keys = Object.keys(data); //array of keys
                    let name = val.name //building name
                    let floorName = floorVal.name
                    let full = keys[2] //full data key
                    let fullData = data[full] //full data value
                    let roomsInBuilding = {} 
                    let tot = 0
                    for(let x in fullData) { //for every key...
                        let area = fullData[x].area //get name of room
                        let key = fullData[x] //the data needs to be accessed like this since there's an object within an object. This is a key
                        //array of values we care about
                        let valueArray = {
                            'Monday': key.history,
                            'alias': key.alias,
                            'dailyTally': key.dailyTally,
                            'currentCount' : key.currentCount,
                            'dayAverage': key.dayAverage,
                            'dayMax': key.dayMax,
                            'monthAverage': key.monthAverage,
                            'monthMax': key.monthMax
                        }
                        //put this object into a new object with the key of the room name
                        roomsInBuilding[area] = valueArray
                    }
                    //create an empty object value with the building name as a key
                    // console.log(totalCampus)
                    totalCampus[name][floorName] = roomsInBuilding //place the floor number (string) as a nested object with the value of the rooms object
                    // console.log(totalCampus)
                    dispatch({campusData: totalCampus }) //add this to the global context
                    // console.log(totalCampus) //can be deleted when done with testing
                    // console.log(buildingArray)
                            
                            //modify building array to include the rooms object
                            setArray(buildingArray.map((value) => {
                                if(totalCampus.hasOwnProperty(value.name)) {
                                    return {...value, buildingInformation: totalCampus[value.name]}
                                }
                                else
                                return value
                            }))
                            // create the total count of all rooms in a building (modify to get the campus total count)
                            for(let room in roomsInBuilding) {
                                if(room == "EntryExits") {
                                    tot = roomsInBuilding[room].currentCount;
                                    // ttl += tot;
                                    // handleCampusTotal(ttl);
                                }
                            }
                            tt[name] = tot
                            // console.log(tt)
                            // console.log(typeof tt)
                            // console.log(tt.name)
                            // console.log(typeof tt.name)
                            setTotal(tt)

                            const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

                            // console.log(sumValues(tt));
                            handleCampusTotal(sumValues(tt));
                            
                        })
                    })
                    
                    // if(totalCampus.name.)
                })
            }
            , [])
        // const getTotal = () => {
        //     for(let bldg in tt ) {
        //         console.log('WHAT ARE YOU' + bldg.value);
        //         ttl += bldg.value;
        //         console.log("HEllo" + ttl);
        //     }
        // }

        // getTotal();
    // renders the building list component with the object above, filtered
    return (
        !loading ? (
            <div className= 'backgroundColorforMain rounded-6 removeScroll  '>
            <MDBContainer fluid className= 'rounded-6 mt-3 mr-5 p-3'>
                <MDBRow start className='text-center'>
                    <div className='input-group'>
                        <MDBCol size='8' className='mb-3 mx-auto'>
                            <MDBInput type='text'
                                      icon = "search"
                                      onChange={(e) => {
                                          setInput(e.target.value)
                                      }}
                                      value={input}
                                      label = 'Enter Building Name'
                                      className='borderChange'
                                      hint = 'E.g. Oakmont A'
                            >
                            </MDBInput>
                        </MDBCol>

                    </div>
                </MDBRow>
            </MDBContainer>

            <MDBContainer className='backgroundColorforMain rounded-6 mt-1 p-3 widthModify2 newPad over mb-3'>
                <MDBRow center>
                {buildingArray.filter((item)=>item.name.toLowerCase().includes(input.toLowerCase())).map((value, key)=>(
                    <MDBCol size = '12' key = {value.name} className="justify-content-center backgroundColorforMain rounded-6 minWidthC mb-1 listShadow
                     ">
                       <MDBRow className= 'p-3'>
                           <MDBCol size = '5' className= 'align-items-end'>
                           <img src = {value.imagePath} className='img-fluid rounded-6' height='80'/>
                           <p className= 'font-weight-bold newFont'> {value.name}</p>
                           <p className='textColor totalCount'>Total Count:</p>
                           <p className='biggerFont textColor'><strong>{total[value.name]}</strong></p>
                           </MDBCol>

                               <MDBCol size = '7'>
                                   <MDBListGroup className= 'rowMinWidth point'>
                                       {value.floors.map((floor, key) => (

                                           <MDBListGroupItem
                                               onClick = {()=>{handleSetBuilding(value.name); handleSetFloor(floor.name); handleTitle(floor.name); history.push("/floorPlan");}}
                                               className="justify-content-between align-items-center floorBtn">{"Floor " + floor.name}
                                           </MDBListGroupItem>))
                                       }
                                   </MDBListGroup>
                               </MDBCol>
                       </MDBRow>
                </MDBCol>))}

                </MDBRow>
            </MDBContainer>

            </div>


        ): null

    )


}
export default BuildingList
