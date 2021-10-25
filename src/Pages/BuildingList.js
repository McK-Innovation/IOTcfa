import {
    MDBCol,
    MDBContainer, MDBIcon,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow
} from "mdb-react-ui-kit";
import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router";
import {CFAContext} from "../State/Context";
import exampleData from "../Assets/OakmontA.json";
import image from "../Assets/OakmontA.JPG";
import mqtt from 'mqtt'


const BuildingList = (props) => {
    let tt = {}
    let totalCampus = {}
    let history = useHistory();
    const { state: { building, floorName, campusData, title }, dispatch } = useContext(CFAContext);
    let [input, setInput] =useState('')
    let [loading, setLoading] = useState(false)
    let [shift, setShift] = useState(false)
    const [room, setRoom] = useState('')
    let [total, setTotal] = useState({})

    let [buildingArray, setArray] = useState( [
        {images: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg', imagePath: '../Assets/OakmontA.jpg',
        name: 'oakmontA', floors: [{name: "1", path: 'OakmontA.json', info: {}}, ], buildingInformation: {} },
        {images: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg', imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'oakmontB', floors: [{name: "1", path: 'OakmontB.json', info: {}}, ], buildingInformation: {} },
        {images: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg', imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'MainNorth',
            floors: [
                {name: "1", path: 'OakmontB.json', info: {}},
                {name: "2", path: 'OakmontB.json', info: {}},
                {name: "3", path: 'OakmontB.json', info: {}},
                {name: "4", path: 'OakmontB.json', info: {}},
                {name: "5", path: 'OakmontB.json', info: {}}], buildingInformation: {} },
        {images: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg', imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'MainSouth', floors: [
                {name: "2", path: 'OakmontB.json', info: {}},
                {name: "3", path: 'OakmontB.json', info: {}},
                {name: "4", path: 'OakmontB.json', info: {}},
                {name: "5", path: 'OakmontB.json', info: {}},
            ], buildingInformation: {} },
        {images: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg', imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'PonceA', floors: [{name: "1", path: 'OakmontB.json', info: {}}, ], buildingInformation: {} },
        {images: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg', imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'PonceB', floors: [{name: "1", path: 'OakmontB.json', info: {}}, ], buildingInformation: {} },
        {images: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg', imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'Lincoln100', floors: [{name: "1", path: 'OakmontB.json', info: {}}, ], buildingInformation: {} },
        {images: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg', imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'Lincoln200', floors: [{name: "1", path: 'OakmontB.json', info: {}}, ], buildingInformation: {} },
        {images: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg', imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'Lincoln300', floors: [{name: "1", path: 'OakmontB.json', info: {}}, ], buildingInformation: {} },
        {images: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg', imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'ITDeckA', floors: [{name: "1", path: 'OakmontB.json', info: {}}, ], buildingInformation: {} },
        {images: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg', imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'ITDeckB', floors: [{name: "1", path: 'OakmontB.json', info: {}}, ], buildingInformation: {} },
        {images: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg', imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'ITDeckC', floors: [{name: "1", path: 'OakmontB.json', info: {}}, ], buildingInformation: {} },
        {images: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg', imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'ITDeckD', floors: [{name: "1", path: 'OakmontB.json', info: {}}, ], buildingInformation: {} }
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

    const handleShift = () =>{
        //need button to handle back for now
      setShift((prev)=>(!prev))
    }

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
    // normally set the exact floorplan into the landing
    //splashscreen
    useEffect( () => {
        let totalOnCampus
        buildingArray.forEach(val => {
            val.floors.forEach(floorVal => {
                getData(floorVal.path).then((data)=>{
                    console.log(data)
                    let keys = Object.keys(data);
                    console.log(keys)
                    let name = val.name //building name
                    console.log(name)
                    let full = keys[2]
                    let fullData = data[full]
                    console.log(fullData)
                    let roomsInBuilding = {}
                    let tot = 0
                    for(let x in fullData) {
                        let area = fullData[x].area
                        let key = fullData[x]
                        let valueArray = {
                            'dailyTally': key.dailyTally,
                            'currentCount' : key.currentCount,
                            'dayAverage': key.dayAverage,
                            'dayMax': key.dayMax,
                            'monthAverage': key.monthAverage,
                            'monthMax': key.monthMax
                        }
                        roomsInBuilding[area] = valueArray
                    }
                    console.log(roomsInBuilding)
                    totalCampus[name] = roomsInBuilding //this will be multiple so i need a loop
                    dispatch({campusData: totalCampus })
                    console.log(totalCampus)
                    setArray(buildingArray.map((value) => {
                        if(totalCampus.hasOwnProperty(value.name)) {
                            return {...value, buildingInformation: totalCampus[value.name]}
                        }
                        else
                            return value
                    }))
                    for(let room in roomsInBuilding) {
                        console.log(roomsInBuilding[room].currentCount)
                        tot += roomsInBuilding[room].currentCount
                    }
                    tt[name] = tot
                    setTotal(tt)

                    // Total here
                    // {oakmont: {one: {max, min, etc}, two: {max, min, etc}, }

                })// access floorval.path and use the mktt to get the each file


            })

        })// add a condition to check every file with mqtt and also check the floors to add everythign to the right floor

        } //get data to pull into the dom
    , [])

    useEffect(() => {
        console.log(total)
    }, [total]);

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
                                               className="d-flex justify-content-between align-items-center">{"Floor " + floor.name}
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
