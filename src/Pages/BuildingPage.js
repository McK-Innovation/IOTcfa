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
            setobj(campusData[building][room])
            console.log(obj)
        } //get data to pull into the dom
        , [])

    const modifiedCard = (title, data) => {

        return(
            <></>
        )
    }


    // current number of people, most in the day, peak day in month, peak time, occupancy alert, day average, monthly average, graph
    return (

            <MDBContainer center className='mt-3 newPad widthModify4 backgroundColorforMain p-3 rounded-6 over' >
                <MDBRow center>
                  <MDBCol className= 'fullHeight p-3 center'>


                      <MDBRow className= 'p-3 font-weight-bold'>
                          <div className='redBackWhite rounded-6 p-3'>

                              <MDBCol className= 'p-3'>
                                  <div>
                                      <img src = {chart} width= '500' height= '300'/>
                                  </div>
                              </MDBCol>
                          </div>
                      </MDBRow>


                  </MDBCol>
                  <MDBCol className= 'p-3 font-weight-bold center' >
                      <div className='redBackWhite rounded-6 p-3 mb-3'>
                          <div>
                              <p className= 'font-weight-bold'>{room}</p>
                          </div>
                          <MDBCol className= 'p-3'>
                              <div>
                                  <p className= 'biggerFont'>{obj.currentCount}</p>
                              </div>
                          </MDBCol>
                      </div>
                      <div className='redBackWhite rounded-6 p-3'>
                          <div>
                              <p className= 'font-weight-bold'>Day Average</p>
                          </div>
                          <MDBCol className= 'p-3'>
                              <div>
                                  <p className= 'biggerFont'>{obj.dayAverage}</p>
                              </div>
                          </MDBCol>
                      </div>

                  </MDBCol>
                  <MDBCol className='p-3 font-weight-bold center'>
                      <div className='redBackWhite rounded-6 p-3 mb-3'>
                          <div>
                              <p className= 'font-weight-bold'>Monthly Average</p>
                          </div>
                          <MDBCol className= 'p-3'>
                              <div>
                                  <p className= 'biggerFont'>{obj.monthAverage}</p>
                              </div>
                          </MDBCol>
                      </div>

                      <div className='redBackWhite rounded-6 p-3'>
                          <div>
                              <p className= 'font-weight-bold'>Daily Max</p>
                          </div>
                          <MDBCol className= 'p-3'>
                              <div>
                                  <p className= 'biggerFont'>{obj.dayMax}</p>
                              </div>
                          </MDBCol>
                      </div>
                      <div className='redBackWhite rounded-6 p-3 mt-3'>
                          <div>
                              <p className= 'font-weight-bold'>Monthly Max</p>
                          </div>
                          <MDBCol className= 'p-3'>
                              <div>
                                  <p className= 'biggerFont'>{obj.monthMax}</p>
                              </div>
                          </MDBCol>
                      </div>


                  </MDBCol>
                </MDBRow>

                {/*<MDBBtn onClick={()=>(props.setRoom(false))} size="lg" floating color= 'danger'>*/}
                {/*    <MDBIcon icon="angle-left" />*/}
                {/*</MDBBtn>*/}
            </MDBContainer>


    )


}
export default BuildingPage
