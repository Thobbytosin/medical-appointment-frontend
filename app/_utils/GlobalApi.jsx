const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_KEY;
// console.log(API_KEY);

const axiosClient = axios.create({
  // baseURL: "http://localhost:1337/api",
  baseURL: "https://medical-appointment-backend.onrender.com/api",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getCategory = () => axiosClient.get("categories?populate=*");

const getDoctorsList = () => axiosClient.get("doctors?populate=*");

const getDoctorsByCategory = (category) =>
  axiosClient.get(
    "/doctors?filters[categories][Name][$in]=" + category + "&populate=*"
  );
const getDoctorsById = (id) =>
  axiosClient.get("/doctors/" + id + "?populate=*");

const bookingAppointment = (data) => axiosClient.post("/appointments", data);

const sendEmail = (data) => axios.post("/api/sendEmail", data);

const getUserBookingList = (userEmail) =>
  axiosClient.get(
    "/appointments?[filters][Email][$eq]=" +
      userEmail +
      "&populate[doctor][populate][image][populate][0]=url&populate=*"
  );

const deleteAppointment = (id) => axiosClient.delete("/appointments/" + id);

export default {
  getCategory,
  getDoctorsList,
  getDoctorsByCategory,
  getDoctorsById,
  bookingAppointment,
  sendEmail,
  getUserBookingList,
  deleteAppointment,
};
