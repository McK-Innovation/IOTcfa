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
import exampleData from "../Assets/OakmontAExample.json";



const BuildingList = (props) => {
    let history = useHistory();
    const { state: { building, floorName, campusData }, dispatch } = useContext(CFAContext);
    let [input, setInput] =useState('')
    let [loading, setLoading] = useState(false)
    let [shift, setShift] = useState(false)
    const [room, setRoom] = useState('')
    let [total, setTotal] = useState(0)
    let [buildingArray, setArray] = useState( [
        {images: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
        name: 'oakmontA', floors: [{name: "1", path: 'OakmontAExample.json', info: {}}, ], buildingInformation: {} }
    ])

    // building A: floor 1, floor2
    // two files: file1, file2
    // path: floor1/files1, floor2/file2

    const handleShift = () =>{
        //need button to handle back for now
      setShift((prev)=>(!prev))
    }

    const handleSetBuilding = (building) =>{
        dispatch({building: building})
    }
    const handleSetFloor = (floor) =>{
        dispatch({floorName: floor})
    }
    // normally set the exact floorplan into the landing

    //splashscreen
    useEffect(() => {
        buildingArray.map(val => {
            val.floors.map(floorVal => {
                let data = exampleData // access floorval.path and use the mktt to get the each file
                console.log(data)
                let keys = Object.keys(data);
                console.log(keys)
                let name = keys[1] //building name
                console.log(name)
                let full = keys[2]
                let fullData = data[full]
                console.log(fullData)
                let totalCampus = {}
                let roomsInBuilding = {}
                let total = 0
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
                setArray(buildingArray.map((value) => {
                    // value.floors.map((updateFloor=>{
                    //     if()
                    // }))

                    if(totalCampus.hasOwnProperty(value.name)) {
                        return {...value, buildingInformation: totalCampus[value.name]}
                    }
                    else
                        return value
                }))
                for(let room in roomsInBuilding) {
                    console.log(roomsInBuilding[room].currentCount)
                    total += roomsInBuilding[room].currentCount
                }
                setTotal(total)

            // {oakmont: {one: {max, min, etc}, two: {max, min, etc}, }


            })

        })// add a condition to check every file with mqtt and also check the floors to add everythign to the right floor

        } //get data to pull into the dom
    , [])

    return (
        !loading ? (
            <div className= 'backgroundColorforMain rounded-6'>
            <MDBContainer fluid className= 'rounded-6 mt-3 mr-5 p-3 widthModify3  rounded-6'>
                <MDBRow start className='text-center'>
                    <div className='input-group'>
                        <MDBCol size= '1' className= 'mt-3'><MDBIcon fas icon="search" color= 'danger'/></MDBCol>
                        <MDBCol size='11' className='mb-3'>

                            <MDBInput type='text'
                                      onChange={(e) => {
                                          setInput(e.target.value)
                                      }}
                                      value={input}
                                      placeholder = 'Enter Building Name'
                                      className='borderChange '>


                            </MDBInput>
                        </MDBCol>

                    </div>
                </MDBRow>
            </MDBContainer>

            <MDBContainer className='backgroundColorforMain rounded-6 mt-3 p-3 widthModify2 newPad over'>
                <MDBRow >
                {buildingArray.filter((item)=>item.name.toLowerCase().includes(input.toLowerCase())).map((value, key)=>(
                    <MDBCol size = '12' key = {value.name} className="justify-content-center backgroundColorforMain rounded-6 minWidthC center m-1 ">
                       <MDBRow className= 'p-3'>
                           <MDBCol size = '4' className= 'align-items-end'>
                           <img src = {value.images} className='img-fluid rounded-6' height='80'/>
                           <p className= 'font-weight-bold newFont'> {value.name}</p>
                           <p className='biggerFont textColor'><strong>{total}</strong></p>
                           </MDBCol>

                               <MDBCol size = '8'>
                                   <MDBListGroup className= 'rowMinWidth point'>
                                       {value.floors.map((floor, key) => (

                                           <MDBListGroupItem
                                               onClick = {()=>{handleSetBuilding(value.name); handleSetFloor(floor.name); history.push("/floorPlan");}}
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
