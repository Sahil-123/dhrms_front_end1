import abi from "../utils/dhrms_pat.json";
import { ethers } from "ethers";

// const contractAddress = "0x96428b6b621D4A3CA50E2Ee6bE9Fc5fE06367B6C";
const contractAddress = "0x6952c9ac7C11fE3CDE6126bdb95cc662F39f3d06";
const contractABI = abi.abi;

const Dhrms_Pat_Instance = () => {
    try {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Get MetaMask!");
            return;
        }

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const Dhrms_Pat_Contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );
        return Dhrms_Pat_Contract;
    } catch (error) {
        console.log(error);
    }
};

export default Dhrms_Pat_Instance;
