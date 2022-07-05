// config something
export const AXIOSURL = "http://localhost:3000"

export const AXIOSTIMEOUT = 5000

export const getAxiosUrl = () => localStorage.getItem("IMAxiosUrl")?localStorage.getItem("IMAxiosUrl")!:AXIOSURL
