import { proxy } from "valtio";

const state =proxy({
    isLoggedIn:false,
    userName:'',
    userEmail:'',
});

export default state;
