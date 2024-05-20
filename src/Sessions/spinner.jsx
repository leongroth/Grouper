import  { useRef, useState } from "react";
import './Spinner.css';
import Swal from 'sweetalert2' //library for displaying toats



function Spinner() {
  const containerRef = useRef(null); //ref to the spinning wheel container div
  const [spinning, setSpinning] = useState(false); //whether it spins or not


  //triggers the spin
  const handleClick = async () => {
    if (!spinning) {
        const newNumber = Math.ceil(Math.random() * 360); //generates a random angle
        console.log(newNumber);
        const endAngle = newNumber + 360 * 10; 
        if (containerRef.current) {
          containerRef.current.style.transition = 'transform 5s ease-out'; 
          containerRef.current.style.transform = `rotate(${endAngle}deg)`;
          console.log(endAngle)
          
        }
        setTimeout(() => {
          setSpinning(false);
          const activity = getActivity(newNumber); //determines the activity based on angle
          // Close the popup after 3 seconds
          setTimeout(() => {
            displayToast(activity);
          }, 1000);
        }, 5000); 
      }
    };
    
    //displays the toast of the activity for 5 mins
    const displayToast = async (activity) => { 
        const Toast = Swal.mixin({
          toast: true,
          iconColor: 'white',
          customClass: {
            popup: 'colored-toast',
          },
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
    
        await Toast.fire({
          icon: 'success',
          title: activity,
        });
      };
    
    //determines the activity based on angle
    const getActivity = (angle) => {
        // Define ranges for each activity
        if (angle >= 0 && angle < 45 || angle >= 315 && angle <= 360) {
          return 'Go for a walk';
        } else if (angle >= 45 && angle < 135) {
          return 'Play a boardgame';
        } else if (angle >= 135 && angle < 225) {
          return 'Drink water';
        } else if (angle >= 225 && angle < 315) {
          return 'Play table football';
        }
      };
    

  return (

        <div className="body105">
        <button id="spin" onClick={handleClick} disabled={spinning}>
            Spin
        </button>
        <span className='arrow'></span> 
        <div className="container" ref={containerRef}>
            <div className='one'> Play table football </div>
            <div className='two'> Drink water </div>
            <div className='three'> Play a boardgame </div>
            <div className='four'> Go for a walk </div>
        </div>
        </div>

  );
}

export default Spinner;
