import { MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import {useContext, useEffect, useState} from "react";
import {CFAContext} from "../State/Context";
import {useHistory} from "react-router-dom";
// import { WeekData } from '../Assets/test7Day.json'

const BuildingPage = (props) => {
    let history = useHistory()
    const { state: { building, floorName, campusData, room, title }, dispatch } = useContext(CFAContext);
    let [obj, setobj] = useState({})
    // let [weekData, setWeekData] = useState([])
    // let weekDatas =[];
    // let fullWeek = false;
    // // console.log(WeekData)
    
    // async function getData(object) {
    //     let data = await fetch(object, {headers : {
    //         'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //     }}
    //     )
    //     data = await data.json()
    //     return data
    // }
    
    // getData('test7Day.json').then((data) => {
       
    //     console.log(data)
    //     console.log(data.history)
    //     console.log(typeof data.history)
    //     console.log(data.history[0])
    //     console.log(data.history[0].maximum)
    //     console.log(data.history[1].maximum)
    //     weekDatas.Monday = data.history[1].maximum
    //     console.log(weekDatas.Monday)
                    
    // })
                    
    // console.log(weekDatas)
    useEffect(() => {
             setobj(campusData[building][floorName][room])
             dispatch({title: `${title} Details`})
            return history.listen(location => {
                if(history.action === 'POP') {
                    handleBeforeUnload()
                }
            })
        } //get data to pull into the dom
        , [history])
        // console.log(weekDatas)
        console.log(campusData)
    function handleBeforeUnload() {
        dispatch({room: ''})
        dispatch({title: floorName})
    }
    const modifiedCard = (title, data) => {
        if(data && data !== 'NULL') {
            data = Math.ceil(data)
        }
        else
            data = 0
        return (
            <>
                <div className='redBackWhite rounded-6 p-3 mb-3' style = {{maxWidth: 200, minWidth: 110}}>
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
                      {modifiedCard('Daily Average',obj.dayAverage)}
                      {modifiedCard('Daily Total',obj.dailyTally)}
                      {modifiedCard('Current Count',obj.currentCount)}
                  </MDBCol>
                  <MDBCol className='p-2 font-weight-bold center' style = {{marginRight: -125}}>
                      {modifiedCard('Monthly Average',obj.monthAverage)}
                      {modifiedCard('Daily Max',obj.dayMax)}
                      {modifiedCard('Monthly Max',obj.monthMax)}
                  </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className= 'title whiteBackgroundRed biggerFont text-center p-2 mx-auto mt-4'>7 Day Peak Occupancy</div>
            <div className = 'newPad2'>
            <MDBContainer className='mt-3 backgroundColorforMain p-3 rounded-6 over' style = {{minWidth: 1200, maxHeight: 900}}>
                <MDBRow>
                
                  <MDBCol className='d-flex justify-content-around'>{modifiedCard('Sunday',0)}</MDBCol>
                  <MDBCol className='d-flex justify-content-around'>{modifiedCard('Monday',5)}</MDBCol>
                  <MDBCol className='d-flex justify-content-around'>
                    {modifiedCard('Tuesday',1)}
                  </MDBCol> 
                  <MDBCol className='d-flex justify-content-around'>
                    {modifiedCard('Wednesday',3)}
                  </MDBCol>
                  <MDBCol className='d-flex justify-content-around'>
                    {modifiedCard('Thursday',10)}
                  </MDBCol>
                  <MDBCol className='d-flex justify-content-around'>
                    {modifiedCard('Friday',7)}
                  </MDBCol>
                  <MDBCol className='d-flex justify-content-around'>
                    {modifiedCard('Saturday',0)}
                  </MDBCol>
                
                </MDBRow>
           </MDBContainer>
            </div>
        </>

    )


}
export default BuildingPage

