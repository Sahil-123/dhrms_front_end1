import React from "react";
import { useState, useEffect } from "react";
import Btn from "../../components/button/Btn";
import TxtInput from "../../components/TxtInput/TxtInput";
import mainLogo from "../doctorRegistration/logo192.png";
import "./doctorReg.css";
import client from "../../services/FileUpload";
import LoadingInd from "../../components/Loading/LoadingInd";
import { addDoctor, getDoctorDetails } from "../../functions/Dhrms";
import { addDoctortoList } from "../../functions/Approve";
import { useNavigate } from "react-router-dom";
import { getAccountAddress } from "../../services/AccountDetails";

import {
  isGovernment,
  isHospital,
  isDoctor,
  isPatient,
} from "../../functions/Rbac";

export const DoctorReg = () => {
  let navigate = useNavigate();
  const [state, setState] = useState({
    doctorName: "",
    doctorWallet: "",
    phoneNo: "",
    qualification: "",
    hospitalWallet: "",
    doctorPhoto: "",
    doctorDOB: "",
    doctorDept: "",
  });

  const [loading, setLoading] = useState(false);

  const registerDoctor = async () => {
    try {
      if (
        (await isGovernment(state.doctorWallet)) ||
        (await isHospital(state.doctorWallet)) ||
        (await isDoctor(state.doctorWallet)) ||
        (await isPatient(state.doctorWallet))
      ) {
        console.log("account already exist");
      } else {
        const docPhoto = await client.add(state.doctorPhoto);
        if (await isGovernment(getAccountAddress())) {
          await addDoctor(
            state.doctorName,
            state.phoneNo,
            state.qualification,
            docPhoto.path,
            state.doctorDOB,
            state.hospitalWallet,
            state.doctorWallet,
            state.doctorDept
          );
        } else {
          await addDoctortoList(
            state.doctorName,
            state.phoneNo,
            state.qualification,
            docPhoto.path,
            state.doctorDOB,
            state.hospitalWallet,
            state.doctorWallet,
            state.doctorDept
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleChanges = (e) => {
    if (e.target.type !== "file") {
      const name = e.target.name;
      const value = e.target.value;
      setState({
        ...state,
        [name]: value,
      });
    } else {
      setState({
        ...state,
        doctorPhoto: e.target.files[0],
      });
    }
  };

  // const setValidation = async () => {
  //   setLoading(true);
  //   const test = await isGovernment(currentAccount);
  //   if (test) {
  //     setLoading(false);
  //   } else {
  //     setLoading(false);
  //     await pageRedirect(currentAccount, navigate);
  //   }
  // };

  return (
    <div>
      {loading ? (
        <LoadingInd loading={loading} />
      ) : (
        <div className="doc_reg">
          <div className="doc_head">Doctor Registration</div>
          {/* Doctor Name DID Phone Number Qualification Photo Dob HID */}
          <div className="doc_align_ht">
            <img
              src={
                state.doctorPhoto
                  ? URL.createObjectURL(state.doctorPhoto)
                  : mainLogo
              }
              alt="Avatar"
              className="doc_avatar"
            />
            <div className="input--file">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="#560c66"
                >
                  <circle cx="12" cy="12" r="3.2" />
                  <path d="M9 2l-1.83 2h-3.17c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2h-3.17l-1.83-2h-6zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                  <path d="M0 0h24v24h-24z" fill="none" />
                </svg>
              </span>
              <input name="doctorPhoto" type="file" onChange={handleChanges} />
            </div>
          </div>
          <div className="doc_align_ht">
            <div className="doc_align_vt">
              <label className="lbl_hos">Doctor name :</label>
              <TxtInput
                name={"doctorName"}
                value={state.doctorName}
                onChange={handleChanges}
                style={{
                  width: "350px",
                  marginRight: "40px",
                  fontSize: "14px",
                }}
                placeholder="Enter the Doctor name"
              />
            </div>
            <div className="doc_align_vt">
              <label className="lbl_hos">Doctor Wallet Address :</label>
              <TxtInput
                name={"doctorWallet"}
                value={state.doctorWallet}
                onChange={handleChanges}
                style={{
                  width: "350px",
                  fontSize: "14px",
                }}
                placeholder="Enter the doctor wallet address"
              />
            </div>
          </div>
          <div className="doc_align_ht">
            <div className="doc_align_vt">
              <label className="lbl_hos">Phone No. :</label>
              <TxtInput
                name={"phoneNo"}
                value={state.phoneNo}
                onChange={handleChanges}
                style={{
                  width: "350px",
                  marginRight: "40px",
                  fontSize: "14px",
                }}
                placeholder="Enter the phone no"
              />
            </div>
            <div className="doc_align_vt">
              <label className="lbl_hos">Qualification :</label>
              <TxtInput
                name={"qualification"}
                value={state.qualification}
                onChange={handleChanges}
                style={{
                  width: "350px",
                  fontSize: "14px",
                }}
                placeholder="Enter the qualification"
              />
            </div>
          </div>
          <div className="doc_align_ht">
            <div className="doc_align_vt">
              <label className="lbl_hos">DOB :</label>
              <TxtInput
                name={"doctorDOB"}
                type={"date"}
                value={state.doctorDOB}
                onChange={handleChanges}
                style={{
                  width: "350px",
                  marginRight: "40px",
                  fontSize: "14px",
                }}
                placeholder="Enter the Hospital wallet address"
              />
            </div>
            <div className="doc_align_vt">
              <label className="lbl_hos">Department :</label>
              <TxtInput
                name={"doctorDept"}
                value={state.doctorDept}
                onChange={handleChanges}
                style={{
                  width: "350px",
                  fontSize: "14px",
                }}
                placeholder="Enter the Hospital wallet address"
              />
            </div>
          </div>
          <div className="doc_align_vt doc_align_sp">
            <label className="lbl_hos">Hospital Wallet Address :</label>
            <TxtInput
              name={"hospitalWallet"}
              value={state.hospitalWallet}
              onChange={handleChanges}
              style={{
                width: "350px",
                marginRight: "40px",
                fontSize: "14px",
              }}
              placeholder="Enter the Hospital wallet address"
            />
          </div>
          <div>
            <Btn text={"Submit"} onClick={registerDoctor} />
          </div>
        </div>
      )}
    </div>
  );
};
