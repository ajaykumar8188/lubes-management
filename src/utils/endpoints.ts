import axios from "axios"

export const baseurl = {

    baseurl: "http://localhost:8080",
}



export const apiClient = axios.create({
  baseURL: baseurl.baseurl,
})

export const endpoints = {
    countryListURI: "/api/configuration/countryList",
   Savecategories: "/api/admin/Savecategories",
    getcategories:"/api/admin/getcategories"

}