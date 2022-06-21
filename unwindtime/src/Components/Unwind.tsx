import React from 'react';
import moment from 'moment';
import './Unwind.css';
import RelaxMethod from './RelaxMethod';
import { getDistance } from 'geolib';
import { useNavigate } from 'react-router-dom';
import { Props, UnwindType } from '../../Interfaces';
import { motion } from 'framer-motion';
import { GeolibInputCoordinates } from 'geolib/es/types';
import { constants } from 'buffer';
import { deleteChat } from '../Services/unwinds';
import { collection, addDoc, DocumentData, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Services/firebaseConnection';
export default function Unwind(props:Props) {



const {unwind}:any  = props;
const {location}:Props =  props;
const {unwindID}:Props = props;

  const navigate = useNavigate();
  const formatTime = (datestamp:number) => {
    return moment(new Date(datestamp * 1000)).format('HH:mm');
  };

  const distanceBetween =
    location?.latitude && unwind?.location.latitude
      ? `Distance: ${getDistance(location as GeolibInputCoordinates, unwind.location, 1)} meters away`
      : '~';

  const conClickToChat = () => {
    navigate(`/unwindchat/${unwindID}`);
  };

const handleDel = (unwind) => {

 return deleteChat(unwind)
}


  return (
    <>
      <motion.button 
        className="unwind-event-container"
        onClick={conClickToChat}
        
        >
        <img className="profile-unwind-img" src={unwind?.createdBy.profilePic} alt="" />
        <div className="name-and-time-container">
          <p>{unwind?.createdBy.name} </p>
          <p>{`${formatTime(unwind?.from)} - ${formatTime(unwind?.till)}`}</p>
          <p> {distanceBetween} </p>
        </div>
        <RelaxMethod
          relaxMethod={unwind?.relaxMethod}
          classColor="favoriteMethod"
          onClickRelaxMethod={() => 1 + 1}
        ></RelaxMethod>
       
      </motion.button>
      <div onClick={() => deleteDoc(doc(db, "unwinds", unwindID))}>del</div>
    </>
  );
}
