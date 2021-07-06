import * as Realm from 'realm-web';
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

export const uploadDetails = async (file) => {

    const res5 = await app.currentUser.functions.uploaddetails(file)
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