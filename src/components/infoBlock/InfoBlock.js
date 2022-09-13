import {useState, useEffect, useReducer, useMemo} from 'react'
import { getResource } from '../../services/services';

import "./infoBlock.sass"

const InfoBlock = () => {

    const [btn, setBtn] = useState(true);
    const [dopInfo, dispatch] = useReducer(reducer, {dopInfo: 'Phone'})
    const [userList, setUserList] = useState([])

    useEffect(()=>{onRequest()},[])


    function reducer(state, action) {
        switch (action.type) {
          case 'email':
            return {dopInfo: 'Email'};
          case 'phone':
            return {dopInfo: 'Phone'};
          case 'company':
            return {dopInfo: 'Company'};
          default:
            throw new Error();
        }
    }

    function Counter() {
        return (
          <>
            <div className="typeInfo">
                <div className="check-info" onClick={() => (dispatch({type: 'email'}), getInfiLIst())}>Email</div>
                <div className="check-info" onClick={() => (dispatch({type: 'phone'}), getInfiLIst())}>Phone</div>
                <div className="check-info" onClick={() => (dispatch({type: 'company'}), getInfiLIst())}>Company</div>
            </div>
          </>
        );
    }

    const getInfiLIst = ()=>{
        setBtn( btn => !btn)
    }

    const User = ({userInfo}) => {
        const {name, address,phone,email,company} = userInfo;

        const persoEmail = (dopInfo.dopInfo == 'Email') ? `${email}` : null;
        const personPhone = (dopInfo.dopInfo == 'Phone') ? `${phone}` : null;
        const personCompany = (dopInfo.dopInfo == 'Company') ? `${company.name}` : null;

        return (
            <li className='infoBlock__list-item'>
                <div className='infoBlock__list-person'>
                    <span className="text">{name}</span>
                    <div className="text">{address.city}</div>
                    <div className="text">{persoEmail}{personPhone}{personCompany}</div>
                </div>
            </li>
        )
    };

    const onRequest = () => {
        getResource('https://jsonplaceholder.typicode.com/users?limit=10')
        .then(data => setUserList([...data]))
    }
    
    const usersArr = (uList) => {
        let arr = [];
        
        uList.forEach(el => arr.push(<User userInfo={el} key={el.id}/>));
     
        return  arr;
    }
        
    const usersList = usersArr(userList);
        
    const RedBtn = <button className="button-24" role="button" onClick={()=>{getInfiLIst()}}>{dopInfo.dopInfo}</button>;

    
    return (
        <div className="infoBlock">
            <div className="infoBlock__typeInfo">
                <div className="infoBlock__typeInfo-name line">Name</div>
                <div className="infoBlock__typeInfo-adds line">City</div>
                {btn ? RedBtn : <Counter/>}
            </div>
            <ul className="infoBlock__list">
                {usersList}
            </ul>
        </div>
    )
}

export default InfoBlock;


{/* <li className='infoBlock__list-item'>
<div className='infoBlock__list-person'>
    <span className="text">Bill Filcer</span>
    <div className="text">LA.5142</div>
    <div className="text">+997-556-4532</div>
</div>
{btn ? RedBtn : <CheckTypeInfo/>}
</li> */}
