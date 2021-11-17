import { MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import {useContext, useEffect, useState} from "react";
import {CFAContext} from "../State/Context";
import {useHistory} from "react-router-dom";

const BuildingPage = (props) => {
    let history = useHistory()
    const { state: { building, floorName, campusData, room }, dispatch } = useContext(CFAContext);
    let [obj, setobj] = useState({})

    useEffect(() => {
             setobj(campusData[building][floorName][room])
             dispatch({title: `${room} Details`})
            return history.listen(location => {
                if(history.action === 'POP') {
                    handleBeforeUnload()
                }
            })
        } //get data to pull into the dom
        , [history])
    function handleBeforeUnload() {
        dispatch({room: ''})
        dispatch({title: 'Floor Plan'})
    }
    const modifiedCard = (title, data) => {
        if(data && data !== 'NULL') {
            data = Math.ceil(data)
        }
        else
            data = 0
        return (
            <>
                <div className='redBackWhite rounded-6 p-3 mb-3' style = {{maxWidth: 200}}>
                    <div className='d-flex justify-content-center'>
                        <p className= 'font-weight-bold'>{title}</p>
                    </div>
                    <MDBCol className= 'p-3' style = {{textAlign: 'center', fontWeight: 'bold'}}>
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
        <>
            <MDBContainer center = 'true' className='mt-3 newPad backgroundColorforMain p-3 rounded-6 over' style = {{maxWidth: 700, maxHeight: 900}} >
                <MDBRow center>
                  <MDBCol className= 'p-2 font-weight-bold' style = {{marginLeft: 40}}>
                      {modifiedCard('Day Average',obj.dayAverage)}
                      {modifiedCard('Day Total',obj.dailyTally)}
                      {modifiedCard('Current Count',obj.currentCount)}
                  </MDBCol>
                  <MDBCol className='p-2 font-weight-bold center' style = {{marginRight: -125}}>
                      {modifiedCard('Monthly Average',obj.monthAverage)}
                      {modifiedCard('Daily Max',obj.dayMax)}
                      {modifiedCard('Monthly Max',obj.monthMax)}
                  </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className= 'title whiteBackgroundRed biggerFont text-center p-2 mx-auto mt-4'>7 Day Averages</div>
            <MDBContainer center = 'true' className='mt-3 newPad backgroundColorforMain p-3 rounded-6 over' style = {{maxWidth: 1200, maxHeight: 900}}>
                <MDBRow className='d-flex justify-content-around'>
                    {modifiedCard('Sunday',obj.dayAverage)}
                    {modifiedCard('Monday',obj.dayAverage)}
                </MDBRow>
                <MDBRow className='d-flex justify-content-around'>
                    {modifiedCard('Tuesday',obj.dayAverage)}
                    {modifiedCard('Wednesday',obj.dayAverage)}
                    {modifiedCard('Thursday',obj.dayAverage)}
                </MDBRow>
                <MDBRow className='d-flex justify-content-around'>
                    {modifiedCard('Friday',obj.dayAverage)}
                    {modifiedCard('Saturday',obj.dayAverage)}
                </MDBRow> 
            </MDBContainer>
        </>

    )


}
export default BuildingPage

