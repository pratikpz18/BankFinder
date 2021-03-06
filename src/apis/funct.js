import * as Realm from 'realm-web';
import fire from '../config/firebase';
const app = new Realm.App({ id:  "test-avfxt" });

// export const getData = async () => {
//     const credentials = Realm.Credentials.anonymous();
//     const user = await app.logIn(credentials);
// }

export const getAllDetails = async () => {
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);

    const res3 = await app.currentUser.functions.getalldetails()
    console.log(res3);
    return (res3);
}

export const createData = async (name,ifsc,office,address,district,city,state,phone) => {

    const res4 = await app.currentUser.functions.createdata(name,ifsc,office,address,district,city,state,phone)
    console.log(res4);
    return (res4);

}

export const deleteData = async (ifsc) => {
    
    const res = await app.currentUser.functions.deletedata(ifsc)
    console.log(res);
    return (res);
    
}

export const uploadDetails = async (file,flag) => {

    const res5 = await app.currentUser.functions.uploaddetails(file,flag)
    console.log(res5);
    return (res5);

}

export const getDatabyIfsc = async (ifsc) => {

    const res6 = await app.currentUser.functions.getdatabyifsc(ifsc)
    console.log(res6);
    return (res6);

}

export const UpdateData = async (name,ifsc,office,address,district,city,state,phone) => {

    const res7 = await app.currentUser.functions.updatedata(name,ifsc,office,address,district,city,state,phone)
    console.log(res7);
    return (res7);
    
}

export const deleteAllData = async () => {

    const res8 = await app.currentUser.functions.deletealldata()
    console.log(res8);
    return (res8);

}

export const getAllStatesbyBankName = async (BANK_NAME) => {

    const res8 = await app.currentUser.functions.getstatesbybankname(BANK_NAME)
    console.log(res8);
    return (res8);

}

export const getAllCitiesbyStateName = async (BANK_NAME,STATE) => {

    const res8 = await app.currentUser.functions.getcitiesbystatename(BANK_NAME,STATE)
    console.log(res8);
    return (res8);

}

export const getBankDetailsByValue = async (BANK_NAME,STATE,CITY) => {

    const res8 = await app.currentUser.functions.getbankdetailsbyvalue(BANK_NAME,STATE,CITY)
    console.log(res8);
    return (res8);

}

// export const uploadData = async (data) => {

//     const res8 = await app.currentUser.functions.uploaddata(data)
//     console.log(res8);
//     return (res8);

// }

export const getStatistics = async () => {

    const res8 = await app.currentUser.functions.getstatistics()
    console.log(res8);
    return (res8);

}

export const getBankName = async () => {

    const res8 = await app.currentUser.functions.getbanknames()
    console.log(res8);
    return (res8);

}

export const getDataByBankName = async (name) => {

    const res8 = await app.currentUser.functions.getdatabybanknames(name)
    console.log(res8);
    return (res8);

}

// export const getWeatherData = async (city) => {

//     const res8 = await app.currentUser.functions.getweatherinfo(city)
//     console.log(res8);
//     return (res8);

// }

// export const handleLogout = () => {
//     fire.auth().signOut()
// }