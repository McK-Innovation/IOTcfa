import { MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import {useContext, useEffect, useState} from "react";
import {CFAContext} from "../State/Context";
import {useHistory} from "react-router-dom";
import mqtt from 'mqtt'

// import { WeekData } from '../Assets/test7Day.json'

const BuildingPage = (props) => {
    let history = useHistory()
    let result
    const { state: {
         building, 
         floorName, 
         campusData,
         campusHistoryData,
         room, 
         title, 
         Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday}, dispatch } = useContext(CFAContext);
    let [obj, setobj] = useState({})
    let [histArr, setHist] = useState([])
    console.log(campusHistoryData)
    // const options = {
    //     protocol: 'ws',
    //     clientId: 342900,
    
    //    }

    // useEffect(() => {
    //     console.log("Hello")
    //     let client = mqtt.connect("ws://10.9.9.210:9001/mqtt", options)
    //     client.subscribe('CFA_IOT/OakmontA/History')
    //     client.on('message', function(topic, message){
    //         console.log("Hello")
    //         console.log(topic);
    //         console.log(message);
    //     })
    // }, [])

    let arrayManage = array => {
        console.log(array)
        if(array == undefined) {
            result = [0, 0, 0, 0, 0, 0, 0, 0]
        } else {
        result = array.map(a => a.maximum)
        // console.log(result)
        }
    }
    
    useEffect(() => {
             setobj(campusData[building][floorName][room])
             setHist(campusHistoryData[building][floorName][room])
             dispatch({title: `${title} Details`})
            return history.listen(location => {
                if(history.action === 'POP') {
                    handleBeforeUnload()
                }
            })
        } //get data to pull into the dom
        , [history])
        // console.log(weekDatas)
        // console.log(Sunday)
        // console.log(typeof Sunday)
        // console.log(campusData)
        // console.log(campusHistoryData)
        // console.log(histArr)
        // console.log(histArr[0])
        // console.log(typeof histArr[0])
        arrayManage(histArr)
        // console.log(hi)
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
                
                  <MDBCol className='d-flex justify-content-around'>{modifiedCard('Sunday',result[0])}</MDBCol>
                  <MDBCol className='d-flex justify-content-around'>{modifiedCard('Monday',result[1])}</MDBCol>
                  <MDBCol className='d-flex justify-content-around'>
                    {modifiedCard('Tuesday',result[2])}
                  </MDBCol> 
                  <MDBCol className='d-flex justify-content-around'>
                    {modifiedCard('Wednesday',result[3])}
                  </MDBCol>
                  <MDBCol className='d-flex justify-content-around'>
                    {modifiedCard('Thursday', result[4])}
                  </MDBCol>
                  <MDBCol className='d-flex justify-content-around'>
                    {modifiedCard('Friday',result[5])}
                  </MDBCol>
                  <MDBCol className='d-flex justify-content-around'>
                    {modifiedCard('Saturday', result[6])}
                  </MDBCol>
                
                </MDBRow>
           </MDBContainer>
            </div>
        </>

    )


}
export default BuildingPage

