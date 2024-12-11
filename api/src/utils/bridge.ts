import Axios from "axios";

import { UPDATE_LATEST_URL, UPDATE_LATEST_USER_AGENT } from "../constants/env";
import { UNAUTHORIZED } from "../constants/http";

export const requestUpdateLatestUpdate = async () => {
    Axios.patch(`http://frontend:8080${UPDATE_LATEST_URL}`, {}, {
        headers: {
            "User-Agent": UPDATE_LATEST_USER_AGENT
        },
        validateStatus: status => status == UNAUTHORIZED
    });
}