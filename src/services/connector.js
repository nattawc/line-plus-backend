import axios from "axios";
import configs from "../config/config";

export default class Connector {
  getListCampaign(user) {
    return axios
      .get(configs.urlApi + "/connector/get-campaign", {
        params: {
          user,
        },
      })
      .then((response) => {
        let data = response.data;

        return data;
      });
  }
}
