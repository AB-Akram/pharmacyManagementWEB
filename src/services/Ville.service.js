import http from "../HttpCommon";

class VilleDataService {
    getAll(){
        return http.get("/api/villes");
    }
    create(data) {
        return http.post("/api/villes/add")
    }
}
export default new VilleDataService();