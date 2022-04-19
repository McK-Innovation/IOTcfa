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
import { resolve } from "patch-package/dist/path";

const BuildingList = () => {
    //there needs to be a function that uses switch or if statements to determine which require('path')
    // to use since require doesnt use variables directly
    let historyData
    let h = 0
    let i = 0
    let client
    let tt = {}
    let ttl = 0
    let totalCampusHistory = {}
    let totalCampus = {}
    let history = useHistory();
    const { state: {}, dispatch } = useContext(CFAContext);
    let [input, setInput] =useState('')
    let [loading, setLoading] = useState(false)
    let [shift, setShift] = useState(false)
    let [total, setTotal] = useState({})
    let [execute, setExecute] = useState(false)
    let finalName = ''
    let newName = ''
    // let [cTotal, setCTotal] = useState(0);
    //array of building objects here. Path is the path to the route for mqtt
    let [buildingArray, setArray] = useState( [
        {imagePath: mOakA,
            name: 'OakmontA',
            floors: [
                {name: "Floor North", path: 'CFA_IOT/OakmontA', path2: 'CFA_IOT/OakmontA_History'},
                {name: "Floor Middle", path: 'CFA_IOT/OakmontA', path2: 'CFA_IOT/OakmontA_History'},
                {name: "Floor South", path: 'CFA_IOT/OakmontA', path2: 'CFA_IOT/OakmontA_History'},
            ], buildingInformation: {} },
        {imagePath: mOakB,
            name: 'OakmontB', 
            floors: [
                {name: "Floor North", path: 'CFA_IOT/OakmontB', path2: 'CFA_IOT/OakmontB_History'},
                {name: "Floor Middle", path: 'CFA_IOT/OakmontB', path2: 'CFA_IOT/OakmontB_History'},
                {name: "Floor South", path: 'CFA_IOT/OakmontB', path2: 'CFA_IOT/OakmontB_History'},
            ], buildingInformation: {} },
        {imagePath: mMainN,
            name: 'MainNorth',
            floors: [
                {name: "Fitness Lower", path: 'CFA_IOT/Main', path2: 'CFA_IOT/Main_History'},
                {name: "Fitness", path: 'CFA_IOT/Main', path2: 'CFA_IOT/Main_History'},
                {name: "Floor 1", path: 'CFA_IOT/Main', path2: 'CFA_IOT/Main_History'},
                {name: "Floor 2", path: 'CFA_IOT/Main', path2: 'CFA_IOT/Main_History'},
                {name: "Floor 3", path: 'CFA_IOT/Main', path2: 'CFA_IOT/Main_History'},
                {name: "Floor 4", path: 'CFA_IOT/Main', path2: 'CFA_IOT/Main_History'},
                {name: "Floor 5", path: 'CFA_IOT/Main', path2: 'CFA_IOT/Main_History'}
            ], buildingInformation: {} },
        {imagePath: mMainS,
            name: 'MainSouth', floors: [
                {name: "Terrace", path: 'CFA_IOT/Main', path2: 'CFA_IOT/Main_History'},
                {name: "Dining", path: 'CFA_IOT/Main', path2: 'CFA_IOT/Main_History'},
                {name: "Floor 1", path: 'CFA_IOT/Main', path2: 'CFA_IOT/Main_History'},
                {name: "Floor 2", path: 'CFA_IOT/Main', path2: 'CFA_IOT/Main_History'},
                {name: "Floor 3", path: 'CFA_IOT/Main', path2: 'CFA_IOT/Main_History'},
                {name: "Floor 4", path: 'CFA_IOT/Main', path2: 'CFA_IOT/Main_History'},
                {name: "Floor 5", path: 'CFA_IOT/Main', path2: 'CFA_IOT/Main_History'},
            ], buildingInformation: {} },
        {imagePath: 'https://blueandgoldnewspaper.com/wp-content/uploads/2017/09/DSC08876.jpg',
            name: 'Ponce', floors: [
                {name: "Floor A", path: 'CFA_IOT/Ponce', path2: 'CFA_IOT/Ponce_History'},
                {name: "Floor B", path: 'CFA_IOT/Ponce', path2: 'CFA_IOT/Ponce_History'},  
            ], buildingInformation: {} },
        {imagePath: mLincoln1,
            name: 'Lincoln100', floors: [
                {name: "Floor East", path:'CFA_IOT/Lincoln_100', path2: 'CFA_IOT/Lincoln_100_History'},
                {name: "Floor Middle", path:'CFA_IOT/Lincoln_100', path2: 'CFA_IOT/Lincoln_100_History'}, 
                {name: "Floor FIC", path:'CFA_IOT/Lincoln_100', path2: 'CFA_IOT/Lincoln_100_History'}, 
            ], buildingInformation: {} },
        {imagePath: mLincoln2,
            name: 'Lincoln200', floors: [
                {name: "Floor East", path:'CFA_IOT/Lincoln_200', path2: 'CFA_IOT/Lincoln_200_History'},
                {name: "Floor Middle", path:'CFA_IOT/Lincoln_200', path2: 'CFA_IOT/Lincoln_200_History'},
                {name: "Floor West", path:'CFA_IOT/Lincoln_200', path2: 'CFA_IOT/Lincoln_200_History'},
            ], buildingInformation: {} },
        {imagePath: mLincoln3,
            name: 'Lincoln300', floors: [
                {name: "Floor East", path:'CFA_IOT/Lincoln_300', path2: 'CFA_IOT/Lincoln_300_History'}, 
                {name: "Floor West", path:'CFA_IOT/Lincoln_300', path2: 'CFA_IOT/Lincoln_300_History'},
            ], buildingInformation: {} },
        {imagePath: mITDeck,
            name: 'ITDeck', floors: [
                {name: "Floor North", path:'CFA_IOT/IT_Deck', path2: 'CFA_IOT/IT_Deck_History'},
                {name: "Floor East", path:'CFA_IOT/IT_Deck', path2: 'CFA_IOT/IT_Deck_History'},
                {name: "Floor South", path:'CFA_IOT/IT_Deck', path2: 'CFA_IOT/IT_Deck_History'},
                {name: "Floor West", path:'CFA_IOT/IT_Deck', path2: 'CFA_IOT/IT_Deck_History'},
            ], buildingInformation: {} },
    ])

    const options = {
    protocol: 'ws',
    clientId: 342900,

   }

//    const client = mqtt.connect("ws://localhost:1883/", options)
//    client.subscribe('CFA_IOT/OakmontA')

async function getHistoryData(path){
    let message
    return new Promise((resolve, reject) => {
        client.subscribe(path)
        client.on('message', function(topic, message) {
            // console.log(topic)
            // console.log(path)
            if (topic != path){
                // console.log("NOT EQUAL")
                client.unsubscribe(path)
                client.subscribe(path)
            } else if (topic === path) {
                // console.log("EQUAL")
                // console.log("WE DID IT")
                let message2 = message.toString()
                let message3 = message2.replace(/(\}]})/g, "}]},")
                message3 = "{\"data\":[" + message3 + "{}]}"
                // console.log(message3)
                var o = JSON.parse(message3);
                return resolve(o);
            }
        });
    }); 
}

//    useEffect(
//        () => {
//         console.log("called")
//         client = mqtt.connect("ws://10.9.9.210:9001/mqtt", options)
//         // client.on('connect', function() {
//         //     console.log('Connected')
//         //     client.subscribe('CFA_IOT/Lincoln_100/History')
//         // })
//         // client.on("error", function(error) {
//         //      console.log("Can't connect"+error)
//         //     });
//         client.subscribe('CFA_IOT/Lincoln_100History')
//         client.on('message', function(topic, message){
//             console.log("HERE")
//             let message2 = message.toString()
//             let message3 = message2.replace(/(\}]})/g, "}]},")
//             message3 = "{\"data\":[" + message3 + "{}]}"
//             console.log(message3)
// // remove non-printable and other non-valid JSON chars
//             var o = JSON.parse(message3);
//             console.log(o)
//             console.log(topic);
//         })
        
//     }, []
//     )



    useEffect(() => {
        client = mqtt.connect("ws://10.9.9.210:9001/mqtt", options);
        buildingArray.forEach(val => {
            totalCampusHistory[val.name] = {}
            val.floors.forEach(floorVal => {
            
                getHistoryData(floorVal.path2).then((data) => {
                    data.data.pop()
                    // console.log(data.data)
                    let bldgName = val.name;
                    let floorName = floorVal.name
                    let roomsInBuilding = {}
                    let result = name.includes("Count_Zn1")
                    data.data.map(room => {
                        let name = Object.keys(room)[0]
                        let history = room.history
                        // console.log(history)
                        
                        // let newName = name.slice(2)
                        // console.log(val.name)
                        function mainNorthQueryFix() {
                            switch (floorName){
                                case 'Fitness Lower':
                                    result = name.includes("Count_Zn1")
                                    if(result) {
                                        newName = name.replace(`drivers/RestAPI/Main/North/Fitness/LowerLevel/`, '')
                                        finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                    } else {
                                        newName = name.replace(`drivers/RestAPI/Main/North/Fitness/LowerLevel/`, '')
                                        finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                    }
                                    break;
                                case 'Fitness':
                                    result = name.includes("Count_Zn1")
                                    if(result) {
                                        newName = name.replace(`drivers/RestAPI/Main/North/Fitness/`, '')
                                        finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                    } else {
                                        newName = name.replace(`drivers/RestAPI/Main/North/Fitness/`, '')
                                        finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                    }
                                    break;
                                case 'Floor 1':
                                    result = name.includes("Count_Zn1")
                                    if(result) {
                                        newName = name.replace(`drivers/RestAPI/Main/North/FL_1/`, '')
                                        finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                    } else {
                                        newName = name.replace(`drivers/RestAPI/Main/North/FL_1/`, '')
                                        finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                    }
                                    break;
                                case 'Floor 2':
                                    result = name.includes("Count_Zn1")
                                    if(result) {
                                        newName = name.replace(`drivers/RestAPI/Main/North/FL_2/`, '')
                                        finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                    } else {
                                        newName = name.replace(`drivers/RestAPI/Main/North/FL_2/`, '')
                                        finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                    }
                                    break;
                                case 'Floor 3':
                                    result = name.includes("Count_Zn1")
                                    if(result) {
                                        newName = name.replace(`drivers/RestAPI/Main/North/FL_3/`, '')
                                        finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                    } else {
                                        newName = name.replace(`drivers/RestAPI/Main/North/FL_3/`, '')
                                        finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                    }
                                    break;
                                case 'Floor 4':
                                    result = name.includes("Count_Zn1")
                                    if(result) {
                                        newName = name.replace(`drivers/RestAPI/Main/North/FL_4/`, '')
                                        finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                    } else {
                                        newName = name.replace(`drivers/RestAPI/Main/North/FL_4/`, '')
                                        finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                    }
                                    break;
                                case 'Floor 5':
                                    result = name.includes("Count_Zn1")
                                    if(result) {
                                        newName = name.replace(`drivers/RestAPI/Main/North/FL_5/`, '')
                                        finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                    } else {
                                        newName = name.replace(`drivers/RestAPI/Main/North/FL_5/`, '')
                                        finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                    }
                                    break; 
                                default:
                                    newName = name.replace(`drivers/RestAPI/Main/North/${floorName}/`, '')
                                    finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                            }
                        }

                        function mainSouthQueryFix()  {
                            switch (floorName){
                                case 'Terrace':
                                    result = name.includes("Count_Zn1")
                                    if(result) {
                                        newName = name.replace(`drivers/RestAPI/Main/South/Terrace/`, '')
                                        finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                    } else {
                                        newName = name.replace(`drivers/RestAPI/Main/South/Terrace/`, '')
                                        finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                    }
                                    break;
                                case 'Dining':
                                    result = name.includes("Count_Zn1")
                                    if(result) {
                                        newName = name.replace(`drivers/RestAPI/Main/South/Dining/`, '')
                                        finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                    } else {
                                        newName = name.replace(`drivers/RestAPI/Main/South/Dining/`, '')
                                        finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                    }
                                    break;
                                case 'Floor 1':
                                    result = name.includes("Count_Zn1")
                                    if(result) {
                                        newName = name.replace(`drivers/RestAPI/Main/South/FL_1/`, '')
                                        finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                    } else {
                                        newName = name.replace(`drivers/RestAPI/Main/South/FL_1/`, '')
                                        finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                    }
                                    break;
                                case 'Floor 2':
                                    result = name.includes("Count_Zn1")
                                    if(result) {
                                        newName = name.replace(`drivers/RestAPI/Main/South/FL_2/`, '')
                                        finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                    } else {
                                        newName = name.replace(`drivers/RestAPI/Main/South/FL_2/`, '')
                                        finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                    }
                                    break;
                                case 'Floor 3':
                                    result = name.includes("Count_Zn1")
                                    if(result) {
                                        newName = name.replace(`drivers/RestAPI/Main/South/FL_3/`, '')
                                        finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                    } else {
                                        newName = name.replace(`drivers/RestAPI/Main/South/FL_3/`, '')
                                        finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                    }
                                    break;
                                case 'Floor 4':
                                    result = name.includes("Count_Zn1")
                                    if(result) {
                                        newName = name.replace(`drivers/RestAPI/Main/South/FL_4/`, '')
                                        finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                    } else {
                                        newName = name.replace(`drivers/RestAPI/Main/South/FL_4/`, '')
                                        finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                    }
                                    break;
                                case 'Floor 5':
                                    result = name.includes("Count_Zn1")
                                    if(result) {
                                        newName = name.replace(`drivers/RestAPI/Main/South/FL_5/`, '')
                                        finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                    } else {
                                        newName = name.replace(`drivers/RestAPI/Main/South/FL_5/`, '')
                                        finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                    }
                                    break; 
                                default:
                                    newName = name.replace(`drivers/RestAPI/Main/South/${floorName}/`, '')
                                    finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                            }
                        }


                        switch (bldgName) {
                            case 'Lincoln100':
                                result = name.includes("Count_Zn1")
                                if(result) {
                                    newName = name.replace(`drivers/RestAPI/Lincoln_100/`, '')
                                    finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                } else {
                                    newName = name.replace(`drivers/RestAPI/Lincoln_100/`, '')
                                    finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                }
                                break;
                            case 'Lincoln200':
                                result = name.includes("Count_Zn1")
                                if(result) {
                                    newName = name.replace(`drivers/RestAPI/Lincoln_200/`, '')
                                    finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                } else {
                                    newName = name.replace(`drivers/RestAPI/Lincoln_200/`, '')
                                    finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                }
                                break;
                            case 'Lincoln300':
                                result = name.includes("Count_Zn1")
                                if(result) {
                                    newName = name.replace(`drivers/RestAPI/Lincoln_300/`, '')
                                    finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                } else {
                                    newName = name.replace(`drivers/RestAPI/Lincoln_300/`, '')
                                    finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                }
                                break;
                            case 'ITDeck':
                                result = name.includes("Count_Zn1")
                                if(result) {
                                    newName = name.replace(`drivers/RestAPI/IT_Deck/`, '')
                                    finalName = newName.replace('/Count_Zn1/NumericCov/historyConfig/id', '')
                                } else {
                                    newName = name.replace(`drivers/RestAPI/IT_Deck/`, '')
                                    finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                                }
                                break;
                            case 'MainNorth':
                                mainNorthQueryFix()
                                break;
                            case 'MainSouth':
                                mainSouthQueryFix()
                                break;
                            default:
                                newName = name.replace(`drivers/RestAPI/${bldgName}/`, '')
                                finalName = newName.replace('/Count/NumericCov/historyConfig/id', '')
                        }
                        // let newName = name.replace(`drivers/RestAPI/Lincoln_100/`, '')
                        // let finalName = newName.replace('/Count/NumericCov/historyConfig/id', ''
                        roomsInBuilding[finalName] = history
                        // if (finalName = "EntryExits") {
                        //     return
                        // }
                        // console.log(finalName)
                        // console.log( typeof name)
                        
                    })
                    totalCampusHistory[bldgName][floorName] = roomsInBuilding
                    dispatch({campusHistoryData: totalCampusHistory})
                    // console.log(totalCampusHistory)
                })
            
                

            })
        })
    }, [])


//    const client = mqtt.connect("ws://10.9.9.210:9001/mqtt", options)
//    client.subscribe('CFA_IOT/OakmontA')

// mqtt://broker.emqx.io:1883
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

    const handleSunday = (total) => {
        dispatch({Sunday: total})
    }

    const handleMonday = (total) => {
        dispatch({Monday: total})
    }

    const handleTuesday = (total) => {
        dispatch({Tuesday: total})
    }

    const handleWednesday = (total) => {
        dispatch({Wednesday: total})
    }

    const handleThursday = (total) => {
        dispatch({Thursday: total})
    }

    const handleFriday = (total) => {
        dispatch({Friday: total})
    }

    const handleSaturday = (total) => {
        dispatch({Saturday: total})
    }


    // async function getData (object) {
    //     // let data = await fetch(object, {headers : {
    //     //     'Content-Type': 'application/json',
    //     //         'Accept': 'application/json'
    //     // }}
    //     // )
        
    //     data = await data.json()
    //     return data
    // }

    async function getData(path){
        let message
        return new Promise((resolve, reject) => {
            client.subscribe(path)
            client.on('message', function(topic, message) {
                // console.log(topic)
                // console.log(path)
                if (topic != path){
                    // console.log("NOT EQUAL")
                    client.unsubscribe(path)
                    client.subscribe(path)
                } else if (topic === path) {
                    // console.log("EQUAL")
                    return resolve(JSON.parse(message.toString()));
                }
            });
        }); 
    }

    // async function getData(path) {
    //     client.subscribe(path);
    
    //     return new Promise((resolve, reject) => {
    //         client.on('message', function(topic, message) {
    //             return resolve(JSON.parse(message.toString()));
    //         });
    //     });
    // }

    // async function getHistoryData(){
    //     client.subscribe("CFA_IOT/OakmontA/History")

    //     return new Promise((resolve, reject) => {
    //         client.on('message', function(topic, message){
    //         // console.log(topic)
    //         // console.log(message)
    //         // console.log(JSON.parse(message.toString()))
    //         // if(topic != "CFA_IOT/OakmontA/History"){
    //         //     client.unsubscribe(topic)
    //         //     client.subscribe("CFA_IOT/OakmontA/History")
    //         // }else if (topic === "CFA_IOT/OakmontA/History") {
    //         // return resolve (JSON.parse(message.toString()));
    //         return resolve(topic)
    //         // }
    //     })
    // })
    // }

    // async function unsubscribe(path){
    //     client.unsubscribe(path)
    // }

    // async function writeMessage(message){
    //     console.log(message)
    // }

    useEffect( () => {
        client = mqtt.connect("ws://10.9.9.210:9001/mqtt", options);
        buildingArray.forEach(val => {
            totalCampus[val.name] = {}
            val.floors.forEach(floorVal => {
                //this needs to be replaced with mqtt but the function will use the mqtt route, subscribe and pull data, then unsubscribe.
                //Only getData needs to be changed
                
                // async function getData(path){
                //     client.subscribe(path)
                //     let message
                //     let data = await client.on('message', function(topic, message){
                //         console.log(JSON.parse(message.toString()));
                //         console.log(topic);
                //         message = JSON.parse(message.toString())
                //         return message
                        
                //     })
                //         data = await data
                // getHistoryData(floorVal.path2).then((data) => {
                //     console.log("HELLO WOrld")
                //     console.log(floorVal.path2)
                //     console.log(data)
                // });
                //         return data 
                // }
                let result = name.includes("Count_Zn1")
                getData(floorVal.path).then((data)=>
                // client.subscribe(floorVal.path).then((data)=>
                {
                    // console.log(floorVal.path)
                    // console.log(data)
                    let keys = Object.keys(data); //array of keys
                    // console.log(keys)
                    let name = val.name //building name
                    let floorName = floorVal.name
                    let full = keys[2] //full data key
                    let fullData = data[full] //full data value
                    let roomsInBuilding = {} 
                    let tot = 0
                    // console.log(fullData)
                    
                    for(let x in fullData) { //for every key...
                        let area = fullData[x].area //get name of room
                        let key = fullData[x] //the data needs to be accessed like this since there's an object within an object. This is a key
                        //array of values we care about
                        let valueArray = {
                            'History': '',
                            'bldgTotal': key.bldgTotal,
                            'Monday': key.history,
                            'alias': key.alias,
                            'dailyTally': key.dailyTally,
                            'currentCount' : key.currentCount,
                            'dayAverage': key.dayAverage,
                            'dayMax': key.dayMax,
                            'monthAverage': key.monthAverage,
                            'monthMax': key.monthMax,
                            // 'history': historyData.data[h].hsitory
                        }
                        h++
                        //put this object into a new object with the key of the room name
                        roomsInBuilding[area] = valueArray
                    }
               
                    totalCampus[name][floorName] = roomsInBuilding //place the floor number (string) as a nested object with the value of the rooms object
                    dispatch({campusData: totalCampus }) //add this to the global context
                    
                            
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

                                    // if(room == "EntryExits") {
                                        
                                    //         tot = roomsInBuilding[room].currentCount;
                                        
                                        
                                    // }
                                    switch(name) {
                                        case "MainSouth":
                                            if(room == "EntryExits") {
                                                // console.log('hi')
                                                // console.log(roomsInBuilding[room])
                                                tot = roomsInBuilding[room].bldgTotal;
                                            }
                                            break;
                                        case "MainNorth":
                                            if(room == "EntryExits") {
                                                // console.log('hi')
                                                // console.log(roomsInBuilding[room])
                                                tot = roomsInBuilding[room].bldgTotal;
                                            }
                                            break;
                                        default:
                                            if(room == "EntryExits") {
                                                tot = roomsInBuilding[room].currentCount;
                                            }
                                            break;    
                                    }
                                
                            }
                            tt[name] = tot
                            setTotal(tt)

                            const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

                            
                            handleCampusTotal(sumValues(tt));
                            i ++
                            // console.log(i)
                            if(i === 32){
                                // client.end()
                                // writeHistory()
                                client.end()
                                setExecute(true)
                            }
                        })
                        
                        // getHistoryData().then((data) => {
                        //     console.log("Here")
                        //     console.log(data)
                        // })
                        // getData(floorVal.path2).then((data) => {
                        //     console.log("WOOOHOO")
                        //     console.log(data)
                        // })
                        // getData(floorVal.path2).then((data) => {
                        //     handleSunday(data.history[0].maximum);
                        //     handleMonday(data.history[1].maximum);
                        //     handleTuesday(data.history[2].maximum);
                        //     handleWednesday(data.history[3].maximum);
                        //     handleThursday(data.history[4].maximum);
                        //     handleFriday(data.history[5].maximum);
                        //     handleSaturday(data.history[6].maximum);
                        // })
                    }
                    )
                    
                    // client.end()
                    // if(totalCampus.name.)
                })
                
                
            }
            , [])

            // let writeHistory = () => {
            //     console.log('true baby')
            //     client.end()
            //     client = mqtt.connect("ws://10.9.9.210:9001/mqtt", options);
            //     client.subscribe("CFA_IOT/OakmontA/History")
            //     client.on('message', function(topic, message){
            //         console.log(topic);
            //     })
            // }
            // if(execute == true){
            //     console.log("true baby")
            // }
        
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
                                               className="justify-content-between align-items-center floorBtn">{floor.name}
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
