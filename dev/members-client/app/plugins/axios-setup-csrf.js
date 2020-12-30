import Axios from "axios";

(async () => {
    const response = await Axios.get("/api/security/csrf");
    Axios.defaults.headers["X-CSRF-TOKEN"] = response.data.token;
})();