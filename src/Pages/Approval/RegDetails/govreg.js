import React,{useState} from "react";
import Btn from "../../../components/button/Btn";
import "../../Approval/RegDetails/regdetails.css";
import { useLocation } from "react-router-dom";

export default function Govtregdet(){
  let location = useLocation();
  let [gdata,setData]=useState(location.state.gdata);
  // let [gdata,setData]
    return(<table className="hcont1">
<tr colspan="10"><h1 className="hosphead">Government Registration Details</h1></tr>
<div className="details3">
<p className="hname2">Government Office:-{gdata.name}</p>
<div>
    <p className="hcontacts2">
    <p>phone:-{gdata.emergency}</p>
    <p>email:-{gdata.name}</p>
    </p>
</div>
<div>
<p className="walletaddr2">
Wallet address:-{gdata.phone}
</p>
</div><td><Btn   text={"Approve"}
                        onclick=""
                        style={{                 
                      width: "150px",
                      marginLeft:"0px",
                      fontSize: "16px",
                      textAlign:"center",
                      padding: "10px 0px"
                        }}
                      />
                      </td>
                        <td>
                      <Btn   text={"Reject"}
                        onclick=""
                        style={{                 
                      width: "150px",
                      marginLeft:"0px",
                      fontSize: "16px",
                      textAlign:"center",
                      padding: "10px 0px"
                        }}
                      />
                      </td>
</div>

    </table>);
}