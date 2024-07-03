import {query,collection, addDoc,getDocs,where} from 'firebase/firestore'
import { db } from './index'
import {userDataType} from '../Redux/UserData/UserDataSlice'
export const AddUser = async(data:userDataType)=>{
    try{
        let id;
        const queryForFindingUser = query(collection(db, "Employees" ),where("email", "==", data.email))
        const checkUser = await getDocs(queryForFindingUser);
        
        if(checkUser.size === 0)
        {
            const response = await addDoc(collection(db, "Employees"), data);
            id = response.id;
            return id;
        }else{
            id = checkUser.docs[0].id;
        }
        return id;
    }catch(err)
    {
        console.log(err);
    }
}