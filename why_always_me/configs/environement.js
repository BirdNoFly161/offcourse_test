
//below is for production
//let apiURL = process.env.BASE_URL;
import  Constants  from "expo-constants";
const apiURL = `http://${Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':3001')}`;
export { apiURL };
