import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { AiFillCloseCircle } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface ProjectData {
  title: string;
  description: string;
  employeeId: string;
  startDate: string;
  endDate: string;
}

export const Project = () => {
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [isStartCalenderOpen, setisStartCalenderOpen] = useState(false);
  const [isDueCalenderOpen, setisDueCalenderOpen] = useState(false);
  const [isAssignLabelOpen, setIsAssignLabelOpen] = useState(false);
  const [newProject, setNewProject] = useState<ProjectData>({
    title: "",
    description: "",
    employeeId: "",
    startDate: "",
    endDate: "",
  });
  const employeesData = useSelector(
    (state: RootState) => state.employeeData.employeeData
  );
  const projects: any[] = [
    {
      name: "Lindsay Walton",
      team: "Front-end Developer",
      startDate: "2023-01-15",
      endDate: "2023-06-30",
      status: "Not Alloted",
    },
  ];

  function handleStartDataChange(date: Date | null) {
    if(date!=null)
    setNewProject((prevstate) => {
      return {
        ...prevstate,
        startDate: date.toISOString(),
      };
    });
  }
  function handleEndDataChange(date: Date | null) {
    if(date!=null)
    setNewProject((prevstate) => {
      return {
        ...prevstate,
        endDate: date.toISOString(),
      };
    });
  }
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    console.log(event.target.name, event.target.value);
    setNewProject((prevstate) => ({
      ...prevstate,
      [event.target.name]: event.target.value,
    }));
    console.log(newProject)
  }
  function saveProject() {
    console.log("newProject", newProject);
  }

  return (
    <div className="w-full flex flex-col h-screen">
      <div
        className={`bg-[#000]/[0.325] h-[92%] absolute z-10 w-[84%] rounded-2xl transition-all duration-[0.8s] origin-top ease-in-out  ${
          isAssignLabelOpen
            ? "scale-y-100 scale-x-100"
            : "scale-y-0 scale-x-100"
        }`}
      >
        <div className="flex justify-between flex-row items-center h-[20%]">
          <h1 className="text-3xl left-[37%] relative text-white font-[Roboto] font-extrabold">
            Assign this Jio Project
          </h1>
          <AiFillCloseCircle
            className="text-6xl text-red-800 font-extrabold relative -top-10"
            onClick={() => setIsAssignLabelOpen(false)}
          />
        </div>
        <div className="border-t border-gray-200 text-center px-3 rounded-lg">
          <div className="grid grid-cols-5 gap-4 bg-gray-50 px-6 py-3">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee Name
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              email
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact No
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </div>
            <div className="text-left relative left-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assign
            </div>
          </div>
          <div
            className={` ${
              isListExpanded ? "h-[640px]" : "h-[300px]"
            } overflow-scroll hide-scrollbar`}
          >
            {employeesData.map((employee, index) => (
              <div
                key={index}
                className={`grid grid-cols-5 gap-4 px-6 py-4 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <div className="text-sm font-medium text-gray-900">
                  {employee.firstName} {employee.lastName}
                </div>
                <div className="text-sm text-gray-500">{employee.email}</div>
                <div className="text-sm text-gray-500">
                  {employee.contactNo}
                </div>
                <div className="text-sm text-gray-500">{employee.role}</div>
                <div
                  className={`text-sm font-medium px-4 py-2 w-[100px] text-center rounded-lg bg-[#3FC28A]/[0.1] text-[#3FC28A]`}
                >
                  ASSIGN
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {!isListExpanded && (
        <div className="w-full p-6 pb-1 pt-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <input
              type="text"
              placeholder="Title"
              className="w-full text-2xl font-light text-gray-600 placeholder-gray-400 mb-4 focus:outline-none"
              name="title"
              value={newProject.title}
              onChange={handleChange}
            />
            <textarea
              placeholder="Write a description..."
              className="w-full text-gray-600 placeholder-gray-400 mb-6 focus:outline-none resize-none"
              rows={6}
              name="description"
              value={newProject.description}
              onChange={handleChange}
            ></textarea>

            <div className="flex items-center justify-between border-t">
              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="flex items-center text-gray-500 hover:bg-gray-100 rounded-full p-2"
                  onClick={() => setIsAssignLabelOpen(!isAssignLabelOpen)}
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  Assign
                </button>
                <div className="relative">
                  <button
                    className="flex items-center text-gray-500 hover:bg-gray-100 rounded-full p-2"
                    onClick={() => setisStartCalenderOpen(!isStartCalenderOpen)}
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Start date
                  </button>
                  {isStartCalenderOpen && (
                    <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <DatePicker
                          // selected={}
                          onChange={(date) => {
                            handleStartDataChange(date);
                          }}
                          inline
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  className="flex items-center text-gray-500 hover:bg-gray-100 rounded-full p-2"
                  onClick={() => setisDueCalenderOpen(!isDueCalenderOpen)}
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Due date
                </button>
                {isDueCalenderOpen && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <DatePicker
                        // selected={new Date()}
                        onChange={(date) => {
                          handleEndDataChange(date);
                        }}
                        inline
                      />
                    </div>
                  </div>
                )}
              </div>
              <button
                className="bg-indigo-600 text-white px-4 py-2 mt-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                onClick={saveProject}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="p-6 w-full mx-auto pt-2">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-4 py-2 sm:px-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Projects List
              </h2>
            </div>
            {!isListExpanded ? (
              <button
                className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                onClick={() => setIsListExpanded(!isListExpanded)}
              >
                Expand List
              </button>
            ) : (
              <button
                className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                onClick={() => setIsListExpanded(!isListExpanded)}
              >
                Collapse List
              </button>
            )}
          </div>

          <div className="border-t border-gray-200">
            <div className="grid grid-cols-5 gap-4 bg-gray-50 px-6 py-3">
              <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Name
              </div>
              <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team
              </div>
              <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </div>
              <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </div>
              <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </div>
            </div>
            <div
              className={` ${
                isListExpanded ? "h-[640px]" : "h-[300px]"
              } overflow-scroll hide-scrollbar`}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-5 gap-4 px-6 py-4 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <div className="text-sm font-medium text-gray-900">
                    {project.name}
                  </div>
                  <div className="text-sm text-gray-500">{project.team}</div>
                  <div className="text-sm text-gray-500">
                    {project.startDate}
                  </div>
                  <div className="text-sm text-gray-500">{project.endDate}</div>
                  <div
                    className={`text-sm font-medium px-4 py-2 w-[130px] rounded-lg ${
                      project.status.toLowerCase() === "completed" &&
                      "bg-[#3FC28A]/[0.1] text-[#3FC28A]"
                    }  ${
                      project.status.toLowerCase() === "in progress" &&
                      "bg-[#EFBE12]/[0.1] text-[#EFBE12]"
                    }  ${
                      project.status.toLowerCase() === "not alloted" &&
                      "bg-[#F45B69]/[0.1] text-[#F45B69]"
                    } `}
                  >
                    {
                      // project.status.toLowerCase() === 'completed'
                      project.status.toUpperCase()
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
