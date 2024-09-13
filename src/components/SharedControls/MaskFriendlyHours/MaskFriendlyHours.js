import React, { useState, useEffect, useRef } from "react";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../../actions";
import { makeStyles } from "@material-ui/styles";
import "./datepicker.css";
import { IconButton } from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "16px 0px",
  },
  box: {
    width: "360px",
    height: "auto",
    maxHeight: "auto",
    border: "3px solid #1a71e5",
    margin: "auto",
    borderRadius: "20px",
    overflow: "hidden",
    "@media (max-width: 650px)": {
      width: "auto",
    },
  },
  dateContainer: {
    display: "flex",
    justifyContent: "space-around",
    background: "rgba(218, 232, 233, 0.2)",
    margin: "13px 20px",
    padding: "5px 0px",
    borderRadius: "10px",
    overflow: "hidden",
  },
  arrowMain: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "-26px",
    padding: "0px",
    marginLeft: "6px",
    zIndex: 9999,
    "@media (max-width: 300px)": {
      marginLeft: "1px",
    },
  },
  arrowContainer: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    opacity: "65%",
    color: theme.palette.text.primary,
    padding: "0px",
    marginLeft: "-8px",
  },
  arrowMainDown: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "-26px",
    padding: "0px",
    marginLeft: "6px",
    "@media (max-width: 650px)": {
      marginLeft: "1px",
    },
  },
  daysArrowContainer: {
    display: "flex",
    opacity: "65%",
    justifyContent: "center",
    color: theme.palette.text.primary,
    marginRight: "45px",
    padding: "0px",
    marginBottom: "-5px",
  },
  textColor: {
    color: "#7289da",
    fontSize: "14px",
    fontStyle: "normal",
    fontFamily: "Roboto",
    marginBottom: 8,
  },
  textColorTop: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 18,
    color: "#1A71E5",
    margin: 8,
    cursor: "pointer",
  },
  daysBox: {
    width: "125px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "15px",
    overflow: "hidden",
  },
  timeBox: {
    width: 110,
    borderRadius: 15,
    borderColor: theme.palette.text.primary,
    overflow: "hidden",
  },
  unhandled: {
    display: "flex",
    justifyContent: "space-evenly",
    opacity: "35%",
  },
  unhandledTop: {
    display: "flex",
    justifyContent: "space-evenly",
    opacity: "35%",
    transform: "skewX(-1.5deg)",
  },
  unhandledBottom: {
    display: "flex",
    justifyContent: "space-evenly",
    opacity: "35%",
    transform: "skewX(1.5deg)",
  },
  handled: {
    display: "flex",
    justifyContent: "space-evenly",
    borderRadius: "10px",
    background: "rgba(218, 232, 233, 0.3)",
  },
  oppacityDays: {
    opacity: "35%",
  },
  oppacityDaysTop: {
    opacity: "35%",
    transform: "skewX(-1.5deg)",
  },
  width: {
    width: "33.33%",
    display: "flex",
    justifyContent: "center",
  },
  curve: {
    width: "33.33%",
    display: "flex",
    justifyContent: "center",
  },
  hr: {
    opacity: "50%",
    width: "100px",
  },
  addBtn: {
    margin: "5px auto",
    fontSize: 16,
    fontStyle: "normal",
    fontFamily: "Roboto",
  },
  timeDisplay: {
    display: "flex",
    justifyContent: "center",
    listStyleType: "none",
  },
  timeDisplayContainer: {
    textAlign: "center",
    margin: "auto",
  },
  timeListing: {
    color: theme.palette.text.primary,
    fontStyle: "normal",
    fontFamily: "Roboto",
    marginTop: "8px",
    fontSize: "14px",
  },
  adjusticon: {
    marginLeft: 10,
    marginTop: 7,
    color: "red",
    fontSize: 20,
    cursor: "pointer",
  },
  paragraph: {
    padding: "5px",
    fontSize: "15px",
    fontStyle: "normal",
    fontFamily: "Roboto",
    color: theme.palette.text.primary,
  },
}));

const MaskFriendlyHours = (props) => {
  const datePickerRef = useRef(null);
  const [isDatePickerActive, setIsDatePickerActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isScrolledMin, setIsScrolledMin] = useState(false);
  const [isScrolledDay, setIsScrolledDay] = useState(false);
  const [scrolledHours, setScrolledHours] = useState(false);
  const [ScrolledMin, setScrolledMin] = useState(false);
  const [ScrolledDay, setScrolledDay] = useState(false);
  const timeStamp = ["AM", "PM"];
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [amPm, setAmPm] = useState(0);
  const [index, setIndex] = useState(0);
  const [selectedTimeObj, setselectedTimeObj] = useState("");
  const [selectedArrays, setSelectedArrays] = useState([]);
  const [showInputBox, setShowInputBox] = useState(false);
  const [showInputBoxMin, setShowInputBoxMin] = useState(false);
  const [showInputBoxAmPm, setShowInputBoxAmPm] = useState(false);
  const { theme_mode } = props;
  const { selectedDates } = props;
  useEffect(() => {
    console.log("selected date from the parent component", selectedDates);
    if (selectedDates != null) {
      setSelectedArrays([...selectedDates]);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDatePickerActive]);

  const handleTouchMove = (e) => {
    if (isDatePickerActive) {
      e.preventDefault();
    }
  };

  const handleMouseEnter = () => {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    console.log("scroll bar width", `${scrollBarWidth}px`);
    document.body.classList.add("hide-class");
    document.body.style.marginRight = `${scrollBarWidth}px`;
  };

  const handleMouseLeave = () => {
    document.body.classList.remove("hide-class");
    document.body.style.marginRight = "";
  };

  const handleTouchStart = () => {
    setIsDatePickerActive(true);
  };

  const handleMouseEnterClick = () => {
    handleMouseLeave();
    handleTouchStart();
  };

  const handleTouchEnd = () => {
    setIsDatePickerActive(false);
  };
  const addMaskFriendlyHours = () => {
    let timeString = `${hours}${
      minutes !== 0 ? `:${minutes.toString().padStart(2, "0")}` : ""
    }${timeStamp[amPm]}`;
    if (minutes === 0) {
      timeString = `${hours}${timeStamp[amPm]}`;
    }
    const selectedTime = {
      time: timeString,
      day: days[index],
      key: Math.random(5),
    };
    setSelectedArrays((prevObj) => [...prevObj, selectedTime]);
    props.onObjectChange([...selectedArrays, selectedTime]);
    setShowInputBox(false);
    setShowInputBoxMin(false);
    setShowInputBoxAmPm(false);
    setHours(1);
    setMinutes(0);
    setAmPm(0);
  };

  const deleteMaskFriendlyHours = (key) => {
    setSelectedArrays(selectedArrays.filter((item) => item.key !== key));
    props.onObjectChange(selectedArrays.filter((item) => item.key !== key));
  };

  useEffect(() => {
    const selectedTime = {
      time: `${hours}:${minutes.toString().padStart(2, "0")} ${
        timeStamp[amPm]
      }`,
      day: days[index],
      key: Math.random(5),
    };
    setselectedTimeObj(selectedTime);
  }, [isScrolledDay, isScrolledMin, isScrolled, amPm]);

  useEffect(() => {
    setScrolledHours(true);
    setTimeout(() => {
      setScrolledHours(false);
    }, 10);
  }, [isScrolled]);

  useEffect(() => {
    setScrolledMin(true);
    setTimeout(() => {
      setScrolledMin(false);
    }, 10);
  }, [isScrolledMin]);

  useEffect(() => {
    setScrolledDay(true);
    setTimeout(() => {
      setScrolledDay(false);
    }, 50);
  }, [isScrolledDay]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const addScrollDays = () => {
    if (index >= 6) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
    setIsScrolledDay(!isScrolledDay);
  };

  const subScrollDays = () => {
    if (index <= 0) {
      setIndex(6);
    } else {
      setIndex(index - 1);
    }
    setIsScrolledDay(!isScrolledDay);
  };

  const dayScrollStamp = () => {
    if (amPm <= 0) {
      setAmPm(1);
    } else {
      setAmPm(amPm - 1);
    }
  };
  const upScrollStamp = () => {
    if (amPm >= 1) {
      setAmPm(0);
    } else {
      setAmPm(1);
    }
  };

  const addScrollHours = () => {
    if (hours === "") {
      setHours(1);
      setIsScrolled(!isScrolled);
    } else if (hours >= 12) {
      setHours(1);
      setIsScrolled(!isScrolled);
    } else {
      setHours(hours + 1);
      setIsScrolled(!isScrolled);
    }
  };

  const subScrollHours = () => {
    if (hours === "") {
      setHours(12);
      setIsScrolled(!isScrolled);
    } else if (hours <= 1) {
      setHours(12);
      setIsScrolledDown(!isScrolledDown);
    } else {
      setHours(hours - 1);
      setIsScrolledDown(!isScrolledDown);
    }
  };

  const addScrollMinutes = () => {
    if (minutes === "") {
      setMinutes(0);
      setIsScrolledMin(!isScrolledMin);
    } else if (minutes >= 59) {
      setMinutes(0);
      setIsScrolledMin(!isScrolledMin);
    } else {
      setMinutes(minutes + 1);
    }
    setIsScrolledMin(!isScrolledMin);
  };

  const subScrollMinutes = () => {
    if (minutes === "") {
      setMinutes(59);
      setIsScrolledMin(!isScrolledMin);
    } else if (minutes <= 0) {
      setMinutes(59);
      setIsScrolledMin(!isScrolledMin);
    } else {
      setMinutes(minutes - 1);
    }
    setIsScrolledMin(!isScrolledMin);
  };
  const classes = useStyles();

  const paragraph_style = {
    background:
      theme_mode === "light"
        ? "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.80))"
        : "linear-gradient(to top, rgba(255,255,255,1.0), rgba(0,0,0,0.80))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    transform: "scaleY(0.75)",
  };
  const paragraph_styleBottom = {
    background:
      theme_mode === "light"
        ? "linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0.80))"
        : "linear-gradient(to bottom, rgba(255,255,255,1.0), rgba(0,0,0,0.80))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    transform: "scaleY(0.75)",
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <p
          className={classes.textColorTop}
          onClick={props.handleMaskFriendlyHours}
        >
          Add Mask Friendly Hours
        </p>

        <div>
          <div
            className={classes.arrowMain}
            ref={datePickerRef}
            onMouseLeave={handleMouseLeave}
            onTouchEnd={handleTouchEnd}
          >
            <div className={classes.arrowContainer}>
              <IconButton>
                <ArrowDropUpIcon
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={subScrollHours}
                />
              </IconButton>
              <IconButton style={{ marginLeft: "-20px" }}>
                <ArrowDropUpIcon
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={subScrollMinutes}
                />
              </IconButton>
              <IconButton style={{ marginLeft: "-20px" }}>
                <ArrowDropUpIcon
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={upScrollStamp}
                />
              </IconButton>
            </div>
            <div className={classes.daysArrowContainer}>
              <IconButton>
                <ArrowDropUpIcon
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={subScrollDays}
                />
              </IconButton>
            </div>
          </div>
          <div
            className={classes.dateContainer}
            ref={datePickerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className={classes.timeBox}>
              <div className={classes.unhandledTop}>
                <div className={classes.curve}>
                  <ReactScrollWheelHandler
                    upHandler={subScrollHours}
                    downHandler={addScrollHours}
                    timeout={100}
                  >
                    <p
                      style={paragraph_style}
                      className={`${classes.paragraph} ${
                        scrolledHours
                          ? "animation"
                          : isScrolledDown
                          ? "animationDown"
                          : ""
                      }`}
                    >
                      {hours === 1 || hours === ""
                        ? 11
                        : hours === 2
                        ? 12
                        : hours - 2}
                    </p>
                  </ReactScrollWheelHandler>
                </div>
                <div className={classes.width}>
                  <ReactScrollWheelHandler
                    upHandler={subScrollMinutes}
                    downHandler={addScrollMinutes}
                    timeout={100}
                  >
                    <p
                      style={paragraph_style}
                      className={`${classes.paragraph} ${
                        ScrolledMin ? "animation" : isScrolledDown ? "" : ""
                      }`}
                    >
                      {minutes === 0 || minutes === ""
                        ? 58
                        : minutes === 1
                        ? 59
                        : (minutes - 2).toString().padStart(2, "0")}
                    </p>
                  </ReactScrollWheelHandler>
                </div>
                <div className={classes.width}></div>{" "}
              </div>
              <div className={classes.unhandled}>
                <div className={classes.width}>
                  <ReactScrollWheelHandler
                    upHandler={subScrollHours}
                    downHandler={addScrollHours}
                    timeout={100}
                  >
                    <p
                      className={`${classes.paragraph} ${
                        scrolledHours
                          ? "animation"
                          : isScrolledDown
                          ? "animationDown"
                          : ""
                      }`}
                    >
                      {hours === 1 || hours === "" ? 12 : hours - 1}
                    </p>
                  </ReactScrollWheelHandler>
                </div>
                <div className={classes.width}>
                  <ReactScrollWheelHandler
                    upHandler={subScrollMinutes}
                    downHandler={addScrollMinutes}
                    timeout={100}
                  >
                    <p
                      className={`${classes.paragraph} ${
                        ScrolledMin ? "animation" : isScrolledDown ? "" : ""
                      }`}
                    >
                      {minutes === 0 || minutes === ""
                        ? 59
                        : (minutes - 1).toString().padStart(2, "0")}
                    </p>
                  </ReactScrollWheelHandler>
                </div>
                <div className={classes.width}></div>{" "}
              </div>

              <div className={classes.handled}>
                <div className={classes.width}>
                  <ReactScrollWheelHandler
                    upHandler={subScrollHours}
                    downHandler={addScrollHours}
                    timeout={100}
                  >
                    {showInputBox ? (
                      <input
                        type="text"
                        pattern="[1-9]|1[0-2]"
                        maxLength="2"
                        value={hours}
                        onChange={(e) => {
                          let value = parseInt(e.target.value);
                          if (isNaN(value)) {
                            setHours("");
                          } else if (value > 12) {
                            setHours(12);
                          } else if (value < 1) {
                            setHours(1);
                          } else {
                            setHours(value);
                          }
                        }}
                        style={{
                          width: "30px",
                          textAlign: "center",
                          marginTop: "4px",
                        }}
                        onBlur={() => setShowInputBox(false)}
                        autoFocus
                      />
                    ) : (
                      <p
                        style={{ textDecoration: "underline" }}
                        className={classes.paragraph}
                        onClick={() => setShowInputBox(true)}
                      >
                        {hours}
                      </p>
                    )}
                  </ReactScrollWheelHandler>
                </div>
                <div className={classes.width}>
                  <ReactScrollWheelHandler
                    upHandler={subScrollMinutes}
                    downHandler={addScrollMinutes}
                    timeout={100}
                  >
                    {showInputBoxMin ? (
                      <input
                        type="text"
                        pattern="[0-9]*"
                        maxLength="2"
                        value={minutes}
                        onChange={(e) => {
                          let value = parseInt(e.target.value);
                          if (isNaN(value)) {
                            setMinutes("");
                          } else if (value > 60) {
                            setMinutes(59);
                          } else if (value < 1) {
                            setMinutes(0);
                          } else {
                            setMinutes(value);
                          }
                        }}
                        style={{
                          width: "30px",
                          textAlign: "center",
                          marginTop: "4px",
                        }}
                        onBlur={() => setShowInputBoxMin(false)}
                        autoFocus
                      />
                    ) : (
                      <p
                        style={{ textDecoration: "underline" }}
                        className={classes.paragraph}
                        onClick={() => setShowInputBoxMin(true)}
                      >
                        {minutes.toString().padStart(2, "0")}
                      </p>
                    )}
                  </ReactScrollWheelHandler>
                </div>
                <div className={classes.width}>
                  <ReactScrollWheelHandler
                    downHandler={dayScrollStamp}
                    upHandler={upScrollStamp}
                    timeout={100}
                  >
                    <p className={classes.paragraph}>{timeStamp[amPm]}</p>
                  </ReactScrollWheelHandler>
                </div>
              </div>
              <div className={classes.unhandled}>
                <div className={classes.width}>
                  <ReactScrollWheelHandler
                    upHandler={subScrollHours}
                    downHandler={addScrollHours}
                    timeout={100}
                  >
                    <p
                      className={`${classes.paragraph} ${
                        scrolledHours
                          ? "animation"
                          : isScrolledDown
                          ? "animationDown"
                          : ""
                      }`}
                    >
                      {hours === 12 ? 1 : hours + 1}
                    </p>
                  </ReactScrollWheelHandler>
                </div>
                <div className={classes.width}>
                  <ReactScrollWheelHandler
                    upHandler={subScrollMinutes}
                    downHandler={addScrollMinutes}
                    timeout={100}
                  >
                    <p
                      className={`${classes.paragraph} ${
                        ScrolledMin ? "animation" : isScrolledDown ? "" : ""
                      }`}
                    >
                      {minutes === 59
                        ? "00"
                        : (minutes + 1).toString().padStart(2, "0")}
                    </p>
                  </ReactScrollWheelHandler>
                </div>
                <div className={classes.width}>
                  <ReactScrollWheelHandler
                    downHandler={dayScrollStamp}
                    upHandler={upScrollStamp}
                    timeout={100}
                  >
                    <p className={classes.paragraph}>
                      {amPm - 1 ? "PM" : "AM"}
                    </p>
                  </ReactScrollWheelHandler>
                </div>
              </div>
              {/*  */}
              <div className={classes.unhandledBottom}>
                <div className={classes.width}>
                  <ReactScrollWheelHandler
                    upHandler={subScrollHours}
                    downHandler={addScrollHours}
                    timeout={100}
                  >
                    <p
                      style={paragraph_styleBottom}
                      className={`${classes.paragraph} ${
                        scrolledHours
                          ? "animation"
                          : isScrolledDown
                          ? "animationDown"
                          : ""
                      }`}
                    >
                      {hours === 12 ? 2 : hours === 11 ? 1 : hours + 2}
                    </p>
                  </ReactScrollWheelHandler>
                </div>
                <div className={classes.width}>
                  <ReactScrollWheelHandler
                    upHandler={subScrollMinutes}
                    downHandler={addScrollMinutes}
                    timeout={100}
                  >
                    <p
                      style={paragraph_styleBottom}
                      className={`${classes.paragraph} ${
                        ScrolledMin ? "animation" : isScrolledDown ? "" : ""
                      }`}
                    >
                      {minutes === 59
                        ? 1
                        : minutes === 58
                        ? "00"
                        : (minutes + 2).toString().padStart(2, "0")}
                    </p>
                  </ReactScrollWheelHandler>
                </div>
                <div className={classes.width}></div>{" "}
              </div>
            </div>
            <div>
              <div className={classes.daysBox}>
                <div>
                  <div className={classes.oppacityDaysTop}>
                    <ReactScrollWheelHandler
                      upHandler={subScrollDays}
                      downHandler={addScrollDays}
                      timeout={100}
                    >
                      <p
                        style={paragraph_style}
                        className={`${classes.paragraph} ${
                          ScrolledDay ? "animation" : ""
                        }`}
                      >
                        {days[index] === "Sunday"
                          ? "Friday"
                          : days[index] === "Monday"
                          ? "Saturday"
                          : days[index - 2]}
                      </p>
                    </ReactScrollWheelHandler>
                  </div>
                  <div className={classes.oppacityDays}>
                    <ReactScrollWheelHandler
                      upHandler={subScrollDays}
                      downHandler={addScrollDays}
                      timeout={100}
                    >
                      <p
                        className={`${classes.paragraph} ${
                          ScrolledDay ? "animation" : ""
                        }`}
                      >
                        {days[index] === "Sunday"
                          ? "Saturday"
                          : days[index - 1]}
                      </p>
                    </ReactScrollWheelHandler>
                  </div>
                  <hr className={classes.hr} />
                  <div>
                    <ReactScrollWheelHandler
                      upHandler={subScrollDays}
                      downHandler={addScrollDays}
                      timeout={100}
                    >
                      <p className={classes.paragraph}>{days[index]}</p>
                    </ReactScrollWheelHandler>
                  </div>
                  <hr />
                  <div className={classes.oppacityDays}>
                    <ReactScrollWheelHandler
                      upHandler={subScrollDays}
                      downHandler={addScrollDays}
                      timeout={100}
                    >
                      <p
                        className={`${classes.paragraph} ${
                          ScrolledDay ? "animation" : ""
                        }`}
                      >
                        {days[index] === "Saturday"
                          ? "Sunday"
                          : days[index + 1]}
                      </p>
                    </ReactScrollWheelHandler>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.arrowMainDown}>
            <div className={classes.arrowContainer}>
              <IconButton>
                <ArrowDropDownIcon
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={addScrollHours}
                />
              </IconButton>
              <IconButton style={{ marginLeft: "-20px" }}>
                <ArrowDropDownIcon
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={addScrollMinutes}
                />
              </IconButton>
              <IconButton style={{ marginLeft: "-20px" }}>
                <ArrowDropDownIcon
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={dayScrollStamp}
                />
              </IconButton>
            </div>
            <div className={classes.daysArrowContainer}>
              <IconButton>
                <ArrowDropDownIcon
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={addScrollDays}
                />
              </IconButton>
            </div>
          </div>
        </div>
        <ul className="timeListContainer">
          {selectedArrays.map((item, index) => {
            return (
              <div className={classes.timeDisplayContainer} key={index}>
                <div className={classes.timeDisplay}>
                  <li className={classes.timeListing} key={index}>
                    {item.time.toLowerCase()} {item.day}
                  </li>
                  <RemoveCircleIcon
                    onClick={() => deleteMaskFriendlyHours(item.key)}
                    className={classes.adjusticon}
                  />
                </div>
              </div>
            );
          })}
        </ul>

        <button className={classes.addBtn} onClick={addMaskFriendlyHours}>
          Add
        </button>
        <p className={classes.textColor}>Set a weekly recurring time</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  theme_mode: state.uiState.theme_mode,
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MaskFriendlyHours);
