import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBListGroupItem, MDBRow} from "mdb-react-ui-kit";
import {useContext, useEffect, useState} from "react";
import chart from '../Assets/occupancy2.png'
import {CFAContext} from "../State/Context";


const BuildingPage = (props) => {
    let [input, setInput] =useState('')
    let [loading, setLoading] = useState(false)
    const { state: { building, floorName, campusData, room }, dispatch } = useContext(CFAContext);
    //splashscreen
    let [obj, setobj] = useState({})
    useEffect(() => {
            console.log(campusData.restAPI[room])
            setobj(campusData['restAPI'][room])
            console.log(obj)
        } //get data to pull into the dom
        , [])

    const modifiedCard = (title, data) => {
        if(data && data !== 'NULL') {
            data = Math.ceil(data)
        }
        else
            data = 0
        return (
            <>
                <div className='redBackWhite rounded-6 p-3 mb-3'>
                    <div>
                        <p className= 'font-weight-bold'>{title}</p>
                    </div>
                    <MDBCol className= 'p-3'>
                        <div>
                            <p className= 'biggerFont'>{data}</p>
                        </div>
                    </MDBCol>
                </div>
            </>
        )
    }


    // current number of people, most in the day, peak day in month, peak time, occupancy alert, day average, monthly average, graph
    return (

            <MDBContainer center = 'true' className='mt-3 newPad widthModify4 backgroundColorforMain p-3 rounded-6 over' >
                <MDBRow center = 'true'>

                  <MDBCol className= 'p-3 font-weight-bold center' >

                      {modifiedCard('Day Average',obj.dayAverage)}
                      {modifiedCard('Day Total',obj.dailyTally)}
                      {modifiedCard('Current Count',obj.currentCount)}


                  </MDBCol>
                  <MDBCol className='p-3 font-weight-bold center'>
                      {modifiedCard('Monthly Average',obj.monthAverage)}
                      {modifiedCard('Daily Max',obj.dayMax)}
                      {modifiedCard('Monthly Max',obj.monthMax)}


                  </MDBCol>
                </MDBRow>

                {/*<MDBBtn onClick={()=>(props.setRoom(false))} size="lg" floating color= 'danger'>*/}
                {/*    <MDBIcon icon="angle-left" />*/}
                {/*</MDBBtn>*/}
            </MDBContainer>


    )


}
export default BuildingPage
