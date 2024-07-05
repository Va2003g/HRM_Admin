import {query,collection, addDoc,getDocs,where, doc, setDoc} from 'firebase/firestore'
import { db } from './Firebase'
import { formDataType } from '../components'
export const AddUser = async(data:formDataType)=>{
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
            const userDoc = doc(db, "Employees", id);
            await setDoc(userDoc, data, { merge: true });
        }
        return id;
    }catch(err)
    {
        console.log(err);
    }
}