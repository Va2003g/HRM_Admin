import React from "react";
import { CiCircleInfo } from "react-icons/ci";
import { FcBusinessman, FcAlarmClock, FcLeave } from "react-icons/fc";
import { GoProjectRoadmap } from "react-icons/go";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoReceiptOutline } from "react-icons/io5";
import { BiReceipt } from "react-icons/bi";
import { GrAnnounce } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export function Service() {
  const divStyles =
    "group inline-block w-[163px] h-[160px] bg-white border transition-all ease-in-out duration-[0.6s] mr-[20px] mb-[15px] shadow-xl hover:shadow-2xl rounded-lg cursor-pointer";
  const infoIcon =
    "relative left-2 top-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg";
  const mainIcon = "mx-auto text-7xl m-3";
  const text = "text-center font-[600] text-sm";
  function handleEmployeeClick(event: any) {
    const targetParent = event.target.parentNode;
    console.log("targetParent: ", targetParent);
    window.alert(`${targetParent} is clicked`);
  }
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap">
      <div className={divStyles} onClick={()=>navigate('/addEmployee')}>
        <CiCircleInfo className={infoIcon} onClick={handleEmployeeClick} />
        <FcBusinessman className={mainIcon} />
        <h3 className={text}>Manage Employees</h3>
      </div>
      <div className={divStyles}>
        <CiCircleInfo className={infoIcon} />
        <GoProjectRoadmap className={`${mainIcon} text-yellow-600 `} />
        <h3 className={text}>Projects</h3>
      </div>
      <div className={divStyles}>
        <CiCircleInfo className={infoIcon} />
        <FcAlarmClock className={mainIcon} />
        <h3 className={text}>Time Sheet</h3>
      </div>
      <div className={divStyles}>
        <CiCircleInfo className={infoIcon} />
        <FcLeave className={mainIcon} />
        <h3 className={text}>Leave Tracker</h3>
      </div>
      <div className={divStyles}>
        <CiCircleInfo className={infoIcon} />
        <FaRegCalendarCheck className={`${mainIcon} text-yellow-300`} />
        <h3 className={text}>Attendance</h3>
      </div>
      <div className={divStyles}>
        <CiCircleInfo className={infoIcon} />
        <IoReceiptOutline className={`${mainIcon} text-red-400`} />
        <h3 className={text}>Pay Roll</h3>
      </div>
      <div className={divStyles}>
        <CiCircleInfo className={infoIcon} />
        <BiReceipt className={`${mainIcon} text-red-600`} />
        <h3 className={text}>Download PaySlip</h3>
      </div>
      <div className={divStyles}>
        <CiCircleInfo className={infoIcon} />
        <GrAnnounce className={`${mainIcon} text-green-500`} />
        <h3 className={text}>Annoucements</h3>
      </div>
    </div>
  );
}

export default Service;
