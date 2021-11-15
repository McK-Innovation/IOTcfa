import {
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow
} from "mdb-react-ui-kit";
import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router";
import {CFAContext} from "../State/Context";
import image from "../Assets/OakmontA.JPG";
import mqtt from 'mqtt'

const BuildingList = () => {
    //there needs to be a function that uses switch or if statements to determine which require('path')
    // to use since require doesnt use variables directly
    let tt = {}
    let totalCampus = {}
    let history = useHistory();
    const { state: {}, dispatch } = useContext(CFAContext);
    let [input, setInput] =useState('')
    let [loading, setLoading] = useState(false)
    let [shift, setShift] = useState(false)
    let [total, setTotal] = useState({})
    //array of building objects here. Path is the path to the route for mqtt
    let [buildingArray, setArray] = useState( [
        {imagePath: '../Assets/OakmontA.jpg',
        name: 'oakmontA', floors: [{name: "1", path: 'OakmontA.json'}, ], buildingInformation: {} },
        {imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'oakmontB', floors: [{name: "1", path: 'OakmontB.json'}, ], buildingInformation: {} },
        {imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'MainNorth',
            floors: [
                {name: "1", path: 'OakmontB.json'},
                {name: "2", path: 'OakmontB.json'},
                {name: "3", path: 'OakmontB.json'},
                {name: "4", path: 'OakmontB.json'},
                {name: "5", path: 'OakmontB.json'}], buildingInformation: {} },
        {imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'MainSouth', floors: [
                {name: "Terrace", path: 'OakmontB.json',},
                {name: "Dining", path: 'OakmontB.json',},
                {name: "2", path: 'OakmontB.json',},
                {name: "3", path: 'OakmontB.json',},
                {name: "4", path: 'OakmontB.json',},
                {name: "5", path: 'OakmontB.json',},
            ], buildingInformation: {} },
        {imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'PonceA', floors: [{name: "1", path: 'OakmontB.json',}, ], buildingInformation: {} },
        {imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'PonceB', floors: [{name: "1", path: 'OakmontB.json',}, ], buildingInformation: {} },
        {imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'Lincoln100', floors: [{name: "1", path: 'Lincoln100.json',}, ], buildingInformation: {} },
        {imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'Lincoln200', floors: [{name: "1", path: 'Lincoln200.json',}, ], buildingInformation: {} },
        {imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'Lincoln300', floors: [{name: "1", path: 'Lincoln300.json',}, ], buildingInformation: {} },
        {imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
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
   const client = mqtt.connect("ws://localhost:1884/", options)
   client.subscribe('CFA_IOT/OakmontA')
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
                    totalCampus[name] = {}
                    totalCampus[name][floorName] = roomsInBuilding //place the floor number (string) as a nested object with the value of the rooms object
                    dispatch({campusData: totalCampus }) //add this to the global context
                    console.log(totalCampus) //can be deleted when done with testing

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
                        tot += roomsInBuilding[room].currentCount
                    }
                    tt[name] = tot
                    setTotal(tt)
                })
            })
        })
        }
    , [])
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
                           <MDBCol size = '6' className= 'align-items-end'>
                           <img src = {image} className='img-fluid rounded-6' height='80'/>
                           <p className= 'font-weight-bold newFont'> {value.name}</p>
                           <p className='biggerFont textColor'><strong>{total[value.name]}</strong></p>
                           </MDBCol>

                               <MDBCol size = '6'>
                                   <MDBListGroup className= 'rowMinWidth point'>
                                       {value.floors.map((floor, key) => (

                                           <MDBListGroupItem
                                               onClick = {()=>{handleSetBuilding(value.name); handleSetFloor(floor.name); handleTitle('Floor Plan'); history.push("/floorPlan");}}
                                               className="d-flex justify-content-between align-items-center floorBtn">{"Floor " + floor.name}
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
